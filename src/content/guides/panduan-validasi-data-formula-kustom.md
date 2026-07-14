---
title: "Validasi Data Excel dengan Formula Kustom untuk Mencegah Salah Input"
meta_title: "Validasi Data Excel dengan Formula Kustom untuk Mencegah Salah Input"
meta_description: "Panduan validasi data excel dengan formula kustom untuk mencegah salah input dengan langkah praktis, contoh, kesalahan umum, dan batasan versi Excel."
slug: "panduan-validasi-data-formula-kustom"
summary: "Panduan praktis untuk membuat aturan input selain dropdown, misalnya ID berawalan tertentu atau mencegah data ganda, dengan contoh dan langkah yang mudah diikuti."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "15 menit"
prerequisites: ["Pahami referensi relatif dan absolut dasar seperti A2 dan $A$2."]
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

Validasi Data Excel dengan Formula Kustom untuk Mencegah Salah Input membantu kamu membuat aturan input selain dropdown, misalnya ID berawalan tertentu atau mencegah data ganda. Fokusnya bukan menghafal menu, tetapi membuat file lebih mudah diperbarui dan diperiksa.

## Kapan Panduan Ini Berguna

Gunakan langkah ini ketika kamu ingin membuat aturan input selain dropdown, misalnya ID berawalan tertentu atau mencegah data ganda. Mulailah dari file contoh kecil agar perubahan mudah diamati.

## Prasyarat

Pahami referensi relatif dan absolut dasar seperti A2 dan $A$2.

## Langkah Praktik

1. Pilih rentang input mulai dari baris pertama data.
2. Buka Data Validation lalu pilih Custom.
3. Masukkan formula sesuai aturan dan pastikan referensi pertama mengarah ke baris aktif.
4. Uji dengan contoh yang benar serta contoh yang seharusnya ditolak.

## Contoh Singkat

Kolom kode pelanggan hanya menerima nilai yang belum pernah dipakai dengan pola `=COUNTIF($A$2:A2,A2)=1`.

## Kesalahan Umum

Formula validasi harus ditulis berdasarkan sel kiri atas dari rentang yang dipilih, bukan berdasarkan seluruh kolom sekaligus.

## Tips Agar File Tetap Rapi

Gunakan judul kolom yang konsisten, simpan contoh data secukupnya, dan periksa hasil setelah menambah baris baru. Bila file dipakai tim, catat aturan penulisan di sheet Cara Pakai agar semua orang mengikuti pola yang sama.

## Batasan dan Kompatibilitas

Beberapa fitur modern seperti dynamic array, LET, FILTER, UNIQUE, SORT, dan TEXTSPLIT memerlukan Excel 365 atau Excel 2021. Jika file akan dibuka di versi lebih lama atau Google Sheets, uji hasilnya terlebih dahulu.

## Pertanyaan yang Sering Ditanyakan

**Apakah saya perlu langsung memakai data asli?**

Tidak. Uji dulu dengan beberapa baris contoh supaya perubahan dan hasil rumus mudah diperiksa.

**Bagaimana kalau hasilnya tidak sesuai?**

Periksa kembali nama kolom, tipe data, dan referensi rumus. Bila perlu, gunakan Trace Precedents untuk menelusuri sumber angka.
