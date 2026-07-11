# Resource Fixture Testing

Fixture resource berada sebagai data programatik di `scripts/validate-resource-fixtures.ts`. Fixture tidak ditulis ke `src/content`, tidak dibaca loader Astro, tidak tersedia di Decap CMS, dan tidak dapat menghasilkan route, navigation item, atau URL sitemap produksi.

## Cakupan

Validasi mencakup:

- guide, formula, troubleshooting, koleksi, dan target template;
- relasi eksplisit lintas tipe;
- target hilang, duplikat, draft, dan siklus dua arah;
- kategori invalid dan slug malformed;
- URL artikel dan koleksi;
- aktivasi navigation berdasarkan resource published;
- inclusion/exclusion sitemap dan hub kosong;
- related section kosong tanpa fallback yang tidak relevan;
- sinkronisasi field serta target relation Decap CMS;
- branch CMS `main` dan `editorial_workflow`;
- tidak adanya marker fixture pada content, build, sitemap, atau CMS.

Jalankan `pnpm run test:resources` untuk fixture saja. `pnpm run validate` menjalankan validasi build yang sudah ada lalu fixture resource.

## Menguji content masa depan

1. Tambahkan skenario programatik bila helper atau aturan relasi berubah. Jangan membuat Markdown sementara di production collection.
2. Gunakan slug berawalan `test-fixture-` hanya di fixture script agar isolation guard dapat mendeteksi kebocoran.
3. Sertakan entry published dan draft saat mengubah logika visibility.
4. Uji relasi eksplisit, target hilang, duplikat, dan siklus tanpa mengandalkan urutan selain prioritas yang didokumentasikan.
5. Jalankan `check`, `build`, dan `validate`; periksa bahwa hub kosong tetap noindex dan tidak masuk navigation/sitemap.

Jika pengujian manual suatu saat membutuhkan file sementara, file tersebut harus berada di luar `src/content` dan dihapus sebelum commit. Fixture publik atau dummy article tidak diperbolehkan.
