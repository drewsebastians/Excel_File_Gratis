# Current Project Status

Audit date: 2026-07-14  
Audited `main`: `0a287ddfd0d0ecb4a3bab68095a759b6b125f4d6` (`feat: publish Batch 3 Wave 3 content portfolio`)
Wave 3 merge PR: #10, squash merged on 2026-07-14

## Executive status

Batch 1, Batch 2, Batch 2 custom 404 hotfix, Batch 3A planning, and Batch 3 Waves 1-3 are published. Batch 3 reaches its planned portfolio target. Wave 3 adds workbook-backed resources only; it does not add AdSense, Analytics, a database, a new service, or a public route type.

## Current public inventory

The counts below were derived from the Markdown collections on the audited `main` commit, excluding drafts and internal fixtures:

| Resource type | Published | Public hub | Evidence |
| --- | ---: | --- | --- |
| Templates | 15 | `/templates/` | `src/content/templates/` and `public/downloads/` |
| Guides | 8 | `/panduan/` | `src/content/guides/` |
| Formula references | 6 | `/rumus-excel/` | `src/content/formulas/` |
| Troubleshooting pages | 6 | `/masalah-excel/` | `src/content/troubleshooting/` |
| Collections | 3 | `/koleksi/` | `src/content/collections/` |

Wave 2 adds Pembukuan Pengeluaran Usaha, Target Tabungan, Task Tracker Kanban Excel, and Notulen Rapat dan Action Item; three guides; two formula references; two troubleshooting pages; and Koleksi Template Keuangan Pribadi. Wave 3 adds Catatan Pengeluaran Harian, Jadwal Shift Sederhana, Tracker Proyek Sederhana; two guides; two formula references; two troubleshooting pages; and Koleksi Template Produktivitas Kerja. The committed QA evidence is in `docs/qa/batch-3-wave-2/` and `docs/qa/batch-3-wave-3/`.

## Completed batches and merged PRs

- PR #1: Batch 1 site foundation and SEO architecture.
- PR #2: Batch 2 trust and resource architecture.
- PR #3: custom 404 fallback hotfix.
- PR #4: Batch 3A content portfolio planning.
- PR #5: Batch 3 Wave 1 content portfolio.
- PR #6: render substantive template detail sections after production inspection.
- PR #9: Batch 3 Wave 2 content portfolio, squash merged as `011fd1bd0058a730f037cd01b95fa0969a122bb8` after the latest validation run passed. A superseded concurrent run was cancelled by the workflow concurrency rule.
- PR #10: Batch 3 Wave 3 content portfolio, squash merged as `0a287ddfd0d0ecb4a3bab68095a759b6b125f4d6`. The latest validation run for the PR passed; an earlier run on the same SHA was cancelled by the workflow concurrency rule.

All listed PRs are merged into `main`. The latest two merged validation runs for PR #6 succeeded: [run 29188246431](https://github.com/drewsebastians/Excel_File_Gratis/actions/runs/29188246431) and [run 29188235101](https://github.com/drewsebastians/Excel_File_Gratis/actions/runs/29188235101).

## Architecture and content workflow

The Astro site renders published Content Collections into static routes. `src/lib/templates.ts` and `src/lib/resources.ts` provide typed published filtering and relation resolution. The sitemap and navigation are content-driven. Draft resources are excluded from public routes, navigation, related cards, and sitemap. The CMS field definitions in `public/admin/config.yml` must stay aligned with `src/content.config.ts`.

To create a future template, generate and inspect the workbook, store the QA evidence under `docs/qa/`, add the download and preview assets, then add a Markdown entry under `src/content/templates/` with `draft: true` during review. The Wave 1, Wave 2, and Wave 3 generators are `scripts/generate-batch3-wave1-workbooks.mjs`, `scripts/generate-batch3-wave2-workbooks.mjs`, and `scripts/generate-batch3-wave3-workbooks.mjs`. Guides, formulas, troubleshooting pages, and collections use the corresponding content folders and CMS collections.

## QA and CI evidence

Required local checks are:

```text
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm run validate
```

The latest GitHub Actions validation for PR #10 passed. The CI workflow is validation-only; it does not deploy Cloudflare, access production secrets, or activate external tracking. The repeatable smoke procedure is in `docs/production-smoke-checklist.md`.

## Production evidence

The public smoke pass on 2026-07-14 loaded the homepage, template directory, category directory, legacy template, all four Wave 1 template pages, all resource hubs, representative guide/formula/troubleshooting pages, collection hub/detail, Contact, Request Template, HTML sitemap, unknown-route 404, and the CMS shell. Wave 1 detail pages showed their substantive article sections and two download links. Canonical URLs were absolute and the Request Template page returned `noindex, follow`. The unknown route resolved to the custom 404 page with `noindex, follow`.

The in-app browser blocked direct display of `robots.txt` and `sitemap.xml`, so those two endpoints were verified separately with a direct HTTP client: both returned HTTP 200, `robots.txt` returned `text/plain`, and `sitemap.xml` returned `application/xml`. A published Wave 1 workbook download also returned HTTP 200 with the expected `.xlsx` content type. No authenticated Cloudflare dashboard or Search Console evidence was available in this audit.

Post-merge HTTP checks on 2026-07-14 returned HTTP 200 for the three Wave 3 template pages, the productivity collection, `sitemap.xml`, and `robots.txt`. The Tracker Proyek workbook download returned HTTP 200 with `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`. The local in-app browser could not reach the local preview server, so desktop/mobile interactive review remains a checklist item for a browser session that can access the deployed site; this limitation did not affect the workbook visual QA or production HTTP checks.

## Wave 2 scope

Wave 2 is implemented in the current release branch. Each of its four workbooks has actual synthetic Indonesian sample data, formulas, tables, validation, generated preview, full-sheet render verification, and a machine-readable QA report. Content entries are published only after the linked download, preview, and QA evidence exist.

## Wave 3 scope

Wave 3 is published: Catatan Pengeluaran Harian, Jadwal Shift Sederhana, Tracker Proyek Sederhana, supporting guides, formula references, troubleshooting pages, and a productivity collection. Each new workbook has generated preview, full-sheet render verification, and machine-readable QA evidence. Shift content states its non-payroll and non-compliance limitations. The portfolio audit is in `docs/post-batch-3-audit.md`.

## Deferred evidence-driven scope

Google Search Console, Google Trends, private request data, authenticated Cloudflare deployment history, and authenticated AdSense dashboards were not available. Demand scores remain directional editorial estimates. AdSense, Analytics, cookies, new forms, and additional services remain inactive. Education and Household/Event expansion should wait for stronger evidence and owner review.

## Recommended next sequence

1. Complete the remaining browser-based desktop/mobile smoke checklist when a production-capable browser session is available.
2. Reassess AdSense readiness only after the public resource base, privacy posture, and owner policy review support a separate implementation decision.
