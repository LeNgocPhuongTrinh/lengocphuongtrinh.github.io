# 003 — Project and case-study routing

Context: case studies need shareable URLs and crawlable content on GitHub Pages, which does not offer arbitrary SPA rewrite configuration.

Decision: render the same React app into actual static page directories after Vite builds. Known case studies come from `projects.ts`. Normal links navigate between documents; React hydrates the same path. Unknown paths use a generated 404 page.

Alternatives: hash routes, a large modal, SPA history fallback, a separate static-site framework.

Why: actual directories preserve direct-link refresh, per-project metadata and content without an additional router or framework. The existing GitHub repository and target remain intact.

Consequences: each case study uses the four required sections. Adding a case-study record creates its route/sitemap entry. Links perform full document navigation; this is intentional for a small static portfolio. Build and client must use the same App/data and pathname.
