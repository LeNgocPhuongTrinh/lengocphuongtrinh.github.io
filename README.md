# Trinh Le — AI × Data × Business

An editorial personal portfolio for **Trinh Le / Lê Ngọc Phương Trinh**, built from the approved A → B → D → C → E compositions.

**Live:** https://lengocphuongtrinh.github.io/

## Local development

Requires Node.js 24 and npm. No environment variables, API keys, or backend.

```sh
npm ci
npm run dev
```

On Windows with PowerShell script execution disabled, use `npm.cmd`.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local Vite development server |
| `npm run typecheck` | Strict TypeScript checks |
| `npm run build` | Production bundle, static HTML pages, sitemap and 404 |
| `npm run preview` | Serve the production output |
| `npm test` | Desktop, tablet and mobile browser checks; requires Edge |
| `npm run images:prepare` | Regenerate mapped WebP images and `src/data/images.ts` from local originals |

Tests expect the development server at `http://127.0.0.1:5173`. Override the test base URL in `playwright.config.ts` when checking a production preview.

## Stack and structure

React, TypeScript, Vite, CSS Modules, self-hosted fonts, GSAP and ScrollTrigger. React renders pre-built HTML at each public route and hydrates it for interactions.

- `src/data/`: editable factual content, links and project narratives
- `src/sections/`: the portfolio story, in its approved sequence
- `src/components/`: shared navigation, accordion, portrait and project components
- `src/pages/`: case studies and the 404 page
- `src/styles/`: visual tokens, global foundations and editorial layouts
- `scripts/`: pre-rendering, asset preparation and deployment helpers
- `public/`: optimized images, fonts and static files
- `.github/workflows/deploy.yml`: GitHub Pages build and deployment

## Documentation

Documentation in `.docs/` is local-only and excluded from Git. The links below work in a local checkout that has these files; a fresh clone does not include them.

Read the [codebase guide](.docs/codebase-guide.md) before modifying the project.

To replace a photo or logo, follow the [image maintenance guide](.docs/image-maintenance.md). It explains the local source mapping, Sharp conversion, generated files and publication steps.

[Design system](.docs/design-system.md) · [Motion system](.docs/motion-system.md) · [Content model](.docs/content-model.md) · [Deployment](.docs/deployment.md) · [Engineering rules](.docs/clean-coding-rules.md) · [Decisions](.docs/adr/)

## Build and deploy

Run `npm run build`. GitHub Actions publishes `dist/` when the validated source reaches `main`. Pages must use **GitHub Actions** as its deployment source. See the deployment guide for verification and rollback.

Original reference files in `.docs/_local/` and QA artifacts in `.qa/` are intentionally untracked. Production assets are committed, so cloning and building does not require the private source folder.
