---
title: "Template Stok Barang Excel Gratis untuk UMKM, Toko & Inventory Sederhana"
meta_title: "Template Stok Barang Excel Gratis untuk UMKM & Inventory Toko"
meta_description: "Download template stok barang Excel gratis untuk mencatat stok masuk, stok keluar, retur, minimum stock, status restock, dan nilai persediaan UMKM."
slug: "template-stok-barang-excel-gratis"
focus_keyword: "stok barang"
preview_alt: "Dashboard template stok barang Excel gratis untuk UMKM dengan stok masuk, stok keluar, status restock, dan nilai persediaan"
category: "bisnis-umkm"
tags: ["stok barang", "inventaris umkm", "template excel gratis", "manajemen stok"]
date: "2026-07-07"
file_name: "template-stok-barang-excel-gratis.xlsx"
file_size: "54 KB"
suggested_h1: "Template Stok Barang Excel Gratis untuk UMKM, Toko & Inventory Sederhana"
preview_heading: "Preview Dashboard Template Stok Barang Excel"
usage_heading: "Cara Menggunakan Template Stok Barang Excel"
ringkasan_singkat: "Download template stok barang Excel gratis untuk mencatat stok masuk, stok keluar, retur, stok akhir, minimum stock, status restock, dan nilai persediaan secara otomatis. Template ini cocok untuk UMKM, toko sembako, toko online, usaha makanan, reseller, dan bisnis kecil yang ingin mengelola inventory tanpa software berbayar.\n\nCukup isi master barang, stok awal, minimum stock, harga beli, dan transaksi harian di sheet Log Transaksi. Dashboard otomatis akan membantu melihat total nilai persediaan, barang yang perlu direstock, serta distribusi nilai stok per kategori. Misalnya, toko sembako yang menjual beras, gula, minyak goreng, dan deterjen bisa langsung mengetahui saat deterjen masuk status \"Stok Menipis\", sehingga pemilik toko dapat memutuskan barang mana yang perlu dipesan ulang tanpa menghitung manual satu per satu."
file_spec:
  sheets: 4
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel & Google Sheets"
batasan:
  - "Perhitungan stok akhir sepenuhnya bergantung pada kedisiplinan mencatat di sheet Log Transaksi — kalau ada transaksi yang lupa dicatat, angkanya otomatis meleset."
  - "Untuk UMKM dengan ratusan jenis barang, banyak cabang, atau kebutuhan integrasi kasir otomatis, template ini akan terasa terbatas dan lebih cocok digantikan software inventory khusus."
interactive_tool:
  type: "calculator"
  title: "Simulasi Titik Pemesanan Ulang (Reorder Point)"
  config:
    inputs:
      - id: "pemakaian_harian"
        label: "Rata-rata pemakaian/penjualan harian"
        type: "number"
        default: 10
      - id: "lead_time"
        label: "Lead time pengiriman dari supplier (hari)"
        type: "number"
        default: 5
      - id: "safety_stock"
        label: "Stok pengaman (safety stock)"
        type: "number"
        default: 20
    formula: "reorder_point = (pemakaian_harian * lead_time) + safety_stock"
    output_label: "Titik Pemesanan Ulang (Reorder Point)"
---

Kalau selama ini stok barang cuma dicatat di buku tulis atau diingat-ingat saja, wajar kalau sering kejadian barang laris tiba-tiba habis atau sebaliknya menumpuk kelamaan di rak. Template stok barang Excel ini dibuat supaya UMKM bisa mencatat barang masuk, keluar, dan retur dengan rapi, lalu stok akhir serta nilai persediaan terhitung otomatis — tanpa perlu langganan aplikasi kasir atau software gudang.

## Kenapa Pencatatan Stok Barang Ini Penting untuk UMKM

Banyak usaha kecil kehilangan uang bukan karena rugi jualan, tapi karena stok yang tidak terpantau: barang kadaluarsa karena kelamaan mengendap, modal terkunci di barang yang tidak laku, atau justru kehabisan barang best-seller di saat ramai pembeli. Pencatatan stok barang yang konsisten membantu pemilik usaha tahu persis kapan harus restock, barang mana yang paling banyak menyerap modal, dan apakah ada selisih yang perlu dicek (misalnya karena rusak atau hilang). Dengan data yang rapi, keputusan belanja stok jadi berbasis angka, bukan perkiraan.

## Spesifikasi File

Template ini terdiri dari 4 sheet yang saling terhubung:

- **Cara Pakai** — panduan singkat langkah demi langkah
- **Data Barang** — master data barang lengkap dengan kategori, satuan, harga beli, dan perhitungan otomatis stok masuk/keluar/retur, stok akhir, status, serta nilai persediaan
- **Log Transaksi** — catatan harian setiap transaksi barang masuk, keluar, dan retur, dalam format Excel Table agar mudah difilter dan disortir
- **Ringkasan Dashboard** — ringkasan total nilai persediaan, jumlah barang yang perlu direstock, dan grafik distribusi nilai persediaan per kategori

Fitur teknis yang sudah tertanam: rumus SUMIFS untuk agregasi transaksi per barang, VLOOKUP untuk auto-isi nama barang dari kode, dropdown kategori dan jenis transaksi supaya input tetap konsisten, conditional formatting warna merah/hijau untuk status stok, grafik bar dan pie chart otomatis, serta proteksi ringan pada sel berisi rumus agar tidak sengaja terhapus. Format currency sudah diatur ke Rupiah dan kompatibel dibuka di Microsoft Excel maupun Google Sheets.

## Cara Pakai

1. Buka sheet **Data Barang**, lalu isi kolom biru: kode barang, nama barang, kategori (pilih dari dropdown), satuan, stok awal, minimum stock, dan harga beli per unit.
2. Setiap ada transaksi barang masuk, keluar, atau retur, tambahkan satu baris baru di sheet **Log Transaksi**. Pilih kode barang dan jenis transaksi dari dropdown, lalu isi jumlah dan keterangan singkat.
3. Nama barang di Log Transaksi akan otomatis terisi begitu kode barang dipilih — tidak perlu ketik ulang.
4. Kembali ke sheet **Data Barang** untuk melihat stok masuk, keluar, retur, stok akhir, status, dan nilai persediaan yang sudah terhitung otomatis.
5. Buka sheet **Ringkasan Dashboard** untuk memantau total nilai persediaan dan grafik distribusi nilai per kategori barang.

## Contoh Isian Data

Berikut contoh isian di sheet Data Barang yang sudah disiapkan di dalam template sebagai referensi:

| Kode Barang | Nama Barang | Kategori | Stok Awal | Min. Stock | Harga Beli/Unit |
|---|---|---|---|---|---|
| BRG001 | Beras 5kg | Bahan Baku | 50 | 10 | Rp 65.000 |
| BRG003 | Minyak Goreng 1L | Bahan Baku | 80 | 15 | Rp 18.000 |
| BRG007 | Kopi Bubuk 200g | Barang Jadi | 40 | 10 | Rp 12.000 |
| BRG010 | Deterjen Bubuk 1kg | Lainnya | 35 | 10 | Rp 15.000 |

Setelah beberapa transaksi masuk-keluar dicatat di Log Transaksi, kolom stok akhir dan status pada baris-baris ini akan otomatis menyesuaikan.

## Tips Modifikasi

- Untuk menambah barang baru, tambahkan baris baru di sheet Data Barang, lalu perbarui daftar dropdown kode barang di Log Transaksi lewat menu Data > Data Validation agar kode barang baru ikut muncul di pilihan.
- Kalau kategori bisnis kamu berbeda (misalnya fashion atau elektronik), ganti saja daftar pilihan dropdown kategori sesuai jenis barang yang dijual — struktur rumus tidak perlu diubah.
- Untuk usaha dengan banyak cabang, template ini bisa diduplikasi per cabang, lalu nilai persediaan dari tiap file digabung manual di rekap terpisah.

## Batasan Template

Template ini sangat bergantung pada kedisiplinan mencatat transaksi — kalau ada barang masuk atau keluar yang lupa dimasukkan ke Log Transaksi, angka stok akhir otomatis tidak akan mencerminkan kondisi sebenarnya. Selain itu, untuk UMKM dengan ratusan jenis barang, banyak cabang, atau yang butuh integrasi langsung dengan mesin kasir, template berbasis Excel ini akan terasa terbatas dan lebih cocok digantikan software inventory khusus.

## Pertanyaan yang Sering Ditanyakan (FAQ)

**Apakah template stok barang ini gratis?**
Ya, template ini bisa diunduh dan dipakai gratis untuk kebutuhan pencatatan stok UMKM sehari-hari.

**Apakah bisa dibuka di Google Sheets, bukan cuma Excel?**
Bisa. Template ini dirancang agar rumus dan formatnya tetap berfungsi normal saat diunggah dan dibuka di Google Sheets.

**Apakah cocok untuk toko dengan ratusan jenis barang?**
Untuk puluhan hingga sekitar seratus jenis barang, template ini masih nyaman dipakai. Untuk skala yang jauh lebih besar, disarankan mempertimbangkan software inventory khusus.

**Bagaimana kalau saya salah mencatat jumlah transaksi?**
Cukup edit baris transaksi yang salah di sheet Log Transaksi — seluruh perhitungan di Data Barang dan Ringkasan Dashboard akan otomatis menyesuaikan.

**Apakah perlu tahu rumus Excel untuk memakai template ini?**
Tidak perlu. Semua rumus sudah disiapkan; kamu hanya perlu mengisi kolom berwarna biru dan mencatat transaksi seperti biasa.

**Apakah template stok barang ini bisa dipakai untuk toko online?**
Bisa. Template ini dapat digunakan untuk mencatat stok produk toko online, reseller, atau usaha kecil selama transaksi masuk dan keluar dicatat secara konsisten.

**Apakah template ini bisa menghitung nilai persediaan?**
Bisa. Nilai persediaan dihitung dari stok akhir dan harga beli per unit yang diisi di master data barang.

Download template stok barang Excel gratis ini dan mulai pantau stok masuk, stok keluar, barang menipis, dan nilai persediaan UMKM-mu dengan lebih rapi.
