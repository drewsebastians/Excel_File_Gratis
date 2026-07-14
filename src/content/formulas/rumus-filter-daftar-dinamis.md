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

## Tujuan

`FILTER` menampilkan semua baris yang memenuhi syarat tanpa menyalin data satu per satu. Hasilnya akan meluber ke sel di bawah atau samping, sehingga area hasil harus dibiarkan kosong.

## Sintaks dan Argumen

`array` adalah data yang ingin ditampilkan. `include` adalah pengujian TRUE atau FALSE dengan tinggi atau lebar yang sama. `if_empty` adalah hasil pengganti bila tidak ada baris yang cocok.

## Contoh 1: Tugas dengan Status Tertentu

Jika nama tugas ada di `D4:D200` dan status ada di `G4:G200`, gunakan `=FILTER(D4:D200,G4:G200="Dikerjakan","Tidak ada tugas")`. Formula menampilkan tugas Dikerjakan dan pesan singkat ketika tidak ada hasil.

## Contoh 2: Baris Lengkap per Pemilik

`=FILTER(A4:J200,E4:E200=M2,"Tidak ada data")` menampilkan seluruh kolom A sampai J ketika pemilik pada kolom E sama dengan nilai di M2. Pastikan rentang A4:J200 dan E4:E200 dimulai serta berakhir pada baris yang sama.

## Tepi Kasus

Jika area spill sudah berisi data, Excel dapat menampilkan `#SPILL!`. Kosongkan area hasil, bukan data sumbernya. Bila tidak ada hasil dan argumen ketiga tidak diisi, Excel dapat menghasilkan error kalkulasi. Gunakan teks seperti `"Tidak ada data"` bila itu memang pengalaman yang diinginkan pengguna.

## Kompatibilitas

FILTER adalah fungsi array dinamis. Excel lama mungkin tidak memilikinya, sehingga file akan memerlukan alternatif seperti filter tabel biasa, kolom bantu, atau formula lain. Periksa versi sebelum membagikan workbook ke pengguna lain.

## Sumber Resmi

Microsoft menjelaskan sintaks dan perilaku spill pada [fungsi FILTER](https://support.microsoft.com/id-ID/Excel/functions/filter-function). Untuk daftar berbasis status, FILTER dapat dilengkapi dengan [IF dan IFS](/rumus-excel/logika/rumus-if-ifs-status-prioritas/).
