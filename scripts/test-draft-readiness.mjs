import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import YAML from "yaml";

const root = process.cwd();
const read = (file) => readFileSync(file, "utf8");
const fail = (message) => { throw new Error(message); };
const csvRows = read(path.join(root, "docs", "draft-content-readiness.csv")).trim().split(/\r?\n/);
const header = csvRows.shift().split(",");
const parseCsv = (line) => {
  const values = []; let value = ""; let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') { if (quoted && line[i + 1] === '"') { value += char; i += 1; } else quoted = !quoted; }
    else if (char === "," && !quoted) { values.push(value); value = ""; } else value += char;
  }
  values.push(value); return Object.fromEntries(header.map((key, index) => [key, values[index] || ""]));
};
const rows = csvRows.map(parseCsv);
const content = (directory) => readdirSync(path.join(root, "src", "content", directory)).filter((file) => file.endsWith(".md")).map((file) => {
  const source = read(path.join(root, "src", "content", directory, file));
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return YAML.parse(match?.[1] || "") || {};
});
const templates = content("templates");
const guides = content("guides");
const draftTemplates = templates.filter((entry) => entry.draft === true);
const draftGuides = guides.filter((entry) => entry.draft === true);
const summary = JSON.parse(read(path.join(root, "docs", "qa", "draft-workbooks", "summary.json")));
const sitemap = read(path.join(root, "dist", "sitemap.xml"));

if (rows.filter((row) => row.release_status !== "published").length !== draftTemplates.length + draftGuides.length) fail("register draft count differs from source content");
if (summary.passed !== 20 || summary.total !== 20) fail("workbook summary is not a complete passed portfolio");
for (const template of draftTemplates) {
  const row = rows.find((candidate) => candidate.slug === template.slug);
  if (!row) fail(`missing readiness row for ${template.slug}`);
  if (row.workbook_qa_status !== "passed" || row.technical_verification_status !== "passed") fail(`structural QA was not recognized for ${template.slug}`);
  if (row.visual_qa_status === "passed") fail(`visual QA must remain unapproved for ${template.slug}`);
  if (row.owner_review_required !== "yes") fail(`owner review removed for ${template.slug}`);
  if (row.risk_level === "high" && row.release_status !== "manual_owner_gate") fail(`high-risk gate removed for ${template.slug}`);
  const route = path.join(root, "dist", "templates", template.category, template.slug, "index.html");
  if (existsSync(route) || sitemap.includes(template.slug)) fail(`draft template leaked publicly: ${template.slug}`);
}
for (const guide of draftGuides) {
  const route = path.join(root, "dist", "panduan", guide.category, guide.slug, "index.html");
  if (existsSync(route) || sitemap.includes(guide.slug)) fail(`draft guide leaked publicly: ${guide.slug}`);
}
console.log(`Draft readiness regression test passed: ${draftTemplates.length} templates, ${draftGuides.length} guides, ${rows.filter((row) => row.release_status === "published").length} published-wave rows.`);
