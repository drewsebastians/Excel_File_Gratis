---
title: "Dropdown Data Validation Tidak Muncul di Excel"
meta_title: "Dropdown Data Validation Tidak Muncul di Excel"
meta_description: "Cara mengatasi dropdown Data Validation Excel tidak muncul: cek sel, sumber daftar, proteksi sheet, tabel, copy-paste, dan perbedaan aplikasi."
slug: "masalah-dropdown-data-validation-tidak-muncul"
summary: "Dropdown dapat hilang karena sel tidak memiliki aturan list, sumber daftar berubah, sheet terlindungi, atau data ditempelkan sehingga aturan validasinya tergantikan."
category: "format-data"
symptoms: ["Panah dropdown tidak terlihat pada sel", "Kategori atau status bisa diketik bebas", "Dropdown hanya hilang pada sebagian baris"]
excel_versions: ["Microsoft Excel 2019 atau lebih baru", "Microsoft Excel web dengan beberapa batasan", "Google Sheets dengan pengaturan validasi berbeda"]
tags: ["data validation", "dropdown excel", "validasi data"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: true
draft: false
related_templates: ["template-jadwal-shift-sederhana", "template-tracker-proyek-sederhana", "template-pengeluaran-harian"]
related_guides: ["panduan-dropdown-data-validation-excel", "panduan-file-excel-rapi-untuk-dipakai-rutin"]
related_formulas: ["rumus-if-ifs-status-prioritas", "rumus-countifs-dashboard-status"]
related_troubleshooting: ["masalah-file-excel-berantakan-google-sheets", "masalah-sumifs-countifs-hasil-nol"]
---

## Gejala

Sel status, kategori, atau nama anggota tidak lagi menampilkan pilihan. Kadang nilai tetap bisa diketik, tetapi tulisan yang berbeda membuat rekap tidak konsisten.

## Langkah Diagnosis

1. Klik sel yang seharusnya memiliki dropdown, lalu buka **Data > Data Validation**.
2. Pastikan bagian Allow atau Izinkan masih memakai **List** dan sumber daftar tidak kosong.
3. Bandingkan dengan satu sel lain yang dropdown-nya masih berfungsi.
4. Periksa apakah sheet terlindungi atau file dibagikan dengan pembatasan perubahan.
5. Cek apakah sel pernah ditimpa lewat paste dari file lain.

## Penyebab dan Solusi

Jika hanya baris baru yang tidak memiliki dropdown, salin validasi dari baris sebelumnya atau perluas aturan ke rentang input yang benar. Jika sumbernya menunjuk ke daftar yang dipindah atau dihapus, pilih ulang rentangnya. Jika sheet diproteksi, buka proteksi sesuai hak akses sebelum mengubah aturan.

Data Validation dapat berbeda saat file dibuka di aplikasi lain. Buka file di Excel desktop untuk memeriksa aturan asli, lalu simpan salinan sebelum mencoba perubahan besar. Jangan menghapus validasi hanya supaya input bisa masuk; itu dapat membuat kategori dan status tidak seragam.

## Pencegahan

Simpan daftar pilihan di sheet **Referensi**, gunakan Table untuk data utama, dan hindari paste seluruh sel bila yang diperlukan hanya nilainya. Saat menambah status baru, perbarui daftar referensi serta formula rekap yang menggunakan nama status tersebut.

## Sumber Resmi

Microsoft menjelaskan cara menerapkan dan memeriksa validasi pada [Data Validation](https://support.microsoft.com/en-us/excel/get-started/apply-data-validation-to-cells). Gunakan kembali [panduan dropdown](/panduan/dasar-excel/panduan-dropdown-data-validation-excel/) setelah aturan berhasil ditemukan.
