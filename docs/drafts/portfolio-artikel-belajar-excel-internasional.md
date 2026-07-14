# Portfolio Draft Artikel Belajar Excel

Status: draft editorial, belum dipublikasikan. Riset utama memakai Microsoft Support dan ExcelJet; pemilihan topik berdasarkan observasi bahwa pembahasan berurutan dalam bahasa Indonesia masih relatif jarang.

1. **Excel Table vs range biasa**: membuat data transaksi otomatis meluas, terfilter, dan aman saat baris baru ditambah.
2. **Structured references**: membaca `=SUM(Penjualan[Total])` dan `=[@Jumlah]*[@Harga]` agar rumus mudah diaudit.
3. **Audit formula**: Trace Precedents, Trace Dependents, Evaluate Formula, dan Show Formulas sebelum mengubah angka.
4. **Validasi data formula kustom**: ID berawalan tertentu, email sederhana, dan pencegahan data ganda dengan COUNTIF.
5. **Dropdown yang tumbuh otomatis**: Table, Named Range, dan daftar kategori yang tidak perlu diperpanjang manual.
6. **LET untuk rumus panjang**: memberi nama pada hasil antara agar formula lebih cepat dibaca dan dirawat.
7. **Dynamic arrays dan spill**: memahami satu formula yang menghasilkan banyak sel serta diagnosis `#SPILL!`.
8. **FILTER untuk laporan mandiri**: membuat daftar transaksi pelanggan tanpa salin-tempel; bandingkan dengan PivotTable.
9. **UNIQUE dan SORT untuk daftar bersih**: menghasilkan kategori atau pelanggan unik, termasuk penanganan spasi.
10. **TEXTSPLIT untuk data impor**: memecah kode, nama, dan kategori dari teks berpemisah; alternatif Text to Columns.
11. **Power Query tanpa merusak data asli**: Connect, Transform, Load, dan refresh sebagai workflow pembersihan berulang.
12. **Append Queries untuk laporan bulanan**: menggabungkan tabel Januari-Maret berdasarkan header dan mengecek nilai null.
13. **Unpivot untuk data yang siap dianalisis**: mengubah kolom bulan menjadi kolom Bulan dan Nilai untuk PivotTable.
14. **Merge Power Query vs Append**: menghubungkan transaksi dan master pelanggan lewat ID, termasuk diagnosis null.
15. **Parameter Power Query**: mengganti folder atau file sumber tanpa membangun query ulang.
16. **PivotTable dari dua tabel**: memahami relasi antara tabel master dan tabel aktivitas sebelum membuat ringkasan.
17. **Data Model untuk banyak tabel**: menyatukan transaksi, produk, dan pelanggan tanpa langsung masuk ke DAX.
18. **Conditional formatting sebagai alarm**: stok menipis, jatuh tempo, dan target; gunakan aturan kerja, bukan dekorasi.
19. **Sparklines untuk tren kecil**: membaca tren per produk tanpa membuat chart besar.
20. **Checklist kualitas file Excel**: formula error, filter, format angka, print area, privasi, dan kompatibilitas sebelum mengirim file.

## Rujukan

- Microsoft Support: LET, structured references, data validation, formula auditing, PivotTable/Data Model, dan Power Query append.
- ExcelJet: dynamic arrays, FILTER, UNIQUE, SORT, TEXTSPLIT, serta XLOOKUP.

Saat artikel dipilih untuk terbit, setiap nomor akan dikembangkan menjadi panduan lengkap berisi tujuan pencarian, prasyarat, contoh praktik, kesalahan umum, batasan versi, dan tautan ke template/rumus/diagnosis terkait.
