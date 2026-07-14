---
title: "Power Query untuk Membersihkan Data Excel Tanpa Merusak Data Asli"
meta_title: "Power Query untuk Membersihkan Data Excel Tanpa Merusak Data Asli"
meta_description: "Panduan power query untuk membersihkan data excel tanpa merusak data asli dengan langkah praktis, contoh, kesalahan umum, dan batasan versi Excel."
slug: "panduan-power-query-data-asli"
summary: "Panduan praktis untuk membuat alur pembersihan data yang bisa di-refresh daripada mengedit file sumber langsung, dengan contoh dan langkah yang mudah diikuti."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "18 menit"
prerequisites: ["Excel Windows dengan menu Get Data atau Power Query tersedia."]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021 atau lebih baru"]
tags: ["belajar excel","pengolahan-data","menengah"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: true
related_templates: ["template-stok-barang-excel-gratis","template-laporan-penjualan-harian-umkm"]
related_guides: ["panduan-excel-table-untuk-template","panduan-dropdown-data-validation-excel"]
related_formulas: ["rumus-filter-daftar-dinamis","rumus-xlookup-vlookup-data","rumus-countifs-dashboard-status"]
related_troubleshooting: ["masalah-dropdown-data-validation-tidak-muncul", "masalah-vlookup-xlookup-na"]
---

Power Query untuk Membersihkan Data Excel Tanpa Merusak Data Asli membantu kamu membuat alur pembersihan data yang bisa di-refresh daripada mengedit file sumber langsung. Fokusnya bukan menghafal menu, tetapi membuat file lebih mudah diperbarui dan diperiksa.

## Kapan Panduan Ini Berguna

Gunakan langkah ini ketika kamu ingin membuat alur pembersihan data yang bisa di-refresh daripada mengedit file sumber langsung. Mulailah dari file contoh kecil agar perubahan mudah diamati.

## Prasyarat

Excel Windows dengan menu Get Data atau Power Query tersedia.

## Langkah Praktik

1. Simpan data sumber apa adanya di satu lokasi yang jelas.
2. Pilih Data > From Table/Range untuk membuka Power Query.
3. Lakukan perubahan yang dapat diulang, misalnya mengubah tipe data atau menghapus kolom.
4. Pilih Close & Load lalu gunakan Refresh saat data sumber diperbarui.

## Contoh Singkat

Data ekspor penjualan dibersihkan dengan menghapus kolom kosong, memperbaiki tipe tanggal, lalu dimuat ke sheet baru.

## Kesalahan Umum

Jangan menghapus sumber sebelum query stabil. Power Query menyimpan langkah, bukan salinan keputusan yang sulit dilacak.

## Tips Agar File Tetap Rapi

Gunakan judul kolom yang konsisten, simpan contoh data secukupnya, dan periksa hasil setelah menambah baris baru. Bila file dipakai tim, catat aturan penulisan di sheet Cara Pakai agar semua orang mengikuti pola yang sama.

## Batasan dan Kompatibilitas

Beberapa fitur modern seperti dynamic array, LET, FILTER, UNIQUE, SORT, dan TEXTSPLIT memerlukan Excel 365 atau Excel 2021. Jika file akan dibuka di versi lebih lama atau Google Sheets, uji hasilnya terlebih dahulu.

## Pertanyaan yang Sering Ditanyakan

**Apakah saya perlu langsung memakai data asli?**

Tidak. Uji dulu dengan beberapa baris contoh supaya perubahan dan hasil rumus mudah diperiksa.

**Bagaimana kalau hasilnya tidak sesuai?**

Periksa kembali nama kolom, tipe data, dan referensi rumus. Bila perlu, gunakan Trace Precedents untuk menelusuri sumber angka.
