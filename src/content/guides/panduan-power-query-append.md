---
title: "Append Queries Power Query: Menggabungkan Laporan Bulanan dengan Aman"
meta_title: "Append Queries Power Query: Menggabungkan Laporan Bulanan dengan Aman"
meta_description: "Menggabungkan tabel Januari, Februari, dan Maret yang kolomnya sejenis menjadi satu riwayat transaksi."
slug: "panduan-power-query-append"
summary: "Menggabungkan tabel Januari, Februari, dan Maret yang kolomnya sejenis menjadi satu riwayat transaksi."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "18 menit"
prerequisites: ["Tiga Table dengan header sejenis","Power Query di Excel desktop"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021","Microsoft Excel 2019"]
tags: ["append queries","Power Query","laporan bulanan"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: true
related_templates: ["template-rekap-penjualan-bulanan"]
related_guides: ["panduan-power-query-merge-vs-append","panduan-power-query-data-asli"]
related_formulas: ["rumus-sumifs-rekap-kategori"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol"]
---

## Masalah yang Diselesaikan

Menyalin laporan bulanan secara manual membuat header ganda dan baris terlewat.

## Hasil yang Diharapkan

Satu query gabungan menumpuk baris dari beberapa query sumber dan dapat di-refresh.

## Prasyarat

- Tiga Table dengan header sejenis
- Power Query di Excel desktop

## Contoh Input

```text
`qJan`, `qFeb`, `qMar` masing-masing memiliki kolom Tanggal, Produk, Qty, Total.
```

## Langkah Praktik

1. Pastikan nama dan tipe kolom ketiga query konsisten.
2. Buka Power Query Editor > Home > Append Queries as New.
3. Pilih Three or more tables lalu tambahkan qJan, qFeb, dan qMar.
4. Periksa jumlah baris dan nilai null pada query baru.
5. Close & Load To sebagai Table hasil, bukan menimpa sumber.

## Mengapa Ini Bekerja

Append menambah baris berdasarkan nama kolom. Kolom yang hanya ada pada sebagian query tetap muncul dengan null pada query lain.

## Kesalahan Umum

- Header `Total` dan `total` atau tipe angka dan teks tidak konsisten.
- Append dipakai padahal kebutuhan sebenarnya mencocokkan atribut dari dua tabel.

## Diagnosis

Lihat preview kolom dan Applied Steps; hitung baris tiap sumber sebelum dan sesudah append.

## Cara Memperbaiki

Samakan header dan tipe data sebelum append, lalu gunakan Merge bila relasinya berdasarkan key.

## Kompatibilitas dan Alternatif Versi Lama

Append Queries tersedia pada Power Query Excel 2016 ke atas. Google Sheets tidak memiliki Power Query Editor.

Alternatif untuk Excel lama: Gunakan VSTACK pada Microsoft 365 untuk penggabungan sederhana, atau Power Query versi desktop untuk alur yang dapat di-refresh.

## Batasan

Append tidak menghapus duplikat atau membuktikan bahwa ID transaksi unik.

## Langkah Praktis Berikutnya

Tambahkan kolom `BulanSumber` sebelum append jika asal periode penting untuk audit.

## Related Resources

- Template: [template-rekap-penjualan-bulanan](/templates/)
- Panduan: [panduan-power-query-merge-vs-append](/panduan/), [panduan-power-query-data-asli](/panduan/)
- Rumus: [rumus-sumifs-rekap-kategori](/rumus-excel/)
- Troubleshooting: [masalah-sumifs-countifs-hasil-nol](/masalah-excel/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
