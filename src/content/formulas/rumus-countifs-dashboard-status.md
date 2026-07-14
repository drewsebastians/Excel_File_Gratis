---
title: "Rumus COUNTIFS untuk Dashboard Status di Excel"
formula_name: "COUNTIFS"
meta_title: "Rumus COUNTIFS untuk Dashboard Status di Excel"
meta_description: "Pelajari COUNTIFS Excel untuk menghitung status tugas, action item, atau transaksi dengan lebih dari satu kriteria pada dashboard."
slug: "rumus-countifs-dashboard-status"
summary: "COUNTIFS menghitung jumlah baris yang memenuhi beberapa syarat, misalnya tugas milik satu orang dengan status belum selesai."
syntax: "=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)"
category: "matematika"
difficulty: "menengah"
excel_versions: ["Microsoft Excel 2007 atau lebih baru", "Google Sheets"]
tags: ["countifs", "dashboard status", "rumus excel"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: true
draft: false
related_templates: ["template-task-tracker-kanban-excel", "template-notulen-rapat-action-item", "template-pembukuan-pengeluaran-usaha"]
related_guides: ["panduan-dashboard-sederhana-excel", "panduan-dropdown-data-validation-excel"]
related_formulas: ["rumus-sumifs-rekap-kategori", "rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol", "masalah-tanggal-salah-format-excel"]
---

## Tujuan

`COUNTIFS` menghitung jumlah baris yang memenuhi lebih dari satu kondisi. Ia cocok untuk dashboard status karena dashboard sering membutuhkan pertanyaan seperti: berapa tugas milik Sari yang belum selesai, atau berapa transaksi pada bulan tertentu dengan status Menunggu.

## Sintaks dan Aturan Rentang

Semua `criteria_range` harus mempunyai ukuran yang sama. Jika Status memakai `E4:E200`, maka Pemilik yang dipasangkan harus mempunyai baris awal dan akhir yang sama, misalnya `D4:D200`.

## Contoh 1: Menghitung Satu Status

`=COUNTIF($E$4:$E$200,"Selesai")` cukup bila hanya satu status yang dihitung. Pada dashboard, Anda dapat meletakkan kata `Selesai` di A3 lalu memakai `=COUNTIF($E$4:$E$200,A3)` agar label mudah diganti.

## Contoh 2: Tugas Terbuka per Pemilik

`=COUNTIFS($D$4:$D$200,A11,$E$4:$E$200,"<>Selesai",$B$4:$B$200,"<>")` menghitung tugas dengan pemilik pada A11, status bukan Selesai, dan nama tugas tidak kosong. Kriteria terakhir penting agar baris siap pakai tidak ikut dihitung.

## Contoh 3: Status Lewat Jatuh Tempo

Jika kolom K sudah menyimpan status keterlambatan, gunakan `=COUNTIF($K$4:$K$200,"Lewat jatuh tempo")`. Memisahkan logika keterlambatan ke kolom bantu membuat dashboard lebih mudah diperiksa.

## Masalah Umum

Hasil 0 bisa benar, tetapi juga bisa muncul karena dropdown tidak konsisten, rentang tidak sama panjang, atau tanggal disimpan sebagai teks. Baca [diagnosis SUMIFS/COUNTIFS](/masalah-excel/formula/masalah-sumifs-countifs-hasil-nol/) sebelum mengganti rumus secara acak.

## Sumber Resmi

Lihat dokumentasi [COUNTIFS function](https://support.microsoft.com/en-us/office/countifs-function-dda3dc6e-f74e-4aee-88bc-aa8c2a866842) dari Microsoft untuk sintaks dan contoh tambahan.
