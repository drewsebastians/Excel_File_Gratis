import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import YAML from "yaml";

const workflowPath = resolve(".github/workflows/deploy.yml");
const document = YAML.parseDocument(readFileSync(workflowPath, "utf8"));

if (document.errors.length > 0) {
  throw new Error(`Invalid YAML in ${workflowPath}: ${document.errors.map((error) => error.message).join("; ")}`);
}

const workflow = document.toJS();

function assert(condition, message) {
  if (!condition) throw new Error(`Deployment workflow validation failed: ${message}`);
}

function stepIndex(steps, command) {
  return steps.findIndex((step) => step.run === command);
}

assert(workflow?.name === "Deploy to Cloudflare Workers", "workflow name must identify the production deployment");
assert(workflow.on?.workflow_dispatch !== undefined, "workflow_dispatch must remain enabled");
assert(workflow.on?.pull_request === undefined, "deployment must not run for pull requests");
assert(Array.isArray(workflow.on?.push?.branches), "push triggers must declare explicit branches");
assert(
  workflow.on.push.branches.length === 1 && workflow.on.push.branches[0] === "main",
  "deployment push trigger must be limited to main",
);
assert(
  Object.keys(workflow.permissions ?? {}).length === 1 && workflow.permissions?.contents === "read",
  "workflow permissions must remain limited to contents: read",
);
assert(workflow.concurrency?.group === "production-cloudflare", "production concurrency group must be stable");
assert(workflow.concurrency?.["cancel-in-progress"] === true, "obsolete production deployments must be cancelled");

const deploy = workflow.jobs?.deploy;
assert(deploy?.["timeout-minutes"] === 15, "deployment job must have a 15-minute timeout");
const steps = deploy?.steps;
assert(Array.isArray(steps), "deployment job must define steps");

const orderedCommands = [
  "pnpm install --frozen-lockfile",
  "pnpm run check",
  "pnpm run build",
  "pnpm run validate",
  "pnpm run deploy",
];
const indexes = orderedCommands.map((command) => stepIndex(steps, command));
assert(indexes.every((index) => index >= 0), "install, check, build, validate, and deploy commands must all be present");
assert(indexes.every((index, position) => position === 0 || indexes[position - 1] < index), "commands must run in the required order");

const tokenSteps = steps.filter((step) => step.env?.CLOUDFLARE_API_TOKEN !== undefined);
assert(tokenSteps.length === 1, "Cloudflare token must be used by exactly one step");
assert(
  tokenSteps[0].env.CLOUDFLARE_API_TOKEN === "${{ secrets.CLOUDFLARE_API_TOKEN }}",
  "Cloudflare token must be read only from GitHub Secrets",
);
assert(tokenSteps[0].run === "pnpm run deploy", "Cloudflare token must be scoped to the deploy command");

console.log("Deployment workflow validation passed.");
