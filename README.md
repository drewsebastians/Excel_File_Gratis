# ExcelGratis.id

Website statis Astro untuk membagikan template Excel gratis bagi pengguna Indonesia. Situs ini memakai Astro Content Collections, tanpa backend dan tanpa database.

## Menjalankan lokal

```bash
npm install
npm run dev
```

Build produksi:

```bash
npm run build
```

Output build ada di folder `dist`.

## Menambah template baru

1. Tambahkan file Markdown baru ke `src/content/templates/`.
2. Isi frontmatter dengan skema berikut:

```yaml
---
title: "Judul artikel"
meta_title: "Judul SEO"
meta_description: "Deskripsi SEO maksimal sekitar 160 karakter."
slug: "slug-template"
category: "keuangan-pribadi"
tags: ["template excel gratis"]
date: 2026-07-06
file_name: "Nama-File.xlsx"
file_size: "245 KB"
suggested_h1: "Judul H1 opsional"
---
```

Kategori yang valid:

- `keuangan-pribadi`
- `bisnis-umkm`
- `produktivitas-kerja`
- `pendidikan`
- `rumah-tangga-acara`

3. Simpan file Excel ke `public/downloads/{slug}.xlsx`.
4. Halaman detail otomatis tersedia di `/templates/{category}/{slug}/`.

Base URL download dikonfigurasi di `src/config/site.ts` melalui `downloadBaseUrl`, dan bisa dioverride dengan environment variable `PUBLIC_DOWNLOAD_BASE_URL` jika file dipindahkan ke Cloudflare R2.

## Deployment

Project ini ditujukan untuk Cloudflare Pages dengan pengaturan:

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`

Branch `main` terhubung ke Cloudflare Pages, jadi push ke `main` akan memicu deployment otomatis.

## SEO

Build menghasilkan halaman statis lengkap dengan title unik, meta description, canonical URL, Open Graph tags, `robots.txt`, `sitemap.xml`, dan JSON-LD untuk halaman detail template.
