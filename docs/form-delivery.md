# Form Delivery and Reliability

Form Kontak dan Request Template memakai satu komponen dengan Web3Forms sebagai provider aktif. Website tetap statis, tanpa backend, database, analytics provider, atau layanan tracking baru.

## Data dan identifikasi

- Access key tetap memakai mekanisme client-side yang sudah ada. Nilainya tidak boleh dicetak ke log atau laporan.
- `form_type`, `from_name`, dan subject notifikasi ditetapkan oleh aplikasi. Subjek bebas dari pengguna dikirim sebagai `user_subject`, sehingga tidak mengontrol penuh subject email provider.
- Nilai teks dipangkas sebelum dikirim. Batas panjang dan field wajib diperiksa di HTML dan saat runtime.
- Kegagalan tidak menghapus isian. Form hanya dibersihkan setelah Web3Forms mengembalikan HTTP sukses dengan `success: true`.

## Reliability behavior

Request dibatalkan setelah 15 detik dengan `AbortController`. Navigasi keluar halaman juga membatalkan request aktif. Tombol submit dinonaktifkan selama request dan guard internal menolak submit berulang.

Kategori error yang dipakai internal:

| Kategori | Kondisi | Pesan pengguna |
| --- | --- | --- |
| `bad_request`, `provider_rejected` | HTTP 400 atau provider menolak data | Periksa kembali isian |
| `provider_configuration` | HTTP 401 atau konfigurasi provider menolak access key/domain | Coba kembali beberapa saat lagi |
| `rate_limited` | HTTP 429 | Tunggu sebelum mencoba lagi |
| `provider_unavailable`, `http_error` | HTTP 5xx atau error HTTP lain | Coba kembali beberapa saat lagi |
| `offline`, `network` | Browser offline atau request jaringan gagal | Periksa koneksi |
| `timeout` | Tidak ada hasil dalam 15 detik | Periksa koneksi dan coba lagi |
| `invalid_json`, `unexpected_response` | Respons tidak dapat dikonfirmasi | Pesan tidak dianggap terkirim |
| `cancelled` | Halaman ditinggalkan saat request aktif | Tidak menampilkan hasil palsu |

Respons mentah dan detail teknis provider tidak ditampilkan. Error JavaScript yang tidak terduga selalu masuk keadaan gagal, bukan sukses.

## Spam protection

Honeypot `botcheck` aktif dalam format checkbox yang didukung Web3Forms. Field ini berada di luar tampilan normal, memakai `tabindex="-1"` dan `aria-hidden="true"`, tetapi tetap ikut dalam data bila bot mencentangnya agar provider dapat menolaknya.

hCaptcha tidak aktif. Tidak ada site key, widget, script, atau environment variable captcha yang dibaca saat ini. Aktivasi manual memerlukan langkah berikut:

1. Pemilik mendaftarkan domain produksi di hCaptcha dan memastikan integrasi hCaptcha didukung pada konfigurasi akun Web3Forms yang digunakan.
2. Simpan site key sebagai `PUBLIC_WEB3FORMS_HCAPTCHA_SITE_KEY` pada environment deployment; jangan commit nilainya. Site key bersifat publik di browser, sedangkan credential rahasia tetap tidak boleh masuk repository.
3. Dalam perubahan terpisah yang disetujui, render widget dan script hCaptcha secara kondisional hanya saat environment variable tersebut tersedia, lalu kirim token dengan nama field yang diwajibkan Web3Forms.
4. Pastikan build tanpa variable tidak merender widget, script, atau token kosong dan alur form biasa tetap bekerja.
5. Uji pada domain yang terdaftar dan konfirmasi token ditolak saat kosong/kedaluwarsa serta diterima saat valid.

reCAPTCHA, Turnstile, provider form lain, database, dan backend tidak digunakan.

## Event privacy

Event tetap melewati `window.ExcelGratisEvents` dan tidak membuat network request ketika analytics provider tidak ada. Payload form dibatasi pada `formType`, `status`, `errorCategory`, dan `validationErrorCount`. Nama, email, isi pesan, subjek pengguna, deskripsi request, fitur, pekerjaan/bisnis, dan free text lain tidak boleh masuk event.

## Pengujian

`pnpm run validate` menjalankan validasi build dan test form dengan respons Web3Forms yang seluruhnya dimock. Test mencakup sukses, 400, provider rejection, 429, 500, offline/network, timeout, JSON rusak, struktur tidak dikenal, duplikasi, cleanup, batas field, whitespace, payload event, honeypot, dan captcha yang tidak aktif. Test otomatis tidak mengirim form nyata.

Untuk pengujian produksi manual, pemilik harus membuka kedua route pada deployment yang disetujui, memakai data uji non-sensitif dan penanda unik, mengirim satu pesan per form, mengonfirmasi status sukses di halaman, lalu memastikan inbox menerima `form_type` dan prefix subject yang benar. Uji kegagalan dapat dilakukan dengan mode offline browser sebelum submit; jangan memakai request berulang untuk memancing rate limit pada produksi.

## Keterbatasan Web3Forms

- Access key tersedia pada client karena form dikirim langsung dari browser; pembatasan domain dan pemantauan penyalahgunaan harus dikelola di akun provider.
- Keberhasilan bergantung pada ketersediaan, rate limit, validasi, spam filtering, dan pengiriman email Web3Forms.
- Respons sukses mengonfirmasi provider menerima request, bukan menjamin email sudah dibaca atau request template akan dikerjakan.
- hCaptcha memerlukan konfigurasi akun/domain dan review implementasi terpisah sebelum diaktifkan.
