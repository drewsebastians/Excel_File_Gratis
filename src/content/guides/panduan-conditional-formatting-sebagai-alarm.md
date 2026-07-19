---
title: "Conditional Formatting sebagai Alarm Kerja, Bukan Sekadar Warna"
meta_title: "Conditional Formatting sebagai Alarm Kerja, Bukan Sekadar Warna"
meta_description: "Menandai tenggat lewat, stok rendah, dan status yang perlu ditindaklanjuti dengan aturan yang dapat dijelaskan."
slug: "panduan-conditional-formatting-sebagai-alarm"
summary: "Menandai tenggat lewat, stok rendah, dan status yang perlu ditindaklanjuti dengan aturan yang dapat dijelaskan."
category: "produktivitas"
difficulty: "pemula"
estimated_time: "13 menit"
prerequisites: ["Tabel tugas dengan kolom status dan tenggat","Excel desktop atau web"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021","Microsoft Excel 2019"]
tags: ["conditional formatting","produktivitas","belajar excel"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: false
related_templates: ["template-rencana-proyek-sederhana","template-jadwal-pembayaran-tagihan"]
related_guides: ["panduan-checklist-kualitas-file-excel","panduan-excel-table-vs-range"]
related_formulas: ["rumus-if-ifs-status-prioritas"]
related_troubleshooting: ["masalah-tanggal-salah-format-excel"]
---

Menandai tenggat lewat, stok rendah, dan status yang perlu ditindaklanjuti dengan aturan yang dapat dijelaskan. Panduan ini memulai dari hasil yang perlu diperiksa, lalu mengarahkan kamu ke langkah yang dapat diuji pada data kecil sebelum diterapkan ke workbook kerja.

## Sebelum Menerapkan ke File Kerja

Gunakan salinan data atau workbook uji terlebih dahulu. Periksa versi Excel, lokasi menu, dan hasil rumus pada kondisi yang kamu gunakan; perilaku Excel web, Mac, atau Google Sheets dapat berbeda dari Excel desktop.

## Masalah yang Diselesaikan

Warna tanpa aturan yang jelas membuat pengguna melihat dekorasi, bukan prioritas tindakan.

## Hasil yang Diharapkan

Baris berisiko diberi penanda yang konsisten dan tetap memiliki label teks.

## Prasyarat

- Tabel tugas dengan kolom status dan tenggat
- Excel desktop atau web

## Contoh Input

```text
Status di F2:F30; tenggat di D2:D30; aturan terlambat: `=AND($D2<TODAY(),$F2<>"Selesai",$D2<>"")`.
```

## Langkah Praktik

1. Pilih rentang baris yang ingin diberi alarm, misalnya A2:G30.
2. Buat New Rule > Use a formula to determine which cells to format.
3. Masukkan formula dengan kolom D dan F dikunci, tetapi nomor baris tetap relatif.
4. Pilih fill yang kontras secukupnya dan pertahankan status teks.
5. Uji tanggal kemarin, tanggal kosong, dan status Selesai.

## Mengapa Ini Bekerja

Kolom dikunci agar seluruh baris mengikuti tenggat dan status pada barisnya sendiri. Syarat tanggal kosong mencegah baris kosong menjadi alarm palsu.

## Kesalahan Umum

- Mengunci nomor baris membuat semua baris mengikuti baris pertama.
- Warna menjadi satu-satunya informasi tanpa label yang dapat dibaca.

## Diagnosis

Buka Manage Rules, cek Applies to, urutan rule, dan formula pada baris pertama rentang.

## Cara Memperbaiki

Perbaiki `$D2` dan `$F2`, atur Stop If True bila diperlukan, lalu uji tiga kondisi batas.

## Kompatibilitas dan Alternatif Versi Lama

Conditional Formatting formula tersedia pada Excel modern dan Google Sheets dengan dialog berbeda. TODAY mengikuti tanggal sistem perangkat.

Alternatif untuk Excel lama: Tambahkan kolom `Flag` dengan IF agar status alarm juga bisa difilter.

## Batasan

Warna tidak cukup untuk aksesibilitas dan tidak mengirim notifikasi otomatis.

## Langkah Praktis Berikutnya

Sepakati arti warna dengan tim dan dokumentasikan pada header atau sheet Cara Pakai.

## Related Resources

- Template: [template-rencana-proyek-sederhana](/templates/), [template-jadwal-pembayaran-tagihan](/templates/)
- Panduan: [panduan-checklist-kualitas-file-excel](/panduan/), [panduan-excel-table-vs-range](/panduan/)
- Rumus: [rumus-if-ifs-status-prioritas](/rumus-excel/)
- Troubleshooting: [masalah-tanggal-salah-format-excel](/masalah-excel/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
