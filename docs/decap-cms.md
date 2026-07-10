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

## Yang Perlu Anda Set Di GitHub

Decap CMS dengan backend GitHub butuh autentikasi OAuth. Buat GitHub OAuth App:

- Homepage URL: `https://excelgratis.my.id`
- Authorization callback URL: gunakan URL callback dari OAuth provider yang Anda pakai.

Untuk Cloudflare Pages, kita perlu OAuth proxy/serverless auth kecil agar Decap bisa login ke GitHub. Setelah client id/secret tersedia, simpan sebagai environment variable di Cloudflare, lalu hubungkan `base_url` di `public/admin/config.yml` ke endpoint OAuth tersebut.

Tanpa langkah OAuth ini, halaman `/admin/` sudah terbuka, tetapi belum bisa login ke GitHub.
