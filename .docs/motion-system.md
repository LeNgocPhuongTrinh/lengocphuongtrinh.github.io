# Motion system

Motion guides hierarchy without blocking reading. There are no pinned chapters, scroll hijacking, synthetic cursor, magnetic controls, heavy 3D effects, or multiple animation frameworks.

## Ownership and tokens

`src/hooks/useEditorialMotion.ts` owns GSAP and every ScrollTrigger it creates. It dynamically imports GSAP and ScrollTrigger only when motion is allowed, scopes animation in a GSAP context, and reverts through `matchMedia` cleanup. React Strict Mode unmounts and asynchronous import races are handled. CSS owns simple hover/focus/accordion/marquee behavior.

Durations in `tokens.css`: fast `.2s`, reveal `.8s`, accordion `.35s`, marquee `36s`. CSS easing is `cubic-bezier(.22,1,.36,1)`; GSAP uses `power3.out`. One-off choreography offsets/staggers are local to the hook. Global portrait parallax is `10` percent; mobile CSS changes it to `0`.

## Choreography

- **Hero:** identity words enter from 16% below with opacity and `.12s` stagger. Portrait enters 18px upward at timeline offset `.1s`. Metadata/CTAs enter 12px upward at `.2s`; the sequence never blocks links. Desktop identity words separate subtly from the portrait with scroll-linked translation.
- **Marquee:** two identical, nonshrinking copies translate by precisely 50% for a seamless loop. Duplicate text is hidden from assistive technology. The visible pause/resume button and hover pause prevent mandatory continuous movement.
- **About/career:** headings and stages reveal as they enter the lower viewport (`top 94%`), connecting the business → data → AI story without blank pinned space.
- **Images:** a subtle 9% top inset resolves into the full image. No looping image zoom.
- **Capabilities/experience:** native buttons update a single active ID. CSS animates grid rows `0fr → 1fr` and opacity. Hidden content is inert, aria-hidden, and still present in the document. A red number and plus/minus express state without relying on color alone.
- **Exploring:** explicit touch/keyboard controls select a theme; mouse entry can also highlight it. Human × AI is selected initially. Content remains visible for every theme.
- **Portfolio:** reveal hierarchy and modest title/image hover movement; the red MRP surface changes section rhythm. The inter-chapter red triangle is static and its arrow shifts by 12px on hover.
- **Growth:** the LEARN → BUILD → CONTRIBUTE → SHARE → REPEAT words rise 10px and gain opacity across `top 88% → top 55%` with scrubbed progression. The full loop is always readable.
- **Contact:** standard heading reveal resolves the story into the final action.

## Reduced motion and mobile

CSS disables transitions/animations and smooth scrolling for `prefers-reduced-motion: reduce`. JavaScript skips loading GSAP on initial reduced-motion visits; `matchMedia` reverts active animation if the preference changes. Content is not hidden in base CSS, so motion failures do not hide it. Mobile disables portrait parallax through a CSS token; typography and accordions remain usable. No interaction relies exclusively on hover.

## Performance

Transforms, opacity and clip-path handle most movement. Accordion height uses CSS grid only after an explicit click. The scroll progress handler batches a single transform through requestAnimationFrame. There are no per-scroll React updates except resetting the active navigation near the top. No video download occurs until playback is requested.
