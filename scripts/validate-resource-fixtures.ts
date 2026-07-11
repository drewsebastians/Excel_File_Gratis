import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import YAML from "yaml";
import {
  getCollectionResourceEntries,
  getRelatedResourceEntries,
  getResourceUrl,
  getSitemapResourcePaths,
  isResourceCategory,
  isValidResourceSlug,
  resourceNavigationAvailable,
  type RelatedResourceEntries,
  type RelatedResourceEntry,
  type RelatedResourceKind,
  type ResourceEntries,
  type ResourceEntry,
  type ResourceKind,
} from "../src/lib/resources.ts";

const marker = "test-fixture-";
const date = new Date("2026-01-01T00:00:00.000Z");

function resourceFixture<K extends ResourceKind>(kind: K, data: ResourceEntry<K>["data"]): ResourceEntry<K> {
  return { id: data.slug, collection: kind, data } as ResourceEntry<K>;
}

function relatedFixture<K extends RelatedResourceKind>(
  kind: K,
  data: RelatedResourceEntry<K>["data"],
): RelatedResourceEntry<K> {
  return { id: data.slug, collection: kind, data } as RelatedResourceEntry<K>;
}

const shared = {
  meta_title: "Fixture teknis",
  meta_description: "Fixture programatik untuk validasi resource dan tidak pernah menjadi konten publik.",
  summary: "Fixture teknis non-publik.",
  date,
  updated_date: undefined,
  tags: ["fixture"],
  featured: false,
  draft: false,
};

const guide = resourceFixture("guides", {
  ...shared,
  title: "Guide fixture",
  slug: `${marker}guide`,
  category: "dasar-excel",
  difficulty: "pemula",
  estimated_time: undefined,
  prerequisites: [],
  excel_versions: [],
  related_guides: [`${marker}guide-circle`, `${marker}missing-guide`],
  related_formulas: [`${marker}formula`, `${marker}formula`, "INVALID TARGET"],
  related_troubleshooting: [`${marker}trouble`, `${marker}draft-trouble`],
  related_templates: [`${marker}template`, `${marker}template`],
});
const circularGuide = resourceFixture("guides", {
  ...shared,
  title: "Circular guide fixture",
  slug: `${marker}guide-circle`,
  category: "dasar-excel",
  difficulty: "menengah",
  estimated_time: undefined,
  prerequisites: [],
  excel_versions: [],
  related_guides: [guide.data.slug],
  related_formulas: [],
  related_troubleshooting: [],
  related_templates: [],
});
const formula = resourceFixture("formulas", {
  ...shared,
  title: "Formula fixture",
  slug: `${marker}formula`,
  category: "logika",
  difficulty: "pemula",
  formula_name: "FIXTURE",
  syntax: "=FIXTURE()",
  excel_versions: [],
  related_guides: [],
  related_formulas: [],
  related_troubleshooting: [],
  related_templates: [],
});
const troubleshooting = resourceFixture("troubleshooting", {
  ...shared,
  title: "Troubleshooting fixture",
  slug: `${marker}trouble`,
  category: "formula",
  symptoms: [],
  excel_versions: [],
  related_guides: [],
  related_formulas: [],
  related_troubleshooting: [],
  related_templates: [],
});
const draftTroubleshooting = resourceFixture("troubleshooting", {
  ...troubleshooting.data,
  title: "Draft troubleshooting fixture",
  slug: `${marker}draft-trouble`,
  draft: true,
});
const template = relatedFixture("templates", {
  title: "Template fixture",
  meta_title: "Template fixture",
  meta_description: "Fixture programatik untuk relasi template.",
  slug: `${marker}template`,
  category: "bisnis-umkm",
  tags: ["fixture"],
  date,
  updated_date: undefined,
  file_name: "fixture.xlsx",
  file_size: "1 KB",
  featured: false,
  draft: false,
  related_templates: [],
  focus_keyword: undefined,
  preview_image: undefined,
  preview_alt: undefined,
  suggested_h1: undefined,
  preview_heading: undefined,
  usage_heading: undefined,
  ringkasan_singkat: "Fixture teknis non-publik.",
  file_spec: undefined,
  batasan: undefined,
  interactive_tool: undefined,
});
const collection = resourceFixture("resourceCollections", {
  title: "Collection fixture",
  meta_title: "Collection fixture",
  meta_description: "Fixture programatik untuk koleksi lintas resource.",
  slug: `${marker}collection`,
  summary: "Fixture teknis non-publik.",
  date,
  updated_date: undefined,
  audience: undefined,
  use_case: undefined,
  featured: false,
  draft: false,
  templates: [template.data.slug, template.data.slug, `${marker}missing-template`],
  guides: [guide.data.slug, guide.data.slug],
  formulas: [formula.data.slug],
  troubleshooting: [draftTroubleshooting.data.slug, troubleshooting.data.slug],
});

const resources: RelatedResourceEntries = {
  guides: [guide, circularGuide],
  formulas: [formula],
  troubleshooting: [troubleshooting, draftTroubleshooting],
  resourceCollections: [collection],
  templates: [template],
};

const related = getRelatedResourceEntries("guides", guide, resources);
const relatedKeys = related.map((item) => `${item.kind}:${item.entry.data.slug}`);
assert.deepEqual(relatedKeys, [
  `guides:${circularGuide.data.slug}`,
  `formulas:${formula.data.slug}`,
  `troubleshooting:${troubleshooting.data.slug}`,
  `templates:${template.data.slug}`,
]);
assert.equal(new Set(relatedKeys).size, relatedKeys.length, "Duplicate relation tidak dideduplikasi.");
assert(!relatedKeys.some((key) => key.includes("missing")), "Missing relation menghasilkan target.");
assert(!relatedKeys.some((key) => key.includes("draft")), "Draft relation menghasilkan target.");
assert(!relatedKeys.includes(`guides:${guide.data.slug}`), "Circular relation kembali ke resource awal.");

const collectionRelated = getCollectionResourceEntries(collection, resources);
const collectionKeys = collectionRelated.map((item) => `${item.kind}:${item.entry.data.slug}`);
assert.equal(new Set(collectionKeys).size, collectionKeys.length, "Duplicate collection relation tidak dideduplikasi.");
assert(!collectionKeys.some((key) => key.includes("missing") || key.includes("draft")));

const isolatedGuide = resourceFixture("guides", {
  ...guide.data,
  title: "Isolated guide fixture",
  slug: `${marker}isolated-guide`,
  category: "produktivitas",
  tags: ["isolated"],
  related_guides: [],
  related_formulas: [],
  related_troubleshooting: [],
  related_templates: [],
});
const isolatedResources: RelatedResourceEntries = {
  guides: [isolatedGuide],
  formulas: [formula],
  troubleshooting: [],
  resourceCollections: [],
  templates: [template],
};
assert.deepEqual(getRelatedResourceEntries("guides", isolatedGuide, isolatedResources), []);

assert(isResourceCategory("guides", "dasar-excel"));
assert(!isResourceCategory("guides", "kategori-tidak-valid"));
assert(isValidResourceSlug("slug-valid-123"));
assert(!isValidResourceSlug("Slug Tidak Valid"));
assert(!isValidResourceSlug("slug--rusak"));
assert.equal(getResourceUrl("guides", guide), `/panduan/dasar-excel/${guide.data.slug}/`);
assert.equal(getResourceUrl("resourceCollections", collection), `/koleksi/${collection.data.slug}/`);

const productionResources: ResourceEntries = {
  guides: [guide, circularGuide],
  formulas: [formula],
  troubleshooting: [draftTroubleshooting],
  resourceCollections: [collection],
};
assert.deepEqual(resourceNavigationAvailable(productionResources), ["guides", "formulas", "resourceCollections"]);
assert.deepEqual(resourceNavigationAvailable({ guides: [], formulas: [], troubleshooting: [], resourceCollections: [] }), []);
const sitemapPaths = getSitemapResourcePaths(productionResources);
assert(sitemapPaths.includes("/panduan/") && sitemapPaths.includes(`/panduan/dasar-excel/${guide.data.slug}/`));
assert(sitemapPaths.includes("/rumus-excel/") && sitemapPaths.includes(`/koleksi/${collection.data.slug}/`));
assert(!sitemapPaths.includes("/masalah-excel/"));
assert(!sitemapPaths.some((path) => path.includes(draftTroubleshooting.data.slug)));

const root = process.cwd();
const collectFiles = (directory: string): string[] => {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? collectFiles(path) : [path];
  });
};
for (const directory of ["guides", "formulas", "troubleshooting", "collections"]) {
  for (const file of collectFiles(join(root, "src", "content", directory))) {
    assert(!readFileSync(file, "utf8").includes(marker), `Fixture marker masuk production content: ${file}`);
  }
}
for (const file of collectFiles(join(root, "dist"))) {
  if (!/\.(?:html|xml)$/.test(file)) continue;
  assert(!readFileSync(file, "utf8").includes(marker), `Fixture marker masuk build: ${file}`);
}

const cms = YAML.parse(readFileSync(join(root, "public", "admin", "config.yml"), "utf8"));
assert.equal(cms.backend.branch, "main");
assert.equal(cms.publish_mode, "editorial_workflow");
const cmsCollections = new Map<string, { fields: Array<Record<string, unknown>> }>(
  cms.collections.map((item: { name: string; fields: Array<Record<string, unknown>> }) => [item.name, item]),
);
const expectedCmsFields: Record<string, string[]> = {
  guides: ["title", "meta_title", "meta_description", "slug", "summary", "date", "updated_date", "category", "difficulty", "estimated_time", "prerequisites", "excel_versions", "tags", "featured", "draft", "related_templates", "related_guides", "related_formulas", "related_troubleshooting"],
  formulas: ["title", "formula_name", "meta_title", "meta_description", "slug", "summary", "syntax", "date", "updated_date", "category", "difficulty", "excel_versions", "tags", "featured", "draft", "related_templates", "related_guides", "related_formulas", "related_troubleshooting"],
  troubleshooting: ["title", "meta_title", "meta_description", "slug", "summary", "date", "updated_date", "category", "symptoms", "excel_versions", "tags", "featured", "draft", "related_templates", "related_guides", "related_formulas", "related_troubleshooting"],
  resource_collections: ["title", "meta_title", "meta_description", "slug", "summary", "date", "updated_date", "audience", "use_case", "featured", "draft", "templates", "guides", "formulas", "troubleshooting"],
};
for (const [collectionName, expectedFields] of Object.entries(expectedCmsFields)) {
  const cmsCollection = cmsCollections.get(collectionName);
  assert(cmsCollection, `CMS collection tidak ditemukan: ${collectionName}`);
  const fieldNames = new Set(cmsCollection.fields.map((field) => field.name));
  for (const field of expectedFields) assert(fieldNames.has(field), `CMS field tidak sinkron: ${collectionName}.${field}`);
}
for (const collectionName of ["guides", "formulas", "troubleshooting"]) {
  const relationTargets = Object.fromEntries(
    cmsCollections.get(collectionName)!.fields
      .filter((field) => field.widget === "relation")
      .map((field) => [field.name, field.collection]),
  );
  assert.deepEqual(relationTargets, {
    related_templates: "templates",
    related_guides: "guides",
    related_formulas: "formulas",
    related_troubleshooting: "troubleshooting",
  });
}
assert(!readFileSync(join(root, "public", "admin", "config.yml"), "utf8").includes(marker));

const resourceSource = readFileSync(join(root, "src", "lib", "resources.ts"), "utf8");
assert(!/\bany\b/.test(resourceSource), "Public resource helper masih mengekspos any.");
for (const route of [
  join(root, "src", "pages", "[hub]", "[category]", "[slug].astro"),
  join(root, "src", "pages", "[hub]", "[slug].astro"),
]) {
  const source = readFileSync(route, "utf8");
  assert(!/\bas any\b|\bas never\b/.test(source), `Unsafe resource route cast ditemukan: ${route}`);
}

console.log("Resource fixture validation passed. Typed relations, routes, navigation, sitemap, and isolation verified.");
