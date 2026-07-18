---
name: excelgratis-content-writer-id
description: Tulis atau tulis ulang konten publik Bahasa Indonesia untuk ExcelGratis, termasuk template, guide, formula, troubleshooting, collection, dan site page. Gunakan saat konten harus dibuat lebih ringkas, praktis, menarik, akurat, dan SEO-friendly. Jangan gunakan untuk perubahan code, layout, deployment, atau klaim fitur yang belum diverifikasi.
---

# ExcelGratis Content Writer ID

Gunakan skill ini untuk membuat atau menulis ulang konten publik di `src/content/`.

## Wajib dibaca

Sebelum menulis, baca referensi yang sesuai:

- `references/brand-voice.md`
- `references/seo-standard.md`
- `references/facts-and-evidence.md`
- `references/banned-phrases.md`
- `references/quality-rubric.md`
- Referensi tipe halaman yang relevan.

## Scope

Skill ini berlaku untuk:

- `src/content/templates/*.md`
- `src/content/guides/*.md`
- `src/content/formulas/*.md`
- `src/content/troubleshooting/*.md`
- `src/content/collections/*.md`
- `src/content/site-pages/*.md`

## Non-negotiable rules

1. Jangan mengubah fakta teknis tanpa bukti.
2. Jangan mengubah slug, route, filename, asset path, draft status, atau relationship field kecuali task meminta secara eksplisit.
3. Pertahankan frontmatter yang benar dan schema-compatible.
4. Jangan menambah keyword hanya untuk mengejar panjang.
5. Jangan menduplikasi narasi antarhalaman.
6. Jawaban utama harus terlihat dalam 40–70 kata pertama.
7. Gunakan Bahasa Indonesia natural dan mudah dipindai di mobile.
8. Jangan mengklaim fitur workbook berdasarkan asumsi.
9. Jangan menyatakan kompatibilitas penuh dengan Google Sheets tanpa bukti.
10. Jangan mempublikasikan draft.

## Workflow

### 1. Tentukan jenis halaman

Pilih satu:

- template
- guide
- formula
- troubleshooting
- collection
- site page

Baca referensi tipe halaman terkait.

### 2. Kumpulkan fakta

Periksa:

- frontmatter,
- isi lama,
- workbook atau asset jika tersedia,
- screenshot,
- script validasi,
- schema,
- halaman terkait,
- informasi internal repository.

Buat dua daftar internal:

- `verified facts`
- `unverified claims`

Hapus atau tandai klaim yang tidak terverifikasi.

### 3. Tetapkan search intent

Pilih intent utama:

- download
- instructional
- reference
- troubleshooting
- comparison
- discovery/navigation

Jangan mencampur terlalu banyak intent dalam satu halaman.

### 4. Buat SEO brief

Tentukan:

- primary keyword,
- 2–6 secondary terms,
- user problem,
- desired result,
- unique value,
- internal-link candidates.

Ikuti `references/seo-standard.md`.

### 5. Tulis ulang

- Mulai dengan hasil atau manfaat konkret.
- Gunakan heading yang spesifik.
- Ubah paragraf panjang menjadi blok singkat.
- Hapus pengulangan.
- Gunakan daftar hanya ketika mempercepat pemahaman.
- Sertakan contoh angka atau skenario hanya jika sesuai isi file.
- Jelaskan batasan secara jujur.
- Akhiri dengan next step yang jelas.

### 6. Perbarui metadata secara selektif

Perbarui `title`, `meta_title`, `meta_description`, `summary`, `ringkasan_singkat`, `suggested_h1`, atau heading field hanya bila kualitas atau SEO memang meningkat.

Jangan mengubah field teknis lain tanpa alasan.

### 7. Self-review

Nilai konten menggunakan `references/quality-rubric.md`.

Syarat:

- Accuracy = 100%.
- Total score >= 85.
- Tidak ada unsupported claim.
- Tidak ada keyword stuffing.
- Tidak ada broken Markdown.
- Tidak ada heading kosong atau duplikatif.

## Output untuk drafting eksternal

Jika task hanya meminta draft dan bukan implementasi repo, hasilkan:

1. Path file.
2. Frontmatter yang diusulkan.
3. Body Markdown lengkap.
4. Verified facts.
5. Items needing owner verification.
6. Primary keyword dan search intent.
7. Quality score.

## Output untuk implementasi langsung

Jika task meminta edit repo:

1. Ubah hanya file dalam scope.
2. Buat manifest perubahan.
3. Jalankan test yang diwajibkan repository.
4. Laporkan file, metadata, fakta, dan hasil validasi.
