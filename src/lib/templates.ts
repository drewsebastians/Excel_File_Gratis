import type { CollectionEntry } from "astro:content";
import { siteConfig } from "../config/site";
import { templateImages } from "../config/images";

export type TemplateEntry = CollectionEntry<"templates">;

export function sortTemplates(entries: TemplateEntry[]) {
  return [...entries].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

export function getTemplateUrl(entry: TemplateEntry) {
  return `/templates/${entry.data.category}/${entry.data.slug}/`;
}

export function getDownloadPath(entry: TemplateEntry) {
  const base = siteConfig.downloadBaseUrl.replace(/\/$/, "");
  return `${base}/${getTemplateFileName(entry)}`;
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
  return templateImages.profitLoss;
}

export function getTemplateImageAlt(entry: TemplateEntry) {
  if (entry.data.preview_alt) {
    return entry.data.preview_alt;
  }

  return "Preview template Excel dengan tabel profesional dan aksen hijau.";
}

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
