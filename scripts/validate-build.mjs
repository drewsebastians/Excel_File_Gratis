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

const expectedRoutes = ["/", "/templates/", "/kategori/", "/sitemap/", "/tentang/", "/privasi/", "/disclaimer/", "/404/"];
for (const route of expectedRoutes) assert(routeExists(route), `Route tidak terbentuk: ${route}`);

const sitemapPath = join(dist, "sitemap.xml");
assert(existsSync(sitemapPath), "sitemap.xml tidak terbentuk.");
const sitemap = existsSync(sitemapPath) ? read(sitemapPath) : "";
for (const route of ["/", "/templates/", "/kategori/", "/sitemap/"]) {
  assert(sitemap.includes(`https://excelgratis.my.id${route}`), `Sitemap belum memuat ${route}`);
}

const forbiddenSitemapParts = ["/admin/", "/api/", "/downloads/", "/404/"];
for (const part of forbiddenSitemapParts) {
  assert(!sitemap.includes(part), `Sitemap memuat path yang harus dikecualikan: ${part}`);
}
const sitemapLocs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert(!sitemapLocs.some((loc) => loc.includes("?")), "Sitemap memuat URL dengan query parameter.");

const templateFiles = collectFiles(join(root, "src", "content", "templates")).filter((path) => path.endsWith(".md"));
const categoryConfig = read(join(root, "src", "config", "site.ts"));
const categorySlugs = [...categoryConfig.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
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

const allHtmlFiles = collectFiles(dist).filter((path) => path.endsWith(".html"));
for (const file of allHtmlFiles) {
  const html = read(file);
  assert((html.match(/rel="canonical"/g) || []).length <= 1, `Duplicate canonical: ${file}`);
  assert((html.match(/name="robots"/g) || []).length <= 1, `Duplicate robots meta: ${file}`);
  assert(!html.includes("adsbygoogle.js"), `Production AdSense script terdeteksi: ${file}`);
  assert(!/ca-pub-\d+/i.test(html), `Publisher ID AdSense terdeteksi: ${file}`);

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
for (const field of ["preview_image", "preview_alt", "featured", "updated_date", "related_templates"]) {
  assert(fields.includes(field), `CMS field belum ada: ${field}`);
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
