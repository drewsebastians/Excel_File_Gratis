---
title: "Parameter Power Query: Mengganti Sumber File Tanpa Membuat Query Ulang"
meta_title: "Parameter Power Query: Mengganti Sumber File Tanpa Membuat Query Ulang"
meta_description: "Panduan parameter power query: mengganti sumber file tanpa membuat query ulang dengan langkah praktis, contoh, kesalahan umum, dan batasan versi Excel."
slug: "panduan-parameter-power-query"
summary: "Panduan praktis untuk menggunakan parameter untuk folder, nama file, atau tanggal batas data, dengan contoh dan langkah yang mudah diikuti."
category: "pengolahan-data"
difficulty: "lanjutan"
estimated_time: "16 menit"
prerequisites: ["Sudah memiliki query Power Query yang berjalan dan memahami lokasi sumber datanya."]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021 atau lebih baru"]
tags: ["belajar excel","pengolahan-data","lanjutan"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: true
related_templates: ["template-stok-barang-excel-gratis","template-laporan-penjualan-harian-umkm"]
related_guides: ["panduan-excel-table-untuk-template","panduan-dropdown-data-validation-excel"]
related_formulas: ["rumus-filter-daftar-dinamis","rumus-xlookup-vlookup-data","rumus-countifs-dashboard-status"]
related_troubleshooting: ["masalah-dropdown-data-validation-tidak-muncul", "masalah-vlookup-xlookup-na"]
---

Parameter Power Query: Mengganti Sumber File Tanpa Membuat Query Ulang membantu kamu menggunakan parameter untuk folder, nama file, atau tanggal batas data. Fokusnya bukan menghafal menu, tetapi membuat file lebih mudah diperbarui dan diperiksa.

## Kapan Panduan Ini Berguna

Gunakan langkah ini ketika kamu ingin menggunakan parameter untuk folder, nama file, atau tanggal batas data. Mulailah dari file contoh kecil agar perubahan mudah diamati.

## Prasyarat

Sudah memiliki query Power Query yang berjalan dan memahami lokasi sumber datanya.

## Langkah Praktik

1. Buka Manage Parameters dan buat parameter teks untuk lokasi sumber.
2. Ganti nilai sumber yang diketik langsung di query dengan parameter tersebut.
3. Refresh query untuk memastikan sumber baru terbaca.
4. Dokumentasikan nilai parameter agar orang lain dapat memeliharanya.

## Contoh Singkat

Parameter FolderSumber dipakai oleh query agar lokasi file dapat diganti dari satu tempat.

## Kesalahan Umum

Parameter tidak memperbaiki perubahan struktur file. Header dan tipe data sumber tetap harus konsisten.

## Tips Agar File Tetap Rapi

Gunakan judul kolom yang konsisten, simpan contoh data secukupnya, dan periksa hasil setelah menambah baris baru. Bila file dipakai tim, catat aturan penulisan di sheet Cara Pakai agar semua orang mengikuti pola yang sama.

## Batasan dan Kompatibilitas

Beberapa fitur modern seperti dynamic array, LET, FILTER, UNIQUE, SORT, dan TEXTSPLIT memerlukan Excel 365 atau Excel 2021. Jika file akan dibuka di versi lebih lama atau Google Sheets, uji hasilnya terlebih dahulu.

## Pertanyaan yang Sering Ditanyakan

**Apakah saya perlu langsung memakai data asli?**

Tidak. Uji dulu dengan beberapa baris contoh supaya perubahan dan hasil rumus mudah diperiksa.

**Bagaimana kalau hasilnya tidak sesuai?**

Periksa kembali nama kolom, tipe data, dan referensi rumus. Bila perlu, gunakan Trace Precedents untuk menelusuri sumber angka.
