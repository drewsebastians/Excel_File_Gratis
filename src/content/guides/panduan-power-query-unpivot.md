---
title: "Unpivot Power Query: Mengubah Kolom Bulan Menjadi Data yang Siap Dianalisis"
meta_title: "Unpivot Power Query: Mengubah Kolom Bulan Menjadi Data yang Siap Dianalisis"
meta_description: "Panduan unpivot power query: mengubah kolom bulan menjadi data yang siap dianalisis dengan langkah praktis, contoh, kesalahan umum, dan batasan versi Excel."
slug: "panduan-power-query-unpivot"
summary: "Panduan praktis untuk mengubah format lebar seperti Jan, Feb, Mar menjadi kolom Bulan dan Nilai, dengan contoh dan langkah yang mudah diikuti."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "17 menit"
prerequisites: ["Data memiliki satu atau beberapa kolom identitas serta beberapa kolom periode."]
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

Unpivot Power Query: Mengubah Kolom Bulan Menjadi Data yang Siap Dianalisis membantu kamu mengubah format lebar seperti Jan, Feb, Mar menjadi kolom Bulan dan Nilai. Fokusnya bukan menghafal menu, tetapi membuat file lebih mudah diperbarui dan diperiksa.

## Kapan Panduan Ini Berguna

Gunakan langkah ini ketika kamu ingin mengubah format lebar seperti Jan, Feb, Mar menjadi kolom Bulan dan Nilai. Mulailah dari file contoh kecil agar perubahan mudah diamati.

## Prasyarat

Data memiliki satu atau beberapa kolom identitas serta beberapa kolom periode.

## Langkah Praktik

1. Muat tabel lebar ke Power Query.
2. Pilih kolom identitas seperti Produk atau Cabang.
3. Pilih Transform > Unpivot Other Columns.
4. Ubah nama Attribute menjadi Bulan dan Value menjadi Nilai sebelum load.

## Contoh Singkat

Tabel target penjualan dengan kolom Jan-Mar diubah menjadi Produk, Bulan, dan Nilai agar mudah dibuat PivotTable.

## Kesalahan Umum

Unpivot mengubah bentuk data, bukan nilai dasarnya. Simpan query agar perubahan dapat diulang saat periode baru ditambah.

## Tips Agar File Tetap Rapi

Gunakan judul kolom yang konsisten, simpan contoh data secukupnya, dan periksa hasil setelah menambah baris baru. Bila file dipakai tim, catat aturan penulisan di sheet Cara Pakai agar semua orang mengikuti pola yang sama.

## Batasan dan Kompatibilitas

Beberapa fitur modern seperti dynamic array, LET, FILTER, UNIQUE, SORT, dan TEXTSPLIT memerlukan Excel 365 atau Excel 2021. Jika file akan dibuka di versi lebih lama atau Google Sheets, uji hasilnya terlebih dahulu.

## Pertanyaan yang Sering Ditanyakan

**Apakah saya perlu langsung memakai data asli?**

Tidak. Uji dulu dengan beberapa baris contoh supaya perubahan dan hasil rumus mudah diperiksa.

**Bagaimana kalau hasilnya tidak sesuai?**

Periksa kembali nama kolom, tipe data, dan referensi rumus. Bila perlu, gunakan Trace Precedents untuk menelusuri sumber angka.
