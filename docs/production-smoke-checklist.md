# Production Smoke Checklist

Use this checklist after every public content release or production deployment. Record the date, deployed `main` SHA, GitHub Actions deployment run, URL, result, and evidence link or screenshot. A check is `PASS` only when the public response and visible content agree. A green validation workflow alone is not deployment evidence.

| Area | URL or action | Pass condition | Result | Evidence / notes |
| --- | --- | --- | --- | --- |
| Homepage | `/` | 200, correct H1, navigation, and no broken hero/CTA | [ ] | |
| All templates | `/templates/` | Published templates list loads and search/filter are usable | [ ] | |
| Category directory | `/kategori/` | Populated categories show description, count, preview, and CTA | [ ] | |
| Legacy template | One pre-Wave-1 template | H1, preview, metadata, usage, related links, and download render | [ ] | |
| Wave 1 invoice | `/templates/bisnis-umkm/template-invoice-penjualan-umkm/` | All substantive sections and download render | [ ] | |
| Wave 1 sales | `/templates/bisnis-umkm/template-laporan-penjualan-harian-umkm/` | All substantive sections and download render | [ ] | |
| Wave 1 cash flow | `/templates/bisnis-umkm/template-arus-kas-umkm/` | All substantive sections and download render | [ ] | |
| Wave 1 installments | `/templates/keuangan-pribadi/template-tracker-cicilan-hutang/` | All substantive sections and download render | [ ] | |
| Wave 3 daily expenses | `/templates/keuangan-pribadi/template-pengeluaran-harian/` | Preview, substantive sections, and download render | [ ] | |
| Wave 3 shift schedule | `/templates/produktivitas-kerja/template-jadwal-shift-sederhana/` | Preview, disclaimer, substantive sections, and download render | [ ] | |
| Wave 3 project tracker | `/templates/produktivitas-kerja/template-tracker-proyek-sederhana/` | Preview, substantive sections, and download render | [ ] | |
| Guide hub | `/panduan/` | Hub indexability and cards match published content | [ ] | |
| Representative guides | One guide in each populated category | H1, steps, examples, and related links render | [ ] | |
| Formula hub | `/rumus-excel/` | Hub and formula cards render | [ ] | |
| Representative formulas | One published formula detail | Syntax, example, caveat, and related links render | [ ] | |
| Troubleshooting hub | `/masalah-excel/` | Hub and cards render | [ ] | |
| Representative troubleshooting | One published troubleshooting detail | Symptoms, diagnosis, repair steps, and limits render | [ ] | |
| Collection hub | `/koleksi/` | Hub lists only published collections | [ ] | |
| Collection detail | `/koleksi/koleksi-administrasi-umkm/` | Curated links resolve and no empty section appears | [ ] | |
| Contact | `/kontak/` | Form fields, validation, focus, and noindex/ads rules match policy | [ ] | |
| Request Template | `/request-template/` | Form works visually and meta robots is `noindex, follow` | [ ] | |
| Legal and trust | `/tentang/`, `/privasi/`, `/syarat-ketentuan/`, `/disclaimer/` | Pages load, wording is current, no ads or form leakage | [ ] | |
| XML sitemap | `/sitemap.xml` | 200 XML, absolute canonical URLs, no drafts, no query strings, no duplicates | [ ] | |
| HTML sitemap | `/sitemap/` | Main, category, template, resource, and legal links render | [ ] | |
| Robots | `/robots.txt` | 200 text, public assets allowed, admin/API disallowed, sitemap URL present | [ ] | |
| Unknown route | A clearly nonexistent path | HTTP 404 and custom body, canonical `/404/`, `noindex, follow` | [ ] | |
| CMS shell | `/admin/` | CMS shell loads with `noindex`; do not enter credentials in smoke test | [ ] | |
| Mobile navigation | Narrow viewport | Menu/bottom navigation is visible, usable, and does not cover content | [ ] | |
| Workbook downloads | Every published `file_name` | 200, correct `.xlsx` content type, non-empty file | [ ] | |
| Canonical URLs | Representative HTML pages | One absolute canonical, no query parameter in canonical | [ ] | |
| Draft leakage | Add or inspect a local draft fixture | No draft route, navigation card, related link, or sitemap entry | [ ] | |
| Internal links | Crawl built HTML or click representative links | No broken internal links or links to drafts | [ ] | |
| Structured data | Representative template and resource pages | JSON-LD parses and matches visible title/URL/type | [ ] | |

## Recording guidance

For each release, copy this table into the release note or attach a dated result. Use `N/A` only when a check is genuinely outside the release scope. Keep failed checks open until a fix or an explicit owner decision is recorded. Never treat a successful CI build as proof of Cloudflare deployment or third-party form delivery.
