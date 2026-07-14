---
title: "Template Notulen Rapat dan Action Item Excel Gratis"
meta_title: "Template Notulen Rapat dan Action Item Excel Gratis"
meta_description: "Download template notulen rapat dan action item Excel gratis untuk mencatat informasi rapat, agenda, keputusan, pemilik tugas, dan tenggat."
slug: "template-notulen-rapat-action-item"
focus_keyword: "template notulen rapat action item excel"
preview_image: "/assets/templates/template-notulen-rapat-action-item.png"
preview_alt: "Ringkasan action item rapat dengan status dan jumlah tindak lanjut terbuka"
featured: true
draft: false
category: "produktivitas-kerja"
tags: ["notulen rapat", "action item", "tindak lanjut rapat", "template excel gratis"]
date: "2026-07-14"
updated_date: "2026-07-14"
file_name: "template-notulen-rapat-action-item.xlsx"
file_size: "13 KB"
suggested_h1: "Template Notulen Rapat dan Action Item Excel Gratis"
usage_heading: "Cara Pakai Notulen dan Action Item"
ringkasan_singkat: "Pisahkan informasi rapat, notulen keputusan, dan tindak lanjut agar setiap pekerjaan memiliki pemilik, tenggat, serta status yang dapat dipantau."
file_spec:
  sheets: 5
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel 2019 atau lebih baru dan Google Sheets"
batasan:
  - "Template ini membantu dokumentasi internal sederhana dan bukan berita acara hukum atau pengganti persetujuan peserta rapat."
  - "Status tindak lanjut bergantung pada pembaruan manual oleh pemilik tugas."
related_templates: ["template-task-tracker-kanban-excel", "template-follow-up-pelanggan-excel", "template-kalender-planner-2026"]
---

Notulen yang baik tidak berhenti pada daftar pembahasan. Template ini memisahkan **Informasi Rapat**, **Notulen dan Keputusan**, serta **Action Item** supaya keputusan dapat ditelusuri ke tindak lanjut yang jelas.

## Isi dan Fitur Workbook

- **Cara Pakai** menjelaskan alur pencatatan.
- **Informasi Rapat** menyimpan ID, judul, tanggal, pemimpin, peserta, tujuan, dan catatan.
- **Notulen dan Keputusan** mencatat agenda, poin diskusi, keputusan, risiko, dan pencatat.
- **Action Item** menyimpan pekerjaan, pemilik, prioritas, tanggal jatuh tempo, status, hari tersisa, dan status keterlambatan.
- **Ringkasan** memperlihatkan jumlah action item per status serta pekerjaan terbuka per pemilik.

## Cara Pakai Notulen dan Action Item

1. Buat satu ID di **Informasi Rapat**, misalnya `RPT-003`.
2. Gunakan ID yang sama pada baris agenda di **Notulen dan Keputusan**.
3. Masukkan setiap tindak lanjut sebagai baris terpisah di **Action Item**.
4. Pilih pemilik, prioritas, dan status dari dropdown.
5. Buka **Ringkasan** sebelum rapat berikutnya untuk melihat pekerjaan yang belum selesai atau lewat jatuh tempo.

## Rumus dan Logika

Kolom Hari Tersisa hanya menghitung bila action item dan tanggal jatuh tempo tersedia. Status keterlambatan juga memeriksa apakah pekerjaan selesai atau tidak memiliki tenggat, sehingga baris kosong tidak menghasilkan alarm palsu. Ringkasan memakai `COUNTIF` dan `COUNTIFS` dari tabel Action Item.

## Contoh Alur Penggunaan

Rapat operasional dapat memutuskan bahwa materi promosi perlu disiapkan dan stok kemasan perlu dicek. Tulis keputusan pada sheet notulen, lalu buat dua action item dengan pemilik berbeda. Saat salah satu selesai, ubah Status-nya; jumlah pada Ringkasan ikut berubah.

## Batasan Template

Template tidak menggantikan berita acara, persetujuan resmi, atau pengingat otomatis. Pemilik dokumen tetap perlu mengonfirmasi isi keputusan dengan peserta rapat bila diperlukan.

## FAQ

**Apakah satu action item dapat dikaitkan dengan rapat lain?**

Bisa. Gunakan ID Rapat yang sesuai pada kolom ID Rapat.

**Mengapa action item ditandai lewat jatuh tempo?**

Tanggalnya sudah lewat, statusnya belum Selesai, dan kolom tugas sudah terisi.

**Apakah bisa dipakai untuk rapat bulanan?**

Bisa. Tambahkan baris informasi rapat dan gunakan ID baru untuk tiap rapat.
