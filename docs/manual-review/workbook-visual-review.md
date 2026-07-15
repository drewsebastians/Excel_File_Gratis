# Workbook Visual Review

This package supports review of the 20 unpublished template workbooks. It does not publish any resource and it does not replace review in Microsoft Excel.

## Automated evidence

The GitHub Actions workflow runs the OOXML structural audit first, then uses LibreOffice headless and Poppler to create PDF and PNG files. A successful artifact proves only that the source workbook rendered in that environment. It can flag zero-byte or unusually small PNG pages, missing output, and conversion warnings.

LibreOffice may render fonts, charts, print settings, formula results, data validation, conditional formatting, and page layout differently from Microsoft Excel. Thus `render_generated` means ready to inspect, never visually approved.

## Owner Procedure

1. Open the Actions artifact and use `index.html` to locate the workbook PDF/PNG pages.
2. Open the original `.xlsx` in desktop Microsoft Excel.
3. Complete its row in [workbook-visual-review.csv](workbook-visual-review.csv). Record `owner_passed` only after every applicable field is satisfactory.
4. Record `owner_failed` for a defect and describe the worksheet and symptom in `notes`. Keep the template draft until it is repaired and structurally re-audited.
5. Keep `pending_owner_review` whenever any field cannot be verified. A green Actions run never changes this decision automatically.

Suggested first batch: Checklist Acara, Daftar Belanja Rumah Tangga, Jadwal Belajar Siswa, Kalender Konten Media Sosial, Rekap Penjualan Bulanan, and Rencana Proyek Sederhana. None is automatically approved or published.

## Decision Rules

- `owner_passed`: opened successfully in Microsoft Excel, no repair prompt, no material visual defect, and all relevant checks complete.
- `owner_failed`: a layout, formula-result, validation, chart, print-preview, preview-agreement, or limitations issue needs repair.
- `pending_owner_review`: default state, including a successful LibreOffice rendering.

Do not publish a template until structural QA is passed, its render is generated, its owner decision is `owner_passed`, and all separate editorial, relation, SEO, and release gates pass.
