# Light Mode Design

Light mode carries the portfolio’s editorial, cyber-brutalist resume style into a brighter palette. It should feel like a carefully typeset document on warm paper: calm and readable at a glance, with a few sharp green signals that preserve the site’s technical character.

## Palette and surfaces

- The page canvas is warm ivory (`#f4f1e8`), rather than pure white.
- Content panels use a slightly lighter paper tone (`#fffdf6`); section-heading bands use a muted beige (`#e7e2d4`).
- Main text is near-black (`#121411`). Secondary labels and dates use subdued gray-green (`#565b51`).
- Thin rules use gray-green (`#74796d`), with stronger near-black rules to frame major regions.
- The bright chartreuse (`#b8ff3d`) is reserved for fills and selected states. Text accents use darker greens—`#314800` for the primary accent, `#425f00` for project descriptions, and `#3f6f24` for technology stacks—so they remain readable on the light surfaces.

The result is warm and high contrast without the glare of a white canvas or the visual noise of a large neon palette. Red remains reserved for future warning or error states.

## Structure and hierarchy

The layout is intentionally document-like. Exposed grids, square panels, flat fills, and one-pixel rules divide the resume into clear sections. A restrained scanline texture adds a subtle screen-print quality to the page; it stays behind the content and disappears in print.

Long-form text uses a traditional serif face. Navigation, section labels, dates, links, and other compact metadata use the local monospace stack, often in uppercase. This contrast keeps prose approachable while making the interface feel precise and technical. The container stays centered and capped at 1080px, with generous spacing around content and tighter spacing inside metadata.

## Accent use and interaction

Green communicates hierarchy and interaction rather than decorating every surface. It marks key titles and structural cues, link underlines, list markers, keyboard focus, and the current navigation tab. The active tab uses a chartreuse fill with dark text and a strong inset rule; hover and focus states remain brief and easy to identify. Theme changes cross-dissolve over 180ms without moving the layout.

## Images

The portrait stays grayscale with added contrast, keeping it consistent with the restrained editorial palette. Honors and certificate photographs use modest saturation and contrast adjustments in light mode, with a subtle scanline overlay on Honors figures. Project logos keep their source colors in light mode and sit inside framed, flat panels.

## Responsive and print behavior

The grid collapses into a single reading column on smaller screens, keeping the navigation and identity compact. Content remains usable at a 320px viewport without intentional horizontal scrolling.

Print is a separate, monochrome A4 presentation: it switches to a white canvas and black text, removes screen texture, accent fills, and most panel decoration, and keeps the document’s reading order and key content intact.

## Keep the style consistent

Use the existing CSS tokens and browser-native behavior. Keep the palette flat and the hierarchy clear. Avoid gradients, glow effects, glossy 3D, rainbow accents, excessive glitch effects, stock imagery, and decorative artwork that competes with the resume content.

For exact theme tokens, filter values, typography sizes, and print measurements, see [DOCUMENTATION.md](DOCUMENTATION.md#6-design-and-print-standards) and `src/styles/global.css`.
