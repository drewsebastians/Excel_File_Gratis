import { getCollection } from "astro:content";
import { siteConfig } from "../config/site";
import { getPopulatedCategories, getPublishedTemplates, getTemplateUrl } from "../lib/templates";
import { getPublishedResources, getSitemapResourcePaths, type ResourceKind } from "../lib/resources";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const allTemplates = await getCollection("templates");
  const templates = getPublishedTemplates(allTemplates);
  const populatedCategories = getPopulatedCategories(allTemplates);
  const resources = {
    guides: getPublishedResources(await getCollection("guides")),
    formulas: getPublishedResources(await getCollection("formulas")),
    troubleshooting: getPublishedResources(await getCollection("troubleshooting")),
    resourceCollections: getPublishedResources(await getCollection("resourceCollections")),
  } as Record<ResourceKind, never[]>;
  const paths = [
    "/",
    "/templates/",
    "/kategori/",
    "/tentang/",
    "/kontak/",
    "/kebijakan-editorial/",
    "/cara-kami-menguji-template/",
    "/lisensi-template/",
    "/syarat-ketentuan/",
    "/privasi/",
    "/kebijakan-cookie/",
    "/disclaimer/",
    "/sitemap/",
    ...populatedCategories.map((category) => `/kategori/${category.slug}/`),
    ...templates.map(getTemplateUrl),
    ...getSitemapResourcePaths(resources),
  ];
  const urls = paths
    .map((path) => {
      const loc = escapeXml(new URL(path, siteConfig.url).toString());
      return `<url><loc>${loc}</loc></url>`;
    })
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
