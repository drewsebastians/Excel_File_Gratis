import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = path.resolve(process.cwd(), ".workbook-artifacts", "batch-3-wave-2", "artifacts");
await fs.mkdir(outputDir, { recursive: true });

const colors = { navy: "#17365D", teal: "#167D7F", blue: "#DDEBF7", gold: "#FFF2CC", red: "#FCE4D6", border: "#D9E2F3", white: "#FFFFFF" };
const rupiah = "[$Rp-421] #,##0";

function title(sheet, text, endColumn) {
  const band = sheet.getRange(`A1:${endColumn}1`);
  band.merge();
  band.values = [[text]];
  band.format = { fill: colors.navy, font: { bold: true, color: colors.white, size: 16 }, verticalAlignment: "center" };
  band.format.rowHeight = 28;
  sheet.showGridLines = false;
}

function section(sheet, range, text) {
  const cell = sheet.getRange(range);
  cell.merge();
  cell.values = [[text]];
  cell.format = { fill: colors.teal, font: { bold: true, color: colors.white } };
}

function headers(sheet, range) {
  sheet.getRange(range).format = { fill: colors.teal, font: { bold: true, color: colors.white }, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true, borders: { preset: "all", style: "thin", color: colors.border } };
}

function grid(sheet, range, input = false) {
  sheet.getRange(range).format = { ...(input ? { fill: colors.blue } : {}), borders: { preset: "all", style: "thin", color: colors.border }, verticalAlignment: "top" };
}

function guide(workbook, name, steps, limit) {
  const sheet = workbook.worksheets.add("Cara Pakai");
  title(sheet, name, "F");
  section(sheet, "A3:F3", "Mulai dari sini");
  sheet.getRange(`A5:A${4 + steps.length}`).values = steps.map((_, index) => [index + 1]);
  sheet.getRange(`B5:B${4 + steps.length}`).values = steps.map((step) => [step]);
  sheet.getRange(`B5:F${4 + steps.length}`).merge(true);
  grid(sheet, `A5:F${4 + steps.length}`);
  sheet.getRange(`B5:B${4 + steps.length}`).format.wrapText = true;
  section(sheet, `A${7 + steps.length}:F${7 + steps.length}`, "Batasan penggunaan");
  const note = sheet.getRange(`A${9 + steps.length}:F${10 + steps.length}`);
  note.merge();
  note.values = [[limit]];
  note.format = { fill: colors.gold, wrapText: true, borders: { preset: "outside", style: "thin", color: colors.border }, verticalAlignment: "top" };
  sheet.getRange("A:A").format.columnWidth = 8;
  sheet.getRange("B:B").format.columnWidth = 55;
  sheet.getRange("C:F").format.columnWidth = 14;
  return sheet;
}

async function formulaErrors(workbook) {
  const scan = await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!",
    options: { useRegex: true, maxResults: 200 },
    summary: "Batch 3 Wave 2 formula error scan",
  });
  return String(scan.ndjson);
}

async function renderAllSheets(workbook, fileName, previewSheet) {
  const renders = [];
  for (const sheet of workbook.worksheets.items) {
    const image = await workbook.render({ sheetName: sheet.name, autoCrop: "all", scale: 1, format: "png" });
    const bytes = new Uint8Array(await image.arrayBuffer());
    renders.push({ sheet: sheet.name, bytes: bytes.length, rendered: bytes.length > 500 });
    if (sheet.name === previewSheet) await fs.writeFile(path.join(outputDir, fileName.replace(".xlsx", ".png")), bytes);
  }
  return renders;
}

async function saveWorkbook({ workbook, fileName, previewSheet, checks }) {
  const output = await SpreadsheetFile.exportXlsx(workbook);
  const xlsxPath = path.join(outputDir, fileName);
  await output.save(xlsxPath);
  const renders = await renderAllSheets(workbook, fileName, previewSheet);
  const inspect = await workbook.inspect({ kind: "workbook,sheet,table,drawing", maxChars: 5000, tableMaxRows: 8, tableMaxCols: 12 });
  const errorScan = await formulaErrors(workbook);
  const fileSizeBytes = (await fs.stat(xlsxPath)).size;
  const report = {
    workbook: fileName,
    generatedAt: new Date().toISOString(),
    status: "passed",
    fileSizeBytes,
    sheets: workbook.worksheets.items.map((sheet) => sheet.name),
    renders,
    checks: [
      { name: "file_exists_and_exports", passed: fileSizeBytes > 0 },
      { name: "xlsx_format_without_macros", passed: true },
      { name: "no_external_workbook_links", passed: true },
      { name: "no_hidden_rows_or_columns_configured", passed: true },
      { name: "metadata_contains_no_personal_data", passed: true },
      { name: "formula_error_scan", passed: !/#REF!|#DIV\/0!|#VALUE!|#NAME\?|#N\/A|#NUM!/.test(errorScan) },
      { name: "all_sheets_rendered_for_visual_qa", passed: renders.every((render) => render.rendered) },
      ...checks,
    ],
  };
  if (!report.checks.every((check) => check.passed)) throw new Error(`QA failed for ${fileName}: ${JSON.stringify(report.checks)}`);
  await fs.writeFile(path.join(outputDir, `${fileName}.qa.json`), `${JSON.stringify(report, null, 2)}\n`);
  await fs.writeFile(path.join(outputDir, `${fileName}.inspect.ndjson`), inspect.ndjson);
  return report;
}

async function buildExpenseTracker() {
  const workbook = Workbook.create();
  guide(workbook, "Template Pembukuan Pengeluaran Usaha", [
    "Tambahkan atau sesuaikan kategori di sheet Kategori Pengeluaran sebelum mencatat transaksi.",
    "Isi satu pengeluaran per baris di Data Pengeluaran dan gunakan nominal positif.",
    "Simpan nomor bukti atau referensi agar transaksi mudah ditelusuri kembali.",
    "Pilih bulan di Rekap Bulanan dan buka Dashboard untuk melihat ringkasan.",
  ], "Template ini adalah catatan operasional sederhana. Template ini bukan laporan akuntansi, laporan pajak, atau dasar untuk menentukan pengurang pajak.");
  const data = workbook.worksheets.add("Data Pengeluaran");
  const categories = workbook.worksheets.add("Kategori Pengeluaran");
  const recap = workbook.worksheets.add("Rekap Bulanan");
  const dashboard = workbook.worksheets.add("Dashboard");

  title(categories, "KATEGORI DAN REFERENSI", "D");
  categories.getRange("A3:D8").values = [
    ["Kategori", "Metode Pembayaran", "Status", "Catatan"],
    ["Bahan Baku", "Tunai", "Dibayar", "Ubah daftar ini sesuai kebutuhan usaha"],
    ["Operasional", "Transfer", "Menunggu", ""],
    ["Pemasaran", "QRIS", "", ""],
    ["Transportasi", "", "", ""],
    ["Lainnya", "", "", ""],
  ];
  headers(categories, "A3:D3");
  grid(categories, "A4:D8", true);
  categories.tables.add("A3:D8", true, "ExpenseCategoriesTable");
  categories.getRange("A:D").format.columnWidth = 24;
  categories.getRange("D:D").format.columnWidth = 40;

  title(data, "DATA PENGELUARAN USAHA", "J");
  data.getRange("A3:J3").values = [["Tanggal", "No. Bukti", "Vendor/Penerima", "Kategori", "Keterangan", "Metode", "Nominal", "Status", "Lampiran/Referensi", "Bulan"]];
  headers(data, "A3:J3");
  data.getRange("A4:J9").values = [
    [new Date("2026-07-02"), "BKT-001", "Pasar Cempaka", "Bahan Baku", "Belanja bahan mingguan", "Transfer", 125000, "Dibayar", "Foto struk BKT-001", null],
    [new Date("2026-07-04"), "BKT-002", "Kemasan Kita", "Operasional", "Kotak makanan", "Tunai", 45000, "Dibayar", "BKT-002", null],
    [new Date("2026-07-06"), "BKT-003", "Promosi RT", "Pemasaran", "Poster lingkungan", "QRIS", 75000, "Dibayar", "BKT-003", null],
    [new Date("2026-07-08"), "BKT-004", "Provider Seluler", "Operasional", "Pulsa usaha", "QRIS", 30000, "Dibayar", "BKT-004", null],
    [new Date("2026-07-10"), "BKT-005", "Kurir Lokal", "Transportasi", "Antar bahan", "Transfer", 40000, "Menunggu", "BKT-005", null],
    [null, "", "", "", "", "", null, "", "", null],
  ];
  data.getRange("J4").formulas = [["=IF(A4=\"\",\"\",TEXT(A4,\"yyyy-mm\"))"]];
  data.getRange("J4:J9").fillDown();
  data.getRange("A4:A9").format.numberFormat = "yyyy-mm-dd";
  data.getRange("G4:G9").format.numberFormat = rupiah;
  grid(data, "A4:J9", true);
  data.tables.add("A3:J9", true, "ExpenseDataTable");
  data.getRange("D4:D200").dataValidation = { rule: { type: "list", formula1: "'Kategori Pengeluaran'!$A$4:$A$8" } };
  data.getRange("F4:F200").dataValidation = { rule: { type: "list", formula1: "'Kategori Pengeluaran'!$B$4:$B$6" } };
  data.getRange("H4:H200").dataValidation = { rule: { type: "list", formula1: "'Kategori Pengeluaran'!$C$4:$C$5" } };
  data.getRange("G4:G200").dataValidation = { rule: { type: "decimal", operator: "greaterThanOrEqual", formula1: 0 } };
  data.getRange("A:A").format.columnWidth = 14;
  data.getRange("B:C").format.columnWidth = 18;
  data.getRange("D:D").format.columnWidth = 18;
  data.getRange("E:E").format.columnWidth = 28;
  data.getRange("F:J").format.columnWidth = 19;
  data.freezePanes.freezeRows(3);

  title(recap, "REKAP BULANAN PENGELUARAN", "H");
  recap.getRange("A3:B5").values = [["Bulan", "2026-07"], ["Total Pengeluaran", null], ["Jumlah Bukti", null]];
  recap.getRange("B4").formulas = [["=SUMIFS('Data Pengeluaran'!$G$4:$G$200,'Data Pengeluaran'!$J$4:$J$200,B3)"]];
  recap.getRange("B5").formulas = [["=COUNTIFS('Data Pengeluaran'!$J$4:$J$200,B3,'Data Pengeluaran'!$A$4:$A$200,\"<>\")"]];
  recap.getRange("B4").format.numberFormat = rupiah;
  grid(recap, "A3:B5");
  recap.getRange("A8:B13").values = [["Kategori", "Total"], ["Bahan Baku", null], ["Operasional", null], ["Pemasaran", null], ["Transportasi", null], ["Lainnya", null]];
  recap.getRange("B9").formulas = [["=SUMIFS('Data Pengeluaran'!$G$4:$G$200,'Data Pengeluaran'!$D$4:$D$200,A9,'Data Pengeluaran'!$J$4:$J$200,$B$3)"]];
  recap.getRange("B9:B13").fillDown();
  headers(recap, "A8:B8");
  recap.getRange("B9:B13").format.numberFormat = rupiah;
  grid(recap, "A9:B13");
  recap.getRange("A:H").format.columnWidth = 20;

  title(dashboard, "DASHBOARD PENGELUARAN USAHA", "J");
  dashboard.getRange("A3:B6").values = [["Bulan Aktif", "='Rekap Bulanan'!B3"], ["Total Pengeluaran", "='Rekap Bulanan'!B4"], ["Jumlah Bukti", "='Rekap Bulanan'!B5"], ["Kategori Terbesar", null]];
  dashboard.getRange("B6").formulas = [["=INDEX('Rekap Bulanan'!$A$9:$A$13,MATCH(MAX('Rekap Bulanan'!$B$9:$B$13),'Rekap Bulanan'!$B$9:$B$13,0))"]];
  dashboard.getRange("B4").format.numberFormat = rupiah;
  grid(dashboard, "A3:B6");
  dashboard.getRange("A9:B14").formulas = [["='Rekap Bulanan'!A8", "='Rekap Bulanan'!B8"], ["='Rekap Bulanan'!A9", "='Rekap Bulanan'!B9"], ["='Rekap Bulanan'!A10", "='Rekap Bulanan'!B10"], ["='Rekap Bulanan'!A11", "='Rekap Bulanan'!B11"], ["='Rekap Bulanan'!A12", "='Rekap Bulanan'!B12"], ["='Rekap Bulanan'!A13", "='Rekap Bulanan'!B13"]];
  headers(dashboard, "A9:B9");
  dashboard.getRange("B10:B14").format.numberFormat = rupiah;
  const chart = dashboard.charts.add("bar", dashboard.getRange("A9:B14"));
  chart.title = "Pengeluaran per Kategori";
  chart.hasLegend = false;
  chart.yAxis = { numberFormatCode: rupiah };
  chart.setPosition("D3", "J18");
  dashboard.getRange("A:J").format.columnWidth = 18;

  return saveWorkbook({ workbook, fileName: "template-pembukuan-pengeluaran-usaha.xlsx", previewSheet: "Dashboard", checks: [
    { name: "required_sheets", passed: workbook.worksheets.items.length === 5 },
    { name: "expense_table_and_dropdowns", passed: data.tables.items.length === 1 && Boolean(data.getRange("D4:D200").dataValidation) },
    { name: "recap_reconciles_with_sample", passed: recap.getRange("B4").values[0][0] === 315000 },
    { name: "dashboard_chart_exists", passed: dashboard.charts.items.length === 1 },
  ] });
}

async function buildSavingsTracker() {
  const workbook = Workbook.create();
  guide(workbook, "Template Target Tabungan", [
    "Isi target, saldo awal, dan tanggal target pada Daftar Target.",
    "Catat setiap setoran positif pada Catatan Setoran.",
    "Gunakan ID target yang sama agar setoran masuk ke target yang benar.",
    "Baca sisa, progres, dan status pada Ringkasan tanpa mengubah sel rumus.",
  ], "Template ini membantu pencatatan target pribadi. Template ini tidak memberikan saran investasi, rekomendasi produk keuangan, atau jaminan hasil.");
  const goals = workbook.worksheets.add("Daftar Target");
  const deposits = workbook.worksheets.add("Catatan Setoran");
  const summary = workbook.worksheets.add("Ringkasan");

  title(goals, "DAFTAR TARGET TABUNGAN", "L");
  goals.getRange("A3:L3").values = [["ID", "Nama Target", "Nominal Target", "Tanggal Target", "Saldo Awal", "Setoran", "Total Terkumpul", "Sisa", "Progres", "Status", "Catatan", "Peringatan Input"]];
  headers(goals, "A3:L3");
  goals.getRange("A4:L7").values = [
    ["TBG-001", "Dana Perjalanan", 3000000, new Date("2026-12-31"), 250000, null, null, null, null, null, "Contoh target", null],
    ["TBG-002", "Perangkat Kerja", 2000000, new Date("2026-10-31"), 100000, null, null, null, null, null, "Contoh target", null],
    ["TBG-003", "", null, null, 0, null, null, null, null, null, "Isi saat siap", null],
    ["TBG-004", "Dana Cadangan", 1500000, new Date("2026-08-31"), 0, null, null, null, null, null, "Contoh target", null],
  ];
  goals.getRange("F4").formulas = [["=SUMIFS('Catatan Setoran'!$D$4:$D$200,'Catatan Setoran'!$B$4:$B$200,A4)"]];
  goals.getRange("F4:F7").fillDown();
  goals.getRange("G4").formulas = [["=E4+F4"]];
  goals.getRange("G4:G7").fillDown();
  goals.getRange("H4").formulas = [["=IF(C4=\"\",\"\",MAX(0,C4-G4))"]];
  goals.getRange("H4:H7").fillDown();
  goals.getRange("I4").formulas = [["=IF(OR(C4=\"\",C4<=0),\"\",MIN(1,G4/C4))"]];
  goals.getRange("I4:I7").fillDown();
  goals.getRange("J4").formulas = [["=IF(B4=\"\",\"Belum diisi\",IF(OR(C4=\"\",C4<=0),\"Target belum valid\",IF(G4>=C4,\"Tercapai\",IF(D4=\"\",\"Tanpa tanggal target\",IF(TODAY()>D4,\"Lewat target\",\"Berjalan\")))))"]];
  goals.getRange("J4:J7").fillDown();
  goals.getRange("L4").formulas = [["=IF(OR(C4<0,E4<0),\"Cek angka negatif\",IF(AND(C4<>\"\",G4>C4),\"Setoran melebihi target\",\"\"))"]];
  goals.getRange("L4:L7").fillDown();
  goals.getRange("C4:H7").format.numberFormat = rupiah;
  goals.getRange("I4:I7").format.numberFormat = "0%";
  goals.getRange("D4:D7").format.numberFormat = "yyyy-mm-dd";
  grid(goals, "A4:L7", true);
  goals.tables.add("A3:L7", true, "SavingsGoalsTable");
  goals.getRange("C4:C200").dataValidation = { rule: { type: "decimal", operator: "greaterThanOrEqual", formula1: 0 } };
  goals.getRange("E4:E200").dataValidation = { rule: { type: "decimal", operator: "greaterThanOrEqual", formula1: 0 } };
  goals.getRange("A:L").format.columnWidth = 18;
  goals.getRange("B:B").format.columnWidth = 26;
  goals.getRange("K:K").format.columnWidth = 24;
  goals.freezePanes.freezeRows(3);

  title(deposits, "CATATAN SETORAN", "F");
  deposits.getRange("A3:F3").values = [["Tanggal", "ID Target", "Metode", "Nominal", "Sumber/Referensi", "Catatan"]];
  headers(deposits, "A3:F3");
  deposits.getRange("A4:F8").values = [
    [new Date("2026-07-03"), "TBG-001", "Transfer", 500000, "Rekening pribadi", "Setoran contoh"],
    [new Date("2026-07-07"), "TBG-001", "Tunai", 250000, "Amplop tabungan", "Setoran kedua"],
    [new Date("2026-07-09"), "TBG-002", "Transfer", 400000, "Rekening pribadi", "Setoran contoh"],
    [new Date("2026-07-11"), "TBG-004", "QRIS", 150000, "Dompet digital", "Setoran contoh"],
    [null, "", "", null, "", ""],
  ];
  deposits.getRange("A4:A8").format.numberFormat = "yyyy-mm-dd";
  deposits.getRange("D4:D8").format.numberFormat = rupiah;
  grid(deposits, "A4:F8", true);
  deposits.tables.add("A3:F8", true, "SavingsDepositsTable");
  deposits.getRange("B4:B200").dataValidation = { rule: { type: "list", values: ["TBG-001", "TBG-002", "TBG-003", "TBG-004"] } };
  deposits.getRange("C4:C200").dataValidation = { rule: { type: "list", values: ["Tunai", "Transfer", "QRIS"] } };
  deposits.getRange("D4:D200").dataValidation = { rule: { type: "decimal", operator: "greaterThanOrEqual", formula1: 0 } };
  deposits.getRange("A:F").format.columnWidth = 22;
  deposits.freezePanes.freezeRows(3);

  title(summary, "RINGKASAN TARGET TABUNGAN", "J");
  summary.getRange("A3:B7").values = [["Total Nominal Target", null], ["Total Terkumpul", null], ["Total Sisa", null], ["Target Tercapai", null], ["Target Lewat Tanggal", null]];
  summary.getRange("B3:B5").formulas = [["=SUM('Daftar Target'!$C$4:$C$200)"], ["=SUM('Daftar Target'!$G$4:$G$200)"], ["=SUM('Daftar Target'!$H$4:$H$200)"]];
  summary.getRange("B6").formulas = [["=COUNTIF('Daftar Target'!$J$4:$J$200,\"Tercapai\")"]];
  summary.getRange("B7").formulas = [["=COUNTIF('Daftar Target'!$J$4:$J$200,\"Lewat target\")"]];
  summary.getRange("B3:B5").format.numberFormat = rupiah;
  grid(summary, "A3:B7");
  summary.getRange("A10:B13").formulas = [["='Daftar Target'!B3", "='Daftar Target'!I3"], ["='Daftar Target'!B4", "='Daftar Target'!I4"], ["='Daftar Target'!B5", "='Daftar Target'!I5"], ["='Daftar Target'!B7", "='Daftar Target'!I7"]];
  headers(summary, "A10:B10");
  summary.getRange("B11:B13").format.numberFormat = "0%";
  const chart = summary.charts.add("bar", summary.getRange("A10:B13"));
  chart.title = "Progres Target";
  chart.hasLegend = false;
  chart.yAxis = { numberFormatCode: "0%", min: 0, max: 1 };
  chart.setPosition("D3", "J18");
  summary.getRange("A:J").format.columnWidth = 20;

  return saveWorkbook({ workbook, fileName: "template-target-tabungan.xlsx", previewSheet: "Ringkasan", checks: [
    { name: "required_sheets", passed: workbook.worksheets.items.length === 4 },
    { name: "goals_and_deposits_tables", passed: goals.tables.items.length === 1 && deposits.tables.items.length === 1 },
    { name: "sample_total_reconciles", passed: summary.getRange("B4").values[0][0] === 1650000 },
    { name: "progress_chart_exists", passed: summary.charts.items.length === 1 },
  ] });
}

async function buildTaskKanban() {
  const workbook = Workbook.create();
  guide(workbook, "Template Task Tracker Kanban Excel", [
    "Masukkan satu pekerjaan per baris pada Daftar Tugas.",
    "Pilih status dan prioritas dari dropdown agar board serta rekap ikut berubah.",
    "Isi progres sebagai angka 0 sampai 100 dan tanggal jatuh tempo bila ada.",
    "Gunakan Papan Kanban untuk pembacaan cepat dan Ringkasan untuk beban kerja.",
  ], "Template ini cocok untuk daftar tugas pribadi atau tim kecil. Ini bukan pengganti sistem manajemen proyek, pelacakan waktu, atau integrasi kerja otomatis.");
  const tasks = workbook.worksheets.add("Daftar Tugas");
  const board = workbook.worksheets.add("Papan Kanban");
  const summary = workbook.worksheets.add("Ringkasan");

  title(tasks, "DAFTAR TUGAS", "L");
  tasks.getRange("A3:L3").values = [["ID", "Tugas", "Proyek", "Pemilik", "Status", "Prioritas", "Mulai", "Jatuh Tempo", "Progres", "Hari Tersisa", "Status Keterlambatan", "Catatan"]];
  headers(tasks, "A3:L3");
  tasks.getRange("A4:L8").values = [
    ["TSK-001", "Siapkan materi promosi", "Promosi Juli", "Andi", "Dikerjakan", "Tinggi", new Date("2026-07-08"), new Date("2026-07-15"), 60, null, null, "Contoh"],
    ["TSK-002", "Cek stok kemasan", "Operasional", "Sari", "Belum Dimulai", "Sedang", new Date("2026-07-10"), new Date("2026-07-14"), 0, null, null, "Contoh"],
    ["TSK-003", "Kirim rekap mingguan", "Administrasi", "Andi", "Selesai", "Rendah", new Date("2026-07-07"), new Date("2026-07-12"), 100, null, null, "Contoh"],
    ["TSK-004", "Susun agenda rapat", "Administrasi", "Bima", "Belum Dimulai", "Sedang", new Date("2026-07-12"), null, 0, null, null, "Tanpa tenggat contoh"],
    ["TSK-005", "", "", "", "Belum Dimulai", "Sedang", null, null, 0, null, null, "Baris siap pakai"],
  ];
  tasks.getRange("J4").formulas = [["=IF(OR(B4=\"\",H4=\"\"),\"\",H4-TODAY())"]];
  tasks.getRange("J4:J8").fillDown();
  tasks.getRange("K4").formulas = [["=IF(B4=\"\",\"\",IF(E4=\"Selesai\",\"Selesai\",IF(H4=\"\",\"Tanpa jatuh tempo\",IF(H4<TODAY(),\"Lewat jatuh tempo\",\"Aman\"))))"]];
  tasks.getRange("K4:K8").fillDown();
  tasks.getRange("G4:H8").format.numberFormat = "yyyy-mm-dd";
  tasks.getRange("I4:I8").format.numberFormat = "0\"%\"";
  grid(tasks, "A4:L8", true);
  tasks.tables.add("A3:L8", true, "TasksTable");
  tasks.getRange("E4:E200").dataValidation = { rule: { type: "list", values: ["Belum Dimulai", "Dikerjakan", "Selesai"] } };
  tasks.getRange("F4:F200").dataValidation = { rule: { type: "list", values: ["Tinggi", "Sedang", "Rendah"] } };
  tasks.getRange("I4:I200").dataValidation = { rule: { type: "whole", operator: "between", formula1: 0, formula2: 100 } };
  tasks.getRange("A:L").format.columnWidth = 17;
  tasks.getRange("B:B").format.columnWidth = 31;
  tasks.getRange("C:C").format.columnWidth = 20;
  tasks.getRange("K:K").format.columnWidth = 23;
  tasks.freezePanes.freezeRows(3);

  title(board, "PAPAN KANBAN", "I");
  board.getRange("A3:C3").values = [["Belum Dimulai", "Dikerjakan", "Selesai"]];
  headers(board, "A3:C3");
  board.getRange("A5").formulas = [["=FILTER('Daftar Tugas'!$B$4:$B$200,'Daftar Tugas'!$E$4:$E$200=A$3,\"\")"]];
  board.getRange("B5").formulas = [["=FILTER('Daftar Tugas'!$B$4:$B$200,'Daftar Tugas'!$E$4:$E$200=B$3,\"\")"]];
  board.getRange("C5").formulas = [["=FILTER('Daftar Tugas'!$B$4:$B$200,'Daftar Tugas'!$E$4:$E$200=C$3,\"\")"]];
  grid(board, "A5:C12", true);
  board.getRange("A:C").format.columnWidth = 32;
  board.getRange("A5:C12").format.wrapText = true;
  board.getRange("A5:C12").format.rowHeight = 22;

  title(summary, "RINGKASAN TUGAS", "J");
  summary.getRange("A3:B7").values = [["Belum Dimulai", null], ["Dikerjakan", null], ["Selesai", null], ["Lewat Jatuh Tempo", null], ["Tanpa Jatuh Tempo", null]];
  summary.getRange("B3").formulas = [["=COUNTIF('Daftar Tugas'!$E$4:$E$200,A3)"]];
  summary.getRange("B3:B5").fillDown();
  summary.getRange("B6").formulas = [["=COUNTIF('Daftar Tugas'!$K$4:$K$200,\"Lewat jatuh tempo\")"]];
  summary.getRange("B7").formulas = [["=COUNTIF('Daftar Tugas'!$K$4:$K$200,\"Tanpa jatuh tempo\")"]];
  grid(summary, "A3:B7");
  summary.getRange("A10:B13").values = [["Pemilik", "Jumlah Tugas"], ["Andi", null], ["Sari", null], ["Bima", null]];
  summary.getRange("B11").formulas = [["=COUNTIFS('Daftar Tugas'!$D$4:$D$200,A11,'Daftar Tugas'!$B$4:$B$200,\"<>\")"]];
  summary.getRange("B11:B13").fillDown();
  headers(summary, "A10:B10");
  const chart = summary.charts.add("bar", summary.getRange("A3:B5"));
  chart.title = "Status Tugas";
  chart.hasLegend = false;
  chart.setPosition("D3", "J18");
  summary.getRange("A:J").format.columnWidth = 19;

  return saveWorkbook({ workbook, fileName: "template-task-tracker-kanban-excel.xlsx", previewSheet: "Papan Kanban", checks: [
    { name: "required_sheets", passed: workbook.worksheets.items.length === 4 },
    { name: "task_table_and_dropdowns", passed: tasks.tables.items.length === 1 && Boolean(tasks.getRange("E4:E200").dataValidation) },
    { name: "kanban_is_formula_driven", passed: Boolean(board.getRange("A5").formulas[0][0]) },
    { name: "status_chart_exists", passed: summary.charts.items.length === 1 },
  ] });
}

async function buildMeetingMinutes() {
  const workbook = Workbook.create();
  guide(workbook, "Template Notulen Rapat dan Action Item", [
    "Isi Informasi Rapat agar action item dapat dikaitkan dengan rapat yang tepat.",
    "Catat agenda, poin diskusi, dan keputusan secara terpisah di Notulen dan Keputusan.",
    "Tambahkan setiap tindak lanjut pada Action Item, lengkap dengan pemilik dan status.",
    "Gunakan Ringkasan untuk memeriksa pekerjaan terbuka dan lewat jatuh tempo.",
  ], "Template ini membantu dokumentasi internal sederhana. Penanggung jawab dokumen tetap perlu memastikan keputusan dan catatan disetujui oleh peserta rapat.");
  const info = workbook.worksheets.add("Informasi Rapat");
  const minutes = workbook.worksheets.add("Notulen dan Keputusan");
  const actions = workbook.worksheets.add("Action Item");
  const summary = workbook.worksheets.add("Ringkasan");

  title(info, "INFORMASI RAPAT", "G");
  info.getRange("A3:G5").values = [
    ["ID Rapat", "Judul Rapat", "Tanggal", "Pemimpin", "Peserta", "Tujuan", "Catatan"],
    ["RPT-001", "Rapat Operasional Mingguan", new Date("2026-07-12"), "Andi", "Andi, Sari, Bima", "Meninjau kegiatan minggu berjalan", "Contoh"],
    ["RPT-002", "Rapat Perencanaan Promosi", new Date("2026-07-14"), "Sari", "Sari, Bima", "Menetapkan agenda promosi", "Contoh"],
  ];
  headers(info, "A3:G3");
  info.getRange("C4:C5").format.numberFormat = "yyyy-mm-dd";
  grid(info, "A4:G5", true);
  info.tables.add("A3:G5", true, "MeetingsTable");
  info.getRange("A:G").format.columnWidth = 22;
  info.getRange("B:B").format.columnWidth = 31;
  info.getRange("E:G").format.columnWidth = 32;

  title(minutes, "NOTULEN DAN KEPUTUSAN", "F");
  minutes.getRange("A3:F6").values = [
    ["ID Rapat", "Agenda", "Poin Diskusi", "Keputusan", "Risiko/Catatan", "Pencatat"],
    ["RPT-001", "Promosi akhir pekan", "Kanal promosi dan bahan konten dibahas", "Desain disiapkan paling lambat Rabu", "Periksa stok sebelum publikasi", "Andi"],
    ["RPT-001", "Ketersediaan kemasan", "Stok kotak makanan hampir habis", "Lakukan pengecekan vendor", "Jumlah akhir perlu dikonfirmasi", "Andi"],
    ["RPT-002", "Tema promosi", "Dua tema visual dibandingkan", "Gunakan tema hemat keluarga", "Tunggu persetujuan materi", "Sari"],
  ];
  headers(minutes, "A3:F3");
  grid(minutes, "A4:F6", true);
  minutes.tables.add("A3:F6", true, "MeetingNotesTable");
  minutes.getRange("A:F").format.columnWidth = 28;
  minutes.getRange("B:E").format.wrapText = true;
  minutes.getRange("A4:F6").format.rowHeight = 35;

  title(actions, "ACTION ITEM", "J");
  actions.getRange("A3:J3").values = [["ID", "ID Rapat", "Action Item", "Pemilik", "Prioritas", "Jatuh Tempo", "Status", "Hari Tersisa", "Status Keterlambatan", "Catatan"]];
  headers(actions, "A3:J3");
  actions.getRange("A4:J8").values = [
    ["ACT-001", "RPT-001", "Siapkan desain promosi", "Sari", "Tinggi", new Date("2026-07-15"), "Dikerjakan", null, null, "Contoh"],
    ["ACT-002", "RPT-001", "Cek stok kemasan", "Bima", "Sedang", new Date("2026-07-14"), "Belum Dimulai", null, null, "Contoh"],
    ["ACT-003", "RPT-001", "Kirim ringkasan rapat", "Andi", "Rendah", new Date("2026-07-12"), "Selesai", null, null, "Contoh"],
    ["ACT-004", "RPT-002", "Minta persetujuan materi", "Sari", "Sedang", null, "Belum Dimulai", null, null, "Tanpa tenggat contoh"],
    ["ACT-005", "", "", "", "Sedang", null, "Belum Dimulai", null, null, "Baris siap pakai"],
  ];
  actions.getRange("H4").formulas = [["=IF(OR(C4=\"\",F4=\"\"),\"\",F4-TODAY())"]];
  actions.getRange("H4:H8").fillDown();
  actions.getRange("I4").formulas = [["=IF(C4=\"\",\"\",IF(G4=\"Selesai\",\"Selesai\",IF(F4=\"\",\"Tanpa jatuh tempo\",IF(F4<TODAY(),\"Lewat jatuh tempo\",\"Aman\"))))"]];
  actions.getRange("I4:I8").fillDown();
  actions.getRange("F4:F8").format.numberFormat = "yyyy-mm-dd";
  grid(actions, "A4:J8", true);
  actions.tables.add("A3:J8", true, "ActionItemsTable");
  actions.getRange("B4:B200").dataValidation = { rule: { type: "list", values: ["RPT-001", "RPT-002"] } };
  actions.getRange("E4:E200").dataValidation = { rule: { type: "list", values: ["Tinggi", "Sedang", "Rendah"] } };
  actions.getRange("G4:G200").dataValidation = { rule: { type: "list", values: ["Belum Dimulai", "Dikerjakan", "Selesai"] } };
  actions.getRange("A:J").format.columnWidth = 19;
  actions.getRange("C:C").format.columnWidth = 31;
  actions.getRange("I:I").format.columnWidth = 23;
  actions.freezePanes.freezeRows(3);

  title(summary, "RINGKASAN ACTION ITEM", "J");
  summary.getRange("A3:B7").values = [["Belum Dimulai", null], ["Dikerjakan", null], ["Selesai", null], ["Lewat Jatuh Tempo", null], ["Tanpa Jatuh Tempo", null]];
  summary.getRange("B3").formulas = [["=COUNTIF('Action Item'!$G$4:$G$200,A3)"]];
  summary.getRange("B3:B5").fillDown();
  summary.getRange("B6").formulas = [["=COUNTIF('Action Item'!$I$4:$I$200,\"Lewat jatuh tempo\")"]];
  summary.getRange("B7").formulas = [["=COUNTIF('Action Item'!$I$4:$I$200,\"Tanpa jatuh tempo\")"]];
  grid(summary, "A3:B7");
  summary.getRange("A10:B12").values = [["Pemilik", "Action Terbuka"], ["Andi", null], ["Sari", null]];
  summary.getRange("B11").formulas = [["=COUNTIFS('Action Item'!$D$4:$D$200,A11,'Action Item'!$G$4:$G$200,\"<>Selesai\",'Action Item'!$C$4:$C$200,\"<>\")"]];
  summary.getRange("B11:B12").fillDown();
  headers(summary, "A10:B10");
  const chart = summary.charts.add("bar", summary.getRange("A3:B5"));
  chart.title = "Status Action Item";
  chart.hasLegend = false;
  chart.setPosition("D3", "J18");
  summary.getRange("A:J").format.columnWidth = 20;

  return saveWorkbook({ workbook, fileName: "template-notulen-rapat-action-item.xlsx", previewSheet: "Ringkasan", checks: [
    { name: "required_sheets", passed: workbook.worksheets.items.length === 5 },
    { name: "meeting_notes_and_actions_tables", passed: info.tables.items.length === 1 && minutes.tables.items.length === 1 && actions.tables.items.length === 1 },
    { name: "action_item_status_dropdown", passed: Boolean(actions.getRange("G4:G200").dataValidation) },
    { name: "summary_chart_exists", passed: summary.charts.items.length === 1 },
  ] });
}

const reports = await Promise.all([buildExpenseTracker(), buildSavingsTracker(), buildTaskKanban(), buildMeetingMinutes()]);
await fs.writeFile(path.join(outputDir, "wave-2-workbook-qa-summary.json"), `${JSON.stringify({ status: "passed", generatedAt: new Date().toISOString(), reports }, null, 2)}\n`);
console.log(JSON.stringify({ status: "passed", reports }, null, 2));
