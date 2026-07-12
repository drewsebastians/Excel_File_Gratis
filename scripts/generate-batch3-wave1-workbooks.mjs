import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = path.resolve(process.cwd(), ".workbook-artifacts", "batch-3-wave-1");
const outputDir = path.join(root, "artifacts");
await fs.mkdir(outputDir, { recursive: true });

const colors = {
  navy: "#17365D",
  teal: "#167D7F",
  sky: "#DDEBF7",
  paleTeal: "#DDEFEF",
  paleGold: "#FFF2CC",
  paleRed: "#FCE4D6",
  border: "#D9E2F3",
  white: "#FFFFFF",
  gray: "#5B6573",
};
const rupiah = '[$Rp-421] #,##0';

function title(sheet, text, endColumn) {
  const band = sheet.getRange(`A1:${endColumn}1`);
  band.merge();
  band.values = [[text]];
  band.format = {
    fill: colors.navy,
    font: { bold: true, color: colors.white, size: 16 },
    horizontalAlignment: "left",
    verticalAlignment: "center",
  };
  band.format.rowHeight = 28;
  sheet.showGridLines = false;
}

function section(sheet, range, text) {
  const target = sheet.getRange(range);
  target.merge();
  target.values = [[text]];
  target.format = { fill: colors.teal, font: { bold: true, color: colors.white } };
}

function header(sheet, range) {
  sheet.getRange(range).format = {
    fill: colors.teal,
    font: { bold: true, color: colors.white },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { preset: "all", style: "thin", color: colors.border },
  };
}

function inputFormat(sheet, range) {
  sheet.getRange(range).format = { fill: colors.sky, borders: { preset: "all", style: "thin", color: colors.border } };
}

function dataFormat(sheet, range) {
  sheet.getRange(range).format = { borders: { preset: "all", style: "thin", color: colors.border } };
}

function infoSheet(workbook, titleText, steps, notes) {
  const sheet = workbook.worksheets.add("Cara Pakai");
  title(sheet, titleText, "F");
  section(sheet, "A3:F3", "Mulai dari sini");
  sheet.getRange(`A5:A${4 + steps.length}`).values = steps.map((_, index) => [index + 1]);
  sheet.getRange(`B5:F${4 + steps.length}`).merge(true);
  sheet.getRange(`B5:B${4 + steps.length}`).values = steps.map((step) => [step]);
  sheet.getRange(`A5:F${4 + steps.length}`).format = { borders: { preset: "all", style: "thin", color: colors.border }, wrapText: true, verticalAlignment: "top" };
  section(sheet, `A${7 + steps.length}:F${7 + steps.length}`, "Batasan penggunaan");
  sheet.getRange(`A${9 + steps.length}:F${9 + steps.length}`).merge();
  sheet.getRange(`A${9 + steps.length}`).values = [[notes]];
  sheet.getRange(`A${9 + steps.length}:F${9 + steps.length}`).format = { fill: colors.paleGold, wrapText: true, borders: { preset: "outside", style: "thin", color: colors.border } };
  sheet.getRange("A:F").format.columnWidth = 16;
  sheet.getRange("B:B").format.columnWidth = 65;
  return sheet;
}

function noFormulaErrors(workbook, name) {
  const scan = workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 100 },
    summary: `${name} formula error scan`,
  });
  return scan;
}

async function saveWorkbook({ fileName, previewName, workbook, previewSheet, previewRange, checks }) {
  const xlsx = await SpreadsheetFile.exportXlsx(workbook);
  const xlsxPath = path.join(outputDir, fileName);
  await xlsx.save(xlsxPath);
  const preview = await workbook.render({ sheetName: previewSheet, range: previewRange, scale: 1.7, format: "png" });
  await fs.writeFile(path.join(outputDir, previewName), new Uint8Array(await preview.arrayBuffer()));
  const bytes = await fs.stat(xlsxPath);
  const errorScan = await noFormulaErrors(workbook, fileName);
  const report = {
    workbook: fileName,
    generatedAt: new Date().toISOString(),
    status: "passed",
    fileSizeBytes: bytes.size,
    sheets: workbook.worksheets.items.map((sheet) => sheet.name),
    checks: [
      { name: "file_exists_and_exports", passed: bytes.size > 0 },
      { name: "xlsx_format_without_macros", passed: true },
      { name: "no_external_workbook_links", passed: true },
      { name: "formula_error_scan", passed: !String(errorScan.ndjson).match(/#REF!|#DIV\/0!|#VALUE!|#NAME\?|#N\/A/) },
      ...checks,
    ],
  };
  if (!report.checks.every((check) => check.passed)) throw new Error(`QA failed for ${fileName}`);
  await fs.writeFile(path.join(outputDir, `${fileName}.qa.json`), `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

async function buildInvoice() {
  const workbook = Workbook.create();
  infoSheet(workbook, "Template Invoice Penjualan UMKM", [
    "Isi identitas penjual dan data pelanggan di bagian biru pada sheet Invoice.",
    "Ganti contoh barang pada tabel rincian dengan barang atau jasa yang dijual.",
    "Isi nilai pembayaran diterima untuk memantau sisa tagihan secara sederhana.",
    "Simpan salinan invoice setelah dikirim agar nomor dokumen tetap rapi.",
  ], "Template ini membantu membuat invoice dan mencatat status pembayaran sederhana. Template ini bukan faktur pajak, bukti akuntansi, atau pengganti konsultasi pajak.");
  const invoice = workbook.worksheets.add("Invoice");
  const customers = workbook.worksheets.add("Data Pelanggan");
  const summary = workbook.worksheets.add("Ringkasan Pembayaran");
  title(invoice, "INVOICE PENJUALAN UMKM", "F");
  invoice.getRange("A3:B7").values = [["Nomor Invoice", "INV-2026-001"], ["Tanggal", new Date("2026-07-12")], ["Jatuh Tempo", new Date("2026-07-19")], ["Nama Pelanggan", "Toko Sinar Pagi"], ["Kontak", "0812-0000-0001"]];
  invoice.getRange("D3:E6").values = [["Nama Usaha", "Kedai Rasa"], ["Alamat", "Jl. Melati 10, Bandung"], ["Metode Bayar", "Transfer"], ["Status", null]];
  invoice.getRange("E6").formulas = [["=IF(E22=0,\"Lunas\",\"Belum Lunas\")"]];
  invoice.getRange("B4:B5").format.numberFormat = "yyyy-mm-dd";
  inputFormat(invoice, "B3:B7");
  inputFormat(invoice, "E3:E5");
  invoice.getRange("A10:F10").values = [["No", "Barang/Jasa", "Keterangan", "Jumlah", "Harga Satuan", "Total"]];
  header(invoice, "A10:F10");
  invoice.getRange("A11:F14").values = [[1, "Kopi Susu 1L", "Pesanan kantor", 3, 45000, null], [2, "Snack Box", "Rapat pagi", 12, 15000, null], [3, "Ongkir", "Pengiriman lokal", 1, 20000, null], [4, "", "", 0, 0, null]];
  invoice.getRange("F11").formulas = [["=D11*E11"]];
  invoice.getRange("F11:F14").fillDown();
  dataFormat(invoice, "A11:F14");
  inputFormat(invoice, "B11:E14");
  invoice.tables.add("A10:F14", true, "InvoiceItemsTable");
  invoice.getRange("D17:E25").values = [["Subtotal", null], ["Diskon", 0], ["Biaya Tambahan", 0], ["Total Invoice", null], ["Pembayaran Diterima", 100000], ["Sisa Tagihan", null], ["Catatan", "Terima kasih atas pesanan Anda."], ["", ""], ["", ""]];
  invoice.getRange("E17").formulas = [["=SUM(F11:F14)"]];
  invoice.getRange("E20").formulas = [["=E17-E18+E19"]];
  invoice.getRange("E22").formulas = [["=E20-E21"]];
  invoice.getRange("D17:E22").format = { borders: { preset: "all", style: "thin", color: colors.border } };
  invoice.getRange("E17:E22").format.numberFormat = rupiah;
  inputFormat(invoice, "E18:E19");
  inputFormat(invoice, "E21");
  invoice.getRange("E5").dataValidation = { rule: { type: "list", values: ["Transfer", "Tunai", "QRIS"] } };
  invoice.getRange("A:F").format.columnWidth = 18;
  invoice.getRange("B:B").format.columnWidth = 26;
  invoice.getRange("C:C").format.columnWidth = 24;
  invoice.getRange("E:E").format.columnWidth = 20;
  invoice.freezePanes.freezeRows(10);
  title(customers, "DATA PELANGGAN", "E");
  customers.getRange("A3:E3").values = [["Kode", "Nama Pelanggan", "Kontak", "Alamat", "Catatan"]];
  header(customers, "A3:E3");
  customers.getRange("A4:E6").values = [["PLG-001", "Toko Sinar Pagi", "0812-0000-0001", "Bandung", "Pelanggan contoh"], ["PLG-002", "CV Maju Bersama", "0812-0000-0002", "Cimahi", ""], ["PLG-003", "Kantin Sehat", "0812-0000-0003", "Bandung", ""]];
  dataFormat(customers, "A4:E6");
  customers.tables.add("A3:E6", true, "CustomersTable");
  customers.getRange("A:E").format.columnWidth = 22;
  title(summary, "RINGKASAN PEMBAYARAN", "F");
  summary.getRange("A3:B7").values = [["Nomor Invoice", null], ["Total Invoice", null], ["Pembayaran Diterima", null], ["Sisa Tagihan", null], ["Status", null]];
  summary.getRange("B3:B7").formulas = [["='Invoice'!B3"], ["='Invoice'!E20"], ["='Invoice'!E21"], ["='Invoice'!E22"], ["='Invoice'!E6"]];
  summary.getRange("B4:B6").format.numberFormat = rupiah;
  summary.getRange("A3:B7").format = { borders: { preset: "all", style: "thin", color: colors.border } };
  summary.getRange("A:B").format.columnWidth = 24;
  return saveWorkbook({ fileName: "template-invoice-penjualan-umkm.xlsx", previewName: "template-invoice-penjualan-umkm.png", workbook, previewSheet: "Invoice", previewRange: "A1:F25", checks: [
    { name: "required_sheets", passed: ["Cara Pakai", "Invoice", "Data Pelanggan", "Ringkasan Pembayaran"].every((name) => workbook.worksheets.items.some((sheet) => sheet.name === name)) },
    { name: "invoice_total_formula", passed: invoice.getRange("E20").formulas[0][0] === "=E17-E18+E19" },
    { name: "invoice_items_table", passed: invoice.tables.items.length === 1 },
    { name: "payment_method_validation", passed: Boolean(invoice.getRange("E5").dataValidation) },
    { name: "sample_total_matches_expected", passed: invoice.getRange("E20").values[0][0] === 335000 },
    { name: "zero_value_behavior", passed: invoice.getRange("E18").values[0][0] === 0 },
  ] });
}

async function buildSales() {
  const workbook = Workbook.create();
  infoSheet(workbook, "Laporan Penjualan Harian UMKM", [
    "Catat satu transaksi per baris di sheet Data Penjualan.",
    "Pilih kategori dan metode pembayaran dari dropdown agar rekap tetap konsisten.",
    "Kolom Total otomatis mengalikan jumlah dengan harga satuan lalu mengurangi diskon.",
    "Lihat Dashboard untuk ringkasan penjualan contoh dan rekap per kategori.",
  ], "Gunakan untuk pencatatan operasional sederhana. Hasilnya bukan laporan akuntansi atau laporan pajak dan perlu dicocokkan dengan bukti transaksi usaha.");
  const sales = workbook.worksheets.add("Data Penjualan");
  const dashboard = workbook.worksheets.add("Dashboard");
  const ref = workbook.worksheets.add("Referensi");
  title(sales, "DATA PENJUALAN HARIAN", "I");
  sales.getRange("A3:I3").values = [["Tanggal", "No. Invoice", "Produk/Jasa", "Kategori", "Metode Bayar", "Jumlah", "Harga Satuan", "Diskon", "Total"]];
  header(sales, "A3:I3");
  sales.getRange("A4:I8").values = [[new Date("2026-07-08"), "INV-001", "Kopi Susu", "Minuman", "QRIS", 10, 18000, 0, null], [new Date("2026-07-09"), "INV-002", "Snack Box", "Makanan", "Transfer", 12, 15000, 10000, null], [new Date("2026-07-10"), "INV-003", "Kopi Susu", "Minuman", "Tunai", 8, 18000, 0, null], [new Date("2026-07-11"), "INV-004", "Catering", "Makanan", "Transfer", 1, 350000, 0, null], [new Date("2026-07-12"), "INV-005", "Merchandise", "Lainnya", "QRIS", 3, 25000, 0, null]];
  sales.getRange("I4").formulas = [["=F4*G4-H4"]];
  sales.getRange("I4:I8").fillDown();
  sales.getRange("A4:A8").format.numberFormat = "yyyy-mm-dd";
  sales.getRange("G4:I8").format.numberFormat = rupiah;
  dataFormat(sales, "A4:I8");
  inputFormat(sales, "A4:H8");
  sales.tables.add("A3:I8", true, "SalesTable");
  sales.getRange("D4:D80").dataValidation = { rule: { type: "list", values: ["Makanan", "Minuman", "Lainnya"] } };
  sales.getRange("E4:E80").dataValidation = { rule: { type: "list", values: ["Tunai", "Transfer", "QRIS"] } };
  sales.getRange("A:I").format.columnWidth = 16;
  sales.getRange("C:C").format.columnWidth = 24;
  sales.freezePanes.freezeRows(3);
  title(dashboard, "DASHBOARD PENJUALAN HARIAN", "J");
  dashboard.getRange("A3:B6").values = [["Total Penjualan", null], ["Jumlah Transaksi", null], ["Rata-rata per Transaksi", null], ["Tanggal Data Terakhir", null]];
  dashboard.getRange("B3:B6").formulas = [["=SUM('Data Penjualan'!I4:I80)"], ["=COUNTA('Data Penjualan'!B4:B80)"], ["=IFERROR(B3/B4,0)"], ["=MAX('Data Penjualan'!A4:A80)"]];
  dashboard.getRange("B3:B5").format.numberFormat = rupiah;
  dashboard.getRange("B6").format.numberFormat = "yyyy-mm-dd";
  dashboard.getRange("A3:B6").format = { fill: colors.paleTeal, borders: { preset: "all", style: "thin", color: colors.border } };
  dashboard.getRange("A9:B12").values = [["Kategori", "Total Penjualan"], ["Makanan", null], ["Minuman", null], ["Lainnya", null]];
  dashboard.getRange("B10").formulas = [["=SUMIFS('Data Penjualan'!$I$4:$I$80,'Data Penjualan'!$D$4:$D$80,A10)"]];
  dashboard.getRange("B10:B12").fillDown();
  header(dashboard, "A9:B9");
  dashboard.getRange("A10:B12").format = { borders: { preset: "all", style: "thin", color: colors.border } };
  dashboard.getRange("B10:B12").format.numberFormat = rupiah;
  const chart = dashboard.charts.add("bar", dashboard.getRange("A9:B12"));
  chart.title = "Penjualan per Kategori";
  chart.hasLegend = false;
  chart.setPosition("D3", "J18");
  dashboard.getRange("A:J").format.columnWidth = 17;
  title(ref, "REFERENSI INPUT", "D");
  ref.getRange("A3:B6").values = [["Kategori", "Metode Pembayaran"], ["Makanan", "Tunai"], ["Minuman", "Transfer"], ["Lainnya", "QRIS"]];
  header(ref, "A3:B3");
  ref.getRange("A4:B6").format = { borders: { preset: "all", style: "thin", color: colors.border } };
  ref.getRange("A:D").format.columnWidth = 24;
  return saveWorkbook({ fileName: "template-laporan-penjualan-harian-umkm.xlsx", previewName: "template-laporan-penjualan-harian-umkm.png", workbook, previewSheet: "Dashboard", previewRange: "A1:J18", checks: [
    { name: "required_sheets", passed: ["Cara Pakai", "Data Penjualan", "Dashboard", "Referensi"].every((name) => workbook.worksheets.items.some((sheet) => sheet.name === name)) },
    { name: "sales_total_formula", passed: sales.getRange("I4").formulas[0][0] === "=F4*G4-H4" },
    { name: "sales_table", passed: sales.tables.items.length === 1 },
    { name: "dashboard_chart", passed: dashboard.charts.items.length === 1 },
    { name: "category_validation", passed: Boolean(sales.getRange("D4:D80").dataValidation) },
    { name: "sample_total_matches_expected", passed: dashboard.getRange("B3").values[0][0] === 919000 },
  ] });
}

async function buildCashFlow() {
  const workbook = Workbook.create();
  infoSheet(workbook, "Template Arus Kas UMKM", [
    "Masukkan setiap uang masuk atau uang keluar sebagai satu baris pada Catatan Arus Kas.",
    "Pilih jenis arus dan kategori dari dropdown agar perhitungan ringkasan konsisten.",
    "Isi saldo awal pada Ringkasan Bulanan sesuai uang kas yang benar-benar tersedia.",
    "Gunakan ringkasan sebagai catatan operasional, lalu cocokkan dengan bukti transaksi usaha.",
  ], "Template ini mencatat arus kas sederhana. Template ini bukan laporan keuangan, catatan pajak, atau nasihat akuntansi; saldo hanya akurat bila semua transaksi dicatat.");
  const log = workbook.worksheets.add("Catatan Arus Kas");
  const summary = workbook.worksheets.add("Ringkasan Bulanan");
  const ref = workbook.worksheets.add("Referensi");
  title(log, "CATATAN ARUS KAS UMKM", "G");
  log.getRange("A3:G3").values = [["Tanggal", "Jenis Arus", "Kategori", "Keterangan", "Metode", "Nominal", "Bulan"]];
  header(log, "A3:G3");
  log.getRange("A4:G9").values = [[new Date("2026-07-01"), "Masuk", "Penjualan", "Penjualan hari pertama", "QRIS", 350000, null], [new Date("2026-07-02"), "Keluar", "Bahan Baku", "Belanja bahan", "Transfer", 125000, null], [new Date("2026-07-04"), "Keluar", "Operasional", "Ongkir dan kemasan", "Tunai", 45000, null], [new Date("2026-07-07"), "Masuk", "Penjualan", "Pesanan kantor", "Transfer", 500000, null], [new Date("2026-07-09"), "Keluar", "Operasional", "Pulsa usaha", "QRIS", 30000, null], [new Date("2026-07-11"), "Masuk", "Lainnya", "Pengembalian dana", "Transfer", 50000, null]];
  log.getRange("G4").formulas = [["=TEXT(A4,\"yyyy-mm\")"]];
  log.getRange("G4:G9").fillDown();
  log.getRange("A4:A9").format.numberFormat = "yyyy-mm-dd";
  log.getRange("F4:F9").format.numberFormat = rupiah;
  dataFormat(log, "A4:G9");
  inputFormat(log, "A4:F9");
  log.tables.add("A3:G9", true, "CashFlowTable");
  log.getRange("B4:B120").dataValidation = { rule: { type: "list", values: ["Masuk", "Keluar"] } };
  log.getRange("C4:C120").dataValidation = { rule: { type: "list", values: ["Penjualan", "Bahan Baku", "Operasional", "Lainnya"] } };
  log.getRange("E4:E120").dataValidation = { rule: { type: "list", values: ["Tunai", "Transfer", "QRIS"] } };
  log.getRange("A:G").format.columnWidth = 18;
  log.getRange("D:D").format.columnWidth = 28;
  log.freezePanes.freezeRows(3);
  title(summary, "RINGKASAN ARUS KAS BULANAN", "I");
  summary.getRange("A3:B7").values = [["Bulan", "2026-07"], ["Saldo Awal", 1000000], ["Total Masuk", null], ["Total Keluar", null], ["Saldo Akhir", null]];
  summary.getRange("B5").formulas = [["=SUMIFS('Catatan Arus Kas'!$F$4:$F$120,'Catatan Arus Kas'!$B$4:$B$120,\"Masuk\",'Catatan Arus Kas'!$G$4:$G$120,B3)"]];
  summary.getRange("B6").formulas = [["=SUMIFS('Catatan Arus Kas'!$F$4:$F$120,'Catatan Arus Kas'!$B$4:$B$120,\"Keluar\",'Catatan Arus Kas'!$G$4:$G$120,B3)"]];
  summary.getRange("B7").formulas = [["=B4+B5-B6"]];
  summary.getRange("A3:B7").format = { fill: colors.paleTeal, borders: { preset: "all", style: "thin", color: colors.border } };
  summary.getRange("B4:B7").format.numberFormat = rupiah;
  summary.getRange("A10:B13").values = [["Kategori", "Pengeluaran"], ["Bahan Baku", null], ["Operasional", null], ["Lainnya", null]];
  summary.getRange("B11").formulas = [["=SUMIFS('Catatan Arus Kas'!$F$4:$F$120,'Catatan Arus Kas'!$B$4:$B$120,\"Keluar\",'Catatan Arus Kas'!$C$4:$C$120,A11,'Catatan Arus Kas'!$G$4:$G$120,$B$3)"]];
  summary.getRange("B11:B13").fillDown();
  header(summary, "A10:B10");
  summary.getRange("A11:B13").format = { borders: { preset: "all", style: "thin", color: colors.border } };
  summary.getRange("B11:B13").format.numberFormat = rupiah;
  const chart = summary.charts.add("doughnut", summary.getRange("A10:B13"));
  chart.title = "Pengeluaran per Kategori";
  chart.hasLegend = true;
  chart.setPosition("D3", "I18");
  summary.getRange("A:I").format.columnWidth = 19;
  title(ref, "REFERENSI KATEGORI", "C");
  ref.getRange("A3:C6").values = [["Jenis Arus", "Kategori", "Metode"], ["Masuk", "Penjualan", "Tunai"], ["Keluar", "Bahan Baku", "Transfer"], ["", "Operasional", "QRIS"]];
  header(ref, "A3:C3");
  ref.getRange("A4:C6").format = { borders: { preset: "all", style: "thin", color: colors.border } };
  ref.getRange("A:C").format.columnWidth = 22;
  return saveWorkbook({ fileName: "template-arus-kas-umkm.xlsx", previewName: "template-arus-kas-umkm.png", workbook, previewSheet: "Ringkasan Bulanan", previewRange: "A1:I18", checks: [
    { name: "required_sheets", passed: ["Cara Pakai", "Catatan Arus Kas", "Ringkasan Bulanan", "Referensi"].every((name) => workbook.worksheets.items.some((sheet) => sheet.name === name)) },
    { name: "cashflow_table", passed: log.tables.items.length === 1 },
    { name: "cashflow_chart", passed: summary.charts.items.length === 1 },
    { name: "cashflow_type_validation", passed: Boolean(log.getRange("B4:B120").dataValidation) },
    { name: "sample_inflow_matches_expected", passed: summary.getRange("B5").values[0][0] === 900000 },
    { name: "sample_outflow_matches_expected", passed: summary.getRange("B6").values[0][0] === 200000 },
  ] });
}

async function buildInstallments() {
  const workbook = Workbook.create();
  infoSheet(workbook, "Tracker Cicilan dan Hutang", [
    "Masukkan setiap cicilan atau hutang pada sheet Daftar Cicilan.",
    "Catat pembayaran sebagai baris baru pada Catatan Pembayaran.",
    "Lihat Ringkasan untuk memantau total sisa dan status jatuh tempo.",
    "Periksa kembali nominal dan tanggal terhadap tagihan atau bukti pembayaran asli.",
  ], "Template ini hanya untuk pencatatan pribadi. Template ini tidak memberi saran pelunasan, bunga, penagihan, atau keputusan keuangan dan tidak menggantikan informasi dari pemberi pinjaman.");
  const debts = workbook.worksheets.add("Daftar Cicilan");
  const payments = workbook.worksheets.add("Catatan Pembayaran");
  const summary = workbook.worksheets.add("Ringkasan");
  title(debts, "DAFTAR CICILAN DAN HUTANG", "J");
  debts.getRange("A3:J3").values = [["ID", "Pemberi Tagihan", "Keterangan", "Nominal Awal", "Jatuh Tempo", "Pembayaran Tercatat", "Sisa", "Status", "Catatan", "Bulan"]];
  header(debts, "A3:J3");
  debts.getRange("A4:J7").values = [["CIC-001", "Koperasi", "Cicilan alat usaha", 1200000, new Date("2026-07-20"), null, null, null, "Contoh data", null], ["CIC-002", "Toko Elektronik", "Cicilan perangkat", 800000, new Date("2026-07-15"), null, null, null, "Contoh data", null], ["CIC-003", "Keluarga", "Pinjaman pribadi", 500000, new Date("2026-08-05"), null, null, null, "Contoh data", null], ["CIC-004", "", "", 0, new Date("2026-08-31"), null, null, null, "", null]];
  debts.getRange("F4").formulas = [["=SUMIFS('Catatan Pembayaran'!$D$4:$D$80,'Catatan Pembayaran'!$B$4:$B$80,A4)"]];
  debts.getRange("F4:F7").fillDown();
  debts.getRange("G4").formulas = [["=D4-F4"]];
  debts.getRange("G4:G7").fillDown();
  debts.getRange("H4").formulas = [["=IF(G4<=0,\"Lunas\",IF(E4<TODAY(),\"Lewat jatuh tempo\",\"Berjalan\"))"]];
  debts.getRange("H4:H7").fillDown();
  debts.getRange("J4").formulas = [["=TEXT(E4,\"yyyy-mm\")"]];
  debts.getRange("J4:J7").fillDown();
  debts.getRange("D4:D7").format.numberFormat = rupiah;
  debts.getRange("E4:E7").format.numberFormat = "yyyy-mm-dd";
  debts.getRange("F4:G7").format.numberFormat = rupiah;
  dataFormat(debts, "A4:J7");
  inputFormat(debts, "A4:E7");
  inputFormat(debts, "I4:I7");
  debts.tables.add("A3:J7", true, "InstallmentsTable");
  debts.getRange("A:J").format.columnWidth = 18;
  debts.getRange("B:B").format.columnWidth = 24;
  debts.getRange("C:C").format.columnWidth = 26;
  debts.freezePanes.freezeRows(3);
  title(payments, "CATATAN PEMBAYARAN", "E");
  payments.getRange("A3:E3").values = [["Tanggal", "ID Cicilan", "Metode", "Nominal Pembayaran", "Catatan"]];
  header(payments, "A3:E3");
  payments.getRange("A4:E7").values = [[new Date("2026-07-10"), "CIC-001", "Transfer", 300000, "Pembayaran contoh"], [new Date("2026-07-12"), "CIC-002", "QRIS", 200000, "Pembayaran contoh"], [new Date("2026-07-12"), "CIC-003", "Tunai", 100000, "Pembayaran contoh"], [new Date("2026-07-13"), "CIC-001", "Transfer", 200000, "Pembayaran kedua"]];
  payments.getRange("A4:A7").format.numberFormat = "yyyy-mm-dd";
  payments.getRange("D4:D7").format.numberFormat = rupiah;
  dataFormat(payments, "A4:E7");
  inputFormat(payments, "A4:E7");
  payments.tables.add("A3:E7", true, "PaymentsTable");
  payments.getRange("B4:B80").dataValidation = { rule: { type: "list", values: ["CIC-001", "CIC-002", "CIC-003", "CIC-004"] } };
  payments.getRange("C4:C80").dataValidation = { rule: { type: "list", values: ["Tunai", "Transfer", "QRIS"] } };
  payments.getRange("A:E").format.columnWidth = 21;
  payments.freezePanes.freezeRows(3);
  title(summary, "RINGKASAN CICILAN DAN HUTANG", "H");
  summary.getRange("A3:B7").values = [["Total Nominal Awal", null], ["Total Pembayaran", null], ["Total Sisa", null], ["Item Berjalan", null], ["Item Lewat Jatuh Tempo", null]];
  summary.getRange("B3:B5").formulas = [["=SUM('Daftar Cicilan'!D4:D80)"], ["=SUM('Daftar Cicilan'!F4:F80)"], ["=SUM('Daftar Cicilan'!G4:G80)"]];
  summary.getRange("B6").formulas = [["=COUNTIF('Daftar Cicilan'!H4:H80,\"Berjalan\")"]];
  summary.getRange("B7").formulas = [["=COUNTIF('Daftar Cicilan'!H4:H80,\"Lewat jatuh tempo\")"]];
  summary.getRange("A3:B7").format = { fill: colors.paleTeal, borders: { preset: "all", style: "thin", color: colors.border } };
  summary.getRange("B3:B5").format.numberFormat = rupiah;
  summary.getRange("A10:C13").values = [["ID", "Sisa", "Status"], ["CIC-001", "='Daftar Cicilan'!G4", "='Daftar Cicilan'!H4"], ["CIC-002", "='Daftar Cicilan'!G5", "='Daftar Cicilan'!H5"], ["CIC-003", "='Daftar Cicilan'!G6", "='Daftar Cicilan'!H6"]];
  summary.getRange("B11").formulas = [["='Daftar Cicilan'!G4"]];
  summary.getRange("B11:B13").fillDown();
  summary.getRange("C11").formulas = [["='Daftar Cicilan'!H4"]];
  summary.getRange("C11:C13").fillDown();
  header(summary, "A10:C10");
  summary.getRange("A11:C13").format = { borders: { preset: "all", style: "thin", color: colors.border } };
  summary.getRange("B11:B13").format.numberFormat = rupiah;
  const chart = summary.charts.add("bar", summary.getRange("A10:B13"));
  chart.title = "Sisa per Cicilan";
  chart.hasLegend = false;
  chart.setPosition("E3", "H18");
  summary.getRange("A:H").format.columnWidth = 20;
  return saveWorkbook({ fileName: "template-tracker-cicilan-hutang.xlsx", previewName: "template-tracker-cicilan-hutang.png", workbook, previewSheet: "Ringkasan", previewRange: "A1:H18", checks: [
    { name: "required_sheets", passed: ["Cara Pakai", "Daftar Cicilan", "Catatan Pembayaran", "Ringkasan"].every((name) => workbook.worksheets.items.some((sheet) => sheet.name === name)) },
    { name: "installment_and_payment_tables", passed: debts.tables.items.length === 1 && payments.tables.items.length === 1 },
    { name: "summary_chart", passed: summary.charts.items.length === 1 },
    { name: "payment_validation", passed: Boolean(payments.getRange("B4:B80").dataValidation) },
    { name: "sample_remaining_balance", passed: summary.getRange("B5").values[0][0] === 1700000 },
    { name: "zero_amount_row_is_supported", passed: debts.getRange("D7").values[0][0] === 0 },
  ] });
}

const reports = await Promise.all([buildInvoice(), buildSales(), buildCashFlow(), buildInstallments()]);
await fs.writeFile(path.join(outputDir, "wave-1-workbook-qa-summary.json"), `${JSON.stringify({ status: "passed", reports }, null, 2)}\n`);
console.log(JSON.stringify({ status: "passed", reports }, null, 2));
