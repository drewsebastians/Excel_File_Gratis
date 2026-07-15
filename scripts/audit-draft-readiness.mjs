import { existsSync, readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import YAML from "yaml";

const root = process.cwd();
const contentRoot = path.join(root, "src", "content");
const qaRoot = path.join(root, "docs", "qa");
const distRoot = path.join(root, "dist");
const registerPath = path.join(root, "docs", "draft-content-readiness.csv");
const reportPath = path.join(qaRoot, "draft-readiness-audit.json");
const guideAuditPath = path.join(qaRoot, "draft-guides-audit.json");
const guideAudit = existsSync(guideAuditPath) ? JSON.parse(readFileSync(guideAuditPath, "utf8")) : undefined;
const workbookQaRoot = path.join(qaRoot, "draft-workbooks");
const visualReviewManifestPath = path.join(qaRoot, "workbook-visual-review-manifest.json");
const visualReviewManifest = existsSync(visualReviewManifestPath)
  ? JSON.parse(readFileSync(visualReviewManifestPath, "utf8"))
  : undefined;
const visualReviewBySlug = new Map((visualReviewManifest?.workbooks || []).map((entry) => [entry.slug, entry]));

const allowedStatuses = new Set([
  "not_started",
  "in_progress",
  "passed",
  "failed",
  "not_applicable",
  "manual_owner_gate",
  "ready_for_release",
  "published",
  "render_generated",
  "render_failed",
  "pending_owner_review",
  "owner_passed",
  "owner_failed",
]);

const highRiskTerms = [
  "laba-rugi",
  "kas-kecil",
  "piutang",
  "purchase-order",
  "surat-jalan",
  "permintaan-pembelian",
  "absensi",
  "jadwal-kerja",
  "database-pelanggan",
  "pelanggan",
  "pembukuan",
  "aset",
  "inventaris",
  "harga-produk",
  "tagihan",
];

const lowRiskTemplateSlugs = new Set([
  "template-checklist-acara",
  "template-daftar-belanja-rumah-tangga",
  "template-jadwal-belajar-siswa",
  "template-kalender-konten-media-sosial",
]);

const lowRiskGuideSlugs = new Set([
  "panduan-checklist-kualitas-file-excel",
  "panduan-conditional-formatting-sebagai-alarm",
  "panduan-dropdown-dinamis-excel",
  "panduan-dynamic-array-spill-excel",
  "panduan-excel-table-vs-range",
  "panduan-sparklines-excel",
  "panduan-structured-references-excel-table",
  "panduan-textsplit-excel",
  "panduan-unique-sort-excel",
]);

const publishedWaveSlugs = new Set([
  "panduan-audit-rumus-excel",
  "panduan-checklist-kualitas-file-excel",
  "panduan-dropdown-dinamis-excel",
  "panduan-excel-table-vs-range",
  "panduan-structured-references-excel-table",
]);

const requiredFields = {
  template: ["title", "meta_title", "meta_description", "slug", "category", "date", "file_name", "file_size", "draft"],
  guide: ["title", "meta_title", "meta_description", "slug", "summary", "category", "date", "draft"],
};

function relative(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function readFrontmatter(filePath) {
  const source = readFileSync(filePath, "utf8");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: source };
  return { data: YAML.parse(match[1]) || {}, body: source.slice(match[0].length) };
}

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => path.join(directory, entry.name));
}

function allFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory() ? allFiles(filePath) : [filePath];
  });
}

function asList(value) {
  return Array.isArray(value) ? value : [];
}

function workbookQaFor(templateSlug) {
  const workbookSlug = templateSlug.replace(/^template-/, "");
  const reportPath = path.join(workbookQaRoot, `template-${workbookSlug}.json`);
  if (!existsSync(reportPath)) return undefined;
  const report = JSON.parse(readFileSync(reportPath, "utf8"));
  return report.slug === workbookSlug ? report : undefined;
}

function csvEscape(value) {
  const text = value == null ? "" : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function riskFor(resourceType, slug) {
  if (resourceType === "guide") {
    return /data-model|power-query|audit|validasi-data/i.test(slug) ? "medium" : "low";
  }
  if (highRiskTerms.some((term) => slug.includes(term))) return "high";
  return lowRiskTemplateSlugs.has(slug) ? "low" : "medium";
}

function ownerReason(resourceType, risk, data) {
  if (resourceType === "guide") return "Editorial owner confirms examples, version limits, and source wording before release.";
  if (risk === "high") return `Manual owner acceptance required for finance, HR, customer data, procurement, accounting, or compliance-sensitive use: ${data.title}.`;
  return "Owner confirms intended audience, limitations, and release timing.";
}

function plannedWave(resourceType, risk, slug) {
  if (resourceType === "template" && risk === "low" && lowRiskTemplateSlugs.has(slug)) return "wave-1-low-risk";
  if (resourceType === "guide" && lowRiskGuideSlugs.has(slug)) return "wave-1-low-risk";
  if (risk === "high") return "owner-review-wave";
  return "wave-2-follow-up";
}

const collectionDirectories = {
  template: path.join(contentRoot, "templates"),
  guide: path.join(contentRoot, "guides"),
};
const allEntries = [];
const allResourceSlugs = new Set();
const findings = [];
const errors = [];

for (const directory of ["templates", "guides", "formulas", "troubleshooting", "collections"]) {
  for (const filePath of markdownFiles(path.join(contentRoot, directory))) {
    const { data } = readFrontmatter(filePath);
    if (data.slug) allResourceSlugs.add(data.slug);
  }
}

for (const [resourceType, directory] of Object.entries(collectionDirectories)) {
  for (const filePath of markdownFiles(directory)) {
    const { data } = readFrontmatter(filePath);
    const isPublishedWave = data.draft !== true && publishedWaveSlugs.has(data.slug);
    if (data.draft !== true && !isPublishedWave) continue;
    const slug = data.slug;
    const title = data.title;
    const id = `${resourceType === "template" ? "T" : "G"}-${allEntries.length + 1}`;
    const risk = riskFor(resourceType, slug || path.basename(filePath, ".md"));
    const previewPath = data.preview_image ? path.join(root, "public", data.preview_image.replace(/^\//, "")) : "";
    const downloadPath = resourceType === "template" && data.file_name ? path.join(root, "public", "downloads", data.file_name) : "";
    const workbookQa = resourceType === "template" ? workbookQaFor(slug || "") : undefined;
    const visualReview = resourceType === "template" ? visualReviewBySlug.get(slug) : undefined;
    const relations = [
      ...asList(data.related_templates),
      ...asList(data.related_guides),
      ...asList(data.related_formulas),
      ...asList(data.related_troubleshooting),
    ];
    const missingRelations = relations.filter((relation) => !allResourceSlugs.has(relation));
    const routePath = resourceType === "template"
      ? path.join(distRoot, "templates", data.category || "", slug || "", "index.html")
      : path.join(distRoot, "panduan", data.category || "", slug || "", "index.html");
    const publicHtml = allFiles(distRoot)
      .filter((candidate) => candidate.endsWith(".html") || candidate.endsWith(".xml"))
      .some((candidate) => readFileSync(candidate, "utf8").includes(slug || "__missing_slug__"));
    const missingMetadata = requiredFields[resourceType].filter((field) => data[field] === undefined || data[field] === "");
    const inconsistentFileName = resourceType === "template" && data.file_name !== `${slug}.xlsx`;

    const guideVerified = resourceType === "guide" && guideAudit?.status === "passed";
    const entry = {
      resource_type: resourceType,
      title,
      slug,
      category: data.category,
      draft_path: relative(filePath),
      download_path: resourceType === "template" ? relative(downloadPath) : "not_applicable",
      preview_path: data.preview_image ? relative(previewPath) : "not_applicable",
      risk_level: risk,
      content_status: isPublishedWave ? "published" : guideVerified ? "passed" : "in_progress",
      workbook_qa_status: resourceType === "template" ? (workbookQa?.status === "passed" ? "passed" : workbookQa ? "failed" : "not_started") : "not_applicable",
      render_status: resourceType === "template" ? (visualReview?.render_status || "not_started") : "not_applicable",
      visual_qa_status: resourceType === "template" ? (visualReview?.visual_review_status || "pending_owner_review") : "not_applicable",
      technical_verification_status: resourceType === "template" ? (workbookQa?.status === "passed" ? "passed" : workbookQa ? "failed" : "in_progress") : guideVerified ? "passed" : "in_progress",
      editorial_review_status: isPublishedWave ? "passed" : "in_progress",
      relation_review_status: missingRelations.length ? "failed" : (guideVerified ? "passed" : "in_progress"),
      seo_review_status: guideVerified ? "passed" : "in_progress",
      owner_review_required: isPublishedWave ? "no" : "yes",
      owner_review_reason: isPublishedWave ? "Owner approved for first low-risk wave on 2026-07-14." : ownerReason(resourceType, risk, data),
      publication_wave: isPublishedWave ? "wave-1-low-risk" : plannedWave(resourceType, risk, slug),
      planned_publish_date: isPublishedWave ? "2026-07-14" : "",
      release_status: isPublishedWave ? "published" : guideVerified ? "ready_for_release" : (risk === "high" ? "manual_owner_gate" : "not_started"),
      production_smoke_status: isPublishedWave ? "not_started" : "not_applicable",
      search_console_status: isPublishedWave ? "manual_owner_gate" : "not_applicable",
      notes: isPublishedWave
        ? "Published in first low-risk guide wave; production smoke is recorded after deployment."
        : resourceType === "template" && workbookQa?.status === "passed"
        ? `OOXML structural QA passed; render status: ${visualReview?.render_status || "not_started"}; Microsoft Excel owner visual review remains open.`
        : guideVerified
        ? "Guide rewrite and automated metadata, relation, technical, and draft-leakage checks passed; owner editorial approval and production smoke remain open."
        : resourceType === "template"
        ? "Workbook QA evidence is not yet recorded; keep draft until workbook, preview, editorial, relation, SEO, and owner gates pass."
        : "Guide is editorially prepared but still needs final editorial, image/alt-text, relation, SEO, and owner review.",
    };
    entry.id = id;
    allEntries.push(entry);

    if (!slug || !title) errors.push(`${relative(filePath)}: missing title or slug`);
    if (missingMetadata.length) errors.push(`${relative(filePath)}: missing required metadata ${missingMetadata.join(", ")}`);
    if (data.preview_image && !existsSync(previewPath)) errors.push(`${relative(filePath)}: missing preview ${relative(previewPath)}`);
    if (data.preview_image && !data.preview_alt) errors.push(`${relative(filePath)}: preview_image requires preview_alt`);
    if (resourceType === "template" && !existsSync(downloadPath)) errors.push(`${relative(filePath)}: missing workbook ${relative(downloadPath)}`);
    if (inconsistentFileName) errors.push(`${relative(filePath)}: file_name must match ${slug}.xlsx`);
    if (missingRelations.length) errors.push(`${relative(filePath)}: broken relations ${missingRelations.join(", ")}`);
    if (!workbookQa && resourceType === "template") findings.push(`${relative(filePath)}: workbook QA evidence is missing`);
    if (!isPublishedWave && existsSync(routePath)) errors.push(`${relative(filePath)}: draft generated public route ${relative(routePath)}`);
    if (!isPublishedWave && publicHtml) errors.push(`${relative(filePath)}: draft slug appears in generated HTML/XML`);
  }
}

const duplicateGroups = (field) => Object.entries(Object.groupBy(allEntries, (entry) => entry[field]))
  .filter(([value, entries]) => value && entries.length > 1)
  .map(([value]) => value);
for (const field of ["title", "slug"]) {
  const duplicates = duplicateGroups(field);
  if (duplicates.length) errors.push(`duplicate ${field}: ${duplicates.join(", ")}`);
}

for (const entry of allEntries) {
  for (const field of ["content_status", "workbook_qa_status", "render_status", "visual_qa_status", "technical_verification_status", "editorial_review_status", "relation_review_status", "seo_review_status", "release_status", "production_smoke_status", "search_console_status"]) {
    if (!allowedStatuses.has(entry[field])) errors.push(`${entry.draft_path}: unsupported ${field} value ${entry[field]}`);
  }
}

const csvColumns = [
  "id", "resource_type", "title", "slug", "category", "draft_path", "download_path", "preview_path", "risk_level",
  "content_status", "workbook_qa_status", "render_status", "visual_qa_status", "technical_verification_status", "editorial_review_status",
  "relation_review_status", "seo_review_status", "owner_review_required", "owner_review_reason", "publication_wave",
  "planned_publish_date", "release_status", "production_smoke_status", "search_console_status", "notes",
];
const csv = [csvColumns.join(","), ...allEntries.map((entry) => csvColumns.map((column) => csvEscape(entry[column])).join(","))].join("\n") + "\n";

const report = {
  generatedAt: new Date().toISOString(),
  mainSha: process.env.GITHUB_SHA || "local-working-tree",
  totalDrafts: allEntries.filter((entry) => entry.release_status !== "published").length,
  totalPublishedWave: allEntries.filter((entry) => entry.release_status === "published").length,
  byResourceType: Object.fromEntries(Object.entries(Object.groupBy(allEntries.filter((entry) => entry.release_status !== "published"), (entry) => entry.resource_type)).map(([key, value]) => [key, value.length])),
  byCategory: Object.fromEntries(Object.entries(Object.groupBy(allEntries.filter((entry) => entry.release_status !== "published"), (entry) => entry.category)).map(([key, value]) => [key, value.length])),
  highRiskDrafts: allEntries.filter((entry) => entry.release_status !== "published" && entry.risk_level === "high").map((entry) => ({ title: entry.title, slug: entry.slug, resourceType: entry.resource_type })),
  missingWorkbookQaEvidence: findings,
  errors,
  status: errors.length ? "failed" : "passed_with_open_readiness_gates",
  registerPath: relative(registerPath),
};

mkdirSync(qaRoot, { recursive: true });
writeFileSync(registerPath, csv, "utf8");
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log(`Draft readiness audit: ${report.totalDrafts} drafts; ${report.highRiskDrafts.length} high-risk; ${findings.length} open QA evidence findings; ${errors.length} structural errors.`);
console.log(`Register written to ${relative(registerPath)}`);
console.log(`Report written to ${relative(reportPath)}`);
if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exitCode = 1;
}
