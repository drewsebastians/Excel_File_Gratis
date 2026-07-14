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

## Tujuan

`IF` membantu membuat keputusan sederhana: jika kondisi benar, tampilkan satu hasil; jika salah, tampilkan hasil lain. `IFS` memeriksa kondisi dari kiri ke kanan dan mengembalikan hasil dari kondisi pertama yang bernilai TRUE.

## Contoh 1: Status Keterlambatan dengan IF

`=IF(D4="","",IF(D4<TODAY(),"Lewat rencana","Aman"))` menampilkan kosong jika tanggal belum diisi. Jika ada tanggal yang lebih kecil dari hari ini, hasilnya Lewat rencana; selain itu Aman.

## Contoh 2: Prioritas dari Sisa Hari dengan IFS

`=IFS(E4="","",E4<0,"Tinggi",E4<=2,"Sedang",TRUE,"Rendah")` memberi prioritas berdasarkan sisa hari pada E4. Kondisi paling ketat harus ditaruh lebih dulu, karena IFS berhenti pada TRUE pertama.

## Contoh 3: Hindari Baris Kosong Ikut Dinilai

Sebelum menguji tanggal atau progress, cek sel identitas atau nama tugas. Contoh `=IF(B4="","",...)` mencegah baris siap pakai dibaca sebagai tugas terlambat. Pola ini dipakai pada [template tracker proyek](/templates/produktivitas-kerja/template-tracker-proyek-sederhana/).

## Kesalahan Umum

Jangan menaruh kondisi umum sebelum kondisi khusus. Pada IFS, `TRUE,"Rendah"` sebaiknya menjadi pasangan terakhir sebagai hasil default. Jika tidak ada kondisi TRUE dan tidak ada default, hasilnya dapat menjadi `#N/A`.

## Kompatibilitas

IF tersedia lebih luas daripada IFS. Jika file perlu dipakai pada Excel lama, gunakan IF bertingkat yang pendek dan beri catatan jelas. Untuk pembagian status pada dashboard, gunakan [COUNTIFS](/rumus-excel/matematika/rumus-countifs-dashboard-status/) setelah label status tersedia.

## Sumber Resmi

Microsoft mendokumentasikan urutan kondisi dan hasil default pada [fungsi IFS](https://support.microsoft.com/en-us/excel/ifs-function).
