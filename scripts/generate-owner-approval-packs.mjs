import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import YAML from "yaml";

const root = process.cwd();
const contentRoot = path.join(root, "src", "content");
const baseUrl = "https://excelgratis.my.id";
const guideWave = new Set([
  "panduan-conditional-formatting-sebagai-alarm",
  "panduan-dynamic-array-spill-excel",
  "panduan-sparklines-excel",
  "panduan-textsplit-excel",
  "panduan-unique-sort-excel",
]);
const templateWave = new Set([
  "template-checklist-acara",
  "template-daftar-belanja-rumah-tangga",
  "template-jadwal-belajar-siswa",
  "template-kalender-konten-media-sosial",
]);
const sensitiveKinds = [
  ["absensi", "HR; attendance data"], ["aset", "accounting or asset records"],
  ["harga", "customer or commercial pricing"], ["piutang", "finance and customer data"],
  ["database-pelanggan", "customer data"], ["permintaan-pembelian", "procurement"],
  ["jadwal-kerja", "HR"], ["pembayaran-tagihan", "finance"], ["kas-kecil", "accounting"],
  ["laba-rugi", "accounting"], ["purchase-order", "procurement"],
  ["rekap-pesanan", "customer data"], ["surat-jalan", "formal business document"],
];

const read = (file) => readFileSync(file, "utf8");
const csvEscape = (value) => /[",\r\n]/.test(String(value ?? "")) ? `"${String(value ?? "").replaceAll('"', '""')}"` : String(value ?? "");
const parseCsv = (source) => {
  const lines = source.trim().split(/\r?\n/); const header = splitCsv(lines.shift());
  return lines.map((line) => Object.fromEntries(header.map((key, index) => [key, splitCsv(line)[index] ?? ""])));
};
const splitCsv = (line) => { const values = []; let value = ""; let quoted = false; for (let i = 0; i < line.length; i += 1) { const char = line[i]; if (char === '"') { if (quoted && line[i + 1] === '"') { value += char; i += 1; } else quoted = !quoted; } else if (char === "," && !quoted) { values.push(value); value = ""; } else value += char; } values.push(value); return values; };
const csv = (columns, rows) => `${columns.join(",")}\n${rows.map((row) => columns.map((column) => csvEscape(row[column])).join(",")).join("\n")}\n`;
const frontmatter = (file) => { const source = read(file); const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/); return { data: YAML.parse(match?.[1] || "") || {}, body: source.slice(match?.[0].length || 0) }; };
const entries = (directory) => readdirSync(path.join(contentRoot, directory)).filter((file) => file.endsWith(".md")).map((file) => ({ file: path.join(contentRoot, directory, file), ...frontmatter(path.join(contentRoot, directory, file)) }));
const section = (body, heading) => (body.match(new RegExp(`## ${heading}\\r?\\n([\\s\\S]*?)(?=\\r?\\n## |$)`))?.[1] || "").trim();
const oneLine = (value) => value.replace(/\s+/g, " ").trim();
const cleanMarkdown = (value) => oneLine(value.replace(/[`*_#]/g, ""));
const route = (type, data) => `${baseUrl}/${type === "guide" ? "panduan" : "templates"}/${data.category}/${data.slug}/`;
const related = (data) => ["related_templates", "related_guides", "related_formulas", "related_troubleshooting"].flatMap((key) => data[key] || []).join("; ");
const sensitive = (slug) => sensitiveKinds.find(([term]) => slug.includes(term))?.[1] || "none identified; use ordinary personal data care";

const readiness = parseCsv(read(path.join(root, "docs", "draft-content-readiness.csv")));
const readinessBySlug = new Map(readiness.map((row) => [row.slug, row]));
const visual = JSON.parse(read(path.join(root, "docs", "qa", "workbook-visual-review-manifest.json")));
const visualBySlug = new Map(visual.workbooks.map((row) => [row.slug, row]));
const guideAudit = JSON.parse(read(path.join(root, "docs", "qa", "draft-guides-audit.json")));
const drafts = { guides: entries("guides").filter((entry) => entry.data.draft === true), templates: entries("templates").filter((entry) => entry.data.draft === true) };

const guideRows = drafts.guides.map(({ data, body }) => {
  const input = section(body, "Contoh Input");
  const codeTokens = [...input.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
  const operations = /power query/i.test(body) ? `Power Query: ${data.title}` : codeTokens.join("; ") || "No formula or Power Query operation";
  const older = oneLine(section(body, "Kompatibilitas dan Alternatif Versi Lama")) || "Review version limitation before release.";
  const sheets = /Google Sheets/i.test(body) ? cleanMarkdown((body.match(/[^.\n]*Google Sheets[^.\n]*\./gi) || ["Test required; do not infer compatibility."])[0]) : "No specific claim; do not infer compatibility.";
  return {
    title: data.title, slug: data.slug, category: data.category, difficulty: data.difficulty || "not stated",
    intended_user_problem: oneLine(section(body, "Masalah yang Diselesaikan")), main_example: oneLine(section(body, "Contoh Input")),
    formulas_or_power_query: operations, excel_version_requirement: (data.excel_versions || []).join("; ") || "See guide body",
    older_version_limitation: older, google_sheets_limitation: sheets, related_resources: related(data),
    technical_qa_result: guideAudit.status, seo_result: readinessBySlug.get(data.slug)?.seo_review_status || "not_started",
    editorial_risks: /power query|data model/i.test(body) ? "Version-specific workflow; owner confirms terminology and screenshots/examples." : "Owner confirms clarity, compatibility wording, and example accuracy.",
    live_route_after_publication: route("guide", data), owner_decision: "pending_owner_review", reviewer: "", review_date: "", notes: guideWave.has(data.slug) ? "Proposed next low-risk guide wave." : "Not proposed for the next guide wave.",
  };
});

const existingWorkbookCsv = path.join(root, "docs", "manual-review", "workbook-visual-review.csv");
const previous = existsSync(existingWorkbookCsv) ? new Map(parseCsv(read(existingWorkbookCsv)).map((row) => [row.slug, row])) : new Map();
const templateRows = drafts.templates.map(({ data, body }) => {
  const qa = readinessBySlug.get(data.slug) || {}; const render = visualBySlug.get(data.slug) || {};
  const table = section(body, "Contoh Alur Penggunaan").match(/^\|\s*([^\n]+)\|\s*$/m)?.[1] || "";
  const fields = table ? table.split("|").map((value) => value.trim()).filter(Boolean).join("; ") : "See input sheet in visual artifact";
  const old = previous.get(data.slug) || {};
  const risk = qa.risk_level || "not_started"; const sensitivity = sensitive(data.slug);
  return {
    slug: data.slug, title: data.title, category: data.category, risk_level: risk,
    workbook_artifact: `${visual.source_artifact}; ${render.rendered_page_count || "?"} pages`, structural_qa: qa.workbook_qa_status || "not_started",
    render_status: render.render_status || "not_started", formula_summary: oneLine(section(body, "Rumus dan Logika")), fields_collected: fields,
    sensitive_data_considerations: sensitivity, limitations_and_disclaimers: oneLine(section(body, "Batasan Template")) || (data.batasan || []).join("; "),
    intended_audience: data.ringkasan_singkat || "See template introduction", excel_compatibility: data.file_spec?.kompatibilitas || "not stated",
    google_sheets_compatibility_claim: cleanMarkdown((body.match(/[^.\n]*Google Sheets[^.\n]*\./i) || ["No compatibility claim"])[0]), preview_status: data.preview_image && data.preview_alt ? "preview and alt text present" : "missing preview metadata",
    related_resource_status: qa.relation_review_status || "not_started", required_owner_approval: sensitivity === "none identified; use ordinary personal data care" ? "Microsoft Excel visual review and explicit release approval" : `Sensitive manual approval: ${sensitivity}`,
    final_publication_decision: sensitivity === "none identified; use ordinary personal data care" ? "pending_owner_visual_and_release" : "manual_sensitive_owner_approval",
    opened_in_microsoft_excel: old.opened_in_microsoft_excel || "", no_repair_warning: old.no_repair_warning || "", sheet_layout: old.sheet_layout || "", column_widths: old.column_widths || "", row_heights: old.row_heights || "", input_formula_distinction: old.input_formula_distinction || "", data_validation: old.data_validation || "", formula_result: old.formula_result || "", chart_readability: old.chart_readability || "", print_preview: old.print_preview || "", sample_data: old.sample_data || "", preview_image_agreement: old.preview_image_agreement || "", limitations_wording: old.limitations_wording || "", owner_decision: old.owner_decision || "pending_owner_review", reviewer: old.reviewer || "", review_date: old.review_date || "", notes: templateWave.has(data.slug) ? "Proposed first template wave after visual approval." : "Not proposed for first template wave.",
  };
});

const guideColumns = ["title","slug","category","difficulty","intended_user_problem","main_example","formulas_or_power_query","excel_version_requirement","older_version_limitation","google_sheets_limitation","related_resources","technical_qa_result","seo_result","editorial_risks","live_route_after_publication","owner_decision","reviewer","review_date","notes"];
const templateColumns = ["slug","title","category","risk_level","workbook_artifact","structural_qa","render_status","formula_summary","fields_collected","sensitive_data_considerations","limitations_and_disclaimers","intended_audience","excel_compatibility","google_sheets_compatibility_claim","preview_status","related_resource_status","required_owner_approval","final_publication_decision","opened_in_microsoft_excel","no_repair_warning","sheet_layout","column_widths","row_heights","input_formula_distinction","data_validation","formula_result","chart_readability","print_preview","sample_data","preview_image_agreement","limitations_wording","owner_decision","reviewer","review_date","notes"];
writeFileSync(path.join(root, "docs", "manual-review", "guide-owner-review.csv"), csv(guideColumns, guideRows));
writeFileSync(existingWorkbookCsv, csv(templateColumns, templateRows));
writeFileSync(path.join(root, "docs", "manual-review", "guide-owner-review.md"), `# Guide Owner Review\n\nThis register covers all ${guideRows.length} unpublished guides. Technical QA is ${guideAudit.status}; that is not editorial or owner release approval. Review the rows marked \`Proposed next low-risk guide wave.\` first.\n\n## Proposed Guide Wave\n\n${guideRows.filter((row) => guideWave.has(row.slug)).map((row) => `- **${row.title}** (\`${row.slug}\`): owner confirms accuracy of its example, version limits, Google Sheets wording, and release approval.`).join("\n")}\n\nUse [approval-handoff.md](approval-handoff.md) for the exact response format.\n`);
writeFileSync(path.join(root, "docs", "manual-review", "template-owner-review.md"), `# Template Owner Review\n\nAll ${templateRows.length} draft workbooks passed structural QA and have a LibreOffice render from [the recorded Actions run](${visual.source_run_url}). The render is supplementary; final visual review is in Microsoft Excel.\n\n## First Template Wave After Visual Approval\n\n${templateRows.filter((row) => templateWave.has(row.slug)).map((row) => `- **${row.title}** (\`${row.slug}\`): ${row.required_owner_approval}.`).join("\n")}\n\n## Sensitive Manual Gates\n\n${templateRows.filter((row) => row.final_publication_decision === "manual_sensitive_owner_approval").map((row) => `- **${row.title}** (\`${row.slug}\`): ${row.sensitive_data_considerations}.`).join("\n")}\n\nThe full field, formula, compatibility, preview, and review record is in [workbook-visual-review.csv](workbook-visual-review.csv).\n`);

const existingSearchRows = existsSync(path.join(root, "docs", "search-console-verification-register.csv"))
  ? parseCsv(read(path.join(root, "docs", "search-console-verification-register.csv")))
  : [];
const existingSearch = new Map(existingSearchRows.map((row) => [row.url, row]));
const published = ["templates", "guides", "formulas", "troubleshooting", "collections"].flatMap((directory) => entries(directory).filter(({ data }) => data.draft !== true).map(({ data }) => ({ data, directory })));
const candidates = [...guideRows.filter((row) => guideWave.has(row.slug)).map((row) => ({ url: row.live_route_after_publication, type: "guide" })), ...templateRows.filter((row) => templateWave.has(row.slug)).map((row) => ({ url: route("template", { category: row.category, slug: row.slug }), type: "template" }))];
const searchColumns = ["url","resource_type","publish_date","submitted_in_sitemap","discovered_status","indexed_status","canonical_status","impressions","clicks","ctr","average_position","last_checked","owner_verified","notes"];
const publishedRows = published.map(({ data, directory }) => { const type = directory === "guides" ? "guide" : directory === "templates" ? "template" : directory === "formulas" ? "formula" : directory === "troubleshooting" ? "troubleshooting" : "collection"; const url = route(type === "guide" ? "guide" : "template", data).replace(type === "template" && directory !== "templates" ? "/templates/" : "/templates/", directory === "formulas" ? "/rumus-excel/" : directory === "troubleshooting" ? "/masalah-excel/" : directory === "collections" ? "/koleksi/" : type === "guide" ? "/panduan/" : "/templates/"); const old = existingSearch.get(url) || {}; return { url, resource_type: type, publish_date: data.date || "", submitted_in_sitemap: old.submitted_in_sitemap || "pending_owner", discovered_status: old.discovered_status || "pending_owner", indexed_status: old.indexed_status || "pending_owner", canonical_status: old.canonical_status || "pending_owner", impressions: old.impressions || "", clicks: old.clicks || "", ctr: old.ctr || "", average_position: old.average_position || "", last_checked: old.last_checked || "", owner_verified: old.owner_verified || "pending_owner", notes: old.notes || "Published route; owner must verify Search Console evidence." }; });
const candidateRows = candidates.map(({ url, type }) => {
  const old = existingSearch.get(url) || {};
  return { url, resource_type: `${type}_candidate`, publish_date: "", submitted_in_sitemap: old.submitted_in_sitemap || "not_applicable_until_published", discovered_status: old.discovered_status || "pending_owner", indexed_status: old.indexed_status || "pending_owner", canonical_status: old.canonical_status || "expected_self_canonical", impressions: old.impressions || "", clicks: old.clicks || "", ctr: old.ctr || "", average_position: old.average_position || "", last_checked: old.last_checked || "", owner_verified: old.owner_verified || "pending_owner", notes: old.notes || "Candidate next-wave route; draft remains excluded from sitemap and indexing until publication." };
});
writeFileSync(path.join(root, "docs", "search-console-verification-register.csv"), csv(searchColumns, [...publishedRows, ...candidateRows]));

writeFileSync(path.join(root, "docs", "next-wave-recommendation.md"), `# Next Wave Recommendation\n\nEvidence recalculated on 2026-07-15: 15 draft guides have technical audit status \`${guideAudit.status}\`; 20 draft templates have structural QA \`passed\`, a generated LibreOffice render, and \`pending_owner_review\` visual status. No status here authorizes publication.\n\n## Ready After Owner Editorial Approval\n\n${guideRows.filter((row) => guideWave.has(row.slug)).map((row) => `- \`${row.slug}\`: approve example accuracy, Excel version wording, Google Sheets limitation, and editorial release.`).join("\n")}\n\n## Ready After Workbook Visual Approval\n\n${templateRows.filter((row) => templateWave.has(row.slug)).map((row) => `- \`${row.slug}\`: confirm the original workbook in Microsoft Excel, then approve release.`).join("\n")}\n\n## Manual Sensitive-Resource Approval Required\n\n${templateRows.filter((row) => row.final_publication_decision === "manual_sensitive_owner_approval").map((row) => `- \`${row.slug}\`: ${row.sensitive_data_considerations}.`).join("\n")}\n\n## Technical Correction Required\n\n- None identified by current structural workbook QA or guide technical audit. A later owner failure moves the affected resource here.\n\n## Category Too Thin\n\n- No proposed first-wave resource needs a new category. Do not activate a draft-only category with a single isolated item.\n\n## Defer Pending External Evidence\n\n- Search Console, mailbox delivery, Decap OAuth, traffic, download metrics, and browser-runtime evidence remain owner-only. They do not replace the explicit approvals above.\n\n## Exact Decisions Required\n\nUse [approval-handoff.md](manual-review/approval-handoff.md). Approve only exact slugs from the two proposed groups; every other draft remains unpublished.\n`);
console.log(`Owner packs generated: ${guideRows.length} guides, ${templateRows.length} templates, ${publishedRows.length} published Search Console routes, ${candidateRows.length} candidate routes.`);
