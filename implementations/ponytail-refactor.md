# Ponytail Dependency Refactor

## Status

Implemented

## Objective

Remove unnecessary styling dependencies while preserving the portfolio's current appearance and behavior.

## Context and Source of Truth

The site uses handwritten CSS throughout. Tailwind and its Typography plugin are retained only for the project case-study wrapper, which native CSS can cover directly.

## In Scope

- Remove Tailwind, its Astro integration, and its Typography plugin.
- Replace the generated reset and Markdown styles with the minimum native CSS used by the site.
- Remove the empty-string workshop date workaround.
- Update affected maintenance documentation.

## Out of Scope

- Visual redesigns, content rewrites, route changes, and component restructuring.

## Requirements and Decisions

- Preserve dark/light themes, responsive layout, print output, and accessible controls.
- Add no replacement dependency.
- Keep existing content components because they provide useful page boundaries or concrete reuse.

## Files and Integration Points

`astro.config.mjs`, `package.json`, `package-lock.json`, `src/styles/global.css`, `src/layouts/BlogPostLayout.astro`, `src/data/workshops.ts`, and `DOCUMENTATION.md`.

## Implementation Sequence

1. Replace Tailwind-specific classes and CSS with native rules.
2. Remove the integration, configuration, and packages.
3. Update documentation and verify the site.

## Acceptance Criteria

- No Tailwind code or dependency remains.
- All routes type-check and build.
- Project Markdown, themes, responsive layout, and print styles remain usable.

## Verification

Run `npm run check` and `npm run build`, then inspect the generated CSS and affected pages.

## Documentation Impact

Update architecture, repository anatomy, dependency guidance, and typography notes in `DOCUMENTATION.md`.

## Exceptions or Open Decisions

None.
