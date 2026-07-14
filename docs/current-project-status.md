# Current Project Status

Audit date: 2026-07-14  
Audited base `main`: `526a71b` (`docs: record closure merge SHA`)  
Current `main` after Wave 2 squash merge: `011fd1bd0058a730f037cd01b95fa0969a122bb8`

## Executive status

Batch 1, Batch 2, Batch 2 custom 404 hotfix, Batch 3A planning, Batch 3 Wave 1, and Batch 3 Wave 2 are published. Wave 2 adds workbook-backed resources only; it does not add AdSense, Analytics, a database, a new service, or a public route.

## Current public inventory

The counts below were derived from the Markdown collections on the audited `main` commit, excluding drafts and internal fixtures:

| Resource type | Published | Public hub | Evidence |
| --- | ---: | --- | --- |
| Templates | 12 | `/templates/` | `src/content/templates/` and `public/downloads/` |
| Guides | 6 | `/panduan/` | `src/content/guides/` |
| Formula references | 4 | `/rumus-excel/` | `src/content/formulas/` |
| Troubleshooting pages | 4 | `/masalah-excel/` | `src/content/troubleshooting/` |
| Collections | 2 | `/koleksi/` | `src/content/collections/` |

Wave 2 adds Pembukuan Pengeluaran Usaha, Target Tabungan, Task Tracker Kanban Excel, and Notulen Rapat dan Action Item; three guides; two formula references; two troubleshooting pages; and Koleksi Template Keuangan Pribadi. The committed QA evidence is in `docs/qa/batch-3-wave-2/`.

## Completed batches and merged PRs

- PR #1: Batch 1 site foundation and SEO architecture.
- PR #2: Batch 2 trust and resource architecture.
- PR #3: custom 404 fallback hotfix.
- PR #4: Batch 3A content portfolio planning.
- PR #5: Batch 3 Wave 1 content portfolio.
- PR #6: render substantive template detail sections after production inspection.
- PR #9: Batch 3 Wave 2 content portfolio, squash merged as `011fd1bd0058a730f037cd01b95fa0969a122bb8` after the latest validation run passed. A superseded concurrent run was cancelled by the workflow concurrency rule.

All six PRs are merged into `main`. The latest two merged validation runs for PR #6 succeeded: [run 29188246431](https://github.com/drewsebastians/Excel_File_Gratis/actions/runs/29188246431) and [run 29188235101](https://github.com/drewsebastians/Excel_File_Gratis/actions/runs/29188235101).

## Architecture and content workflow

The Astro site renders published Content Collections into static routes. `src/lib/templates.ts` and `src/lib/resources.ts` provide typed published filtering and relation resolution. The sitemap and navigation are content-driven. Draft resources are excluded from public routes, navigation, related cards, and sitemap. The CMS field definitions in `public/admin/config.yml` must stay aligned with `src/content.config.ts`.

To create a future template, generate and inspect the workbook, store the QA evidence under `docs/qa/`, add the download and preview assets, then add a Markdown entry under `src/content/templates/` with `draft: true` during review. The Wave 1 and Wave 2 generators are `scripts/generate-batch3-wave1-workbooks.mjs` and `scripts/generate-batch3-wave2-workbooks.mjs`. Guides, formulas, troubleshooting pages, and collections use the corresponding content folders and CMS collections.

## QA and CI evidence

Required local checks are:

```text
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm run validate
```

The latest available GitHub Actions validation for the post-release hotfix passed. The CI workflow is validation-only; it does not deploy Cloudflare, access production secrets, or activate external tracking. The repeatable smoke procedure is in `docs/production-smoke-checklist.md`.

## Production evidence

The public smoke pass on 2026-07-14 loaded the homepage, template directory, category directory, legacy template, all four Wave 1 template pages, all resource hubs, representative guide/formula/troubleshooting pages, collection hub/detail, Contact, Request Template, HTML sitemap, unknown-route 404, and the CMS shell. Wave 1 detail pages showed their substantive article sections and two download links. Canonical URLs were absolute and the Request Template page returned `noindex, follow`. The unknown route resolved to the custom 404 page with `noindex, follow`.

The in-app browser blocked direct display of `robots.txt` and `sitemap.xml`, so those two endpoints were verified separately with a direct HTTP client: both returned HTTP 200, `robots.txt` returned `text/plain`, and `sitemap.xml` returned `application/xml`. A published Wave 1 workbook download also returned HTTP 200 with the expected `.xlsx` content type. No authenticated Cloudflare dashboard or Search Console evidence was available in this audit.

## Wave 2 scope

Wave 2 is implemented in the current release branch. Each of its four workbooks has actual synthetic Indonesian sample data, formulas, tables, validation, generated preview, full-sheet render verification, and a machine-readable QA report. Content entries are published only after the linked download, preview, and QA evidence exist.

## Wave 3 scope

Wave 3 remains planned: Catatan Pengeluaran Harian, Jadwal Shift Sederhana, Tracker Proyek Sederhana, supporting guides, formula references, troubleshooting pages, and a productivity collection. Shift content requires a specific review to avoid payroll, labor-law, or entitlement claims.

## Deferred evidence-driven scope

Google Search Console, Google Trends, private request data, authenticated Cloudflare deployment history, and authenticated AdSense dashboards were not available. Demand scores remain directional editorial estimates. AdSense, Analytics, cookies, new forms, and additional services remain inactive. Education and Household/Event expansion should wait for stronger evidence and owner review.

## Recommended next sequence

1. Release future content in controlled batches, re-running the build, validation, and production smoke checklist after each release.
2. Reassess AdSense readiness only after the public resource base, privacy posture, and owner policy review support a separate implementation decision.
