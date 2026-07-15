import { mkdir, writeFile, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = (process.env.PRODUCTION_BASE_URL || "https://excelgratis.my.id").replace(/\/$/, "");
const reportPath = path.join(process.cwd(), "docs", "qa", "production-smoke-latest.json");
const checks = [];
const draftSlugs = [
  "template-absensi-karyawan-sederhana", "template-checklist-acara", "template-daftar-aset-inventaris-kantor", "template-daftar-belanja-rumah-tangga", "template-daftar-harga-produk-jasa", "template-daftar-kehadiran-acara", "template-daftar-piutang-pelanggan", "template-database-pelanggan-sederhana", "template-form-permintaan-pembelian", "template-jadwal-belajar-siswa", "template-jadwal-kerja-mingguan", "template-jadwal-pembayaran-tagihan", "template-kalender-konten-media-sosial", "template-kas-kecil-excel", "template-laba-rugi-sederhana-umkm", "template-purchase-order-sederhana", "template-rekap-penjualan-bulanan", "template-rekap-pesanan-pelanggan", "template-rencana-proyek-sederhana", "template-surat-jalan-excel",
  "panduan-conditional-formatting-sebagai-alarm", "panduan-data-model-excel", "panduan-dynamic-array-spill-excel", "panduan-parameter-power-query", "panduan-pivottable-dua-tabel", "panduan-power-query-append", "panduan-power-query-data-asli", "panduan-power-query-merge-vs-append", "panduan-power-query-unpivot", "panduan-rumus-filter-laporan", "panduan-rumus-let-excel", "panduan-sparklines-excel", "panduan-textsplit-excel", "panduan-unique-sort-excel", "panduan-validasi-data-formula-kustom",
];

const pages = [
  ["homepage", "/", 200], ["templates", "/templates/", 200], ["categories", "/kategori/", 200], ["learning-hub", "/belajar-excel/", 200], ["content-hierarchy", "/struktur-konten/", 200], ["guides", "/panduan/", 200], ["formulas", "/rumus-excel/", 200], ["troubleshooting", "/masalah-excel/", 200], ["collections", "/koleksi/", 200], ["contact", "/kontak/", 200], ["request-template", "/request-template/", 200], ["about", "/tentang/", 200], ["privacy", "/privasi/", 200], ["terms", "/syarat-ketentuan/", 200], ["disclaimer", "/disclaimer/", 200], ["html-sitemap", "/sitemap/", 200], ["xml-sitemap", "/sitemap.xml", 200], ["robots", "/robots.txt", 200], ["admin-shell", "/admin/", 200],
  ["published-template", "/templates/bisnis-umkm/template-arus-kas-umkm/", 200], ["published-guide", "/panduan/pengolahan-data/panduan-arus-kas-sederhana-umkm/", 200], ["published-guide:table-vs-range", "/panduan/dasar-excel/panduan-excel-table-vs-range/", 200], ["published-guide:structured-references", "/panduan/dasar-excel/panduan-structured-references-excel-table/", 200], ["published-guide:audit-rumus", "/panduan/pengolahan-data/panduan-audit-rumus-excel/", 200], ["published-guide:dropdown-dinamis", "/panduan/pengolahan-data/panduan-dropdown-dinamis-excel/", 200], ["published-guide:checklist-kualitas", "/panduan/produktivitas/panduan-checklist-kualitas-file-excel/", 200], ["published-formula", "/rumus-excel/matematika/rumus-sumifs-rekap-kategori/", 200], ["published-troubleshooting", "/masalah-excel/formula/masalah-sumifs-countifs-hasil-nol/", 200], ["published-collection", "/koleksi/koleksi-administrasi-umkm/", 200], ["workbook-download", "/downloads/template-arus-kas-umkm.xlsx", 200],
];

function record(name, url, passed, detail, evidence = {}) { checks.push({ name, url, passed, detail, ...evidence }); }

async function fetchUrl(name, route, expectedStatus = 200) {
  const url = `${baseUrl}${route}`;
  const started = Date.now();
  try {
    const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000) });
    const contentType = response.headers.get("content-type") || "";
    const body = await response.text();
    record(name, url, response.status === expectedStatus, `HTTP ${response.status}; expected ${expectedStatus}`, { status: response.status, contentType, durationMs: Date.now() - started, bodyLength: body.length, body });
    return { response, body, contentType };
  } catch (error) {
    record(name, url, false, `network blocker: ${error.message}`, { error: error.message });
    return undefined;
  }
}

for (const [name, route, status] of pages) await fetchUrl(name, route, status);
const sitemap = checks.find((check) => check.name === "xml-sitemap" && check.passed)?.body || "";
const robots = checks.find((check) => check.name === "robots" && check.passed)?.body || "";
const learningHub = checks.find((check) => check.name === "learning-hub" && check.passed)?.body || "";
record("learning-hub:resource-navigation", `${baseUrl}/belajar-excel/`, ["/panduan/", "/rumus-excel/", "/masalah-excel/"].every((href) => learningHub.includes(`href="${href}"`)), "Hub Belajar Excel menautkan Panduan, Rumus Excel, dan Masalah Excel");
const htmlChecks = checks.filter((check) => check.contentType?.includes("text/html") && check.body);
for (const check of htmlChecks) {
  const canonical = check.body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] || "";
  const robotsMeta = check.body.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)/i)?.[1] || "";
  record(`${check.name}:canonical`, check.url, check.name === "admin-shell" || (canonical.startsWith("https://excelgratis.my.id/") && !canonical.includes("?")), canonical || "missing", { canonical, robotsMeta });
}
record("sitemap:xml-content", `${baseUrl}/sitemap.xml`, /<urlset[\s>]/i.test(sitemap) && draftSlugs.every((slug) => !sitemap.includes(slug)), "XML sitemap excludes remaining draft slugs", { draftLeak: draftSlugs.filter((slug) => sitemap.includes(slug)) });
record("robots:content", `${baseUrl}/robots.txt`, /Sitemap:\s*https:\/\/excelgratis\.my\.id\/sitemap\.xml/i.test(robots) && /Disallow:\s*\/admin/i.test(robots), "robots directives and sitemap URL", { robots });
const unknown = await fetchUrl("unknown-route", "/run-6-route-that-does-not-exist-9c2e/", 404);
if (unknown) record("unknown-route:custom-body", `${baseUrl}/run-6-route-that-does-not-exist-9c2e/`, /404|tidak ditemukan|halaman/i.test(unknown.body), "custom 404 body present");
const download = checks.find((check) => check.name === "workbook-download");
if (download) record("workbook-download:mime", download.url, /application\/(vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet|octet-stream)|binary/i.test(download.contentType || ""), download.contentType || "missing content-type");
for (const slug of draftSlugs) {
  const found = checks.some((check) => check.body?.includes(slug));
  if (found) record("draft-leakage:" + slug, baseUrl, false, "draft slug appeared in fetched public body");
}
for (const collection of ["templates", "guides"]) {
  const directory = path.join(process.cwd(), "src", "content", collection);
  for (const file of await readdir(directory).catch(() => [])) {
    if (!file.endsWith(".md")) continue;
    const source = await readFile(path.join(directory, file), "utf8");
    if (!/draft:\s*true/.test(source)) continue;
    const slug = source.match(/^slug:\s*["']?([^"'\s]+)["']?/m)?.[1];
    const category = source.match(/^category:\s*["']?([^"'\s]+)["']?/m)?.[1];
    if (!slug || !category) continue;
    const route = collection === "templates" ? `/templates/${category}/${slug}/` : `/panduan/${category}/${slug}/`;
    await fetchUrl(`draft-route:${slug}`, route, 404);
  }
}
const result = { generatedAt: new Date().toISOString(), baseUrl, status: checks.every((check) => check.passed) ? "passed" : "failed_or_blocked", checks: checks.map(({ body, ...check }) => check), networkBlocked: checks.some((check) => check.detail?.startsWith("network blocker")), notes: "A passing public HTTP smoke does not prove mailbox delivery, OAuth, Search Console, or Cloudflare dashboard state." };
await mkdir(path.dirname(reportPath), { recursive: true });
await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
if (result.status !== "passed") process.exitCode = 1;
