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
- `.github/workflows/ci.yml` harus tetap validation-only. `.github/workflows/deploy.yml` adalah satu-satunya workflow produksi yang diizinkan, berjalan hanya untuk `main` atau pemicu manual, dan memakai `CLOUDFLARE_API_TOKEN` hanya dari GitHub Secrets.
- Permissions workflow GitHub Actions harus read-only kecuali approval eksplisit diperlukan.
- `pnpm run check`, `pnpm run build`, dan `pnpm run validate` harus lulus sebelum merge.
- Draft templates dan guides harus tetap `draft: true` sampai editorial review, asset review, dan QA selesai; draft tidak boleh muncul di route, navigation, related resources, atau sitemap.

## ExcelGratis Content Editorial Rules

- Untuk membuat, menulis ulang, atau mengaudit konten publik Bahasa Indonesia, gunakan skill repo di `.agents/skills/`.
- Gunakan `excelgratis-content-writer-id` untuk penulisan dan rewrite.
- Gunakan `excelgratis-content-auditor` sebelum rewrite massal.
- Gunakan `excelgratis-content-rewrite-qa` sebelum konten dianggap selesai.
- Prioritaskan akurasi terhadap workbook, formula, screenshot, schema, dan perilaku aktual website.
- Jangan menambahkan fitur, kompatibilitas, jumlah sheet, rumus, otomatisasi, atau klaim manfaat yang belum diverifikasi.
- Jangan mengubah slug, route, filename, relationship field, draft status, atau asset path hanya untuk memperbaiki tulisan.
- Jangan melakukan keyword stuffing atau membuat paragraf generik untuk menambah panjang artikel.
- Setiap halaman harus menjawab kebutuhan utama pembaca pada 40–70 kata pertama.
- Gunakan Bahasa Indonesia praktis, natural, profesional, dan ramah. Hindari gaya terlalu formal, terlalu promosi, atau terlalu banyak slang.
- Pertahankan istilah antarmuka Excel dalam bahasa yang benar. Nama sheet, field, formula, dan error harus sesuai sumber aktual.
- Konten draft tetap `draft: true` sampai editorial review, asset review, dan QA selesai.
- Rewrite massal harus dilakukan dalam batch kecil dan menghasilkan manifest perubahan.
- Setelah perubahan konten, jalankan minimal `pnpm run check`, `pnpm run build`, dan `pnpm run validate`.
