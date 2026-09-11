# Content model and provenance

Facts live in `src/data/`, separate from presentation. The user’s original brief and implementation prompt override generated frame copy. Actual project source and supplied evidence establish functionality and results.

## Editing map

| Content | Source file | Rules |
| --- | --- | --- |
| Name, identity, introduction, email | `profile.ts` | Keep Trinh Le and Lê Ngọc Phương Trinh connected |
| Social destinations | `links.ts` | Real public links only |
| Career progression | `career.ts` | Business → Analytics/BI → AI; CoderSchool is parallel contribution |
| Statistics | `stats.ts` | Supplied 6+ years, 5 companies, 3 industries; user-confirmed 2 countries and infinity curiosity |
| Capabilities | `capabilities.ts` | User-supplied skills; no percentages or implied proficiency ranking |
| Exploration | `exploration.ts` | Directions of curiosity, not new achievements |
| Projects and case studies | `projects.ts` | Four narrative fields; optional real image, stack and link |
| Experience | `experience.ts` | Do not fill unknown dates/titles from the generated frame |
| Education and scholarship | `education.ts` | MSc, bachelor’s degree, ASEAN-UK SAGE 2026/27 |
| Growth | `growth.ts` | Learn, build/contribute, share; teaching is one contribution |

## Verified source register

- Existing repository `index.html` at `de46c3bbfb02c40b43305b21821b3a972123f036`: identity, contact links, degree, broad analytics background, Think With AI, Python work, MRP constraints, visualization portfolio.
- User’s `.docs/_local/1. UI Generation/prompt_original.txt` and `.docs/_local/UX Generation/02_implementation_prompt.txt`: approved copy, capabilities, employers, 6+ experience, 5 employers, 3 industries, CoderSchool instruction/mentoring, Shopee AI workshop, named workplace projects, education and scholarship.
- [Public GitHub profile README](https://github.com/LeNgocPhuongTrinh/LeNgocPhuongTrinh/blob/main/README.md), read 2026-09-11: employer list, industry scope, current MSc, scholarship, contact and analytics skills.
- Local sibling `think-with-ai` source, especially `src/components/landing/Features.tsx`, `HeroVideo.tsx`, and `.docs/codebase-guide.md`: topic-based adaptive practice, structured grading, misconceptions, material upload, progress, device-local state, provider key requirements, and incomplete Study view. The public product link is https://think-with-ai.vercel.app/.
- Supplied `3. UI Projects/Think-With-AI/`: real landing screenshot. The actual video/poster source comes from the product implementation, not from generated portfolio frames.
- Supplied OEE Manufacturing PDF: five-page Power BI dashboard with availability, performance, quality, TEEP, downtime, and machine detail. Dataset values are never recast as achieved improvements.
- Supplied Fitness Tracker PDF: Indian market preferences, features, brands, price and correlation analysis; its stated 31% valid-data limitation is included in the case study. The folder name says Runner-up, but no award claim is published without further evidence.
- Supplied MRP image: Python inventory and production constraint code with a planning table. Existing MRP project page confirms shelf life, MOQ, and multi-site planned order release scope.
- Supplied Supplier Quality PDF, Film analysis image, and Parental Leave Policy PDF: original visual evidence supporting the corresponding project summaries. Analytical findings describe source datasets, not business outcomes delivered.
- Supplied portrait files: transparent PNGs in `2. Portrait - Remove BG`: IMG_3974 for Hero, A_83 for About, 292A1104 for Portfolio, IMG_3993 for Contact. The user-supplied supporting illustrations are editorial artwork, not project evidence.

## Adding a project

Add a typed record to `projects.ts`. Supply a stable URL-safe `id`, title, category, summary and optional image/href/stack. To publish a case study, add `why`, `approach`, `build`, and `reflection`. The app and pre-renderer derive routes from those records. Source assets should be optimized into `public/images/`; public PDF evidence lives in `public/projects/evidence/`. Do not publish confidential workplace material.

## Uncertainties deliberately omitted

Exact employment dates, generated job descriptions, 20+ projects, invented success metrics, fictional university photographs, and fake dashboards are not published. All six role titles and their display priority were confirmed directly by the user on 2026-09-11. Workplace projects without public evidence receive a short overview with no invented live link. LinkedIn and Pinterest references could not be retrieved through the available web reader; they were not used as verification.

## Presentation assets

The source folder `.docs/_local/` remains untracked. Fonts and their OFL licenses, optimized real images, public evidence documents, favicon and social portrait are committed. Normal cloning/building needs none of the private source assets. The social preview uses a crop of the real portrait, not fabricated professional evidence.

## September refinements

`project-previews.ts` maps project IDs to captions and their own source images. `images.ts` records the optimized new assets. Employment priority is Shopee, Unilever, CoderSchool, CJ Foods, Avery Dennison, ITL. Four supplied logos are used; Avery Dennison and ITL retain text identities until logos are supplied. See `2026-09-11-portfolio-refinements.md` for exact asset mapping and image provenance decisions.
