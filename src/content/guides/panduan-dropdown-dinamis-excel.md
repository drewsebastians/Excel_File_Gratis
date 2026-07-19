---
title: "Cara Membuat Dropdown Excel yang Bertambah Otomatis"
meta_title: "Cara Membuat Dropdown Excel yang Bertambah Otomatis"
meta_description: "Membuat daftar pilihan kategori yang bertambah bersama Excel Table sehingga menu input tidak perlu diperbarui setiap hari."
slug: "panduan-dropdown-dinamis-excel"
summary: "Membuat daftar pilihan kategori yang bertambah bersama Excel Table sehingga menu input tidak perlu diperbarui setiap hari."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "15 menit"
prerequisites: ["Excel Table untuk daftar kategori","Satu kolom input yang akan memakai dropdown"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021","Microsoft Excel 2019"]
tags: ["dropdown excel","data validation","excel table"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: false
related_templates: ["template-task-tracker-kanban-excel","template-notulen-rapat-action-item"]
related_guides: ["panduan-dropdown-data-validation-excel","panduan-structured-references-excel-table"]
related_formulas: ["rumus-filter-daftar-dinamis"]
related_troubleshooting: ["masalah-dropdown-data-validation-tidak-muncul"]
---

Gunakan Excel Table dan defined name untuk membuat daftar pilihan yang mengikuti pertambahan kategori, lalu terapkan nama itu ke Data Validation.

## Hasil yang Perlu Disiapkan

Sebelum mulai, siapkan data kecil yang dapat kamu cek kembali. Fokus panduan ini adalah **membuat dropdown Excel yang bertambah otomatis**, bukan menambah rumus atau format yang belum diperlukan.

## Langkah Praktik

1. Buat Table untuk daftar kategori dan beri nama yang mudah dikenali.
2. Tambahkan header serta nilai kategori di satu kolom.
3. Buat defined name yang merujuk kolom Table tersebut.
4. Gunakan defined name sebagai Source pada Data Validation dan uji setelah menambah kategori.

## Cara Memeriksa Hasil

Defined name dapat menjembatani Data Validation dengan kolom Table. Periksa Name Manager bila daftar tidak ikut berubah.

## Catatan dan Batasan

Tidak semua dialog menerima structured reference langsung. Google Sheets memakai mekanisme dropdown serta named range yang berbeda.

## Lanjutkan dari Sini

[dropdown Data Validation](/panduan/dasar-excel/panduan-dropdown-data-validation-excel/) dan [Excel Table untuk template](/panduan/pengolahan-data/panduan-excel-table-untuk-template/).
