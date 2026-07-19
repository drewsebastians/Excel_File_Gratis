---
name: excelgratis-content-rewrite-qa
description: Review draft rewrite atau implemented Markdown content untuk ExcelGratis sebelum merge. Gunakan untuk membandingkan fakta lama dan baru, mendeteksi kehilangan informasi penting, unsupported claims, SEO regression, broken frontmatter, style inconsistency, dan cumulative PR scope creep. Jangan gunakan sebagai penulis utama kecuali hanya perlu koreksi kecil.
---

# ExcelGratis Content Rewrite QA

Gunakan skill ini setelah draft dibuat dan sebelum merge.

## Required references

Baca:

- `../excelgratis-content-writer-id/references/quality-rubric.md`
- `../excelgratis-content-writer-id/references/seo-standard.md`
- `../excelgratis-content-writer-id/references/facts-and-evidence.md`
- `references/rewrite-manifest-schema.md`

## Non-negotiable merge rule

Jangan menyatakan implementasi aman atau “hanya mengubah N file” berdasarkan `git status`, working tree, staged diff, atau latest commit saja.

Sebelum verdict, wajib memeriksa **cumulative pull-request diff dari merge base/base branch ke HEAD**.

## QA workflow

### 1. Resolve approved scope

Catat:

- approved replacement pack;
- exact expected file allowlist;
- approved base branch;
- source/base commit bila tersedia;
- approved replacement checksum atau Git blob SHA.

Jangan menambah file ke allowlist hanya karena file tersebut sudah berada di branch.

### 2. Verify cumulative PR scope

Jika PR tersedia, periksa dengan GitHub changed-file list atau equivalent:

```bash
git fetch origin
git diff origin/<base>...HEAD --name-only
git diff --stat origin/<base>...HEAD
git log --oneline origin/<base>..HEAD
```

Bandingkan:

- expected files;
- actual cumulative PR files;
- unexpected files;
- missing files;
- commit count ahead;
- base SHA;
- head SHA.

Aturan:

- Setiap unexpected file adalah blocker sampai disetujui secara eksplisit.
- Jangan menganggap file dari commit lama “tidak terkait” hanya karena latest commit tidak menyentuhnya.
- Jangan memakai `git diff HEAD~1..HEAD` sebagai bukti scope PR.
- Bila PR branch membawa commit dari pekerjaan sebelumnya, minta clean branch/rebase/cherry-pick sebelum merge.
- Setelah branch dibersihkan, ulangi seluruh scope check dan validation.

### 3. Verify implementation identity

Untuk setiap approved replacement:

- bandingkan complete file, bukan passage terpilih;
- verifikasi frontmatter dan body;
- gunakan SHA-256 atau Git blob SHA bila tersedia;
- catat exact match atau divergence.

Jika implemented file berbeda dari approved replacement, review perbedaan tersebut sebagai perubahan baru.

### 4. Compare content scope

Periksa:

- file yang direncanakan;
- field frontmatter;
- body;
- internal links;
- draft status;
- asset path;
- route;
- relationship fields.

Tolak scope creep.

### 5. Fact preservation

Bandingkan verified facts:

- nama sheet;
- formula;
- input;
- output;
- compatibility;
- limitation;
- file metadata;
- version behavior;
- workbook structure.

Pastikan fakta penting tidak hilang saat konten dipersingkat.

### 6. Claim validation

Tandai:

- klaim baru;
- klaim diperkuat;
- klaim yang tidak memiliki bukti;
- contoh yang tidak konsisten;
- claim yang seharusnya masuk owner-verification queue.

### 7. SEO review

Periksa:

- title uniqueness;
- meta description;
- search intent;
- primary keyword naturalness;
- heading structure;
- internal links;
- cannibalization.

### 8. Style review

Periksa:

- intro 40–70 kata;
- paragraph length;
- filler;
- repetition;
- banned phrases;
- excessive slang;
- excessive bolding;
- generic AI pattern;
- mechanical reuse of golden sample.

### 9. Schema and technical validation

Pastikan:

- YAML valid;
- field sesuai schema;
- slug tidak berubah;
- relationship field valid;
- draft tetap aman;
- Markdown tidak rusak;
- link target tersedia;
- approved asset tidak berubah.

### 10. Repository validation

Jalankan command yang relevan, termasuk:

- dependency install sesuai lockfile;
- check;
- build;
- validate;
- collection-specific tests/audits.

Validation harus dijalankan ulang setelah rebase, cherry-pick, conflict resolution, atau branch cleanup.

### 11. Scoring and verdict

Gunakan quality rubric.

Status:

- **PASS:** score >=85, accuracy penuh, tidak ada blocker, exact implementation match, tests lulus, dan cumulative PR scope sesuai allowlist.
- **PASS WITH REVISION:** copy layak tetapi masih perlu minor edit atau implementation/branch cleanup sebelum merge.
- **FAIL:** unsupported claim, factual regression, broken schema, intent lemah, total <85, atau implementasi menyimpang secara substansial.

Scope blocker tidak boleh disamarkan sebagai minor note.

## Required output

Hasilkan:

1. QA status.
2. Explicit merge decision.
3. Base branch/base SHA dan head branch/head SHA.
4. Commit count ahead.
5. Expected changed files.
6. Actual cumulative PR changed files.
7. Unexpected and missing files.
8. Exact replacement hash comparison.
9. Blocking issues.
10. Minor edits.
11. Facts preserved.
12. Claims requiring verification.
13. SEO notes.
14. Quality score.
15. Test results.
16. Rewrite manifest.
17. Required remediation dan merge gate.

## Final reporting rule

Jangan menulis:

- “file berubah tepat N”;
- “tidak ada unrelated file”;
- “working tree bersih, jadi scope aman”;

kecuali full cumulative PR diff telah diverifikasi dan hasilnya dicatat.

Jangan merge atau publish kecuali task meminta secara eksplisit.
