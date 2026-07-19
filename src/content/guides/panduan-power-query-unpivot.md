---
title: "Unpivot Power Query: Mengubah Kolom Bulan Menjadi Data yang Siap Dianalisis"
meta_title: "Unpivot Power Query: Mengubah Kolom Bulan Menjadi Data yang Siap Dianalisis"
meta_description: "Mengubah tabel penjualan dengan kolom Jan, Feb, dan Mar menjadi format baris-per-bulan untuk PivotTable."
slug: "panduan-power-query-unpivot"
summary: "Mengubah tabel penjualan dengan kolom Jan, Feb, dan Mar menjadi format baris-per-bulan untuk PivotTable."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "17 menit"
prerequisites: ["Data berbentuk satu baris per produk","Power Query Editor"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021","Microsoft Excel 2019"]
tags: ["unpivot","Power Query","data analisis"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: false
related_templates: ["template-rekap-penjualan-bulanan"]
related_guides: ["panduan-power-query-append","panduan-pivottable-dua-tabel"]
related_formulas: ["rumus-sumifs-rekap-kategori"]
related_troubleshooting: ["masalah-file-excel-berantakan-google-sheets"]
---

Mengubah tabel penjualan dengan kolom Jan, Feb, dan Mar menjadi format baris-per-bulan untuk PivotTable. Panduan ini memulai dari hasil yang perlu diperiksa, lalu mengarahkan kamu ke langkah yang dapat diuji pada data kecil sebelum diterapkan ke workbook kerja.

## Sebelum Menerapkan ke File Kerja

Gunakan salinan data atau workbook uji terlebih dahulu. Periksa versi Excel, lokasi menu, dan hasil rumus pada kondisi yang kamu gunakan; perilaku Excel web, Mac, atau Google Sheets dapat berbeda dari Excel desktop.

## Masalah yang Diselesaikan

Kolom bulan melebar membuat filter, chart, dan ringkasan lintas periode lebih sulit.

## Hasil yang Diharapkan

Bulan menjadi nilai pada satu kolom dan angka penjualan menjadi satu kolom nilai.

## Prasyarat

- Data berbentuk satu baris per produk
- Power Query Editor

## Contoh Input

```text
Produk | Jan | Feb | Mar
Kopi | 10 | 12 | 9
Teh | 8 | 11 | 13
```

## Langkah Praktik

1. Muat data ke Power Query.
2. Pilih kolom identitas Produk.
3. Klik Transform > Unpivot Columns > Unpivot Other Columns.
4. Rename Attribute menjadi Bulan dan Value menjadi Jumlah.
5. Ubah Jumlah menjadi tipe angka dan Close & Load.
6. Refresh setelah menambah kolom bulan hanya jika desain sumber memang mendukungnya.

## Mengapa Ini Bekerja

Unpivot mengubah nama kolom periode menjadi nilai baris sehingga satu struktur dapat dipakai untuk filter dan agregasi.

## Kesalahan Umum

- Kolom identitas ikut ter-unpivot karena pemilihan awal salah.
- Header bulan mengandung teks campuran yang tidak konsisten.

## Diagnosis

Periksa preview tiga kolom hasil: Produk, Attribute, Value. Bandingkan jumlah produk dikali periode dengan jumlah baris output.

## Cara Memperbaiki

Undo langkah dan pilih kolom identitas, lalu gunakan Unpivot Other Columns.

## Kompatibilitas dan Alternatif Versi Lama

Unpivot tersedia pada Power Query Excel 2016 ke atas. Google Sheets perlu formula atau Apps Script yang berbeda.

Alternatif untuk Excel lama: Gunakan Power Query sebagai pilihan utama; untuk data kecil, salin ke format panjang secara manual dengan checklist.

## Batasan

Unpivot tidak memahami apakah kolom tertentu adalah forecast, actual, atau revisi; metadata itu perlu dipertahankan.

## Langkah Praktis Berikutnya

Tambahkan kolom Tahun atau Skenario sebelum unpivot jika periode berulang di beberapa sumber.

## Related Resources

- Template: [template-rekap-penjualan-bulanan](/templates/)
- Panduan: [panduan-power-query-append](/panduan/), [panduan-pivottable-dua-tabel](/panduan/)
- Rumus: [rumus-sumifs-rekap-kategori](/rumus-excel/)
- Troubleshooting: [masalah-file-excel-berantakan-google-sheets](/masalah-excel/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
