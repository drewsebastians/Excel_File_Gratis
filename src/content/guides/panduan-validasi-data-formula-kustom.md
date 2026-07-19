---
title: "Validasi Data Excel dengan Formula Kustom untuk Mencegah Salah Input"
meta_title: "Validasi Data Excel dengan Formula Kustom untuk Mencegah Salah Input"
meta_description: "Membatasi input ID transaksi agar tidak kosong dan tidak duplikat dengan formula validasi yang memakai referensi relatif dan absolut."
slug: "panduan-validasi-data-formula-kustom"
summary: "Membatasi input ID transaksi agar tidak kosong dan tidak duplikat dengan formula validasi yang memakai referensi relatif dan absolut."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "18 menit"
prerequisites: ["Kolom ID transaksi pada A2:A100","Excel desktop atau web"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021","Microsoft Excel 2019"]
tags: ["data validation","validasi excel","kontrol input"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: false
related_templates: ["template-database-pelanggan-sederhana","template-rekap-pesanan-pelanggan"]
related_guides: ["panduan-dropdown-dinamis-excel","panduan-excel-table-vs-range"]
related_formulas: ["rumus-countifs-dashboard-status"]
related_troubleshooting: ["masalah-dropdown-data-validation-tidak-muncul"]
---

Membatasi input ID transaksi agar tidak kosong dan tidak duplikat dengan formula validasi yang memakai referensi relatif dan absolut. Panduan ini memulai dari hasil yang perlu diperiksa, lalu mengarahkan kamu ke langkah yang dapat diuji pada data kecil sebelum diterapkan ke workbook kerja.

## Sebelum Menerapkan ke File Kerja

Gunakan salinan data atau workbook uji terlebih dahulu. Periksa versi Excel, lokasi menu, dan hasil rumus pada kondisi yang kamu gunakan; perilaku Excel web, Mac, atau Google Sheets dapat berbeda dari Excel desktop.

## Masalah yang Diselesaikan

ID yang kosong atau kembar membuat pencarian, rekap, dan penggabungan data menjadi tidak dapat dipercaya.

## Hasil yang Diharapkan

Baris input baru menolak ID kosong dan memberi peringatan ketika ID sudah pernah dipakai.

## Prasyarat

- Kolom ID transaksi pada A2:A100
- Excel desktop atau web

## Contoh Input

```text
A2=INV-001
A3=INV-002
A4=INV-002 (harus ditolak)
```

## Langkah Praktik

1. Pilih rentang A2:A100, bukan seluruh kolom.
2. Buka Data > Data Validation, pilih Allow: Custom.
3. Masukkan `=AND(A2<>"",COUNTIF($A$2:$A$100,A2)=1)`.
4. Pilih Error Alert dengan gaya Stop dan uji ID baru serta ID duplikat.
5. Coba tempel beberapa nilai untuk memahami bahwa validasi tidak selalu menghentikan semua paste dari sumber lain.

## Mengapa Ini Bekerja

A2 relatif terhadap sel pertama yang dipilih, sehingga setiap baris memeriksa nilainya sendiri. `$A$2:$A$100` absolut agar seluruh rentang duplikat tetap sama.

## Kesalahan Umum

- Mengunci A2 menjadi `$A$2` membuat semua baris memeriksa sel yang sama.
- Validasi tidak menggantikan pembersihan data yang sudah telanjur masuk.

## Diagnosis

Klik sel bermasalah dan lihat Data Validation. Uji formula di sel bantu untuk melihat hasil TRUE atau FALSE.

## Cara Memperbaiki

Pilih ulang rentang dari A2, betulkan tanda dolar, dan gunakan Stop jika input harus benar-benar ditolak.

## Kompatibilitas dan Alternatif Versi Lama

Custom validation tersedia di Excel desktop dan web. Google Sheets memiliki Data validation dengan formula kustom yang sintaks dan perilakunya perlu diuji ulang.

Alternatif untuk Excel lama: Gunakan Remove Duplicates sebagai pemeriksaan berkala, bukan sebagai pencegahan input harian.

## Batasan

Validasi berbasis rentang tetap perlu diperluas ketika data melewati baris 100; Table dapat membantu mengelola baris baru.

## Langkah Praktis Berikutnya

Tambahkan kolom status pemeriksaan dan catat tanggal saat aturan validasi terakhir diuji.

## Related Resources

- Template: [template-database-pelanggan-sederhana](/templates/), [template-rekap-pesanan-pelanggan](/templates/)
- Panduan: [panduan-dropdown-dinamis-excel](/panduan/), [panduan-excel-table-vs-range](/panduan/)
- Rumus: [rumus-countifs-dashboard-status](/rumus-excel/)
- Troubleshooting: [masalah-dropdown-data-validation-tidak-muncul](/masalah-excel/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
