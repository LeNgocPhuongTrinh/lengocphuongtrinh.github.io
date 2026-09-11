# GitHub Pages deployment

Target: **https://lengocphuongtrinh.github.io/**. Repository: `LeNgocPhuongTrinh/lengocphuongtrinh.github.io`.

## Development and build

Use Node 24 with the committed npm lockfile. `npm ci`, `npm run dev`, and `npm run build`. On PowerShell with script execution disabled, use `npm.cmd`. `npm run preview` serves the exact production output. No secrets or environment variables are needed for the website.

The build runs strict TypeScript, Vite bundling and `scripts/prerender.mjs`. It outputs static HTML for the homepage and every project with a case-study record, a custom 404, and a sitemap. `public/` is copied into `dist/`; original sources in `.docs/_local/`, `scripts/`, and dependencies are not published.

## Pages configuration

The original site used legacy deployment from `main` at `/`. This React/Vite implementation uses the GitHub Actions Pages source. `.github/workflows/deploy.yml` builds on pushes to `main` or a manual dispatch, uploads `dist/`, then deploys with `actions/deploy-pages` using the `github-pages` environment. Workflow permissions are limited to read contents, write Pages, and issue the deployment identity token. Concurrent deployments queue rather than interrupt a running publication.

Source development happens on `redesign/editorial-portfolio`. After validation, fast-forward `main` to the reviewed commit and push normally. No history rewrite is required. Confirm Pages settings use **GitHub Actions** before publishing the new source.

`scripts/github-pages.mjs status` reads Pages status and recent Actions runs using the existing Git Credential Manager sign-in. The script never writes or prints the credential. `enable-workflow` changes Pages to Actions; `dispatch` requests a deployment; `jobs <run-id>` inspects a run. These operations require appropriate repository permissions.

## Paths and routing

Vite `base: '/'` is correct for this user site at the domain root. Assets are rooted at `/images/`, `/fonts/`, and `/assets/`. Project pages are actual directories, so refreshing or directly opening `/projects/think-with-ai/`, `/projects/mrp/`, `/projects/oee-manufacturing/`, and `/projects/fitness-health/` works without server rewrites. GitHub Pages canonicalizes missing trailing slashes. The generated `404.html` provides a usable home link for unknown paths and carries `noindex`.

Ordinary homepage anchors use `/#about`, `/#portfolio`, `/#experience`, `/#learning`, and `/#contact`. No hash router or History API fallback is needed. Pre-rendered content is available before JavaScript; hydration adds menus, accordions, theme selection, video and motion.

If deploying under a repository subpath in future, update base paths throughout assets and routing as well as `vite.config.ts`; changing only the Vite base is insufficient. For a custom domain, configure Pages DNS/CNAME, then update canonical, Open Graph, structured data, robots and sitemap origins together.

## Verification

Require a successful workflow deployment and then request the live homepage, known project URLs, representative assets, sitemap and a nonexistent URL. Confirm the live page contains the new identity/section content, not merely a 200 response from the previous site. Check direct case-study metadata and 404 status.

## Rollback

For a later redesign regression, revert the relevant source commit on `main`, run the build, and push; Actions republishes the previous implementation. For the initial migration back to the legacy site, preserve commit `de46c3bbfb02c40b43305b21821b3a972123f036`, restore its tracked legacy homepage/theme through a normal revert commit, and switch Pages back to deployment from `main` at `/`. Never reset or force-push shared history. The legacy `assets/` and `images/` remain preserved in this repository and are not part of the new Vite public output.
