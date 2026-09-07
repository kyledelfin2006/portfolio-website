# Root Implementation Guidelines

## Purpose

This document is the permanent implementation policy for the portfolio website. It is not a plan for one feature. Every future feature, redesign, refactor, content system, or technical change must be governed by:

1. this root document; and
2. a feature-specific plan stored in this directory.

The root guidelines define the rules that always apply. A feature plan defines the purpose, scope, decisions, acceptance criteria, and verification for one specific change.

## Authority and Precedence

Apply implementation instructions in this order:

1. The website owner's current, explicit request.
2. Repository-level contributor or agent instructions.
3. This root implementation document.
4. The applicable feature-specific implementation plan.
5. Existing conventions in the codebase.

A feature plan may add stricter or more specific requirements, but it must not silently weaken or contradict this root document. If a requested feature genuinely requires an exception, record the exception and its reason in the feature plan before coding. When requirements conflict or remain materially ambiguous, stop and obtain a decision instead of choosing an irreversible direction.

## Implementation Plan Structure

Store every feature plan under `implementations/` using a descriptive kebab-case filename:

```text
implementations/
├── implementation.md
├── project-search.md
├── contact-form.md
└── accessibility-audit.md
```

Do not create a feature plan for trivial content corrections that introduce no new behavior, structure, dependency, or design decision. Any non-trivial feature must have a plan before implementation begins.

Each feature plan must contain:

```markdown
# Feature Name

## Status
Proposed | Approved | In Progress | Implemented | Superseded

## Objective
What user or business outcome this feature must produce.

## Context and Source of Truth
The request, content, references, and existing code that ground the work.

## In Scope
Exact behavior and deliverables included.

## Out of Scope
Related work intentionally excluded.

## Requirements and Decisions
Functional, content, design, accessibility, data, and technical rules.

## Files and Integration Points
Expected files, routes, components, assets, schemas, and external interfaces.

## Implementation Sequence
Small, ordered, independently verifiable stages.

## Acceptance Criteria
Observable conditions that define completion.

## Verification
Automated checks and focused manual checks.

## Documentation Impact
Documentation that must be created or updated.

## Exceptions or Open Decisions
Approved deviations from this root document and unresolved decisions.
```

Plans must describe outcomes and constraints rather than prescribe large blocks of code. Update a plan when the approved scope changes. Once work is complete, mark it `Implemented` and ensure it describes the behavior that was actually delivered.

## Core Engineering Regulations

### 1. Keep the implementation necessary and proportionate

- Follow YAGNI: build only behavior required by the approved feature plan.
- Prefer the smallest clear solution that satisfies all acceptance criteria.
- Do not add speculative settings, generic frameworks, configuration layers, or future-facing extension points.
- Do not refactor unrelated code unless it is required for correctness or safe integration. Record any required adjacent refactor in the feature plan.

### 2. Preserve the existing architecture

- The website remains a static Astro and TypeScript project unless a feature plan contains an explicitly approved architectural change.
- Use strict TypeScript and keep data contracts explicit at content and component boundaries.
- Prefer Astro, semantic HTML, and CSS for static presentation. Add client-side JavaScript only when user-visible behavior requires it.
- Keep content, data, layout, and reusable presentation concerns separated according to the existing `src/content`, `src/data`, `src/layouts`, `src/components`, and `src/pages` structure.
- Reuse an existing component when it already represents the same concept. Create a component when reuse or isolation is concrete, not hypothetical.

### 3. Control dependencies

- Prefer platform features and already-installed packages.
- Add a dependency only when it materially reduces risk or complexity and cannot reasonably be replaced by a small local implementation.
- A feature plan must name and justify every new runtime dependency.
- Do not introduce a UI component library, global state manager, animation framework, or backend service without explicit approval.
- Remove abandoned imports and configuration introduced by the feature.

### 4. Protect content accuracy

- Treat `references/` and owner-approved content as the source of truth for personal, professional, and project claims.
- Do not invent employers, roles, dates, qualifications, metrics, project capabilities, awards, testimonials, or contact details.
- Use **Aldrin Kyle Delfin** or **Kyle Delfin** as appropriate. The nickname **“Elyk” must never appear** in the website, source, metadata, or documentation.
- Do not publish placeholder copy, fake links, fake credentials, synthetic logos, or AI-generated personal imagery as real content.
- Keep user-editable recurring content in the appropriate content collection or typed data file rather than duplicating it across pages.

### 5. Maintain the visual character

- Preserve the portfolio's document-like, Harvard resume-inspired visual language unless an approved feature plan changes it.
- Default to the established Times New Roman serif typography, restrained spacing, high contrast, thin dividers, and single-column reading flow.
- Preserve dark mode as the default, a usable light mode, and clean black-on-white print output.
- Favor immediate readability over decorative effects. Avoid scroll-triggered animation, layout-shifting effects, visual noise, and hidden essential information.
- Use responsive layouts that work from narrow mobile screens through large desktops without horizontal overflow.
- Use authentic project or personal assets when available. Decorative imagery must have a clear purpose and an approved source.

### 6. Meet accessibility and usability requirements

- Use semantic landmarks and native elements before ARIA or custom controls.
- Ensure full keyboard access, visible focus states, meaningful link and button labels, and logical heading order.
- Provide useful alternative text for informative images and empty alternative text for purely decorative images.
- Maintain readable text sizing and sufficient color contrast in dark, light, hover, focus, and print states.
- Respect reduced-motion preferences whenever motion is introduced.
- Avoid unexpected navigation, autoplay, traps, or interactions that depend only on hover, color, or pointer precision.

### 7. Protect performance, privacy, and security

- Keep pages statically renderable wherever possible and avoid unnecessary client-side hydration.
- Optimize assets for their display size and prevent avoidable layout shift.
- Do not expose secrets, private data, unpublished personal information, or environment values in client code or repository files.
- Treat external content as untrusted. Validate inputs and safely encode rendered values.
- External links opened in a new tab must use safe `rel` attributes.
- Do not add analytics, tracking, cookies, external fonts, third-party embeds, or network services without explicit approval and documented privacy impact.

### 8. Keep changes maintainable

- Follow the existing naming, formatting, routing, and file-placement conventions.
- Use descriptive names and comments only where intent is not evident from the code.
- Do not leave dead code, commented-out alternatives, unexplained temporary workarounds, or obsolete feature flags.
- Keep commits and patches focused on the approved feature; preserve unrelated user changes.
- Update `DOCUMENTATION.md` when a feature changes architecture, commands, dependencies, content workflows, assets, routes, deployment, or maintenance procedures.

## Required Implementation Workflow

### Before coding

1. Read this root document completely.
2. Read the applicable feature plan completely.
3. Inspect the current implementation and relevant source material; do not assume the plan still matches the code.
4. Check the working tree and preserve unrelated changes.
5. Resolve material conflicts, missing source content, and decisions that could substantially change the result.
6. Confirm that the feature's acceptance criteria are testable.

### During coding

1. Implement only the approved scope.
2. Work in small coherent stages and validate risky integration points early.
3. Keep the feature plan current when approved requirements or technical decisions change.
4. Preserve existing behavior unless the plan explicitly replaces it.
5. Add or update documentation alongside the behavior it describes.

### Before declaring completion

1. Review the final diff for scope, content accuracy, dead code, accidental file changes, and exposed secrets.
2. Run the repository's standard automated checks:

   ```sh
   npm run check
   npm run build
   ```

3. Run any additional tests named by the feature plan.
4. Manually verify affected routes and states at relevant mobile and desktop widths.
5. When presentation changes, verify dark mode, light mode, keyboard focus, and print output where applicable.
6. Confirm all acceptance criteria with evidence; do not treat a successful build alone as feature completion.
7. Update the feature plan status to `Implemented` and record any approved deviations.

If an existing unrelated failure prevents a check from passing, identify it clearly and distinguish it from failures introduced by the feature. Never hide, delete, or weaken a check merely to report success.

## Definition of Done

A feature is complete only when:

- its implementation matches this root document and its feature-specific plan;
- every in-scope acceptance criterion is satisfied;
- automated and manual verification appropriate to the change has been completed;
- no known regression, placeholder, secret, or unexplained warning was introduced;
- affected documentation and content instructions are current;
- the feature plan accurately reflects the delivered result and is marked `Implemented`.

## Changing These Root Guidelines

Changes to this file are governance changes, not ordinary feature edits. They must be intentional, narrowly explained, and approved by the website owner. A feature implementation must not modify this root document merely to make its own approach compliant.
