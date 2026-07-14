---
title: "Rumus LET Excel: Membuat Formula Panjang Lebih Mudah Dibaca"
meta_title: "Rumus LET Excel: Membuat Formula Panjang Lebih Mudah Dibaca"
meta_description: "Memecah formula laporan penjualan menjadi nama variabel dengan LET agar perhitungan berulang lebih jelas dan mudah diuji."
slug: "panduan-rumus-let-excel"
summary: "Memecah formula laporan penjualan menjadi nama variabel dengan LET agar perhitungan berulang lebih jelas dan mudah diuji."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "16 menit"
prerequisites: ["Excel 365 atau Excel 2021","Data Qty dan Harga"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021"]
tags: ["LET excel","rumus modern","formula"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: true
related_templates: ["template-laporan-penjualan-harian-umkm"]
related_guides: ["panduan-rumus-filter-laporan","panduan-audit-rumus-excel"]
related_formulas: ["rumus-iferror-template-rapi","rumus-sumifs-rekap-kategori"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol"]
---

## Masalah yang Diselesaikan

Formula yang mengulang `Qty*Harga` beberapa kali sulit dibaca dan rawan tidak konsisten ketika diperbaiki.

## Hasil yang Diharapkan

Satu formula LET menghitung subtotal, diskon, dan total akhir dengan nama yang dapat dibaca.

## Prasyarat

- Excel 365 atau Excel 2021
- Data Qty dan Harga

## Contoh Input

```text
Qty=3, Harga=25000, Diskon=5000; hasil yang diharapkan: 70000.
```

## Langkah Praktik

1. Siapkan sel B2 untuk Qty, C2 untuk Harga, dan D2 untuk Diskon.
2. Masukkan `=LET(subtotal,B2*C2,total,subtotal-D2,total)`.
3. Ubah salah satu input dan pastikan total mengikuti perubahan.
4. Bandingkan dengan formula panjang tanpa LET untuk memastikan hasil sama.

## Mengapa Ini Bekerja

LET mengikat nama ke hasil ekspresi lalu mengembalikan nama terakhir. Nilai `subtotal` dihitung sekali dan dipakai kembali pada `total`.

## Kesalahan Umum

- Nama variabel menyerupai referensi sel atau memakai spasi.
- Kurung atau pemisah argumen kurang satu, terutama pada regional setting yang memakai titik koma.

## Diagnosis

Evaluasi bagian `B2*C2` sendiri, lalu cek formula separator yang dipakai Excel melalui formula sederhana.

## Cara Memperbaiki

Gunakan nama tanpa spasi, sesuaikan pemisah koma/titik koma, dan pastikan ekspresi terakhir adalah hasil yang ingin ditampilkan.

## Kompatibilitas dan Alternatif Versi Lama

LET tersedia pada Microsoft 365 dan Excel 2021. Excel 2019 dan Google Sheets tidak dapat diasumsikan mendukung sintaks yang sama.

Alternatif untuk Excel lama: Gunakan kolom bantu untuk subtotal dan total pada Excel lama.

## Batasan

LET membuat formula rapi, tetapi tidak mengubah aturan perhitungan atau menggantikan desain tabel yang baik.

## Langkah Praktis Berikutnya

Refactor satu formula berulang di workbook uji, lalu simpan versi lama untuk perbandingan.

## Related Resources

- Template: [template-laporan-penjualan-harian-umkm](/templates/)
- Panduan: [panduan-rumus-filter-laporan](/panduan/), [panduan-audit-rumus-excel](/panduan/)
- Rumus: [rumus-iferror-template-rapi](/rumus-excel/), [rumus-sumifs-rekap-kategori](/rumus-excel/)
- Troubleshooting: [masalah-sumifs-countifs-hasil-nol](/masalah-excel/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
