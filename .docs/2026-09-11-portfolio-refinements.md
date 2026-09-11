# Portfolio refinements — 11 September 2026

## Implemented

- Replaced the hand-drawn silhouette and repeated photographs with four original-color transparent portraits, each used once. Removed the grayscale filter. Original source folders remain untouched.
- Fixed Bodoni Moda optical sizing at 12 after font shorthand declarations. This makes fine strokes visible without increasing font weight or adding text stroke. Plus signs use Inter; infinity uses Georgia.
- Adjusted Portfolio title size to clear the portrait, and kept “WITH AI” together on desktop.
- Added CoderSchool instruction inside the analytics/BI career stage. Preserved the three existing statistics and added `2 Countries / Vietnam · UK` and `∞ Curiosity / Still exploring`.
- Added Stirling Castle behind the About portrait. Exploring uses the supplied Stirling campus image and the exact line `SAME CURIOSITY. A BIGGER CANVAS.`
- Replaced the Capabilities and Learn/Build/Contribute text artwork with supplied editorial images.
- Reworked Experience with the requested five-line headline, supporting photograph, numbered accordion, real supplied logos, confirmed job titles and expanded context. Priority: Shopee, Unilever, CoderSchool, CJ Foods, Avery Dennison, ITL.
- Centralized destination handling: external websites, email links and project evidence open separately with `noopener noreferrer`; internal routes and anchors stay in the current tab. The visitor’s configured email handler determines mailto behavior.
- Added four Think With AI screenshots, all five OEE pages, and project-specific Fitness/MRP previews to case studies. Supplier Quality, Film and Parental Leave have expandable previews. Galleries preserve proportions, limit display height and link to full-size originals.

## Asset map

Website copies live in `public/images/`. New image paths/dimensions live in `src/data/images.ts`; project galleries live in `src/data/project-previews.ts`. `scripts/prepare-refinement-images.mjs` records exact local sources and creates optimized color WebP copies.

| Source under `.docs/_local/` | Website copy / placement |
| --- | --- |
| `2. Portrait - Remove BG/IMG_3974.png` | `portrait-hero.webp` — opening hero |
| `2. Portrait - Remove BG/A_83.png` | `portrait-about.webp` — About |
| `2. Portrait - Remove BG/292A1104.png` | `portrait-portfolio.webp` — Portfolio |
| `2. Portrait - Remove BG/IMG_3993.png` | `portrait-contact.webp` — Contact |
| `Supporting Photos/4. Education/1. UK.jpg` | `stirling-architecture.webp` — About collage |
| `Supporting Photos/1. My Journey/3. Stirling.png` | `stirling-campus.webp` — Exploring |
| `Supporting Photos/2. Capabilities/Main.png` | `capabilities-editorial.webp` |
| `Supporting Photos/3. Experience/Main.jpg` | `experience-editorial.webp` |
| `Supporting Photos/5. Hero/Learn.Build.Contribute.png` | `learning-editorial.webp` |
| Four PNG logos under `Supporting Photos/3. Experience/` | `shopee-logo`, `unilever-logo`, `cj-foods-logo`, `coderschool-logo` WebP files |
| Four screenshots under `3. UI Projects/Think-With-AI/` | `think-learning`, `think-practice`, `think-progress`, `think-overview` WebP files; exact captions identify the screens |
| OEE five-page PDF | `oee-report-1.webp` through `oee-report-5.webp` |
| Supplier Quality three-page PDF | `supplier-report-1.webp` through `supplier-report-3.webp` |

Portraits also have 640px variants. Existing genuine project previews/PDFs are reused. Source PDFs can be rendered with `scripts/inspect-project-pdfs.py`; committed website copies mean ordinary builds do not require the private source folders or PDF tooling.

## Source decisions and remaining input

- The requested `Supporting Photos/5. Hero/UK.jpg` visually depicts a continental-style castle, so it is not presented as British architecture. The supplied education photograph showing Stirling Castle provides the UK composition instead; no external image was fetched.
- All six exact job titles and display order were confirmed by Trinh during this change. No employment dates were supplied, so dates remain omitted rather than copied from generated UI examples.
- Avery Dennison and ITL logo files were absent. Their names remain clearly visible as text; supplied logos can replace them later.
- Existing verified responsibilities are preserved. Detailed achievements and employer-specific dates/locations require factual source material before expansion.
- The supplied Capabilities/Growth illustrations are editorial artwork, not claimed as real project screenshots. Workplace projects with no public screenshots retain their existing text overview.

## Changed files

- Components: `Portrait`, `DestinationLink` (new), `ProjectGallery` (new), `ProjectCard`, `ProjectPreview`, `SocialLinks`.
- Sections: Hero, About, Capabilities, Exploring, Portfolio, Experience, Growth, Contact; page: CaseStudy.
- Data: career, stats, experience, images (new), project-previews (new).
- Styling: `Portfolio.module.css`, `tokens.css`.
- Assets/tooling: optimized additions under `public/images/`, image preparation script, PDF inspection script.
- Documentation: this changelog, codebase guide, design system, content model, validation.
- Verification: existing portfolio suite plus `tests/refinements.spec.ts`.

## Validation

Production build and TypeScript checks passed. Desktop (1440px), tablet (834px) and mobile (390px) were checked for image loading, overflow, navigation, accordion controls, reduced motion, accessibility, distinct color portraits, outbound links and project galleries. Screenshots were reviewed against the supplied editorial references. No Safari-specific run was performed.

Deployment uses the existing GitHub Pages workflow and static project routes; no framework, metadata scheme or hosting configuration was replaced.
