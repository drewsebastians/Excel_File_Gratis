import type { CollectionEntry } from "astro:content";
import { resourceCategories } from "../config/site.ts";
export { isResourceCategory, isValidResourceSlug, resourceSlugPattern } from "./resource-model.ts";

export type ResourceKind = "guides" | "formulas" | "troubleshooting" | "resourceCollections";
export type ArticleResourceKind = Exclude<ResourceKind, "resourceCollections">;
export type RelatedResourceKind = ResourceKind | "templates";

export interface ResourceEntryMap {
  guides: CollectionEntry<"guides">;
  formulas: CollectionEntry<"formulas">;
  troubleshooting: CollectionEntry<"troubleshooting">;
  resourceCollections: CollectionEntry<"resourceCollections">;
}

export interface RelatedResourceEntryMap extends ResourceEntryMap {
  templates: CollectionEntry<"templates">;
}

export type ResourceEntry<K extends ResourceKind = ResourceKind> = ResourceEntryMap[K];
export type ArticleResourceEntry = ResourceEntry<ArticleResourceKind>;
export type ResourceCollectionEntry = ResourceEntry<"resourceCollections">;
export type RelatedResourceEntry<K extends RelatedResourceKind = RelatedResourceKind> =
  RelatedResourceEntryMap[K];
export type ResourceEntries = { [K in ResourceKind]: Array<ResourceEntry<K>> };
export type RelatedResourceEntries = { [K in RelatedResourceKind]: Array<RelatedResourceEntry<K>> };
export type ResolvedRelatedResource = {
  [K in RelatedResourceKind]: { kind: K; entry: RelatedResourceEntry<K> };
}[RelatedResourceKind];

interface ResourceMetadata {
  hub: string;
  label: string;
  singular: string;
}

export const resourceKinds = {
  guides: { hub: "panduan", label: "Panduan", singular: "Panduan" },
  formulas: { hub: "rumus-excel", label: "Rumus Excel", singular: "Rumus" },
  troubleshooting: { hub: "masalah-excel", label: "Masalah Excel", singular: "Masalah" },
  resourceCollections: { hub: "koleksi", label: "Koleksi", singular: "Koleksi" },
} as const satisfies Record<ResourceKind, ResourceMetadata>;

export const resourceKindNames = Object.keys(resourceKinds) as ResourceKind[];
export const articleResourceKinds = resourceKindNames.filter(
  (kind): kind is ArticleResourceKind => kind !== "resourceCollections",
);

export function isPublishedResource<T extends RelatedResourceEntry>(entry: T): boolean {
  return entry.data.draft !== true;
}

export function getPublishedResources<T extends RelatedResourceEntry>(entries: readonly T[]): T[] {
  return entries.filter(isPublishedResource);
}

export function sortResources<T extends RelatedResourceEntry>(entries: readonly T[]): T[] {
  const collator = new Intl.Collator("id-ID", { sensitivity: "base" });
  return [...entries].sort((a, b) => {
    const updatedA = a.data.updated_date || a.data.date;
    const updatedB = b.data.updated_date || b.data.date;
    return updatedB.getTime() - updatedA.getTime() || collator.compare(a.data.title, b.data.title);
  });
}

export function getResourceHubUrl(kind: ResourceKind): string {
  return `/${resourceKinds[kind].hub}/`;
}

export function getResourceUrl<K extends ResourceKind>(kind: K, entry: ResourceEntry<K>): string {
  const hub = getResourceHubUrl(kind);
  if (kind === "resourceCollections") return `${hub}${entry.data.slug}/`;
  const article = entry as ArticleResourceEntry;
  return `${hub}${article.data.category}/${article.data.slug}/`;
}

export function getResourceCardUrl(kind: RelatedResourceKind, entry: RelatedResourceEntry): string {
  switch (kind) {
    case "templates":
      if (entry.collection !== "templates") throw new TypeError("Resource card kind does not match its entry.");
      return `/templates/${entry.data.category}/${entry.data.slug}/`;
    case "guides":
      if (entry.collection !== "guides") throw new TypeError("Resource card kind does not match its entry.");
      return getResourceUrl(kind, entry);
    case "formulas":
      if (entry.collection !== "formulas") throw new TypeError("Resource card kind does not match its entry.");
      return getResourceUrl(kind, entry);
    case "troubleshooting":
      if (entry.collection !== "troubleshooting") throw new TypeError("Resource card kind does not match its entry.");
      return getResourceUrl(kind, entry);
    case "resourceCollections":
      if (entry.collection !== "resourceCollections") throw new TypeError("Resource card kind does not match its entry.");
      return getResourceUrl(kind, entry);
  }
}

export function getResourceSummary(entry: RelatedResourceEntry): string {
  if ("summary" in entry.data && entry.data.summary) return entry.data.summary;
  if ("ringkasan_singkat" in entry.data && entry.data.ringkasan_singkat) return entry.data.ringkasan_singkat;
  return "Resource Excel yang tersedia di ExcelGratis.";
}

export function getResourceDate(entry: RelatedResourceEntry): Date {
  return entry.data.updated_date || entry.data.date;
}

export function getBreadcrumbStructuredData(items: Array<{ label: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: new URL(item.path, "https://excelgratis.my.id").toString(),
    })),
  };
}

export function getResourceCategories(
  kind: ArticleResourceKind,
  entries: readonly ArticleResourceEntry[],
) {
  const published = getPublishedResources(entries);
  return resourceCategories[kind]
    .map((category) => ({
      ...category,
      count: published.filter((entry) => entry.data.category === category.slug).length,
    }))
    .filter((category) => category.count > 0);
}

export function getResourceCategoryName(kind: ArticleResourceKind, slug: string): string {
  return resourceCategories[kind].find((category) => category.slug === slug)?.name || resourceKinds[kind].singular;
}

export function resourceNavigationAvailable(resources: ResourceEntries): ResourceKind[] {
  return resourceKindNames.filter((kind) => getPublishedResources(getResourceEntries(resources, kind)).length > 0);
}

function getResourceEntries(resources: ResourceEntries, kind: ResourceKind): ResourceEntry[] {
  switch (kind) {
    case "guides": return resources.guides;
    case "formulas": return resources.formulas;
    case "troubleshooting": return resources.troubleshooting;
    case "resourceCollections": return resources.resourceCollections;
  }
}

function getArticleEntries(
  resources: ResourceEntries | RelatedResourceEntries,
  kind: ArticleResourceKind,
): ArticleResourceEntry[] {
  switch (kind) {
    case "guides": return resources.guides;
    case "formulas": return resources.formulas;
    case "troubleshooting": return resources.troubleshooting;
  }
}

function findRelatedResource(
  resources: RelatedResourceEntries,
  kind: RelatedResourceKind,
  slug: string,
): ResolvedRelatedResource | undefined {
  switch (kind) {
    case "guides": {
      const entry = resources.guides.find((item) => item.data.slug === slug);
      return entry ? { kind, entry } : undefined;
    }
    case "formulas": {
      const entry = resources.formulas.find((item) => item.data.slug === slug);
      return entry ? { kind, entry } : undefined;
    }
    case "troubleshooting": {
      const entry = resources.troubleshooting.find((item) => item.data.slug === slug);
      return entry ? { kind, entry } : undefined;
    }
    case "resourceCollections": {
      const entry = resources.resourceCollections.find((item) => item.data.slug === slug);
      return entry ? { kind, entry } : undefined;
    }
    case "templates": {
      const entry = resources.templates.find((item) => item.data.slug === slug);
      return entry ? { kind, entry } : undefined;
    }
  }
}

function addResolvedResource(
  result: ResolvedRelatedResource[],
  seen: Set<string>,
  item: ResolvedRelatedResource | undefined,
  limit: number,
): void {
  if (!item || !isPublishedResource(item.entry) || result.length >= limit) return;
  const key = `${item.kind}:${item.entry.data.slug}`;
  if (seen.has(key)) return;
  seen.add(key);
  result.push(item);
}

export function getRelatedResourceEntries(
  kind: ArticleResourceKind,
  current: ArticleResourceEntry,
  resources: RelatedResourceEntries,
  limit = 6,
): ResolvedRelatedResource[] {
  const result: ResolvedRelatedResource[] = [];
  const seen = new Set<string>([`${kind}:${current.data.slug}`]);
  const relationMap: Array<[RelatedResourceKind, readonly string[]]> = [
    ["guides", current.data.related_guides],
    ["formulas", current.data.related_formulas],
    ["troubleshooting", current.data.related_troubleshooting],
    ["templates", current.data.related_templates],
  ];

  for (const [targetKind, slugs] of relationMap) {
    for (const slug of slugs) {
      addResolvedResource(result, seen, findRelatedResource(resources, targetKind, slug), limit);
    }
  }

  const currentTags = new Set(current.data.tags.map((tag) => tag.toLowerCase()));
  const sameKindEntries = sortResources(getPublishedResources(getArticleEntries(resources, kind)));
  for (const entry of sameKindEntries) {
    if (entry.data.slug === current.data.slug || entry.data.category !== current.data.category) continue;
    addResolvedResource(result, seen, findRelatedResource(resources, kind, entry.data.slug), limit);
  }
  for (const entry of sameKindEntries) {
    if (!entry.data.tags.some((tag) => currentTags.has(tag.toLowerCase()))) continue;
    addResolvedResource(result, seen, findRelatedResource(resources, kind, entry.data.slug), limit);
  }
  return result;
}

export function getCollectionResourceEntries(
  current: ResourceCollectionEntry,
  resources: RelatedResourceEntries,
  limit = 24,
): ResolvedRelatedResource[] {
  const result: ResolvedRelatedResource[] = [];
  const seen = new Set<string>();
  const relationMap: Array<[RelatedResourceKind, readonly string[]]> = [
    ["templates", current.data.templates],
    ["guides", current.data.guides],
    ["formulas", current.data.formulas],
    ["troubleshooting", current.data.troubleshooting],
  ];

  for (const [targetKind, slugs] of relationMap) {
    for (const slug of slugs) {
      addResolvedResource(result, seen, findRelatedResource(resources, targetKind, slug), limit);
    }
  }
  return result;
}

export function getSitemapResourcePaths(resources: ResourceEntries): string[] {
  const paths: string[] = [];
  for (const kind of resourceKindNames) {
    const published = getPublishedResources(getResourceEntries(resources, kind));
    if (!published.length) continue;
    paths.push(getResourceHubUrl(kind));
    if (kind !== "resourceCollections") {
      const articleEntries = getPublishedResources(getArticleEntries(resources, kind));
      for (const category of getResourceCategories(kind, articleEntries)) {
        paths.push(`${getResourceHubUrl(kind)}${category.slug}/`);
      }
    }
    for (const entry of published) paths.push(getResourceUrl(kind, entry));
  }
  return paths;
}
