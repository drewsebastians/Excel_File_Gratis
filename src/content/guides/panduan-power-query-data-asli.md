---
title: "Power Query untuk Membersihkan Data Excel Tanpa Merusak Data Asli"
meta_title: "Power Query untuk Membersihkan Data Excel Tanpa Merusak Data Asli"
meta_description: "Membuat alur Power Query yang memisahkan sumber mentah dari hasil bersih sehingga data asli tetap menjadi bahan audit."
slug: "panduan-power-query-data-asli"
summary: "Membuat alur Power Query yang memisahkan sumber mentah dari hasil bersih sehingga data asli tetap menjadi bahan audit."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "18 menit"
prerequisites: ["Excel desktop dengan Power Query","Satu Table sumber yang dianonimkan"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021","Microsoft Excel 2019"]
tags: ["Power Query","clean data","data asli"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: true
related_templates: ["template-laporan-penjualan-harian-umkm"]
related_guides: ["panduan-power-query-append","panduan-excel-table-vs-range"]
related_formulas: ["rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-angka-tidak-terjumlah-format-teks"]
---

## Masalah yang Diselesaikan

Mengedit data impor langsung membuat perubahan sulit dilacak dan menyulitkan refresh berikutnya.

## Hasil yang Diharapkan

Data mentah tidak disentuh; transformasi tersimpan sebagai langkah query yang bisa di-refresh.

## Prasyarat

- Excel desktop dengan Power Query
- Satu Table sumber yang dianonimkan

## Contoh Input

```text
Table `tblRawSales` berisi tanggal, nama produk, dan total dengan beberapa spasi di nama produk.
```

## Langkah Praktik

1. Ubah sumber menjadi Table dan beri nama `tblRawSales`.
2. Pilih Data > From Table/Range lalu simpan query sebagai `qRawSales`.
3. Gunakan Transform > Format > Trim pada kolom teks dan ubah tipe data secara eksplisit.
4. Rename query hasil menjadi `qSalesClean` dan Close & Load ke sheet baru.
5. Tambahkan satu baris pada sumber, lalu Refresh All untuk menguji alurnya.

## Mengapa Ini Bekerja

Power Query menyimpan sumber dan transformasi terpisah. Refresh mengulang langkah terhadap sumber terbaru, bukan terhadap hasil yang sudah dimuat.

## Kesalahan Umum

- Pengguna mengedit hasil query lalu mengira perubahan akan kembali ke sumber.
- Nama kolom berubah sehingga langkah berikutnya gagal.

## Diagnosis

Buka Applied Steps dan klik langkah satu per satu. Periksa Source dan Changed Type sebelum memperbaiki langkah lanjutan.

## Cara Memperbaiki

Kembalikan sumber ke data mentah, ubah langkah yang gagal, lalu refresh dari awal.

## Kompatibilitas dan Alternatif Versi Lama

Power Query tersedia pada Excel 2016 ke atas dengan tingkat fitur yang berbeda. Google Sheets tidak menjalankan query M secara native.

Alternatif untuk Excel lama: Gunakan kolom bantu dan salinan data jika Power Query tidak tersedia, sambil menyimpan sumber mentah terpisah.

## Batasan

Query bukan backup; simpan salinan sumber dan dokumentasikan kredensial atau lokasi file secara aman.

## Langkah Praktis Berikutnya

Buat kolom `source_file` atau `source_date` pada data mentah agar asal setiap baris tetap dapat dilacak.

## Related Resources

- Template: [template-laporan-penjualan-harian-umkm](/templates/)
- Panduan: [panduan-power-query-append](/panduan/), [panduan-excel-table-vs-range](/panduan/)
- Rumus: [rumus-iferror-template-rapi](/rumus-excel/)
- Troubleshooting: [masalah-angka-tidak-terjumlah-format-teks](/masalah-excel/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
