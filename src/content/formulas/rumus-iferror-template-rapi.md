---
title: "Rumus IFERROR untuk Template Excel yang Lebih Rapi"
formula_name: "IFERROR"
meta_title: "Rumus IFERROR untuk Template Excel yang Lebih Rapi"
meta_description: "Pelajari IFERROR di Excel untuk menangani kesalahan formula dengan aman, termasuk contoh pembagian, lookup, dan kapan tidak boleh menyembunyikan error."
slug: "rumus-iferror-template-rapi"
summary: "IFERROR menampilkan nilai pengganti ketika sebuah formula menghasilkan kesalahan, tetapi tidak seharusnya dipakai untuk menyembunyikan masalah data."
syntax: "=IFERROR(value, value_if_error)"
category: "logika"
difficulty: "pemula"
excel_versions: ["Microsoft Excel 2007 atau lebih baru", "Google Sheets"]
tags: ["iferror", "rumus excel", "menangani error"]
date: "2026-07-12"
updated_date: "2026-07-12"
featured: false
draft: false
related_templates: ["template-laporan-penjualan-harian-umkm", "template-tracker-cicilan-hutang", "template-invoice-penjualan-umkm"]
related_guides: ["panduan-rekap-penjualan-harian-excel", "panduan-dashboard-sederhana-excel"]
related_formulas: ["rumus-sumifs-rekap-kategori"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol"]
---

IFERROR mengganti hasil error dengan nilai alternatif setelah Excel mengevaluasi formula pertama.

## Sintaks

`=IFERROR(value, value_if_error)`

## Arti Argumen

- `value` adalah formula yang diuji.
- `value_if_error` adalah hasil yang ditampilkan bila formula menghasilkan error.

## Contoh

Contoh `=IFERROR(A2/B2,0)` menampilkan 0 bila pembagian menghasilkan error. Gunakan hanya bila 0 memang berarti hasil yang dapat dibaca.

## Periksa Saat Hasil Tidak Sesuai

Jangan memakai IFERROR untuk menyembunyikan masalah sumber data. Periksa penyebab `#N/A`, `#REF!`, atau pembagi nol sebelum memilih hasil pengganti.

## Rumus dan Panduan Terkait

[audit rumus Excel](/panduan/pengolahan-data/panduan-audit-rumus-excel/) dan [VLOOKUP atau XLOOKUP #N/A](/masalah-excel/formula/masalah-vlookup-xlookup-na/).
