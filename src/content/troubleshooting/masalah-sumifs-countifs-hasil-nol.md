---
title: "SUMIFS atau COUNTIFS Hasilnya 0 di Excel"
meta_title: "SUMIFS atau COUNTIFS Hasilnya 0 di Excel"
meta_description: "Diagnosa SUMIFS atau COUNTIFS yang menghasilkan 0 di Excel: cek kriteria, ukuran rentang, format angka, tanggal, dan spasi tersembunyi."
slug: "masalah-sumifs-countifs-hasil-nol"
summary: "Hasil 0 dapat berarti memang tidak ada data yang cocok, atau ada perbedaan kriteria, rentang, tanggal, atau jenis data."
category: "formula"
symptoms: ["SUMIFS menghasilkan 0 padahal ada transaksi", "COUNTIFS tidak menghitung baris yang terlihat cocok", "Rekap kategori berbeda dengan total tabel"]
excel_versions: ["Microsoft Excel 2007 atau lebih baru", "Google Sheets"]
tags: ["sumifs hasil 0", "countifs hasil 0", "rumus excel"]
date: "2026-07-12"
updated_date: "2026-07-12"
featured: true
draft: false
related_templates: ["template-laporan-penjualan-harian-umkm", "template-arus-kas-umkm", "template-tracker-cicilan-hutang"]
related_guides: ["panduan-rekap-penjualan-harian-excel", "panduan-dashboard-sederhana-excel"]
related_formulas: ["rumus-sumifs-rekap-kategori", "rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-angka-tidak-terjumlah-format-teks"]
---

Mulai dari satu kriteria dan data sumber saat SUMIFS atau COUNTIFS mengembalikan 0, kemudian tambah kondisi satu per satu untuk menemukan bagian yang tidak cocok.

## Coba Ini Terlebih Dahulu

1. Pastikan sum range dan setiap criteria range memiliki ukuran yang sama.
2. Uji kriteria dengan satu nilai yang terlihat persis di tabel.
3. Periksa spasi, variasi ejaan, tanggal, dan angka yang tersimpan sebagai teks.
4. Tambahkan kembali kriteria lain setelah hasil satu kondisi sudah benar.

## Penyebab yang Paling Sering

SUMIFS menjumlahkan dan COUNTIFS menghitung hanya ketika semua kriteria cocok. Teks serupa belum tentu sama, misalnya `Selesai` dan `selesai` dapat perlu diperiksa sesuai data.

## Sebelum Mengubah Data

Jangan memakai IFERROR untuk menyembunyikan nol yang belum dipahami. Perbaiki data atau kriteria sumbernya.

## Bantuan Terkait

[rumus SUMIFS](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/) dan [rumus COUNTIFS](/rumus-excel/matematika/rumus-countifs-dashboard-status/).
