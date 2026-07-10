import type { CollectionEntry } from "astro:content";
import { categories, getCategory, siteConfig, type CategorySlug } from "../config/site";
import { templateImages } from "../config/images";

export type TemplateEntry = CollectionEntry<"templates">;
export type SortOption = "newest" | "oldest" | "title-asc" | "title-desc";

export function isPublishedTemplate(entry: TemplateEntry) {
  return entry.data.draft !== true;
}

export function getPublishedTemplates(entries: TemplateEntry[]) {
  return entries.filter(isPublishedTemplate);
}

export function sortTemplates(entries: TemplateEntry[], sort: SortOption = "newest") {
  const collator = new Intl.Collator("id-ID", { sensitivity: "base" });

  return [...entries].sort(
    (a, b) => {
      if (sort === "oldest") return a.data.date.getTime() - b.data.date.getTime();
      if (sort === "title-asc") return collator.compare(a.data.title, b.data.title);
      if (sort === "title-desc") return collator.compare(b.data.title, a.data.title);
      return b.data.date.getTime() - a.data.date.getTime();
    },
  );
}

export function getTemplateUrl(entry: TemplateEntry) {
  return `/templates/${entry.data.category}/${entry.data.slug}/`;
}

export function getCategoryUrl(slug: string) {
  return `/kategori/${slug}/`;
}

export function getDownloadPath(entry: TemplateEntry) {
  const base = siteConfig.downloadBaseUrl.replace(/\/$/, "");
  const fileName = getTemplateFileName(entry);

  if (/^https?:\/\//i.test(fileName) || fileName.startsWith("/")) {
    return fileName;
  }

  return `${base}/${fileName}`;
}

export function getTemplateFileName(entry: TemplateEntry) {
  return entry.data.file_name || `${entry.data.slug}.xlsx`;
}

export function getTemplateFileType(entry: TemplateEntry) {
  const fileNameExtension = getTemplateFileName(entry).match(/\.([A-Za-z0-9]+)$/)?.[1];
  const specFormat = entry.data.file_spec?.format;
  const format = fileNameExtension || specFormat || "xlsx";

  return format.replace(/^\./, "").toLowerCase();
}

export function getTemplateFileBadge(entry: TemplateEntry) {
  return `.${getTemplateFileType(entry)}`;
}

export function getSpreadsheetMimeType(entry: TemplateEntry) {
  return getTemplateFileType(entry) === "xlsm"
    ? "application/vnd.ms-excel.sheet.macroEnabled.12"
    : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
}

export function getTemplateImage(entry: TemplateEntry) {
  if (entry.data.preview_image) {
    return entry.data.preview_image;
  }

  const image = templateImageBySlug[entry.data.slug];
  if (image) return image;

  return templateImages.profitLoss;
}

export function getTemplateImageAlt(entry: TemplateEntry) {
  if (entry.data.preview_alt) {
    return entry.data.preview_alt;
  }

  return "Preview template Excel dengan tabel profesional dan aksen hijau.";
}

export function getPopulatedCategories(entries: TemplateEntry[]) {
  const published = getPublishedTemplates(entries);

  return categories
    .map((category) => {
      const templates = published.filter((entry) => entry.data.category === category.slug);
      return {
        ...category,
        url: getCategoryUrl(category.slug),
        count: templates.length,
        templates: sortTemplates(templates),
        representative: sortTemplates(templates)[0],
      };
    })
    .filter((category) => category.count > 0);
}

export function getTemplatesByCategory(entries: TemplateEntry[], slug: CategorySlug | string) {
  return sortTemplates(
    getPublishedTemplates(entries).filter((entry) => entry.data.category === slug),
  );
}

export function getFeaturedTemplates(entries: TemplateEntry[], limit = 4) {
  const published = getPublishedTemplates(entries);
  const featured = sortTemplates(published.filter((entry) => entry.data.featured));
  return (featured.length > 0 ? featured : sortTemplates(published)).slice(0, limit);
}

export function getRelatedTemplates(
  current: TemplateEntry,
  entries: TemplateEntry[],
  limit = 3,
) {
  const published = getPublishedTemplates(entries).filter(
    (entry) => entry.data.slug !== current.data.slug,
  );
  const bySlug = new Map(published.map((entry) => [entry.data.slug, entry]));
  const selected: TemplateEntry[] = [];

  function add(entry?: TemplateEntry) {
    if (!entry) return;
    if (entry.data.slug === current.data.slug) return;
    if (selected.some((item) => item.data.slug === entry.data.slug)) return;
    if (selected.length < limit) selected.push(entry);
  }

  for (const slug of current.data.related_templates || []) {
    add(bySlug.get(slug));
  }

  for (const entry of sortTemplates(
    published.filter((template) => template.data.category === current.data.category),
  )) {
    add(entry);
  }

  const currentTags = new Set((current.data.tags || []).map((tag) => tag.toLowerCase()));
  const tagMatches = published
    .map((entry) => ({
      entry,
      score: (entry.data.tags || []).filter((tag) => currentTags.has(tag.toLowerCase())).length,
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.entry.data.date.getTime() - a.entry.data.date.getTime());

  for (const item of tagMatches) add(item.entry);
  for (const entry of sortTemplates(published)) add(entry);

  return selected;
}

export function getCategoryName(slug: string) {
  return getCategory(slug)?.name || "Template";
}

const templateImageBySlug: Record<string, string> = {
  "template-budget-bulanan": "/assets/templates/template-budget-bulanan.jpg",
  "template-follow-up-pelanggan-excel": "/assets/templates/template-follow-up-pelanggan-excel.jpg",
  "template-kalender-planner-2026": "/assets/templates/template-kalender-planner-2026.jpg",
  "template-stok-barang-excel-gratis": "/assets/templates/template-stok-barang-excel-gratis.jpg",
};

export function getExcerpt(body = "", maxLength = 140) {
  const firstParagraph =
    body
      .split(/\n{2,}/)
      .find((block) => block.trim() && !block.trim().startsWith("#")) || "";
  const plain = firstParagraph
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .trim();

  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trim()}...`;
}
