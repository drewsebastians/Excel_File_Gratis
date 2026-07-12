---
title: "Rumus IFERROR untuk Template Excel yang Lebih Rapi"
formula_name: "IFERROR"
meta_title: "Rumus IFERROR untuk Template Excel yang Lebih Rapi"
meta_description: "Pelajari IFERROR di Excel untuk menangani kesalahan formula dengan aman, termasuk contoh pembagian, lookup, dan kapan tidak boleh menyembunyikan error."
slug: "rumus-iferror-template-rapi"
summary: "IFERROR menampilkan nilai pengganti ketika sebuah formula menghasilkan kesalahan, tetapi tidak seharusnya dipakai untuk menyembunyikan masalah data."
syntax: "=IFERROR(value, value_if_error)"
category: "logika"
difficulty: "pemula"
excel_versions: ["Microsoft Excel 2007 atau lebih baru", "Google Sheets"]
tags: ["iferror", "rumus excel", "menangani error"]
date: "2026-07-12"
updated_date: "2026-07-12"
featured: false
draft: false
related_templates: ["template-laporan-penjualan-harian-umkm", "template-tracker-cicilan-hutang", "template-invoice-penjualan-umkm"]
related_guides: ["panduan-rekap-penjualan-harian-excel", "panduan-dashboard-sederhana-excel"]
related_formulas: ["rumus-sumifs-rekap-kategori"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol"]
---

## Tujuan

`IFERROR` menguji hasil formula. Bila hasilnya kesalahan seperti `#DIV/0!` atau `#N/A`, fungsi ini menampilkan nilai pengganti yang Anda tentukan.

## Sintaks dan Argumen

`value` adalah formula yang ingin diuji. `value_if_error` adalah hasil yang ditampilkan bila formula pertama gagal. Gunakan 0 untuk perhitungan yang memang pantas dianggap nol, atau teks singkat bila pengguna perlu mengetahui data belum siap.

## Contoh 1: Rata-rata Saat Tabel Masih Kosong

`=IFERROR(B3/B4,0)` menampilkan 0 jika jumlah transaksi B4 masih 0. Ini sesuai untuk kartu KPI pada dashboard yang belum memiliki data.

## Contoh 2: Lookup yang Belum Menemukan Data

`=IFERROR(XLOOKUP(A2,Data!A:A,Data!B:B),"Belum ditemukan")` dapat menampilkan pesan jelas bila kode belum ada. Pastikan penyebabnya tetap diperiksa; pesan ini bukan bukti bahwa kodenya benar.

## Contoh 3: Persentase Realisasi

`=IFERROR(C2/B2,0)` menghindari `#DIV/0!` bila target B2 masih kosong atau 0. Formatkan hasil sebagai persentase setelah formula bekerja.

## Tepi Kasus dan Kesalahan Umum

IFERROR akan menangkap semua jenis kesalahan, sehingga dapat menutupi `#REF!` akibat referensi rusak. Jangan membungkus formula penting dengan IFERROR sebelum memahami sumber kesalahannya. Untuk `SUMIFS` yang bernilai 0, IFERROR tidak dibutuhkan karena 0 adalah hasil sah.

## Kompatibilitas dan Alternatif

IFERROR tersedia di Excel modern dan Google Sheets. Bila hanya ingin menangani `#N/A`, gunakan `IFNA` agar kesalahan lain tetap terlihat. Untuk logika biasa tanpa error, gunakan `IF`.

## Sumber Resmi

Microsoft mendokumentasikan fungsi ini di [IFERROR function](https://support.microsoft.com/en-us/office/iferror-function-c526fd07-caeb-47b8-8bb6-63f3e417f611).
