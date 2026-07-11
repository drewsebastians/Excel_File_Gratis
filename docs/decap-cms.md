# Decap CMS Setup

Admin CMS tersedia di:

`https://excelgratis.my.id/admin/`

CMS ini menyimpan konten sebagai Markdown di `src/content/templates` dan file Excel di `public/downloads`, lalu Cloudflare akan rebuild website statis setelah perubahan dipush ke GitHub.

## Yang Sudah Disiapkan

- Halaman admin Decap CMS: `public/admin/index.html`
- Konfigurasi Decap CMS: `public/admin/config.yml`
- Editorial workflow aktif, jadi perubahan bisa masuk sebagai draft/review sebelum publish.
- Upload file Excel diarahkan ke `public/downloads`.
- Upload media umum diarahkan ke `public/assets/uploads`.
- Upload preview template opsional diarahkan ke `public/assets/templates` dan dipakai lewat field `preview_image`.

## Field Template Baru

- `preview_image`: gambar preview opsional. Jika kosong, website tetap memakai mapping gambar berdasarkan slug yang sudah ada. Jangan memakai CMS untuk mengatur crop, filter, watermark, overlay, atau style gambar; tampilan mengikuti komponen website.
- `preview_alt`: teks alternatif gambar. Di CMS field ini wajib untuk editing baru, tetapi schema website tetap menerima konten lama yang belum memilikinya dan memakai fallback aman.
- `featured`: centang jika template ingin diprioritaskan di section Template Pilihan homepage. Jika tidak ada template featured, homepage otomatis memakai template terbaru.
- `updated_date`: tanggal terakhir diperbarui. Field ini tidak mengganti `date` sebagai tanggal publish awal.
- `related_templates`: pilihan template terkait berdasarkan slug. Jika kosong, website otomatis mencari template dari kategori yang sama, tag yang sama, lalu fallback template lain.

## Backward Compatibility

Konten Markdown lama tetap bisa dibuild tanpa migrasi massal. Field baru bersifat opsional di schema, sehingga template existing yang hanya memiliki field lama tetap valid. Mapping gambar lama untuk empat template existing tetap dipertahankan selama `preview_image` belum diisi.

## Catatan Editorial

Gunakan Bahasa Indonesia untuk judul, ringkasan, alt text, dan isi artikel. Jangan membuat klaim jumlah download, rating, popularitas, atau angka lain yang belum punya data. Kategori kosong boleh tetap tersedia di konfigurasi CMS untuk kebutuhan publishing mendatang, tetapi tidak akan dipromosikan di website sampai memiliki template published.

## Yang Perlu Anda Set Di GitHub

Decap CMS dengan backend GitHub butuh autentikasi OAuth. Buat GitHub OAuth App:

- Homepage URL: `https://excelgratis.my.id`
- Authorization callback URL: gunakan URL callback dari OAuth provider yang Anda pakai.

Untuk Cloudflare Pages, kita perlu OAuth proxy/serverless auth kecil agar Decap bisa login ke GitHub. Setelah client id/secret tersedia, simpan sebagai environment variable di Cloudflare, lalu hubungkan `base_url` di `public/admin/config.yml` ke endpoint OAuth tersebut.

Tanpa langkah OAuth ini, halaman `/admin/` sudah terbuka, tetapi belum bisa login ke GitHub.

Editorial workflow tetap memakai konfigurasi GitHub Decap CMS yang sudah ada. Batch ini tidak mengubah worker auth, credential OAuth, secret Cloudflare, atau flow login.

## Batch 2: halaman tetap dan resource

Collection **Halaman Tetap** memakai files collection, jadi editor dapat mengubah judul, SEO title, meta description, tanggal update, ringkasan, dan Markdown untuk Tentang, Kontak, Request Template, kebijakan editorial, cara pengujian, lisensi, syarat, privasi, cookie, serta disclaimer. Route dan robots dikunci di kode; editor tidak dapat mengubah slug, ads, atau robots policy.

Collection **Panduan Excel**, **Rumus Excel**, **Masalah Excel**, dan **Koleksi Resource** memakai folder collection. Gunakan slug huruf kecil dengan tanda minus, kategori yang tersedia di dropdown, metadata SEO yang ringkas, dan `draft` selama review. Hub hanya menjadi indexable dan muncul di navigation saat memiliki resource published; jangan membuat sample atau halaman public kosong.

Relasi memakai slug resource. Pilih hanya target yang sudah ada; target hilang diabaikan aman ketika build, tetapi relasi yang benar membuat related resources lebih berguna. Lihat `docs/content-examples/` untuk contoh Markdown yang tidak dipublikasikan. Preview CMS tidak mencerminkan seluruh layout atau status navigation karena halaman dirender statis saat build.
