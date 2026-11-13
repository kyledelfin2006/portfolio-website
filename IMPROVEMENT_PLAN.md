# Improvement plan: section headings, green lines, separation

Direction: keep the current boxed, minimal, light design. Only the width changes slightly (1080px to 1240px). No full-bleed bands, no rail, no sticky bars.

Status: built. The width, one-line subtitle, single FlyRank bullet, serif section headings with descriptions, neutral jump strip, softened scroll bar and solid dividers are in.

## What I found

| Area | Today | Problem |
| --- | --- | --- |
| Section heading | 13px uppercase mono in a filled grey bar with a green `//` | Reads as a toolbar, not a title. Small, shouty, and the same weight as metadata. |
| Section text | Heading only; no line saying what the section is | The five headings carry no context. |
| Green lines | A full green-filled, green-bordered jump strip; green `//` markers; a 3px green scroll bar at the very top; green dashed and square bullets; green-filled stack chips | Green appears in about six forms at once, so none of them stands out and the strip reads as neon. |
| Separation | Sections are 16px apart in matching boxes; entries inside are divided by dashed lines | Sections blur together; dashed lines look unfinished. |

## Proposed changes (minimal and light)

### 1. Section headings
- Title in the serif, sentence case, 24px bold, tight tracking. No filled bar, no uppercase, no `//`.
- One short green rule (40px by 2px) under the title is the only green in the heading. A neutral 1px line runs full width below it.
- A one-line description under the title in muted text, set in `src/content/text/pages/home.md` so copy stays in Markdown. Proposed wording, all from facts already on the site:
  - Experience: "Where I've worked and what I built."
  - Selected Projects: "Backend projects with source code and write-ups."
  - Activities & Achievements: "Competitions, awards and community work."
  - Education: "Degree and what I'm learning next."
  - Technical Skills: "Languages, frameworks and tools I use."

### 2. Green lines
- Jump strip: neutral surface with a 1px neutral border. Green only marks the section in view, as a 2px underline. No green fill or border.
- Remove the green `//` markers and the green fill behind them.
- Scroll bar: keep, but 2px and in a softened green (`color-mix` of the accent and the rule colour) so it is visible without glowing.
- Keep green for meaning only: links, stack chips, current-page tab. That makes the heading rule and the active strip item stand out.
- Contrast stays above WCAG AA: accent text is 6.83:1 dark and 5.83:1 light; a 2px line needs 3:1.

### 3. Cleaner separation
- Gap between sections from 16px to 24px.
- Each section keeps its box, but the heading sits on the panel surface (no grey bar), with 24px padding above the content.
- Inside sections, replace dashed dividers with 1px solid rules and 24px of space.
- Projects: keep the quiet 01/02/03 index; hover tint stays, no lift.

### 4. Design options considered
| Option | Idea | Verdict |
| --- | --- | --- |
| A. Quiet ledger | Serif titles, short green rule, description line, solid hairlines | **Recommended.** Smallest change, keeps the current look. |
| B. Index-left headings | Title in a narrow left column, content right, inside the same box | Good for long sections, but heavier and closer to the full-width idea you dropped. |
| C. Tabbed sections | One section visible at a time | Hides content and breaks scroll flow. Not recommended. |

## Accessibility notes (from the audit pass)
- Keep the skip link and the visible focus outline; check the jump strip links keep a 44px target.
- Headings stay a real h2 in order under the h1; the new description lines are plain paragraphs.
- Green must never be the only signal: the strip's active item gets an underline and `aria-current`.
- Re-check contrast of the softened scroll bar and muted descriptions in both themes.

## Build steps
1. Heading component and CSS: new title style, short rule, description line.
2. `home.md` and `src/content/config.ts`: optional `description` per section.
3. Jump strip and scroll bar colours.
4. Gaps, panel padding, solid dividers.
5. `npm run check`, `npm run build`, then both themes, 320px and print.

## Open question
`/design-sync` pushes a local component library to a claude.ai design-system project. This site has no component library to sync, so I have not run it. Tell me if you want that done.
