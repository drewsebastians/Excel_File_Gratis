# Content Rewrite Consolidation Baseline

Recorded before clean integration on 2026-07-19.

## Main and deployment baseline

- `origin/main`: `3051ed6 feat: finalize Opsi 1 homepage redesign (#28)`.
- CI is validation-only in `.github/workflows/ci.yml`.
- Production deployment is `.github/workflows/deploy.yml`, triggered only by `main` or manual dispatch and deploying through `pnpm run deploy` with the Cloudflare secret.

## Open pull requests

| PR | Head SHA | Base | Cumulative contribution | Notes |
|---|---|---|---|---|
| #29 | `b06e1c8294f6a9aacc0606e5e97c959d89d907a4` | `main` | 17 skill/reference files, `AGENTS.md`, and two editorial docs | Original foundation. |
| #30 | `f2614058be0a0dbfea801b426a6a34126993c6ee` | `main` | #29 foundation plus three content files | Stacked; only its three content files are imported here. |
| #31 | `5276f055974d2809fddadd442daafeb8e99cc503` | `main` | #29 foundation plus v2 rewrite-QA skill and schema | Source of truth for final skill state. |
| #32 | `aae24d17b19994fc0c7a8d317c565f8e24491984` | `main` | Five Batch 01 template rewrites | Independent and imported exactly. |

## Exact content files to consolidate

- #30: `template-budget-bulanan.md`, `panduan-excel-table-vs-range.md`, `rumus-countifs-dashboard-status.md`.
- #32: `template-arus-kas-umkm.md`, `template-follow-up-pelanggan-excel.md`, `template-invoice-penjualan-umkm.md`, `template-jadwal-shift-sederhana.md`, `template-kalender-planner-2026.md`.

## Overlap and known validation issue

- #30 and #31 both include the #29 foundation in their cumulative PR diff. They must not be merged independently after this consolidation.
- `scripts/validate-build.mjs` contained fixed historical text assertions for invoice and arus kas usage headings. Those assertions do not track current frontmatter and fail valid approved rewrites; this integration replaces them with structural validation.
