---
title: "Cara Membuat Dropdown Excel yang Bertambah Otomatis"
meta_title: "Cara Membuat Dropdown Excel yang Bertambah Otomatis"
meta_description: "Membuat daftar pilihan kategori yang bertambah bersama Excel Table sehingga menu input tidak perlu diperbarui setiap hari."
slug: "panduan-dropdown-dinamis-excel"
summary: "Membuat daftar pilihan kategori yang bertambah bersama Excel Table sehingga menu input tidak perlu diperbarui setiap hari."
category: "pengolahan-data"
difficulty: "menengah"
estimated_time: "15 menit"
prerequisites: ["Excel Table untuk daftar kategori","Satu kolom input yang akan memakai dropdown"]
excel_versions: ["Microsoft Excel 365","Microsoft Excel 2021","Microsoft Excel 2019"]
tags: ["dropdown excel","data validation","excel table"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: false
draft: true
related_templates: ["template-kalender-konten-media-sosial","template-checklist-acara"]
related_guides: ["panduan-validasi-data-formula-kustom","panduan-structured-references-excel-table"]
related_formulas: ["rumus-filter-daftar-dinamis"]
related_troubleshooting: ["masalah-dropdown-data-validation-tidak-muncul"]
---

## Masalah yang Diselesaikan

Dropdown berbasis rentang tetap sering lupa diperbarui ketika kategori baru ditambahkan.

## Hasil yang Diharapkan

Daftar kategori berasal dari Table dan dapat dipakai konsisten pada kolom input.

## Prasyarat

- Excel Table untuk daftar kategori
- Satu kolom input yang akan memakai dropdown

## Contoh Input

```text
tblKategori[Kategori]: ATK, Konsumsi, Transportasi; input transaksi memakai salah satu pilihan tersebut.
```

## Langkah Praktik

1. Buat Table `tblKategori` dengan header `Kategori`.
2. Isi beberapa kategori dan beri nama Table melalui Table Design.
3. Buat defined name `DaftarKategori` dengan formula `=tblKategori[Kategori]`.
4. Pilih kolom input, buka Data Validation > List, lalu isi Source `=DaftarKategori`.
5. Tambahkan kategori baru ke baris tepat di bawah Table dan uji dropdown.

## Mengapa Ini Bekerja

Defined name menunjuk ke kolom Table, bukan alamat tetap. Saat Table meluas, sumber daftar ikut meluas tanpa mengubah rule setiap sel.

## Kesalahan Umum

- Source ditulis `tblKategori[Kategori]` langsung pada dialog yang tidak menerima structured reference.
- Nama Table atau defined name salah eja.

## Diagnosis

Periksa Formulas > Name Manager dan pastikan `DaftarKategori` mengarah ke kolom yang benar.

## Cara Memperbaiki

Buat defined name ulang, cek referensi Table, dan pastikan nilai kategori tidak memiliki spasi tersembunyi.

## Kompatibilitas dan Alternatif Versi Lama

Excel Table dan named range tersedia pada Excel modern. Google Sheets memakai named range dan dropdown dengan alur berbeda.

Alternatif untuk Excel lama: Gunakan rentang absolut seperti `$H$2:$H$20` untuk daftar kecil yang jarang berubah.

## Batasan

Dropdown tidak otomatis membersihkan nilai lama yang sudah tidak ada di daftar.

## Langkah Praktis Berikutnya

Tambahkan satu kategori percobaan, lalu catat siapa yang boleh mengubah `tblKategori`.

## Related Resources

- Template: [template-kalender-konten-media-sosial](/templates/), [template-checklist-acara](/templates/)
- Panduan: [panduan-validasi-data-formula-kustom](/panduan/), [panduan-structured-references-excel-table](/panduan/)
- Rumus: [rumus-filter-daftar-dinamis](/rumus-excel/)
- Troubleshooting: [masalah-dropdown-data-validation-tidak-muncul](/masalah-excel/)

Google Sheets: uji ulang sintaks dan perilaku karena tidak semua fitur Excel tersedia.
