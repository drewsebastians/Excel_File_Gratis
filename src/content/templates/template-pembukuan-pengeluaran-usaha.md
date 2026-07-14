---
title: "Template Pembukuan Pengeluaran Usaha Excel Gratis"
meta_title: "Template Pembukuan Pengeluaran Usaha Excel Gratis"
meta_description: "Download template pembukuan pengeluaran usaha Excel gratis untuk mencatat vendor, kategori, metode bayar, bukti transaksi, dan rekap bulanan."
slug: "template-pembukuan-pengeluaran-usaha"
focus_keyword: "template pembukuan pengeluaran usaha excel"
preview_image: "/assets/templates/template-pembukuan-pengeluaran-usaha.png"
preview_alt: "Dashboard pengeluaran usaha dengan total bulanan dan grafik kategori"
featured: true
draft: false
category: "bisnis-umkm"
tags: ["pengeluaran usaha", "pembukuan umkm", "rekap biaya", "template excel gratis"]
date: "2026-07-14"
updated_date: "2026-07-14"
file_name: "template-pembukuan-pengeluaran-usaha.xlsx"
file_size: "13 KB"
suggested_h1: "Template Pembukuan Pengeluaran Usaha Excel Gratis"
usage_heading: "Cara Pakai Pembukuan Pengeluaran"
ringkasan_singkat: "Catat setiap pengeluaran usaha dalam satu tabel, lalu lihat total bulan aktif dan kategori biaya terbesar tanpa menjumlahkan ulang secara manual."
file_spec:
  sheets: 5
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel 2019 atau lebih baru dan Google Sheets"
batasan:
  - "Template ini adalah catatan operasional sederhana, bukan laporan akuntansi atau laporan pajak."
  - "Nilai rekap bergantung pada tanggal, kategori, dan nominal yang dicatat dengan benar."
related_templates: ["template-arus-kas-umkm", "template-laporan-penjualan-harian-umkm", "template-invoice-penjualan-umkm"]
---

Gunakan template ini ketika usaha perlu melihat ke mana uang keluar, siapa penerimanya, dan bukti apa yang menyertainya. Satu baris mewakili satu pengeluaran. Dengan pola itu, rekap bulan dan grafik kategori mengambil angka dari catatan yang sama.

## Isi dan Fitur Workbook

- **Cara Pakai** berisi urutan pencatatan dan batasan penggunaan.
- **Data Pengeluaran** mencatat tanggal, nomor bukti, vendor, kategori, metode, nominal, status, serta lampiran atau referensi.
- **Kategori Pengeluaran** menyediakan daftar yang dapat disesuaikan untuk kategori, metode pembayaran, dan status.
- **Rekap Bulanan** menghitung total serta jumlah bukti untuk bulan yang dipilih menggunakan `SUMIFS` dan `COUNTIFS`.
- **Dashboard** menampilkan total pengeluaran, jumlah bukti, kategori terbesar, dan grafik batang.

## Cara Pakai Pembukuan Pengeluaran

1. Sesuaikan daftar di **Kategori Pengeluaran** bila kategori contoh belum cocok.
2. Isi tanggal dan nomor bukti pada **Data Pengeluaran**. Nomor bukti dapat berupa nomor struk, invoice vendor, atau kode internal.
3. Pilih kategori, metode pembayaran, dan status dari dropdown.
4. Masukkan nominal sebagai angka positif. Pengeluaran sudah dibedakan oleh konteks tabel, sehingga tidak perlu memakai angka minus.
5. Buka **Rekap Bulanan** dan ubah nilai Bulan bila ingin membaca periode lain.

## Rumus dan Logika

Kolom Bulan dibuat dari tanggal transaksi dengan `TEXT(tanggal,"yyyy-mm")`. Rekap memakai `SUMIFS` agar hanya nominal dengan bulan serta kategori yang sesuai yang dijumlahkan. Dashboard mengambil angka dari rekap, jadi tidak ada total kedua yang perlu diketik.

Untuk memahami pola tersebut, baca [rumus SUMIFS untuk rekap kategori](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/) dan [cara membuat dashboard sederhana](/panduan/pengolahan-data/panduan-dashboard-sederhana-excel/). Bila rekap masih 0, lihat [diagnosis SUMIFS atau COUNTIFS](/masalah-excel/formula/masalah-sumifs-countifs-hasil-nol/).

## Contoh Alur Penggunaan

Pada data contoh Juli 2026, belanja bahan, kemasan, promosi, pulsa, dan antar bahan tercatat sebagai lima bukti pengeluaran. Totalnya Rp315.000. Karena setiap baris memiliki kategori yang konsisten, dashboard dapat menunjukkan bahwa Bahan Baku adalah kategori terbesar pada periode contoh.

## Batasan Template

File ini tidak menilai apakah suatu biaya dapat dikurangkan dari pajak, tidak menghitung laba, dan tidak menggantikan bukti transaksi asli. Periksa kembali data sumber secara berkala, terutama ketika vendor atau metode pembayaran baru ditambahkan.

## FAQ

**Apakah saya harus menyimpan file foto struk di workbook?**

Tidak. Gunakan kolom Lampiran/Referensi untuk menulis lokasi, nama file, atau nomor bukti yang memudahkan penelusuran.

**Mengapa kategori terbesar tidak berubah?**

Pastikan kolom Bulan di Rekap Bulanan sesuai dengan tanggal transaksi yang ingin dilihat.

**Apakah bisa dipakai untuk lebih dari satu usaha?**

Bisa, tetapi sebaiknya gunakan file terpisah atau tambahkan kolom usaha secara konsisten agar rekap tidak tercampur.

