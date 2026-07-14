---
title: "UNIQUE dan SORT Excel untuk Membuat Daftar Bersih Otomatis"
meta_title: "UNIQUE dan SORT Excel untuk Membuat Daftar Bersih Otomatis"
meta_description: "Membuat daftar pelanggan unik yang langsung terurut dari data transaksi tanpa menghapus data sumber."
slug: "panduan-unique-sort-excel"
summary: "Membuat daftar pelanggan unik yang langsung terurut dari data transaksi tanpa menghapus data sumber."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "14 menit"
prerequisites: ["Excel 365 atau Excel 2021","Kolom pelanggan dengan beberapa nama berulang"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021"]
tags: ["UNIQUE excel","SORT excel","dynamic array"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: true
related_templates: ["template-database-pelanggan-sederhana"]
related_guides: ["panduan-dynamic-array-spill-excel","panduan-dropdown-dinamis-excel"]
related_formulas: ["rumus-filter-daftar-dinamis"]
related_troubleshooting: ["masalah-angka-tidak-terjumlah-format-teks"]
---

## Masalah yang Diselesaikan

Daftar pilihan dari transaksi mentah berisi nama berulang dan sulit dirawat secara manual.

## Hasil yang Diharapkan

Satu formula menghasilkan daftar unik dan terurut yang dapat dipakai sebagai bahan dropdown atau ringkasan.

## Prasyarat

- Excel 365 atau Excel 2021
- Kolom pelanggan dengan beberapa nama berulang

## Contoh Input

```text
C2:C7 = Toko Melati, Toko Sari, Toko Melati, Koperasi Maju, Toko Sari, Koperasi Maju.
```

## Langkah Praktik

1. Pilih area output yang kosong, misalnya F2.
2. Gunakan `=SORT(UNIQUE(C2:C100))`.
3. Tambahkan satu nama pelanggan baru pada C8.
4. Periksa apakah hasil di F2 meluas dan tetap terurut.
5. Gunakan hasil tersebut sebagai sumber laporan, bukan mengedit daftar output langsung.

## Mengapa Ini Bekerja

UNIQUE menghapus nilai berulang, lalu SORT mengurutkan array hasilnya. Urutan fungsi penting karena SORT bekerja pada hasil UNIQUE.

## Kesalahan Umum

- Spasi tersembunyi membuat dua nama yang tampak sama dianggap berbeda.
- Output terhalang sehingga formula menghasilkan #SPILL!.

## Diagnosis

Bandingkan panjang teks dengan LEN dan bersihkan data dengan TRIM pada kolom bantu bila perlu.

## Cara Memperbaiki

Bersihkan sumber, kosongkan area spill, dan jangan menaruh formula lain di dalam output.

## Kompatibilitas dan Alternatif Versi Lama

UNIQUE dan SORT merupakan fungsi dynamic array pada Microsoft 365 dan Excel 2021. Excel 2019 memerlukan Remove Duplicates atau PivotTable.

Alternatif untuk Excel lama: Gunakan Data > Remove Duplicates pada salinan data, atau PivotTable untuk daftar kategori.

## Batasan

Daftar unik tidak otomatis memperbaiki perbedaan kapitalisasi, ejaan, atau ID pelanggan yang salah.

## Langkah Praktis Berikutnya

Gunakan daftar hasil hanya setelah aturan penamaan pelanggan disepakati.

## Related Resources

- Template: [template-database-pelanggan-sederhana](/templates/)
- Panduan: [panduan-dynamic-array-spill-excel](/panduan/), [panduan-dropdown-dinamis-excel](/panduan/)
- Rumus: [rumus-filter-daftar-dinamis](/rumus-excel/)
- Troubleshooting: [masalah-angka-tidak-terjumlah-format-teks](/masalah-excel/)

Google Sheets: artikel ini berfokus pada Excel; jangan menganggap perilaku Google Sheets identik.
