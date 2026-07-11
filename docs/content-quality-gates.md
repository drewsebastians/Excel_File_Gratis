# Content Quality Gates

Status: planning only. These gates define when later content production may proceed.

## Gate 0: Planning Acceptance

Required before production:

- Owner approves this portfolio direction.
- Owner approves wave order or requests edits.
- Any high-risk topic is either approved with disclaimer wording or deferred.
- No public routes, sitemap entries, CMS content entries, workbook files, tools, AdSense, or Analytics changes are included in the planning PR.

## Gate 1: Research and Editorial Brief

Each resource needs a short brief with:

- User intent.
- Primary Indonesian use case.
- Search observations or evidence level.
- Related existing templates or resources.
- Draft title, slug, description, and category.
- Claims to avoid.
- Required disclaimer, if any.

Evidence labeling:

- `verified data` for official documentation or repository facts.
- `search observation` for public SERP/library patterns.
- `estimate` for directional prioritization.
- `inference` for editorial judgement.

## Gate 2: Workbook Specification

Each template must have:

- Sheet list.
- Table list and key columns.
- Formula plan.
- Validation/dropdown plan.
- Sample-data plan.
- Dashboard or summary behavior where applicable.
- Compatibility notes.
- Risks and owner-review requirements.

No workbook should be produced until its specification is approved for its wave.

## Gate 3: Workbook QA

Before a workbook can be attached to public content:

- All formulas recalculate correctly after sample inputs are edited.
- Dashboard totals reconcile to source tables.
- No external data connections or macros.
- No real personal/business data.
- No hidden sheets unless explicitly justified.
- File opens in Excel without repair prompts.
- Print/export areas are reviewed when the template has printable output.
- Text, number, date, currency, and percent formats are consistent.
- Tables expand without breaking formulas.
- Dropdowns and conditional formatting continue to work after new rows are added.

High-risk checks:

- Invoice templates do not make tax, legal, or compliance claims.
- Finance templates do not give investment, debt, or repayment advice.
- Shift templates do not calculate payroll, overtime, leave, or labor entitlements.
- Cash-flow templates avoid accounting-service claims.

## Gate 4: Content QA

Before public draft publication:

- Page matches approved slug and category.
- Content is original and not copied from competitors.
- Plain Indonesian wording explains the actual file contents.
- The page does not overpromise automation or professional advice.
- Download CTA and file metadata match the workbook.
- Related links are useful and not circular filler.
- All internal links resolve.
- Images or screenshots, if added later, reflect the actual workbook.
- Metadata is unique and accurate.
- Accessibility basics are checked: headings, alt text, visible focus states where relevant.

## Gate 5: Technical Validation

Before merge of any production wave:

- `pnpm install --frozen-lockfile`.
- `pnpm run check`.
- `pnpm run build`.
- `pnpm run validate`.
- Confirm generated page count and sitemap changes match the planned public additions.
- Confirm no draft resource appears in public navigation, sitemap, or route output.
- Confirm downloadable assets are frozen or validated according to the existing asset workflow.

## Gate 6: Owner Review

Owner review is required for:

- All finance, debt, cash-flow, invoice, business-administration, and shift-scheduling content.
- Any disclaimer wording.
- Any monetization-readiness claim.
- Any Analytics or tracking addition.
- Any AdSense placement or policy claim.

Owner sign-off should record:

- Approved title and slug.
- Approved category.
- Approved disclaimer.
- Approved go-live wave.
- Any deferred concerns.

## Gate 7: Launch Readiness

Before a wave is published:

- All public pages in the wave are complete.
- Workbooks pass QA.
- Internal links are complete and intentional.
- Sitemap changes are expected.
- No empty category is activated.
- Collections publish only after enough linked pages exist.
- Owner has approved high-risk pages.
- A rollback path is clear.

## Gate 8: Post-Launch Review

After each production wave:

- Check for broken links.
- Check download availability.
- Review user feedback or form submissions if available and privacy-safe.
- Record content issues for the next wave.
- Reassess whether Education or Household/Event categories have enough evidence to enter planning.

