import { resourceCategories } from "../config/site.ts";

export const resourceSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type ResourceCategoryKind = keyof typeof resourceCategories;
export type ResourceCategorySlug<K extends ResourceCategoryKind> =
  (typeof resourceCategories)[K][number]["slug"];

export function isValidResourceSlug(slug: string): boolean {
  return resourceSlugPattern.test(slug);
}

export function isResourceCategory<K extends ResourceCategoryKind>(
  kind: K,
  slug: string,
): slug is ResourceCategorySlug<K> {
  return resourceCategories[kind].some((category) => category.slug === slug);
}
