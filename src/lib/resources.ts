import { resourceCategories } from "../config/site";

export type ResourceKind = "guides" | "formulas" | "troubleshooting" | "resourceCollections";
export type ArticleResourceKind = Exclude<ResourceKind, "resourceCollections">;
export type ResourceEntry = any;
type RelatedResourceKind = ResourceKind | "templates";

export const resourceKinds: Record<ResourceKind, { hub: string; label: string; singular: string }> = {
  guides: { hub: "panduan", label: "Panduan", singular: "Panduan" },
  formulas: { hub: "rumus-excel", label: "Rumus Excel", singular: "Rumus" },
  troubleshooting: { hub: "masalah-excel", label: "Masalah Excel", singular: "Masalah" },
  resourceCollections: { hub: "koleksi", label: "Koleksi", singular: "Koleksi" },
};

export function isPublishedResource(entry: ResourceEntry) {
  return entry.data.draft !== true;
}

export function getPublishedResources(entries: ResourceEntry[]) {
  return entries.filter(isPublishedResource);
}

export function sortResources(entries: ResourceEntry[]) {
  const collator = new Intl.Collator("id-ID", { sensitivity: "base" });
  return [...entries].sort((a, b) => {
    const updatedA = a.data.updated_date || a.data.date;
    const updatedB = b.data.updated_date || b.data.date;
    return updatedB.getTime() - updatedA.getTime() || collator.compare(a.data.title, b.data.title);
  });
}

export function getResourceHubUrl(kind: ResourceKind) {
  return `/${resourceKinds[kind].hub}/`;
}

export function getResourceUrl(kind: ResourceKind, entry: ResourceEntry) {
  const hub = getResourceHubUrl(kind);
  if (kind === "resourceCollections") return `${hub}${entry.data.slug}/`;
  return `${hub}${entry.data.category}/${entry.data.slug}/`;
}

export function getResourceSummary(entry: ResourceEntry) {
  return entry.data.summary || entry.data.ringkasan_singkat || "Resource Excel yang tersedia di ExcelGratis.";
}

export function getResourceDate(entry: ResourceEntry) {
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

export function getResourceCategories(kind: ArticleResourceKind, entries: ResourceEntry[]) {
  const published = getPublishedResources(entries).filter((entry) => "category" in entry.data);
  const configured = resourceCategories[kind];
  return configured
    .map((category) => ({
      ...category,
      count: published.filter((entry) => entry.data.category === category.slug).length,
    }))
    .filter((category) => category.count > 0);
}

export function getResourceCategoryName(kind: ArticleResourceKind, slug: string) {
  return resourceCategories[kind].find((category) => category.slug === slug)?.name || resourceKinds[kind].singular;
}

export function resourceNavigationAvailable(resources: Record<ResourceKind, ResourceEntry[]>) {
  return (Object.keys(resourceKinds) as ResourceKind[]).filter(
    (kind) => getPublishedResources(resources[kind]).length > 0,
  );
}

export function getRelatedResourceEntries(
  kind: ArticleResourceKind,
  current: ResourceEntry,
  resources: Record<RelatedResourceKind, ResourceEntry[]>,
  limit = 6,
) {
  const result: Array<{ kind: RelatedResourceKind; entry: ResourceEntry }> = [];
  const seen = new Set<string>([`${kind}:${current.data.slug}`]);
  const add = (targetKind: RelatedResourceKind, entry?: ResourceEntry) => {
    if (!entry || !isPublishedResource(entry) || result.length >= limit) return;
    const key = `${targetKind}:${entry.data.slug}`;
    if (seen.has(key)) return;
    seen.add(key);
    result.push({ kind: targetKind, entry });
  };
  const relationMap: Array<[RelatedResourceKind, string[] | undefined]> = [
    ["guides", current.data.related_guides],
    ["formulas", current.data.related_formulas],
    ["troubleshooting", current.data.related_troubleshooting],
    ["templates", current.data.related_templates],
  ];

  for (const [targetKind, slugs] of relationMap) {
    const source = resources[targetKind] || [];
    for (const slug of slugs || []) add(targetKind, source.find((entry) => entry.data.slug === slug));
  }

  const currentTags = new Set((current.data.tags || []).map((tag: string) => tag.toLowerCase()));
  for (const entry of sortResources(getPublishedResources(resources[kind]))) {
    if (entry.data.slug === current.data.slug) continue;
    if (entry.data.category === current.data.category) add(kind, entry);
  }
  for (const entry of sortResources(getPublishedResources(resources[kind]))) {
    if ((entry.data.tags || []).some((tag: string) => currentTags.has(tag.toLowerCase()))) add(kind, entry);
  }
  return result;
}

export function getSitemapResourcePaths(resources: Record<ResourceKind, ResourceEntry[]>) {
  const paths: string[] = [];
  for (const kind of Object.keys(resourceKinds) as ResourceKind[]) {
    const published = getPublishedResources(resources[kind]);
    if (!published.length) continue;
    paths.push(getResourceHubUrl(kind));
    if (kind !== "resourceCollections") {
      for (const category of getResourceCategories(kind, published)) paths.push(`${getResourceHubUrl(kind)}${category.slug}/`);
    }
    for (const entry of published) paths.push(getResourceUrl(kind, entry));
  }
  return paths;
}
