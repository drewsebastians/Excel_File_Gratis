---
title: "TEXTSPLIT Excel: Memecah Data Impor yang Menumpuk dalam Satu Kolom"
meta_title: "TEXTSPLIT Excel: Memecah Data Impor yang Menumpuk dalam Satu Kolom"
meta_description: "Memisahkan data impor berformat `kode|nama|kategori` menjadi kolom terstruktur dengan TEXTSPLIT dan pemeriksaan hasil."
slug: "panduan-textsplit-excel"
summary: "Memisahkan data impor berformat `kode|nama|kategori` menjadi kolom terstruktur dengan TEXTSPLIT dan pemeriksaan hasil."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "15 menit"
prerequisites: ["Excel 365 atau Excel 2021","Data yang memakai pemisah konsisten"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021"]
tags: ["TEXTSPLIT","import data","dynamic array"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: true
related_templates: ["template-database-pelanggan-sederhana"]
related_guides: ["panduan-dynamic-array-spill-excel","panduan-power-query-data-asli"]
related_formulas: ["rumus-filter-daftar-dinamis"]
related_troubleshooting: ["masalah-file-excel-berantakan-google-sheets"]
---

## Masalah yang Diselesaikan

Data dari email atau sistem lama sering masuk sebagai satu teks panjang dengan pemisah tertentu.

## Hasil yang Diharapkan

Satu formula memecah teks menjadi beberapa kolom dan tetap mudah diuji ketika delimiter tidak konsisten.

## Prasyarat

- Excel 365 atau Excel 2021
- Data yang memakai pemisah konsisten

## Contoh Input

```text
A2=`BRG-01|Buku Tulis|ATK`; formula `=TEXTSPLIT(A2,"|")`.
```

## Langkah Praktik

1. Pastikan karakter `|` tidak dipakai sebagai bagian normal dari nama.
2. Masukkan TEXTSPLIT di B2, bukan di sel yang berisi data sumber.
3. Cek hasil spill ke tiga kolom.
4. Uji satu baris dengan field kosong, misalnya `BRG-02||ATK`.
5. Tambahkan `ignore_empty` hanya setelah memahami apakah field kosong perlu dipertahankan.

## Mengapa Ini Bekerja

Argumen kedua adalah column delimiter. TEXTSPLIT dapat mengembalikan array horizontal, sedangkan row delimiter digunakan untuk memecah baris.

## Kesalahan Umum

- Delimiter berbeda-beda, misalnya sebagian memakai koma dan sebagian memakai pipa.
- Area hasil terisi sehingga spill gagal.

## Diagnosis

Hitung jumlah delimiter dengan LEN dan SUBSTITUTE, lalu periksa baris yang jumlah bagiannya tidak sama.

## Cara Memperbaiki

Normalisasi delimiter lebih dulu atau gunakan delimiter alternatif yang benar; jangan menghapus field kosong tanpa keputusan data.

## Kompatibilitas dan Alternatif Versi Lama

TEXTSPLIT tersedia pada Microsoft 365 dan Excel 2021. Excel 2019 memerlukan Text to Columns, Power Query, atau formula bantu.

Alternatif untuk Excel lama: Gunakan Data > Text to Columns untuk pekerjaan satu kali, atau Power Query untuk impor berulang.

## Batasan

TEXTSPLIT tidak memahami struktur bisnis; hasilnya tetap perlu pemeriksaan tipe tanggal, angka, dan kode.

## Langkah Praktis Berikutnya

Simpan satu baris input rusak sebagai fixture uji sebelum file dipakai pada impor berikutnya.

## Related Resources

- Template: [template-database-pelanggan-sederhana](/templates/)
- Panduan: [panduan-dynamic-array-spill-excel](/panduan/), [panduan-power-query-data-asli](/panduan/)
- Rumus: [rumus-filter-daftar-dinamis](/rumus-excel/)
- Troubleshooting: [masalah-file-excel-berantakan-google-sheets](/masalah-excel/)

Google Sheets: artikel ini berfokus pada Excel; jangan menganggap perilaku Google Sheets identik.
