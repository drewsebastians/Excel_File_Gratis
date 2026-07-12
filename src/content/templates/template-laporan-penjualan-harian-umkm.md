---
title: "Template Laporan Penjualan Harian UMKM Excel Gratis"
meta_title: "Template Laporan Penjualan Harian UMKM Excel Gratis"
meta_description: "Download template laporan penjualan harian UMKM Excel gratis dengan tabel transaksi, total otomatis, rekap kategori, dan grafik dashboard."
slug: "template-laporan-penjualan-harian-umkm"
focus_keyword: "template laporan penjualan harian umkm"
preview_image: "/assets/templates/template-laporan-penjualan-harian-umkm.png"
preview_alt: "Dashboard laporan penjualan harian UMKM dengan total penjualan dan grafik kategori"
featured: true
draft: false
category: "bisnis-umkm"
tags: ["laporan penjualan", "penjualan harian", "umkm", "dashboard excel"]
date: "2026-07-12"
updated_date: "2026-07-12"
file_name: "template-laporan-penjualan-harian-umkm.xlsx"
file_size: "10 KB"
suggested_h1: "Template Laporan Penjualan Harian UMKM Excel Gratis"
usage_heading: "Cara Mengisi Laporan Penjualan"
ringkasan_singkat: "Catat satu transaksi per baris, lalu gunakan dashboard untuk melihat total penjualan, jumlah transaksi, rata-rata per transaksi, tanggal data terakhir, dan penjualan per kategori."
file_spec:
  sheets: 4
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel 2019 atau lebih baru dan Google Sheets"
batasan:
  - "Rekap hanya akurat bila setiap transaksi dicatat satu per satu."
  - "Dashboard disiapkan untuk kategori contoh Makanan, Minuman, dan Lainnya."
related_templates: ["template-invoice-penjualan-umkm", "template-arus-kas-umkm", "template-stok-barang-excel-gratis"]
---

Template laporan penjualan harian ini cocok untuk UMKM yang membutuhkan catatan transaksi ringkas sebelum melihat pola penjualan. Setiap baris mencatat tanggal, nomor invoice, produk atau jasa, kategori, metode pembayaran, jumlah, harga satuan, diskon, dan total.

## Fitur Utama

- Tabel transaksi dengan filter bawaan Excel.
- Dropdown kategori dan metode pembayaran agar penulisan konsisten.
- Total per transaksi dengan rumus jumlah x harga satuan - diskon.
- Dashboard total penjualan, jumlah transaksi, rata-rata transaksi, dan tanggal data terakhir.
- Rekap kategori menggunakan `SUMIFS` serta grafik batang dari data yang sama.

## Struktur Workbook

**Cara Pakai** menjelaskan alur input. **Data Penjualan** adalah tabel transaksi utama. **Dashboard** merangkum data contoh secara otomatis. **Referensi** menyimpan daftar kategori dan metode pembayaran yang dipakai pada contoh.

## Cara Mengisi Laporan Penjualan

1. Buka sheet **Data Penjualan** dan tambah satu baris untuk setiap transaksi.
2. Isi tanggal, nomor invoice, produk atau jasa, lalu pilih kategori dan metode bayar dari dropdown.
3. Isi jumlah, harga satuan, dan diskon jika ada. Kolom Total dihitung otomatis.
4. Buka **Dashboard** untuk memeriksa total dan rekap kategori.
5. Bila kategori bisnis berubah, sesuaikan dropdown dan baris rekap agar namanya sama persis.

## Contoh Alur Penggunaan

Contoh file berisi lima transaksi. Total penjualan contoh adalah Rp919.000: kategori Makanan Rp520.000, Minuman Rp324.000, dan Lainnya Rp75.000. Angka itu berasal langsung dari tabel transaksi, bukan dari nilai yang diketik ulang di dashboard.

## Rumus dan Logika

Kolom Total memakai `=Jumlah*Harga Satuan-Diskon`. Rekap kategori memakai pola `SUMIFS(total_range, kategori_range, nama_kategori)`. Dashboard rata-rata memakai `IFERROR` agar tidak menampilkan kesalahan ketika belum ada transaksi.

Pelajari langkahnya pada [cara membuat rekap penjualan harian](/panduan/pengolahan-data/panduan-rekap-penjualan-harian-excel/) dan [cara membuat dashboard sederhana](/panduan/pengolahan-data/panduan-dashboard-sederhana-excel/). Jika rekap bernilai nol, cek [penyebab SUMIFS atau COUNTIFS hasil 0](/masalah-excel/formula/masalah-sumifs-countifs-hasil-nol/).

## Tips Modifikasi

Jangan mengganti nama kategori di dashboard tanpa memperbarui nama di tabel transaksi. Jika ingin menambah kategori, salin baris rekap di Dashboard dan sesuaikan kriterianya. Untuk membuat dokumen transaksi per pelanggan, gunakan [template invoice UMKM](/templates/bisnis-umkm/template-invoice-penjualan-umkm/).

## Batasan Template

Template ini tidak menggantikan pembukuan atau laporan pajak. Grafik hanya menampilkan tiga kategori contoh dan tidak otomatis membuat kategori baru saat Anda mengetik nama kategori tambahan.

## Pertanyaan yang Sering Ditanyakan (FAQ)

**Apakah total dihitung otomatis?**

Ya. Nilai Total per baris menghitung jumlah dikali harga satuan, kemudian mengurangi diskon.

**Apakah bisa mencatat jasa?**

Bisa. Kolom Produk/Jasa dapat berisi nama layanan.

**Mengapa rekap kategori 0?**

Nama kategori pada transaksi harus sama dengan kriteria di Dashboard dan nilai Total harus berupa angka.

**Apakah grafik bisa dihapus?**

Bisa, tetapi menghapus grafik tidak memengaruhi tabel atau rumus rekap.
