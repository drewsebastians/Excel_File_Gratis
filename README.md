# ExcelGratis

ExcelGratis adalah website statis Astro untuk membagikan template Excel dan materi belajar Excel berbahasa Indonesia. Website memakai Astro Content Collections, tanpa database dan tanpa backend aplikasi. Resource yang berstatus `draft: true` tidak dibuat menjadi halaman publik, tidak masuk navigasi, dan tidak masuk sitemap.

## Arsitektur publik saat ini

Resource utama tersedia melalui hub berikut:

- Template: `/templates/` dan `/kategori/`.
- Panduan: `/panduan/`.
- Rumus Excel: `/rumus-excel/`.
- Masalah Excel: `/masalah-excel/`.
- Koleksi: `/koleksi/`.

Per 2026-07-14, inventory terbit yang diverifikasi dari `src/content/` adalah 8 template, 3 panduan, 2 referensi rumus, 2 halaman troubleshooting, dan 1 koleksi. Navigation, related resources, structured data, canonical URL, dan sitemap dibentuk dari resource published. Hub yang belum memiliki resource published tetap aman untuk dibuka tetapi memakai `noindex, follow` dan tidak dipromosikan.

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
2. Untuk Batch 3 Wave 1, generator workbook berada di `scripts/generate-batch3-wave1-workbooks.mjs`; hasil QA tersimpan di `.workbook-artifacts/` saat lokal dan ringkasan yang disimpan di `docs/qa/batch-3-wave-1/`.
3. Tambahkan Markdown ke `src/content/templates/` dengan frontmatter `title`, `meta_title`, `meta_description`, `slug`, `category`, `tags`, `date`, `file_name`, dan `file_size`. Gunakan `draft: true` selama review.
4. Simpan file `.xlsx` di `public/downloads/{file_name}` dan preview, jika tersedia, di `public/assets/templates/`.
5. Halaman detail otomatis tersedia di `/templates/{category}/{slug}/` setelah resource dipublikasikan.

Kategori template yang tersedia adalah `keuangan-pribadi`, `bisnis-umkm`, `produktivitas-kerja`, `pendidikan`, dan `rumah-tangga-acara`.

### Panduan, rumus, dan troubleshooting

Tambahkan file Markdown ke `src/content/guides/`, `src/content/formulas/`, atau `src/content/troubleshooting/`. Isi metadata sesuai schema dan CMS di `src/content.config.ts` serta `public/admin/config.yml`. Gunakan slug stabil, ringkasan yang spesifik, contoh yang dapat diuji, batasan versi Excel, dan relation field yang mengarah ke resource published yang relevan.

### Koleksi

Tambahkan file Markdown ke `src/content/collections/` setelah resource yang akan dikurasi sudah terbit. Koleksi hanya memakai relasi eksplisit; jangan membuat halaman koleksi kosong atau mengisi relasi dengan tautan yang tidak relevan.

Validasi detail relasi dan visibilitas tersedia di `docs/resource-fixture-testing.md`. Quality gates editorial dan workbook berada di `docs/content-quality-gates.md`.

Base URL download dikonfigurasi di `src/config/site.ts` melalui `downloadBaseUrl`, dan dapat dioverride dengan `PUBLIC_DOWNLOAD_BASE_URL` bila file dipindahkan ke storage lain.

## Deployment dan CI

Project ditujukan untuk Cloudflare Workers/Assets dengan Node `22`, `pnpm@10.11.1`, dan output asset `dist`. Wrangler menjalankan build sebelum deploy. Branch `main` terhubung ke deployment Cloudflare; push ke `main` dapat memicu deployment otomatis sesuai konfigurasi Cloudflare.

Workflow GitHub Actions di `.github/workflows/ci.yml` berjalan pada pull request menuju `main`, push ke branch non-default, dan pemicu manual. CI hanya validasi source dan tidak melakukan deployment. Perintahnya:

```bash
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm run validate
```

`check` memeriksa diagnostic Astro, `build` membuat route statis, dan `validate` memeriksa route, sitemap, CMS, link internal, asset, draft filtering, serta fixture resource. Deployment Cloudflare adalah proses terpisah dan harus diverifikasi dari bukti deployment, bukan diasumsikan dari CI.

## SEO dan status draft

Build menghasilkan title, meta description, canonical absolute, Open Graph, JSON-LD pada halaman resource yang sesuai, `robots.txt`, dan `sitemap.xml`. Sitemap hanya berisi halaman publik yang dimaksudkan untuk index. Request Template memakai `noindex, follow`; draft resource tidak menghasilkan route publik.

Jangan menambahkan AdSense, Analytics provider, cookies, pixel, database, backend, atau layanan eksternal baru tanpa review terpisah. Status kesiapan dan scope deferred dicatat di `docs/adsense-readiness-checklist.md` dan `docs/current-project-status.md`.
