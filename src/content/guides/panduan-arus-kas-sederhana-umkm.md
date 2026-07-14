---
title: "Cara Membaca Arus Kas Sederhana untuk UMKM"
meta_title: "Cara Membaca Arus Kas Sederhana untuk UMKM"
meta_description: "Panduan membaca arus kas sederhana UMKM di Excel: bedakan uang masuk dan keluar, cek saldo, rekap kategori, serta batasannya."
slug: "panduan-arus-kas-sederhana-umkm"
summary: "Arus kas sederhana membantu UMKM membaca pergerakan uang yang benar-benar masuk dan keluar pada periode tertentu, tanpa menyamakannya dengan laba atau laporan pajak."
category: "pengolahan-data"
difficulty: "pemula"
estimated_time: "10 menit"
prerequisites: ["Daftar transaksi kas", "Tanggal dan nominal yang dicatat konsisten"]
excel_versions: ["Microsoft Excel 2019 atau lebih baru", "Google Sheets"]
tags: ["arus kas umkm", "cash flow sederhana", "pencatatan usaha"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: true
draft: false
related_templates: ["template-arus-kas-umkm", "template-laporan-penjualan-harian-umkm", "template-pengeluaran-harian"]
related_guides: ["panduan-rekap-penjualan-harian-excel", "panduan-dashboard-sederhana-excel"]
related_formulas: ["rumus-sumifs-rekap-kategori", "rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-angka-tidak-terjumlah-format-teks", "masalah-sumifs-countifs-hasil-nol"]
---

Arus kas menjawab pertanyaan sederhana: uang usaha masuk dari mana, keluar untuk apa, dan berapa yang tersisa dari catatan tersebut. Ini berbeda dari laba. Usaha bisa mencatat penjualan, tetapi uangnya belum tentu sudah diterima pada hari yang sama.

## 1. Pisahkan Uang Masuk dan Keluar

Catat uang masuk saat uang benar-benar diterima, misalnya pembayaran pelanggan atau pengembalian dana. Catat uang keluar saat kas dibayarkan, misalnya belanja bahan, ongkir, atau biaya operasional. Jangan memakai tanda minus sebagai satu-satunya pembeda; gunakan kolom jenis arus agar rekap mudah diaudit.

## 2. Mulai dengan Saldo Awal yang Jelas

Saldo awal adalah nilai kas yang dipilih sebagai titik mulai periode. Rumus sederhana adalah `saldo akhir = saldo awal + total masuk - total keluar`. Bila saldo berbeda dari uang nyata, jangan langsung mengubah angka ringkasan. Telusuri transaksi yang belum tercatat atau salah kategori terlebih dahulu.

## 3. Baca Rekap per Kategori

Kelompokkan pengeluaran yang memang berguna untuk usaha, seperti bahan baku dan operasional. Rekap kategori membantu melihat pola, tetapi bukan penilaian otomatis apakah biaya tersebut baik atau buruk. [SUMIFS](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/) cocok untuk menjumlahkan nominal berdasarkan jenis arus dan kategori.

## 4. Bedakan Penjualan, Piutang, dan Kas

Penjualan yang belum dibayar pelanggan dapat penting untuk usaha, tetapi belum menjadi kas. Simpan penanda atau catatan terpisah untuk piutang bila diperlukan. Jangan menambahkannya ke uang masuk hanya karena invoice sudah dibuat.

## 5. Lakukan Pemeriksaan Berkala

Pada akhir minggu atau bulan, cocokkan jumlah dengan bukti transaksi dan saldo yang tersedia. Periksa tanggal, kategori, dan nominal sebelum memakai hasil rekap untuk percakapan operasional. Gunakan [template arus kas UMKM](/templates/bisnis-umkm/template-arus-kas-umkm/) untuk pola pencatatan awal.

## Batasan

Panduan ini bersifat edukasi pencatatan. Arus kas sederhana bukan laporan laba rugi, neraca, laporan pajak, audit, maupun saran akuntansi. Untuk kewajiban formal atau keputusan material, gunakan data sumber dan bantuan profesional yang sesuai.
