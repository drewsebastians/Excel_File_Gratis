import { siteConfig } from "../config/site";

export function GET() {
  const sitemapUrl = new URL("/sitemap.xml", siteConfig.url).toString();
  return new Response(`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: ${sitemapUrl}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
