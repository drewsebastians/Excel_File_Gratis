# ExcelGratis

ExcelGratis adalah website statis Astro untuk membagikan template Excel dan materi belajar Excel berbahasa Indonesia. Website memakai Astro Content Collections, tanpa database dan tanpa backend aplikasi. Resource yang berstatus `draft: true` tidak dibuat menjadi halaman publik, tidak masuk navigasi, dan tidak masuk sitemap.

## Arsitektur publik saat ini

Resource utama tersedia melalui hub berikut:

- Template: `/templates/` dan `/kategori/`.
- Panduan: `/panduan/`.
- Rumus Excel: `/rumus-excel/`.
- Masalah Excel: `/masalah-excel/`.
- Koleksi: `/koleksi/`.

Per 2026-07-14, inventory publik yang diverifikasi dari `src/content/` adalah 15 template, 8 panduan, 6 referensi rumus, 6 halaman troubleshooting, dan 3 koleksi, atau 38 resource publik. Repository juga menyimpan 20 template draft dan 20 panduan draft dari PR #11. Draft adalah bahan review, bukan resource publik: draft tidak menghasilkan route, card, navigation link, related link, atau sitemap entry. Navigation, related resources, structured data, canonical URL, dan sitemap dibentuk dari resource published. Hub yang belum memiliki resource published tetap aman untuk dibuka tetapi memakai `noindex, follow` dan tidak dipromosikan.

Readiness setiap draft dicatat di `docs/draft-content-readiness.csv`. Jalankan `pnpm run audit:drafts` untuk memperbarui register dan `docs/qa/draft-readiness-audit.json`; definisi gate dan aturan release ada di `docs/draft-publication-governance.md`.

Halaman tetap dan trust pages dikelola dari `src/content/site-pages/`. Form Kontak dan Request Template tetap memakai provider Web3Forms sesuai batasan dan prosedur di `docs/form-delivery.md`.

## Menjalankan lokal

```bash
pnpm install
pnpm run dev
```

Build produksi:

```bash
pnpm run build
```

Output build ada di folder `dist`.

## Membuat resource baru

### Template Excel

1. Buat workbook dan QA report mengikuti `docs/template-production-specifications.md`.
2. Generator workbook Batch 3 berada di `scripts/generate-batch3-wave1-workbooks.mjs`, `scripts/generate-batch3-wave2-workbooks.mjs`, dan `scripts/generate-batch3-wave3-workbooks.mjs`; hasil QA tersimpan di `.workbook-artifacts/` saat lokal dan ringkasan versioned tersimpan di `docs/qa/batch-3-wave-1/`, `docs/qa/batch-3-wave-2/`, serta `docs/qa/batch-3-wave-3/`.
3. Tambahkan Markdown ke `src/content/templates/` dengan frontmatter `title`, `meta_title`, `meta_description`, `slug`, `category`, `tags`, `date`, `file_name`, dan `file_size`. Gunakan `draft: true` selama review.
4. Simpan file `.xlsx` di `public/downloads/{file_name}` dan preview, jika tersedia, di `public/assets/templates/`.
5. Halaman detail otomatis tersedia di `/templates/{category}/{slug}/` setelah resource dipublikasikan.

Sebelum template dipublikasikan, cocokkan Markdown dengan workbook, preview, filename download, cara pakai, batasan, dan relasi resource. Jalankan QA workbook sesuai `docs/template-production-specifications.md` dan simpan bukti di `docs/qa/`. Untuk terbit aman, ubah `draft` ke `false` hanya setelah `pnpm run check`, `pnpm run build`, `pnpm run validate`, dan smoke check lolos.

Kategori template yang tersedia adalah `keuangan-pribadi`, `bisnis-umkm`, `produktivitas-kerja`, `pendidikan`, dan `rumah-tangga-acara`.

### Panduan, rumus, dan troubleshooting

Tambahkan file Markdown ke `src/content/guides/`, `src/content/formulas/`, atau `src/content/troubleshooting/`. Isi metadata sesuai schema dan CMS di `src/content.config.ts` serta `public/admin/config.yml`. Gunakan slug stabil, ringkasan yang spesifik, contoh yang dapat diuji, batasan versi Excel, dan relation field yang mengarah ke resource published yang relevan.

Panduan, rumus, troubleshooting, dan koleksi memiliki field gambar artikel opsional `preview_image` dan `preview_alt`. Media artikel dikelola di `public/assets/articles/` melalui CMS. Gunakan gambar hanya bila membantu pembaca memahami isi; alt text harus menjelaskan gambar secara singkat dan bermakna.

### Koleksi

Tambahkan file Markdown ke `src/content/collections/` setelah resource yang akan dikurasi sudah terbit. Koleksi hanya memakai relasi eksplisit; jangan membuat halaman koleksi kosong atau mengisi relasi dengan tautan yang tidak relevan.

Validasi detail relasi dan visibilitas tersedia di `docs/resource-fixture-testing.md`. Quality gates editorial dan workbook berada di `docs/content-quality-gates.md`.

Base URL download dikonfigurasi di `src/config/site.ts` melalui `downloadBaseUrl`, dan dapat dioverride dengan `PUBLIC_DOWNLOAD_BASE_URL` bila file dipindahkan ke storage lain.

## Deployment dan CI

Project ditujukan untuk Cloudflare Workers/Assets dengan Node `>=22.12.0`, `pnpm@10.11.1`, dan output asset `dist`.

Workflow GitHub Actions dipisahkan secara tegas:

- `.github/workflows/ci.yml` adalah workflow validasi. Ia berjalan untuk pull request menuju `main`, push ke branch non-default, dan pemicu manual. Workflow ini tidak mengakses secret produksi dan tidak melakukan deployment.
- `.github/workflows/deploy.yml` adalah workflow produksi. Ia berjalan hanya saat push ke `main` atau saat dijalankan manual dari tab Actions. Ia tidak berjalan untuk pull request maupun feature branch.

Keduanya memakai urutan pemeriksaan berikut sebelum deployment:

```bash
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm run validate
```

Workflow produksi kemudian menjalankan `pnpm run deploy`. Secret repository GitHub yang wajib tersedia bernama `CLOUDFLARE_API_TOKEN`; nilainya tidak boleh ditulis ke source, log, issue, atau pull request. Untuk konfigurasi Worker saat ini, token paling minimum biasanya dibatasi pada account yang memiliki Worker dengan `Account > Workers Scripts > Edit` dan zona `excelgratis.my.id` dengan `Zone > Workers Routes > Edit`.

Deployment produksi memakai concurrency group `production-cloudflare`: hanya satu deployment dapat berjalan pada satu waktu, dan deployment lama yang masih berjalan dibatalkan bila commit baru masuk ke `main`. Job dibatasi 15 menit. `wrangler.jsonc` masih menjalankan `pnpm run build` saat `wrangler deploy`; workflow juga menjalankan build eksplisit sebelum validasi. Build kedua dipertahankan agar `pnpm run deploy` lokal dan integrasi Wrangler yang sudah ada tetap aman. Pastikan perubahan build bersifat deterministik.

`check` memeriksa diagnostic Astro, `build` membuat route statis, dan `validate` memeriksa route, sitemap, CMS, link internal, asset, draft filtering, fixture resource, serta kontrak deployment workflow. Keberhasilan CI membuktikan validasi source; keberhasilan workflow `Deploy to Cloudflare Workers` dan bukti output Wrangler membuktikan deployment.

Setelah deployment, buka run Actions untuk mencatat commit (`head SHA`) dan `Current Version ID` dari output Wrangler, lalu jalankan pemeriksaan segera di [production smoke checklist](docs/production-smoke-checklist.md). Minimal cek `https://excelgratis.my.id/`, `https://excelgratis.my.id/kategori/`, satu halaman template publik, `https://excelgratis.my.id/sitemap.xml`, `https://excelgratis.my.id/robots.txt`, dan satu file `.xlsx` publik. Bila ada regresi material, lakukan rollback versi terakhir yang sudah diverifikasi melalui Cloudflare Dashboard > Workers & Pages > `excelfilegratis` > Deployments, lalu buat revert commit di GitHub agar source `main` kembali selaras dengan produksi.

## SEO dan status draft

Build menghasilkan title, meta description, canonical absolute, Open Graph, JSON-LD pada halaman resource yang sesuai, `robots.txt`, dan `sitemap.xml`. Sitemap hanya berisi halaman publik yang dimaksudkan untuk index. Request Template memakai `noindex, follow`; draft resource tidak menghasilkan route publik.

Jangan menambahkan AdSense, Analytics provider, cookies, pixel, database, backend, atau layanan eksternal baru tanpa review terpisah. Status kesiapan dan scope deferred dicatat di `docs/adsense-readiness-checklist.md` dan `docs/current-project-status.md`.
