---
name: excelgratis-content-auditor
description: Audit seluruh atau sebagian konten ExcelGratis sebelum rewrite. Gunakan untuk menemukan paragraf terlalu panjang, repetisi, generic AI writing, unsupported claims, duplicate intent, metadata lemah, cannibalization, dan prioritas rewrite. Jangan gunakan untuk langsung mengubah semua konten.
---

# ExcelGratis Content Auditor

Gunakan skill ini sebelum rewrite massal atau saat menentukan halaman prioritas.

## Scope

Audit file Markdown di:

- `src/content/templates/`
- `src/content/guides/`
- `src/content/formulas/`
- `src/content/troubleshooting/`
- `src/content/collections/`
- `src/content/site-pages/`

## Required references

Baca:

- `../excelgratis-content-writer-id/references/brand-voice.md`
- `../excelgratis-content-writer-id/references/seo-standard.md`
- `../excelgratis-content-writer-id/references/facts-and-evidence.md`
- `references/audit-output-schema.md`

## Audit dimensions

Untuk setiap halaman, nilai:

1. Search intent clarity.
2. Intro directness.
3. Paragraph length.
4. Repetition.
5. Generic or AI-like phrasing.
6. Technical accuracy risk.
7. Unsupported claims.
8. Metadata uniqueness.
9. Keyword stuffing.
10. Cannibalization risk.
11. Internal-link opportunity.
12. Page-type structure.
13. FAQ usefulness.
14. Trust and limitations.
15. Rewrite priority.

## Rules

- Audit tidak boleh mengubah content file.
- Jangan menyimpulkan workbook facts tanpa bukti.
- Pisahkan `confirmed issue` dari `needs verification`.
- Jangan menggunakan word count saja sebagai indikator kualitas.
- Prioritaskan halaman berdasarkan business value, traffic potential, severity, dan confidence.
- Site/legal pages harus diaudit terpisah dari tutorial content.

## Output

Hasilkan:

1. Executive summary.
2. Inventory per collection.
3. Page-level audit table.
4. Top repeated phrases.
5. Potential keyword cannibalization pairs.
6. Unsupported-claim queue.
7. Recommended golden samples.
8. Rewrite batch plan, maksimal 5–10 halaman per batch.
9. Owner-verification queue.

Gunakan format pada `references/audit-output-schema.md`.
