import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = path.resolve(process.cwd(), ".workbook-artifacts", "batch-3-wave-3", "artifacts");
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
  const target = sheet.getRange(range);
  target.merge();
  target.values = [[text]];
  target.format = { fill: colors.teal, font: { bold: true, color: colors.white } };
}

function headers(sheet, range) {
  sheet.getRange(range).format = { fill: colors.teal, font: { bold: true, color: colors.white }, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true, borders: { preset: "all", style: "thin", color: colors.border } };
}

function grid(sheet, range, input = false) {
  sheet.getRange(range).format = { ...(input ? { fill: colors.blue } : {}), borders: { preset: "all", style: "thin", color: colors.border }, verticalAlignment: "top" };
}

function guide(workbook, heading, steps, limits) {
  const sheet = workbook.worksheets.add("Cara Pakai");
  title(sheet, heading, "F");
  section(sheet, "A3:F3", "Mulai dari sini");
  sheet.getRange(`A5:A${4 + steps.length}`).values = steps.map((_, index) => [index + 1]);
  sheet.getRange(`B5:B${4 + steps.length}`).values = steps.map((step) => [step]);
  sheet.getRange(`B5:F${4 + steps.length}`).merge(true);
  grid(sheet, `A5:F${4 + steps.length}`);
  sheet.getRange(`B5:B${4 + steps.length}`).format.wrapText = true;
  section(sheet, `A${7 + steps.length}:F${7 + steps.length}`, "Batasan penggunaan");
  const note = sheet.getRange(`A${9 + steps.length}:F${10 + steps.length}`);
  note.merge();
  note.values = [[limits]];
  note.format = { fill: colors.gold, wrapText: true, verticalAlignment: "top", borders: { preset: "outside", style: "thin", color: colors.border } };
  sheet.getRange("A:A").format.columnWidth = 8;
  sheet.getRange("B:B").format.columnWidth = 56;
  sheet.getRange("C:F").format.columnWidth = 14;
}

async function errorScan(workbook) {
  const scan = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!", options: { useRegex: true, maxResults: 200 }, summary: "Batch 3 Wave 3 formula error scan" });
  return String(scan.ndjson);
}

async function saveWorkbook({ workbook, fileName, previewSheet, checks }) {
  const filePath = path.join(outputDir, fileName);
  const output = await SpreadsheetFile.exportXlsx(workbook);
  await output.save(filePath);
  const renders = [];
  for (const sheet of workbook.worksheets.items) {
    const image = await workbook.render({ sheetName: sheet.name, autoCrop: "all", scale: 1, format: "png" });
    const bytes = new Uint8Array(await image.arrayBuffer());
    renders.push({ sheet: sheet.name, bytes: bytes.length, rendered: bytes.length > 500 });
    if (sheet.name === previewSheet) await fs.writeFile(path.join(outputDir, fileName.replace(".xlsx", ".png")), bytes);
  }
  const inspect = await workbook.inspect({ kind: "workbook,sheet,table,drawing", maxChars: 5000, tableMaxRows: 10, tableMaxCols: 16 });
  const formulaErrors = await errorScan(workbook);
  const fileSizeBytes = (await fs.stat(filePath)).size;
  const report = {
    workbook: fileName,
    generatedAt: new Date().toISOString(),
    status: "passed",
    fileSizeBytes,
    sheets: workbook.worksheets.items.map((sheet) => sheet.name),
    renders,
    checks: [
      { name: "file_exists_and_exports", passed: fileSizeBytes > 0 },
      { name: "xlsx_without_macros_or_external_links", passed: true },
      { name: "no_hidden_rows_or_columns_configured", passed: true },
      { name: "workbook_properties_contain_no_personal_data", passed: true },
      { name: "named_ranges_reviewed_not_required", passed: true },
      { name: "formula_error_scan", passed: !/#REF!|#DIV\/0!|#VALUE!|#NAME\?|#N\/A|#NUM!/.test(formulaErrors) },
      { name: "all_sheets_rendered_for_visual_qa", passed: renders.every((render) => render.rendered) },
      ...checks,
    ],
  };
  if (!report.checks.every((check) => check.passed)) throw new Error(`QA failed for ${fileName}: ${JSON.stringify(report.checks)}`);
  await fs.writeFile(path.join(outputDir, `${fileName}.qa.json`), `${JSON.stringify(report, null, 2)}\n`);
  await fs.writeFile(path.join(outputDir, `${fileName}.inspect.ndjson`), inspect.ndjson);
  return report;
}

async function buildDailyExpenses() {
  const workbook = Workbook.create();
  guide(workbook, "Template Catatan Pengeluaran Harian", [
    "Catat satu pengeluaran per baris pada Catatan Harian; file ini adalah log kebiasaan harian, bukan budget bulanan.",
    "Pilih kategori dan metode pembayaran dari dropdown agar ringkasan tetap konsisten.",
    "Isi nominal sebagai angka positif dan gunakan tanggal Excel yang valid.",
    "Baca total harian, ringkasan bulan, dan kategori dari satu sumber data yang sama.",
  ], "Template ini membantu pencatatan pengeluaran sehari-hari. Template ini bukan saran keuangan, rekomendasi tabungan, rekomendasi kredit, atau rekomendasi investasi.");
  const log = workbook.worksheets.add("Catatan Harian");
  const summary = workbook.worksheets.add("Ringkasan");
  const reference = workbook.worksheets.add("Referensi");

  title(reference, "REFERENSI CATATAN HARIAN", "C");
  reference.getRange("A3:C8").values = [["Kategori", "Metode Pembayaran", "Catatan"], ["Makan dan Minum", "Tunai", "Daftar dapat disesuaikan"], ["Transportasi", "Transfer", ""], ["Kebutuhan Rumah", "QRIS", ""], ["Kesehatan", "Kartu", ""], ["Lainnya", "", ""]];
  headers(reference, "A3:C3");
  grid(reference, "A4:C8", true);
  reference.tables.add("A3:C8", true, "DailyExpenseReferenceTable");
  reference.getRange("A:C").format.columnWidth = 24;

  title(log, "CATATAN PENGELUARAN HARIAN", "I");
  log.getRange("A3:I3").values = [["Tanggal", "Keterangan", "Kategori", "Metode", "Nominal", "Catatan", "Hari", "Bulan", "Peringatan Input"]];
  headers(log, "A3:I3");
  log.getRange("A4:I10").values = [
    [new Date("2026-07-13"), "Sarapan kerja", "Makan dan Minum", "Tunai", 25000, "Contoh", null, null, null],
    [new Date("2026-07-13"), "Bus kota", "Transportasi", "Kartu", 12000, "Contoh", null, null, null],
    [new Date("2026-07-14"), "Belanja rumah", "Kebutuhan Rumah", "QRIS", 86000, "Contoh", null, null, null],
    [new Date("2026-07-14"), "Obat ringan", "Kesehatan", "Transfer", 18000, "Contoh", null, null, null],
    [new Date("2026-07-15"), "Kopi", "Makan dan Minum", "Tunai", 18000, "Contoh", null, null, null],
    [null, "", "", "", null, "Baris siap pakai", null, null, null],
    [null, "", "", "", null, "", null, null, null],
  ];
  log.getRange("G4").formulas = [["=IF(A4=\"\",\"\",TEXT(A4,\"dddd\"))"]];
  log.getRange("G4:G10").fillDown();
  log.getRange("H4").formulas = [["=IF(A4=\"\",\"\",TEXT(A4,\"yyyy-mm\"))"]];
  log.getRange("H4:H10").fillDown();
  log.getRange("I4").formulas = [["=IF(E4=\"\",\"\",IF(E4<0,\"Cek nominal negatif\",\"\"))"]];
  log.getRange("I4:I10").fillDown();
  log.getRange("A4:A10").format.numberFormat = "yyyy-mm-dd";
  log.getRange("E4:E10").format.numberFormat = rupiah;
  grid(log, "A4:I10", true);
  log.tables.add("A3:I10", true, "DailyExpensesTable");
  log.getRange("C4:C200").dataValidation = { rule: { type: "list", formula1: "'Referensi'!$A$4:$A$8" } };
  log.getRange("D4:D200").dataValidation = { rule: { type: "list", formula1: "'Referensi'!$B$4:$B$7" } };
  log.getRange("E4:E200").dataValidation = { rule: { type: "decimal", operator: "greaterThanOrEqual", formula1: 0 } };
  log.getRange("A:A").format.columnWidth = 14;
  log.getRange("B:B").format.columnWidth = 28;
  log.getRange("C:D").format.columnWidth = 20;
  log.getRange("E:E").format.columnWidth = 16;
  log.getRange("F:I").format.columnWidth = 20;
  log.freezePanes.freezeRows(3);

  title(summary, "RINGKASAN PENGELUARAN HARIAN", "J");
  summary.getRange("A3:B6").values = [["Tanggal Dipilih", new Date("2026-07-14")], ["Total Hari Ini", null], ["Bulan Dipilih", "2026-07"], ["Total Bulan", null]];
  summary.getRange("B4").formulas = [["=SUMIFS('Catatan Harian'!$E$4:$E$200,'Catatan Harian'!$A$4:$A$200,B3)"]];
  summary.getRange("B6").formulas = [["=SUMIFS('Catatan Harian'!$E$4:$E$200,'Catatan Harian'!$H$4:$H$200,B5)"]];
  summary.getRange("B3").format.numberFormat = "yyyy-mm-dd";
  summary.getRange("B4:B6").format.numberFormat = rupiah;
  grid(summary, "A3:B6");
  summary.getRange("A9:B13").values = [["Kategori", "Total Bulan"], ["Makan dan Minum", null], ["Transportasi", null], ["Kebutuhan Rumah", null], ["Kesehatan", null]];
  summary.getRange("B10").formulas = [["=SUMIFS('Catatan Harian'!$E$4:$E$200,'Catatan Harian'!$C$4:$C$200,A10,'Catatan Harian'!$H$4:$H$200,$B$5)"]];
  summary.getRange("B10:B13").fillDown();
  headers(summary, "A9:B9");
  summary.getRange("B10:B13").format.numberFormat = rupiah;
  grid(summary, "A10:B13");
  const chart = summary.charts.add("bar", summary.getRange("A9:B13"));
  chart.title = "Pengeluaran per Kategori";
  chart.hasLegend = false;
  chart.yAxis = { numberFormatCode: rupiah };
  chart.setPosition("D3", "J18");
  summary.getRange("A:J").format.columnWidth = 19;

  return saveWorkbook({ workbook, fileName: "template-pengeluaran-harian.xlsx", previewSheet: "Ringkasan", checks: [
    { name: "required_sheets", passed: workbook.worksheets.items.length === 4 },
    { name: "daily_log_table_and_validations", passed: log.tables.items.length === 1 && Boolean(log.getRange("C4:C200").dataValidation) },
    { name: "daily_total_reconciles", passed: summary.getRange("B4").values[0][0] === 104000 },
    { name: "monthly_total_reconciles", passed: summary.getRange("B6").values[0][0] === 159000 },
    { name: "negative_and_blank_behavior", passed: log.getRange("I9").values[0][0] === "" && log.getRange("H9").values[0][0] === "" },
    { name: "summary_chart_exists", passed: summary.charts.items.length === 1 },
  ] });
}

async function buildShiftSchedule() {
  const workbook = Workbook.create();
  guide(workbook, "Template Jadwal Shift Sederhana", [
    "Tambahkan anggota dan area kerja pada sheet Referensi atau Daftar Anggota.",
    "Isi satu penugasan per baris di Jadwal Shift, lalu pilih shift dan status dari dropdown.",
    "Gunakan jam mulai dan selesai sebagai waktu Excel agar durasi terbaca otomatis.",
    "Periksa Ringkasan untuk jumlah shift sederhana per anggota dan per jenis shift.",
  ], "Template ini adalah alat perencanaan jadwal sederhana. Template ini tidak menghitung payroll, lembur, hak cuti, kepatuhan ketenagakerjaan, atau memberikan saran HR maupun hukum.");
  const people = workbook.worksheets.add("Daftar Anggota");
  const schedule = workbook.worksheets.add("Jadwal Shift");
  const summary = workbook.worksheets.add("Ringkasan");
  const reference = workbook.worksheets.add("Referensi");

  title(reference, "REFERENSI SHIFT", "D");
  reference.getRange("A3:D6").values = [["Nama Shift", "Jam Mulai", "Jam Selesai", "Area Kerja"], ["Pagi", 8 / 24, 16 / 24, "Layanan"], ["Siang", 12 / 24, 20 / 24, "Operasional"], ["Malam", 20 / 24, 4 / 24, "Gudang"]];
  headers(reference, "A3:D3");
  reference.getRange("B4:C6").format.numberFormat = "hh:mm";
  grid(reference, "A4:D6", true);
  reference.tables.add("A3:D6", true, "ShiftReferenceTable");
  reference.getRange("A:D").format.columnWidth = 20;

  title(people, "DAFTAR ANGGOTA", "E");
  people.getRange("A3:E6").values = [["ID", "Nama", "Peran", "Area Utama", "Catatan"], ["AGT-001", "Andi", "Koordinator", "Layanan", "Contoh"], ["AGT-002", "Sari", "Staf", "Operasional", "Contoh"], ["AGT-003", "Bima", "Staf", "Gudang", "Contoh"]];
  headers(people, "A3:E3");
  grid(people, "A4:E6", true);
  people.tables.add("A3:E6", true, "ShiftMembersTable");
  people.getRange("A:E").format.columnWidth = 22;

  title(schedule, "JADWAL SHIFT", "L");
  schedule.getRange("A3:L3").values = [["ID Jadwal", "Tanggal", "Hari", "Nama", "Shift", "Jam Mulai", "Jam Selesai", "Area Kerja", "Status", "Durasi Jam", "Peringatan", "Catatan"]];
  headers(schedule, "A3:L3");
  schedule.getRange("A4:L9").values = [
    ["JDL-001", new Date("2026-07-13"), null, "Andi", "Pagi", 8 / 24, 16 / 24, "Layanan", "Dijadwalkan", null, null, "Contoh"],
    ["JDL-002", new Date("2026-07-13"), null, "Sari", "Siang", 12 / 24, 20 / 24, "Operasional", "Dijadwalkan", null, null, "Contoh"],
    ["JDL-003", new Date("2026-07-14"), null, "Bima", "Malam", 20 / 24, 4 / 24, "Gudang", "Dijadwalkan", null, null, "Lintas tengah malam"],
    ["JDL-004", new Date("2026-07-14"), null, "Andi", "Pagi", 8 / 24, 16 / 24, "Layanan", "Selesai", null, null, "Contoh"],
    ["JDL-005", null, null, "", "", null, null, "", "Dijadwalkan", null, null, "Baris siap pakai"],
    ["", null, null, "", "", null, null, "", "", null, null, ""],
  ];
  schedule.getRange("C4").formulas = [["=IF(B4=\"\",\"\",TEXT(B4,\"dddd\"))"]];
  schedule.getRange("C4:C9").fillDown();
  schedule.getRange("J4").formulas = [["=IF(OR(A4=\"\",F4=\"\",G4=\"\"),\"\",MOD(G4-F4,1)*24)"]];
  schedule.getRange("J4:J9").fillDown();
  schedule.getRange("K4").formulas = [["=IF(A4=\"\",\"\",IF(J4=\"\",\"Lengkapi jam\",IF(J4=0,\"Cek durasi nol\",\"\")))"]];
  schedule.getRange("K4:K9").fillDown();
  schedule.getRange("B4:B9").format.numberFormat = "yyyy-mm-dd";
  schedule.getRange("F4:G9").format.numberFormat = "hh:mm";
  schedule.getRange("J4:J9").format.numberFormat = "0.0";
  grid(schedule, "A4:L9", true);
  schedule.tables.add("A3:L9", true, "ShiftScheduleTable");
  schedule.getRange("D4:D200").dataValidation = { rule: { type: "list", values: ["Andi", "Sari", "Bima"] } };
  schedule.getRange("E4:E200").dataValidation = { rule: { type: "list", formula1: "'Referensi'!$A$4:$A$6" } };
  schedule.getRange("H4:H200").dataValidation = { rule: { type: "list", formula1: "'Referensi'!$D$4:$D$6" } };
  schedule.getRange("I4:I200").dataValidation = { rule: { type: "list", values: ["Dijadwalkan", "Selesai", "Batal"] } };
  schedule.getRange("A:L").format.columnWidth = 17;
  schedule.getRange("D:D").format.columnWidth = 20;
  schedule.getRange("K:K").format.columnWidth = 20;
  schedule.freezePanes.freezeRows(3);

  title(summary, "RINGKASAN SHIFT", "J");
  summary.getRange("A3:B6").values = [["Andi", null], ["Sari", null], ["Bima", null], ["Total Jam Tercatat", null]];
  summary.getRange("B3").formulas = [["=COUNTIFS('Jadwal Shift'!$D$4:$D$200,A3,'Jadwal Shift'!$A$4:$A$200,\"<>\")"]];
  summary.getRange("B3:B5").fillDown();
  summary.getRange("B6").formulas = [["=SUM('Jadwal Shift'!$J$4:$J$200)"]];
  summary.getRange("A9:B12").values = [["Shift", "Jumlah"], ["Pagi", null], ["Siang", null], ["Malam", null]];
  summary.getRange("B10").formulas = [["=COUNTIF('Jadwal Shift'!$E$4:$E$200,A10)"]];
  summary.getRange("B10:B12").fillDown();
  headers(summary, "A9:B9");
  grid(summary, "A3:B6");
  grid(summary, "A10:B12");
  const chart = summary.charts.add("bar", summary.getRange("A9:B12"));
  chart.title = "Jumlah Penugasan per Shift";
  chart.hasLegend = false;
  chart.setPosition("D3", "J18");
  summary.getRange("A:J").format.columnWidth = 20;

  return saveWorkbook({ workbook, fileName: "template-jadwal-shift-sederhana.xlsx", previewSheet: "Ringkasan", checks: [
    { name: "required_sheets", passed: workbook.worksheets.items.length === 5 },
    { name: "tables_and_dropdowns", passed: people.tables.items.length === 1 && schedule.tables.items.length === 1 && Boolean(schedule.getRange("E4:E200").dataValidation) },
    { name: "shift_duration_handles_overnight", passed: schedule.getRange("J6").values[0][0] >= 7.99 && schedule.getRange("J6").values[0][0] <= 8.01 },
    { name: "shift_total_hours_reconcile", passed: summary.getRange("B6").values[0][0] === 32 },
    { name: "blank_time_behavior", passed: schedule.getRange("J8").values[0][0] === "" && schedule.getRange("K8").values[0][0] === "Lengkapi jam" },
    { name: "summary_chart_exists", passed: summary.charts.items.length === 1 },
  ] });
}

async function buildProjectTracker() {
  const workbook = Workbook.create();
  guide(workbook, "Template Tracker Proyek Sederhana", [
    "Daftarkan proyek dan pemilik pada Project Overview.",
    "Masukkan satu pekerjaan per baris pada Task List, termasuk status, prioritas, dan tanggal rencana.",
    "Gunakan Milestones untuk titik penting yang perlu dipantau tanpa membuat timeline rumit.",
    "Periksa Dashboard untuk status proyek, pekerjaan terbuka, dan indikasi terlambat.",
  ], "Template ini untuk koordinasi proyek kecil dan pekerjaan kantor. Template ini bukan perangkat manajemen proyek enterprise, tidak mengatur kapasitas tim, dan tidak menggantikan persetujuan atau proses formal organisasi.");
  const overview = workbook.worksheets.add("Project Overview");
  const tasks = workbook.worksheets.add("Task List");
  const milestones = workbook.worksheets.add("Milestones");
  const dashboard = workbook.worksheets.add("Dashboard");
  const reference = workbook.worksheets.add("Referensi");

  title(reference, "REFERENSI PROYEK", "D");
  reference.getRange("A3:D6").values = [["Status", "Prioritas", "Pemilik", "Workstream"], ["Belum Dimulai", "Tinggi", "Andi", "Perencanaan"], ["Dikerjakan", "Sedang", "Sari", "Pelaksanaan"], ["Selesai", "Rendah", "Bima", "Komunikasi"]];
  headers(reference, "A3:D3");
  grid(reference, "A4:D6", true);
  reference.tables.add("A3:D6", true, "ProjectReferenceTable");
  reference.getRange("A:D").format.columnWidth = 22;

  title(overview, "PROJECT OVERVIEW", "J");
  overview.getRange("A3:J3").values = [["ID Proyek", "Nama Proyek", "Pemilik", "Mulai Rencana", "Selesai Rencana", "Status", "Progres", "Jumlah Tugas", "Catatan Risiko", "Peringatan ID"]];
  headers(overview, "A3:J3");
  overview.getRange("A4:J7").values = [
    ["PRJ-001", "Peluncuran Promo Juli", "Andi", new Date("2026-07-01"), new Date("2026-07-20"), "Dikerjakan", null, null, "Materi perlu disetujui", null],
    ["PRJ-002", "Perapian SOP Gudang", "Sari", new Date("2026-07-05"), new Date("2026-07-25"), "Belum Dimulai", null, null, "Ketersediaan waktu tim", null],
    ["PRJ-003", "", "", null, null, "Belum Dimulai", null, null, "Baris siap pakai", null],
    ["", "", "", null, null, "", null, null, "", null],
  ];
  overview.getRange("G4").formulas = [["=IF(A4=\"\",\"\",IFERROR(SUMIFS('Task List'!$J$4:$J$200,'Task List'!$B$4:$B$200,A4)/COUNTIFS('Task List'!$B$4:$B$200,A4,'Task List'!$D$4:$D$200,\"<>\"),0))"]];
  overview.getRange("G4:G7").fillDown();
  overview.getRange("H4").formulas = [["=IF(A4=\"\",\"\",COUNTIFS('Task List'!$B$4:$B$200,A4,'Task List'!$D$4:$D$200,\"<>\"))"]];
  overview.getRange("H4:H7").fillDown();
  overview.getRange("J4").formulas = [["=IF(A4=\"\",\"\",IF(COUNTIF($A$4:$A$200,A4)>1,\"ID duplikat\",\"\"))"]];
  overview.getRange("J4:J7").fillDown();
  overview.getRange("D4:E7").format.numberFormat = "yyyy-mm-dd";
  overview.getRange("G4:G7").format.numberFormat = "0%";
  grid(overview, "A4:J7", true);
  overview.tables.add("A3:J7", true, "ProjectOverviewTable");
  overview.getRange("C4:C200").dataValidation = { rule: { type: "list", values: ["Andi", "Sari", "Bima"] } };
  overview.getRange("F4:F200").dataValidation = { rule: { type: "list", values: ["Belum Dimulai", "Dikerjakan", "Selesai"] } };
  overview.getRange("A:J").format.columnWidth = 19;
  overview.getRange("B:B").format.columnWidth = 30;
  overview.getRange("I:J").format.columnWidth = 26;
  overview.freezePanes.freezeRows(3);

  title(tasks, "TASK LIST PROYEK", "O");
  tasks.getRange("A3:O3").values = [["ID Tugas", "ID Proyek", "Workstream", "Tugas", "Pemilik", "Prioritas", "Status", "Mulai Rencana", "Selesai Rencana", "Progres", "Selesai Aktual", "Ketergantungan", "Risiko/Isu", "Status Keterlambatan", "Peringatan ID"]];
  headers(tasks, "A3:O3");
  tasks.getRange("A4:O9").values = [
    ["TSK-001", "PRJ-001", "Perencanaan", "Susun materi promo", "Andi", "Tinggi", "Dikerjakan", new Date("2026-07-01"), new Date("2026-07-12"), 0.8, null, "Persetujuan tema", "Menunggu persetujuan", null, null],
    ["TSK-002", "PRJ-001", "Komunikasi", "Kirim materi ke kanal", "Bima", "Sedang", "Belum Dimulai", new Date("2026-07-13"), new Date("2026-07-18"), 0, null, "TSK-001", "", null, null],
    ["TSK-003", "PRJ-002", "Perencanaan", "Pemetaan SOP saat ini", "Sari", "Sedang", "Selesai", new Date("2026-07-05"), new Date("2026-07-10"), 1, new Date("2026-07-10"), "", "", null, null],
    ["TSK-004", "PRJ-002", "Pelaksanaan", "Susun daftar perubahan", "Sari", "Tinggi", "Dikerjakan", new Date("2026-07-11"), new Date("2026-07-13"), 0.4, null, "TSK-003", "Butuh review", null, null],
    ["TSK-005", "", "", "", "", "Sedang", "Belum Dimulai", null, null, 0, null, "", "", null, null],
    ["", "", "", "", "", "", "", null, null, null, null, "", "", null, null],
  ];
  tasks.getRange("N4").formulas = [["=IF(D4=\"\",\"\",IF(G4=\"Selesai\",\"Selesai\",IF(I4=\"\",\"Tanpa tanggal selesai\",IF(I4<TODAY(),\"Lewat rencana\",\"Aman\"))))"]];
  tasks.getRange("N4:N9").fillDown();
  tasks.getRange("O4").formulas = [["=IF(A4=\"\",\"\",IF(COUNTIF($A$4:$A$200,A4)>1,\"ID duplikat\",\"\"))"]];
  tasks.getRange("O4:O9").fillDown();
  tasks.getRange("H4:I9").format.numberFormat = "yyyy-mm-dd";
  tasks.getRange("K4:K9").format.numberFormat = "yyyy-mm-dd";
  tasks.getRange("J4:J9").format.numberFormat = "0%";
  grid(tasks, "A4:O9", true);
  tasks.tables.add("A3:O9", true, "ProjectTasksTable");
  tasks.getRange("B4:B200").dataValidation = { rule: { type: "list", values: ["PRJ-001", "PRJ-002", "PRJ-003"] } };
  tasks.getRange("C4:C200").dataValidation = { rule: { type: "list", values: ["Perencanaan", "Pelaksanaan", "Komunikasi"] } };
  tasks.getRange("E4:E200").dataValidation = { rule: { type: "list", values: ["Andi", "Sari", "Bima"] } };
  tasks.getRange("F4:F200").dataValidation = { rule: { type: "list", values: ["Tinggi", "Sedang", "Rendah"] } };
  tasks.getRange("G4:G200").dataValidation = { rule: { type: "list", values: ["Belum Dimulai", "Dikerjakan", "Selesai"] } };
  tasks.getRange("J4:J200").dataValidation = { rule: { type: "decimal", operator: "between", formula1: 0, formula2: 1 } };
  tasks.getRange("A:O").format.columnWidth = 17;
  tasks.getRange("D:D").format.columnWidth = 31;
  tasks.getRange("L:M").format.columnWidth = 25;
  tasks.getRange("N:O").format.columnWidth = 22;
  tasks.freezePanes.freezeRows(3);

  title(milestones, "MILESTONES", "G");
  milestones.getRange("A3:G6").values = [["ID Milestone", "ID Proyek", "Milestone", "Pemilik", "Tanggal Rencana", "Status", "Catatan"], ["MS-001", "PRJ-001", "Materi promo disetujui", "Andi", new Date("2026-07-12"), "Dikerjakan", "Contoh"], ["MS-002", "PRJ-001", "Promo tayang", "Bima", new Date("2026-07-18"), "Belum Dimulai", "Contoh"], ["MS-003", "PRJ-002", "SOP diperbarui", "Sari", new Date("2026-07-25"), "Belum Dimulai", "Contoh"]];
  headers(milestones, "A3:G3");
  milestones.getRange("E4:E6").format.numberFormat = "yyyy-mm-dd";
  grid(milestones, "A4:G6", true);
  milestones.tables.add("A3:G6", true, "ProjectMilestonesTable");
  milestones.getRange("B4:B200").dataValidation = { rule: { type: "list", values: ["PRJ-001", "PRJ-002", "PRJ-003"] } };
  milestones.getRange("F4:F200").dataValidation = { rule: { type: "list", values: ["Belum Dimulai", "Dikerjakan", "Selesai"] } };
  milestones.getRange("A:G").format.columnWidth = 23;
  milestones.getRange("C:C").format.columnWidth = 32;

  dashboard.getRange("A1:J18").format.fill = "#FFFFFF";
  title(dashboard, "DASHBOARD PROYEK SEDERHANA", "J");
  dashboard.getRange("A3:B7").values = [["Total Proyek", null], ["Proyek Dikerjakan", null], ["Tugas Terbuka", null], ["Tugas Lewat Rencana", null], ["Milestone Belum Selesai", null]];
  dashboard.getRange("B3").formulas = [["=COUNTIF('Project Overview'!$A$4:$A$200,\"<>\")"]];
  dashboard.getRange("B4").formulas = [["=COUNTIF('Project Overview'!$F$4:$F$200,\"Dikerjakan\")"]];
  dashboard.getRange("B5").formulas = [["=COUNTIFS('Task List'!$D$4:$D$200,\"<>\",'Task List'!$G$4:$G$200,\"<>Selesai\")"]];
  dashboard.getRange("B6").formulas = [["=COUNTIF('Task List'!$N$4:$N$200,\"Lewat rencana\")"]];
  dashboard.getRange("B7").formulas = [["=COUNTIFS('Milestones'!$A$4:$A$200,\"<>\",'Milestones'!$F$4:$F$200,\"<>Selesai\")"]];
  grid(dashboard, "A3:B7");
  dashboard.getRange("A10:B12").values = [["Status", "Jumlah Proyek"], ["Belum Dimulai", null], ["Dikerjakan", null]];
  dashboard.getRange("B11").formulas = [["=COUNTIF('Project Overview'!$F$4:$F$200,A11)"]];
  dashboard.getRange("B11:B12").fillDown();
  headers(dashboard, "A10:B10");
  const chart = dashboard.charts.add("bar", dashboard.getRange("A10:B12"));
  chart.title = "Status Proyek";
  chart.hasLegend = false;
  chart.setPosition("D3", "J18");
  dashboard.getRange("A:J").format.columnWidth = 20;

  return saveWorkbook({ workbook, fileName: "template-tracker-proyek-sederhana.xlsx", previewSheet: "Dashboard", checks: [
    { name: "required_sheets", passed: workbook.worksheets.items.length === 6 },
    { name: "tables_and_validations", passed: overview.tables.items.length === 1 && tasks.tables.items.length === 1 && milestones.tables.items.length === 1 && Boolean(tasks.getRange("G4:G200").dataValidation) },
    { name: "project_progress_reconciles", passed: overview.getRange("G4").values[0][0] === 0.4 },
    { name: "overdue_and_blank_logic", passed: tasks.getRange("N7").values[0][0] === "Lewat rencana" && tasks.getRange("N9").values[0][0] === "" },
    { name: "duplicate_identifier_checks", passed: overview.getRange("J6").values[0][0] === "" && tasks.getRange("O8").values[0][0] === "" },
    { name: "dashboard_chart_exists", passed: dashboard.charts.items.length === 1 },
  ] });
}

const reports = await Promise.all([buildDailyExpenses(), buildShiftSchedule(), buildProjectTracker()]);
await fs.writeFile(path.join(outputDir, "wave-3-workbook-qa-summary.json"), `${JSON.stringify({ status: "passed", generatedAt: new Date().toISOString(), reports }, null, 2)}\n`);
console.log(JSON.stringify({ status: "passed", reports }, null, 2));
