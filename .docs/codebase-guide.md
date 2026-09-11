# Read this before modifying the codebase

## Architecture and mental model

This is a static, public portfolio. Data files describe the person and work; section components compose the editorial narrative; shared components own real reuse. Vite compiles the browser app. `scripts/prerender.mjs` renders the same React tree to HTML for every published route, then the browser hydrates it. There is no backend, authentication, analytics collection, global store, or persistent visitor data.

The homepage sequence is invariant: **Hero → Marquee → About → Career → Statistics → Capabilities → Exploring → Portfolio → Experience → Education → Growth → Contact → Footer**. This implements **A → B → D → C → E**.

## Current folder tree

```text
.github/workflows/deploy.yml
.docs/
  adr/
  codebase-guide.md  design-system.md  motion-system.md
  content-model.md   deployment.md     clean-coding-rules.md
  _local/ (untracked original sources)
public/
  images/  fonts/  favicon.svg  robots.txt  .nojekyll
scripts/
  prerender.mjs  prepare-assets.mjs  download-fonts.mjs
  inspect-project-pdfs.py  github-pages.mjs
src/
  App.tsx  main.tsx
  components/
    Navigation.tsx  Footer.tsx  SocialLinks.tsx  SectionLabel.tsx
    Accordion.tsx  Portrait.tsx  ProjectCard.tsx  ProjectPreview.tsx
  data/
    profile.ts  links.ts  career.ts  stats.ts  capabilities.ts
    exploration.ts  projects.ts  experience.ts  education.ts  growth.ts
  hooks/useEditorialMotion.ts
  pages/CaseStudy.tsx  NotFound.tsx
  sections/
    Hero.tsx  Marquee.tsx  About.tsx  Capabilities.tsx  Exploring.tsx
    Portfolio.tsx  Experience.tsx  Education.tsx  Growth.tsx  Contact.tsx
  styles/tokens.css  global.css  Portfolio.module.css
tests/portfolio.spec.ts
index.html  package.json  package-lock.json  tsconfig.json
vite.config.ts  playwright.config.ts
```

## Important responsibilities

`App.tsx` selects the homepage, a known project, or the 404 page. It is the sole owner of page sequence. `main.tsx` hydrates static HTML, falling back to client rendering in development. `Navigation` owns mobile disclosure, active-section observation, and the thin progress line. `Accordion` owns one open row, ARIA relationships, and inert closed panels. `ProjectPreview` downloads video only after the visitor requests it. `Portrait` renders responsive decorative photographs; the meaningful hero photo has descriptive alternative text. `Footer` closes the identity loop.

`About` composes the career progression and supported statistics. `Capabilities` and `Experience` adapt data to the shared accordion. `Exploring` owns the selected conceptual direction. Other sections compose data without hidden application logic.

## Data and content flow

`src/data/* → sections/pages → shared components → semantic HTML`. Data never imports a presentation component. UI state stays local. No factual content is fetched at runtime. Content updates must retain provenance and must not promote reference-image placeholders into claims.

## Styling

`tokens.css` owns recurring colors, typography, spacing, borders, motion durations, and layers. `global.css` owns self-hosted font declarations, reset, focus, selection and reduced-motion defaults. `Portfolio.module.css` owns all compositions and its single responsive area at 1050px and 700px. It deliberately contains the related editorial layouts in one file so breakpoints are not scattered.

## Animation

`useEditorialMotion` dynamically imports GSAP/ScrollTrigger, reads CSS durations, and scopes all animation to the root. `gsap.matchMedia` and context cleanup revert owned effects. CSS handles the marquee, accordion height/opacity, hover and focus. All content remains available if animation fails or reduced motion is enabled. See `motion-system.md` for exact behavior.

## Routing

Real static directories: `/`, `/projects/think-with-ai/`, `/projects/mrp/`, `/projects/oee-manufacturing/`, `/projects/fitness-health/`, plus generated `/404.html`. Project links perform ordinary document navigation. No history router or hash-routing dependency is needed. Section anchors remain shareable. Adding a project with `caseStudy` automatically includes it in the build and sitemap. Project SEO is generated from that same record.

## Invariants

- Keep strict TypeScript and never introduce `any` to silence a type error.
- Preserve the A → B → D → C → E order.
- One source for each factual record and recurring visual token.
- Unknown employment dates/titles and unverified impact are omitted.
- Photographs and project evidence must come from real supplied sources.
- No API keys or private source documents in the published bundle.
- Interactions must work with keyboard, touch and reduced motion.
- Run an appropriate build and interaction check after structural changes.

## Known limitations and open decisions

Exact employment dates and some job titles are not available in the verified sources. Several workplace projects only have an overview. The portrait composition uses supplied photographs, whose clothing, pose and background differ from the generated design concept. Decorative education/capability imagery is replaced with intentional typography because corresponding real photographs were not supplied. The original private source folder is not needed for a normal build. Safari compatibility is addressed with semantic HTML, progressive animation, and standard CSS; only actual executed browser tests should be reported as tested.

## Quick lookup

| I want to change… | Edit… |
| --- | --- |
| Brand red, fonts, spacing, durations | `src/styles/tokens.css` |
| Font files | `public/fonts/` and `src/styles/global.css` |
| Hero content | `src/data/profile.ts` |
| Hero composition / crop | `src/sections/Hero.tsx`, hero rules in `Portfolio.module.css` |
| Add or update a project / case study | `src/data/projects.ts` |
| Update a capability | `src/data/capabilities.ts` |
| Update experience | `src/data/experience.ts` |
| Education or scholarship | `src/data/education.ts` |
| Social URL / contact | `src/data/links.ts`, `src/data/profile.ts` |
| Global motion timing | `tokens.css` |
| Section choreography | `src/hooks/useEditorialMotion.ts` |
| Page sequence / route selection | `src/App.tsx` |
| Metadata / static routes | `index.html`, `scripts/prerender.mjs` |
| Publishing / rollback | `.github/workflows/deploy.yml`, `.docs/deployment.md` |

Update this guide whenever architecture or an important responsibility changes.
