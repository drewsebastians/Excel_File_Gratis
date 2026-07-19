---
title: "PivotTable dari Dua Tabel: Memahami Relasi Data Sebelum Membuat Ringkasan"
meta_title: "PivotTable dari Dua Tabel: Memahami Relasi Data Sebelum Membuat Ringkasan"
meta_description: "Menyusun ringkasan penjualan dari tabel transaksi dan master produk dengan relasi key yang jelas."
slug: "panduan-pivottable-dua-tabel"
summary: "Menyusun ringkasan penjualan dari tabel transaksi dan master produk dengan relasi key yang jelas."
category: "pengolahan-data"
difficulty: "lanjutan"
estimated_time: "22 menit"
prerequisites: ["Excel desktop","Table transaksi dan Table master dengan key","Power Pivot/Data Model bila memakai relasi"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021","Microsoft Excel 2019 dengan batasan fitur"]
tags: ["PivotTable","Data Model","relasi tabel"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: false
related_templates: ["template-rekap-penjualan-bulanan","template-daftar-harga-produk-jasa"]
related_guides: ["panduan-data-model-excel","panduan-power-query-merge-vs-append"]
related_formulas: ["rumus-sumifs-rekap-kategori"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol"]
---

Menyusun ringkasan penjualan dari tabel transaksi dan master produk dengan relasi key yang jelas. Panduan ini memulai dari hasil yang perlu diperiksa, lalu mengarahkan kamu ke langkah yang dapat diuji pada data kecil sebelum diterapkan ke workbook kerja.

## Sebelum Menerapkan ke File Kerja

Gunakan salinan data atau workbook uji terlebih dahulu. Periksa versi Excel, lokasi menu, dan hasil rumus pada kondisi yang kamu gunakan; perilaku Excel web, Mac, atau Google Sheets dapat berbeda dari Excel desktop.

## Masalah yang Diselesaikan

Dua tabel tidak boleh asal digabung karena penggabungan manual dapat menggandakan baris dan angka.

## Hasil yang Diharapkan

Kamu dapat memilih PivotTable satu sumber atau Data Model multi-tabel berdasarkan bentuk data.

## Prasyarat

- Excel desktop
- Table transaksi dan Table master dengan key
- Power Pivot/Data Model bila memakai relasi

## Contoh Input

```text
FactSales(IDProduk, Tanggal, Qty, Total) dan DimProduct(IDProduk, Produk, Kategori).
```

## Langkah Praktik

1. Pastikan IDProduk pada master unik dan kedua kolom key bertipe sama.
2. Beri nama kedua Table dengan jelas.
3. Untuk versi yang mendukung, pilih Insert > PivotTable dan tambahkan tabel ke Data Model.
4. Buat relasi FactSales[IDProduk] ke DimProduct[IDProduk].
5. Susun Kategori pada Rows dan Sum of Total pada Values.
6. Bandingkan grand total PivotTable dengan SUM pada sumber transaksi.

## Mengapa Ini Bekerja

Model satu-ke-banyak memisahkan fakta transaksi dari atribut produk. Filter kategori mengalir melalui relasi, bukan melalui duplikasi data master di setiap baris.

## Kesalahan Umum

- Key master duplikat atau kosong menyebabkan relasi tidak valid.
- Grand total berubah karena transaksi memiliki ID yang tidak ditemukan di master.

## Diagnosis

Periksa Diagram View, jumlah unmatched key, dan rekonsiliasi grand total sebelum mempercayai Pivot.

## Cara Memperbaiki

Bersihkan master, perbaiki key, lalu refresh. Jangan mengatasi mismatch dengan menyalin master berulang-ulang ke fact table.

## Kompatibilitas dan Alternatif Versi Lama

Data Model dan relasi paling lengkap pada Excel desktop Windows; dukungan Excel web, Mac, dan Google Sheets dapat berbeda.

Alternatif untuk Excel lama: Gabungkan kolom master dengan Power Query Merge sebelum PivotTable jika Data Model tidak tersedia.

## Batasan

PivotTable bukan sistem kontrol transaksi; hasilnya bergantung pada refresh dan kualitas sumber.

## Langkah Praktis Berikutnya

Catat grain setiap tabel: satu baris transaksi versus satu baris produk.

## Related Resources

- Template: [template-rekap-penjualan-bulanan](/templates/), [template-daftar-harga-produk-jasa](/templates/)
- Panduan: [panduan-data-model-excel](/panduan/), [panduan-power-query-merge-vs-append](/panduan/)
- Rumus: [rumus-sumifs-rekap-kategori](/rumus-excel/)
- Troubleshooting: [masalah-sumifs-countifs-hasil-nol](/masalah-excel/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
