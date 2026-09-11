# 001 — Styling architecture

Context: the approved A → B → D → C → E compositions need oversized serif typography, portrait layering, fine rules and different editorial grids. The existing site is static HTML with a legacy theme; there is no React infrastructure to preserve.

Decision: React + strict TypeScript + Vite. CSS custom properties in `src/styles/tokens.css` own recurring design values. CSS Modules own compositions and interaction states. Global CSS owns reset, fonts and semantic defaults. No Tailwind or component framework is needed.

Alternatives: Tailwind plus Modules; the existing Sass theme. Neither adds value for this custom composition.

Consequences: lightweight dependencies, explicit responsive layouts, one palette source. Native CSS cannot substitute custom properties into media query conditions, so all responsive composition rules and thresholds live together at the end of `Portfolio.module.css` (1050px and 700px). No extra PostCSS transformer is required.
