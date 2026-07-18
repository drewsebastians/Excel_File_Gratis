---
title: "Template Budget Bulanan Excel untuk Pemasukan, Pengeluaran, dan Tabungan"
meta_title: "Template Budget Bulanan Excel Gratis | ExcelGratis"
meta_description: "Unduh template budget bulanan Excel untuk mencatat pemasukan dan pengeluaran, menetapkan target per kategori, serta memeriksa sisa uang di dashboard."
slug: "template-budget-bulanan"
focus_keyword: "template budget bulanan"
preview_alt: "Dashboard template budget bulanan Excel dengan ringkasan pemasukan, pengeluaran, sisa uang, dan dua grafik"
category: "keuangan-pribadi"
tags: ["template budget bulanan", "expense tracker", "keuangan pribadi", "tabungan", "excel gratis"]
date: "2026-07-08"
file_name: "template-budget-bulanan.xlsx"
file_size: "21 KB"
suggested_h1: "Template Budget Bulanan Excel untuk Pemasukan, Pengeluaran, dan Tabungan"
preview_heading: "Preview Dashboard Budget Bulanan"
usage_heading: "Cara Menggunakan Template Budget Bulanan"
ringkasan_singkat: "Atur target anggaran dan catat transaksi harian tanpa membuat rumus dari nol. File ini memiliki empat sheet untuk panduan, anggaran, transaksi, dan dashboard. Dashboard merangkum pemasukan, pengeluaran, sisa uang, serta dua grafik berdasarkan data yang kamu masukkan."
file_spec:
  sheets: 4
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel; penggunaan di Google Sheets perlu diuji ulang"
batasan:
  - "Struktur workbook ditujukan untuk satu periode aktif; paket audit tidak menemukan rekap multi-bulan terpisah"
  - "Kategori bawaan perlu disesuaikan bila kebutuhan pencatatanmu lebih spesifik"
  - "Perubahan kategori perlu diuji kembali pada daftar pilihan di sheet Catatan Transaksi"
---

Atur budget bulanan tanpa membuat rumus dari nol. Isi target anggaran di `Anggaran Bulanan`, lalu catat pemasukan dan pengeluaran di `Catatan Transaksi`. `Dashboard Ringkasan` menggunakan rumus untuk merangkum total pemasukan, total pengeluaran, sisa uang, realisasi per kategori, dan dua grafik dari data yang kamu masukkan.

## Isi file template budget bulanan

File `.xlsx` berukuran 21 KB ini memiliki empat sheet dan tidak memakai macro:

- **Cara Pakai** — petunjuk awal sebelum mengisi file.
- **Anggaran Bulanan** — tempat menetapkan target anggaran per kategori.
- **Catatan Transaksi** — tabel untuk tanggal, kategori, keterangan, jenis transaksi, dan jumlah.
- **Dashboard Ringkasan** — rekap pemasukan, pengeluaran, sisa uang, rincian kategori, dan dua grafik.

Audit struktur workbook menemukan dua Excel Table, validasi data, proteksi sheet, 62 formula, dan dua chart. Contoh formula yang terdeteksi mencakup `SUMIFS` untuk menjumlahkan transaksi berdasarkan jenis serta `IF` untuk membaca kondisi selisih pemasukan dan pengeluaran.

## Cara menggunakan template

1. **Atur target.** Buka `Anggaran Bulanan`, lalu ganti target setiap kategori sesuai rencana satu periode.
2. **Catat transaksi.** Isi tanggal, kategori, keterangan, jenis transaksi, dan jumlah pada `Catatan Transaksi`. Gunakan nilai angka pada kolom jumlah.
3. **Periksa ringkasan.** Buka `Dashboard Ringkasan` untuk melihat total pemasukan, pengeluaran, sisa uang, rincian kategori, dan grafik.
4. **Uji perubahan.** Setelah menambah kategori atau baris transaksi, periksa kembali dashboard dan daftar pilihan agar hasilnya tetap sesuai.

## Contoh pencatatan satu bulan

Data berikut hanya ilustrasi:

| Tanggal | Kategori | Keterangan | Jenis | Jumlah |
|---|---|---|---|---:|
| 01/07/2026 | Pemasukan (Gaji/Lainnya) | Gaji Juli | Pemasukan | Rp6.500.000 |
| 02/07/2026 | Tempat Tinggal (Kos/Sewa) | Sewa kos | Pengeluaran | Rp1.200.000 |
| 03/07/2026 | Makanan & Minuman | Belanja bulanan | Pengeluaran | Rp350.000 |
| 06/07/2026 | Tagihan (Listrik/Air/Internet/Pulsa) | Token listrik | Pengeluaran | Rp150.000 |
| 07/07/2026 | Tabungan/Investasi | Setor tabungan | Pengeluaran | Rp600.000 |

Dari ilustrasi tersebut, total pengeluaran adalah Rp2.300.000 dan selisih terhadap pemasukan adalah Rp4.200.000. Gunakan hasil dashboard sebagai alat pengecekan, lalu cocokkan dengan transaksi sumber bila angkanya tidak sesuai.

## Bagian yang dapat kamu sesuaikan

Kamu dapat mengganti target dan kategori agar sesuai dengan kebutuhan pencatatan. Setelah mengubah struktur, lakukan satu transaksi uji dan periksa apakah kategori dapat dipilih serta dashboard membaca baris baru dengan benar.

Untuk memahami cara menyusun rencana dan realisasi, baca [panduan budget pribadi di Excel](/panduan/dasar-excel/panduan-budget-pribadi-sebagai-catatan/). Bila kategori perlu dibuat konsisten, gunakan [panduan dropdown Data Validation](/panduan/dasar-excel/panduan-dropdown-data-validation-excel/).

## Batasan yang perlu diketahui

- Workbook tidak memakai macro.
- Struktur yang diaudit tidak menunjukkan rekap multi-bulan terpisah. Simpan salinan sebelum memulai periode baru agar data lama tidak tertimpa.
- Kategori bawaan bersifat umum dan mungkin perlu disesuaikan.
- Kompatibilitas penuh dengan Google Sheets belum diverifikasi. Impor `.xlsx` dapat mengubah perilaku validasi, proteksi, atau tampilan chart, jadi uji file sebelum menjadikannya versi utama.

## Jika dashboard tidak sesuai

Periksa apakah transaksi dimasukkan pada tabel yang benar, nilai jumlah tersimpan sebagai angka, serta kategori dan jenis transaksi konsisten. Bila nominal tidak ikut terjumlah, lihat [cara memperbaiki angka yang tersimpan sebagai teks](/masalah-excel/format-data/masalah-angka-tidak-terjumlah-format-teks/).

Unduh `template-budget-bulanan.xlsx`, simpan satu salinan cadangan, lalu mulai dari target anggaran dan beberapa transaksi uji.
