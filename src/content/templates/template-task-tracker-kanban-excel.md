---
title: "Template Task Tracker Kanban Excel Gratis"
meta_title: "Template Task Tracker Kanban Excel Gratis"
meta_description: "Download template task tracker Kanban Excel gratis untuk mencatat tugas, pemilik, prioritas, progres, jatuh tempo, dan status keterlambatan."
slug: "template-task-tracker-kanban-excel"
focus_keyword: "template task tracker kanban excel"
preview_image: "/assets/templates/template-task-tracker-kanban-excel.png"
preview_alt: "Papan Kanban Excel dengan kolom belum dimulai, dikerjakan, dan selesai"
featured: true
draft: false
category: "produktivitas-kerja"
tags: ["task tracker", "kanban excel", "daftar tugas", "produktivitas kerja"]
date: "2026-07-14"
updated_date: "2026-07-14"
file_name: "template-task-tracker-kanban-excel.xlsx"
file_size: "12 KB"
suggested_h1: "Template Task Tracker Kanban Excel Gratis"
usage_heading: "Cara Pakai Task Tracker Kanban"
ringkasan_singkat: "Masukkan tugas sekali di tabel sumber, lalu baca statusnya dalam papan Kanban dan rekap pemilik tanpa membuat daftar yang terpisah."
file_spec:
  sheets: 4
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel 2021 atau lebih baru; Microsoft 365 direkomendasikan untuk tampilan Kanban dinamis"
batasan:
  - "Template ini untuk pelacakan tugas sederhana, bukan sistem manajemen proyek atau pelacakan waktu."
  - "Papan Kanban dinamis memakai FILTER; versi Excel lama dapat menampilkan formula tetapi tidak memperbarui kartu otomatis."
related_templates: ["template-notulen-rapat-action-item", "template-kalender-planner-2026", "template-follow-up-pelanggan-excel"]
---

Task tracker ini memakai satu sumber data: **Daftar Tugas**. Ketika status diubah dari Belum Dimulai ke Dikerjakan atau Selesai, tampilan **Papan Kanban** mengikuti status tersebut. Pendekatan ini mengurangi risiko dua daftar tugas saling berbeda.

## Isi dan Fitur Workbook

- **Cara Pakai** memberi langkah input singkat.
- **Daftar Tugas** memuat ID, tugas, proyek, pemilik, status, prioritas, tanggal mulai, jatuh tempo, progres, hari tersisa, dan status keterlambatan.
- **Papan Kanban** menampilkan tugas berdasarkan tiga status dengan rumus `FILTER`.
- **Ringkasan** menghitung tugas per status, tugas lewat tenggat, tugas tanpa tenggat, dan jumlah tugas per pemilik.

## Cara Pakai Task Tracker Kanban

1. Isi satu tugas per baris pada **Daftar Tugas**.
2. Pilih Status dan Prioritas melalui dropdown. Jangan membuat variasi ejaan baru seperti `Sedang dikerjakan` karena papan hanya membaca status yang tersedia.
3. Isi Progres dari 0 sampai 100.
4. Tambahkan Jatuh Tempo bila tugas memiliki tenggat. Kolom Hari Tersisa akan kosong untuk tugas tanpa tanggal.
5. Lihat **Papan Kanban** untuk pembacaan cepat dan **Ringkasan** untuk angka status serta pemilik.

## Rumus dan Logika

Status keterlambatan tidak hanya membandingkan tanggal. Rumus juga memeriksa apakah tugas kosong, sudah selesai, atau belum memiliki tanggal jatuh tempo. Karena itu, tugas kosong dan tugas tanpa tenggat tidak salah ditandai sebagai terlambat.

Papan Kanban menggunakan `FILTER` untuk menyaring nama tugas berdasarkan Status. Rumus ini paling nyaman di Microsoft 365 atau Excel 2021. Untuk tabel status dan rekap yang kompatibel lebih luas, workbook juga memakai `COUNTIF` dan `COUNTIFS`.

## Batasan Template

Template tidak mengatur dependensi, kalender tim, pemberitahuan otomatis, atau histori perubahan. Gunakan [template notulen rapat dan action item](/templates/produktivitas-kerja/template-notulen-rapat-action-item/) bila tugas muncul dari rapat.

## FAQ

**Papan Kanban tidak berubah setelah status diganti. Mengapa?**

Periksa apakah Excel mendukung `FILTER` dan status ditulis melalui dropdown yang tersedia.

**Apakah tugas selesai masih bisa memiliki tanggal lewat?**

Tidak. Status keterlambatan menampilkan `Selesai` untuk tugas yang sudah selesai.

**Apakah boleh membiarkan jatuh tempo kosong?**

Boleh. Workbook menandainya sebagai `Tanpa jatuh tempo`, bukan sebagai keterlambatan.

