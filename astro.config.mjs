import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site =
  process.env.PUBLIC_SITE_URL ||
  process.env.CF_PAGES_URL ||
  "https://excelfilegratis.andrew-sebastian91.workers.dev";

export default defineConfig({
  site,
  output: "static",
  integrations: [sitemap()],
});
