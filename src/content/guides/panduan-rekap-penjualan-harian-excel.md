---
title: "Cara Membuat Rekap Penjualan Harian di Excel"
meta_title: "Cara Membuat Rekap Penjualan Harian di Excel"
meta_description: "Pelajari cara membuat rekap penjualan harian di Excel dari tabel transaksi, total per baris, SUMIFS per kategori, dan dashboard sederhana."
slug: "panduan-rekap-penjualan-harian-excel"
summary: "Buat rekap yang dapat dilacak dari tabel transaksi: satu transaksi per baris, total otomatis, lalu ringkas dengan SUMIFS."
category: "pengolahan-data"
difficulty: "pemula"
estimated_time: "12 menit"
prerequisites: ["Tabel transaksi dengan tanggal, kategori, jumlah, harga satuan, dan diskon", "Pemahaman dasar referensi sel"]
excel_versions: ["Microsoft Excel 2019 atau lebih baru", "Google Sheets"]
tags: ["rekap penjualan harian", "sumifs", "dashboard excel"]
date: "2026-07-12"
updated_date: "2026-07-12"
featured: true
draft: false
related_templates: ["template-laporan-penjualan-harian-umkm", "template-invoice-penjualan-umkm"]
related_guides: ["panduan-dashboard-sederhana-excel", "panduan-memilih-template-excel-umkm"]
related_formulas: ["rumus-sumifs-rekap-kategori", "rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol", "masalah-angka-tidak-terjumlah-format-teks"]
---

Catat satu transaksi per baris, lalu buat total dan rekap kategori dari tabel yang sama agar angka penjualan harian dapat ditelusuri kembali.

## Hasil yang Perlu Disiapkan

Sebelum mulai, siapkan data kecil yang dapat kamu cek kembali. Fokus panduan ini adalah **membuat rekap penjualan harian di Excel**, bukan menambah rumus atau format yang belum diperlukan.

## Langkah Praktik

1. Buat kolom tanggal, nomor transaksi, kategori, dan nominal.
2. Masukkan transaksi baru tanpa menyisipkan subtotal di tengah data.
3. Gunakan `SUM` untuk total dan `SUMIFS` untuk total kategori atau periode.
4. Cocokkan rekap dengan beberapa transaksi sumber sebelum memakai hasilnya.

## Cara Memeriksa Hasil

Rekap bergantung pada tanggal, kategori, dan nominal yang konsisten. `SUMIFS` memerlukan rentang serta kriteria yang sepadan.

## Catatan dan Batasan

Rekap tidak membuktikan bahwa transaksi sudah lunas atau angka sudah sesuai dokumen sumber.

## Lanjutkan dari Sini

[template laporan penjualan harian](/templates/bisnis-umkm/template-laporan-penjualan-harian-umkm/) dan [rumus SUMIFS](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/).
