import { defineCollection } from "astro/content/config";
import { z } from "astro/zod";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { parse as parseYaml } from "yaml";
import { categorySlugs } from "./config/site";

const templates = defineCollection({
  loader: {
    name: "excelgratis-markdown-loader",
    async load(context) {
      const base = path.join(process.cwd(), "src", "content", "templates");
      context.store.clear();
      const files = await readdir(base);

      for (const file of files.filter((name) => name.endsWith(".md"))) {
        const absoluteFilePath = path.join(base, file);
        const filePath = path.relative(process.cwd(), absoluteFilePath).replace(/\\/g, "/");
        const source = await readFile(absoluteFilePath, "utf8");
        const { data, body } = parseMarkdownFile(source);
        const id = file.replace(/\.md$/, "");
        const parsedData = await context.parseData({ id, data, filePath });
        const rendered = await context.renderMarkdown(body, {
          fileURL: pathToFileURL(absoluteFilePath),
        });

        context.store.set({
          id,
          data: parsedData,
          filePath,
          body,
          rendered,
          digest: context.generateDigest(source),
        });
      }
    },
  },
  schema: z.object({
    title: z.string(),
    meta_title: z.string(),
    meta_description: z.string().max(170),
    slug: z.string(),
    category: z.enum(categorySlugs),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    file_name: z.string(),
    file_size: z.string(),
    suggested_h1: z.string().optional(),
    ringkasan_singkat: z.string().optional(),
    file_spec: z
      .object({
        sheets: z.coerce.number(),
        has_macro: z.coerce.boolean(),
        format: z.string(),
        kompatibilitas: z.string(),
      })
      .optional(),
    batasan: z.union([z.string(), z.array(z.string())]).optional(),
    interactive_tool: z
      .object({
        type: z.enum(["chart", "calculator"]),
        title: z.string(),
        config: z.record(z.string(), z.unknown()).optional().default({}),
      })
      .optional(),
  }),
});

export const collections = { templates };

function parseMarkdownFile(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: source };
  }

  return {
    data: parseFrontmatter(match[1]),
    body: match[2].trim(),
  };
}

function parseFrontmatter(frontmatter: string) {
  const parsed = parseYaml(frontmatter);
  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? (parsed as Record<string, unknown>)
    : {};
}
