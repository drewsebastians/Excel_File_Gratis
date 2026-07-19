---
title: "Cara Membuat Laporan Mandiri dengan Rumus FILTER Excel"
meta_title: "Cara Membuat Laporan Mandiri dengan Rumus FILTER Excel"
meta_description: "Menampilkan transaksi milik pelanggan terpilih dengan FILTER, termasuk pesan ketika tidak ada baris yang cocok."
slug: "panduan-rumus-filter-laporan"
summary: "Menampilkan transaksi milik pelanggan terpilih dengan FILTER, termasuk pesan ketika tidak ada baris yang cocok."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "15 menit"
prerequisites: ["Excel 365 atau Excel 2021","Data transaksi A2:D20","Sel kriteria G2"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021"]
tags: ["FILTER excel","dynamic array","laporan excel"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: false
related_templates: ["template-rekap-pesanan-pelanggan","template-laporan-penjualan-harian-umkm"]
related_guides: ["panduan-dynamic-array-spill-excel","panduan-unique-sort-excel"]
related_formulas: ["rumus-filter-daftar-dinamis","rumus-countifs-dashboard-status"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol"]
---

Menampilkan transaksi milik pelanggan terpilih dengan FILTER, termasuk pesan ketika tidak ada baris yang cocok. Panduan ini memulai dari hasil yang perlu diperiksa, lalu mengarahkan kamu ke langkah yang dapat diuji pada data kecil sebelum diterapkan ke workbook kerja.

## Sebelum Menerapkan ke File Kerja

Gunakan salinan data atau workbook uji terlebih dahulu. Periksa versi Excel, lokasi menu, dan hasil rumus pada kondisi yang kamu gunakan; perilaku Excel web, Mac, atau Google Sheets dapat berbeda dari Excel desktop.

## Masalah yang Diselesaikan

Laporan per pelanggan sering dibuat dengan salin-tempel sehingga mudah tertinggal saat transaksi berubah.

## Hasil yang Diharapkan

Area laporan berubah otomatis ketika nama pelanggan pada G2 diganti.

## Prasyarat

- Excel 365 atau Excel 2021
- Data transaksi A2:D20
- Sel kriteria G2

## Contoh Input

```text
A:D = ID, Tanggal, Pelanggan, Total; G2=`Toko Melati`; formula `=FILTER(A2:D20,C2:C20=G2,"Tidak ada transaksi")`.
```

## Langkah Praktik

1. Pastikan A2:D20 memiliki data dan C adalah kolom Pelanggan.
2. Isi G2 dengan nama pelanggan yang ingin dilihat.
3. Masukkan formula FILTER di A24 atau area output kosong.
4. Ganti G2 ke pelanggan lain dan amati hasil yang spill.
5. Uji nama yang tidak ada untuk memastikan pesan pengganti muncul.

## Mengapa Ini Bekerja

Argumen include menghasilkan TRUE/FALSE per baris. FILTER hanya mengembalikan baris TRUE dan argumen ketiga mencegah tampilan error saat tidak ada hasil.

## Kesalahan Umum

- Kolom kriteria tidak memiliki jumlah baris sama dengan array data.
- Area spill tertutup oleh isi lain.

## Diagnosis

Uji `=C2:C20=G2` di area kosong dan hitung jumlah TRUE. Periksa #SPILL! pada anchor formula.

## Cara Memperbaiki

Samakan tinggi rentang, bersihkan area output, dan gunakan pesan pengganti yang sesuai konteks.

## Kompatibilitas dan Alternatif Versi Lama

FILTER tersedia pada Microsoft 365 dan Excel 2021. Excel 2019 memerlukan helper column atau Advanced Filter; Google Sheets memiliki FILTER dengan sintaks yang mirip tetapi perilaku berbeda.

Alternatif untuk Excel lama: Gunakan Advanced Filter atau PivotTable untuk laporan yang dibuat manual pada Excel lama.

## Batasan

FILTER menampilkan data, bukan mengubah sumber; lindungi area output dari input manual.

## Langkah Praktis Berikutnya

Tambahkan dropdown pelanggan pada G2 setelah formula dasar sudah lulus uji.

## Related Resources

- Template: [template-rekap-pesanan-pelanggan](/templates/), [template-laporan-penjualan-harian-umkm](/templates/)
- Panduan: [panduan-dynamic-array-spill-excel](/panduan/), [panduan-unique-sort-excel](/panduan/)
- Rumus: [rumus-filter-daftar-dinamis](/rumus-excel/), [rumus-countifs-dashboard-status](/rumus-excel/)
- Troubleshooting: [masalah-sumifs-countifs-hasil-nol](/masalah-excel/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
