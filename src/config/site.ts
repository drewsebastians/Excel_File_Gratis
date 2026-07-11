const env = (import.meta as ImportMeta & { env?: Record<string, string> }).env ?? {};
const defaultSiteUrl = "https://excelgratis.my.id";

export const siteConfig = {
  name: "ExcelGratis",
  url: env.PUBLIC_SITE_URL || defaultSiteUrl,
  description:
    "Download template Excel gratis untuk keuangan pribadi, bisnis UMKM, produktivitas kerja, pendidikan, dan kebutuhan rumah tangga.",
  downloadBaseUrl: env.PUBLIC_DOWNLOAD_BASE_URL || "/downloads",
};

export const categories = [
  {
    name: "Keuangan Pribadi",
    slug: "keuangan-pribadi",
    icon: "account_balance_wallet",
    shortName: "Finance",
    description:
      "Kelola pemasukan, pengeluaran, tabungan, dan rencana keuangan pribadi dengan template Excel gratis.",
  },
  {
    name: "Bisnis & UMKM",
    slug: "bisnis-umkm",
    icon: "storefront",
    shortName: "UMKM",
    description:
      "Template spreadsheet untuk pencatatan bisnis, stok, laporan penjualan, dan administrasi UMKM.",
  },
  {
    name: "Produktivitas Kerja",
    slug: "produktivitas-kerja",
    icon: "checklist",
    shortName: "Produktivitas",
    description:
      "Planner, tracker proyek, jadwal kerja, dan template operasional untuk kerja yang lebih rapi.",
  },
  {
    name: "Pendidikan",
    slug: "pendidikan",
    icon: "school",
    shortName: "Pendidikan",
    description:
      "Template Excel untuk jadwal belajar, rekap nilai, absensi, dan kebutuhan sekolah atau kampus.",
  },
  {
    name: "Rumah Tangga & Acara",
    slug: "rumah-tangga-acara",
    icon: "home",
    shortName: "Rumah",
    description:
      "Template untuk kebutuhan keluarga, acara, inventaris rumah, dan rencana kegiatan harian.",
  },
] as const;

export type CategorySlug = (typeof categories)[number]["slug"];

export const categorySlugs = categories.map((category) => category.slug) as [
  CategorySlug,
  ...CategorySlug[],
];

export const categoryMap = Object.fromEntries(
  categories.map((category) => [category.slug, category]),
) as Record<CategorySlug, (typeof categories)[number]>;

export function getCategory(slug: string) {
  return categoryMap[slug as CategorySlug];
}

export const resourceCategories = {
  guides: [
    { slug: "dasar-excel", name: "Dasar Excel" },
    { slug: "pengolahan-data", name: "Pengolahan Data" },
    { slug: "produktivitas", name: "Produktivitas" },
  ],
  formulas: [
    { slug: "matematika", name: "Matematika" },
    { slug: "teks", name: "Teks" },
    { slug: "logika", name: "Logika" },
    { slug: "tanggal-waktu", name: "Tanggal & Waktu" },
    { slug: "lookup-referensi", name: "Lookup & Referensi" },
  ],
  troubleshooting: [
    { slug: "formula", name: "Formula" },
    { slug: "format-data", name: "Format & Data" },
    { slug: "file-kompatibilitas", name: "File & Kompatibilitas" },
  ],
} as const;

export const guideCategorySlugs = resourceCategories.guides.map((item) => item.slug) as [
  (typeof resourceCategories.guides)[number]["slug"],
  ...(typeof resourceCategories.guides)[number]["slug"][],
];
export const formulaCategorySlugs = resourceCategories.formulas.map((item) => item.slug) as [
  (typeof resourceCategories.formulas)[number]["slug"],
  ...(typeof resourceCategories.formulas)[number]["slug"][],
];
export const troubleshootingCategorySlugs = resourceCategories.troubleshooting.map((item) => item.slug) as [
  (typeof resourceCategories.troubleshooting)[number]["slug"],
  ...(typeof resourceCategories.troubleshooting)[number]["slug"][],
];
