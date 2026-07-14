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

## Tujuan

Dropdown atau Data Validation cocok untuk kolom yang nilainya berulang: status, prioritas, kategori, metode pembayaran, atau pemilik. Pengguna dapat tetap mengetik catatan bebas di kolom lain, sementara kolom kunci memakai pilihan yang konsisten.

## 1. Tulis Daftar Referensi

Letakkan pilihan di area yang mudah ditemukan, misalnya sheet Referensi. Untuk Status Tugas, tulis Belum Dimulai, Dikerjakan, dan Selesai pada satu kolom. Hindari menulis daftar di dalam rumus panjang bila daftar itu kemungkinan akan berubah.

## 2. Terapkan Data Validation

Pilih sel input, buka **Data > Data Validation**, lalu pilih **List**. Pada Source, pilih rentang daftar referensi. Terapkan ke beberapa baris yang disiapkan untuk input agar pengguna tidak perlu membuat dropdown ulang.

## 3. Uji Pilihannya

Klik salah satu sel dan pastikan pilihan tampil. Coba pilih nilai, lalu lihat apakah rumus rekap membaca status atau kategori tersebut. Jangan hanya menguji baris contoh; periksa satu baris kosong yang akan dipakai pengguna berikutnya.

## Mengapa Ini Penting untuk Rumus

`COUNTIFS` dan `SUMIFS` membandingkan teks secara tepat. `Dikerjakan` dan `Sedang dikerjakan` adalah dua nilai berbeda. Dropdown mengurangi variasi seperti itu. Baca [rumus COUNTIFS untuk dashboard status](/rumus-excel/matematika/rumus-countifs-dashboard-status/) untuk contoh rekapnya.

## Masalah Umum

Jika dropdown tidak muncul, periksa apakah Source menunjuk ke rentang yang benar dan tidak menyertakan header. Jika nilai rekap tetap 0, cek ejaan lama yang mungkin sudah terlanjur diketik; panduan [SUMIFS atau COUNTIFS hasil 0](/masalah-excel/formula/masalah-sumifs-countifs-hasil-nol/) membantu memeriksanya.
