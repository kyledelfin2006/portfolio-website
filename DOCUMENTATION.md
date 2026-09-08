# Portfolio developer and maintainer manual

This repository implements Aldrin Kyle Delfin’s portfolio according to `implementations/implementation.md`: a dark-first Harvard-style resume, an About page, and Markdown project case studies. The site is static, immediately readable, and usable without JavaScript. The only application browser behavior is the optional light/dark toggle.

## 1. Architecture and decisions

### Stack

| Package | Purpose |
| --- | --- |
| Astro 5 | Generate HTML for every route at build time; no application server is required. |
| TypeScript 5 | Strict component props and generated Markdown content types. |
| `@astrojs/check` (development only) | Required to run the blueprint’s `astro check` validation. |

Astro and TypeScript are the complete application dependency list. The checker is the single development dependency because Astro delegates its diagnostics to that package. Native CSS handles the reset, themes, layout, Markdown presentation, responsive behavior, and print output. `package-lock.json` pins the resolved dependency tree; use `npm ci` for reproducible installs.

### Rendering and content flow

1. `references/INFO.md` and `references/PROJECTS.md` are the factual sources of truth for personal and project claims. Update them before publishing a new claim.
2. `src/content/text/` is the source of truth for the visitor-facing wording derived from those facts.
3. Astro validates every publishable Markdown file against the strict, category-discriminated Zod schema in `src/content/config.ts`.
4. Components query repeatable categories, sort by numeric `order` and filename, and render Markdown bodies natively.
5. `[slug].astro` creates one static case-study route per file in `src/content/text/projects/`; the filename is the route slug.
6. Required singleton files are loaded by exact ID and fail the build with a named-file error when missing.
7. `ResumeLayout.astro` supplies the common document and presentation while its metadata, header, controls, and footer labels come from Markdown.

No React, component library, global state manager, backend, contact form service, animation library, analytics, remote fonts, or generated illustration is used. Navigation is native anchor navigation. Contact opens the visitor’s email client.

### Theme and accessibility

The HTML starts with `class="dark"`. A small inline script reads the saved `theme` preference before body rendering to avoid a light-theme flash. The button writes only `dark` or `light` to local storage. Storage failures are caught; the toggle still works for the current page. The button is hidden when JavaScript is unavailable, while all content and navigation remain available.

Theme changes use a temporary `theme-transition` class for a 220ms CSS cross-dissolve and palette transition. Rapid clicks are parity-queued, and an `animationend` listener with a bounded fallback always clears the temporary state. In light mode, the portrait uses `brightness(1.12) contrast(.94)`; dark mode and print explicitly restore the unfiltered image. Visitors who prefer reduced motion receive the final theme immediately with animation and transitions disabled.

The toggle has a descriptive accessible name and `aria-pressed` state, both synchronized as soon as the theme changes. The page includes a keyboard skip link, visible focus outlines, semantic sections, image alternative text, and an active navigation indication. Links that open a new tab use `noopener noreferrer`. The portrait reserves its dimensions to prevent layout shift.

## 2. Repository anatomy

```text
portfolio-website/
├── implementations/
│   ├── implementation.md          Root implementation guidelines
│   └── ponytail-refactor.md       Tailwind-removal refactor record
├── DOCUMENTATION.md               This maintainer manual
├── README.md                      Quick start
├── .gitignore                     Excludes dependencies, builds, local settings, and QA scratch files
├── package.json                   Dependencies and four npm commands
├── package-lock.json              Reproducible dependency versions
├── astro.config.mjs               Static output, base path, and site origin
├── tsconfig.json                  Strict Astro TypeScript settings
├── references/                    Canonical personal/project facts and the source photo
│   ├── INFO.md                    Personal identity, roles, skills, and learning goals
│   ├── PROJECTS.md                Extensible catalog of verified project facts
│   ├── certificates/              Original certificate PDFs used as evidence
│   └── 1x1.png                    Original supplied portrait
├── public/
│   ├── 1x1-bw.jpg                  Clean black-and-white portfolio portrait
│   ├── certificates/              Public certificate PDFs linked from content
│   ├── favicon.ico                 Small icon derived from the supplied portrait
│   └── resume.pdf                  One-page A4 export of the resume
├── src/
│   ├── content/
│   │   ├── config.ts              Strict schemas for every text category
│   │   ├── load.ts                Required singleton and ordered-entry lookups
│   │   └── text/                  All publishable visitor-facing text
│   │       ├── site.md            Shared identity, navigation, controls, and link labels
│   │       ├── pages/             Required home, About, and projects page copy
│   │       ├── about/             Ordered About sections
│   │       ├── education/         Ordered education entries
│   │       ├── experience/        Ordered experience entries
│   │       ├── skills/            Ordered skill groups
│   │       ├── workshops/         Ordered workshops and certifications
│   │       └── projects/          Ordered summaries and full case studies
│   ├── components/
│   │   ├── Header.astro           Navigation, name, contact links, portrait
│   │   ├── ThemeToggle.astro      Optional theme preference control
│   │   ├── SectionHeading.astro   Shared title and thin rule
│   │   ├── Education.astro        University and degree
│   │   ├── Experience.astro       FlyRank, DevGuild, DataCamp
│   │   ├── Projects.astro         Ordered project summaries and links
│   │   ├── Skills.astro           Plain categorized skill list
│   │   └── Workshops.astro        Shared workshop rendering
│   ├── layouts/
│   │   ├── ResumeLayout.astro     HTML document, SEO, theme initialization, footer
│   │   └── BlogPostLayout.astro   Project heading, source link, Markdown prose
│   ├── pages/
│   │   ├── index.astro            Resume
│   │   ├── about.astro            Background, principles, learning, honors, contact
│   │   └── projects/
│   │       ├── index.astro        Project index
│   │       └── [slug].astro       Statically generated case studies
│   └── styles/
│       └── global.css             Design tokens, document layout, mobile and print rules
├── .astro/                        Generated content types and cache; ignored
├── node_modules/                  Installed packages; ignored
├── dist/                          Deployable output; ignored
└── tmp/qa/                        Local verification script, results, screenshots; ignored
```

## 3. Content editing

All published copy lives in `src/content/text/` as Markdown. Never add biography, labels, metadata descriptions, skills, bullets, or other editorial text to Astro or TypeScript files.

### Categories and required frontmatter

| Directory/file | `category` | Required fields beyond `category` |
| --- | --- | --- |
| `site.md` | `site` | `fullName`, `shortName`, `professionalSubtitle`, `location`, `email`, `portraitAlt`, `navigationAriaLabel`, `navigation`, `profiles`, `theme`, `skipLink`, `downloadResume`, `projectLinks`, `credentialLink` |
| `pages/home.md` | `page-home` | `title`, `description`, `sections` |
| `pages/about.md` | `page-about` | `title`, `description`, `workshopsHeading`, `workshopsAriaLabel`, `workshopsOrder` |
| `pages/projects.md` | `page-projects` | `title`, `description`, `eyebrow`, `sectionHeading`, `sectionAriaLabel`; body is the introduction |
| `about/*.md` | `about` | `title`, `order`; optional `itemTitle`, `meta`, `certificatePath`, `contactPrompt`, `resumeLink`; body is section prose |
| `education/*.md` | `education` | `title`, `order`, `meta`, `subtitle`; body is supporting detail |
| `experience/*.md` | `experience` | `title`, `order`, `organization`; body contains bullets |
| `skills/*.md` | `skill` | `title`, `order`; body contains the skill list |
| `workshops/*.md` | `workshop` | `title`, `order`, `issuerOrOrganizer`; optional `date`, `certificatePath`; body contains takeaways |
| `projects/*.md` | `project` | `title`, `order`, `description`, `projectCategory`, `stack`, `repository`, `highlights`; optional `date`; body is the case study |

URLs must be absolute and valid. Orders are nonnegative integers. Required strings and arrays cannot be empty. Unknown optional facts should be omitted, not represented by empty strings. Invalid fields, misspelled categories, incompatible frontmatter, and missing singleton files fail `npm run check` or `npm run build`.

### Add, edit, reorder, rename, or delete

- Edit shared identity, navigation, theme, footer, contact, and reusable action labels in `site.md`. Edit a page singleton in place for its title, SEO description, introduction, or section labels.
- Add repeatable content by copying a file in the appropriate directory, giving it a lowercase kebab-case filename, changing its content, and setting `order`. No component or TypeScript edit is needed.
- Reorder an item by changing `order`. Equal orders use filenames as a deterministic tie-breaker.
- Delete an item by deleting its Markdown file. Its rendered entry disappears automatically.
- Rename any repeatable file to change its stable content identifier. For projects, the filename is also the route slug: `projects/my-project.md` produces `/projects/my-project/`. Renaming or deleting it removes the old route at the next build, so arrange a host redirect for an already-published URL when needed.

After every content change, run `npm run check` and `npm run build`. For projects, verify the generated route and both project lists. For resume entries, inspect mobile wrapping and print pagination.

### Grounding decisions

The source notes confirm the second-year degree status, internship title, COO position, 25+ community size, scholarship, project capabilities, completion of DICT Region VI’s 40-hour Python Programming Essentials Training, and the Most Analytical Programmer award. They do not provide employment dates, scholarship dates, completed DataCamp tracks, individual verification URLs, GPA, or academic distinctions. Those claims are omitted. The sample scholarship dates and completion claim in the blueprint were placeholders, not verified personal records.

The Tabang tags describe its responsibilities rather than inventing a framework stack. Case-study explanations expand the supplied capabilities with engineering rationale; they do not claim repository code inspection, performance benchmarks, or production adoption. Add deeper implementation details when the owner supplies evidence.

## 4. Assets and PDF maintenance

### Portrait and favicon

Replace `public/1x1-bw.jpg` with an authentic, square black-and-white portrait. Keep the treatment neutral and restrained: clear facial detail, balanced exposure, natural skin texture, and no dramatic filters or decorative effects. CSS renders it at 80 × 80 CSS pixels below 640px and 112 × 112 above that breakpoint. On paper it is 25.4 × 25.4mm, or one inch square. Check that the face remains clearly visible at every size, and keep explicit width and height attributes in the header.

The favicon is derived from the same photo. Replace `public/favicon.ico` when changing the portrait, or provide another authentic icon. No font download or external image service is involved.

### Generate or replace the PDF

`public/resume.pdf` is a static asset; rebuilding the website does **not** regenerate it. The included PDF was exported from this site’s print stylesheet and visually reviewed as one A4 page.

To update it:

1. Complete the resume content edits and run `npm run dev`.
2. Open the homepage in Chrome or Edge and use **Print → Save as PDF**.
3. Choose A4, portrait, 100% scale, and disable the browser’s headers and footers. Let the stylesheet’s margins apply; inspect the preview before saving.
4. Save to `public/resume.pdf`, replacing the previous export. Alternatively, copy an owner-supplied finished resume into that path.
5. Open the actual saved PDF, inspect every page, and confirm the portrait, links, final section, and page count. More content may require a second page; reduce copy before reducing readable type.
6. Rebuild so the current PDF is copied into `dist/`. Check both the footer download and About page view link.

For automated exports, use a local Chromium printing tool with `preferCSSPageSize: true`, print media, and `printBackground: true`. Browser automation is a QA tool, not an application dependency. The included export removes localhost link targets while preserving external contact links. Generate from the final deployment origin if you need internal project links to remain clickable in a future PDF.

## 5. Development and checks

Use Node.js 22.12+ (validated with 24.15) and npm. In the repository root:

```sh
npm ci
npm run dev
```

Follow the local URL printed by Astro, normally `http://localhost:4321/`. The development toolbar is disabled to keep the preview aligned with the document design.

| Command | Result |
| --- | --- |
| `npm run dev` | Local server with live reload. |
| `npm run check` | Astro diagnostics and strict TypeScript validation. |
| `npx astro check` | Equivalent direct checker invocation. |
| `npm run build` | Static production HTML and assets in `dist/`. |
| `npm run preview` | Serve the production build locally. Run the build first. |

`build` does not replace the separate type check. Run both before deployment. Do not edit `dist/` directly.

If a restricted environment blocks Astro’s telemetry configuration directory, disable telemetry for that shell:

```powershell
$env:ASTRO_TELEMETRY_DISABLED = '1'
```

On POSIX shells use `export ASTRO_TELEMETRY_DISABLED=1`. A Windows `spawn EPERM` from Vite indicates a subprocess permission problem; allow the normal build tools to execute rather than editing content to work around it.

### Verification completed

On September 8, 2026:

- `astro check`: 0 errors, 0 warnings, 0 hints across 19 Astro/TypeScript files.
- Static build: all six expected HTML routes generated.
- Browser checks: six routes at 360, 375, 414, 768, 1440, and 3840px; no horizontal overflow.
- Theme defaults, toggle, persistence through reload/navigation, and blocked storage behavior passed.
- Content and native navigation worked with JavaScript disabled.
- All nine distinct local navigation/asset targets passed HTTP checks; no page JavaScript errors.
- GitHub Pages base-path build: six pages and 58 local references passed prefix, target-file, and canonical-origin checks.
- Dark resume, light About, case-study, mobile, and saved PDF output visually reviewed.
- Print controls hidden, black ink on white, portrait visible, one-page A4 resume.

Temporary QA outputs are in ignored `tmp/qa/` locally. Future editors should repeat relevant checks after content or layout changes; they need not add a browser testing dependency to the production project.

### Dependency audit

The September 8, 2026 dependency refactor removed Tailwind, its Astro integration, its Typography plugin, and 73 transitive packages. `npm audit` then reported zero known vulnerabilities. Re-run the audit when dependencies change; do not assume that result remains current.

## 6. Design and print standards

### Exact tokens

| Token | Dark | Light | Print |
| --- | --- | --- | --- |
| Canvas | `#0a0a0a` | `#ffffff` | `#ffffff` |
| Main ink | `#f5f5f5` | `#111111` | `#000000` |
| Muted text | `#a3a3a3` | `#525252` | `#333333` |
| Rules | `#262626` | `#d4d4d4` | `#777777` |
| Links | `#e5e5e5` | `#262626` | `#000000` |

All visible typography uses `"Times New Roman", Times, "Nimbus Roman No9 L", serif`; no web font requests. The container is 896px including padding, providing an 832px desktop reading area. Padding is 16px horizontally/32px vertically on small screens, 32px/48px at 640px, and 64px vertically at 768px.

| Element | Screen typography |
| --- | --- |
| Main resume body | 16px, line-height 1.45 |
| About and case-study prose | 16px, line-height 1.6 |
| Name | 32px desktop / 28px mobile, bold, line-height 1.15 |
| Identity subtitle | 15px italic |
| Section title | 16px bold uppercase, letter-spacing .07em |
| Role/project title | 16px bold |
| Date, links, metadata | 14px |
| Eyebrow | 13px uppercase, letter-spacing .08em |
| Case-study title | 36px bold |
| Case-study introduction | 18px, line-height 1.6 |
| Markdown section heading | 22px |

Resume sections have 34px gaps; list entries have 20px gaps. Rules are 1px. Links use a 3px underline offset and a 150ms opacity transition. Reduced-motion preference removes that transition. There are no entrance animations, hidden sections, carousels, or synthetic visual assets.

Below 640px, the header stacks with the portrait above the identity and aligned right. Split rows become columns so labels and metadata cannot collide. At larger widths the portrait anchors upper right and row metadata aligns right.

### Print engine

The `@media print` block in `global.css` overrides both themes with a white canvas and black text. It hides `.no-print` and the skip link, removes outer screen padding, preserves the photo, restores horizontal split rows, and removes link decoration. `@page` sets A4 and 12mm top/bottom, 14mm side margins.

Print body type is 10pt with 1.25 line height; section headings are 11pt, name 22pt, and metadata 9pt. Section gaps reduce to 15px and entry gaps to 9px. Resume sections and entries avoid internal page breaks; headings avoid separation from following content. Blog articles remain allowed to span pages. Paragraphs and list items use two-line widow/orphan control.

## 7. Deployment and CI/CD

This implementation supplies a local working site and deployment instructions. No remote deployment or repository push is needed for the blueprint’s implementation phases. Publish the generated `dist/` directory when a hosting destination is selected.

### Origin and base path

`astro.config.mjs` reads two build-time environment variables:

- `SITE_URL`: your actual origin, such as `https://kyledelfin2006.github.io`. Enables canonical and Open Graph URL metadata. Omitted locally to avoid an invented production URL.
- `BASE_PATH`: `/` by default; use `/portfolio-website/` for a GitHub project site.

All application-owned internal navigation, photo, favicon, and PDF URLs use `import.meta.env.BASE_URL`. Keep leading and trailing slashes when configuring a subdirectory. Markdown-authored internal links need the same care.

Example PowerShell build for a GitHub project site:

```powershell
$env:SITE_URL = 'https://kyledelfin2006.github.io'
$env:BASE_PATH = '/portfolio-website/'
npm run check
npm run build
npm run preview
```

Open the prefixed path printed by preview. Clear those environment variables, or set `BASE_PATH` back to `/`, before building for a root-domain host.

### GitHub Pages

1. Push the source, public assets, and lockfile to the intended GitHub repository.
2. In **Settings → Pages**, select **GitHub Actions** as the source.
3. Use the workflow from the [official Astro GitHub Pages deployment guide](https://docs.astro.build/en/guides/deploy/github/). Configure its production branch to match the repository.
4. Set `SITE_URL` and `BASE_PATH` as above in the build job environment. A user site or custom domain uses `/` as the base.
5. Ensure the build job runs `npm ci`, `npm run check`, and `npm run build`, then uploads `dist/` with the Pages artifact action. The deployment job needs `pages: write` and `id-token: write` permissions and the `github-pages` environment.
6. Trigger checks on pull requests; restrict the deployment job to the chosen production branch or a manual dispatch. This avoids publishing a PR build by accident.
7. Open the deployed resume, About page, every project route, and PDF. Verify deep-link refreshes and prefixed assets. The provided configuration emits directory `index.html` files with trailing-slash navigation.

### Cloudflare Pages

1. Connect the repository in Cloudflare Pages and select the production branch.
2. Use the Astro framework preset, repository root as the build root, `npm run check && npm run build` as the build command, and `dist` as the output directory.
3. Set `NODE_VERSION` to `24.15.0` (or another compatible supported version), `SITE_URL` to the actual Pages/custom origin, and `BASE_PATH` to `/`.
4. Let Git integration rebuild on production pushes and use preview deployments for other branches.
5. Verify all routes and assets on the deployed origin. Set a custom domain through the host’s domain settings when desired.

No Cloudflare adapter, Worker, database, or runtime secret is required for this static output. See the [official Cloudflare Pages Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/).

### Release checklist

Run the checker and production build, update the PDF if resume content changed, inspect a narrow viewport and print preview, verify local links and the hosting base path, and review dependency advisories. Publish only the intended static output; never upload `references/`, `node_modules/`, or temporary QA files as website assets.
