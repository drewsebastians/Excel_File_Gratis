---
title: "Parameter Power Query: Mengganti Sumber File Tanpa Membuat Query Ulang"
meta_title: "Parameter Power Query: Mengganti Sumber File Tanpa Membuat Query Ulang"
meta_description: "Membuat parameter folder atau tanggal agar satu query dapat dipakai ulang pada sumber yang berubah tanpa mengedit langkah M manual."
slug: "panduan-parameter-power-query"
summary: "Membuat parameter folder atau tanggal agar satu query dapat dipakai ulang pada sumber yang berubah tanpa mengedit langkah M manual."
category: "pengolahan-data"
difficulty: "lanjutan"
estimated_time: "20 menit"
prerequisites: ["Power Query Editor","Query sumber yang sudah berhasil","Folder uji tanpa data pribadi"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021","Microsoft Excel 2019"]
tags: ["parameter power query","Power Query","otomasi"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: false
related_templates: ["template-laporan-penjualan-harian-umkm"]
related_guides: ["panduan-power-query-data-asli","panduan-power-query-append"]
related_formulas: ["rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-file-excel-berantakan-google-sheets"]
---

Membuat parameter folder atau tanggal agar satu query dapat dipakai ulang pada sumber yang berubah tanpa mengedit langkah M manual. Panduan ini memulai dari hasil yang perlu diperiksa, lalu mengarahkan kamu ke langkah yang dapat diuji pada data kecil sebelum diterapkan ke workbook kerja.

## Sebelum Menerapkan ke File Kerja

Gunakan salinan data atau workbook uji terlebih dahulu. Periksa versi Excel, lokasi menu, dan hasil rumus pada kondisi yang kamu gunakan; perilaku Excel web, Mac, atau Google Sheets dapat berbeda dari Excel desktop.

## Masalah yang Diselesaikan

Jalur file atau batas tanggal yang tertulis langsung di query membuat alur sulit dipindahkan dan dirawat.

## Hasil yang Diharapkan

Nilai sumber dikontrol dari parameter sehingga perubahan lokasi atau periode tidak memerlukan query baru.

## Prasyarat

- Power Query Editor
- Query sumber yang sudah berhasil
- Folder uji tanpa data pribadi

## Contoh Input

```text
Parameter `pFolder` = `C:\Data\PenjualanUji`; query memakai Folder.Files(pFolder).
```

## Langkah Praktik

1. Buka Power Query Editor > Home > Manage Parameters > New Parameter.
2. Buat `pFolder` bertipe Text dengan nilai folder uji.
3. Pada Source, ganti path hard-coded dengan parameter melalui formula atau menu parameter.
4. Uji Change Value ke folder salinan dan refresh.
5. Dokumentasikan nilai parameter dan batas akses di sheet Cara Pakai.

## Mengapa Ini Bekerja

Parameter memisahkan konfigurasi dari langkah transformasi. Query tetap sama ketika nilai konfigurasi berubah.

## Kesalahan Umum

- Parameter bertipe Text tetapi dipakai sebagai Date atau Folder Path secara tidak tepat.
- Folder berisi file dengan struktur berbeda sehingga langkah gabungan gagal.

## Diagnosis

Lihat Manage Parameters, Source step, dan preview daftar file sebelum transformasi lanjutan.

## Cara Memperbaiki

Betulkan tipe parameter, uji dengan folder kecil yang homogen, dan tambahkan filter nama file secara eksplisit.

## Kompatibilitas dan Alternatif Versi Lama

Parameter tersedia pada Power Query modern di Excel desktop. Excel web dan Google Sheets tidak dapat diasumsikan mendukung alur parameter yang sama.

Alternatif untuk Excel lama: Simpan path di named cell dan baca dengan konektor yang mendukungnya, tetapi uji keamanan dan refresh secara khusus.

## Batasan

Parameter tidak memberi izin akses; pengguna tetap memerlukan hak baca pada folder atau file sumber.

## Langkah Praktis Berikutnya

Gunakan folder dummy untuk menguji error sebelum mengarahkan parameter ke sumber operasional.

## Related Resources

- Template: [template-laporan-penjualan-harian-umkm](/templates/)
- Panduan: [panduan-power-query-data-asli](/panduan/), [panduan-power-query-append](/panduan/)
- Rumus: [rumus-iferror-template-rapi](/rumus-excel/)
- Troubleshooting: [masalah-file-excel-berantakan-google-sheets](/masalah-excel/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
