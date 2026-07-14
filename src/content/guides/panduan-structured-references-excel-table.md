---
title: "Structured References Excel: Membaca Rumus di Dalam Table"
meta_title: "Structured References Excel: Membaca Rumus di Dalam Table"
meta_description: "Membuat rumus penjualan yang memakai nama kolom Table agar lebih mudah dibaca dan tetap mengikuti pertambahan baris."
slug: "panduan-structured-references-excel-table"
summary: "Membuat rumus penjualan yang memakai nama kolom Table agar lebih mudah dibaca dan tetap mengikuti pertambahan baris."
category: "dasar-excel"
difficulty: "pemula"
estimated_time: "14 menit"
prerequisites: ["Satu Excel Table bernama `tblPesanan`","Kolom Produk, Qty, Harga, dan Total"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021","Microsoft Excel 2019"]
tags: ["structured reference","excel table","rumus excel"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: false
related_templates: ["template-laporan-penjualan-harian-umkm","template-stok-barang-excel-gratis"]
related_guides: ["panduan-excel-table-vs-range","panduan-excel-table-untuk-template"]
related_formulas: ["rumus-sumifs-rekap-kategori"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol"]
---

## Masalah yang Diselesaikan

Rumus seperti `=C2*D2` sulit dibaca ketika kolom bergeser dan sering perlu disalin ulang.

## Hasil yang Diharapkan

Kolom Total memakai nama kolom Table dan tetap mengisi baris baru secara konsisten.

## Prasyarat

- Satu Excel Table bernama `tblPesanan`
- Kolom Produk, Qty, Harga, dan Total

## Contoh Input

```text
Produk | Qty | Harga
Buku | 2 | 45000
Pulpen | 5 | 6000
```

## Langkah Praktik

1. Ubah data menjadi Table dan beri nama `tblPesanan`.
2. Tambahkan kolom Total, lalu ketik `=[@Qty]*[@Harga]` pada baris pertama.
3. Tambahkan baris baru dan pastikan formula kolom terisi otomatis.
4. Di luar Table, gunakan `=SUM(tblPesanan[Total])` untuk total seluruh pesanan.

## Mengapa Ini Bekerja

`[@Qty]` berarti nilai Qty pada baris aktif, sedangkan `tblPesanan[Total]` berarti seluruh kolom Total. Excel menjaga referensi itu saat baris Table bertambah.

## Kesalahan Umum

- Nama header berubah sehingga structured reference ikut berubah.
- Formula dimasukkan di luar Table sehingga tidak menjadi calculated column.

## Diagnosis

Klik formula dan amati highlight kolom Table. Periksa Table Name dan header tanpa spasi ganda.

## Cara Memperbaiki

Perbaiki header, masukkan formula pada kolom Table, dan gunakan Insert Field bila sulit mengetik nama kolom.

## Kompatibilitas dan Alternatif Versi Lama

Structured reference tersedia pada Excel Table di Excel 2007 ke atas. Google Sheets mengimpor nilai, tetapi tidak selalu mempertahankan perilaku calculated column.

Alternatif untuk Excel lama: Gunakan range biasa dengan referensi absolut seperti `=$C2*$D2`, lalu salin ke bawah.

## Batasan

Structured reference tidak menggantikan pemeriksaan tipe angka, duplikat ID, atau aturan bisnis.

## Langkah Praktis Berikutnya

Ganti satu rumus koordinat pada Table kerja kamu dengan structured reference dan bandingkan hasilnya.

## Related Resources

- Template: [Laporan Penjualan Harian](/templates/bisnis-umkm/template-laporan-penjualan-harian-umkm/), [Stok Barang](/templates/bisnis-umkm/template-stok-barang-excel-gratis/)
- Panduan: [Excel Table vs Range Biasa](/panduan/dasar-excel/panduan-excel-table-vs-range/), [Excel Table untuk Template](/panduan/pengolahan-data/panduan-excel-table-untuk-template/)
- Rumus: [SUMIFS untuk Rekap Kategori](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/)
- Troubleshooting: [SUMIFS atau COUNTIFS Menghasilkan Nol](/masalah-excel/formula/masalah-sumifs-countifs-hasil-nol/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
