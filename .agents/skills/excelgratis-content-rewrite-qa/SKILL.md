---
name: excelgratis-content-rewrite-qa
description: Review draft rewrite atau implemented Markdown content untuk ExcelGratis sebelum merge. Gunakan untuk membandingkan fakta lama dan baru, mendeteksi kehilangan informasi penting, unsupported claims, SEO regression, broken frontmatter, dan style inconsistency. Jangan gunakan sebagai penulis utama kecuali hanya perlu koreksi kecil.
---

# ExcelGratis Content Rewrite QA

Gunakan skill ini setelah draft dibuat dan sebelum merge.

## Required references

Baca:

- `../excelgratis-content-writer-id/references/quality-rubric.md`
- `../excelgratis-content-writer-id/references/seo-standard.md`
- `../excelgratis-content-writer-id/references/facts-and-evidence.md`
- `references/rewrite-manifest-schema.md`

## QA workflow

### 1. Compare scope

Periksa:

- file yang direncanakan,
- file yang berubah,
- field frontmatter,
- body,
- internal links,
- draft status,
- asset path.

Tolak scope creep.

### 2. Fact preservation

Bandingkan verified facts:

- nama sheet,
- formula,
- input,
- output,
- compatibility,
- limitation,
- file metadata.

Pastikan fakta penting tidak hilang saat konten dipersingkat.

### 3. Claim validation

Tandai:

- klaim baru,
- klaim diperkuat,
- klaim yang tidak memiliki bukti,
- contoh yang tidak konsisten.

### 4. SEO review

Periksa:

- title uniqueness,
- meta description,
- search intent,
- primary keyword naturalness,
- heading structure,
- internal links,
- cannibalization.

### 5. Style review

Periksa:

- intro 40–70 kata,
- paragraph length,
- filler,
- repetition,
- banned phrases,
- excessive slang,
- excessive bolding,
- generic AI pattern.

### 6. Schema and technical validation

Pastikan:

- YAML valid,
- field sesuai schema,
- slug tidak berubah,
- relationship field valid,
- draft tetap aman,
- Markdown tidak rusak.

### 7. Scoring

Gunakan quality rubric.

Status:

- PASS: >=85, accuracy full, no blocker.
- PASS WITH MINOR EDITS: koreksi kecil tanpa perubahan substansi.
- FAIL: unsupported claim, factual regression, broken schema, intent lemah, atau total <85.

## Output

Hasilkan:

1. QA status.
2. Blocking issues.
3. Minor edits.
4. Facts preserved.
5. Claims requiring verification.
6. SEO notes.
7. Quality score.
8. Test results.
9. Rewrite manifest.

Jangan merge atau publish kecuali task meminta secara eksplisit.
