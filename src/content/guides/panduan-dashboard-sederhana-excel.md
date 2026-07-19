---
title: "Cara Membuat Dashboard Sederhana di Excel"
meta_title: "Cara Membuat Dashboard Sederhana di Excel"
meta_description: "Panduan membuat dashboard Excel sederhana dari tabel transaksi, KPI total, rekap kategori SUMIFS, dan grafik yang mudah dibaca."
slug: "panduan-dashboard-sederhana-excel"
summary: "Dashboard yang baik mengambil angka dari tabel sumber dan memberi satu jawaban jelas, misalnya total penjualan atau pengeluaran per kategori."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "15 menit"
prerequisites: ["Tabel sumber yang rapi", "Data angka dan kategori yang konsisten"]
excel_versions: ["Microsoft Excel 2019 atau lebih baru", "Google Sheets"]
tags: ["dashboard excel", "sumifs", "grafik excel"]
date: "2026-07-12"
updated_date: "2026-07-12"
featured: true
draft: false
related_templates: ["template-laporan-penjualan-harian-umkm", "template-arus-kas-umkm"]
related_guides: ["panduan-rekap-penjualan-harian-excel", "panduan-memilih-template-excel-umkm"]
related_formulas: ["rumus-sumifs-rekap-kategori", "rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol", "masalah-angka-tidak-terjumlah-format-teks"]
---

Bangun dashboard dari tabel sumber yang rapi agar total, rekap kategori, dan grafik menjawab pertanyaan yang sama tanpa angka diketik dua kali.

## Hasil yang Perlu Disiapkan

Sebelum mulai, siapkan data kecil yang dapat kamu cek kembali. Fokus panduan ini adalah **membuat dashboard sederhana di Excel**, bukan menambah rumus atau format yang belum diperlukan.

## Langkah Praktik

1. Rapikan header dan pastikan satu jenis data berada di setiap kolom.
2. Buat KPI dari kolom sumber, misalnya total atau jumlah transaksi.
3. Susun rekap kategori kecil dengan `SUMIFS` sebagai sumber grafik.
4. Bandingkan jumlah kategori dengan KPI total sebelum membagikan dashboard.

## Cara Memeriksa Hasil

Dashboard harus membaca tabel sumber. `IFERROR` dapat menangani keadaan pembagi kosong, tetapi tidak memperbaiki data sumber yang salah.

## Catatan dan Batasan

Dashboard sederhana tidak menggantikan audit data. Uji chart dan formula lagi bila workbook dibuka di aplikasi lain.

## Lanjutkan dari Sini

[template laporan penjualan harian](/templates/bisnis-umkm/template-laporan-penjualan-harian-umkm/) dan [diagnosis SUMIFS bernilai nol](/masalah-excel/formula/masalah-sumifs-countifs-hasil-nol/).
