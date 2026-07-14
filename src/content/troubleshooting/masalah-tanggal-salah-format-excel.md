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

## Gejala

Tanggal tidak bisa diurutkan, formula rekap per bulan tidak menemukan transaksi, atau Excel menampilkan teks yang tampak seperti tanggal. Masalahnya sering berada pada tipe data, bukan hanya format tampilan.

## Periksa Nilai Tanggal

Pilih sel tanggal dan ubah formatnya sementara ke General. Tanggal Excel yang valid biasanya menjadi angka serial. Anda juga dapat memakai `=ISNUMBER(A2)`: hasil TRUE menandakan nilai tersebut dapat dipakai langsung oleh rumus tanggal.

## Hari dan Bulan Tertukar

Masukan seperti `03/07/2026` dapat dibaca berbeda tergantung pengaturan regional. Untuk input yang konsisten, gunakan format tampilan `yyyy-mm-dd`, misalnya `2026-07-03`. Format ini membuat urutan tahun, bulan, dan hari lebih jelas.

## Mengubah Tanggal Teks

Jika data berasal dari salinan sistem lain, gunakan **Data > Text to Columns** dengan pengaturan tanggal yang sesuai, atau buat kolom bantu dengan fungsi tanggal yang cocok dengan pola sumber. Selalu uji beberapa contoh sebelum mengganti seluruh kolom.

## Dampak pada Rekap

`SUMIFS` dan `COUNTIFS` tidak dapat membandingkan tanggal teks seperti tanggal asli. Template pengeluaran membuat kolom Bulan dari tanggal valid, sehingga rekap bulanan perlu tanggal yang benar sejak awal. Setelah memperbaiki data, periksa ulang [SUMIFS atau COUNTIFS hasil 0](/masalah-excel/formula/masalah-sumifs-countifs-hasil-nol/).

