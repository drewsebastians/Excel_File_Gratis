# Batch 3A Content Portfolio Grand Plan

> Status diperbarui 2026-07-14: perencanaan Batch 3A telah dilaksanakan sebagian melalui Batch 3 Wave 1. Wave 1 menerbitkan empat template tambahan serta supporting resources, dan PR #6 memperbaiki rendering section detail template. Lihat [current project status](current-project-status.md) untuk inventory dan bukti terbaru. Dokumen ini tetap dipertahankan sebagai catatan historis rencana dan scoring awal; tabel serta urutan di bawah tidak ditulis ulang setelah produksi.

Status: planning only  
Branch: `plan/batch-3-content-portfolio`  
Audience: Excelgratis editorial, workbook production, QA, and owner review

## Guardrails

This plan does not create or publish public templates, guides, formula references, troubleshooting pages, collections, tools, AdSense placements, or Analytics changes. It defines the content portfolio, production waves, quality gates, and review checkpoints for later implementation.

Public route, sitemap, CMS collection, and downloadable file changes are deferred to later production batches.

## Current Inventory

Excelgratis currently has four published template files and four matching template pages:

| Template | Primary category | Current workbook shape |
| --- | --- | --- |
| Budget Bulanan | Keuangan Pribadi | 4 sheets: instructions, monthly budget, transaction log, dashboard summary |
| Stok Barang | Bisnis dan UMKM | 4 sheets: instructions, item master, transaction log, inventory dashboard |
| Follow-up Pelanggan | Bisnis dan UMKM | 4 sheets: intro, instructions, customer data, summary |
| Kalender Planner 2026 | Produktivitas Kerja | 6 sheets: instructions, yearly calendar, monthly planner, weekly planner, agenda log, summary |

The existing site architecture already supports:

- Template categories: `bisnis-umkm`, `keuangan-pribadi`, `produktivitas-kerja`, `pendidikan`, `rumah-tangga-acara`.
- Resource hubs: `panduan`, `rumus-excel`, `masalah-excel`, and `koleksi`.
- Published/draft filtering for resources and templates.
- Related templates and internal linking fields.
- Sitemap generation from published routes only.

For Batch 3, keep Education and Household/Event inactive unless a later review finds stronger evidence. The first content expansion should focus on three clusters with direct links to the current inventory.

## Research Basis

Research was split into four confidence levels:

| Level | Meaning | Used for |
| --- | --- | --- |
| Verified data | Confirmed in first-party documentation or current repository inspection | Formula behavior, site architecture, workbook inventory |
| Search observation | Repeated themes seen in public search results or established libraries | Demand direction and topic clustering |
| Estimate | Reasoned priority where exact volume or conversion data was unavailable | Wave placement and score tie-breaks |
| Inference | Editorial judgement from Indonesian use cases and current product gaps | Differentiation and internal-link strategy |

Sources consulted:

- Microsoft Support:
  - `https://support.microsoft.com/en-us/excel/functions/sumifs-function`
  - `https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929`
  - `https://support.microsoft.com/en-us/office/filter-function-f4f7cb66-82eb-4767-8f7c-4877ad80c759`
  - `https://support.microsoft.com/en-us/office/iferror-function-c526fd07-caeb-47b8-8bb6-63f3e417f611`
- Kelas Excel: `https://www.kelasexcel.id/`
- Vertex42 Excel Templates: `https://www.vertex42.com/ExcelTemplates/`
- Lifewire summary of free Excel template libraries: secondary benchmark for common template categories.
- Current Excelgratis repository docs, CMS schema, content schema, template files, and generated workbooks.

Unavailable or not authenticated in this planning pass:

- Google Search Console query data.
- Google Trends term comparison data.
- Private form submission/request data.

Because Search Console, Trends, and private request data were not available, search-demand scores should be read as directional estimates from public SERP themes and library benchmarks, not absolute traffic forecasts.

## Portfolio Target

Batch 3 should expand from 4 templates to about 15 total templates by proposing 11 new templates. It should also define 8 guides, 6 formula references, 6 troubleshooting pages, and 3 collections.

| Resource type | Existing | Proposed new | Target total after production |
| --- | ---: | ---: | ---: |
| Templates | 4 | 11 | 15 |
| Guides | 0 | 8 | 8 |
| Formula references | 0 | 6 | 6 |
| Troubleshooting pages | 0 | 6 | 6 |
| Collections | 0 | 3 | 3 |

## Strategic Clusters

### A. Bisnis dan UMKM

Primary need: practical files for selling, stock, cash movement, customer follow-up, and lightweight administration.

Why now:

- Strong fit with existing Stok Barang and Follow-up Pelanggan templates.
- Repeated template-library categories include invoice, inventory, sales, cash flow, and business tracking.
- High internal-link potential between templates, SUMIFS/COUNTIFS formula references, and troubleshooting around number/date formats.

Proposed templates:

- Invoice Penjualan UMKM.
- Laporan Penjualan Harian UMKM.
- Arus Kas UMKM.
- Pembukuan Pengeluaran Usaha.

Supporting content:

- Guides for choosing UMKM templates, rekap penjualan, and simple cash-flow reading.
- Formula references for SUMIFS, COUNTIFS, lookup, IF/IFS, and IFERROR.
- Troubleshooting pages for text-formatted numbers, zero SUMIFS results, lookup #N/A, and date issues.
- Collection: Paket Administrasi UMKM.

### B. Keuangan Pribadi

Primary need: repeat-use tracking for budgets, expenses, savings goals, and installment obligations without giving financial advice.

Why now:

- Direct extension of the existing Budget Bulanan template.
- Good recurring-use potential and safer monetization fit when content stays educational and avoids investment, debt, or legal advice.
- Clear internal links to IFERROR, SUMIFS, COUNTIFS, and dashboard guides.

Proposed templates:

- Tracker Cicilan dan Hutang.
- Target Tabungan.
- Catatan Pengeluaran Harian.

Supporting content:

- Guide for personal-budget tracking as record keeping, not advice.
- Dashboard and Excel Table guides.
- Collection: Paket Keuangan Pribadi.

### C. Produktivitas Kerja

Primary need: office-ready trackers for tasks, projects, action items, shift schedules, and reusable spreadsheet habits.

Why now:

- Direct extension of Kalender Planner 2026.
- Strong utility for office workers and small teams.
- Good formula-reference bridge to dropdowns, IF/IFS status labels, FILTER, and date handling.

Proposed templates:

- Task Tracker Kanban Excel.
- Notulen Rapat dan Action Item.
- Jadwal Shift Sederhana.
- Tracker Proyek Sederhana.

Supporting content:

- Guides for Excel Tables, dropdowns, dashboards, and file hygiene.
- Troubleshooting for dropdowns and Excel-to-Google-Sheets compatibility.
- Collection: Paket Produktivitas Kerja.

## Scoring Model

Every proposed resource is scored 1 to 5 for:

- Usefulness.
- Indonesian relevance.
- Search demand.
- Differentiation.
- Internal-link potential.
- Repeat-use potential.
- Template feasibility.
- Content feasibility.
- Maintenance burden.
- Factual or compliance risk.
- Monetization suitability.

For the weighted total, maintenance burden and factual/compliance risk are inverted so lower-burden and lower-risk topics score higher. A resource with burden 1 receives 5 points for the maintenance component; a resource with risk 1 receives 5 points for the risk component.

Weights:

| Factor | Weight |
| --- | ---: |
| Usefulness | 18% |
| Indonesian relevance | 12% |
| Search demand | 12% |
| Differentiation | 10% |
| Internal-link potential | 10% |
| Repeat-use potential | 8% |
| Template feasibility | 8% |
| Content feasibility | 8% |
| Monetization suitability | 6% |
| Maintenance ease, derived from burden | 4% |
| Safety, derived from risk | 4% |

The highest-scoring work should not automatically ship first. Wave placement also considers production balance, internal-link sequencing, and owner-review risk.

## Proposed Production Waves

### Wave 1: Foundation and Highest Internal Links

Purpose: establish UMKM, finance, formula, and troubleshooting anchors that support the current templates and later pages.

| Type | Count | Items |
| --- | ---: | --- |
| Templates | 4 | Invoice Penjualan UMKM; Laporan Penjualan Harian UMKM; Arus Kas UMKM; Tracker Cicilan dan Hutang |
| Guides | 3 | Memilih Template Excel untuk UMKM; Rekap Penjualan Harian; Dashboard Sederhana |
| Formula references | 2 | SUMIFS; IFERROR |
| Troubleshooting | 2 | Angka Tidak Terjumlah; SUMIFS/COUNTIFS Hasil 0 |
| Collection | 1 | Paket Administrasi UMKM |

### Wave 2: Habit Building and Office Workflows

Purpose: broaden repeat-use value and connect formulas to real templates.

| Type | Count | Items |
| --- | ---: | --- |
| Templates | 4 | Pembukuan Pengeluaran Usaha; Target Tabungan; Task Tracker Kanban Excel; Notulen Rapat dan Action Item |
| Guides | 3 | Budget Pribadi sebagai Catatan; Excel Table; Dropdown Data Validation |
| Formula references | 2 | XLOOKUP/VLOOKUP; COUNTIFS |
| Troubleshooting | 2 | Lookup #N/A; Tanggal Salah Format |
| Collection | 1 | Paket Keuangan Pribadi |

### Wave 3: Productivity Completion and Compatibility

Purpose: complete the 15-template target and add practical support pages for ongoing use.

| Type | Count | Items |
| --- | ---: | --- |
| Templates | 3 | Catatan Pengeluaran Harian; Jadwal Shift Sederhana; Tracker Proyek Sederhana |
| Guides | 2 | Arus Kas Sederhana UMKM; Merapikan File Excel Rutin |
| Formula references | 2 | FILTER; IF/IFS |
| Troubleshooting | 2 | Dropdown Tidak Muncul; Excel ke Google Sheets Berantakan |
| Collection | 1 | Paket Produktivitas Kerja |

## Owner Review Gate

Owner review is required before any item moves from planning to production when it has any of these traits:

- Finance, debt, cash-flow, invoice, shift, or business-administration implications.
- Claims about regulation, taxes, labor rules, accounting standards, or eligibility.
- Monetization or AdSense readiness impact.
- New public route or sitemap impact.
- New form, analytics, or data collection behavior.

At the review gate, the owner should approve:

- Final title and slug.
- Whether the page is allowed to publish.
- Whether the workbook scope is practical and not over-promising.
- Any required disclaimers.
- Whether ad placement remains deferred.

## Deferred Phase 3 Sequence

Only after the planning docs are accepted:

1. Build Wave 1 workbooks as draft artifacts.
2. Perform workbook QA and owner review.
3. Create Wave 1 public content entries as drafts.
4. Run schema validation, route/sitemap preview, and fixture validation.
5. Publish only after owner approval.
6. Repeat for Waves 2 and 3.
7. Reassess AdSense readiness after enough high-quality public content exists.
8. Consider Analytics only after privacy and consent requirements are reviewed.

## Explicit Non-Goals

- No public content entries in this planning batch.
- No CMS schema changes.
- No generated Excel files.
- No route, sitemap, or navigation changes.
- No AdSense implementation.
- No Analytics implementation.
- No competitor-copy design or content imitation.
- No regulatory, tax, payroll, or investment advice content.
