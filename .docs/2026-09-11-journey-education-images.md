# Journey, Education and project repository links — 11 September 2026

- Journey now shows all three supplied images: FTU, Shopee/Unilever and Stirling, replacing typographic placeholder blocks. Image proportions and colors are retained.
- Education shows the supplied UK and Vietnam photographs; Recognition shows the supplied ASEAN-UK SAGE artwork with contain sizing so its logos/text are not cropped.
- Rebuilt `unilever-logo.webp` from the user's replacement PNG. Original files remain untouched.
- Fitness & Health, OEE Manufacturing and MRP case studies now expose `githubHref` as a “View GitHub repository” button in The Build, alongside the existing original-project button. Exact user-provided commit-pinned URLs are retained and open in a new tab with `noopener noreferrer`.
- Added `npm run images:prepare` as the documented entry point to the Sharp conversion script. Added four source mappings and optimized WebP files; reused existing Stirling images where the supplied source is shared.
- Added `.docs/image-maintenance.md`, linked from README and the expanded codebase guide. It documents what is generated, how to replace/add images, the complete-source-folder requirement, and the separate workflow for PDF previews.
- Included the previously requested codebase-guide expansion covering `.qa/`, generated folders, legacy assets and cleanup guidance.

## Main files

`scripts/prepare-refinement-images.mjs`, `package.json`, `src/data/images.ts`, `src/data/career.ts`, `src/data/education.ts`, `src/data/projects.ts`, `src/sections/About.tsx`, `src/sections/Education.tsx`, `src/pages/CaseStudy.tsx`, `src/styles/Portfolio.module.css`, `public/images/`, `tests/refinements.spec.ts`, README and `.docs/` guides.

## Content and asset decisions

The UK education file depicts Stirling Castle; its alt text describes the castle rather than claiming it is a university building. The same supplied Stirling campus image is used for Journey and Exploring; the same castle source is used for Education and the About collage. Updating either shared key changes both placements, as documented in the image maintenance guide. No new portrait repetition or external imagery was introduced.

The requested repository URLs are navigation destinations, not new claims about the projects' functionality. Existing descriptions, galleries, original-project destinations and route names are preserved.

## Validation

TypeScript and the production build passed. The browser suite passed 19 checks, with two intentionally skipped motion checks on tablet/mobile. Image loading, accessibility, overflow, navigation and gallery behavior remain covered; the three exact GitHub URLs, new-tab targets and placement beside the original-project action are asserted. Journey, Education and action-row screenshots were reviewed at desktop and mobile sizes. `git diff --check` passed.
