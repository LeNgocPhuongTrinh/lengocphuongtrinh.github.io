# Validation record — 2026-09-11

- Strict TypeScript and production build pass. Six static HTML documents are generated: homepage, four case studies, and 404; sitemap contains the five public content routes.
- Production browser checks against `vite preview`: **13 passed, 2 intentionally skipped**. Desktop-only motion checks are skipped for the two smaller viewport projects.
- Viewports: 1440×1000 desktop, 834×1112 tablet, and 390×844 mobile, using headless Microsoft Edge.
- Verified image loading, no horizontal document overflow, approved section ordering, keyboard accordions, inert closed panels, theme selection, marquee pause, mobile menu/Escape behavior, anchor navigation, direct project routes and reloads, not-found navigation, motion preference changes and clean React hydration.
- Axe WCAG 2 A/AA and 2.1 AA scan reports no violations on the homepage at all three sizes. Automated results do not replace a full human accessibility audit.
- Real project PDF evidence was extracted and visually inspected. Generated portfolio frames were not used as project screenshots.
- Dependency audit after upgrades: zero known vulnerabilities at validation time.
- Production initial app JavaScript: approximately 73 KB gzip; stylesheet: approximately 8 KB gzip. GSAP and ScrollTrigger load separately and are skipped on initial reduced-motion visits. Images are responsive WebP; public PDFs and the walkthrough video are not eagerly downloaded.
- No Lighthouse score or Safari-device test is claimed. Headless Edge checks and local loading do not establish real-user Core Web Vitals. Actual WebKit/Safari and field performance remain useful follow-up checks.
- Original private sources and QA output are excluded from Git and the public deployment.

Deployment status and live-URL verification are recorded in the final delivery message and GitHub Actions history.
