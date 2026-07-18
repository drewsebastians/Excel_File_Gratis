---
title: "Template Arus Kas UMKM Excel untuk Mencatat Uang Masuk dan Keluar"
meta_title: "Template Arus Kas UMKM Excel Gratis | ExcelGratis"
meta_description: "Unduh template arus kas UMKM Excel untuk mencatat uang masuk, uang keluar, saldo awal, saldo akhir, dan pengeluaran per kategori dalam satu periode."
slug: "template-arus-kas-umkm"
focus_keyword: "template arus kas umkm excel"
preview_image: "/assets/templates/template-arus-kas-umkm.png"
preview_alt: "Ringkasan bulanan template arus kas UMKM dengan saldo awal, total masuk, total keluar, saldo akhir, dan pengeluaran per kategori"
featured: true
draft: false
category: "bisnis-umkm"
tags: ["arus kas umkm", "cash flow sederhana", "pencatatan usaha", "template excel gratis"]
date: "2026-07-12"
updated_date: "2026-07-12"
file_name: "template-arus-kas-umkm.xlsx"
file_size: "10 KB"
suggested_h1: "Template Arus Kas UMKM Excel untuk Mencatat Uang Masuk dan Keluar"
usage_heading: "Cara Menggunakan Template Arus Kas UMKM"
ringkasan_singkat: "Catat uang masuk dan keluar usaha pada satu tabel, lalu pilih periode untuk memeriksa total penerimaan, pengeluaran, dan saldo akhir. File ini memiliki empat sheet, tidak memakai macro, dan menggunakan SUMIFS untuk rekap bulanan serta kategori."
file_spec:
  sheets: 4
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel; penggunaan di Google Sheets perlu diuji ulang"
batasan:
  - "Template ini adalah catatan arus kas sederhana, bukan laporan keuangan atau laporan pajak."
  - "Saldo akhir akan keliru bila transaksi terlewat atau jenis arus salah dipilih."
related_templates: ["template-laporan-penjualan-harian-umkm", "template-invoice-penjualan-umkm", "template-budget-bulanan"]
---

Catat uang masuk dan keluar usaha pada `Catatan Arus Kas`, lalu pilih bulan yang ingin diperiksa di `Ringkasan Bulanan`. Template arus kas UMKM Excel ini menghitung total penerimaan, pengeluaran, dan saldo akhir berdasarkan transaksi yang kamu masukkan. Gunakan hasilnya untuk pengecekan kas sederhana, bukan sebagai pengganti laporan keuangan atau pajak.

## Isi file template arus kas UMKM

File `.xlsx` berukuran 10 KB ini memiliki empat sheet dan tidak memakai macro:

- **Cara Pakai** — petunjuk awal sebelum mengisi transaksi.
- **Catatan Arus Kas** — tabel tanggal, jenis arus, kategori, keterangan, metode, nominal, dan periode bulan.
- **Ringkasan Bulanan** — rekap saldo awal, uang masuk, uang keluar, saldo akhir, dan pengeluaran per kategori.
- **Referensi** — daftar pilihan yang digunakan pada pencatatan.

Audit workbook menemukan satu Excel Table, data validation, dan 12 formula. Tidak ditemukan PivotTable, chart, named range, atau proteksi sheet.

## Cara menggunakan template

1. **Isi saldo awal.** Masukkan saldo kas sebelum periode transaksi yang akan diperiksa.
2. **Catat satu transaksi per baris.** Isi tanggal, jenis arus `Masuk` atau `Keluar`, kategori, keterangan, metode, dan nominal positif.
3. **Gunakan tanggal Excel yang valid.** Kolom periode memakai nilai tanggal untuk membentuk kriteria bulan.
4. **Periksa ringkasan.** Pilih periode di `Ringkasan Bulanan`, lalu cocokkan total dan saldo akhir dengan catatan sumber.

Checkpoint: total masuk dikurangi total keluar, kemudian ditambah saldo awal, harus sama dengan saldo akhir pada ringkasan.

## Contoh pencatatan satu periode

Data berikut hanya ilustrasi:

| Tanggal | Jenis Arus | Kategori | Keterangan | Nominal |
|---|---|---|---|---:|
| 02/07/2026 | Masuk | Penjualan | Penjualan tunai | Rp3.500.000 |
| 04/07/2026 | Keluar | Bahan Baku | Belanja bahan | Rp1.100.000 |
| 08/07/2026 | Keluar | Operasional | Internet dan transportasi | Rp400.000 |

Dengan saldo awal Rp2.000.000, total masuk Rp3.500.000, dan total keluar Rp1.500.000, saldo akhir ilustrasi menjadi Rp4.000.000.

## Apa yang dihitung oleh workbook

Rumus `SUMIFS` menjumlahkan nominal berdasarkan jenis arus dan bulan. Pengeluaran per kategori juga memakai kriteria kategori dan periode. Saldo akhir menggunakan pola saldo awal ditambah total masuk lalu dikurangi total keluar.

Untuk memahami perbedaan arus kas dan hasil usaha, baca [cara membaca arus kas sederhana untuk UMKM](/panduan/pengolahan-data/panduan-arus-kas-sederhana-umkm/). Pola rekapnya dijelaskan lebih lanjut pada [rumus SUMIFS untuk rekap kategori](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/).

## Jika saldo tidak sesuai

Periksa transaksi yang belum dicatat, jenis arus yang terbalik, tanggal yang tersimpan sebagai teks, atau nominal yang bukan angka. Bila nilai terlihat seperti angka tetapi tidak ikut dijumlahkan, gunakan [panduan memperbaiki angka berformat teks](/masalah-excel/format-data/masalah-angka-tidak-terjumlah-format-teks/).

## Batasan yang perlu diketahui

Template ini hanya mencatat pergerakan kas. File tidak menghitung laba rugi, pajak, piutang, utang, atau nilai persediaan. Kompatibilitas penuh dengan Google Sheets belum diverifikasi; uji kembali formula, data validation, dan tampilan setelah mengimpor file.

Unduh `template-arus-kas-umkm.xlsx`, simpan salinan cadangan, lalu masukkan beberapa transaksi uji sebelum memakai file untuk pencatatan rutin.
