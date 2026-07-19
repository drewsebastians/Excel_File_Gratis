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

SUMIFS menjumlahkan nilai yang memenuhi beberapa kriteria, misalnya kategori dan bulan pada tabel transaksi.

## Sintaks

`=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)`

## Arti Argumen

- `sum_range` adalah angka yang dijumlahkan.
- Setiap `criteria_range` harus seukuran dengan sum_range.
- Setiap `criteria` menentukan nilai, teks, atau kondisi yang dicari.

## Contoh

Jika kolom C berisi kategori dan D berisi nominal, `=SUMIFS(D2:D10,C2:C10,"Transportasi")` menjumlahkan nominal Transportasi.

## Periksa Saat Hasil Tidak Sesuai

Hasil nol sering muncul karena teks kriteria berbeda, tanggal tidak berada pada periode yang diharapkan, atau angka tersimpan sebagai teks.

## Rumus dan Panduan Terkait

[rekap penjualan harian](/panduan/pengolahan-data/panduan-rekap-penjualan-harian-excel/) dan [SUMIFS atau COUNTIFS bernilai nol](/masalah-excel/formula/masalah-sumifs-countifs-hasil-nol/).
