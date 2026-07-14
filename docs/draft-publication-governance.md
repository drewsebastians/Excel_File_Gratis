# Draft Publication Governance

This document governs the 40 draft resources in `src/content/templates/` and `src/content/guides/`. It does not publish content. The machine-readable register is `docs/draft-content-readiness.csv`, and the repeatable audit is `pnpm run audit:drafts`.

## Definitions

### Draft prepared

“Draft prepared” means the Markdown entry has the required collection metadata, a stable slug, a clear title and summary, useful body content, and the intended asset references. For a template, it also means the referenced `.xlsx` and preview assets exist. Prepared does not mean approved or ready for publication.

### QA passed

“QA passed” means evidence exists for the relevant resource type. A template needs workbook inspection, formula/error checks, data-validation and table checks, preview/full-sheet visual inspection, file and download checks, and a machine-readable QA report under `docs/qa/`. A guide needs content/schema validation, rendered-route checks, link/relation checks, image/alt-text checks when media is used, and SEO metadata review. A status cannot be marked `passed` from intention or from a successful source build alone.

### Ready for publication

A resource is `ready_for_release` only when all applicable checks in the register are `passed`, no structural audit errors remain, the content is still intentionally marked `draft: true` until the release commit, and the owner gates are complete. A draft is not ready merely because its workbook or article text exists.

## Required checks

### Templates

Before release, verify:

1. Markdown metadata, slug, category, filename, preview path, alt text, and limitations match the workbook.
2. The `.xlsx` opens in the supported application versions and has no unexpected macro, external link, formula error, broken table, or invalid data validation.
3. Sample data, formulas, totals, charts, filters, and blank-input behavior reconcile to the intended use.
4. Workbook QA report, preview image, full-sheet render, and download asset are stored and reviewable.
5. Instructions, related resources, SEO fields, and disclaimers are accurate and do not make accounting, legal, payroll, tax, or compliance promises.

### Guides

Before release, verify:

1. The article teaches one clear task in familiar Indonesian and separates steps, examples, caveats, and version limits.
2. Claims and source references are reviewed; advanced features identify the Excel version where relevant.
3. Related resources resolve to existing resources and do not point to drafts or missing slugs.
4. `preview_image` and `preview_alt` are reviewed when used; image media must help the reader understand the article.
5. Title, meta title, meta description, canonical behavior, heading structure, and internal links are checked in the generated page.

## Risk classification

- `low`: educational or personal organization material with limited risk of being mistaken for a formal business, employment, financial, or compliance record.
- `medium`: useful operational material that needs editorial review for scope, compatibility, wording, or data handling.
- `high`: finance, accounting, customer data, HR, procurement, formal business documents, assets, debt, payment, payroll-adjacent, or compliance-sensitive material.

The register flags at least the following template topics as `high`: Laba Rugi, Kas Kecil, Daftar Piutang Pelanggan, Purchase Order, Surat Jalan, Form Permintaan Pembelian, Absensi, Jadwal Kerja, customer-data templates, and related finance/accounting/procurement/HR resources. Codex can verify repository structure and technical evidence, but it cannot replace owner acceptance for these topics.

## Owner review gates

Owner review is required for every draft before publication. High-risk entries use `manual_owner_gate` as their release status and require explicit confirmation that the wording, limitations, data handling, and intended use are acceptable. Owner credentials are also required for production smoke, Decap OAuth login, mailbox delivery, and Search Console checks when those checks are in scope. Do not convert an unavailable external check into `passed`.

## Proposed release waves

The initial proposal is deliberately conservative:

- `wave-1-low-risk`: four low-risk templates (`Checklist Acara`, `Daftar Belanja Rumah Tangga`, `Jadwal Belajar Siswa`, `Kalender Konten Media Sosial`) plus nine basic productivity/Excel guides identified in the register. Release only after their independent QA and editorial gates pass.
- `wave-2-follow-up`: remaining medium-risk templates and guides after relation, SEO, visual, and technical review. Keep category batches coherent and avoid publishing overlapping items together without a clear internal-link role.
- `owner-review-wave`: the 13 high-risk templates. Finance, HR, procurement, customer-data, formal business-document, and compliance-sensitive resources must not be in the first automatic release wave.

The register's `publication_wave` is a proposal, not a publish command. `planned_publish_date` remains empty until the owner chooses a release date.

## Release and rollback rules

Publish one scheduled batch only after the register is updated with evidence, the relevant entries change from `draft: true` to `draft: false` in an intentional commit, and all required checks pass. Never publish by changing a whole directory or by bypassing the draft gate. Review the diff for accidental draft changes before merge.

If a published resource causes a material regression, revert the release commit and deploy the revert through the approved `main` workflow. For an urgent production issue, roll back to the last verified Worker version in Cloudflare, then make the repository revert so source and production return to the same known state.

## Post-publication smoke checks

After each release, record the deployed `main` SHA and GitHub Actions deployment run. Check the homepage, relevant hub and category page, each released detail route, preview and download links, sitemap, robots, canonical metadata, internal links, mobile layout, and one representative workbook download. Confirm drafts remain absent from routes, navigation, related cards, and sitemap. A green validation workflow alone is not evidence that Cloudflare or a mailbox delivered the release.

## Keep unpublished when

Keep a draft unpublished when any required asset is missing, workbook QA is missing or failed, visual review is incomplete, a relation is broken, metadata is incomplete, the page would make unsupported formal claims, owner acceptance is missing, the proposed wave is not approved, or an external production check is required but unavailable. The safe default is to keep `draft: true`.

## RUN 4 QA evidence

The 20 draft workbooks have machine-readable reports under
`docs/qa/draft-workbooks/` and can be regenerated with `pnpm run qa:workbooks`.
The OOXML checks passed for all 20 files. Visual inspection is explicitly
recorded as `not_run` because the repository CI environment does not include
Excel or LibreOffice; desktop rendering and preview agreement remain owner
gates before publication.
