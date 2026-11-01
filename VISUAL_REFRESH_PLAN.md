# Visual refresh implementation plan

## Goal

Make the portfolio feel calmer and easier to scan, reduce the amount of copy shown at once, and add a few responsive, purposeful interactions. Preserve its dark-first editorial identity, warm light theme, 320px layout, keyboard access, static Astro output, no-JavaScript readability, and A4 print layout.

This plan guided the first implementation pass. The completed changes and remaining visual QA notes are recorded below.

## Implemented in the first pass

- Replaced broad chartreuse fills with warm neutral surfaces and Spring Boot green accents in `src/styles/global.css`. The brand reference `#6db33f` is used for small dark-theme accents; darker variants and pale green fills serve light mode. Primary accent/description/stack text contrast is at least 5.59:1 in light mode and 6.83:1 in dark mode. Accent text on fills is at least 5.02:1; selected fills also retain an inset accent rule.
- Reduced the homepage project summaries to a short description and one highlight per project. Tightened selected About and Libro copy while leaving full case studies available.
- Added short CSS feedback for hover and keyboard focus, a small project-entry rail, and a theme-marker rotation. Existing page and route reveals remain in place. No animation dependency was added; [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) recommends native CSS and browser APIs for this scope.
- Kept the supplied resume as the print/download asset. `references/CURRENT_RESUME.pdf`, `public/resume.pdf`, and the built `dist/resume.pdf` have matching SHA-256 hashes. The visible link now says “Open provided resume PDF to print or download.”
- `npm run check` and `npm run build` both pass.

The existing browser preview was inspected at 320px in dark mode. Its theme control changed to the light-mode state, but the screen still looked dark, so the preview did not provide a reliable light-theme visual check. The built CSS contains the expected light and dark tokens, and their contrast pairs were calculated; confirm the light rendering and A4 preview from the correct local build before release.

## Baseline before the refresh

- `src/styles/global.css` already centralizes color and spacing tokens, supports dark and light themes, and has a `prefers-reduced-motion` rule.
- Text contrast in the current primary combinations is strong: body text is about 18.2:1 on light panels and 16.1:1 in dark mode; muted text is about 6.9:1 and 8.2:1 respectively. Current green text accents also exceed 4.5:1 in their respective themes. These are token-level calculations; all new combinations and actual component states still need checking.
- The most visually intense color was chartreuse `#b8ff3d`, used for selected/hover fills, the selection background, and decorative motion seams. The first pass lowers its area and saturation while preserving readable text colors.
- The home page presents five sections and project highlights at once. Project case studies and About copy already provide places for expanded detail.
- Existing home and route reveals are implemented in CSS with progressive behavior. Keep their timing and navigation behavior unless the owner chooses to revise those specific experiences.

## Proposed direction

### 1. Soften the palette without reducing legibility

- Keep warm paper surfaces in light mode and deep charcoal/green-black surfaces in dark mode. Use nearby low-saturation surface shades to create depth rather than adding multiple new hues.
- Keep Spring Boot green (`#6db33f`) as a small brand signal: a thin seam, underline, marker, or restrained icon. Replace broad saturated fills with pale green surfaces paired with a dark foreground.
- Retain clear text and focus colors. Do not make body text, metadata, links, borders, or focus rings faint just to make the page look softer.
- Add or refine semantic tokens such as `--surface-raised`, `--accent-muted`, and `--accent-strong` only where a real component needs them. Avoid hard-coded colors in component rules.
- Calculate contrast for normal text (at least 4.5:1), large text (at least 3:1), and essential control graphics/boundaries (at least 3:1) in both themes, including hover, active, selected, and focus states. Use color plus an underline, border, icon, or other cue for link/state differences.
- Keep the existing monochrome A4 print palette independent from screen theme tokens.

### 2. Reduce visible copy through hierarchy and disclosure

- Start with the home page: retain a short project summary and the strongest 1–2 highlights per card; leave full context on the case-study route. Only edit visitor-facing wording in `src/content/text/` and ground every retained claim in `references/INFO.md` or `references/PROJECTS.md`.
- Make metadata secondary and compact (for example, stack labels and dates) so titles, outcomes, and actions scan first. Do not replace descriptive text with color-only badges.
- Review About sections for repeated ideas and prefer one concise paragraph or a short list where the source facts allow it. Preserve useful meaning and accessible names.
- If detail is collapsed, use native `<details>/<summary>` or a normal route link. Keep essential information and project actions discoverable, keyboard-operable, and present in print; do not depend on hover.
- Keep the full case studies available to visitors who want detail. The goal is a lighter first scan, not deleting substantiated information.

### 3. Add restrained interaction and animation

Start with native CSS transitions for hover, focus, pressed, and theme feedback. Add at most one small reveal behavior to content sections, triggered once when they enter view. Prefer opacity and short-distance transforms; avoid layout animation, parallax, pinned scrolling, cursor-follow effects, looping motion, or scroll-jacking.

- Make the resting page fully visible and readable before JavaScript runs. A script failure must never leave text transparent or controls unavailable.
- Use `IntersectionObserver` only for one-time entrance triggers. Keep native page scroll and the current route navigation behavior.
- Honor `prefers-reduced-motion` in CSS and JavaScript. For reduced motion, skip movement and use an immediate state change (or a brief opacity/color change only where helpful). Consider a site-level motion toggle only if testing shows OS settings alone are insufficient for this audience.
- Use `transform` and `opacity` for animated movement, keep durations short, and do not animate large surfaces or text blocks in ways that interrupt reading.
- Keep decorative motion out of print and ensure focus is never obscured by an overlay.

### 4. Choose animation tooling by need

For the first pass, use native CSS, the Web Animations API, and `IntersectionObserver`; the current site has no animation package and these cover the planned interactions. Add a dependency only if an implemented prototype demonstrates a clear benefit that native APIs do not provide.

The companion [animation research note](ANIMATION_RESEARCH.md) compares native APIs, Motion, GSAP, and Anime.js. If richer spring interactions later become a real requirement, prototype Motion's mini/individual imports first. Reserve GSAP for a specifically justified timeline or scroll choreography; neither is needed for the baseline plan.

## Delivery phases

1. **Inventory and design tokens** — map current color usage in both themes, interactive states, and print; agree on a calm palette direction; record contrast results before replacing token values.
2. **Palette prototype** — update semantic tokens and a small representative set of components (header/navigation, section heading, project action) to check the look in both themes and at 320px. Keep accent fills small and foreground contrast clear.
3. **Content-density pass** — revise home-page summaries and selected About copy in `src/content/text/`; keep facts grounded in the reference files and preserve full case-study detail. Add disclosure only where it genuinely improves scanning.
4. **Interaction pass** — tune button/link feedback, then prototype one section-entry effect with native APIs. Keep all content visible by default and motion optional by system preference.
5. **Accessibility and release checks** — check contrast for all text and controls in both themes, keyboard and visible-focus behavior, reduced motion, 320px reflow, JavaScript/storage failure, no-JavaScript reading, and A4 print. After implementation, run `npm run check` and `npm run build` as required by repository guidance.

## Acceptance criteria

- The palette feels softer through less saturated large fills and gentler surface separation, while ordinary text remains at least WCAG AA contrast in both themes.
- Links, selected navigation, focus indicators, and controls remain identifiable without relying on color alone.
- The home page has fewer visible words and a clearer scan order, while full, source-grounded project details remain available.
- Interactive feedback is subtle, keyboard-visible, touch-friendly, and does not impede navigation or reading.
- Reduced-motion mode avoids nonessential movement; content remains available without JavaScript and print remains static and legible.
- The result retains the current editorial portfolio character and works at 320px, in dark and light modes, and on A4 paper.

## Standards and sources

- [WCAG 2.2, Success Criterion 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) — 4.5:1 for normal text and 3:1 for large text.
- [WCAG 2.2, Success Criterion 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) — 3:1 for required visual information in controls and graphics.
- [WCAG 2.2, Success Criterion 1.4.1: Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color) — do not use color as the only visual means of conveying information.
- [WCAG 2.2, Success Criterion 2.3.3: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) and [technique C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39) — nonessential interaction-triggered motion should be disableable; reduced-motion support is an established technique.
- [Animation library research](ANIMATION_RESEARCH.md) — official package documentation, native API references, package fit, and implementation guardrails.

## Review notes

The Impeccable context scan confirmed the repo has an incumbent visual system and no `PRODUCT.md`; this refresh preserves that system. Its audit command was unavailable (`Unknown command: "audit"`), so contrast was calculated from the implemented tokens and browser checks were performed directly. The light-theme preview mismatch is noted above and remains the outstanding visual check.
