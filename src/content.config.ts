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
    focus_keyword: z.string().optional(),
    preview_alt: z.string().optional(),
    category: z.enum(categorySlugs),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    file_name: z.string(),
    file_size: z.string(),
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
