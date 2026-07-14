# Release Wave 1

Tanggal rilis: 2026-07-14

Wave pertama menerbitkan lima panduan low-risk yang sudah melewati pemeriksaan teknis, editorial, relasi, SEO, build, dan validasi route. Persetujuan owner untuk publikasi diberikan pada 2026-07-14.

## Resource yang Diterbitkan

- [Excel Table vs Range Biasa](/panduan/dasar-excel/panduan-excel-table-vs-range/): fondasi untuk memilih struktur data yang mudah dirawat.
- [Structured References Excel](/panduan/dasar-excel/panduan-structured-references-excel-table/): lanjutan langsung untuk membaca rumus di dalam Table.
- [Audit Rumus Excel](/panduan/pengolahan-data/panduan-audit-rumus-excel/): alur diagnosis formula dengan alat bawaan Excel.
- [Dropdown Excel Dinamis](/panduan/pengolahan-data/panduan-dropdown-dinamis-excel/): input yang mengikuti pertambahan daftar pada Table.
- [Checklist Kualitas File Excel](/panduan/produktivitas/panduan-checklist-kualitas-file-excel/): pemeriksaan sebelum workbook dibagikan.

## Alasan Pemilihan

Kelima panduan membentuk perjalanan belajar yang koheren: struktur data, referensi rumus, input yang konsisten, audit, lalu pemeriksaan akhir. Tidak ada workbook, payroll, HR, procurement, tax, legal, accounting, atau compliance template yang diterbitkan dalam wave ini.

## QA dan Publikasi

- `pnpm run check` dan `pnpm run build` wajib berhasil.
- `pnpm run validate` memeriksa route, sitemap, canonical, JSON-LD, related links, dan draft isolation.
- `pnpm run audit:drafts` mempertahankan lima resource ini sebagai `published` dan tetap menghitung 35 resource lain sebagai draft.
- Production smoke harus dijalankan setelah merge dan deployment; Search Console tetap menunggu verifikasi owner.

## Ditunda

Semua 20 template draft tetap unpublished karena visual QA workbook belum dimulai. Lima belas panduan lain tetap draft sampai pemeriksaan wave berikutnya, dan resource finance, HR, customer data, procurement, accounting, atau compliance tetap memerlukan gate owner yang sesuai.
