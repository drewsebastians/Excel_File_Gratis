import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const reportPath = path.join(process.cwd(), "docs", "qa", "browser-smoke-latest.json");
const result = { generatedAt: new Date().toISOString(), status: "blocked_browser_runtime", desktop: "not_run", mobile: "not_run", checks: ["header navigation", "mobile navigation", "category cards", "keyboard focus", "horizontal overflow", "forms", "CMS shell", "custom 404"], notes: "The Codex browser-client runtime could not initialize in this environment (`Cannot redefine property: process`). No browser pass is claimed and no screenshots were captured." };
try {
  await import("playwright");
  result.notes = "Playwright package is available; use the repository browser runner in an environment with a browser binary to execute the listed checks.";
} catch {
  // A browser binary is intentionally not installed as a production dependency.
}
await mkdir(path.dirname(reportPath), { recursive: true });
await writeFile(reportPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify(result, null, 2));
