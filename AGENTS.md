# Repository guidance

- This is a static Astro 5 portfolio. Read `DOCUMENTATION.md` for the current architecture, visual system, content contracts, assets, print rules, and deployment steps.
- Keep factual claims grounded in `references/INFO.md` and `references/PROJECTS.md`; edit visitor-facing copy in `src/content/text/`.
- `references/CURRENT_RESUME.pdf` is user-owned and immutable. Never edit, rename, delete, move, convert, overwrite, replace, or otherwise alter it. Do not read, extract, copy, summarize, or use its contents unless the user explicitly instructs you how to use it. Only the user may supply or replace this file. Keep `public/resume.pdf` separate; change it only when the user explicitly directs its use.
- Preserve the dark-first editorial style, light theme, 320px layout, accessible navigation, and A4 print output. Use existing CSS tokens and native browser features before adding dependencies.
- The Resume homepage has a once-per-tab, 720ms split reveal. It is decorative, dismisses on interaction, and is skipped for reduced motion, unavailable storage, disabled JavaScript, and print. Internal page links use a 150ms closing shutter and 250ms destination reveal when JavaScript and session storage are available; other navigation remains native.
- On-page photographs use CSS filters: the portrait is grayscale with added contrast; Honors photographs use restrained saturation/contrast in light mode and brightness/saturation/contrast in dark mode. Project logos have a dark-mode filter and a grayscale print filter. See the exact values in `src/styles/global.css` and `DOCUMENTATION.md`.
- Run `npm run check` and `npm run build` after code or content changes. Inspect both themes, a 320px viewport, and print when changing visuals.
