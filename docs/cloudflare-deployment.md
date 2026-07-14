# Cloudflare Production Deployment

## Purpose and boundary

Production deployment is performed only by `.github/workflows/deploy.yml`. The validation workflow in `.github/workflows/ci.yml` never deploys and never receives production secrets.

## Trigger and concurrency

The deployment workflow runs on a push to `main` and may also be started manually from GitHub Actions. It does not run for pull requests or feature branches. The `production-cloudflare` concurrency group allows one production deployment at a time and cancels an obsolete in-progress deployment when a newer `main` commit arrives.

## Required secret and minimum access

Create one repository Actions secret named `CLOUDFLARE_API_TOKEN`. Never commit, paste into a pull request, or place the token in a local tracked file.

For this Worker and custom domain, scope the token to the owning Cloudflare account and the `excelgratis.my.id` zone. The normal minimum permissions are:

- `Account > Workers Scripts > Edit`
- `Zone > Workers Routes > Edit`

Cloudflare may require an additional read permission for account selection in some account configurations. Add no permission unless the Cloudflare error identifies it as necessary.

## Validation and deploy sequence

The workflow uses Node `22.12.0`, pnpm `10.11.1`, read-only GitHub permissions, and a 15-minute job timeout. Its command order is:

```text
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm run validate
pnpm run deploy
```

Wrangler also runs the `build.command` declared in `wrangler.jsonc` during `pnpm run deploy`. That duplicate build is retained intentionally: it preserves the existing local `pnpm run deploy` behavior and avoids relying on workflow-only output. The site build must remain deterministic.

## How to verify a deployment

1. In GitHub Actions, open the `Deploy to Cloudflare Workers` run for the target `main` commit.
2. Confirm every step succeeded, especially `Run Astro check`, `Build project`, `Validate project`, and `Deploy`.
3. In the Deploy log, record the Worker name, custom domain, and `Current Version ID`. The run's `head SHA` identifies the source commit deployed.
4. Run the immediate public smoke tests in `docs/production-smoke-checklist.md`. At minimum verify the homepage, `/kategori/`, a published template page and download, `/sitemap.xml`, and `/robots.txt` return the expected public content.

CI success is not deployment evidence. A green production deployment run plus public HTTP checks is required.

## Rollback

For an urgent production regression, use Cloudflare Dashboard > Workers & Pages > `excelfilegratis` > Deployments to roll back to the most recent verified version. Then create and merge a GitHub revert of the offending `main` commit so the repository and deployed version do not drift. Record the rollback run, affected commit SHA, restored Cloudflare version ID, and smoke-test result in the release note or project status.
