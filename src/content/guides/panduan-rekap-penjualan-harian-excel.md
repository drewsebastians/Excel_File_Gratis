---
title: "Cara Membuat Rekap Penjualan Harian di Excel"
meta_title: "Cara Membuat Rekap Penjualan Harian di Excel"
meta_description: "Pelajari cara membuat rekap penjualan harian di Excel dari tabel transaksi, total per baris, SUMIFS per kategori, dan dashboard sederhana."
slug: "panduan-rekap-penjualan-harian-excel"
summary: "Buat rekap yang dapat dilacak dari tabel transaksi: satu transaksi per baris, total otomatis, lalu ringkas dengan SUMIFS."
category: "pengolahan-data"
difficulty: "pemula"
estimated_time: "12 menit"
prerequisites: ["Tabel transaksi dengan tanggal, kategori, jumlah, harga satuan, dan diskon", "Pemahaman dasar referensi sel"]
excel_versions: ["Microsoft Excel 2019 atau lebih baru", "Google Sheets"]
tags: ["rekap penjualan harian", "sumifs", "dashboard excel"]
date: "2026-07-12"
updated_date: "2026-07-12"
featured: true
draft: false
related_templates: ["template-laporan-penjualan-harian-umkm", "template-invoice-penjualan-umkm"]
related_guides: ["panduan-dashboard-sederhana-excel", "panduan-memilih-template-excel-umkm"]
related_formulas: ["rumus-sumifs-rekap-kategori", "rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol", "masalah-angka-tidak-terjumlah-format-teks"]
---

## Tujuan Pencarian

Panduan ini menunjukkan cara mengubah daftar transaksi menjadi rekap penjualan yang bisa diperiksa kembali, bukan sekadar mengetik total manual di akhir hari.

## Siapkan Tabel Transaksi

Buat kolom Tanggal, Nomor Invoice, Produk/Jasa, Kategori, Jumlah, Harga Satuan, Diskon, dan Total. Gunakan satu transaksi per baris. Di kolom Total, tulis `=F4*G4-H4` sesuai posisi kolom Anda, lalu salin formula ke bawah.

## Buat Rekap Kategori

Di area ringkasan, tulis nama kategori seperti Makanan, Minuman, dan Lainnya. Di sebelahnya gunakan `=SUMIFS($I$4:$I$80,$D$4:$D$80,A10)`. Rumus itu menjumlahkan kolom Total hanya ketika Kategori sama dengan nama di A10. Untuk total semua transaksi, gunakan `=SUM(I4:I80)`.

## Tambahkan Pemeriksaan Sederhana

Jumlah transaksi dapat dihitung dengan `=COUNTA(B4:B80)`. Rata-rata transaksi dapat memakai `=IFERROR(total/jumlah_transaksi,0)` agar file tidak menampilkan kesalahan saat tabel masih kosong. Pastikan nilai yang dijumlahkan adalah angka, bukan teks.

## Contoh

Lima transaksi dapat menghasilkan Makanan Rp520.000, Minuman Rp324.000, dan Lainnya Rp75.000. Ketiga nilai ini harus sama dengan jumlah total transaksi Rp919.000. Jika tidak sama, cek diskon, kategori, dan rentang rumus.

## Kesalahan Umum dan Perbaikan

Nama kategori yang berbeda sedikit, misalnya `Minuman` dan `minuman ` dengan spasi akhir, dapat membuat `SUMIFS` melewatkan data. Nilai `Rp 18.000` yang diketik sebagai teks juga tidak dijumlahkan. Lihat [SUMIFS atau COUNTIFS hasil 0](/masalah-excel/formula/masalah-sumifs-countifs-hasil-nol/) untuk diagnosis bertahap.

## Lanjutkan dengan Template

Gunakan [template laporan penjualan harian](/templates/bisnis-umkm/template-laporan-penjualan-harian-umkm/) bila ingin struktur tabel, dropdown, formula, dan dashboard sudah tersedia. Untuk visualisasi, lanjutkan ke [dashboard sederhana di Excel](/panduan/pengolahan-data/panduan-dashboard-sederhana-excel/).

## Batasan

Rekap ini adalah catatan operasional. Periksa kembali bukti transaksi dan jangan menyamakannya dengan laporan akuntansi atau pajak.
