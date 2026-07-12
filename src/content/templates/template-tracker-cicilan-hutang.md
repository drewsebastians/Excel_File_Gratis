---
title: "Template Tracker Cicilan dan Hutang Excel Gratis"
meta_title: "Template Tracker Cicilan dan Hutang Excel Gratis"
meta_description: "Download template tracker cicilan dan hutang Excel gratis untuk mencatat nominal awal, pembayaran, sisa tagihan, jatuh tempo, dan status."
slug: "template-tracker-cicilan-hutang"
focus_keyword: "template tracker cicilan dan hutang excel"
preview_image: "/assets/templates/template-tracker-cicilan-hutang.png"
preview_alt: "Ringkasan tracker cicilan dan hutang dengan total nominal, pembayaran, sisa, status, dan grafik"
featured: false
draft: false
category: "keuangan-pribadi"
tags: ["cicilan", "hutang", "pencatatan pribadi", "template excel gratis"]
date: "2026-07-12"
updated_date: "2026-07-12"
file_name: "template-tracker-cicilan-hutang.xlsx"
file_size: "11 KB"
suggested_h1: "Template Tracker Cicilan dan Hutang Excel Gratis"
usage_heading: "Cara Pakai Tracker Cicilan"
ringkasan_singkat: "Template ini membantu pencatatan pribadi untuk melihat nominal awal, pembayaran yang tercatat, sisa, jatuh tempo, dan status item cicilan atau hutang."
file_spec:
  sheets: 4
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel 2019 atau lebih baru dan Google Sheets"
batasan:
  - "Template hanya untuk pencatatan dan tidak memberi saran pelunasan, bunga, atau keputusan keuangan."
  - "Status jatuh tempo mengikuti tanggal perangkat saat file dihitung ulang."
related_templates: ["template-budget-bulanan", "template-arus-kas-umkm"]
---

Tracker ini dibuat untuk orang yang ingin menyimpan catatan cicilan atau hutang dalam satu file, bukan untuk memberi rekomendasi keuangan. Anda memasukkan data tagihan dan pembayaran, lalu file menghitung sisa per item serta totalnya.

## Fitur Utama

Daftar Cicilan mencatat ID, pemberi tagihan, keterangan, nominal awal, jatuh tempo, pembayaran tercatat, sisa, dan status. Catatan Pembayaran menyimpan setiap pembayaran sebagai baris terpisah. Ringkasan mengumpulkan total nominal, total pembayaran, total sisa, jumlah item berjalan, item lewat jatuh tempo, serta grafik sisa per item.

## Cara Pakai Tracker Cicilan

1. Tambahkan satu baris pada **Daftar Cicilan** untuk tiap kewajiban yang ingin dicatat.
2. Beri ID singkat yang unik, misalnya `CIC-005`.
3. Masukkan setiap pembayaran pada **Catatan Pembayaran** dengan ID yang sama.
4. Buka **Ringkasan** untuk memeriksa total sisa dan status.
5. Cocokkan tanggal, nominal, dan status dengan dokumen atau pemberi tagihan yang sebenarnya.

## Contoh Alur Penggunaan

Contoh file berisi tiga item aktif dengan total nominal awal Rp2.500.000. Empat catatan pembayaran berjumlah Rp800.000, sehingga total sisa contoh menjadi Rp1.700.000. Setiap pembayaran akan dijumlahkan memakai ID cicilan yang sesuai.

## Rumus dan Logika

Kolom Pembayaran Tercatat menggunakan `SUMIFS` untuk menjumlahkan nominal pembayaran berdasarkan ID. Sisa adalah nominal awal dikurangi pembayaran. Status menggunakan `IF`: Lunas jika sisa 0, Lewat jatuh tempo jika tanggal lewat dan masih ada sisa, atau Berjalan bila belum.

Gunakan [rumus SUMIFS](/rumus-excel/matematika/rumus-sumifs-rekap-kategori/) untuk memahami rekap per ID. Jika hasil formula terlihat tidak masuk akal karena sel kosong atau pembagian, baca [IFERROR untuk template yang lebih rapi](/rumus-excel/logika/rumus-iferror-template-rapi/).

## Tips Modifikasi

Simpan ID secara konsisten; satu perbedaan huruf atau tanda minus membuat pembayaran tidak terhubung. Hindari memasukkan nominal pembayaran negatif. Bila sebuah pembayaran melebihi nominal awal, periksa kembali sebelum memakai ringkasan sebagai catatan.

## Batasan Template

Template tidak menghitung bunga, denda, jadwal pelunasan, atau hak dan kewajiban hukum. Status memakai tanggal perangkat dan perlu diperiksa ulang bila file dibuka di waktu yang berbeda.

## Pertanyaan yang Sering Ditanyakan (FAQ)

**Apakah file ini memberi strategi melunasi hutang?**

Tidak. File hanya membantu mencatat data yang Anda masukkan.

**Mengapa pembayaran saya belum mengurangi sisa?**

Pastikan ID pada Catatan Pembayaran sama persis dengan ID pada Daftar Cicilan.

**Apakah bisa menambah item baru?**

Bisa. Salin baris terakhir, beri ID baru, lalu periksa formula dan statusnya.

**Mengapa status dapat berubah saat dibuka lagi?**

Status membandingkan jatuh tempo dengan tanggal perangkat saat formula dihitung ulang.
