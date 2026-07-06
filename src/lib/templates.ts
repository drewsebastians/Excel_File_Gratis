import type { CollectionEntry } from "astro:content";
import { siteConfig } from "../config/site";
import { templateImages, imageAlt } from "../config/images";

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
  return `${base}/${entry.data.slug}.xlsx`;
}

export function getTemplateImage(entry: TemplateEntry) {
  if (entry.data.slug === "template-anggaran-bulanan-gratis") {
    return templateImages.budgetHero;
  }
  return templateImages.profitLoss;
}

export function getTemplateImageAlt(entry: TemplateEntry) {
  if (entry.data.slug === "template-anggaran-bulanan-gratis") {
    return imageAlt.budgetHero;
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
