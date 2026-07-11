# Template Production Specifications

Status: planning only. Do not create files from this document until the owner approves the relevant wave.

## Global Workbook Standards

All new workbooks should follow the existing Excelgratis pattern:

- `.xlsx` format.
- Indonesian sheet names and labels.
- A `Cara Pakai` or intro sheet as the first sheet.
- Clear input tables with Excel Tables.
- Sample data that is realistic but fictional.
- Frozen top rows where tables are long.
- Data validation for repeated categories, status values, and priorities.
- Conditional formatting only where it clarifies status or exceptions.
- Formulas protected from accidental overwrite when practical.
- No macros, external connections, hidden trackers, or personal data.
- Compatibility notes for Microsoft Excel desktop/web, and explicit limitations for Google Sheets where relevant.

Each template page should include:

- Plain-language use case.
- Included sheets.
- Who it is for and who it is not for.
- Safe disclaimer where finance, debt, invoice, cash-flow, or shift scheduling is involved.
- Related templates and resources.
- QA note that the file is a practical starter template, not professional legal, accounting, tax, payroll, or financial advice.

## Wave 1 Templates

### T01. Invoice Penjualan UMKM

Slug: `template-invoice-penjualan-umkm`  
Category: Bisnis dan UMKM  
Owner review: required

Workbook sheets:

- `Cara Pakai`: scope, fields to edit, disclaimer that the file is not tax/legal advice.
- `Pengaturan`: seller profile, payment terms, bank/payment labels, invoice numbering prefix, item categories.
- `Invoice`: printable invoice layout with customer, item rows, subtotal, optional discount, shipping, total, paid amount, balance.
- `Daftar Invoice`: invoice log with date, customer, due date, total, payment status, follow-up date.
- `Ringkasan`: monthly sales total, unpaid amount, overdue count, top customers by total.

Key formulas:

- Line total: quantity times unit price.
- Invoice total: subtotal minus discount plus shipping.
- Balance: total minus paid amount.
- Payment status: paid, partial, unpaid, overdue.
- Dashboard totals with SUMIFS and COUNTIFS.
- IFERROR only around display values where missing data is expected.

Validation:

- Payment status list.
- Customer names from the invoice log when possible.
- Item categories and payment terms from `Pengaturan`.

Sample data:

- 8 to 12 fictional invoices.
- Common Indonesian UMKM products or services.
- Include paid, partial, unpaid, and overdue examples.

QA:

- Printable invoice fits one page in portrait or clean A4 layout.
- Totals recalculate after quantity, price, discount, shipping, or payment edits.
- Dashboard matches invoice log.
- No tax claims unless the owner explicitly approves specific neutral wording.

### T02. Laporan Penjualan Harian UMKM

Slug: `template-laporan-penjualan-harian-umkm`  
Category: Bisnis dan UMKM  
Owner review: required

Workbook sheets:

- `Cara Pakai`: daily-input workflow and dashboard explanation.
- `Pengaturan`: product categories, sales channels, payment methods.
- `Input Penjualan`: date, invoice/order ID, product/service, category, channel, payment method, quantity, unit price, discount, total.
- `Rekap Harian`: daily totals by revenue, transaction count, average sale, best category.
- `Dashboard`: monthly view, category breakdown, channel breakdown, simple chart area.

Key formulas:

- Total per row.
- SUMIFS for daily/monthly/category/channel summaries.
- COUNTIFS for transaction count.
- Average sale with IFERROR.

Validation:

- Category, channel, and payment method dropdowns.
- Date column formatted consistently.

Sample data:

- 30 to 45 rows covering at least one month.
- Include marketplace, offline, and social channel examples.

QA:

- Dashboard numbers reconcile to `Input Penjualan`.
- Date filters do not break if input rows are extended.
- Text-formatted number cases are avoided in sample data.

### T03. Arus Kas UMKM

Slug: `template-arus-kas-umkm`  
Category: Bisnis dan UMKM  
Owner review: required

Workbook sheets:

- `Cara Pakai`: cash-in/cash-out explanation and disclaimer.
- `Kategori`: income and expense categories.
- `Log Arus Kas`: date, description, type, category, source/account, cash in, cash out, notes.
- `Rekap Bulanan`: opening balance, total cash in, total cash out, net movement, ending balance.
- `Dashboard`: month selector, category totals, trend line, warning if ending balance is negative.

Key formulas:

- SUMIFS by month, type, and category.
- Ending balance as prior balance plus net movement.
- IF for warning labels.
- IFERROR for blank-selector displays.

Validation:

- Type: masuk, keluar.
- Category list filtered or separated by type if practical.
- Month selector.

Sample data:

- 2 to 3 months of fictional sales, supplies, rent, delivery, and owner withdrawal examples.

QA:

- Opening and ending balances roll forward correctly.
- Dashboard reconciles to monthly recap.
- Wording stays in record-keeping territory and avoids accounting advice.

### T04. Tracker Cicilan dan Hutang

Slug: `template-tracker-cicilan-hutang`  
Category: Keuangan Pribadi  
Owner review: required

Workbook sheets:

- `Cara Pakai`: record-keeping disclaimer.
- `Daftar Cicilan`: lender/name, purpose, start date, due date, monthly amount, total obligation, paid to date, remaining, status.
- `Log Pembayaran`: payment date, name, amount, method, notes.
- `Kalender Jatuh Tempo`: next due dates and reminders.
- `Ringkasan`: total remaining, due this month, overdue count, progress by item.

Key formulas:

- Remaining balance from total obligation minus SUMIFS payments.
- Due-this-month flags.
- Overdue status.
- COUNTIFS for counts by status.

Validation:

- Status values.
- Names linked to `Daftar Cicilan`.
- Payment methods.

Sample data:

- 5 to 8 fictional obligations with mixed statuses.

QA:

- No recommendation on whether to borrow, refinance, repay, invest, or prioritize debt.
- All totals update from payment log.
- Overdue logic handles blank dates safely.

## Wave 2 Templates

### T05. Pembukuan Pengeluaran Usaha

Slug: `template-pembukuan-pengeluaran-usaha`  
Category: Bisnis dan UMKM  
Owner review: required

Workbook sheets:

- `Cara Pakai`.
- `Kategori Pengeluaran`.
- `Log Pengeluaran`: date, vendor, category, payment method, amount, receipt/reference, notes.
- `Rekap Bulanan`.
- `Dashboard`.

Key formulas:

- SUMIFS by month, vendor, category, and payment method.
- Top expense categories.
- IFERROR for blank dashboard states.

QA:

- Categories are editable.
- Dashboard reconciles to log.
- No tax deductibility claims.

### T06. Target Tabungan

Slug: `template-target-tabungan`  
Category: Keuangan Pribadi  
Owner review: required

Workbook sheets:

- `Cara Pakai`.
- `Daftar Target`: target name, goal amount, target date, current saved, remaining, progress, status.
- `Log Setoran`: date, target name, amount, account/source, notes.
- `Ringkasan`: total goals, total saved, goals on track, progress chart.

Key formulas:

- SUMIFS for deposits by target.
- Progress percent.
- IF/IFS for status.

QA:

- Neutral tracking language only.
- No investment or savings recommendation.

### T07. Task Tracker Kanban Excel

Slug: `template-task-tracker-kanban-excel`  
Category: Produktivitas Kerja  
Owner review: not required unless owner wants final editorial approval

Workbook sheets:

- `Cara Pakai`.
- `Daftar Tugas`: task, owner, priority, status, due date, project, notes.
- `Kanban`: grouped task view by status.
- `Ringkasan`: overdue tasks, tasks by owner, tasks by priority.

Key formulas:

- COUNTIFS by status, owner, priority.
- IF/IFS for due-date warnings.
- Optional FILTER for modern Excel if fallback is documented.

QA:

- Status dropdown drives dashboard and Kanban view.
- Layout remains readable on common screen sizes.

### T08. Notulen Rapat dan Action Item

Slug: `template-notulen-rapat-action-item`  
Category: Produktivitas Kerja  
Owner review: not required unless owner wants final editorial approval

Workbook sheets:

- `Cara Pakai`.
- `Daftar Rapat`: date, meeting name, participants, agenda, decisions.
- `Action Item`: action, owner, due date, status, related meeting, notes.
- `Ringkasan`: open items, overdue items, completed items by month.

Key formulas:

- COUNTIFS by status and due date.
- IF for overdue labels.

QA:

- Works as a simple office tracker without external integrations.
- Long text wraps cleanly.

## Wave 3 Templates

### T09. Catatan Pengeluaran Harian

Slug: `template-pengeluaran-harian`  
Category: Keuangan Pribadi  
Owner review: required

Workbook sheets:

- `Cara Pakai`.
- `Kategori`.
- `Log Harian`: date, category, payment method, amount, need/want label, notes.
- `Rekap Mingguan`.
- `Ringkasan Bulanan`.

Key formulas:

- SUMIFS by day, week, month, and category.
- COUNTIFS by label/payment method.

QA:

- Clearly differentiated from Budget Bulanan as a daily habit log.
- No financial advice or judgmental labels.

### T10. Jadwal Shift Sederhana

Slug: `template-jadwal-shift-sederhana`  
Category: Produktivitas Kerja  
Owner review: required

Workbook sheets:

- `Cara Pakai`: disclaimer that it is not payroll, HR, or labor-law advice.
- `Daftar Anggota`: name, role, contact optional, notes.
- `Pengaturan Shift`: shift name, start time, end time, color label.
- `Jadwal Bulanan`: calendar-style assignment grid.
- `Ringkasan`: shifts by person and open slots.

Key formulas:

- COUNTIFS by person and shift.
- IF for open-slot warnings.

QA:

- No wage, overtime, leave entitlement, or compliance calculations.
- Works as scheduling aid only.

### T11. Tracker Proyek Sederhana

Slug: `template-tracker-proyek-sederhana`  
Category: Produktivitas Kerja  
Owner review: not required unless owner wants final editorial approval

Workbook sheets:

- `Cara Pakai`.
- `Daftar Proyek`: project, owner, start, due, status, budget label optional, notes.
- `Task Proyek`: project, task, owner, priority, status, due date, dependency note.
- `Timeline`: month/week view.
- `Dashboard`: projects by status, overdue tasks, workload by owner.

Key formulas:

- COUNTIFS by project/status/owner.
- MIN/MAX dates by project if practical.
- IF/IFS for status labels.

QA:

- Scope remains lightweight.
- No advanced project-management claims.
- Dashboard reconciles to task list.

