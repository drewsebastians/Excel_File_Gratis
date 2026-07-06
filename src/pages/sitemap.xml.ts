import { getCollection } from "astro:content";
import { categories, siteConfig } from "../config/site";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const templates = await getCollection("templates");
  const paths = [
    "/",
    "/tentang/",
    "/privasi/",
    "/disclaimer/",
    "/kontak/",
    ...categories.map((category) => `/kategori/${category.slug}/`),
    ...templates.map((entry) => `/templates/${entry.data.category}/${entry.data.slug}/`),
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
