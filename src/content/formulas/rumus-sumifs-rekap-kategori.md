---
title: "Rumus SUMIFS untuk Rekap Kategori di Excel"
formula_name: "SUMIFS"
meta_title: "Rumus SUMIFS untuk Rekap Kategori di Excel"
meta_description: "Pelajari rumus SUMIFS Excel untuk menjumlahkan nilai berdasarkan kategori, tanggal, atau lebih dari satu kriteria dengan contoh praktis."
slug: "rumus-sumifs-rekap-kategori"
summary: "SUMIFS menjumlahkan angka yang memenuhi satu atau beberapa kriteria, misalnya total penjualan untuk satu kategori pada satu bulan."
syntax: "=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)"
category: "matematika"
difficulty: "menengah"
excel_versions: ["Microsoft Excel 2007 atau lebih baru", "Google Sheets"]
tags: ["sumifs", "rekap kategori", "rumus excel"]
date: "2026-07-12"
updated_date: "2026-07-12"
featured: true
draft: false
related_templates: ["template-laporan-penjualan-harian-umkm", "template-arus-kas-umkm", "template-tracker-cicilan-hutang"]
related_guides: ["panduan-rekap-penjualan-harian-excel", "panduan-dashboard-sederhana-excel"]
related_formulas: ["rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol", "masalah-angka-tidak-terjumlah-format-teks"]
---

## Tujuan

`SUMIFS` dipakai ketika Anda ingin menjumlahkan angka yang memenuhi syarat. Berbeda dari `SUMIF`, fungsi ini mendukung lebih dari satu pasangan rentang-kriteria.

## Sintaks dan Argumen

`sum_range` adalah kolom angka yang dijumlahkan. `criteria_range1` adalah kolom yang diuji, lalu `criteria1` adalah nilai atau kondisi yang dicari. Semua rentang harus mempunyai ukuran yang sama.

## Contoh 1: Total per Kategori

`=SUMIFS($I$4:$I$80,$D$4:$D$80,A10)` menjumlahkan Total di I4:I80 bila Kategori di D4:D80 sama dengan teks pada A10. Pola ini dipakai oleh [laporan penjualan harian](/templates/bisnis-umkm/template-laporan-penjualan-harian-umkm/).

## Contoh 2: Uang Keluar per Bulan

`=SUMIFS($F$4:$F$120,$B$4:$B$120,"Keluar",$G$4:$G$120,"2026-07")` menjumlahkan Nominal hanya untuk arus Keluar pada Juli 2026.

## Contoh 3: Pembayaran per ID

`=SUMIFS($D$4:$D$80,$B$4:$B$80,A4)` menjumlahkan pembayaran pada Catatan Pembayaran yang ID-nya sama dengan A4. Pola ini dipakai pada [tracker cicilan](/templates/keuangan-pribadi/template-tracker-cicilan-hutang/).

## Tepi Kasus dan Kesalahan Umum

SUMIFS mengembalikan 0 jika tidak ada baris yang cocok. Ini bukan selalu kesalahan. Namun, periksa ejaan kategori, spasi tambahan, ukuran rentang, dan apakah angka tersimpan sebagai teks. Untuk kriteria tanggal, gunakan nilai tanggal Excel yang valid atau kolom bantu bulan yang konsisten.

## Kompatibilitas dan Alternatif

SUMIFS tersedia di Excel modern serta Google Sheets. Jika hanya ada satu kriteria, `SUMIF` lebih ringkas. Untuk penyaringan daftar, bukan penjumlahan, pertimbangkan `FILTER` pada Excel yang mendukungnya.

## Sumber Resmi

Microsoft menjelaskan sintaks dan batasan `SUMIFS` di dokumentasi [SUMIFS function](https://support.microsoft.com/en-us/excel/functions/sumifs-function).
