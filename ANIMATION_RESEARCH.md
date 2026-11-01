# Animation package research

Research date: 2026-11-01

## Portfolio fit

This project is a static Astro 5 site with no framework or animation dependencies. Its existing CSS already handles the 720ms home reveal, 150ms/250ms route shutter, theme transitions, and reduced-motion fallback. For subtle interactive feedback and short section entrances, native CSS plus small browser APIs should remain the default. Astro bundles ordinary component `<script>` tags and supports importing npm modules from them, so any candidate can be added without adopting React or another UI framework ([Astro client-side scripts](https://docs.astro.build/en/guides/client-side-scripts/)).

## Options

| Option | Cost and fit | Interaction and scroll | Reduced motion | Recommendation |
|---|---|---|---|---|
| Native CSS + Web Animations API + IntersectionObserver | No dependency. CSS covers hover/focus, transitions, and simple reveals. WAAPI gives JavaScript control over playback; IntersectionObserver can reveal sections as they enter the viewport. | Enough for buttons/cards, one-time section reveals, theme transitions, and controlled sequences. No library-specific runtime or framework. | Use the site's existing `prefers-reduced-motion: reduce` handling; also gate WAAPI/observer effects in JS and leave content visible by default. W3C documents this media query as a technique for disabling motion ([W3C C39](https://www.w3.org/WAI/WCAG22/Techniques/css/C39/)). | **Recommended baseline.** Fits the existing architecture and keeps content usable without JavaScript. |
| [Motion](https://motion.dev/) | Optional package `motion`; documented `animate()` mini build is 3.2 kB, hybrid 22 kB, and `scroll()` 3.8 kB ([animate](https://motion.dev/docs/animate), [scroll](https://motion.dev/docs/scroll)). Tree-shake/import only the functions used. | Spring/easing controls and scroll-linked/scroll-triggered animation APIs. The scroll API can use browser ScrollTimeline where supported ([scroll](https://motion.dev/docs/scroll)). Astro's normal script bundling accommodates it. | Its React config can respect the OS setting, but that API is React-specific; for a vanilla Astro page, explicitly use `matchMedia('(prefers-reduced-motion: reduce)')` and skip/adapt effects. The library’s “user” option is not the default ([MotionConfig](https://motion.dev/docs/react-motion-config)). | Best optional upgrade if the design needs more coordinated spring interactions than CSS/WAAPI can comfortably express. Start with mini/individual imports. |
| [GSAP + ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | GSAP core plus separately registered ScrollTrigger; larger conceptual/runtime surface than this portfolio currently needs. Import/register only when actually using it ([installation](https://gsap.com/docs/v3/Installation/)). | Strong timelines, scrubbed scroll, pinning, responsive matchMedia, callbacks, and scroll direction. GSAP notes it recalculates positions on resize and supports one-time triggers. | No automatic policy should be assumed; create a reduced-motion branch and disable/revert scroll triggers when the preference is active. W3C says non-essential interaction-triggered motion should be disableable ([WCAG 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)). | Reserve for a genuinely complex, choreographed project-story experience; likely overkill for small portfolio effects. |
| [Anime.js](https://animejs.com/documentation/) | Official docs describe a 3 kB lightweight `animate()` version and a 10 kB full version; powered by WAAPI ([Animation](https://animejs.com/documentation/animation/)). | Built-in timelines/staggering and an `onScroll()` observer that can trigger or synchronize animations ([onScroll](https://animejs.com/documentation/events/onscroll/)). | Implement and test the OS preference branch at the application level; do not rely on the library alone to guarantee the site's policy. | A compact alternative if staggered/timeline authoring becomes a repeated need, though native APIs cover the current requirements. |

## Accessibility and motion guardrails

- Keep every section and action visible and usable before scripts run. Animate only from the already visible state; never hide important copy pending an animation.
- Preserve system reduced-motion support. For reduced motion, remove transforms, parallax, scrubbed motion, and large entrances; use no animation or a brief opacity/color change. W3C explains that interaction-triggered motion can cause nausea/headaches and should be disableable ([Understanding 2.3.3](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)).
- Avoid scroll-jacking, pinned sections, looping motion, and auto-playing decorative motion. Keep native scroll.
- Prefer `transform` and `opacity` for moving content, and use IntersectionObserver for one-time entry triggers rather than continuous scroll listeners ([MDN Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API); [MDN Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)).
- Treat animation as an enhancement: clean up observers/animations and do not let a JS error leave content transparent.

## WCAG contrast note

WCAG 2.2 AA requires text contrast of at least 4.5:1 for normal text and 3:1 for large text, and non-text UI components/graphics generally need 3:1 against adjacent colors ([WCAG 2.2, 1.4.3 and 1.4.11](https://www.w3.org/TR/WCAG22/)). Softer colors should primarily be used for surfaces and borders; preserve readable text tokens and calculate contrast for each theme and interactive state before approving palette changes. A softer accent can still be muted while maintaining the required contrast.

## Conclusion

Do not add a package for the first implementation pass. Use existing CSS tokens and native CSS/WAAPI plus IntersectionObserver for low-motion hover, focus, and section-reveal behavior. If more expressive spring/timeline interactions are later justified, prototype Motion's mini API first; select GSAP only if scroll choreography needs pinning or scrubbed timelines. No package has been added as part of this research.

