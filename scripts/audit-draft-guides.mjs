import { readFile, writeFile, readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import { parse } from "yaml";

const root = process.cwd();
const guideDir = path.join(root, "src", "content", "guides");
const reportPath = path.join(root, "docs", "qa", "draft-guides-audit.json");
const requiredHeadings = ["Masalah yang Diselesaikan", "Hasil yang Diharapkan", "Prasyarat", "Contoh Input", "Langkah Praktik", "Mengapa Ini Bekerja", "Kesalahan Umum", "Diagnosis", "Cara Memperbaiki", "Kompatibilitas dan Alternatif Versi Lama", "Batasan", "Langkah Praktis Berikutnya", "Related Resources"];
const files = (await readdir(guideDir)).filter((file) => file.endsWith(".md"));
const allSlugs = new Set();
const allData = [];
const errors = [];
const warnings = [];

function parseGuide(source, file) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: source, file };
  return { data: parse(match[1]) || {}, body: match[2], file };
}

for (const file of files) {
  const parsed = parseGuide(await readFile(path.join(guideDir, file), "utf8"), file);
  allData.push(parsed);
  if (parsed.data.slug) allSlugs.add(parsed.data.slug);
}

for (const collection of ["templates", "formulas", "troubleshooting", "collections"]) {
  const directory = path.join(root, "src", "content", collection);
  const entries = await readdir(directory).catch(() => []);
  for (const file of entries.filter((name) => name.endsWith(".md"))) {
    const parsed = parseGuide(await readFile(path.join(directory, file), "utf8"), `${collection}/${file}`);
    allData.push(parsed);
    if (parsed.data.slug) allSlugs.add(parsed.data.slug);
  }
}

const seenTitle = new Map();
const seenMeta = new Map();
const draftGuides = allData.filter((item) => item.data.draft === true && !item.file.includes("/"));
for (const { data, body, file } of draftGuides) {
  const id = data.slug || file;
  const fail = (check, detail) => errors.push({ file, slug: id, check, detail });
  const warn = (check, detail) => warnings.push({ file, slug: id, check, detail });
  if (!data.title || !data.meta_title || !data.meta_description || !data.summary) fail("required_metadata", "title/meta_title/meta_description/summary wajib diisi");
  if (data.draft !== true) fail("draft_flag", "guide harus tetap draft:true");
  if (seenTitle.has(data.title)) fail("duplicate_title", `duplikat dengan ${seenTitle.get(data.title)}`); else seenTitle.set(data.title, file);
  if (seenMeta.has(data.meta_description)) fail("duplicate_meta_description", `duplikat dengan ${seenMeta.get(data.meta_description)}`); else seenMeta.set(data.meta_description, file);
  if (/Panduan praktis untuk|Mulailah dari file contoh kecil|Tips Agar File Tetap Rapi|Pertanyaan yang Sering Ditanyakan/.test(body)) fail("repeated_placeholder_wording", "boilerplate lama masih ditemukan");
  if (/contoh dan langkah yang mudah diikuti|membuat file lebih mudah diperbarui dan diperiksa/i.test(`${data.summary} ${body}`)) warn("generic_wording", "review editorial wording");
  for (const heading of requiredHeadings) if (!new RegExp(`^## ${heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "m").test(body)) fail("missing_heading", heading);
  for (const kind of ["related_templates", "related_guides", "related_formulas", "related_troubleshooting"]) {
    for (const slug of data[kind] || []) {
      const exists = allSlugs.has(slug);
      if (!exists) fail("invalid_related_slug", `${kind}: ${slug}`);
    }
  }
  if (/(Excel 2024|Excel 2025|Excel 2026|Excel versi terbaru)/i.test(`${data.meta_description} ${body}`)) fail("unsupported_version_claim", "versi tidak didukung metadata proyek");
  const image = data.preview_image;
  if (image && !data.preview_alt) fail("missing_preview_alt", image);
  if (image && !image.startsWith("/assets/")) fail("invalid_preview_image_path", image);
  if (body.length < 900) fail("insufficient_content", "naskah terlalu pendek untuk quality gate");
}

const distFiles = await readdir(path.join(root, "dist"), { recursive: true }).catch(() => []);
for (const { data } of draftGuides) {
  if (distFiles.some((file) => file.includes(data.slug))) errors.push({ slug: data.slug, check: "draft_route_leakage", detail: "slug ditemukan di dist" });
}

const result = { generatedAt: new Date().toISOString(), draftGuideCount: draftGuides.length, errors, warnings, status: errors.length ? "failed" : "passed" };
await mkdir(path.dirname(reportPath), { recursive: true });
await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(`Draft guide audit: ${result.draftGuideCount} guides; ${errors.length} errors; ${warnings.length} warnings.`);
if (errors.length) process.exitCode = 1;
