import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

const root = process.cwd();
const siteUrl = "https://excelgratis.my.id";
const collections = [
  { directory: "templates", route: (entry) => `/templates/${entry.category}/${entry.slug}/` },
  { directory: "guides", route: (entry) => `/panduan/${entry.category}/${entry.slug}/` },
  { directory: "formulas", route: (entry) => `/rumus-excel/${entry.category}/${entry.slug}/` },
  { directory: "troubleshooting", route: (entry) => `/masalah-excel/${entry.category}/${entry.slug}/` },
  { directory: "collections", route: (entry) => `/koleksi/${entry.slug}/` },
];
const expectedCounts = { templates: 15, guides: 13, formulas: 6, troubleshooting: 6, collections: 3 };
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

function frontmatter(filePath) {
  const raw = readFileSync(filePath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error(`Frontmatter tidak ditemukan: ${filePath}`);
  return parse(match[1]);
}

const resources = [];
for (const collection of collections) {
  const directory = join(root, "src", "content", collection.directory);
  for (const file of readdirSync(directory).filter((name) => name.endsWith(".md"))) {
    const entry = frontmatter(join(directory, file));
    if (!entry.draft) resources.push({ ...entry, collection: collection.directory, route: collection.route(entry), file });
  }
}

const counts = Object.fromEntries(collections.map(({ directory }) => [directory, resources.filter((entry) => entry.collection === directory).length]));
for (const [collection, expected] of Object.entries(expectedCounts)) {
  assert(counts[collection] === expected, `Jumlah ${collection} ${counts[collection]} tidak sama dengan target ${expected}`);
}

for (const field of ["date"]) {
  for (const entry of resources) assert(Boolean(entry[field]), `${entry.collection}/${entry.file} tidak memiliki ${field}`);
}
for (const field of ["title", "meta_title", "meta_description", "slug"]) {
  const values = new Map();
  for (const entry of resources) {
    assert(Boolean(entry[field]), `${entry.collection}/${entry.file} tidak memiliki ${field}`);
    const key = String(entry[field]).trim().toLowerCase();
    if (values.has(key)) assert(false, `${field} duplikat: ${entry[field]}`);
    values.set(key, entry.file);
  }
}

const bannedPhrases = [
  "di era digital yang serba cepat", "seiring berkembangnya zaman", "tidak dapat dipungkiri",
  "pada dasarnya", "tentunya", "solusi terbaik", "solusi lengkap", "game changer", "merevolusi",
];
for (const entry of resources) {
  const source = readFileSync(join(root, "src", "content", entry.collection, entry.file), "utf8").toLowerCase();
  for (const phrase of bannedPhrases) assert(!source.includes(phrase), `Frasa editorial terlarang: ${entry.collection}/${entry.file}: ${phrase}`);
}

const manifestPath = join(root, "docs", "content-rewrite", "rewrite-manifest.yaml");
assert(existsSync(manifestPath), "Rewrite manifest tidak ditemukan.");
const manifestSource = existsSync(manifestPath) ? readFileSync(manifestPath, "utf8") : "";
for (const entry of resources) {
  const expectedPath = `src/content/${entry.collection}/${entry.file}`;
  assert(manifestSource.includes(`path: ${expectedPath}`), `Resource published belum dicatat di manifest: ${expectedPath}`);
}

const sitemapFiles = existsSync(join(root, "dist"))
  ? readdirSync(join(root, "dist")).filter((name) => /^sitemap.*\.xml$/.test(name))
  : [];
const sitemap = sitemapFiles.map((file) => readFileSync(join(root, "dist", file), "utf8")).join("\n");
for (const entry of resources) {
  const htmlPath = join(root, "dist", entry.route, "index.html");
  assert(existsSync(htmlPath), `Route tidak dibangun: ${entry.route}`);
  assert(sitemap.includes(`${siteUrl}${entry.route}`), `Route tidak ada di sitemap: ${entry.route}`);
  if (existsSync(htmlPath)) {
    const html = readFileSync(htmlPath, "utf8");
    assert((html.match(/<link rel="canonical"/g) || []).length === 1, `Canonical tidak tunggal: ${entry.route}`);
    assert(html.includes(`<link rel="canonical" href="${siteUrl}${entry.route}"`), `Canonical tidak sesuai: ${entry.route}`);
    assert(html.includes("application/ld+json"), `JSON-LD tidak ditemukan: ${entry.route}`);
  }
  if (entry.collection === "templates") {
    assert(existsSync(join(root, "public", "downloads", entry.file_name)), `Download tidak ditemukan: ${entry.file_name}`);
    assert(existsSync(join(root, "public", entry.preview_image?.replace(/^\//, "") || "")), `Preview tidak ditemukan: ${entry.slug}`);
  }
}

const report = {
  status: failures.length === 0 ? "passed" : "failed",
  auditedAt: new Date().toISOString(),
  counts,
  resourcesChecked: resources.length,
  sitemapFiles,
  checks: [
    "published inventory count",
    "required metadata and uniqueness",
    "built route, canonical, JSON-LD, and sitemap presence",
    "template download and preview assets",
    "banned editorial phrases",
    "published-resource manifest coverage",
  ],
  failures,
};
const outputDirectory = join(root, "docs", "qa");
mkdirSync(outputDirectory, { recursive: true });
writeFileSync(join(outputDirectory, "batch-3-portfolio-audit.json"), `${JSON.stringify(report, null, 2)}\n`);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exit(1);
}
console.log(JSON.stringify(report, null, 2));
