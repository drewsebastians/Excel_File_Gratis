---
title: "Template Tracker Proyek Sederhana Excel Gratis"
meta_title: "Template Tracker Proyek Sederhana Excel Gratis"
meta_description: "Download template tracker proyek sederhana Excel gratis dengan daftar tugas, milestone, progress, status keterlambatan, dashboard, dan grafik proyek."
slug: "template-tracker-proyek-sederhana"
focus_keyword: "template tracker proyek excel"
preview_image: "/assets/templates/template-tracker-proyek-sederhana.png"
preview_alt: "Dashboard tracker proyek Excel dengan jumlah proyek, tugas terbuka, keterlambatan, milestone, dan grafik status"
featured: true
draft: false
category: "produktivitas-kerja"
tags: ["tracker proyek", "project tracker", "task list", "milestone", "template excel gratis"]
date: "2026-07-14"
updated_date: "2026-07-14"
file_name: "template-tracker-proyek-sederhana.xlsx"
file_size: "16 KB"
suggested_h1: "Template Tracker Proyek Sederhana Excel Gratis"
usage_heading: "Cara Pakai Tracker Proyek"
ringkasan_singkat: "Kelola proyek kecil melalui daftar proyek, tugas, milestone, dan dashboard. Progress proyek dihitung dari progress tugas yang memiliki ID proyek yang sama."
file_spec:
  sheets: 6
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel 2019 atau lebih baru dan Google Sheets"
batasan:
  - "Template ini ditujukan untuk proyek kecil dan bukan pengganti sistem manajemen proyek, kolaborasi real-time, atau pelacakan waktu."
  - "Status lewat rencana adalah indikator dari tanggal yang dicatat, bukan penilaian kinerja atau prioritas otomatis."
related_templates: ["template-task-tracker-kanban-excel", "template-notulen-rapat-action-item", "template-kalender-planner-2026"]
---

Tracker proyek ini membantu tim kecil melihat pekerjaan yang sedang berjalan tanpa harus memakai sistem yang rumit. Gunakan ID proyek secara konsisten agar tugas, milestone, dan dashboard membaca data yang sama.

## Isi Workbook

- **Cara Pakai** berisi langkah awal dan batasan penggunaan.
- **Project Overview** menyimpan proyek, pemilik, rentang rencana, status, progress, dan catatan risiko.
- **Task List** menjadi sumber tugas, pemilik, prioritas, status, tanggal, progress, ketergantungan, serta penanda keterlambatan.
- **Milestones** mencatat titik hasil penting per proyek.
- **Dashboard** merangkum proyek, tugas terbuka, tugas lewat rencana, dan milestone.
- **Referensi** menyimpan pilihan status, prioritas, pemilik, dan workstream.

## Cara Pakai

1. Isi satu proyek pada **Project Overview** dan buat ID seperti `PRJ-001`.
2. Tambahkan tugas pada **Task List**, lalu pilih ID proyek yang sesuai.
3. Masukkan progress sebagai persentase, misalnya `80%`, bukan angka `80` tanpa tanda persen.
4. Isi tanggal selesai rencana untuk tugas yang perlu dipantau.
5. Tambahkan hasil penting pada **Milestones**, kemudian baca kondisi keseluruhan di Dashboard.

## Logika Progress dan Keterlambatan

Progress proyek adalah rata-rata progress tugas yang memiliki ID proyek sama. Tugas dengan status selain Selesai dan tanggal selesai rencana sebelum hari ini akan ditandai **Lewat rencana**. Baris kosong dibiarkan kosong agar tidak ikut dihitung sebagai pekerjaan terbuka.

Gunakan [COUNTIFS untuk dashboard status](/rumus-excel/matematika/rumus-countifs-dashboard-status/) bila ingin memahami hitungan tugas terbuka. Untuk filter daftar tugas pada Excel versi baru, lihat [rumus FILTER](/rumus-excel/lookup-referensi/rumus-filter-daftar-dinamis/).

## Tips Pemakaian

Pilih satu definisi status untuk semua anggota, misalnya Belum Dimulai, Dikerjakan, dan Selesai. Hindari mengubah ID setelah banyak tugas dibuat; bila harus diubah, periksa seluruh Task List dan Milestones. Tambahkan catatan risiko seperlunya, bukan sebagai pengganti diskusi tim.

## Batasan Template

Workbook ini tidak memiliki pembaruan real-time, notifikasi, hak akses, dependency otomatis, atau perhitungan beban kerja. Dashboard hanya sebaik data yang diisi. Untuk proyek besar atau lintas tim, gunakan proses dan alat kolaborasi yang sesuai.

## FAQ

**Mengapa progress proyek 0%?**

Pastikan ID proyek pada Task List sama persis dengan ID di Project Overview dan progress tugas terisi sebagai persentase.

**Mengapa tugas ditandai lewat rencana?**

Tanggal selesai rencana sudah lewat, sementara status belum Selesai. Periksa tanggal dan status sebelum mengubahnya.

**Apakah bisa menambah status baru?**

Bisa, tetapi perbarui daftar referensi dan formula rekap yang memakai nama status tersebut.
