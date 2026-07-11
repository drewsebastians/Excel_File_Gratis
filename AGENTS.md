# Agent Guidance

Project ini adalah website statis Astro untuk ExcelGratis.my.id. Output build berada di `dist` dan deployment produksi memakai Cloudflare Workers/Assets.

- Gunakan Astro, TypeScript/JavaScript, CSS, Astro Content Collections, Decap CMS, dan dependency yang sudah ada.
- Jangan menambah database, backend, auth baru, framework baru, atau service tracking tanpa approval eksplisit.
- Jangan deploy, push, merge ke `main`, atau membuka PR kecuali diminta eksplisit.
- UI user-facing memakai Bahasa Indonesia.
- Field Decap CMS, content schema, helper, dan dokumentasi harus tetap sinkron.
- Konten lama harus tetap backward compatible; field baru harus opsional atau punya default aman.
- Jangan mengubah, memindah, rename, mengoptimalkan, atau meregenerasi file di `public/assets/brand/` dan `public/assets/templates/` tanpa approval eksplisit.
- Logo header/footer harus tetap memakai `/assets/brand/main-icon.png` dengan width `180`, height `60`, aspect ratio, dan visual scale yang sama.
- Jangan mengubah style gambar konten: aspect ratio, crop, `object-fit`, border radius, border, shadow, card image proportions, atau treatment preview detail.
- Jangan membuat metrik palsu seperti jumlah download, rating, popularitas, atau klaim jumlah template yang tidak didukung data.
- Jangan membuat halaman kosong, coming soon, atau landing page indexable untuk resource yang belum tersedia.
- Kategori kosong tidak dipromosikan, tidak masuk XML sitemap, dan memakai `noindex, follow` bila route tetap digenerate.
- Jangan menaruh ads di dekat download button, di area CTA download, di legal/info page yang tidak perlu, 404, empty state, atau controls.
- Batch foundation tidak boleh mengaktifkan AdSense production script, publisher ID, analytics eksternal, cookies, atau pixel.
- XML sitemap harus tunggal, canonical harus absolute, query parameter tidak masuk canonical/sitemap, dan robots harus mengizinkan public assets serta mengecualikan admin/API.
- Required checks sebelum selesai: `pnpm install --frozen-lockfile`, `pnpm run check`, `pnpm run build`, dan `pnpm run validate`.
- Halaman legal, trust, Kontak, dan Request Template tidak memiliki AdSlot; Request Template selalu `noindex, follow`.
- Hub resource kosong selalu `noindex, follow`, tidak masuk sitemap atau navigation, dan tidak boleh menjadi halaman public sample.
- Fixed CMS pages tidak boleh mengubah slug/route; target relation harus ada dan resource navigation ditentukan oleh content published.
- Helper resource publik harus memakai `CollectionEntry` atau union yang eksplisit dan tidak boleh mengekspos `any`.
- Relasi resource diselesaikan satu tingkat, dideduplikasi, dan mengabaikan target hilang atau draft; jangan membuat fallback yang tidak relevan.
- Fixture resource harus programatik atau berada di luar production content collection dan tidak boleh muncul di route, CMS, navigation, atau sitemap.
- Inventory layanan eksternal dan Privacy Policy harus diperbarui setiap kali integrasi berubah.
- CI harus tetap validation-only dan bebas deployment; jangan menambahkan Wrangler deploy atau command produksi ke workflow tanpa approval eksplisit.
- Permissions workflow GitHub Actions harus read-only kecuali approval eksplisit diperlukan.
- `pnpm run check`, `pnpm run build`, dan `pnpm run validate` harus lulus sebelum merge.
