# Implemented design system

Source: approved Frames A–E; composition order A → B → D → C → E. The reference images determine art direction, never factual claims.

## Tokens

All recurring values are in `src/styles/tokens.css`.

| Token | Value |
| --- | --- |
| Paper | `#f7f5f1` |
| Ink | `#141311` |
| Accent | `#b90d16` |
| Accent hover | accent mixed with 22% ink |
| Muted text | `#62615f` |
| Decorative numbers | `#85817c` (large-text contrast) |
| Surface | `#e9e5df` |
| Hairline | `#cbc7c1` |
| Chapter line | accent at 38% opacity |
| Display | Bodoni Moda, Times New Roman, serif |
| Body/UI | Inter, Arial, sans-serif |
| Condensed identity | Barlow Condensed, Arial Narrow, sans-serif |
| Annotations | Caveat, cursive |

Display weight 900; large numbers 700; Bodoni optical size fixed at 12 with automatic optical sizing disabled after each font shorthand, preserving fine strokes without adding weight or text stroke; plus signs use Inter and infinity uses Georgia; body 400; UI 500; condensed identity 600. Fonts are self-hosted with `font-display: swap`; only the display font is preloaded. Vietnamese identity can use font fallback for glyphs outside a subset.

## Type scale

`--text-xs: .6875rem`; `--text-sm: .8125rem`; `--text-body: .9375rem`; lead `clamp(1.15rem,1.8vw,1.7rem)`; subhead `clamp(1.4rem,2.4vw,2.2rem)`; section `clamp(3rem,6.5vw,6.5rem)`; display `clamp(3.5rem,9.1vw,9rem)`; numbers `clamp(3.5rem,6.8vw,6.5rem)`; hero `clamp(7rem,29.5vw,29.5rem)`.

Main display line height `.86`, tracking `-.065em`; metadata tracking `.14em`. Composition-specific scales in `Portfolio.module.css`: portfolio `clamp(4.5rem,12.2vw,12rem)`, featured project `clamp(4rem,7.8vw,7.8rem)`, exploring preface `clamp(2.1rem,4.6vw,4.6rem)`, experience `clamp(2.7rem,5.4vw,5.4rem)`, contact `clamp(2.6rem,5.1vw,5.1rem)`. Smaller editorial copy uses the serif at normal weight.

## Grid and spacing

Maximum width 1600px; gutters `clamp(1.25rem,4vw,4rem)`; gaps `clamp(1rem,2.4vw,2.5rem)`. Space scale `.25, .5, .75, 1, 1.5, 2, 3, 4, 6rem`. Standard section padding is 3rem vertically. Layouts deliberately vary: three career columns, four exploring columns, asymmetric featured work, a two-column secondary project composition with a full-width MRP row, a two-part experience section, and a four-part education composition.

## Rules, controls and details

One-pixel neutral borders organize rows; translucent red borders separate chapters. No general card shadow system. Primary buttons use red fill, paper text, 99rem radius, minimum 48px height, `.75rem 2rem` padding and uppercase UI text. Outline buttons use ink outlines and reverse on hover. Text links underline with 6px offset. Focus uses a 2px red outline with 5px offset. The marquee pause button uses a paper focus outline.

Section labels use uppercase 11px metadata, a flexible neutral hairline, and optional right-aligned commentary. Oversized decorative numbers are paired with readable semantic labels. Handwriting is decorative or secondary only.

## Images

Four supplied transparent PNG portraits are optimized as original-color WebP (640px and 1024px). Each appears once: Hero, About, Portfolio, Contact. There is no artificial silhouette or grayscale filter. About layers the supplied Stirling Castle photograph behind the portrait; Exploring uses the Stirling campus image instead of repeating a portrait. Capabilities, Experience and Growth use the supplied editorial artwork. All website images live in `public/images/`; new asset dimensions and names are centralized in `src/data/images.ts` and their source mapping in `scripts/prepare-refinement-images.mjs`.

Project evidence is supplied screenshots or rendered supplied PDFs. Case studies use stacked, captioned previews with contained images capped at 500px high (400px on phones). Other public projects expose native expandable galleries. Each preview links to its full-resolution image in a separate tab. Only the hero is eager/high priority; other imagery is lazy-loaded. Video loads on request.

Journey uses contained color images alongside its editorial perspective text. Education photos use fixed-height cover frames; recognition artwork uses contain sizing to preserve its logos and text. Case-study actions sit together in a wrapping flex row.
