---
title: "Template Jadwal Shift Sederhana Excel Gratis"
meta_title: "Template Jadwal Shift Sederhana Excel Gratis"
meta_description: "Download template jadwal shift sederhana Excel gratis dengan daftar anggota, jam mulai-selesai, durasi lintas tengah malam, rekap, dan grafik penugasan."
slug: "template-jadwal-shift-sederhana"
focus_keyword: "template jadwal shift excel"
preview_image: "/assets/templates/template-jadwal-shift-sederhana.png"
preview_alt: "Ringkasan template jadwal shift Excel dengan jumlah penugasan per anggota dan grafik shift"
featured: true
draft: false
category: "produktivitas-kerja"
tags: ["jadwal shift", "jadwal kerja", "pembagian tugas", "template excel gratis"]
date: "2026-07-14"
updated_date: "2026-07-14"
file_name: "template-jadwal-shift-sederhana.xlsx"
file_size: "13 KB"
suggested_h1: "Template Jadwal Shift Sederhana Excel Gratis"
usage_heading: "Cara Pakai Jadwal Shift"
ringkasan_singkat: "Isi anggota, tanggal, nama shift, jam mulai, dan jam selesai. Ringkasan menghitung jumlah penugasan serta total jam tercatat, termasuk shift yang melewati tengah malam."
file_spec:
  sheets: 5
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel 2019 atau lebih baru dan Google Sheets"
batasan:
  - "Template ini membantu pembagian jadwal sederhana dan bukan alat penggajian, absensi, atau kepatuhan ketenagakerjaan."
  - "Pengguna tetap perlu memeriksa aturan jam kerja, jeda, dan persetujuan jadwal yang berlaku di tempatnya."
related_templates: ["template-kalender-planner-2026", "template-task-tracker-kanban-excel", "template-notulen-rapat-action-item"]
---

Gunakan template ini untuk mengatur jadwal tim kecil yang memiliki pola pagi, siang, atau malam. File ini sengaja fokus pada pencatatan penugasan dan durasi agar tetap mudah diperiksa, bukan pada penggajian atau pencatatan kehadiran resmi.

## Isi Workbook

- **Cara Pakai** menjelaskan urutan pengisian.
- **Daftar Anggota** menyimpan nama anggota dan keterangan singkat.
- **Jadwal Shift** berisi tanggal, anggota, shift, jam mulai, jam selesai, dan durasi.
- **Ringkasan** menampilkan jumlah penugasan per anggota, total jam, serta grafik per shift.
- **Referensi** menyediakan pilihan shift dan anggota untuk dropdown.

## Cara Pakai

1. Isi atau sesuaikan nama pada **Daftar Anggota**.
2. Masuk ke **Jadwal Shift**, lalu isi satu penugasan per baris.
3. Pilih anggota dan nama shift dari dropdown agar rekap konsisten.
4. Masukkan jam mulai dan selesai sebagai nilai waktu Excel, misalnya `20:00` dan `04:00`.
5. Cek **Ringkasan** untuk melihat pembagian penugasan serta total jam yang tercatat.

## Shift yang Melewati Tengah Malam

Durasi menggunakan pola `MOD(jam selesai-jam mulai,1)*24`. Karena itu, jadwal dari 20:00 sampai 04:00 tetap dibaca sebagai 8 jam. Jika salah satu jam kosong, durasi dibiarkan kosong agar angka total tidak menyesatkan.

## Penggunaan yang Tepat

Untuk rapat serah-terima atau pekerjaan lanjutan, catat action item pada [template notulen rapat](/templates/produktivitas-kerja/template-notulen-rapat-action-item/). Gunakan [IF dan IFS untuk status](/rumus-excel/logika/rumus-if-ifs-status-prioritas/) saat ingin membuat penanda tambahan seperti Aman atau Perlu Ditinjau.

## Batasan Template

Total jam di file ini adalah hasil pencatatan jadwal, bukan bukti kehadiran, perhitungan lembur, atau dasar penggajian. Periksa kembali jam aktual, jeda kerja, aturan internal, dan ketentuan yang berlaku sebelum memakai data untuk tujuan operasional resmi.

## FAQ

**Apakah shift malam dihitung otomatis?**

Ya, selama kedua jam terisi sebagai waktu Excel. Contoh 20:00 sampai 04:00 dihitung 8 jam.

**Apakah file ini menghitung gaji atau lembur?**

Tidak. File hanya mencatat durasi jadwal sederhana.

**Dropdown tidak muncul. Apa yang harus dilakukan?**

Periksa apakah Anda mengedit sel input yang benar, lalu baca [solusi dropdown Data Validation](/masalah-excel/format-data/masalah-dropdown-data-validation-tidak-muncul/).
