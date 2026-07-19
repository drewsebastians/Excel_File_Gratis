---
title: "Rumus XLOOKUP dan VLOOKUP untuk Mencari Data di Excel"
formula_name: "XLOOKUP dan VLOOKUP"
meta_title: "Rumus XLOOKUP dan VLOOKUP untuk Mencari Data di Excel"
meta_description: "Pelajari perbedaan XLOOKUP dan VLOOKUP di Excel, sintaks dasar, contoh pencarian data, hasil tidak ditemukan, dan catatan kompatibilitas."
slug: "rumus-xlookup-vlookup-data"
summary: "XLOOKUP dan VLOOKUP membantu mengambil informasi terkait dari daftar referensi; XLOOKUP lebih fleksibel, sedangkan VLOOKUP lebih luas kompatibilitasnya."
syntax: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found]) atau =VLOOKUP(lookup_value, table_array, col_index_num, FALSE)"
category: "lookup-referensi"
difficulty: "menengah"
excel_versions: ["XLOOKUP: Microsoft 365 atau Excel 2021", "VLOOKUP: Microsoft Excel 2007 atau lebih baru dan Google Sheets"]
tags: ["xlookup", "vlookup", "mencari data excel"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: true
draft: false
related_templates: ["template-pembukuan-pengeluaran-usaha", "template-notulen-rapat-action-item", "template-target-tabungan"]
related_guides: ["panduan-excel-table-untuk-template", "panduan-dropdown-data-validation-excel"]
related_formulas: ["rumus-iferror-template-rapi", "rumus-countifs-dashboard-status"]
related_troubleshooting: ["masalah-vlookup-xlookup-na", "masalah-sumifs-countifs-hasil-nol"]
---

Gunakan XLOOKUP atau VLOOKUP untuk mencari nilai dari tabel referensi, misalnya nama barang dari kode yang dipilih.

## Sintaks

`=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])`

`=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])`

## Arti Argumen

- Nilai yang dicari harus ada pada sumber lookup.
- XLOOKUP memisahkan kolom pencarian dan kolom hasil.
- VLOOKUP mencari dari kolom paling kiri table_array; gunakan `FALSE` untuk exact match.

## Contoh

Contoh `=XLOOKUP(A2,F2:F10,G2:G10,"Tidak ditemukan")` mengambil nilai di G berdasarkan kode di A. Untuk VLOOKUP exact match, gunakan `=VLOOKUP(A2,F2:G10,2,FALSE)`.

## Periksa Saat Hasil Tidak Sesuai

XLOOKUP tidak tersedia pada semua versi Excel. `#N/A` berarti pencarian belum menemukan kecocokan; jangan menutupinya tanpa memeriksa kode dan tabel referensi.

## Rumus dan Panduan Terkait

[dropdown Data Validation](/panduan/dasar-excel/panduan-dropdown-data-validation-excel/) dan [VLOOKUP atau XLOOKUP #N/A](/masalah-excel/formula/masalah-vlookup-xlookup-na/).
