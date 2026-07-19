---
title: "Template Follow-Up Pelanggan Excel untuk Jadwal dan Status Prospek"
meta_title: "Template Follow-Up Pelanggan Excel Gratis | ExcelGratis"
meta_description: "Unduh template follow-up pelanggan Excel untuk mencatat kontak, status, prioritas, jadwal berikutnya, keterlambatan, dan ringkasan prospek."
slug: "template-follow-up-pelanggan-excel"
focus_keyword: "template follow up pelanggan excel"
preview_alt: "Ringkasan template follow-up pelanggan Excel dengan jumlah prospek, status komunikasi, keterlambatan, prioritas, dan grafik distribusi status"
category: "bisnis-umkm"
tags: ["follow up pelanggan", "template sales", "excel gratis", "manajemen prospek"]
date: "2026-07-08"
file_name: "template-follow-up-pelanggan-excel.xlsx"
file_size: "19 KB"
suggested_h1: "Template Follow-Up Pelanggan Excel untuk Jadwal dan Status Prospek"
preview_heading: "Preview Ringkasan Follow-Up Pelanggan"
usage_heading: "Cara Menggunakan Template Follow-Up Pelanggan"
ringkasan_singkat: "Catat nama pelanggan, kebutuhan, kontak terakhir, status, prioritas, dan jadwal follow-up berikutnya dalam satu tabel. Ringkasan memakai formula untuk menghitung jumlah pelanggan per status dan membantu menemukan jadwal yang sudah lewat."
file_spec:
  sheets: 4
  has_macro: false
  format: "xlsx"
  kompatibilitas: "Microsoft Excel; penggunaan di Google Sheets perlu diuji ulang"
batasan:
  - "Template tidak mengirim pengingat melalui WhatsApp atau email; pengguna perlu membuka file dan memeriksa ringkasan."
  - "Status keterlambatan bergantung pada tanggal serta status follow-up yang diisi dan diperbarui pengguna."
  - "Untuk banyak pengguna yang mengedit prospek secara bersamaan, aplikasi CRM khusus dapat lebih sesuai."
---

Catat setiap prospek pada `Data Pelanggan`, isi status dan jadwal follow-up berikutnya, lalu periksa `Ringkasan` untuk melihat jumlah pelanggan per status dan jadwal yang sudah lewat. Template follow-up pelanggan Excel ini membantu menjaga daftar tindakan tetap terlihat, tetapi tidak mengirim notifikasi atau menggantikan aplikasi CRM untuk proses penjualan yang kompleks.

## Isi file template follow-up pelanggan

File `.xlsx` berukuran 19 KB ini memiliki empat sheet dan tidak memakai macro:

- **Tentang** — informasi singkat mengenai file.
- **Cara Pakai** — urutan awal penggunaan.
- **Data Pelanggan** — tabel utama untuk identitas pelanggan, kebutuhan, kontak terakhir, status, prioritas, jadwal berikutnya, dan catatan.
- **Ringkasan** — rekap jumlah pelanggan dan distribusi status.

Audit workbook menemukan satu Excel Table, satu chart, data validation, dan 58 formula. Formula yang terdeteksi mencakup `TODAY`, `IF`, `COUNTA`, dan `COUNTIF`.

## Cara menggunakan template

1. **Ganti data contoh.** Isi satu pelanggan atau prospek per baris pada `Data Pelanggan`.
2. **Lengkapi tindakan terakhir.** Masukkan tanggal kontak terakhir, status follow-up, dan catatan singkat.
3. **Tetapkan prioritas dan jadwal berikutnya.** Gunakan pilihan yang tersedia agar penulisan tetap konsisten.
4. **Perbarui status setelah keputusan.** Ubah menjadi `Deal` atau `Batal` ketika proses selesai.
5. **Periksa ringkasan.** Fokuskan tindakan pada jadwal yang sudah lewat atau prospek dengan prioritas lebih tinggi.

Checkpoint: satu prospek dengan jadwal yang sudah lewat dan status selain `Deal` atau `Batal` seharusnya muncul sebagai terlambat setelah workbook menghitung ulang.

## Contoh penggunaan

Data berikut hanya ilustrasi:

| Pelanggan | Kebutuhan | Status | Prioritas | Jadwal Berikutnya |
|---|---|---|---|---|
| Toko Sinar | Penawaran harga grosir | Menunggu Respon | Tinggi | 15/07/2026 |
| CV Mandiri | Sampel produk | Sudah Dihubungi | Sedang | 22/07/2026 |
| Kedai Sejuk | Pesanan rutin | Deal | Tinggi | 10/07/2026 |

Jika tanggal 15 Juli sudah lewat dan status Toko Sinar belum menjadi `Deal` atau `Batal`, formula status keterlambatan dapat menandainya sebagai `Terlambat`. Jadwal yang belum lewat tetap dibaca sebagai tepat waktu berdasarkan tanggal yang diisi.

## Bagaimana ringkasan bekerja

Kolom hari sejak kontak memakai selisih antara `TODAY()` dan tanggal kontak terakhir. Status keterlambatan memakai kombinasi tanggal jadwal berikutnya serta status prospek. `COUNTA` dan `COUNTIF` menghitung jumlah pelanggan dan distribusi status pada ringkasan.

Saat membuat rekap tambahan per pemilik atau status, gunakan pola pada [rumus COUNTIFS untuk dashboard status](/rumus-excel/matematika/rumus-countifs-dashboard-status/). Untuk tindakan yang sudah menjadi pekerjaan internal, pindahkan detail eksekusinya ke [template task tracker Kanban](/templates/produktivitas-kerja/template-task-tracker-kanban-excel/).

## Batasan yang perlu diketahui

Template tidak mengirim pesan, email, atau reminder eksternal. Ketepatan daftar terlambat bergantung pada tanggal dan status yang diperbarui pengguna. File juga belum dirancang sebagai CRM multi-user dengan histori komunikasi, hak akses, pipeline kompleks, atau integrasi otomatis.

Kompatibilitas Google Sheets belum diverifikasi. Uji formula berbasis tanggal, data validation, perluasan Table, dan chart setelah file diimpor.

Unduh `template-follow-up-pelanggan-excel.xlsx`, masukkan beberapa prospek uji, lalu periksa apakah status dan ringkasan berubah sesuai tanggal yang kamu gunakan.
