---
title: "Rumus IF dan IFS untuk Status serta Prioritas di Excel"
formula_name: "IF dan IFS"
meta_title: "Rumus IF dan IFS untuk Status serta Prioritas di Excel"
meta_description: "Pelajari IF dan IFS Excel untuk membuat label status atau prioritas berdasarkan tanggal, progress, dan kondisi data dengan contoh yang mudah diperiksa."
slug: "rumus-if-ifs-status-prioritas"
summary: "IF memilih satu dari dua hasil, sedangkan IFS membantu membaca beberapa kondisi berurutan untuk label status atau prioritas."
syntax: "=IF(logical_test, value_if_true, value_if_false) | =IFS(logical_test1, value_if_true1, ...)"
category: "logika"
difficulty: "pemula"
excel_versions: ["IF: Microsoft Excel 2007 atau lebih baru", "IFS: Microsoft 365, Excel 2021, atau Excel 2019", "Google Sheets"]
tags: ["if", "ifs", "status tugas", "prioritas", "rumus excel"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: true
draft: false
related_templates: ["template-jadwal-shift-sederhana", "template-tracker-proyek-sederhana", "template-task-tracker-kanban-excel"]
related_guides: ["panduan-dashboard-sederhana-excel", "panduan-file-excel-rapi-untuk-dipakai-rutin"]
related_formulas: ["rumus-countifs-dashboard-status", "rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-dropdown-data-validation-tidak-muncul", "masalah-sumifs-countifs-hasil-nol"]
---

IF mengembalikan satu hasil ketika kondisi benar dan hasil lain ketika salah; IFS dapat membaca beberapa kondisi berurutan.

## Sintaks

`=IF(logical_test, value_if_true, value_if_false)`

`=IFS(logical_test1, value_if_true1, ...)`

## Arti Argumen

- Kondisi dibandingkan secara berurutan.
- Hasil harus sesuai dengan kondisi yang mendahuluinya.
- Tambahkan kondisi cadangan bila semua kondisi sebelumnya tidak terpenuhi.

## Contoh

Contoh `=IF(C2>=80,"Prioritas tinggi","Prioritas normal")` memberi label dari nilai C2. Untuk kategori bertingkat, tempatkan ambang tertinggi lebih dulu.

## Periksa Saat Hasil Tidak Sesuai

IFS tidak menyelesaikan data kosong atau teks yang tidak sesuai aturan. Uji setiap batas nilai dengan contoh kecil.

## Rumus dan Panduan Terkait

[COUNTIFS untuk status](/rumus-excel/matematika/rumus-countifs-dashboard-status/) dan [IFERROR untuk template rapi](/rumus-excel/logika/rumus-iferror-template-rapi/).
