---
title: "Angka Excel Tidak Terjumlah karena Format Teks"
meta_title: "Angka Excel Tidak Terjumlah karena Format Teks"
meta_description: "Atasi angka Excel yang tidak terjumlah karena tersimpan sebagai teks dengan langkah diagnosis, perbaikan aman, pencegahan, dan catatan versi."
slug: "masalah-angka-tidak-terjumlah-format-teks"
summary: "Nilai yang tampak seperti angka dapat tersimpan sebagai teks, sehingga SUM dan SUMIFS mengabaikannya atau menghasilkan rekap yang keliru."
category: "format-data"
symptoms: ["SUM atau SUMIFS tidak memasukkan sebagian nominal", "Angka rata kiri atau memiliki peringatan segitiga hijau", "Mengubah format angka tidak memperbaiki nilai"]
excel_versions: ["Microsoft Excel 2019 atau lebih baru", "Google Sheets dengan langkah yang setara"]
tags: ["angka format teks", "excel tidak terjumlah", "sumifs"]
date: "2026-07-12"
updated_date: "2026-07-12"
featured: true
draft: false
related_templates: ["template-laporan-penjualan-harian-umkm", "template-arus-kas-umkm", "template-budget-bulanan"]
related_guides: ["panduan-rekap-penjualan-harian-excel", "panduan-dashboard-sederhana-excel"]
related_formulas: ["rumus-sumifs-rekap-kategori"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol"]
---

## Gejala

Anda sudah melihat `18000` pada sel, tetapi `SUM` atau `SUMIFS` tidak menambahkannya. Kadang angka rata kiri, muncul indikator peringatan, atau formula menghasilkan 0 padahal baris tampak cocok.

## Kemungkinan Penyebab

Nilai mungkin ditempel dari chat, PDF, atau sistem lain sebagai teks. Bisa juga ada spasi tersembunyi, apostrof di awal, pemisah ribuan yang tidak cocok dengan pengaturan regional, atau kolom yang sebelumnya diformat sebagai Text.

## Langkah Diagnosis

1. Klik sel lalu lihat apakah ada apostrof sebelum angka pada formula bar.
2. Gunakan `=ISNUMBER(A2)` pada sel kosong. Hasil FALSE berarti A2 bukan angka numerik.
3. Coba `=SUM(A2:A5)`. Jika hasilnya kurang dari jumlah yang terlihat, periksa setiap nilai dengan ISNUMBER.
4. Pastikan tidak ada simbol Rp, titik, atau spasi yang menjadi bagian teks mentah.

## Solusi

Untuk beberapa sel, pilih indikator peringatan lalu gunakan **Convert to Number**. Untuk satu kolom, gunakan Text to Columns dengan pengaturan yang sesuai atau kalikan nilai bersih dengan 1 di kolom bantu. Setelah itu, salin hasil sebagai nilai jika perlu. Jangan mengubah data asli tanpa salinan cadangan.

## Pencegahan

Masukkan nominal langsung sebagai angka dan terapkan format Rupiah dari menu format, bukan mengetik `Rp` sebagai bagian isi sel. Pada [template laporan penjualan](/templates/bisnis-umkm/template-laporan-penjualan-harian-umkm/), isi Harga Satuan dan Diskon sebagai angka; format tampilan sudah menangani Rupiah.

## Catatan Versi

Nama menu dapat berbeda pada Excel desktop, web, dan Google Sheets, tetapi prinsipnya sama: ubah nilai menjadi angka sungguhan sebelum rekap. Lanjutkan ke [rumus SUMIFS](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/) bila nilainya sudah numerik tetapi rekap masih tidak cocok.
