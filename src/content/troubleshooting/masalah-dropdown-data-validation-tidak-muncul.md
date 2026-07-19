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

Periksa rule Data Validation, rentang sumber, dan sel tujuan ketika panah dropdown tidak terlihat atau pilihannya kosong.

## Coba Ini Terlebih Dahulu

1. Pilih sel masalah lalu buka **Data > Data Validation**.
2. Pastikan tipe rule adalah **List** dan opsi dropdown tidak disembunyikan.
3. Periksa Source agar menunjuk daftar nilai, bukan header atau sel kosong yang tidak diinginkan.
4. Uji pada satu sel baru dan pastikan rule diterapkan pada rentang input yang benar.

## Penyebab yang Paling Sering

Dropdown bergantung pada rule sel dan sumber daftar. Nama range atau referensi Table yang salah dapat membuat daftar tidak tampil.

## Sebelum Mengubah Data

Jangan menghapus daftar referensi sebelum mengganti Source. Uji lagi bila file dipindahkan ke Google Sheets.

## Bantuan Terkait

[membuat dropdown Data Validation](/panduan/dasar-excel/panduan-dropdown-data-validation-excel/) dan [dropdown dinamis](/panduan/pengolahan-data/panduan-dropdown-dinamis-excel/).
