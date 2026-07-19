---
title: "Merge vs Append Power Query: Memilih Cara Menggabungkan Dua Tabel"
meta_title: "Merge vs Append Power Query: Memilih Cara Menggabungkan Dua Tabel"
meta_description: "Membedakan Merge untuk mencocokkan kolom berdasarkan key dan Append untuk menumpuk baris laporan sejenis."
slug: "panduan-power-query-merge-vs-append"
summary: "Membedakan Merge untuk mencocokkan kolom berdasarkan key dan Append untuk menumpuk baris laporan sejenis."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "16 menit"
prerequisites: ["Tabel transaksi dan tabel master atau dua laporan sejenis","Kolom key yang jelas"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021","Microsoft Excel 2019"]
tags: ["merge append","Power Query","relasi data"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: false
related_templates: ["template-database-pelanggan-sederhana","template-rekap-pesanan-pelanggan"]
related_guides: ["panduan-power-query-append","panduan-power-query-data-asli"]
related_formulas: ["rumus-xlookup-vlookup-data"]
related_troubleshooting: ["masalah-vlookup-xlookup-na"]
---

Membedakan Merge untuk mencocokkan kolom berdasarkan key dan Append untuk menumpuk baris laporan sejenis. Panduan ini memulai dari hasil yang perlu diperiksa, lalu mengarahkan kamu ke langkah yang dapat diuji pada data kecil sebelum diterapkan ke workbook kerja.

## Sebelum Menerapkan ke File Kerja

Gunakan salinan data atau workbook uji terlebih dahulu. Periksa versi Excel, lokasi menu, dan hasil rumus pada kondisi yang kamu gunakan; perilaku Excel web, Mac, atau Google Sheets dapat berbeda dari Excel desktop.

## Masalah yang Diselesaikan

Salah memilih Merge atau Append dapat menggandakan data atau menghasilkan kolom yang tidak bermakna.

## Hasil yang Diharapkan

Kamu dapat memilih operasi berdasarkan bentuk hasil yang diinginkan sebelum membuka editor.

## Prasyarat

- Tabel transaksi dan tabel master atau dua laporan sejenis
- Kolom key yang jelas

## Contoh Input

```text
Transaksi: IDProduk, Qty; Master: IDProduk, NamaProduk, Kategori. Laporan Jan dan Feb: kolom sama.
```

## Langkah Praktik

1. Tulis pertanyaan hasil: menambah atribut atau menambah baris?
2. Pilih Merge jika transaksi perlu mengambil NamaProduk dari master.
3. Pilih Append jika laporan Jan dan Feb ingin dijadikan satu riwayat.
4. Untuk Merge, pilih kolom key pada kedua tabel dan periksa jumlah match.
5. Expand kolom hasil hanya setelah memeriksa unmatched rows.

## Mengapa Ini Bekerja

Merge bekerja seperti pencocokan relasional berdasarkan key dan menghasilkan kolom tambahan. Append bekerja vertikal dan menambah baris dari struktur kolom.

## Kesalahan Umum

- Key tidak unik membuat satu baris transaksi mendapat beberapa match.
- Header tidak sama membuat Append menghasilkan kolom terpisah atau null.

## Diagnosis

Periksa jumlah baris setelah Merge dan gunakan indikator match untuk menemukan key yang tidak ditemukan.

## Cara Memperbaiki

Bersihkan key, pastikan tipe data sama, deduplikasi master, atau ubah operasi sesuai tujuan.

## Kompatibilitas dan Alternatif Versi Lama

Merge dan Append tersedia pada Power Query Excel 2016 ke atas. Google Sheets tidak menjalankan M query secara native.

Alternatif untuk Excel lama: Gunakan XLOOKUP untuk lookup satu atribut pada Microsoft 365, atau VLOOKUP pada Excel lama; gunakan VSTACK untuk append sederhana.

## Batasan

Operasi gabung tidak otomatis memperbaiki definisi key atau masalah kualitas data.

## Langkah Praktis Berikutnya

Buat decision note singkat di query: `Merge = tambah kolom`, `Append = tambah baris`.

## Related Resources

- Template: [template-database-pelanggan-sederhana](/templates/), [template-rekap-pesanan-pelanggan](/templates/)
- Panduan: [panduan-power-query-append](/panduan/), [panduan-power-query-data-asli](/panduan/)
- Rumus: [rumus-xlookup-vlookup-data](/rumus-excel/)
- Troubleshooting: [masalah-vlookup-xlookup-na](/masalah-excel/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
