# Current Project Status

Audit date: 2026-07-14  
Audited `main`: `918f097b0d49c2089ebfd94d41a7d580bb7ff6f3` (`ci: harden Cloudflare production deployment (#12)`)
Run 1 draft merge PR: #11; deployment hardening PR: #12; both squash merged on 2026-07-14

## Executive status

Batch 1, Batch 2, Batch 2 custom 404 hotfix, Batch 3A planning, and Batch 3 Waves 1-3 are published. Batch 3 reaches its planned portfolio target. Wave 3 adds workbook-backed resources only; it does not add AdSense, Analytics, a database, a new service, or a public route type.

## Current public inventory

The counts below were derived from the Markdown collections on the audited `main` commit, excluding drafts and internal fixtures. This is the public portfolio; draft inventory is listed separately below:

| Resource type | Published | Public hub | Evidence |
| --- | ---: | --- | --- |
| Templates | 15 | `/templates/` | `src/content/templates/` and `public/downloads/` |
| Guides | 8 | `/panduan/` | `src/content/guides/` |
| Formula references | 6 | `/rumus-excel/` | `src/content/formulas/` |
| Troubleshooting pages | 6 | `/masalah-excel/` | `src/content/troubleshooting/` |
| Collections | 3 | `/koleksi/` | `src/content/collections/` |

## Current draft inventory

The repository contains exactly 40 editorial drafts that are intentionally excluded from public routes, navigation, related resources, and the sitemap:

| Resource type | Draft count | Source |
| --- | ---: | --- |
| Excel templates | 20 | `src/content/templates/` with `draft: true`; matching workbook and preview assets are present in the repository |
| Belajar Excel guides | 20 | `src/content/guides/` with `draft: true`; article image fields are available for later editorial media |

These 40 drafts are preparation work, not published resources. Each item requires editorial review, content/resource relation review, final image and alt-text review, and the required workbook QA where applicable before changing `draft` to `false`.

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
- PR #11: 20 template drafts and 20 guide drafts, squash merged as `2c29ad05bb6e6365d9dc3b490d5bdf416e2b3c72`. These remain drafts and do not change the public inventory.
- PR #12: Cloudflare production deployment hardening and documentation, squash merged as `918f097b0d49c2089ebfd94d41a7d580bb7ff6f3`.

All listed PRs are merged into `main`. The latest two merged validation runs for PR #6 succeeded: [run 29188246431](https://github.com/drewsebastians/Excel_File_Gratis/actions/runs/29188246431) and [run 29188235101](https://github.com/drewsebastians/Excel_File_Gratis/actions/runs/29188235101).

## Architecture and content workflow

The Astro site renders published Content Collections into static routes. `src/lib/templates.ts` and `src/lib/resources.ts` provide typed published filtering and relation resolution. The sitemap and navigation are content-driven. Draft resources are excluded from public routes, navigation, related cards, and sitemap. The CMS field definitions in `public/admin/config.yml` must stay aligned with `src/content.config.ts`.

To create or review a future template, generate and inspect the workbook, store QA evidence under `docs/qa/`, verify the download and preview assets, then keep the Markdown entry under `src/content/templates/` at `draft: true` until review is complete. Guides use the same draft gate in `src/content/guides/`. The 20 template and 20 guide drafts from PR #11 are the current scheduled portfolio. The Wave 1, Wave 2, and Wave 3 generators are `scripts/generate-batch3-wave1-workbooks.mjs`, `scripts/generate-batch3-wave2-workbooks.mjs`, and `scripts/generate-batch3-wave3-workbooks.mjs`. Guides, formulas, troubleshooting pages, and collections use the corresponding content folders and CMS collections.

## Product and image support

The `/kategori/` directory is now an explanatory template-category directory: populated categories show descriptions, published-resource counts, previews, and calls to action. It is not a gallery-only page and it is not a second collection hub. Empty categories remain non-promoted according to the existing visibility rules.

Article-capable collections support optional `preview_image` and `preview_alt` fields. Guides, formulas, troubleshooting pages, and collections can use `/assets/articles/` media through the CMS and article/card layouts. The fields are optional for backward compatibility; an image must be meaningful and its alt text must describe the visible content.

## Deployment architecture

Astro generates the static `dist` directory. Cloudflare Worker `excelfilegratis` serves that directory through the `ASSETS` binding and the custom domain `excelgratis.my.id`, with `src/worker.js` handling the Worker request boundary and OAuth routes. The approved production path is GitHub Actions `.github/workflows/deploy.yml`: push or manual dispatch from `main`, read-only GitHub permissions, required validation, then `pnpm run deploy` using the repository secret `CLOUDFLARE_API_TOKEN`. Wrangler configuration is sourced from `wrangler.jsonc`.

## QA and CI evidence

Required local checks are:

```text
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm run validate
```

The required repository checks passed on the audited commit: `pnpm install --frozen-lockfile`, `pnpm run check`, `pnpm run build`, and `pnpm run validate`. The validation workflow remains validation-only. The explicit production workflow is `.github/workflows/deploy.yml`, which runs only from `main` or manual dispatch, runs the required checks before deploy, uses minimal read-only GitHub permissions, and reads `CLOUDFLARE_API_TOKEN` only from GitHub Secrets. The workflow contract is also checked by `pnpm run test:workflow`.

## Production evidence

The public smoke pass on 2026-07-14 loaded the homepage, template directory, category directory, legacy template, all four Wave 1 template pages, all resource hubs, representative guide/formula/troubleshooting pages, collection hub/detail, Contact, Request Template, HTML sitemap, unknown-route 404, and the CMS shell. Wave 1 detail pages showed their substantive article sections and two download links. Canonical URLs were absolute and the Request Template page returned `noindex, follow`. The unknown route resolved to the custom 404 page with `noindex, follow`.

The authenticated GitHub Actions production deployment for the audited `main` completed successfully: [run 29310597820](https://github.com/drewsebastians/Excel_File_Gratis/actions/runs/29310597820) deployed commit `918f097b0d49c2089ebfd94d41a7d580bb7ff6f3` as Worker `excelfilegratis` on `excelgratis.my.id`. Wrangler reported Cloudflare version `ccc67e16-5c35-4f06-91b3-396ed825ed61`. This is production evidence, distinct from validation-only CI.

The immediate HTTP smoke check for the audited deployment returned HTTP 200 for `/`, `/kategori/`, a published template page, `sitemap.xml`, `robots.txt`, and a published `.xlsx` download; the XML, text, and workbook content types were correct. No authenticated Cloudflare Dashboard session, Search Console data, Decap OAuth login evidence, or mailbox-delivery evidence was available. The GitHub Actions run is verified deployment evidence, while those dashboard and owner-operated checks remain separate.

Post-merge HTTP checks on 2026-07-14 returned HTTP 200 for the three Wave 3 template pages, the productivity collection, `sitemap.xml`, and `robots.txt`. The Tracker Proyek workbook download returned HTTP 200 with `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`. The local in-app browser could not reach the local preview server, so desktop/mobile interactive review remains a checklist item for a browser session that can access the deployed site; this limitation did not affect the workbook visual QA or production HTTP checks.

## Wave 2 scope

Wave 2 is implemented in the current release branch. Each of its four workbooks has actual synthetic Indonesian sample data, formulas, tables, validation, generated preview, full-sheet render verification, and a machine-readable QA report. Content entries are published only after the linked download, preview, and QA evidence exist.

## Wave 3 scope

Wave 3 is published: Catatan Pengeluaran Harian, Jadwal Shift Sederhana, Tracker Proyek Sederhana, supporting guides, formula references, troubleshooting pages, and a productivity collection. Each new workbook has generated preview, full-sheet render verification, and machine-readable QA evidence. Shift content states its non-payroll and non-compliance limitations. The portfolio audit is in `docs/post-batch-3-audit.md`.

## Work remaining before draft publication

1. Review each draft guide for Indonesian clarity, source attribution, examples, version limits, internal links, and a meaningful article image/alt text where one is used.
2. Review each draft template against its linked workbook, preview, download filename, usage instructions, limitations, and related resources.
3. Run workbook QA and inspect the generated preview/full-sheet render for each template before publication.
4. Publish in the planned cadence by changing only reviewed entries from `draft: true` to `draft: false`, then run all required checks and the public smoke checklist.

## Deferred evidence-driven scope

Google Search Console, Google Trends, private request data, authenticated Cloudflare Dashboard history, Decap OAuth login, and mailbox delivery remain owner-credential checks. Demand scores remain directional editorial estimates. AdSense, Analytics, cookies, new forms, and additional services remain inactive. Education and Household/Event expansion should wait for stronger evidence and owner review.

## Recommended next sequence

1. Complete the remaining browser-based desktop/mobile smoke checklist and owner-credential checks when access is available.
2. Review the 40 draft resources in batches, beginning with workbook QA and editorial review.
3. Reassess AdSense readiness only after the public resource base, privacy posture, and owner policy review support a separate implementation decision.
