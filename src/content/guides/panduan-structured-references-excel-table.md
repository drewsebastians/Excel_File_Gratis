---
title: "Structured References Excel: Membaca Rumus di Dalam Table"
meta_title: "Structured References Excel: Membaca Rumus di Dalam Table"
meta_description: "Panduan structured references excel: membaca rumus di dalam table dengan langkah praktis, contoh, kesalahan umum, dan batasan versi Excel."
slug: "panduan-structured-references-excel-table"
summary: "Panduan praktis untuk membaca referensi seperti `Penjualan[Total]` dan `[@Jumlah]*[@Harga]` tanpa tersesat oleh alamat sel, dengan contoh dan langkah yang mudah diikuti."
category: "dasar-excel"
difficulty: "menengah"
estimated_time: "14 menit"
prerequisites: ["Sudah membuat Excel Table dan memahami rumus perkalian sederhana."]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021 atau lebih baru"]
tags: ["belajar excel","dasar-excel","menengah"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: true
related_templates: ["template-stok-barang-excel-gratis","template-laporan-penjualan-harian-umkm"]
related_guides: ["panduan-excel-table-untuk-template","panduan-dropdown-data-validation-excel"]
related_formulas: ["rumus-filter-daftar-dinamis","rumus-xlookup-vlookup-data","rumus-countifs-dashboard-status"]
related_troubleshooting: ["masalah-dropdown-data-validation-tidak-muncul", "masalah-vlookup-xlookup-na"]
---

Structured References Excel: Membaca Rumus di Dalam Table membantu kamu membaca referensi seperti `Penjualan[Total]` dan `[@Jumlah]*[@Harga]` tanpa tersesat oleh alamat sel. Fokusnya bukan menghafal menu, tetapi membuat file lebih mudah diperbarui dan diperiksa.

## Kapan Panduan Ini Berguna

Gunakan langkah ini ketika kamu ingin membaca referensi seperti `Penjualan[Total]` dan `[@Jumlah]*[@Harga]` tanpa tersesat oleh alamat sel. Mulailah dari file contoh kecil agar perubahan mudah diamati.

## Prasyarat

Sudah membuat Excel Table dan memahami rumus perkalian sederhana.

## Langkah Praktik

1. Buat Table bernama Penjualan dengan kolom Jumlah, Harga, dan Total.
2. Di kolom Total, tulis rumus `=[@Jumlah]*[@Harga]`.
3. Buat satu sel ringkasan di luar Table dengan `=SUM(Penjualan[Total])`.
4. Ubah satu harga untuk melihat dua rumus tersebut ikut diperbarui.

## Contoh Singkat

Kolom Total yang menghitung `[@Jumlah]*[@Harga]`, lalu total keseluruhan memakai `=SUM(Penjualan[Total])`.

## Kesalahan Umum

Jangan mengganti judul kolom sembarangan karena nama itu ikut dipakai oleh structured reference.

## Tips Agar File Tetap Rapi

Gunakan judul kolom yang konsisten, simpan contoh data secukupnya, dan periksa hasil setelah menambah baris baru. Bila file dipakai tim, catat aturan penulisan di sheet Cara Pakai agar semua orang mengikuti pola yang sama.

## Batasan dan Kompatibilitas

Beberapa fitur modern seperti dynamic array, LET, FILTER, UNIQUE, SORT, dan TEXTSPLIT memerlukan Excel 365 atau Excel 2021. Jika file akan dibuka di versi lebih lama atau Google Sheets, uji hasilnya terlebih dahulu.

## Pertanyaan yang Sering Ditanyakan

**Apakah saya perlu langsung memakai data asli?**

Tidak. Uji dulu dengan beberapa baris contoh supaya perubahan dan hasil rumus mudah diperiksa.

**Bagaimana kalau hasilnya tidak sesuai?**

Periksa kembali nama kolom, tipe data, dan referensi rumus. Bila perlu, gunakan Trace Precedents untuk menelusuri sumber angka.
