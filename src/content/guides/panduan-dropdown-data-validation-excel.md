---
title: "Cara Membuat Dropdown Data Validation di Excel"
meta_title: "Cara Membuat Dropdown Data Validation di Excel"
meta_description: "Panduan membuat dropdown Data Validation di Excel untuk kategori, status, pemilik, dan prioritas agar data template konsisten."
slug: "panduan-dropdown-data-validation-excel"
summary: "Dropdown menjaga kata yang sama tetap ditulis dengan cara yang sama, sehingga filter dan rumus rekap tidak mudah kehilangan data karena variasi ejaan."
category: "dasar-excel"
difficulty: "pemula"
estimated_time: "10 menit"
prerequisites: ["Daftar nilai yang ingin dipilih", "Akses menu Data di Excel"]
excel_versions: ["Microsoft Excel 2019 atau lebih baru", "Google Sheets"]
tags: ["data validation", "dropdown excel", "kategori excel"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: true
draft: false
related_templates: ["template-pembukuan-pengeluaran-usaha", "template-task-tracker-kanban-excel", "template-notulen-rapat-action-item"]
related_guides: ["panduan-excel-table-untuk-template", "panduan-budget-pribadi-sebagai-catatan"]
related_formulas: ["rumus-countifs-dashboard-status", "rumus-sumifs-rekap-kategori"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol", "masalah-vlookup-xlookup-na"]
---

Buat pilihan untuk status, kategori, atau pemilik agar penulisan tetap konsisten dan rekap tidak kehilangan data karena variasi ejaan.

## Hasil yang Perlu Disiapkan

Sebelum mulai, siapkan data kecil yang dapat kamu cek kembali. Fokus panduan ini adalah **membuat dropdown Data Validation di Excel**, bukan menambah rumus atau format yang belum diperlukan.

## Langkah Praktik

1. Tulis daftar pilihan pada area referensi yang mudah dirawat.
2. Pilih sel input lalu buka **Data > Data Validation**.
3. Pilih tipe **List** dan gunakan rentang daftar sebagai Source.
4. Uji pilihan pada baris kosong serta cek apakah rekap membaca nilai yang dipilih.

## Cara Memeriksa Hasil

`COUNTIFS` dan `SUMIFS` memperlakukan teks berbeda sebagai kriteria berbeda. Dropdown membantu mencegah variasi seperti `Dikerjakan` dan `Sedang dikerjakan`.

## Catatan dan Batasan

Periksa perilaku dropdown lagi jika file dipindahkan ke Google Sheets karena alur serta tampilannya dapat berbeda.

## Lanjutkan dari Sini

[rumus COUNTIFS](/rumus-excel/matematika/rumus-countifs-dashboard-status/) dan [dropdown tidak muncul](/masalah-excel/format-data/masalah-dropdown-data-validation-tidak-muncul/).
