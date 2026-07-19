import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import YAML from "yaml";

const root = process.cwd();
const dist = join(root, "dist");
const expectedAssetHashes = new Map([
  ["public/assets/brand/apple-touch-icon.png", "A9796674D196E5E9E17C0776892F3264F48B26686304396E9A102DC87617D7A5"],
  ["public/assets/brand/favicon-32.png", "A9796674D196E5E9E17C0776892F3264F48B26686304396E9A102DC87617D7A5"],
  ["public/assets/brand/icon-192.png", "A9796674D196E5E9E17C0776892F3264F48B26686304396E9A102DC87617D7A5"],
  ["public/assets/brand/icon-512.png", "A9796674D196E5E9E17C0776892F3264F48B26686304396E9A102DC87617D7A5"],
  ["public/assets/brand/main-icon.png", "2AFB011266AE69A031C2E1CBC9E2B5D6A7F5E856DA1A551E83F7A77523DFC910"],
  ["public/assets/templates/template-budget-bulanan.jpg", "ACE7FABED2CEB94F9C90A597397430018B07877787E344C6D22328D259AB519A"],
  ["public/assets/templates/template-follow-up-pelanggan-excel.jpg", "0527FD0A9AD6DF8A7F168515D726227AE6961B82FCDE64FE6EBC6EA19C6B558D"],
  ["public/assets/templates/template-kalender-planner-2026.jpg", "D50E79116DC10E6BF75FA4C1F799AAB7591F7DD3338051A4378433B2E06872D3"],
  ["public/assets/templates/template-stok-barang-excel-gratis.jpg", "8BD82AB91376EF2CA32B212C493EC2F75161746DB5093E7B632FC73F5FFA0845"],
]);

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function read(path) {
  return readFileSync(path, "utf8");
}

function htmlPath(route) {
  if (route === "/404/") return join(dist, "404.html");
  return join(dist, route.replace(/^\//, ""), "index.html");
}

function routeExists(route) {
  return existsSync(htmlPath(route));
}

function hashFile(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex").toUpperCase();
}

function collectFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? collectFiles(path) : [path];
  });
}

function extractHrefs(html) {
  return [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]);
}

assert(existsSync(dist), "dist belum ada. Jalankan pnpm run build sebelum validate.");

const trustRoutes = [
  "/tentang/", "/kontak/", "/kebijakan-editorial/", "/cara-kami-menguji-template/",
  "/lisensi-template/", "/syarat-ketentuan/", "/privasi/", "/kebijakan-cookie/", "/disclaimer/",
];
const resourceHubs = [
  { route: "/panduan/", directory: "guides" },
  { route: "/rumus-excel/", directory: "formulas" },
  { route: "/masalah-excel/", directory: "troubleshooting" },
  { route: "/koleksi/", directory: "collections" },
].map((hub) => ({
  ...hub,
  hasPublishedContent: collectFiles(join(root, "src", "content", hub.directory))
    .filter((file) => file.endsWith(".md"))
    .some((file) => !/^draft:\s*true\b/m.test(read(file))),
}));
const expectedRoutes = ["/", "/templates/", "/kategori/", "/belajar-excel/", "/sitemap/", "/request-template/", "/404/", ...trustRoutes, ...resourceHubs.map((hub) => hub.route)];
for (const route of expectedRoutes) assert(routeExists(route), `Route tidak terbentuk: ${route}`);

const sitemapPath = join(dist, "sitemap.xml");
assert(existsSync(sitemapPath), "sitemap.xml tidak terbentuk.");
const sitemap = existsSync(sitemapPath) ? read(sitemapPath) : "";
for (const route of ["/", "/templates/", "/kategori/", "/belajar-excel/", "/sitemap/", ...trustRoutes]) {
  assert(sitemap.includes(`https://excelgratis.my.id${route}`), `Sitemap belum memuat ${route}`);
}

const forbiddenSitemapParts = ["/admin/", "/api/", "/downloads/", "/404/"];
for (const part of forbiddenSitemapParts) {
  assert(!sitemap.includes(part), `Sitemap memuat path yang harus dikecualikan: ${part}`);
}
const sitemapLocs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert(!sitemapLocs.some((loc) => loc.includes("?")), "Sitemap memuat URL dengan query parameter.");
assert(new Set(sitemapLocs).size === sitemapLocs.length, "Sitemap memuat URL duplikat.");
assert(sitemap.startsWith("<?xml") && sitemap.includes("<urlset"), "Sitemap bukan XML sitemap yang valid.");
assert(!sitemap.includes("/request-template/"), "Request Template tidak boleh masuk sitemap.");
for (const hub of resourceHubs) {
  assert(sitemap.includes(hub.route) === hub.hasPublishedContent, `Status sitemap hub tidak sesuai resource terbit: ${hub.route}`);
}

const learningHtml = read(htmlPath("/belajar-excel/"));
assert(learningHtml.includes('rel="canonical" href="https://excelgratis.my.id/belajar-excel/"'), "Canonical hub Belajar Excel tidak sesuai.");
for (const [label, href] of [["Panduan", "/panduan/"], ["Rumus Excel", "/rumus-excel/"], ["Masalah Excel", "/masalah-excel/"]]) {
  assert(learningHtml.includes(`href="${href}">${label}</a>`), `Hub Belajar Excel belum menautkan ${label}.`);
}
for (const resourceHub of ["/panduan/", "/rumus-excel/", "/masalah-excel/"]) {
  const html = read(htmlPath(resourceHub));
  for (const [label, href] of [["Panduan", "/panduan/"], ["Rumus Excel", "/rumus-excel/"], ["Masalah Excel", "/masalah-excel/"]]) {
    assert(html.includes(`href="${href}">${label}</a>`), `Arsip resource ${resourceHub} belum menampilkan tautan ${label}.`);
  }
}
const headerSource = read(join(root, "src", "components", "Header.astro"));
assert(headerSource.includes('href="/belajar-excel/"'), "Menu utama belum mengarah ke hub Belajar Excel.");
const bottomNavSource = read(join(root, "src", "components", "BottomNav.astro"));
assert(bottomNavSource.includes('href: "/belajar-excel/"'), "Navigasi bawah belum mengarah ke hub Belajar Excel.");

const requestHtml = read(htmlPath("/request-template/"));
assert(requestHtml.includes('name="robots" content="noindex, follow"'), "Request Template belum noindex.");
for (const hub of resourceHubs) {
  const html = read(htmlPath(hub.route));
  if (hub.hasPublishedContent) {
    assert(!html.includes('name="robots" content="noindex, follow"'), `Hub resource terisi masih noindex: ${hub.route}`);
  } else {
    assert(html.includes('name="robots" content="noindex, follow"'), `Hub resource kosong belum noindex: ${hub.route}`);
    assert(!html.includes("data-ad-slot"), `Hub resource kosong memiliki AdSlot: ${hub.route}`);
  }
}
for (const route of [...trustRoutes, "/request-template/"]) {
  const html = read(htmlPath(route));
  assert(!html.includes("data-ad-slot"), `Halaman trust/form memiliki AdSlot: ${route}`);
}

const templateFiles = collectFiles(join(root, "src", "content", "templates")).filter((path) => path.endsWith(".md"));
const categoryConfig = read(join(root, "src", "config", "site.ts"));
const templateCategorySection = categoryConfig.slice(
  categoryConfig.indexOf("export const categories"),
  categoryConfig.indexOf("export const resourceCategories"),
);
const categorySlugs = [...templateCategorySection.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const templateCategories = new Map();

for (const file of templateFiles) {
  const markdown = read(file);
  const slug = markdown.match(/\nslug:\s*["']?([^"'\n]+)["']?/)?.[1];
  const category = markdown.match(/\ncategory:\s*["']?([^"'\n]+)["']?/)?.[1];
  const fileName = markdown.match(/\nfile_name:\s*["']?([^"'\n]+)["']?/)?.[1];
  const isDraft = /\ndraft:\s*true\b/.test(markdown);
  if (category && !isDraft) templateCategories.set(category, (templateCategories.get(category) || 0) + 1);
  if (slug && category) {
    if (isDraft) {
      assert(!routeExists(`/templates/${category}/${slug}/`), `Draft template tergenerate: ${slug}`);
      assert(!sitemap.includes(`/templates/${category}/${slug}/`), `Draft template masuk sitemap: ${slug}`);
    } else {
      assert(routeExists(`/templates/${category}/${slug}/`), `Template page tidak terbentuk: ${slug}`);
      assert(sitemap.includes(`/templates/${category}/${slug}/`), `Template tidak masuk sitemap: ${slug}`);
    }
  }
  if (fileName) {
    assert(existsSync(join(root, "public", "downloads", fileName)), `File download tidak ditemukan: ${fileName}`);
  }
}

const wave2Workbooks = [
  { file: "template-pembukuan-pengeluaran-usaha.xlsx", sheets: 5 },
  { file: "template-target-tabungan.xlsx", sheets: 4 },
  { file: "template-task-tracker-kanban-excel.xlsx", sheets: 4 },
  { file: "template-notulen-rapat-action-item.xlsx", sheets: 5 },
];
for (const workbook of wave2Workbooks) {
  const reportPath = join(root, "docs", "qa", "batch-3-wave-2", `${workbook.file}.qa.json`);
  const previewPath = join(root, "public", "assets", "templates", workbook.file.replace(".xlsx", ".png"));
  assert(existsSync(reportPath), `Laporan QA Wave 2 tidak ditemukan: ${workbook.file}`);
  assert(existsSync(previewPath), `Preview Wave 2 tidak ditemukan: ${workbook.file}`);
  if (existsSync(reportPath)) {
    const report = JSON.parse(read(reportPath));
    assert(report.status === "passed", `Status QA Wave 2 bukan passed: ${workbook.file}`);
    assert(report.workbook === workbook.file, `Nama workbook tidak sesuai pada QA Wave 2: ${workbook.file}`);
    assert(report.sheets?.length === workbook.sheets, `Jumlah sheet tidak sesuai pada QA Wave 2: ${workbook.file}`);
    assert(report.checks?.every((check) => check.passed), `Ada check QA Wave 2 yang gagal: ${workbook.file}`);
    assert(report.renders?.every((render) => render.rendered), `Render visual QA belum lengkap: ${workbook.file}`);
  }
}

const wave3Workbooks = [
  { file: "template-pengeluaran-harian.xlsx", sheets: 4 },
  { file: "template-jadwal-shift-sederhana.xlsx", sheets: 5 },
  { file: "template-tracker-proyek-sederhana.xlsx", sheets: 6 },
];
for (const workbook of wave3Workbooks) {
  const reportPath = join(root, "docs", "qa", "batch-3-wave-3", `${workbook.file}.qa.json`);
  const previewPath = join(root, "public", "assets", "templates", workbook.file.replace(".xlsx", ".png"));
  assert(existsSync(reportPath), `Laporan QA Wave 3 tidak ditemukan: ${workbook.file}`);
  assert(existsSync(previewPath), `Preview Wave 3 tidak ditemukan: ${workbook.file}`);
  if (existsSync(reportPath)) {
    const report = JSON.parse(read(reportPath));
    assert(report.status === "passed", `Status QA Wave 3 bukan passed: ${workbook.file}`);
    assert(report.workbook === workbook.file, `Nama workbook tidak sesuai pada QA Wave 3: ${workbook.file}`);
    assert(report.sheets?.length === workbook.sheets, `Jumlah sheet tidak sesuai pada QA Wave 3: ${workbook.file}`);
    assert(report.checks?.every((check) => check.passed), `Ada check QA Wave 3 yang gagal: ${workbook.file}`);
    assert(report.renders?.every((render) => render.rendered), `Render visual QA belum lengkap: ${workbook.file}`);
  }
}

const populatedCategories = categorySlugs.filter((slug) => (templateCategories.get(slug) || 0) > 0);
const emptyCategories = categorySlugs.filter((slug) => (templateCategories.get(slug) || 0) === 0);
for (const slug of populatedCategories) {
  assert(routeExists(`/kategori/${slug}/`), `Kategori populated tidak terbentuk: ${slug}`);
  assert(sitemap.includes(`/kategori/${slug}/`), `Kategori populated tidak masuk sitemap: ${slug}`);
}
for (const slug of emptyCategories) {
  const path = htmlPath(`/kategori/${slug}/`);
  assert(existsSync(path), `Kategori kosong tidak tergenerate: ${slug}`);
  const html = existsSync(path) ? read(path) : "";
  assert(html.includes('name="robots" content="noindex, follow"'), `Kategori kosong belum noindex: ${slug}`);
  assert(!sitemap.includes(`/kategori/${slug}/`), `Kategori kosong masuk sitemap: ${slug}`);
}

const notFoundHtml = existsSync(htmlPath("/404/")) ? read(htmlPath("/404/")) : "";
assert(notFoundHtml.includes('name="robots" content="noindex, follow"'), "404 belum noindex.");

const allHtmlFiles = collectFiles(dist).filter(
  (path) => path.endsWith(".html") && !path.startsWith(join(dist, "admin")),
);
for (const file of allHtmlFiles) {
  const html = read(file);
  assert((html.match(/rel="canonical"/g) || []).length <= 1, `Duplicate canonical: ${file}`);
  assert((html.match(/name="robots"/g) || []).length <= 1, `Duplicate robots meta: ${file}`);
  assert(/rel="canonical" href="https:\/\/excelgratis\.my\.id\//.test(html), `Canonical tidak absolute: ${file}`);
  assert(!/\bAI\b|artificial intelligence|human review|workflow AI|AI-assisted|kecerdasan buatan/i.test(html), `Public AI disclosure terdeteksi: ${file}`);
  assert(!html.includes("adsbygoogle.js"), `Production AdSense script terdeteksi: ${file}`);
  assert(!/ca-pub-\d+/i.test(html), `Publisher ID AdSense terdeteksi: ${file}`);
  assert(!/googletagmanager|google-analytics\.com|analytics\.js/i.test(html), `Analytics script terdeteksi: ${file}`);

  for (const href of extractHrefs(html)) {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
    if (href.startsWith("/assets/") || href.startsWith("/downloads/") || href === "/favicon.png" || href === "/site.webmanifest") continue;
    if (href.startsWith("/admin/") || href.startsWith("/api/")) continue;
    const clean = href.split(/[?#]/)[0];
    if (!clean || clean === "/") continue;
    const target = clean.endsWith("/") ? join(dist, clean, "index.html") : join(dist, clean);
    assert(existsSync(target) || existsSync(`${target}.html`) || existsSync(join(dist, clean, "index.html")), `Internal link tidak ditemukan dari ${file}: ${href}`);
  }
}

const cmsConfigPath = join(root, "public", "admin", "config.yml");
const cmsConfig = YAML.parse(read(cmsConfigPath));
const fields = cmsConfig.collections.find((collection) => collection.name === "templates").fields.map((field) => field.name);
for (const field of ["preview_image", "preview_alt", "featured", "draft", "updated_date", "related_templates"]) {
  assert(fields.includes(field), `CMS field belum ada: ${field}`);
}
for (const collectionName of ["site_pages", "guides", "formulas", "troubleshooting", "resource_collections"]) {
  assert(cmsConfig.collections.some((collection) => collection.name === collectionName), `CMS collection belum ada: ${collectionName}`);
}
for (const collectionName of ["guides", "formulas", "troubleshooting"]) {
  const collection = cmsConfig.collections.find((item) => item.name === collectionName);
  const relationFields = collection.fields.filter((field) => field.widget === "relation").map((field) => field.name);
  for (const field of ["related_templates", "related_guides", "related_formulas", "related_troubleshooting"]) {
    assert(relationFields.includes(field), `CMS relation field belum lengkap: ${collectionName}.${field}`);
  }
}
const collectionCms = cmsConfig.collections.find((item) => item.name === "resource_collections");
for (const field of ["templates", "guides", "formulas", "troubleshooting"]) {
  assert(collectionCms.fields.some((item) => item.name === field && item.widget === "relation"), `CMS collection relation belum ada: ${field}`);
}
const fixedPages = ["tentang", "kontak", "request-template", "kebijakan-editorial", "cara-kami-menguji-template", "lisensi-template", "syarat-ketentuan", "privasi", "kebijakan-cookie", "disclaimer"];
for (const slug of fixedPages) {
  const source = join(root, "src", "content", "site-pages", `${slug}.md`);
  assert(existsSync(source), `Konten halaman tetap tidak ditemukan: ${slug}`);
  if (existsSync(source)) {
    const body = read(source);
    for (const field of ["title:", "meta_title:", "meta_description:", "updated_date:"]) assert(body.includes(field), `Metadata ${field} hilang di halaman tetap: ${slug}`);
  }
}
for (const route of ["/kontak/", "/request-template/"]) {
  const html = read(htmlPath(route));
  assert(html.includes("<label"), `Label form tidak ditemukan: ${route}`);
  assert(html.includes('type="checkbox"'), `Consent checkbox tidak ditemukan: ${route}`);
  assert(html.includes("aria-describedby"), `Asosiasi error form tidak ditemukan: ${route}`);
}
assert(!read(join(root, "src", "components", "Footer.astro")).includes('href="/panduan/"'), "Footer menampilkan hub resource kosong secara statis.");

const ciWorkflowPath = join(root, ".github", "workflows", "ci.yml");
assert(existsSync(ciWorkflowPath), "Workflow CI tidak ditemukan: .github/workflows/ci.yml");
const ciWorkflowSource = existsSync(ciWorkflowPath) ? read(ciWorkflowPath) : "";
const ciWorkflow = ciWorkflowSource ? YAML.parse(ciWorkflowSource) : {};
assert(ciWorkflow?.permissions?.contents === "read", "Workflow CI harus memakai permissions contents: read.");
assert(/pull_request:\s*[\s\S]*?branches:\s*[\s\S]*?- main/.test(ciWorkflowSource), "Workflow CI belum berjalan untuk pull request ke main.");
assert(/push:\s*[\s\S]*?branches-ignore:\s*[\s\S]*?- main/.test(ciWorkflowSource), "Workflow CI belum menangani push feature branch.");
assert(/^\s*workflow_dispatch:/m.test(ciWorkflowSource), "Workflow CI belum mendukung workflow_dispatch.");
assert(ciWorkflow?.concurrency?.["cancel-in-progress"] === true, "Workflow CI belum membatalkan run obsolete.");
assert(ciWorkflowSource.includes("runs-on: ubuntu-latest"), "Workflow CI harus memakai Ubuntu runner.");
assert(ciWorkflowSource.includes("pnpm/action-setup@v4") && ciWorkflowSource.includes("version: 10.11.1"), "Setup pnpm CI tidak sesuai packageManager.");
assert(ciWorkflowSource.includes("node-version: 22.12.0") && ciWorkflowSource.includes("cache: pnpm"), "Setup Node atau cache pnpm CI belum benar.");
for (const command of ["pnpm install --frozen-lockfile", "pnpm run check", "pnpm run build", "pnpm run validate"]) {
  assert(ciWorkflowSource.includes(command), `Workflow CI belum menjalankan: ${command}`);
}
assert(!/wrangler\s+deploy|pnpm\s+run\s+deploy|secrets\.|contents:\s*write|actions:\s*write/i.test(ciWorkflowSource), "Workflow CI mengandung deployment, secret, atau write permission.");

const resourceDirectories = ["guides", "formulas", "troubleshooting", "collections"];
const relationFieldsByCollection = {
  guides: ["related_templates", "related_guides", "related_formulas", "related_troubleshooting"],
  formulas: ["related_templates", "related_guides", "related_formulas", "related_troubleshooting"],
  troubleshooting: ["related_templates", "related_guides", "related_formulas", "related_troubleshooting"],
  collections: ["templates", "guides", "formulas", "troubleshooting"],
};
const resourceEntries = new Map();
for (const directory of resourceDirectories) {
  const files = collectFiles(join(root, "src", "content", directory)).filter((path) => path.endsWith(".md"));
  const entries = files.map((file) => {
    const source = read(file);
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || "";
    const data = YAML.parse(frontmatter) || {};
    return { file, data };
  });
  resourceEntries.set(directory, entries);
  for (const { data } of entries) {
    if (data.draft === true) {
      const hub = directory === "guides" ? "panduan" : directory === "formulas" ? "rumus-excel" : directory === "troubleshooting" ? "masalah-excel" : "koleksi";
      const route = directory === "collections" ? `/${hub}/${data.slug}/` : `/${hub}/${data.category}/${data.slug}/`;
      assert(!routeExists(route), `Draft resource tergenerate: ${route}`);
      assert(!sitemap.includes(route), `Draft resource masuk sitemap: ${route}`);
    }
  }
}
const templateSlugs = new Set(templateFiles.map((file) => read(file).match(/\nslug:\s*["']?([^"'\n]+)["']?/)?.[1]).filter(Boolean));
const targetSlugs = {
  templates: templateSlugs,
  guides: new Set(resourceEntries.get("guides").map((item) => item.data.slug)),
  formulas: new Set(resourceEntries.get("formulas").map((item) => item.data.slug)),
  troubleshooting: new Set(resourceEntries.get("troubleshooting").map((item) => item.data.slug)),
};
for (const [directory, entries] of resourceEntries) {
  for (const { file, data } of entries) {
    for (const field of relationFieldsByCollection[directory]) {
      const target = field.replace(/^related_/, "");
      for (const slug of data[field] || []) assert(targetSlugs[target]?.has(slug), `Target relation tidak ditemukan di ${file}: ${field}=${slug}`);
    }
  }
}
for (const example of collectFiles(join(root, "docs", "content-examples"))) {
  assert(!collectFiles(dist).some((file) => file.includes(example.replace(root, ""))), `Contoh dokumentasi masuk build: ${example}`);
}
const resourceHelper = read(join(root, "src", "lib", "resources.ts"));
assert(resourceHelper.includes("getResourceHubUrl") && resourceHelper.includes("getResourceUrl"), "Resource URL builder tidak tersedia.");
assert(resourceHelper.includes("resourceNavigationAvailable"), "Navigation availability helper tidak tersedia.");
assert(!allHtmlFiles.some((file) => /segera hadir|coming soon/i.test(read(file))), "Placeholder coming soon ditemukan pada halaman public.");
const templateDetail = read(htmlPath("/templates/bisnis-umkm/template-stok-barang-excel-gratis/"));
assert(templateDetail.includes("related_template_click"), "Event related-template Batch 1 tidak tersedia.");
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[character]);
}

function getUsageSection(markdown) {
  const headings = [...markdown.matchAll(/^##\s+(.+)$/gm)];
  const index = headings.findIndex((heading) => /cara\s+(pakai|menggunakan)/i.test(heading[1]));
  if (index === -1) return undefined;
  const start = (headings[index].index || 0) + headings[index][0].length;
  const end = headings[index + 1]?.index ?? markdown.length;
  return markdown.slice(start, end).trim();
}

for (const file of templateFiles) {
  const markdown = read(file);
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || "";
  const data = YAML.parse(frontmatter) || {};
  if (data.draft === true) continue;

  const route = `/templates/${data.category}/${data.slug}/`;
  const html = read(htmlPath(route));
  const usageSection = getUsageSection(markdown);
  const expectedHeading = data.usage_heading?.trim();

  assert(Boolean(usageSection), `Section cara pakai tidak ditemukan: ${file}`);
  assert(!html.includes("Download file template Excel."), `Fallback cara pakai ter-render: ${route}`);
  if (expectedHeading) {
    assert(html.includes(`<h2 id="usage-heading">${escapeHtml(expectedHeading)}</h2>`), `Heading cara pakai tidak sesuai frontmatter: ${route}`);
  } else {
    assert(/<h2 id="usage-heading">[^<]*cara\s+(pakai|menggunakan)[^<]*<\/h2>/i.test(html), `Heading cara pakai tidak valid: ${route}`);
  }
}

for (const [path, expectedHash] of expectedAssetHashes) {
  const absolute = join(root, path);
  assert(existsSync(absolute), `Aset beku hilang: ${path}`);
  assert(hashFile(absolute) === expectedHash, `Checksum aset berubah: ${path}`);
}

if (failures.length > 0) {
  console.error("Validation gagal:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validation passed. ${expectedAssetHashes.size} frozen assets verified.`);
