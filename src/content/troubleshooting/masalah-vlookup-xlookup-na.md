---
title: "VLOOKUP atau XLOOKUP Menghasilkan #N/A di Excel"
meta_title: "VLOOKUP atau XLOOKUP Menghasilkan #N/A di Excel"
meta_description: "Cara mengatasi VLOOKUP atau XLOOKUP menghasilkan #N/A: cek nilai pencarian, format angka atau teks, spasi, rentang, dan pencarian tepat."
slug: "masalah-vlookup-xlookup-na"
summary: "#N/A berarti nilai pencarian tidak ditemukan dalam bentuk yang sama; mulai dari memeriksa nilai sumber sebelum menutupi hasil dengan IFERROR."
category: "formula"
symptoms: ["VLOOKUP menghasilkan #N/A", "XLOOKUP tidak menemukan ID", "Kode terlihat sama tetapi hasil pencarian gagal"]
excel_versions: ["XLOOKUP: Microsoft 365 atau Excel 2021", "VLOOKUP: Microsoft Excel 2007 atau lebih baru"]
tags: ["vlookup na", "xlookup na", "lookup excel"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: true
draft: false
related_templates: ["template-target-tabungan", "template-notulen-rapat-action-item", "template-pembukuan-pengeluaran-usaha"]
related_guides: ["panduan-excel-table-untuk-template", "panduan-dropdown-data-validation-excel"]
related_formulas: ["rumus-xlookup-vlookup-data", "rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-angka-tidak-terjumlah-format-teks", "masalah-sumifs-countifs-hasil-nol"]
---

`#N/A` biasanya berarti nilai yang dicari belum ditemukan pada tabel referensi. Periksa nilai lookup dan sumbernya sebelum mengubah formula.

## Coba Ini Terlebih Dahulu

1. Bandingkan nilai lookup dengan satu nilai di tabel referensi, termasuk spasi dan tipe datanya.
2. Pastikan rentang pencarian masih mencakup baris atau kolom yang diperlukan.
3. Untuk VLOOKUP exact match, gunakan `FALSE` sebagai argumen terakhir.
4. Uji satu kode yang pasti ada lalu periksa hasilnya.

## Penyebab yang Paling Sering

XLOOKUP dapat memakai nilai pengganti bila tidak ditemukan, sedangkan VLOOKUP membutuhkan susunan tabel yang tepat. Keduanya tetap memerlukan data yang konsisten.

## Sebelum Mengubah Data

Jangan memakai nilai pengganti untuk menutupi kode yang seharusnya ada; periksa daftar sumber dan proses inputnya.

## Bantuan Terkait

[rumus XLOOKUP dan VLOOKUP](/rumus-excel/lookup-referensi/rumus-xlookup-vlookup-data/) dan [membuat dropdown Data Validation](/panduan/dasar-excel/panduan-dropdown-data-validation-excel/).
