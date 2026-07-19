---
title: "Rumus COUNTIFS Excel untuk Menghitung Status dengan Banyak Kriteria"
formula_name: "COUNTIFS"
meta_title: "Rumus COUNTIFS Excel untuk Dashboard Status"
meta_description: "Gunakan rumus COUNTIFS Excel untuk menghitung tugas atau transaksi berdasarkan pemilik, status, dan kriteria lain, lengkap dengan contoh hasil."
slug: "rumus-countifs-dashboard-status"
summary: "COUNTIFS menghitung jumlah baris yang memenuhi beberapa kriteria, misalnya tugas milik satu orang yang belum selesai dan tidak kosong."
syntax: "=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)"
category: "matematika"
difficulty: "menengah"
excel_versions: ["Microsoft Excel 2007 atau lebih baru", "Google Sheets"]
tags: ["countifs", "dashboard status", "rumus excel"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: true
draft: false
related_templates: ["template-task-tracker-kanban-excel", "template-notulen-rapat-action-item", "template-pembukuan-pengeluaran-usaha"]
related_guides: ["panduan-dashboard-sederhana-excel", "panduan-dropdown-data-validation-excel"]
related_formulas: ["rumus-sumifs-rekap-kategori", "rumus-iferror-template-rapi"]
related_troubleshooting: ["masalah-sumifs-countifs-hasil-nol", "masalah-tanggal-salah-format-excel"]
---

`COUNTIFS` menghitung berapa baris yang memenuhi beberapa syarat sekaligus. Pada dashboard status, rumus ini dapat menjawab pertanyaan seperti “berapa tugas milik Sari yang belum selesai dan tidak kosong?” Tentukan satu rentang untuk setiap kriteria, samakan ukuran semua rentang, lalu gunakan label dashboard atau teks kondisi sebagai kriterianya.

## Sintaks COUNTIFS

`=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)`

- `criteria_range1` — rentang pertama yang diperiksa.
- `criteria1` — nilai atau kondisi untuk rentang pertama.
- `criteria_range2, criteria2` — pasangan syarat tambahan.

Semua rentang harus mempunyai jumlah baris dan kolom yang sama. Bila rentang Status adalah `E4:E200`, rentang Pemilik juga harus memakai batas yang setara, misalnya `D4:D200`.

## Contoh data

Misalkan kolom Tugas berada di B, Pemilik di D, Status di E, dan Status Jatuh Tempo di K.

| Baris | Tugas | Pemilik | Status | Status Jatuh Tempo |
|---:|---|---|---|---|
| 4 | Kirim proposal | Sari | Belum | Lewat jatuh tempo |
| 5 | Review harga | Sari | Selesai | Tepat waktu |
| 6 | Hubungi pelanggan | Budi | Belum | Tepat waktu |
| 7 |  | Sari |  |  |

Misalkan sel `A11` berisi `Sari`.

## Menghitung tugas terbuka per pemilik

Gunakan:

`=COUNTIFS($D$4:$D$7,A11,$E$4:$E$7,"<>Selesai",$B$4:$B$7,"<>")`

Hasilnya **1**. Baris 4 memenuhi ketiga syarat: pemiliknya Sari, statusnya bukan Selesai, dan nama tugas tidak kosong. Baris 7 tidak ikut dihitung karena kolom Tugas kosong.

## Menghitung status tertentu

Untuk menghitung seluruh tugas berstatus Selesai:

`=COUNTIFS($E$4:$E$7,"Selesai")`

Hasilnya **1**. Bila hanya ada satu kriteria, `COUNTIF` juga dapat digunakan dengan rumus yang lebih ringkas.

## Menghitung tugas lewat jatuh tempo milik satu orang

Gunakan:

`=COUNTIFS($D$4:$D$7,A11,$K$4:$K$7,"Lewat jatuh tempo")`

Hasilnya **1** berdasarkan contoh. Pola ini lebih mudah diperiksa bila status keterlambatan sudah tersedia pada kolom bantu, bukan dihitung ulang di setiap kartu dashboard.

## Kriteria yang sering dipakai

- Sama dengan teks: `"Selesai"`
- Tidak sama dengan teks: `"<>Selesai"`
- Tidak kosong: `"<>"`
- Mengacu ke sel: `A11`
- Lebih besar dari nilai pada sel: `">"&B1`

Gunakan operator di dalam tanda kutip, lalu gabungkan dengan referensi sel memakai `&` bila kriterianya dinamis.

## Mengapa hasil COUNTIFS bisa 0

Hasil 0 dapat berarti memang tidak ada baris yang cocok. Bila seharusnya ada hasil, periksa:

1. ejaan dan spasi pada status atau nama pemilik;
2. batas awal dan akhir semua rentang;
3. baris kosong yang ikut masuk ke area data;
4. tanggal yang tersimpan sebagai teks atau mengandung komponen waktu.

Gunakan [panduan diagnosis SUMIFS/COUNTIFS hasil 0](/masalah-excel/formula/masalah-sumifs-countifs-hasil-nol/) sebelum mengubah rumus secara acak.

## Catatan pemisah argumen

Contoh di halaman ini memakai koma. Pada pengaturan regional tertentu, Excel atau Google Sheets dapat memakai titik koma. Struktur pasangan rentang dan kriterianya tetap sama.

Lihat dokumentasi Microsoft tentang [fungsi COUNTIFS](https://support.microsoft.com/en-us/office/countifs-function-dda3dc6e-f74e-4aee-88bc-aa8c2a866842) untuk referensi sintaks tambahan.
