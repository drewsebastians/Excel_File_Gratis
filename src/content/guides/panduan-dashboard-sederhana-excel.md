---
title: "Cara Membuat Dashboard Sederhana di Excel"
meta_title: "Cara Membuat Dashboard Sederhana di Excel"
meta_description: "Panduan membuat dashboard Excel sederhana dari tabel transaksi, KPI total, rekap kategori SUMIFS, dan grafik yang mudah dibaca."
slug: "panduan-dashboard-sederhana-excel"
summary: "Dashboard yang baik mengambil angka dari tabel sumber dan memberi satu jawaban jelas, misalnya total penjualan atau pengeluaran per kategori."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "15 menit"
prerequisites: ["Tabel sumber yang rapi", "Data angka dan kategori yang konsisten"]
excel_versions: ["Microsoft Excel 2019 atau lebih baru", "Google Sheets"]
tags: ["dashboard excel", "sumifs", "grafik excel"]
date: "2026-07-12"
updated_date: "2026-07-12"
featured: true
draft: false
related_templates: ["template-laporan-penjualan-harian-umkm", "template-arus-kas-umkm"]
related_guides: ["panduan-rekap-penjualan-harian-excel", "panduan-memilih-template-excel-umkm"]
related_formulas: ["rumus-sumifs-rekap-kategori", "rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol", "masalah-angka-tidak-terjumlah-format-teks"]
---

## Tujuan Pencarian

Gunakan dashboard untuk membaca data yang sudah dicatat, bukan sebagai tempat memasukkan angka kedua kali. Panduan ini fokus pada total, jumlah transaksi, dan perbandingan kategori.

## 1. Mulai dari Data yang Rapi

Buat tabel sumber dengan header jelas dan satu jenis data per kolom. Contoh laporan penjualan memiliki Kategori dan Total. Contoh arus kas memiliki Jenis Arus, Kategori, dan Nominal. Hindari baris kosong di tengah tabel.

## 2. Buat KPI

Di sheet Dashboard, tampilkan Total Penjualan dengan `=SUM('Data Penjualan'!I4:I80)`. Tambahkan Jumlah Transaksi dengan `=COUNTA('Data Penjualan'!B4:B80)`. Untuk rata-rata, gunakan `=IFERROR(B3/B4,0)` agar dashboard tetap tenang ketika belum ada data.

## 3. Rekap untuk Grafik

Tuliskan kategori pada kolom kecil, lalu pasangkan `SUMIFS` untuk setiap kategori. Karena grafik harus mengambil data dari rekap ini, setiap perubahan transaksi akan ikut memperbarui grafik. Gunakan grafik batang untuk membandingkan kategori dan grafik donat hanya bila bagian terhadap keseluruhan memang penting.

## 4. Periksa Sebelum Dipakai

Bandingkan jumlah semua kategori dengan KPI total. Pastikan label kategori dan format Rupiah dapat dibaca tanpa terpotong. Jangan membuat grafik dari rentang yang mencakup baris header sebagai angka.

## Contoh

Pada [template laporan penjualan harian](/templates/bisnis-umkm/template-laporan-penjualan-harian-umkm/), dashboard memisahkan angka KPI dan grafik kategori. Pada [template arus kas](/templates/bisnis-umkm/template-arus-kas-umkm/), saldo akhir dan grafik pengeluaran menjawab pertanyaan yang berbeda, sehingga keduanya tidak saling menutupi.

## Masalah Umum

Jika grafik kosong, periksa apakah rumus rekap menghasilkan angka. Jika nilainya 0, cek [diagnosis SUMIFS](/masalah-excel/formula/masalah-sumifs-countifs-hasil-nol/). Jika nominal tidak dijumlahkan, cek apakah kolomnya tersimpan sebagai teks melalui [panduan format teks](/masalah-excel/format-data/masalah-angka-tidak-terjumlah-format-teks/).

## Batasan

Dashboard sederhana tidak menggantikan audit data. Ia hanya sebaik tabel sumber dan aturan input yang digunakan.
