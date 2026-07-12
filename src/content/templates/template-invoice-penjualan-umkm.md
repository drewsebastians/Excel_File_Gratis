---
title: "Template Invoice Penjualan UMKM Excel Gratis"
meta_title: "Template Invoice Penjualan UMKM Excel Gratis"
meta_description: "Download template invoice penjualan UMKM Excel gratis untuk membuat rincian barang, total tagihan, pembayaran diterima, dan sisa tagihan."
slug: "template-invoice-penjualan-umkm"
focus_keyword: "template invoice penjualan umkm excel"
preview_image: "/assets/templates/template-invoice-penjualan-umkm.png"
preview_alt: "Tampilan sheet Invoice template penjualan UMKM dengan rincian barang dan total tagihan"
featured: false
draft: false
category: "bisnis-umkm"
tags: ["invoice umkm", "invoice excel", "penjualan", "template excel gratis"]
date: "2026-07-12"
updated_date: "2026-07-12"
file_name: "template-invoice-penjualan-umkm.xlsx"
file_size: "9 KB"
suggested_h1: "Template Invoice Penjualan UMKM Excel Gratis"
usage_heading: "Cara Menggunakan Invoice"
ringkasan_singkat: "Template invoice ini membantu UMKM menyiapkan rincian barang atau jasa, menghitung total tagihan, mencatat pembayaran diterima, dan melihat sisa tagihan. Data contoh dapat diganti langsung di sel berwarna biru."
file_spec:
  sheets: 4
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel 2019 atau lebih baru dan Google Sheets"
batasan:
  - "Bukan faktur pajak atau dokumen legal; sesuaikan nomor, identitas usaha, dan ketentuan transaksi sendiri."
  - "Status pembayaran bergantung pada nilai pembayaran diterima yang diisi secara manual."
related_templates: ["template-laporan-penjualan-harian-umkm", "template-arus-kas-umkm", "template-stok-barang-excel-gratis"]
---

Invoice sederhana sering cukup untuk usaha yang ingin mengirim rincian pesanan dengan jelas tanpa membuat format dari nol setiap kali ada transaksi. File ini menyediakan satu invoice siap edit dengan contoh penjualan makanan dan jasa pengiriman.

## Kenapa Memakai Template Ini

Pemilik usaha dapat memisahkan nomor invoice, tanggal, data pelanggan, rincian pesanan, dan nilai pembayaran dalam satu tampilan. Kolom **Total** menghitung jumlah dikali harga satuan, sementara bagian ringkasan menampilkan subtotal, diskon, biaya tambahan, total invoice, pembayaran diterima, dan sisa tagihan.

## Struktur Workbook

- **Cara Pakai** berisi urutan pengisian dan batasan penggunaan.
- **Invoice** adalah halaman utama untuk diisi dan dicetak atau disimpan sebagai salinan.
- **Data Pelanggan** menyediakan daftar pelanggan sederhana sebagai referensi manual.
- **Ringkasan Pembayaran** menarik nomor invoice, total, pembayaran, sisa, dan status dari sheet Invoice.

## Cara Menggunakan Invoice

1. Ganti nomor invoice, tanggal, jatuh tempo, nama pelanggan, dan kontak pada sel biru di sheet **Invoice**.
2. Isi identitas usaha, alamat, dan metode bayar. Metode bayar tersedia sebagai pilihan Tunai, Transfer, atau QRIS.
3. Ganti contoh baris barang atau jasa. Isi jumlah dan harga satuan; kolom Total akan menghitung otomatis.
4. Isi diskon, biaya tambahan, dan pembayaran diterima bila ada.
5. Pastikan sisa tagihan dan status sudah sesuai sebelum mengirim invoice kepada pelanggan.

## Contoh Alur Penggunaan

Sebuah kedai menerima pesanan 3 kopi susu, 12 snack box, dan satu ongkir lokal. Setelah jumlah serta harga satuan diisi, subtotal contoh menjadi Rp335.000. Bila pelanggan baru membayar Rp100.000, ringkasan menunjukkan sisa tagihan Rp235.000 dan status **Belum Lunas**.

## Rumus dan Logika

Setiap baris memakai perkalian sederhana `=Jumlah*Harga Satuan`. Subtotal memakai `SUM`, lalu total invoice dihitung dari subtotal dikurangi diskon ditambah biaya tambahan. Status menggunakan `IF`: status menjadi Lunas hanya ketika sisa tagihan bernilai 0.

Untuk memahami rekap berbasis kriteria pada file penjualan, baca [rumus SUMIFS](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/). Bila sebuah formula perlu menampilkan nilai cadangan tanpa menutupi masalah data, lihat [panduan IFERROR](/rumus-excel/logika/rumus-iferror-template-rapi/).

## Tips Modifikasi

Tambahkan baris rincian bila jumlah barang lebih banyak, lalu salin formula Total dari baris di atas. Untuk pelanggan berulang, isi sheet Data Pelanggan sebagai daftar referensi. Jangan menghapus sel rumus pada kolom Total atau bagian ringkasan.

## Batasan Template

Template ini tidak membuat nomor otomatis, tidak mengirim invoice, dan tidak menghitung pajak. Gunakan sebagai catatan transaksi sederhana, lalu sesuaikan detail yang memang diperlukan oleh usaha Anda.

## Pertanyaan yang Sering Ditanyakan (FAQ)

**Apakah file ini mempunyai macro?**

Tidak. File berformat `.xlsx` tanpa macro.

**Apakah dapat dipakai untuk jasa?**

Bisa. Ganti nama barang dengan nama jasa, lalu isi jumlah dan harga sesuai transaksi.

**Mengapa status masih Belum Lunas?**

Periksa nilai Pembayaran Diterima dan Sisa Tagihan. Status berubah menjadi Lunas hanya jika sisa bernilai 0.

**Apakah ini faktur pajak?**

Bukan. Template ini hanya membantu membuat invoice komersial sederhana.

Lanjutkan dengan [laporan penjualan harian](/templates/bisnis-umkm/template-laporan-penjualan-harian-umkm/) untuk menggabungkan catatan transaksi invoice dalam satu rekap.
