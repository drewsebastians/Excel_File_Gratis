# Information Architecture dan Discoverability Audit

## Tujuan

Audit ini memastikan pengguna dan mesin pencari dapat menemukan area konten yang tepat melalui struktur, navigasi, tautan internal, canonical, dan sitemap yang konsisten. Ini adalah gabungan dari Information Architecture (IA) review, UX/navigation QA, content discoverability review, dan technical SEO QA.

## Kapan dilakukan

- Sebelum setiap rilis ke `main`, melalui `pnpm run validate`.
- Saat menambah jenis resource, hub, navigasi global, kategori, atau route publik.
- Setelah deploy, melalui `pnpm run smoke:production`.

## Aturan struktur saat ini

- `/belajar-excel/` adalah hub untuk seluruh area pembelajaran Excel.
- `/panduan/`, `/rumus-excel/`, dan `/masalah-excel/` adalah arsip masing-masing, bukan pengganti hub pembelajaran.
- Header desktop dan navigasi bawah mobile harus menyediakan jalur eksplisit ke hub Belajar Excel.
- Hub pembelajaran dan setiap arsip resource harus menautkan Panduan, Rumus Excel, serta Masalah Excel.
- Semua entry point publik harus memiliki satu canonical absolut yang sesuai dan tercantum satu kali di XML sitemap.
- Konten draft tidak boleh memiliki route publik atau masuk sitemap.

## Pemeriksaan otomatis

`pnpm run audit:discovery` membaca hasil build di `dist/` dan menghasilkan [site-discovery-audit.json](qa/site-discovery-audit.json). Pemeriksaan ini memvalidasi route, canonical, struktur hub, navigasi arsip, menu desktop/mobile, XML sitemap, HTML sitemap, dan canonical duplikat.

`pnpm run smoke:production` memeriksa hub Belajar Excel pada domain produksi setelah deploy, termasuk HTTP, canonical, dan ketiga tautan resource.

## Pemeriksaan manual

Saat desain atau struktur navigasi berubah, periksa pada desktop dan mobile:

- Nama menu menjelaskan tujuan halaman, bukan hanya jenis konten yang sedang terbuka.
- Menu aktif sesuai dengan area pengguna berada.
- Jalur ke Panduan, Rumus Excel, dan Masalah Excel terlihat tanpa pengguna harus menebak URL.
- Kategori, arsip, halaman detail, dan sitemap tidak mengarah ke halaman kosong atau konten draft.

## Bukti dan batasan

Build dan smoke test membuktikan struktur repository serta respons publik yang dapat diakses. Peringkat, status indeks Google, Search Console, data unduhan, dan pengalaman pengguna nyata tetap membutuhkan bukti dari pemilik akun atau observasi terpisah.
