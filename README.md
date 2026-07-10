# ExcelGratis

Website statis Astro untuk membagikan template Excel gratis bagi pengguna Indonesia. Situs ini memakai Astro Content Collections, tanpa backend dan tanpa database.

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

Project ini ditujukan untuk Cloudflare Workers Builds dengan static assets:

- Node version: `22`
- Package manager: `pnpm@10.11.1`
- Deploy command: `pnpm run deploy` atau default `npx wrangler deploy`
- Assets directory: `dist`

Wrangler dikonfigurasi untuk menjalankan `pnpm run build` sebelum deploy, sehingga `dist` tetap dibuat saat Cloudflare menjalankan deploy command. Branch `main` terhubung ke Cloudflare, jadi push ke `main` akan memicu deployment otomatis.

## SEO

Build menghasilkan halaman statis lengkap dengan title unik, meta description, canonical URL, Open Graph tags, `robots.txt`, `sitemap.xml`, dan JSON-LD untuk halaman detail template.

## Content dan trust pages

Halaman tetap dikelola dari `src/content/site-pages/`, sementara fondasi Panduan, Rumus Excel, Masalah Excel, dan Koleksi berada di `src/content/`. Resource belum dipublikasikan pada Batch 2 sehingga hub tetap noindex dan tidak muncul di navigasi sampai content published tersedia. Dokumentasi editorial, legal review, serta inventory layanan ada di `docs/`.
