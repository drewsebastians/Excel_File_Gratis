---
title: "Cara Audit Rumus Excel dengan Trace Precedents dan Evaluate Formula"
meta_title: "Cara Audit Rumus Excel dengan Trace Precedents dan Evaluate Formula"
meta_description: "Menelusuri sumber angka yang salah dengan Trace Precedents, Trace Dependents, dan Evaluate Formula pada contoh rekap sederhana."
slug: "panduan-audit-rumus-excel"
summary: "Menelusuri sumber angka yang salah dengan Trace Precedents, Trace Dependents, dan Evaluate Formula pada contoh rekap sederhana."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "16 menit"
prerequisites: ["Workbook dengan beberapa rumus","Excel desktop untuk menu Formula Auditing"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021","Microsoft Excel 2019"]
tags: ["audit rumus","debug excel","belajar excel"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: true
related_templates: ["template-laporan-penjualan-harian-umkm"]
related_guides: ["panduan-file-excel-rapi-untuk-dipakai-rutin"]
related_formulas: ["rumus-iferror-template-rapi","rumus-countifs-dashboard-status"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol","masalah-angka-tidak-terjumlah-format-teks"]
---

## Masalah yang Diselesaikan

Nilai total dapat salah karena referensi bergeser, angka tersimpan sebagai teks, atau kriteria tidak cocok.

## Hasil yang Diharapkan

Kamu dapat menunjukkan sel sumber yang memengaruhi hasil dan mempersempit lokasi kesalahan.

## Prasyarat

- Workbook dengan beberapa rumus
- Excel desktop untuk menu Formula Auditing

## Contoh Input

```text
B2=120000, C2=3, D2=`=B2*C2`, E2=`=SUM(D2:D10)`
```

## Langkah Praktik

1. Klik sel hasil yang mencurigakan, misalnya E2.
2. Buka Formulas > Trace Precedents untuk melihat sel sumber.
3. Gunakan Trace Dependents pada sel input untuk melihat hasil yang bergantung padanya.
4. Buka Evaluate Formula dan jalankan evaluasi satu langkah demi satu langkah.
5. Hapus panah audit setelah selesai agar workbook tetap bersih.

## Mengapa Ini Bekerja

Trace menunjukkan hubungan referensi, sedangkan Evaluate Formula memperlihatkan urutan evaluasi ekspresi. Keduanya membantu membedakan salah data dari salah formula.

## Kesalahan Umum

- Panah tidak muncul karena formula memakai referensi eksternal atau sel yang tidak dapat ditelusuri.
- Evaluate Formula tidak menjelaskan seluruh query Power Query atau fungsi volatile secara visual.

## Diagnosis

Bandingkan formula bar, warna referensi, dan nilai input. Periksa apakah hasil antara sesuai hitungan manual pada satu baris.

## Cara Memperbaiki

Perbaiki referensi yang bergeser, ubah angka teks menjadi angka, lalu hitung ulang dengan F9.

## Kompatibilitas dan Alternatif Versi Lama

Formula Auditing dan Evaluate Formula terutama tersedia pada Excel desktop. Excel web memiliki dukungan menu yang lebih terbatas; Google Sheets memakai alat penelusuran berbeda.

Alternatif untuk Excel lama: Salin formula dan input contoh ke workbook uji kecil, kemudian pecah rumus panjang menjadi kolom bantu.

## Batasan

Audit visual tidak membuktikan bahwa definisi bisnisnya benar; tetap perlukan review data dan kebutuhan pengguna.

## Langkah Praktis Berikutnya

Tambahkan satu kasus uji yang hasilnya sudah diketahui sebelum mengubah formula produksi.

## Related Resources

- Template: [template-laporan-penjualan-harian-umkm](/templates/)
- Panduan: [panduan-file-excel-rapi-untuk-dipakai-rutin](/panduan/)
- Rumus: [rumus-iferror-template-rapi](/rumus-excel/), [rumus-countifs-dashboard-status](/rumus-excel/)
- Troubleshooting: [masalah-sumifs-countifs-hasil-nol](/masalah-excel/), [masalah-angka-tidak-terjumlah-format-teks](/masalah-excel/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
