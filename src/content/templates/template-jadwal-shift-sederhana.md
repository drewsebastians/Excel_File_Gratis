---
title: "Template Jadwal Shift Excel untuk Anggota, Jam Kerja, dan Durasi"
meta_title: "Template Jadwal Shift Excel Gratis | ExcelGratis"
meta_description: "Unduh template jadwal shift Excel untuk mencatat anggota, tanggal, shift, jam mulai-selesai, durasi lintas tengah malam, dan ringkasan penugasan."
slug: "template-jadwal-shift-sederhana"
focus_keyword: "template jadwal shift excel"
preview_image: "/assets/templates/template-jadwal-shift-sederhana.png"
preview_alt: "Ringkasan template jadwal shift Excel dengan jumlah penugasan per anggota, total jam, dan jumlah shift"
featured: true
draft: false
category: "produktivitas-kerja"
tags: ["jadwal shift", "jadwal kerja", "pembagian tugas", "template excel gratis"]
date: "2026-07-14"
updated_date: "2026-07-14"
file_name: "template-jadwal-shift-sederhana.xlsx"
file_size: "13 KB"
suggested_h1: "Template Jadwal Shift Excel untuk Anggota, Jam Kerja, dan Durasi"
usage_heading: "Cara Menggunakan Template Jadwal Shift"
ringkasan_singkat: "Isi daftar anggota, tanggal, nama shift, jam mulai, dan jam selesai. Formula menghitung durasi, termasuk shift yang melewati tengah malam, lalu ringkasan menjumlahkan penugasan dan jam yang tercatat."
file_spec:
  sheets: 5
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel; penggunaan di Google Sheets perlu diuji ulang"
batasan:
  - "Template ini membantu pembagian jadwal sederhana dan bukan alat penggajian, absensi, atau kepatuhan ketenagakerjaan."
  - "Pengguna tetap perlu memeriksa aturan jam kerja, jeda, dan persetujuan jadwal yang berlaku di tempatnya."
related_templates: ["template-kalender-planner-2026", "template-task-tracker-kanban-excel", "template-notulen-rapat-action-item"]
---

Isi anggota, tanggal, nama shift, jam mulai, dan jam selesai pada `Jadwal Shift`. Template jadwal shift Excel ini menghitung durasi setiap penugasan, termasuk jadwal yang melewati tengah malam, lalu merangkum jumlah penugasan dan total jam. Gunakan untuk perencanaan tim sederhana, bukan sebagai bukti absensi, dasar gaji, atau perhitungan lembur.

## Isi file template jadwal shift

File `.xlsx` berukuran 13 KB ini memiliki lima sheet dan tidak memakai macro:

- **Cara Pakai** — urutan awal penggunaan.
- **Daftar Anggota** — nama anggota dan keterangan.
- **Jadwal Shift** — tanggal, anggota, shift, jam mulai, jam selesai, dan durasi.
- **Ringkasan** — jumlah penugasan, total jam, dan jumlah per jenis shift.
- **Referensi** — pilihan yang digunakan pada input.

Audit workbook menemukan tiga Excel Table, data validation, dan 25 formula. Tidak ditemukan chart, PivotTable, named range, atau proteksi sheet.

## Cara menggunakan template

1. **Perbarui daftar anggota.** Ganti nama contoh pada `Daftar Anggota`.
2. **Catat satu penugasan per baris.** Isi tanggal, anggota, nama shift, jam mulai, dan jam selesai.
3. **Gunakan format waktu Excel.** Masukkan waktu seperti `08:00`, `16:00`, atau `20:00`.
4. **Periksa durasi.** Pastikan kolom durasi terisi dan tidak menampilkan peringatan kelengkapan.
5. **Tinjau ringkasan.** Bandingkan jumlah penugasan dan total jam sebelum jadwal dibagikan.

Checkpoint: baris dengan tanggal atau jam yang belum lengkap seharusnya tidak menghasilkan durasi final.

## Contoh shift melewati tengah malam

Data berikut hanya ilustrasi:

| Anggota | Shift | Mulai | Selesai | Durasi |
|---|---|---:|---:|---:|
| Rina | Malam | 20:00 | 04:00 | 8 jam |
| Budi | Pagi | 08:00 | 16:00 | 8 jam |

Formula durasi memakai pola `MOD(jam selesai-jam mulai,1)*24`. Karena itu, pukul 04:00 dapat dibaca sebagai waktu setelah pukul 20:00 pada penugasan malam, bukan sebagai durasi negatif.

## Apa yang dihitung oleh workbook

Formula `TEXT` membentuk nama hari dari tanggal. Formula `IF` menjaga hasil tetap kosong ketika input utama belum lengkap dan dapat memberi tanda seperti `Lengkapi jam` atau `Cek durasi nol`. `COUNTIFS`, `COUNTIF`, dan `SUM` digunakan pada ringkasan penugasan serta total jam.

Catat hasil serah-terima atau tindak lanjut pada [template notulen rapat dan action item](/templates/produktivitas-kerja/template-notulen-rapat-action-item/). Bila daftar pilihan tidak tampil pada sel input, gunakan [solusi dropdown Data Validation](/masalah-excel/format-data/masalah-dropdown-data-validation-tidak-muncul/).

## Batasan yang perlu diketahui

Total jam pada file adalah durasi jadwal yang direncanakan, bukan jam kehadiran aktual. Template tidak menghitung jeda, lembur, upah, izin, pergantian mendadak, atau kepatuhan terhadap aturan ketenagakerjaan. Periksa kembali persetujuan jadwal dan aturan internal sebelum membagikannya.

Penggunaan di Google Sheets perlu diuji ulang, terutama untuk data validation, format waktu, formula durasi lintas tengah malam, dan perluasan Table.

Unduh `template-jadwal-shift-sederhana.xlsx`, masukkan dua atau tiga shift uji, lalu periksa durasi dan ringkasannya sebelum menyusun jadwal penuh.
