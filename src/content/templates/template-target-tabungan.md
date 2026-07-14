---
title: "Template Target Tabungan Excel Gratis"
meta_title: "Template Target Tabungan Excel Gratis"
meta_description: "Download template target tabungan Excel gratis untuk mencatat saldo awal, setoran, sisa target, progres, dan status tanggal target."
slug: "template-target-tabungan"
focus_keyword: "template target tabungan excel"
preview_image: "/assets/templates/template-target-tabungan.png"
preview_alt: "Ringkasan target tabungan dengan total terkumpul, sisa, dan grafik progres"
featured: true
draft: false
category: "keuangan-pribadi"
tags: ["target tabungan", "catatan setoran", "progres target", "template excel gratis"]
date: "2026-07-14"
updated_date: "2026-07-14"
file_name: "template-target-tabungan.xlsx"
file_size: "12 KB"
suggested_h1: "Template Target Tabungan Excel Gratis"
usage_heading: "Cara Pakai Target Tabungan"
ringkasan_singkat: "Tulis nominal target dan saldo awal, lalu catat setoran untuk melihat total terkumpul, sisa, progres, serta status target secara sederhana."
file_spec:
  sheets: 4
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel 2019 atau lebih baru dan Google Sheets"
batasan:
  - "Template ini adalah alat pencatatan pribadi, bukan saran investasi atau rekomendasi produk keuangan."
  - "Status target dihitung dari data yang diisi dan tidak menjamin hasil atau kemampuan menabung."
related_templates: ["template-budget-bulanan", "template-tracker-cicilan-hutang", "template-pembukuan-pengeluaran-usaha"]
---

Template Target Tabungan membantu memisahkan target dan setoran yang sudah tercatat. Gunakan satu ID untuk satu target, kemudian pilih ID tersebut saat menambah setoran. Rumus akan menjumlahkan setoran tanpa perlu memindah angka ke ringkasan.

## Isi dan Fitur Workbook

- **Cara Pakai** menjelaskan alur input dan batasan.
- **Daftar Target** memuat nama target, nominal, tanggal, saldo awal, setoran, sisa, progres, status, dan peringatan input.
- **Catatan Setoran** adalah log tanggal, ID target, metode, nominal, dan referensi.
- **Ringkasan** menampilkan total target, total terkumpul, total sisa, jumlah target tercapai, target lewat tanggal, serta grafik progres.

## Cara Pakai Target Tabungan

1. Di **Daftar Target**, isi ID, nama target, nominal target, dan saldo awal bila ada.
2. Isi tanggal target hanya bila memang ingin memantau batas waktu. Target tanpa tanggal akan diberi label yang jelas, bukan dianggap terlambat.
3. Catat setoran positif di **Catatan Setoran** dan pilih ID target yang sama.
4. Jangan mengubah kolom Setoran, Total Terkumpul, Sisa, Progres, atau Status karena kolom tersebut dihitung otomatis.
5. Periksa **Ringkasan** untuk melihat gambaran seluruh target.

## Rumus dan Logika

Setoran per target dihitung dengan `SUMIFS`. Total terkumpul adalah saldo awal ditambah setoran tercatat. Sisa memakai `MAX(0,Target-Total Terkumpul)` agar tampilan sisa tidak berubah menjadi negatif ketika setoran melebihi target. Status membedakan target kosong, target belum valid, tercapai, berjalan, lewat target, dan target tanpa tanggal.

## Tepi Kasus yang Ditangani

Nominal negatif dicegah oleh validasi input. Tanggal target yang kosong tidak memicu status terlambat. Bila target belum diisi, workbook menampilkan `Belum diisi` atau `Target belum valid`, sehingga baris kosong tidak terlihat seperti target yang gagal.

## Batasan Template

Template ini tidak membuat rekomendasi jumlah setoran, tempat menyimpan uang, atau pilihan investasi. Ia hanya merangkum angka yang Anda catat. Untuk membiasakan catatan pengeluaran, gunakan juga [template budget bulanan](/templates/keuangan-pribadi/template-budget-bulanan/).

## FAQ

**Apakah saldo awal boleh nol?**

Boleh. Isi 0 bila target belum memiliki saldo awal.

**Mengapa target saya lewat tanggal?**

Status tersebut muncul bila tanggal target sudah lewat, target belum tercapai, dan data target valid.

**Bolehkah setoran melebihi target?**

Boleh dicatat. Kolom peringatan akan memberi tahu bahwa total terkumpul sudah melebihi nominal target.
