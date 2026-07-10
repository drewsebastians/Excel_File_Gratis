import { defineCollection } from "astro/content/config";
import { z } from "astro/zod";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  categorySlugs,
  formulaCategorySlugs,
  guideCategorySlugs,
  troubleshootingCategorySlugs,
} from "./config/site";

function markdownLoader(directory: string, emptyDraft?: Record<string, unknown>) {
  return {
    name: `excelgratis-markdown-loader-${directory}`,
    async load(context: any) {
      const base = path.join(process.cwd(), "src", "content", directory);
      context.store.clear();
      const files = await readdir(base).catch(() => [] as string[]);

      for (const file of files.filter((name) => name.endsWith(".md"))) {
        const absoluteFilePath = path.join(base, file);
        const filePath = path.relative(process.cwd(), absoluteFilePath).replace(/\\/g, "/");
        const source = await readFile(absoluteFilePath, "utf8");
        const { data, body } = parseMarkdownFile(source);
        const id = file.replace(/\.md$/, "");
        const parsedData = await context.parseData({ id, data, filePath });
        const rendered = await context.renderMarkdown(body, { fileURL: pathToFileURL(absoluteFilePath) });

        context.store.set({ id, data: parsedData, filePath, body, rendered, digest: context.generateDigest(source) });
      }

      if (files.length === 0 && emptyDraft) {
        const id = "__internal_empty__";
        const filePath = `src/content/${directory}/.internal-empty.md`;
        const parsedData = await context.parseData({ id, data: emptyDraft, filePath });
        const rendered = await context.renderMarkdown("", { fileURL: pathToFileURL(base) });
        context.store.set({ id, data: parsedData, filePath, body: "", rendered, digest: context.generateDigest(directory) });
      }
    },
  };
}

const templates = defineCollection({
  loader: markdownLoader("templates"),
  schema: z.object({
    title: z.string(),
    meta_title: z.string(),
    meta_description: z.string().max(170),
    slug: z.string(),
    focus_keyword: z.string().optional(),
    preview_image: z.string().optional(),
    preview_alt: z.string().optional(),
    featured: z.coerce.boolean().optional().default(false),
    category: z.enum(categorySlugs),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    updated_date: z.coerce.date().optional(),
    file_name: z.string(),
    file_size: z.string(),
    draft: z.coerce.boolean().optional().default(false),
    related_templates: z.array(z.string()).optional().default([]),
    suggested_h1: z.string().optional(),
    preview_heading: z.string().optional(),
    usage_heading: z.string().optional(),
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

const sitePages = defineCollection({
  loader: markdownLoader("site-pages"),
  schema: z.object({
    title: z.string(),
    meta_title: z.string(),
    meta_description: z.string().max(170),
    updated_date: z.coerce.date(),
    summary: z.string().optional(),
  }),
});

const commonResourceFields = {
  title: z.string(),
  meta_title: z.string(),
  meta_description: z.string().max(170),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string(),
  date: z.coerce.date(),
  updated_date: z.coerce.date().optional(),
  tags: z.array(z.string()).optional().default([]),
  featured: z.coerce.boolean().optional().default(false),
  draft: z.coerce.boolean().optional().default(false),
  related_templates: z.array(z.string()).optional().default([]),
  related_guides: z.array(z.string()).optional().default([]),
  related_formulas: z.array(z.string()).optional().default([]),
  related_troubleshooting: z.array(z.string()).optional().default([]),
};

const guides = defineCollection({
  loader: markdownLoader("guides", {
    title: "Internal empty guide", meta_title: "Internal empty guide", meta_description: "Internal draft.",
    slug: "internal-empty-guide", summary: "Internal draft.", date: "2026-01-01", category: "dasar-excel", difficulty: "pemula", draft: true,
  }),
  schema: z.object({
    ...commonResourceFields,
    category: z.enum(guideCategorySlugs),
    difficulty: z.enum(["pemula", "menengah", "lanjutan"]),
    estimated_time: z.string().optional(),
    prerequisites: z.array(z.string()).optional().default([]),
    excel_versions: z.array(z.string()).optional().default([]),
  }),
});

const formulas = defineCollection({
  loader: markdownLoader("formulas", {
    title: "Internal empty formula", formula_name: "INTERNAL", meta_title: "Internal empty formula", meta_description: "Internal draft.",
    slug: "internal-empty-formula", summary: "Internal draft.", syntax: "=INTERNAL()", date: "2026-01-01", category: "logika", difficulty: "pemula", draft: true,
  }),
  schema: z.object({
    ...commonResourceFields,
    category: z.enum(formulaCategorySlugs),
    formula_name: z.string(),
    syntax: z.string(),
    difficulty: z.enum(["pemula", "menengah", "lanjutan"]),
    excel_versions: z.array(z.string()).optional().default([]),
  }),
});

const troubleshooting = defineCollection({
  loader: markdownLoader("troubleshooting", {
    title: "Internal empty troubleshooting", meta_title: "Internal empty troubleshooting", meta_description: "Internal draft.",
    slug: "internal-empty-troubleshooting", summary: "Internal draft.", date: "2026-01-01", category: "formula", draft: true,
  }),
  schema: z.object({
    ...commonResourceFields,
    category: z.enum(troubleshootingCategorySlugs),
    symptoms: z.array(z.string()).optional().default([]),
    excel_versions: z.array(z.string()).optional().default([]),
  }),
});

const resourceCollections = defineCollection({
  loader: markdownLoader("collections", {
    title: "Internal empty collection", meta_title: "Internal empty collection", meta_description: "Internal draft.",
    slug: "internal-empty-collection", summary: "Internal draft.", date: "2026-01-01", draft: true,
  }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string(),
    meta_description: z.string().max(170),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    summary: z.string(),
    date: z.coerce.date(),
    updated_date: z.coerce.date().optional(),
    audience: z.string().optional(),
    use_case: z.string().optional(),
    featured: z.coerce.boolean().optional().default(false),
    draft: z.coerce.boolean().optional().default(false),
    templates: z.array(z.string()).optional().default([]),
    guides: z.array(z.string()).optional().default([]),
    formulas: z.array(z.string()).optional().default([]),
    troubleshooting: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { templates, sitePages, guides, formulas, troubleshooting, resourceCollections };

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
  const lines = frontmatter
    .replace(/\r\n/g, "\n")
    .split("\n")
    .filter((line) => line.trim() && !line.trim().startsWith("#"));
  const [parsed] = parseYamlMap(lines, 0, 0);

  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? parsed
    : {};
}

function parseYamlMap(
  lines: string[],
  startIndex: number,
  indent: number,
): [Record<string, unknown>, number] {
  const output: Record<string, unknown> = {};
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];
    const lineIndent = countIndent(line);
    const trimmed = line.trim();

    if (lineIndent < indent || trimmed.startsWith("- ")) break;
    if (lineIndent > indent) {
      index += 1;
      continue;
    }

    const separatorIndex = trimmed.indexOf(":");
    if (separatorIndex === -1) {
      index += 1;
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    let rawValue = trimmed.slice(separatorIndex + 1).trim();

    if (rawValue.startsWith("{") && !rawValue.endsWith("}")) {
      const jsonLines = [rawValue];
      let depth = braceDepth(rawValue);
      index += 1;

      while (index < lines.length && depth > 0) {
        const nextLine = lines[index].trim();
        jsonLines.push(nextLine);
        depth += braceDepth(nextLine);
        index += 1;
      }

      output[key] = parseYamlScalar(jsonLines.join("\n"));
      continue;
    }

    if (!rawValue) {
      const nextIndent = getNextIndent(lines, index + 1, indent + 2);
      const [nested, nextIndex] = parseYamlNode(lines, index + 1, nextIndent);
      output[key] = nested;
      index = nextIndex;
      continue;
    }

    output[key] = parseYamlScalar(rawValue);
    index += 1;
  }

  return [output, index];
}

function parseYamlNode(
  lines: string[],
  startIndex: number,
  indent: number,
): [unknown, number] {
  const firstLine = lines[startIndex];
  if (!firstLine) return [{}, startIndex];

  if (countIndent(firstLine) === indent && firstLine.trim().startsWith("- ")) {
    return parseYamlList(lines, startIndex, indent);
  }

  return parseYamlMap(lines, startIndex, indent);
}

function parseYamlList(
  lines: string[],
  startIndex: number,
  indent: number,
): [unknown[], number] {
  const output: unknown[] = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];
    const lineIndent = countIndent(line);
    const trimmed = line.trim();

    if (lineIndent !== indent || !trimmed.startsWith("- ")) break;

    const itemValue = trimmed.slice(2).trim();
    if (!itemValue) {
      const nextIndent = getNextIndent(lines, index + 1, indent + 2);
      const [nested, nextIndex] = parseYamlNode(lines, index + 1, nextIndent);
      output.push(nested);
      index = nextIndex;
      continue;
    }

    const separatorIndex = itemValue.indexOf(":");
    if (separatorIndex > 0) {
      const item: Record<string, unknown> = {};
      const key = itemValue.slice(0, separatorIndex).trim();
      const rawValue = itemValue.slice(separatorIndex + 1).trim();
      item[key] = rawValue ? parseYamlScalar(rawValue) : {};

      const [rest, nextIndex] = parseYamlMap(lines, index + 1, indent + 2);
      output.push({ ...item, ...rest });
      index = nextIndex;
      continue;
    }

    output.push(parseYamlScalar(itemValue));
    index += 1;
  }

  return [output, index];
}

function parseYamlScalar(value: string) {
  const trimmed = value.trim().replace(/,$/, "");

  if (
    (trimmed.startsWith("\"") && trimmed.endsWith("\"")) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).replace(/\\n/g, "\n").replace(/\\"/g, "\"");
  }

  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    return parseInlineCollection(trimmed);
  }

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed);

  return trimmed;
}

function countIndent(line: string) {
  return line.length - line.trimStart().length;
}

function getNextIndent(lines: string[], index: number, fallback: number) {
  const nextLine = lines[index];
  return nextLine ? countIndent(nextLine) : fallback;
}

function braceDepth(value: string) {
  return (value.match(/{/g)?.length || 0) - (value.match(/}/g)?.length || 0);
}

function parseInlineCollection(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return JSON.parse(
      value.replace(/([{,]\s*)([A-Za-z_][\w-]*)\s*:/g, '$1"$2":'),
    );
  }
}
