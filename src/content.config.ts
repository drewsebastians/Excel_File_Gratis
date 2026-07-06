import { defineCollection } from "astro/content/config";
import { z } from "astro/zod";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
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
  const data: Record<string, unknown> = {};

  for (const rawLine of frontmatter.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();
    data[key] = parseFrontmatterValue(rawValue);
  }

  return data;
}

function parseFrontmatterValue(value: string): unknown {
  if (value.startsWith("[") && value.endsWith("]")) {
    return value
      .slice(1, -1)
      .split(",")
      .map((item) => parseFrontmatterValue(item.trim()))
      .filter((item) => item !== "");
  }

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  return value;
}
