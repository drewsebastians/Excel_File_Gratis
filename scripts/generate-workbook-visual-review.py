#!/usr/bin/env python3
"""Render draft workbooks into an owner-review package.

LibreOffice output is a useful automated signal, not evidence of identical
Microsoft Excel fidelity. This script deliberately records only render state;
the owner review CSV is the sole source of an owner visual decision.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
import sys
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = ROOT / "public" / "downloads"
STRUCTURAL_QA = ROOT / "docs" / "qa" / "draft-workbooks"
DEFAULT_OUTPUT = ROOT / "artifacts" / "workbook-visual-review"
MANIFEST = ROOT / "docs" / "qa" / "workbook-visual-review-manifest.json"
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
SLUGS = [
    "absensi-karyawan-sederhana", "checklist-acara", "daftar-aset-inventaris-kantor",
    "daftar-belanja-rumah-tangga", "daftar-harga-produk-jasa", "daftar-kehadiran-acara",
    "daftar-piutang-pelanggan", "database-pelanggan-sederhana", "form-permintaan-pembelian",
    "jadwal-belajar-siswa", "jadwal-kerja-mingguan", "jadwal-pembayaran-tagihan",
    "kalender-konten-media-sosial", "kas-kecil-excel", "laba-rugi-sederhana-umkm",
    "purchase-order-sederhana", "rekap-penjualan-bulanan", "rekap-pesanan-pelanggan",
    "rencana-proyek-sederhana", "surat-jalan-excel",
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for block in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def sheet_names(path: Path) -> list[str]:
    with zipfile.ZipFile(path) as archive:
        root = ET.fromstring(archive.read("xl/workbook.xml"))
    return [sheet.attrib.get("name", "") for sheet in root.findall("m:sheets/m:sheet", NS)]


def command_version(command: str | None) -> str | None:
    if not command:
        return None
    result = subprocess.run([command, "--version"], capture_output=True, text=True, check=False)
    return (result.stdout or result.stderr).strip().splitlines()[0] if result.returncode == 0 else None


def render(workbook: Path, pdf_dir: Path, png_dir: Path, libreoffice: str, pdftoppm: str) -> tuple[Path | None, list[Path], list[str]]:
    warnings: list[str] = []
    pdf_dir.mkdir(parents=True, exist_ok=True)
    png_dir.mkdir(parents=True, exist_ok=True)
    result = subprocess.run(
        [libreoffice, "--headless", "--convert-to", "pdf", "--outdir", str(pdf_dir), str(workbook)],
        capture_output=True, text=True, check=False,
    )
    pdf = pdf_dir / f"{workbook.stem}.pdf"
    if result.returncode != 0 or not pdf.is_file() or pdf.stat().st_size == 0:
        warnings.append((result.stderr or result.stdout or "LibreOffice did not create a PDF").strip())
        return None, [], warnings
    prefix = png_dir / workbook.stem
    conversion = subprocess.run([pdftoppm, "-png", "-r", "144", str(pdf), str(prefix)], capture_output=True, text=True, check=False)
    pages = sorted(png_dir.glob(f"{workbook.stem}-*.png"))
    if conversion.returncode != 0 or not pages:
        warnings.append((conversion.stderr or conversion.stdout or "pdftoppm did not create PNG pages").strip())
    return pdf, pages, warnings


def html_index(entries: list[dict], output: Path) -> None:
    rows = "\n".join(
        f"<tr><td>{item['slug']}</td><td>{item['sheet_count']}</td><td>{item['rendered_page_count']}</td><td>{item['render_status']}</td><td>{'; '.join(item['conversion_warnings']) or '-'}</td></tr>"
        for item in entries
    )
    output.joinpath("index.html").write_text(
        "<!doctype html><meta charset=\"utf-8\"><title>Workbook visual review</title>"
        "<style>body{font-family:system-ui;margin:2rem}table{border-collapse:collapse}td,th{border:1px solid #bbb;padding:.45rem;text-align:left}</style>"
        "<h1>Workbook visual review</h1><p>LibreOffice renders are supplementary. Confirm the workbooks in Microsoft Excel before changing owner decision.</p>"
        f"<table><thead><tr><th>Workbook</th><th>Sheets</th><th>Pages</th><th>Render</th><th>Warnings</th></tr></thead><tbody>{rows}</tbody></table>",
        encoding="utf-8",
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--allow-missing-renderer", action="store_true")
    args = parser.parse_args()
    output = args.output.resolve()
    pdf_dir, png_dir = output / "pdf", output / "png"
    libreoffice = shutil.which("libreoffice") or shutil.which("soffice")
    pdftoppm = shutil.which("pdftoppm")
    renderer_available = bool(libreoffice and pdftoppm)
    if not renderer_available and not args.allow_missing_renderer:
        print("LibreOffice/soffice and pdftoppm are required. Use --allow-missing-renderer only for an explicit local limitation.", file=sys.stderr)
        return 2

    entries = []
    for slug in SLUGS:
        workbook = DOWNLOADS / f"template-{slug}.xlsx"
        structural_path = STRUCTURAL_QA / f"template-{slug}.json"
        structural = json.loads(structural_path.read_text(encoding="utf-8")) if structural_path.exists() else {}
        warnings: list[str] = []
        pdf: Path | None = None
        pages: list[Path] = []
        if not workbook.is_file():
            warnings.append("Workbook source is missing.")
        elif renderer_available:
            pdf, pages, warnings = render(workbook, pdf_dir, png_dir, libreoffice, pdftoppm)
        else:
            warnings.append("Renderer unavailable in this local environment; no visual decision was inferred.")
        empty_pages = [page.name for page in pages if page.stat().st_size < 1024]
        if empty_pages:
            warnings.append(f"Possible blank PNG page(s): {', '.join(empty_pages)}")
        status = "render_generated" if pdf and pages else "render_failed"
        entries.append({
            "slug": f"template-{slug}",
            "workbook_path": workbook.relative_to(ROOT).as_posix(),
            "file_hash": sha256(workbook) if workbook.is_file() else None,
            "sheet_names": sheet_names(workbook) if workbook.is_file() else [],
            "sheet_count": len(sheet_names(workbook)) if workbook.is_file() else 0,
            "rendered_page_count": len(pages),
            "pdf_generated": bool(pdf),
            "png_generated": bool(pages),
            "empty_page_detection": {"possible_empty_pages": empty_pages, "status": "warning" if empty_pages else "no_low_byte_pages_detected"},
            "conversion_warnings": warnings,
            "renderer_version": command_version(libreoffice),
            "structural_qa_status": structural.get("status", "not_started"),
            "render_status": status,
            "visual_review_status": "pending_owner_review",
            "artifact_name": output.name,
            "pdf_path": pdf.relative_to(output).as_posix() if pdf else None,
            "png_paths": [page.relative_to(output).as_posix() for page in pages],
        })
    output.mkdir(parents=True, exist_ok=True)
    html_index(entries, output)
    manifest = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "renderer": {"libreoffice": command_version(libreoffice), "pdftoppm": command_version(pdftoppm)},
        "artifact_name": output.name,
        "total_workbooks": len(entries),
        "render_generated": sum(item["render_status"] == "render_generated" for item in entries),
        "render_failed": sum(item["render_status"] == "render_failed" for item in entries),
        "visual_review_status": "pending_owner_review",
        "workbooks": entries,
    }
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: manifest[key] for key in ("total_workbooks", "render_generated", "render_failed", "artifact_name")}, indent=2))
    return 1 if manifest["render_failed"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
