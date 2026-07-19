---
title: "Template Invoice Penjualan UMKM Excel untuk Total dan Sisa Tagihan"
meta_title: "Template Invoice Penjualan UMKM Excel Gratis"
meta_description: "Unduh template invoice penjualan UMKM Excel untuk mengisi barang atau jasa, menghitung total, mencatat pembayaran, dan memeriksa sisa tagihan."
slug: "template-invoice-penjualan-umkm"
focus_keyword: "template invoice penjualan umkm excel"
preview_image: "/assets/templates/template-invoice-penjualan-umkm.png"
preview_alt: "Sheet invoice penjualan UMKM dengan identitas pelanggan, rincian barang atau jasa, pembayaran diterima, dan sisa tagihan"
featured: false
draft: false
category: "bisnis-umkm"
tags: ["invoice umkm", "invoice excel", "penjualan", "template excel gratis"]
date: "2026-07-12"
updated_date: "2026-07-12"
file_name: "template-invoice-penjualan-umkm.xlsx"
file_size: "9 KB"
suggested_h1: "Template Invoice Penjualan UMKM Excel untuk Total dan Sisa Tagihan"
usage_heading: "Cara Menggunakan Template Invoice Penjualan"
ringkasan_singkat: "Isi identitas transaksi, rincian barang atau jasa, jumlah, harga, dan pembayaran yang diterima. Formula menghitung total per baris serta status pembayaran berdasarkan sisa tagihan, sementara sheet ringkasan menarik nilai utama dari invoice."
file_spec:
  sheets: 4
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel; penggunaan di Google Sheets perlu diuji ulang"
batasan:
  - "Bukan faktur pajak atau dokumen legal; sesuaikan nomor, identitas usaha, dan ketentuan transaksi sendiri."
  - "Status pembayaran bergantung pada nilai pembayaran diterima yang diisi secara manual."
related_templates: ["template-laporan-penjualan-harian-umkm", "template-arus-kas-umkm", "template-stok-barang-excel-gratis"]
---

Isi identitas pelanggan dan rincian barang atau jasa pada sheet `Invoice`, lalu masukkan pembayaran yang diterima untuk memeriksa sisa tagihan. Template invoice penjualan UMKM Excel ini menghitung nilai per baris dan menampilkan status pembayaran berdasarkan saldo tersisa. Gunakan sebagai invoice komersial sederhana, bukan sebagai faktur pajak atau dokumen legal.

## Isi file template invoice

File `.xlsx` berukuran 9 KB ini memiliki empat sheet dan tidak memakai macro:

- **Cara Pakai** — petunjuk pengisian.
- **Invoice** — halaman utama untuk identitas transaksi, rincian barang atau jasa, dan pembayaran.
- **Data Pelanggan** — daftar pelanggan sederhana sebagai referensi.
- **Ringkasan Pembayaran** — nilai utama invoice, pembayaran, sisa tagihan, dan status.

Audit workbook menemukan dua Excel Table, data validation, dan 13 formula. Tidak ditemukan chart, PivotTable, named range, atau proteksi sheet.

## Cara menggunakan template

1. **Ganti identitas transaksi.** Isi nomor invoice, tanggal, jatuh tempo, pelanggan, dan informasi usaha.
2. **Masukkan rincian penjualan.** Isi nama barang atau jasa, jumlah, dan harga satuan.
3. **Periksa total per baris.** Formula mengalikan jumlah dengan harga pada setiap baris rincian.
4. **Isi pembayaran yang diterima.** Masukkan nilai pembayaran setelah memeriksa total invoice.
5. **Cek sisa dan status.** Pastikan status sesuai sebelum menyimpan, mencetak, atau mengirim salinan invoice.

Checkpoint: status hanya menjadi `Lunas` ketika sisa tagihan bernilai 0.

## Contoh invoice sederhana

Data berikut hanya ilustrasi:

| Rincian | Jumlah | Harga Satuan | Total |
|---|---:|---:|---:|
| Paket snack | 10 | Rp25.000 | Rp250.000 |
| Ongkir lokal | 1 | Rp35.000 | Rp35.000 |

Total ilustrasi adalah Rp285.000. Bila pembayaran yang diterima Rp100.000, sisa tagihan menjadi Rp185.000 dan status tetap `Belum Lunas`. Setelah pembayaran mencapai total invoice, sisa menjadi 0 dan status berubah menjadi `Lunas`.

## Bagaimana formula bekerja

Baris rincian memakai perkalian jumlah dan harga satuan. Formula `IF` yang terdeteksi membaca sisa tagihan: nilai 0 menghasilkan `Lunas`, sedangkan nilai selain 0 menghasilkan `Belum Lunas`. `Ringkasan Pembayaran` mengambil nomor invoice, total, pembayaran, sisa, dan status dari sheet utama.

Setelah transaksi selesai, pindahkan nilainya ke [template laporan penjualan harian](/templates/bisnis-umkm/template-laporan-penjualan-harian-umkm/) untuk rekap penjualan. Pembayaran yang benar-benar diterima dapat dicatat pada [template arus kas UMKM](/templates/bisnis-umkm/template-arus-kas-umkm/).

## Batasan yang perlu diketahui

Template tidak menggantikan faktur pajak, kontrak, atau dokumen legal. Nomor invoice, ketentuan pembayaran, pajak, identitas usaha, dan bukti penerimaan tetap perlu disesuaikan serta diperiksa sendiri. Status pembayaran juga bergantung pada nilai pembayaran yang dimasukkan pengguna.

Kompatibilitas penuh dengan Google Sheets belum diverifikasi. Uji formula, data validation, format cetak, dan tampilan setelah mengimpor file.

Unduh `template-invoice-penjualan-umkm.xlsx`, buat satu invoice uji, lalu cocokkan total dan sisa tagihan sebelum memakai formatnya untuk pelanggan.
