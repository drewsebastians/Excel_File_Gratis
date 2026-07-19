---
title: "Tanggal Salah Format atau Tidak Terbaca di Excel"
meta_title: "Tanggal Salah Format atau Tidak Terbaca di Excel"
meta_description: "Cara mengatasi tanggal Excel yang salah format, terbaca sebagai teks, tertukar hari dan bulan, atau tidak masuk rekap tanggal."
slug: "masalah-tanggal-salah-format-excel"
summary: "Tanggal yang terlihat benar belum tentu berupa nilai tanggal Excel; periksa tipe datanya sebelum memperbaiki tampilan atau rumus rekap."
category: "format-data"
symptoms: ["Tanggal tidak ikut SUMIFS", "Tanggal berubah menjadi teks", "Hari dan bulan tertukar", "Tanggal tidak dapat diurutkan"]
excel_versions: ["Microsoft Excel 2019 atau lebih baru", "Google Sheets"]
tags: ["format tanggal excel", "tanggal teks", "sumifs tanggal"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: true
draft: false
related_templates: ["template-pembukuan-pengeluaran-usaha", "template-target-tabungan", "template-notulen-rapat-action-item"]
related_guides: ["panduan-excel-table-untuk-template", "panduan-budget-pribadi-sebagai-catatan"]
related_formulas: ["rumus-countifs-dashboard-status", "rumus-sumifs-rekap-kategori"]
related_troubleshooting: ["masalah-angka-tidak-terjumlah-format-teks", "masalah-sumifs-countifs-hasil-nol"]
---

Periksa apakah Excel membaca nilai sebagai tanggal serial atau teks ketika tanggal sulit diurutkan, difilter, atau direkap per bulan.

## Coba Ini Terlebih Dahulu

1. Klik sel dan lihat formula bar untuk membandingkan nilai yang tersimpan.
2. Uji satu sel dengan format Date yang sesuai.
3. Pisahkan atau konversi teks tanggal pada salinan data bila sumbernya tidak konsisten.
4. Urutkan data dan uji rekap periode setelah konversi.

## Penyebab yang Paling Sering

Format tampilan hanya mengubah cara nilai terlihat. Jika tanggal tersimpan sebagai teks, fungsi tanggal dan kriteria periode mungkin tidak membacanya seperti tanggal Excel.

## Sebelum Mengubah Data

Buat salinan data terlebih dahulu, terutama bila format tanggal mengikuti lokal yang tidak jelas.

## Bantuan Terkait

[template pengeluaran harian](/templates/keuangan-pribadi/template-pengeluaran-harian/) dan [SUMIFS untuk rekap](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/).
