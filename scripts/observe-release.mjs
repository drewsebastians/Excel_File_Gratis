import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const baseUrl = (process.env.PRODUCTION_BASE_URL || "https://excelgratis.my.id").replace(/\/$/, "");
const outputPath = path.join(root, "docs", "qa", "release-observation.json");
const contentRoot = path.join(root, "src", "content");
const routeBases = { templates: "templates", guides: "panduan", formulas: "rumus-excel", troubleshooting: "masalah-excel", collections: "koleksi" };
const resources = [];
const errors = [];

function frontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  for (const line of match?.[1]?.split(/\r?\n/) || []) {
    const item = line.match(/^(slug|category|draft|title|meta_description|preview_image|file_name):\s*["']?([^"']*)["']?\s*$/);
    if (item) data[item[1]] = item[2].trim();
  }
  return data;
}

for (const [directory, base] of Object.entries(routeBases)) {
  const folder = path.join(contentRoot, directory);
  for (const file of await readdir(folder)) {
    if (!file.endsWith(".md")) continue;
    const data = frontmatter(await readFile(path.join(folder, file), "utf8"));
    if (!data.slug || data.draft === "true") continue;
    const route = directory === "collections" ? `/${base}/${data.slug}/` : `/${base}/${data.category}/${data.slug}/`;
    resources.push({ resourceType: directory, slug: data.slug, route, title: data.title || "", metaDescription: data.meta_description || "", previewImage: data.preview_image || "", fileName: data.file_name || "" });
  }
}

async function fetchPage(route) {
  const url = `${baseUrl}${route}`;
  try {
    const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000) });
    return { url, status: response.status, body: await response.text(), contentType: response.headers.get("content-type") || "" };
  } catch (error) {
    return { url, status: 0, body: "", contentType: "", error: error.message };
  }
}

const sitemapPage = await fetchPage("/sitemap.xml");
const sitemapUrls = [...sitemapPage.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]).pathname);
const routeResults = [];
for (const resource of resources) {
  const page = await fetchPage(resource.route);
  const canonical = page.body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] || "";
  const title = page.body.match(/<title>([^<]+)<\/title>/i)?.[1] || "";
  const description = page.body.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i)?.[1] || "";
  const expectedCanonical = `${baseUrl}${resource.route}`;
  const result = { ...resource, httpStatus: page.status, sitemap: sitemapUrls.includes(resource.route), canonical, title, description, checksPassed: page.status === 200 && sitemapUrls.includes(resource.route) && canonical === expectedCanonical && Boolean(title) && Boolean(description) };
  if (!result.checksPassed) errors.push(`${resource.route}: route, sitemap, canonical, title, or description check failed`);
  routeResults.push(result);
}

const robots = await fetchPage("/robots.txt");
const expectedRoutes = new Set(resources.map((resource) => resource.route));
const missingExpectedRoutes = resources.filter((resource) => !sitemapUrls.includes(resource.route)).map((resource) => resource.route);
const result = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  releaseSha: process.env.GITHUB_SHA || "fd33f2fa9bed13615c287e1d2f9f9779fdc4704d",
  publicResourceCount: resources.length,
  sitemapUrlCount: sitemapUrls.length,
  sitemapStatus: sitemapPage.status,
  robotsStatus: robots.status,
  robotsHasSitemap: /Sitemap:\s*https:\/\/excelgratis\.my\.id\/sitemap\.xml/i.test(robots.body),
  expectedRoutes: [...expectedRoutes],
  missingExpectedRoutes,
  unexpectedResourceRoutes: sitemapUrls.filter((route) => /\/(templates|panduan|rumus-excel|masalah-excel|koleksi)\//.test(route) && !expectedRoutes.has(route)),
  routes: routeResults,
  errors,
  status: errors.length || sitemapPage.status !== 200 || missingExpectedRoutes.length ? "failed" : "passed",
  ownerOnlyEvidence: ["Search Console indexing, impressions, clicks, CTR, position", "mailbox delivery and OAuth", "browser runtime evidence when Codex browser client is unavailable"],
};
await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(`Release observation: ${result.status}; ${resources.length} public resources checked; ${errors.length} errors.`);
if (result.status !== "passed") process.exitCode = 1;
