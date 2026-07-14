---
title: "Rumus XLOOKUP dan VLOOKUP untuk Mencari Data di Excel"
formula_name: "XLOOKUP dan VLOOKUP"
meta_title: "Rumus XLOOKUP dan VLOOKUP untuk Mencari Data di Excel"
meta_description: "Pelajari perbedaan XLOOKUP dan VLOOKUP di Excel, sintaks dasar, contoh pencarian data, hasil tidak ditemukan, dan catatan kompatibilitas."
slug: "rumus-xlookup-vlookup-data"
summary: "XLOOKUP dan VLOOKUP membantu mengambil informasi terkait dari daftar referensi; XLOOKUP lebih fleksibel, sedangkan VLOOKUP lebih luas kompatibilitasnya."
syntax: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found]) atau =VLOOKUP(lookup_value, table_array, col_index_num, FALSE)"
category: "lookup-referensi"
difficulty: "menengah"
excel_versions: ["XLOOKUP: Microsoft 365 atau Excel 2021", "VLOOKUP: Microsoft Excel 2007 atau lebih baru dan Google Sheets"]
tags: ["xlookup", "vlookup", "mencari data excel"]
date: "2026-07-14"
updated_date: "2026-07-14"
featured: true
draft: false
related_templates: ["template-pembukuan-pengeluaran-usaha", "template-notulen-rapat-action-item", "template-target-tabungan"]
related_guides: ["panduan-excel-table-untuk-template", "panduan-dropdown-data-validation-excel"]
related_formulas: ["rumus-iferror-template-rapi", "rumus-countifs-dashboard-status"]
related_troubleshooting: ["masalah-vlookup-xlookup-na", "masalah-sumifs-countifs-hasil-nol"]
---

## Tujuan

Gunakan fungsi pencarian ketika Anda memiliki kode atau nama pada satu tabel dan ingin menampilkan informasi pasangannya dari tabel referensi. Contohnya, ID barang dapat mengambil Nama Barang atau kategori dari daftar master.

## XLOOKUP

Sintaks dasar: `=XLOOKUP(A2,$G$2:$G$20,$H$2:$H$20,"Tidak ditemukan")`. Rumus ini mencari nilai A2 di G2:G20 lalu mengembalikan nilai pada baris yang sama dari H2:H20. Argumen terakhir membuat hasil lebih jelas ketika nilai belum ada.

XLOOKUP dapat mencari ke kiri atau kanan karena rentang pencarian dan rentang hasil ditentukan terpisah. Fungsi ini tersedia di Microsoft 365 dan Excel 2021, tetapi tidak pada banyak versi Excel lama.

## VLOOKUP

Sintaks pencarian tepat: `=VLOOKUP(A2,$G$2:$I$20,2,FALSE)`. Rumus mencari A2 di kolom paling kiri rentang G:I, lalu mengembalikan kolom ke-2 dari rentang tersebut. Selalu gunakan `FALSE` untuk pencarian kode atau nama yang harus cocok persis.

VLOOKUP lebih cocok bila kolom pencarian memang berada paling kiri. Jika struktur tabel berubah, nomor kolom hasil perlu diperiksa kembali.

## Memilih Rumus

Pilih XLOOKUP bila semua pengguna memakai Excel modern dan Anda ingin rumus yang lebih mudah dibaca. Pilih VLOOKUP bila file juga perlu dibuka pada Excel lama atau Google Sheets. Jangan memakai keduanya untuk satu kebutuhan yang sama tanpa alasan, karena pemeliharaan template akan lebih sulit.

## Kesalahan Umum

Hasil `#N/A` biasanya berarti nilai tidak ditemukan atau bentuk data berbeda, misalnya satu ID tersimpan sebagai angka dan lainnya sebagai teks. Lihat [VLOOKUP atau XLOOKUP menghasilkan #N/A](/masalah-excel/formula/masalah-vlookup-xlookup-na/) untuk langkah diagnosis.

## Sumber Resmi

Microsoft menjelaskan [XLOOKUP](https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929) dan [VLOOKUP](https://support.microsoft.com/en-us/office/vlookup-function-b78a17f4-3e7f-4f5f-8b54-7f3aeb7b586d) pada dokumentasi resminya.
