---
title: "Template Arus Kas UMKM Excel Gratis"
meta_title: "Template Arus Kas UMKM Excel Gratis"
meta_description: "Download template arus kas UMKM Excel gratis untuk mencatat uang masuk dan keluar, saldo awal, saldo akhir, serta rekap pengeluaran kategori."
slug: "template-arus-kas-umkm"
focus_keyword: "template arus kas umkm excel"
preview_image: "/assets/templates/template-arus-kas-umkm.png"
preview_alt: "Ringkasan arus kas UMKM dengan saldo awal, uang masuk, uang keluar, saldo akhir, dan grafik pengeluaran"
featured: true
draft: false
category: "bisnis-umkm"
tags: ["arus kas umkm", "cash flow sederhana", "pencatatan usaha", "template excel gratis"]
date: "2026-07-12"
updated_date: "2026-07-12"
file_name: "template-arus-kas-umkm.xlsx"
file_size: "10 KB"
suggested_h1: "Template Arus Kas UMKM Excel Gratis"
usage_heading: "Cara Pakai Arus Kas"
ringkasan_singkat: "Gunakan file ini untuk mencatat uang masuk dan uang keluar usaha secara sederhana, lalu lihat saldo akhir serta pengeluaran per kategori di ringkasan bulanan."
file_spec:
  sheets: 4
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel 2019 atau lebih baru dan Google Sheets"
batasan:
  - "Template ini adalah catatan arus kas sederhana, bukan laporan keuangan atau laporan pajak."
  - "Saldo akhir akan keliru bila transaksi terlewat atau jenis arus salah dipilih."
related_templates: ["template-laporan-penjualan-harian-umkm", "template-invoice-penjualan-umkm", "template-budget-bulanan"]
---

Arus kas sederhana menjawab pertanyaan operasional yang praktis: berapa uang yang masuk, berapa yang keluar, dan berapa saldo yang tersisa pada periode yang dicatat. Template ini dibuat untuk UMKM yang ingin membangun kebiasaan mencatat transaksi kas tanpa menyamakan file ini dengan laporan keuangan formal.

## Isi dan Fitur Workbook

- **Cara Pakai** menjelaskan urutan pencatatan.
- **Catatan Arus Kas** berisi tabel tanggal, jenis arus, kategori, keterangan, metode, nominal, dan bulan.
- **Ringkasan Bulanan** menghitung saldo awal, total masuk, total keluar, dan saldo akhir dengan `SUMIFS`.
- **Referensi** menyediakan kategori contoh.

Jenis arus tersedia sebagai **Masuk** dan **Keluar**. Kategori contoh meliputi Penjualan, Bahan Baku, Operasional, dan Lainnya. Bagian ringkasan juga menampilkan grafik donat untuk melihat komposisi pengeluaran.

## Cara Pakai Arus Kas

1. Tentukan saldo awal pada sheet **Ringkasan Bulanan**.
2. Di **Catatan Arus Kas**, isi satu transaksi per baris.
3. Pilih Jenis Arus dan Kategori dari dropdown, lalu tulis nominal sebagai angka positif.
4. Periksa kolom Bulan yang terbentuk dari tanggal transaksi.
5. Pilih atau ketik periode yang ingin diperiksa di Ringkasan Bulanan.

## Contoh Alur Penggunaan

Dalam contoh Juli 2026, penjualan dan pengembalian dana menghasilkan Rp900.000 uang masuk. Belanja bahan serta biaya operasional berjumlah Rp200.000. Dengan saldo awal Rp1.000.000, saldo akhir contoh menjadi Rp1.700.000.

## Rumus dan Logika

Total masuk dan keluar memakai `SUMIFS` dengan dua kriteria: jenis arus serta bulan. Saldo akhir memakai rumus `=Saldo Awal+Total Masuk-Total Keluar`. Karena kriteria bulan diambil dari tanggal, pastikan setiap transaksi menggunakan nilai tanggal Excel yang valid.

Baca [rumus SUMIFS untuk rekap kategori](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/) dan [cara membuat dashboard sederhana](/panduan/pengolahan-data/panduan-dashboard-sederhana-excel/). Jika nominal tidak ikut dijumlahkan, lihat [angka tidak terjumlah karena format teks](/masalah-excel/format-data/masalah-angka-tidak-terjumlah-format-teks/).

## Tips Modifikasi

Pertahankan nominal sebagai angka positif dan gunakan kolom Jenis Arus untuk membedakan masuk atau keluar. Tambahkan kategori baru secara konsisten di dropdown, tabel transaksi, dan rekap pengeluaran. Jangan mencampur catatan pribadi dan usaha bila Anda ingin pembacaan arus kas lebih jelas.

## Batasan Template

File ini tidak menghitung laba, utang, pajak, atau nilai persediaan. Ini hanya alat pencatatan kas; cocokkan hasilnya dengan bukti transaksi dan saldo nyata secara berkala.

## Pertanyaan yang Sering Ditanyakan (FAQ)

**Apakah nominal pengeluaran ditulis minus?**

Tidak perlu. Isi nominal positif, lalu pilih Jenis Arus Keluar.

**Apakah bisa dipakai untuk bulan lain?**

Bisa. Masukkan transaksi dengan tanggal yang tepat dan ubah nilai Bulan di Ringkasan Bulanan.

**Mengapa saldo akhir berbeda dari uang nyata?**

Periksa transaksi yang belum dicatat, nominal yang salah, atau jenis arus yang keliru.

**Apakah ini laporan laba rugi?**

Bukan. Arus kas hanya mencatat pergerakan uang masuk dan keluar.
