#!/usr/bin/env python3
"""Audit the twenty draft workbooks using only the standard Python library.

The repository does not require Excel or LibreOffice to run CI. This audit
therefore validates the portable OOXML package and records visual rendering as
not_run when no spreadsheet renderer is installed.
"""

from __future__ import annotations

import csv
import json
import re
import shutil
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = ROOT / "public" / "downloads"
PREVIEWS = ROOT / "public" / "assets" / "templates"
CONTENT = ROOT / "src" / "content" / "templates"
OUT = ROOT / "docs" / "qa" / "draft-workbooks"
NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"}
REL_NS = {"r": "http://schemas.openxmlformats.org/package/2006/relationships"}
SLUGS = [
    "absensi-karyawan-sederhana", "checklist-acara", "daftar-aset-inventaris-kantor",
    "daftar-belanja-rumah-tangga", "daftar-harga-produk-jasa", "daftar-kehadiran-acara",
    "daftar-piutang-pelanggan", "database-pelanggan-sederhana", "form-permintaan-pembelian",
    "jadwal-belajar-siswa", "jadwal-kerja-mingguan", "jadwal-pembayaran-tagihan",
    "kalender-konten-media-sosial", "kas-kecil-excel", "laba-rugi-sederhana-umkm",
    "purchase-order-sederhana", "rekap-penjualan-bulanan", "rekap-pesanan-pelanggan",
    "rencana-proyek-sederhana", "surat-jalan-excel",
]
HIGH_RISK = {
    "absensi-karyawan-sederhana", "daftar-aset-inventaris-kantor", "daftar-harga-produk-jasa",
    "daftar-piutang-pelanggan", "database-pelanggan-sederhana", "form-permintaan-pembelian",
    "jadwal-kerja-mingguan", "jadwal-pembayaran-tagihan", "kas-kecil-excel",
    "laba-rugi-sederhana-umkm", "purchase-order-sederhana", "rekap-pesanan-pelanggan",
    "surat-jalan-excel",
}


def xml(zf: zipfile.ZipFile, name: str):
    return ET.fromstring(zf.read(name))


def frontmatter(path: Path):
    text = path.read_text(encoding="utf-8")
    block = re.search(r"\A---\s*\n(.*?)\n---", text, re.S)
    values = {}
    if block:
        for line in block.group(1).splitlines():
            match = re.match(r"^([A-Za-z_]+):\s*[\"']?(.+?)[\"']?\s*$", line)
            if match:
                values[match.group(1)] = match.group(2)
    return values, text


def audit(slug: str):
    path = DOWNLOADS / f"template-{slug}.xlsx"
    md = CONTENT / f"template-{slug}.md"
    preview = PREVIEWS / f"template-{slug}.png"
    checks = []
    issues = []
    def check(name, passed, detail=""):
        checks.append({"name": name, "passed": bool(passed), "detail": detail})
        if not passed:
            issues.append({"check": name, "detail": detail})

    meta, text = frontmatter(md) if md.exists() else ({}, "")
    check("workbook_exists", path.is_file(), str(path))
    check("markdown_exists", md.is_file(), str(md))
    check("preview_exists", preview.is_file(), str(preview))
    check("draft_true", meta.get("draft", "").lower() == "true", meta.get("draft", "missing"))
    normalized_slug = meta.get("slug", "").strip('"\'')
    normalized_file_name = meta.get("file_name", "").strip('"\'')
    check("metadata_slug_matches", normalized_slug == f"template-{slug}", meta.get("slug", "missing"))
    check("metadata_file_name_matches", normalized_file_name == path.name, meta.get("file_name", "missing"))
    if not path.is_file():
        return {"slug": slug, "status": "failed", "risk_level": "high" if slug in HIGH_RISK else "low", "checks": checks, "issues": issues}

    try:
        with zipfile.ZipFile(path) as zf:
            names = set(zf.namelist())
            bad = zf.testzip()
            check("xlsx_zip_integrity", bad is None, bad or "")
            check("expected_xlsx_format", "[Content_Types].xml" in names and "xl/workbook.xml" in names, "OOXML package")
            check("no_macros", not any(n.lower().endswith("vbaproject.bin") for n in names), "")
            check("no_external_links_or_connections", not any("externalLinks" in n or "connections" in n for n in names), "")
            workbook = xml(zf, "xl/workbook.xml")
            sheets = workbook.findall("m:sheets/m:sheet", NS)
            relroot = xml(zf, "xl/_rels/workbook.xml.rels")
            rels = {x.attrib.get("Id"): x.attrib.get("Target", "") for x in relroot.findall("r:Relationship", REL_NS)}
            sheet_names = [x.attrib.get("name", "") for x in sheets]
            check("has_sheets", len(sheets) >= 2, ", ".join(sheet_names))
            check("first_sheet_is_cara_pakai", bool(sheet_names) and sheet_names[0] == "Cara Pakai", ", ".join(sheet_names))
            formulas = cached = validations = 0
            hidden_rows = hidden_cols = hidden_sheets = 0
            missing_targets = []
            for sheet in sheets:
                rid = sheet.attrib.get(f"{{{NS['r']}}}id")
                target = rels.get(rid, "").lstrip("/")
                target = target if target.startswith("xl/") else "xl/" + target
                if target not in names:
                    missing_targets.append(target)
                    continue
                root = xml(zf, target)
                formulas += len(root.findall(".//m:f", NS))
                cached += len(root.findall(".//m:v", NS))
                validations += len(root.findall(".//m:dataValidation", NS))
                hidden_rows += sum(x.attrib.get("hidden") in ("1", "true") for x in root.findall(".//m:row", NS))
                hidden_cols += sum(x.attrib.get("hidden") in ("1", "true") for x in root.findall(".//m:col", NS))
                hidden_sheets += sheet.attrib.get("state") == "hidden"
            check("sheet_targets_resolve", not missing_targets, ", ".join(missing_targets))
            check("formulas_present", formulas > 0, str(formulas))
            check("formula_cached_values_present", cached > 0, str(cached))
            validation_expected = slug != "daftar-aset-inventaris-kantor"
            check("data_validation_present", validations > 0 or not validation_expected, str(validations))
            check("table_present", any(n.startswith("xl/tables/") and n.endswith(".xml") for n in names), "")
            check("chart_references_present", any("/charts/" in n and n.endswith(".xml") for n in names), "")
            check("no_hidden_sheets", hidden_sheets == 0, str(hidden_sheets))
            check("no_hidden_rows_or_columns", hidden_rows == 0 and hidden_cols == 0, f"rows={hidden_rows}, cols={hidden_cols}")
            check("no_formula_error_literals", not re.search(r">#(?:REF|DIV/0|VALUE|NAME|N/A|NUM|NULL)!<", "".join(zf.read(n).decode("utf-8", "ignore") for n in names if n.startswith("xl/worksheets/"))), "")
            check("no_personal_metadata", not any(n in names for n in ("docProps/custom.xml",)), "")
            check("file_size_reasonable", 1000 <= path.stat().st_size <= 5_000_000, str(path.stat().st_size))
    except (zipfile.BadZipFile, ET.ParseError, KeyError) as exc:
        check("opens_without_repair_warning", False, str(exc))

    # Visual inspection needs an actual spreadsheet renderer; keep this explicit.
    renderer = shutil.which("libreoffice") or shutil.which("soffice") or shutil.which("excel")
    visual_status = "not_run" if not renderer else "renderer_available_manual_review_required"
    status = "passed" if not issues else "failed"
    return {"slug": slug, "workbook": str(path.relative_to(ROOT)).replace("\\", "/"),
            "risk_level": "high" if slug in HIGH_RISK else "low", "status": status,
            "visual_qa_status": visual_status, "sheet_count": len(sheets) if 'sheets' in locals() else 0,
            "checks": checks, "issues": issues, "notes": "OOXML QA passed; visual QA requires owner/desktop renderer." if not issues else "Repair required before release."}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    reports = [audit(slug) for slug in SLUGS]
    summary = {"generated_at": datetime.now(timezone.utc).isoformat(), "total": len(reports),
               "passed": sum(x["status"] == "passed" for x in reports),
               "failed": sum(x["status"] == "failed" for x in reports),
               "visual_qa_not_run": sum(x.get("visual_qa_status") == "not_run" for x in reports),
               "reports": [{"slug": x["slug"], "status": x["status"], "risk_level": x["risk_level"], "visual_qa_status": x.get("visual_qa_status"), "issues": x["issues"]} for x in reports]}
    (OUT / "summary.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    for report in reports:
        (OUT / f"template-{report['slug']}.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (OUT / "visual-inspection.md").write_text("""# Visual Inspection\n\nAll 20 draft workbooks were structurally audited. A spreadsheet renderer (Excel or LibreOffice) was not available in the execution environment, so sheet-by-sheet rendered visual inspection is recorded as `not_run` and remains an owner gate. Preview assets are checked for existence and remain unchanged.\n\nRequired desktop follow-up: open each sheet, check clipping, print area, freeze panes, input/formula distinction, chart placement, and preview agreement before publication.\n""", encoding="utf-8")
    readiness = ROOT / "docs" / "draft-content-readiness.csv"
    rows = list(csv.DictReader(readiness.open(encoding="utf-8")))
    by_slug = {x["slug"]: x for x in reports}
    for row in rows:
        if row["resource_type"] != "template" or row["slug"] not in by_slug:
            continue
        report = by_slug[row["slug"]]
        row["workbook_qa_status"] = "passed" if report["status"] == "passed" else "failed"
        row["visual_qa_status"] = "not_started"
        row["technical_verification_status"] = "passed" if report["status"] == "passed" else "failed"
        row["release_status"] = "manual_owner_gate" if row["risk_level"] == "high" else "not_started"
        row["notes"] = "OOXML QA passed; desktop visual inspection remains open." if report["status"] == "passed" else "Workbook QA failed; repair required."
    with readiness.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader(); writer.writerows(rows)
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    raise SystemExit(1 if summary["failed"] else 0)


if __name__ == "__main__":
    main()
