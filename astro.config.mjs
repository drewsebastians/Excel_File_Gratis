import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL || "https://excelgratis.my.id";

export default defineConfig({
  site,
  output: "static",
  integrations: [],
});
