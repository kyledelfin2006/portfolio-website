# Light Mode Design

Light mode carries the portfolio’s editorial, cyber-brutalist resume style into a calm palette. It should feel like a carefully typeset document on warm paper: quiet, readable at a glance, with restrained Spring Boot green signals that preserve the site’s technical character.

## Palette and surfaces

- The page canvas is warm ivory (`#f1efe8`), rather than pure white.
- Content panels use a slightly lighter paper tone (`#faf8f1`); section-heading bands use a muted beige (`#e8e5da`).
- Main text is near-black (`#1a1b17`). Secondary labels and dates use subdued gray-green (`#62665c`).
- Thin rules use gray-green (`#858a7c`), with stronger near-black rules to frame major regions.
- A pale green tint (`#e3eedc`) provides a low-saturation fill for selected and hover states, with dark foreground text (`#1d2a18`). Text accents use accessible green shades—`#3e6c2d` for the primary accent and `#416f2e` for project descriptions and technology stacks—so they remain readable on light surfaces.
- The Spring Boot reference green is `#6db33f` ([Simple Icons Spring Boot entry](https://simpleicons.org/?q=springboot)). Use it directly only for small accents on dark surfaces; on light surfaces, use the darker green variants above to preserve contrast.

The result is warm and readable without the glare of a white canvas or the visual noise of large neon fills. Spring Boot green marks focus and interaction in small areas. Red remains reserved for warning or error states.

## Structure and hierarchy

The layout is intentionally document-like. Exposed grids, square panels, flat fills, and one-pixel rules divide the resume into clear sections. A restrained scanline texture adds a subtle screen-print quality to the page; it stays behind the content and disappears in print.

Long-form text uses a traditional serif face. Navigation, section labels, dates, links, and other compact metadata use the local monospace stack, often in uppercase. This contrast keeps prose approachable while making the interface feel precise and technical. The container stays centered and capped at 1080px, with generous spacing around content and tighter spacing inside metadata.

## Accent use and interaction

Spring Boot green communicates hierarchy and interaction rather than decorating every surface. It marks key titles and structural cues, link underlines, list markers, keyboard focus, and the current navigation tab. Selected and hovered states use a pale green fill with readable foreground text and a clear inset rule; hover and focus states remain brief and easy to identify. Theme changes cross-dissolve over 180ms without moving the layout, and the theme marker rotates to acknowledge the switch.

## Images

The portrait stays grayscale with added contrast, keeping it consistent with the restrained editorial palette. Honors and certificate photographs use modest saturation and contrast adjustments in light mode, with a subtle scanline overlay on Honors figures. Project logos keep their source colors in light mode and sit inside framed, flat panels.

## Responsive and print behavior

The grid collapses into a single reading column on smaller screens, keeping the navigation and identity compact. Content remains usable at a 320px viewport without intentional horizontal scrolling.

Print is a separate, monochrome A4 presentation: it switches to a white canvas and black text, removes screen texture, accent fills, and most panel decoration, and keeps the document’s reading order and key content intact.

## Keep the style consistent

Use the existing CSS tokens and browser-native behavior. Keep the palette flat and the hierarchy clear. Avoid gradients, glow effects, glossy 3D, rainbow accents, excessive glitch effects, stock imagery, and decorative artwork that competes with the resume content.

For exact theme tokens, filter values, typography sizes, and print measurements, see [DOCUMENTATION.md](DOCUMENTATION.md#6-design-and-print-standards) and `src/styles/global.css`.
