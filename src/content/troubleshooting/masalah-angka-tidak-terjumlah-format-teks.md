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

Jika `SUM` melewati angka tertentu, periksa apakah nilai tersebut disimpan sebagai teks sebelum mengubah rumusnya.

## Coba Ini Terlebih Dahulu

1. Klik sel yang tidak ikut dijumlahkan dan lihat perataan atau indikator errornya.
2. Bandingkan dengan satu sel angka yang bekerja.
3. Gunakan konversi yang sesuai, misalnya peringatan **Convert to Number** atau operasi angka pada salinan data.
4. Jalankan ulang total dan cocokkan dengan beberapa baris sumber.

## Penyebab yang Paling Sering

Teks yang tampak seperti angka tidak selalu diperlakukan sebagai angka oleh Excel. Spasi tersembunyi, apostrof awal, dan pemisah desimal dapat menjadi penyebab.

## Sebelum Mengubah Data

Buat salinan sebelum mengonversi data penting. Jangan mengganti nilai sumber tanpa mengetahui format asalnya.

## Bantuan Terkait

[rumus SUMIFS](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/) dan [audit rumus Excel](/panduan/pengolahan-data/panduan-audit-rumus-excel/).
