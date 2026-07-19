---
title: "Rumus FILTER untuk Daftar Dinamis di Excel"
formula_name: "FILTER"
meta_title: "Rumus FILTER untuk Daftar Dinamis di Excel"
meta_description: "Pelajari rumus FILTER Excel untuk menampilkan daftar dinamis berdasarkan status, pemilik, atau kategori, lengkap dengan contoh dan batasan versi."
slug: "rumus-filter-daftar-dinamis"
summary: "FILTER mengembalikan baris yang memenuhi kriteria ke area hasil yang dapat berubah otomatis ketika data sumber berubah."
syntax: "=FILTER(array, include, [if_empty])"
category: "lookup-referensi"
difficulty: "menengah"
excel_versions: ["Microsoft 365", "Excel 2021 atau lebih baru", "Google Sheets dengan fungsi FILTER"]
tags: ["filter", "daftar dinamis", "rumus excel", "dashboard"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: true
draft: false
related_templates: ["template-tracker-proyek-sederhana", "template-task-tracker-kanban-excel", "template-jadwal-shift-sederhana"]
related_guides: ["panduan-excel-table-untuk-template", "panduan-file-excel-rapi-untuk-dipakai-rutin"]
related_formulas: ["rumus-if-ifs-status-prioritas", "rumus-countifs-dashboard-status"]
related_troubleshooting: ["masalah-file-excel-berantakan-google-sheets", "masalah-sumifs-countifs-hasil-nol"]
---

FILTER mengembalikan baris atau nilai yang memenuhi kondisi sehingga daftar hasil dapat berubah mengikuti data sumber.

## Sintaks

`=FILTER(array, include, [if_empty])`

## Arti Argumen

- `array` adalah rentang hasil.
- `include` adalah kondisi TRUE/FALSE dengan ukuran yang sesuai.
- `if_empty` adalah nilai yang ditampilkan bila tidak ada hasil.

## Contoh

Jika A2:A5 berisi status dan B2:B5 berisi tugas, `=FILTER(B2:B5,A2:A5="Aktif","Tidak ada tugas")` mengembalikan tugas yang statusnya Aktif.

## Periksa Saat Hasil Tidak Sesuai

Periksa ukuran `array` dan `include`. Formula ini tersedia pada versi Excel yang mendukung dynamic arrays; jangan mengasumsikan perilaku yang sama pada aplikasi lain.

## Rumus dan Panduan Terkait

[task tracker Kanban](/templates/produktivitas-kerja/template-task-tracker-kanban-excel/) dan [XLOOKUP atau VLOOKUP](/rumus-excel/lookup-referensi/rumus-xlookup-vlookup-data/).
