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

## Gejala

Formula seperti `=SUMIFS(I4:I80,D4:D80,A10)` menampilkan 0, padahal Anda melihat transaksi berkategori sama. COUNTIFS dapat mengalami gejala serupa saat menghitung status atau tanggal.

## Kemungkinan Penyebab

Hasil 0 bisa benar bila tidak ada data yang cocok. Bila tidak, penyebab umum adalah ejaan kriteria tidak sama, spasi tersembunyi, `sum_range` dan `criteria_range` berbeda panjang, nominal tersimpan sebagai teks, atau tanggal sebenarnya berisi waktu.

## Langkah Diagnosis

1. Uji satu kriteria dulu dengan `=COUNTIF(D4:D80,A10)`.
2. Salin kriteria langsung dari sel data untuk menghilangkan kesalahan ketik.
3. Bandingkan batas awal dan akhir semua rentang. `I4:I80` harus seukuran dengan `D4:D80`.
4. Periksa `=ISNUMBER(I4)` pada kolom yang dijumlahkan.
5. Untuk tanggal, tampilkan format tanggal dan waktu; nilai dengan waktu dapat gagal cocok dengan tanggal yang hanya berisi hari.

## Solusi Berdasarkan Penyebab

Hapus spasi tambahan dengan `TRIM` pada kolom bantu bila teks berasal dari sumber lain. Samakan nama kategori di tabel dan rekap. Ubah nominal teks menjadi angka melalui langkah pada [angka tidak terjumlah karena format teks](/masalah-excel/format-data/masalah-angka-tidak-terjumlah-format-teks/). Untuk tanggal, pakai rentang kriteria, misalnya tanggal lebih besar atau sama dengan awal hari dan kurang dari hari berikutnya.

## Pencegahan

Gunakan dropdown untuk kategori atau metode pembayaran. [Template laporan penjualan](/templates/bisnis-umkm/template-laporan-penjualan-harian-umkm/) dan [template arus kas](/templates/bisnis-umkm/template-arus-kas-umkm/) menyediakan pilihan tersebut agar nama kriteria tidak berubah-ubah.

## Catatan Versi

SUMIFS dan COUNTIFS tersedia pada Excel modern dan Google Sheets. Pemisah argumen dapat berupa koma atau titik koma sesuai regional, tetapi konsep rentang serta kriteria tetap sama. Lihat [referensi SUMIFS](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/) untuk contoh formula yang lengkap.
