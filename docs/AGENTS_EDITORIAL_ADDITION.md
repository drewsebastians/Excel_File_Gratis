# Editorial Addition for AGENTS.md

Tambahkan bagian berikut ke `AGENTS.md` repository. Jangan mengganti instruksi teknis yang sudah ada.

## Editorial and content rules

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
