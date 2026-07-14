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

## Gejala

Formula pencarian menampilkan `#N/A` meski Anda merasa kode atau nama sudah ada di tabel referensi. Jangan langsung membungkus rumus dengan `IFERROR`; temukan dulu alasan nilai tidak ditemukan.

## Langkah Diagnosis

1. Salin nilai yang dicari langsung dari tabel sumber, lalu bandingkan dengan nilai pada tabel referensi.
2. Periksa apakah salah satu nilai berupa angka dan yang lain teks. `0012` sebagai teks berbeda dari `12` sebagai angka.
3. Cari spasi awal atau akhir dengan `=LEN(A2)` dan bandingkan panjangnya. Gunakan `TRIM` pada kolom bantu bila perlu.
4. Untuk VLOOKUP, pastikan nilai pencarian berada di kolom paling kiri `table_array` dan argumen terakhir adalah `FALSE` untuk pencarian tepat.
5. Untuk XLOOKUP, periksa bahwa `lookup_array` dan `return_array` memiliki tinggi yang sama.

## Solusi Berdasarkan Penyebab

Samakan format ID sejak awal. Bila kode perlu mempertahankan nol di depan, simpan sebagai teks pada kedua tabel. Bila sumber diimpor dari sistem lain, bersihkan spasi pada kolom bantu sebelum lookup. Jika nilai memang boleh tidak ada, XLOOKUP dapat memakai argumen `if_not_found` seperti `"Belum ada"` agar hasil lebih mudah dibaca.

## Hindari Perbaikan Semu

`IFERROR` berguna untuk tampilan akhir yang sudah dipahami, tetapi dapat menyembunyikan masalah data. Periksa dulu [panduan XLOOKUP dan VLOOKUP](/rumus-excel/lookup-referensi/rumus-xlookup-vlookup-data/) agar struktur pencarian benar.
