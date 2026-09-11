# Portfolio engineering rules

Adapted from the supplied Think With AI engineering philosophy, applying the user’s explicit frontend scope. Backend/data-pipeline/API-key storage architecture does not belong in this portfolio.

1. Keep modules responsible for one coherent concern. Data records describe facts; components present them; the motion hook owns choreography; build scripts own static output.
2. Prefer straightforward code over speculative abstraction. Shared navigation, labels, portrait frames, project previews, and accordions have real reuse; no generic service layer or global store is necessary.
3. Optimize for human readability, not terseness. Use descriptive names,
clear formatting, and straightforward control flow. A developer relatively new to React/TypeScript should be able to follow the component hierarchy and data flow without decoding shorthand. Avoid dense one-line JSX, cryptic aliases, clever abstractions, and premature compression.
3. Keep one source of truth. Edit content in `src/data/`, recurring visual values in `tokens.css`, and responsive composition rules in one stylesheet.
4. Use strict TypeScript. Avoid `any`, redundant state, catch-all error suppression, and invented interfaces without a purpose.
5. Semantic HTML is the default. Use links for navigation and buttons for state changes; provide visible focus, descriptive names, logical headings, and appropriate image alternatives.
6. Accordions and menus must expose state. Closed accordion panels must not retain active tab stops. Touch and keyboard must reach every essential interaction.
7. Motion is optional enhancement. Default HTML/CSS remains readable; respect reduced motion; clean up listeners and animation contexts.
8. Keep assets responsive and optimized. Do not download video until requested. Do not ship source photos, private briefs, build tools, or node_modules as public output.
9. Check external responses and surface useful failure states. Never place credentials in source, URLs, logs, or public environment variables. The deployment helper uses the existing Git credential only in memory for GitHub.
10. Test behavior and important boundaries: direct routes, hydration, responsive overflow, keyboard controls, lazy images, reduced motion, static SEO and 404 handling. Avoid tests that only restate implementation.
11. Keep Git history and make reviewable commits. Develop on a redesign branch, verify the diff before publication, and never force-push the production branch.
12. Keep README, architecture, design, motion, content, deployment and ADR documentation aligned with the actual implementation.

The full source reference remains in the sibling Think With AI project; its app-specific Tailwind, backend, learning-state and API-key guidance is intentionally not copied here.
