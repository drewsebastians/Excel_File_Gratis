import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const reportPath = join(root, "docs", "qa", "site-discovery-audit.json");
const baseUrl = "https://excelgratis.my.id";
const checks = [];

function record(id, passed, detail) {
  checks.push({ id, passed, detail });
}

function read(path) {
  return readFileSync(path, "utf8");
}

function htmlPath(route) {
  return route === "/" ? join(dist, "index.html") : join(dist, route.replace(/^\//, ""), "index.html");
}

function routeExists(route) {
  return existsSync(htmlPath(route));
}

function collectHtmlFiles(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((entry) => {
    const entryPath = join(directory, entry);
    return statSync(entryPath).isDirectory() ? collectHtmlFiles(entryPath) : entryPath.endsWith(".html") ? [entryPath] : [];
  });
}

function hasHref(html, href) {
  return html.includes(`href="${href}"`) || html.includes(`href='${href}'`);
}

if (!existsSync(dist)) {
  console.error("dist belum ada. Jalankan pnpm run build sebelum audit:discovery.");
  process.exit(1);
}

const publicEntryPoints = ["/", "/templates/", "/kategori/", "/belajar-excel/", "/struktur-konten/", "/panduan/", "/rumus-excel/", "/masalah-excel/", "/koleksi/", "/sitemap/"];
const resourceArchives = ["/panduan/", "/rumus-excel/", "/masalah-excel/"];

for (const route of publicEntryPoints) {
  record(`route:${route}`, routeExists(route), routeExists(route) ? "route tersedia" : "route tidak terbentuk");
  if (!routeExists(route)) continue;
  const html = read(htmlPath(route));
  record(`canonical:${route}`, html.includes(`rel="canonical" href="${baseUrl}${route}"`), "canonical harus menunjuk ke route publik yang sama");
}

const hubHtml = routeExists("/belajar-excel/") ? read(htmlPath("/belajar-excel/")) : "";
for (const route of resourceArchives) {
  record(`learning-hub:${route}`, hasHref(hubHtml, route), "hub Belajar Excel harus menautkan seluruh arsip resource");
}

for (const archive of resourceArchives) {
  const html = routeExists(archive) ? read(htmlPath(archive)) : "";
  for (const route of resourceArchives) {
    record(`archive-navigation:${archive}:${route}`, hasHref(html, route), "setiap arsip resource harus menyediakan jalur ke ketiga jenis resource");
  }
}

const headerSource = read(join(root, "src", "components", "Header.astro"));
const bottomNavSource = read(join(root, "src", "components", "BottomNav.astro"));
record("desktop-navigation:learning-hub", headerSource.includes('href="/belajar-excel/"'), "menu desktop Belajar Excel harus menuju hub");
record("mobile-navigation:learning-hub", bottomNavSource.includes('href: "/belajar-excel/"'), "navigasi bawah mobile harus menuju hub");

const sitemapPath = join(dist, "sitemap.xml");
const sitemap = existsSync(sitemapPath) ? read(sitemapPath) : "";
record("xml-sitemap:exists", existsSync(sitemapPath), "sitemap.xml harus terbentuk");
for (const route of ["/templates/", "/kategori/", "/belajar-excel/", "/struktur-konten/", ...resourceArchives]) {
  record(`xml-sitemap:${route}`, sitemap.includes(`${baseUrl}${route}`), "entry point publik harus berada di XML sitemap");
}
const sitemapLocs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
record("xml-sitemap:no-duplicates", sitemapLocs.length === new Set(sitemapLocs).size, "XML sitemap tidak boleh berisi URL duplikat");

const htmlSitemap = routeExists("/sitemap/") ? read(htmlPath("/sitemap/")) : "";
record("html-sitemap:learning-hub", hasHref(htmlSitemap, "/belajar-excel/"), "HTML sitemap harus menautkan hub Belajar Excel");
record("html-sitemap:content-hierarchy", hasHref(htmlSitemap, "/struktur-konten/"), "HTML sitemap harus menautkan Struktur Konten");

const allPublicHtml = collectHtmlFiles(dist).filter((file) => relative(dist, file).split(/[\\/]/)[0] !== "admin");
for (const file of allPublicHtml) {
  const html = read(file);
  const canonicalCount = (html.match(/rel="canonical"/g) || []).length;
  record(`single-canonical:${relative(dist, file)}`, canonicalCount === 1, "setiap halaman publik harus memiliki tepat satu canonical");
}

const result = {
  generatedAt: new Date().toISOString(),
  status: checks.every((check) => check.passed) ? "passed" : "failed",
  scope: "Information architecture, navigation discoverability, canonical, and sitemap entry points.",
  checks,
};
mkdirSync(join(root, "docs", "qa"), { recursive: true });
writeFileSync(reportPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
if (result.status !== "passed") process.exitCode = 1;
