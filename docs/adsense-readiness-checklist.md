# AdSense Readiness Checklist

Status: no implementation. This document does not approve or implement AdSense.

## Post-Wave-1 Assessment — 2026-07-14

Repository checks now cover 15 published templates, 8 published guides, 6 published formula references, 6 published troubleshooting pages, and 3 published collections. Batch 3 Wave 3 adds three workbook-backed templates with generated previews and versioned QA evidence. The final Batch 3 audit is recorded in `docs/post-batch-3-audit.md`.

AdSense remains inactive. The internal content target in this document is an editorial readiness target owned by this project, not an official Google requirement and not a guarantee of eligibility. Batch 3 completion does not approve ads or tracking. Any future AdSense decision still requires a separate implementation and privacy/policy review.

## Current Recommendation

Do not add AdSense during Batch 3A. Reassess only after the site has a larger set of original, useful, published resources and the owner has reviewed policy, privacy, and UX implications.

## Minimum Content Readiness

Before applying or adding ad placements:

- The site has a meaningful body of original public content, not only thin download pages.
- Each template page explains the workbook clearly and honestly.
- Guides, formula pages, troubleshooting pages, and collections are useful without requiring an ad click or download.
- No public category is empty or mostly placeholder content.
- Collections link to already-published resources.
- Pages avoid copied competitor wording and generic filler.
- High-risk finance/business pages include careful disclaimers.
- Content has been proofread in Indonesian.

## Technical Readiness

Before implementation:

- `pnpm run check`, `pnpm run build`, and `pnpm run validate` pass.
- Sitemap contains only intended public pages.
- Navigation does not expose empty hubs.
- Page speed and layout stability are checked after any ad slot prototype.
- Mobile layouts are reviewed so ads do not cover content or CTAs.
- Download buttons remain easy to find and not confused with ads.
- No ad code is added to drafts or unpublished experiments.

## Policy and Privacy Readiness

Owner must review:

- Privacy policy coverage for ads and cookies.
- Any consent or regional compliance requirements.
- AdSense account/site eligibility.
- Prohibited content categories.
- Whether finance, debt, business, or invoice pages need stricter wording.
- How to handle analytics and ad measurement, if introduced later.

Do not add Analytics as a shortcut to AdSense readiness. Analytics requires its own privacy review.

## UX Readiness

Ad placements should be deferred until content quality is strong enough. When evaluated later, prefer:

- No ads above the primary page title.
- No ad between title and first useful explanation.
- No ad that looks like a download button.
- No ad inside workbook instructions.
- No layout shift around download CTAs.
- No placement that blocks mobile navigation or reading.

Potential later placement candidates:

- Below the first useful content section.
- Between major guide sections.
- Near the end of long formula or troubleshooting articles.
- Collection pages after the initial resource list.

## Batch 3 Dependency

Reassess after:

- Wave 1 has shipped and remained stable.
- At least one collection is useful with real linked pages.
- Several guides and troubleshooting pages are live.
- Owner confirms the privacy and policy posture.

AdSense remains out of scope until a separate approved implementation task.
