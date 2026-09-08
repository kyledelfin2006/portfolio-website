# Honors and Learning Media Implementation Plan

## Status

Implemented

## Objective

Separate the DWIA Python training award and the Tabang hackathon result into distinct entries under the existing **Honors & Learning** section. Display the supplied DWIA award photo as a small, crisp supporting image with a faint CSS grain treatment, and associate each event with its own certificate link.

The result must retain the portfolio’s restrained document layout, work in both themes, remain responsive and accessible, and avoid adding dependencies or altering the source media.

## Source of Truth and Asset Mapping

Treat the following owner-supplied files as immutable source assets:

| Event | Source asset | Website use |
| --- | --- | --- |
| DWIA Most Analytical Programmer Award | `assets/DELFIN_DWIA_AWARD.jpg` | Small supporting photo beside the DWIA honor |
| DWIA Most Analytical Programmer Award | `references/certificates/DWIA-MOST-ANALYTICAL-PROGRAMMER.pdf` | `View certificate ↗` beside the DWIA honor |
| Python Programming Essentials completion | `references/certificates/DWIA-CERT-AKLAN_DELFIN.pdf` | Keep with the existing training entry under Certifications & Workshops |
| Tabang / KomsaiHack 2026 | `references/certificates/TABANG.RISKREADY.CERTIFICATE.png` | `View certificate ↗` beside the Tabang honor and on Tabang project surfaces |

The DWIA photo is a 2048×1365 JPEG (209 KB). It is already compact enough to publish without introducing an image-processing pipeline. The Tabang certificate states that the project secured a Top 10 placement; the existing owner-approved copy may continue to state the more specific seventh-place result.

`references/INFO.md` remains the factual source of truth for personal honors and training. `references/PROJECTS.md` remains the factual source of truth for Tabang.

## Content Structure Decision

The current `about` content shape supports only one `itemTitle`, `meta`, and `certificatePath`, which forced DWIA and Tabang into one entry. Extend that existing shape with an optional `items` array rather than creating a new content collection or component family.

Each item should support:

- `title`
- optional `meta`
- `summary`
- optional `certificatePath`
- optional `image` object containing `path`, `alt`, `width`, and `height`

Update `src/content/text/about/honors-and-learning.md` to contain two ordered items under one section heading:

1. **Most Analytical Programmer Award** — DICT Region VI Python Programming Essentials Training, June 2026; include the DWIA award photo and award certificate.
2. **UPV KomsaiHack Finalist** — Tabang placed seventh among more than 25 teams in 2026; include the Tabang certificate.

Migrate the existing top-level DWIA honor fields into the first item. Remove the top-level `certificatePath` from the `about` schema after confirming no other About entry uses it.

## Image Presentation

- Copy `assets/DELFIN_DWIA_AWARD.jpg` to a stable public path such as `public/images/dwia-most-analytical-programmer.jpg`; do not move, overwrite, crop, or recompress the source.
- Render the image in a semantic `<figure>` within the DWIA item, after its summary and before its certificate link.
- Use the intrinsic 2048×1365 dimensions in markup to reserve space and prevent layout shift.
- Set `loading="lazy"` and `decoding="async"` because the image appears below the fold.
- Use descriptive alternative text: `Aldrin Kyle Delfin receiving the Most Analytical Programmer award at the Python Programming Essentials Training.`
- Keep the displayed image modest: `width: min(100%, 420px)`, automatic height, left aligned, and bounded by the existing `--rule` border token.
- Preserve the natural 3:2 aspect ratio. Do not use a fixed-height crop, transform, blur, or distortion.

Add a faint grain layer on the figure wrapper with a non-interactive `::after` overlay. Use a tiny inline SVG `feTurbulence` texture or equivalent local CSS texture at approximately 4–6% opacity with `mix-blend-mode: soft-light`. Keep the underlying image sharp and apply only subtle theme tuning:

- Light mode: near-original color with slightly reduced saturation if needed.
- Dark mode: a small brightness reduction and restrained saturation so the image sits naturally on the dark canvas.
- Transition only `filter` with the existing 220ms theme transition state.
- Disable the filter transition under `prefers-reduced-motion: reduce` through the existing rule.

Choose final filter and grain values by visual inspection. The photo must remain recognizable, detailed, and color-faithful; the grain should be felt rather than visibly patterned.

## Certificate Placement

- Keep the current shared label from `site.md`: `View certificate ↗`.
- Keep all certificate links as plain text links opening in a new tab with `rel="noopener noreferrer"`; do not embed certificate previews.
- Copy the Tabang certificate to a stable public path such as `public/certificates/tabang-komsaihack-2026.png` while preserving the reference original.
- Reuse the existing public DWIA award and completion PDFs rather than creating duplicate files.
- Store public-relative paths in content so `import.meta.env.BASE_URL` continues to support root and subpath deployments.
- Mark certificate actions and the DWIA photo `no-print` unless print review shows they fit without disrupting the resume’s established A4 output.

## Tabang Project Integration

Add an optional `certificatePath` to the existing `project` schema and set it only in `src/content/text/projects/tabang.md`.

Render the Tabang certificate link:

- In `Projects.astro`, beside the existing case-study and source-code actions.
- In `BlogPostLayout.astro`, near the source-code action in the project header.
- In the Tabang item under Honors & Learning.

Use the same public certificate file and shared link label in all three places. Libro and FaceLog should render exactly as before when `certificatePath` is absent.

## Files and Integration Points

- `assets/DELFIN_DWIA_AWARD.jpg`
  - Preserve as the original source image.
- `references/certificates/`
  - Preserve all original DWIA and Tabang certificates.
- `public/images/dwia-most-analytical-programmer.jpg`
  - Add the publishable copy of the DWIA photo.
- `public/certificates/tabang-komsaihack-2026.png`
  - Add the publishable copy of the Tabang certificate.
- `src/content/config.ts`
  - Add the optional structured About items and optional project certificate path.
  - Remove the obsolete top-level About certificate path after migration.
- `src/content/text/about/honors-and-learning.md`
  - Split DWIA and Tabang into distinct structured items.
- `src/content/text/projects/tabang.md`
  - Add the Tabang certificate path without changing unrelated project copy.
- `src/components/AboutSection.astro`
  - Render structured honor items, the optional semantic figure, and event-specific certificate links.
- `src/components/Projects.astro`
  - Render an optional project certificate action.
- `src/layouts/BlogPostLayout.astro`
  - Render the optional certificate action in the case-study header.
- `src/styles/global.css`
  - Add the compact media layout, faint grain overlay, theme filters, responsive behavior, and print handling.
- `references/INFO.md`
  - Clarify the DWIA photo and award certificate association.
- `references/PROJECTS.md`
  - Record the Tabang certificate and its Top 10 wording alongside the more specific placement claim.
- `DOCUMENTATION.md`
  - Document the new structured honor fields, asset locations, filter/grain values, and maintenance workflow.

## Implementation Sequence

1. Preserve the current user-owned asset move into `assets/`; do not restore or delete it.
2. Copy the DWIA photo and Tabang certificate to stable public paths.
3. Extend the strict content schema for repeated honor items and an optional project certificate.
4. Split the Honors & Learning content into independent DWIA and Tabang entries.
5. Attach the Tabang certificate to its project content.
6. Update the existing renderers to show optional media and certificate links without affecting entries that omit them.
7. Add the smallest necessary CSS for image sizing, subtle grain, theme matching, responsive layout, reduced motion, and print.
8. Update the canonical reference documents and maintainer documentation.
9. Run automated checks and perform browser verification.

## Acceptance Criteria

- Honors & Learning has one section heading and two visibly separate event entries.
- The DWIA certificate appears only with the DWIA award; the existing course-completion certificate remains with the Python training entry.
- The Tabang certificate appears with the Tabang honor and on Tabang project summaries/case study, never with DWIA.
- The DWIA photo uses the supplied image, remains uncropped and undistorted, and renders no wider than approximately 420px.
- The photo remains crisp and recognizable in both themes; its grain is faint and does not obscure faces, text, or the certificate being held.
- Image width and height are reserved before load, preventing layout shift.
- Every certificate is a text-only `View certificate ↗` link with a valid built asset target.
- Existing Libro, FaceLog, workshop, theme, keyboard, responsive, no-JavaScript, and print behavior remain intact.
- No dependency, JavaScript image effect, gallery, lightbox, modal, or new route is added.
- `npm run check`, `npm run build`, and `git diff --check` pass.

## Verification

### Automated

```sh
npm run check
npm run build
git diff --check
```

After building, confirm that every generated certificate URL resolves to a file under `dist/certificates/` and that the DWIA image exists under `dist/images/`.

### Manual

- Inspect Honors & Learning in dark and light modes at desktop and mobile widths.
- Confirm DWIA and Tabang read as separate events with the correct adjacent certificate.
- Confirm the DWIA photo preserves its natural aspect ratio, stays small, and has only a faint grain treatment.
- Toggle themes and verify the photo changes subtly without flashing or becoming muddy.
- Open every certificate link from the relevant About and project locations.
- Verify Libro and FaceLog have no empty or stray certificate action.
- Disable JavaScript and confirm all native content, image, and certificate links remain available.
- Inspect print preview and confirm the resume remains clean and within its intended pagination.
- Build once with a non-root `BASE_PATH` and verify all image and certificate links retain the prefix.

## Documentation Impact

Record the final image width, filter values, and grain opacity in `DOCUMENTATION.md`. Keep the event-to-asset mapping in `references/INFO.md` and `references/PROJECTS.md` so future content edits cannot accidentally associate the Tabang certificate with DWIA or vice versa.

## Out of Scope

- Editing faces, replacing the background, cropping, or regenerating the DWIA photo.
- Embedding certificate images or PDFs directly in the page.
- Adding a media gallery, carousel, modal, zoom viewer, or image-processing dependency.
- Changing the wording or evidence for unrelated honors, projects, education, or experience.
- Regenerating `public/resume.pdf` unless a later implementation explicitly includes a resume export update.

## Open Decisions

- Final light/dark filter values and grain opacity require visual tuning during implementation.
- If the CSS grain texture visibly reduces clarity at 420px or below, omit the grain and keep only the restrained theme filter; image legibility takes priority.
