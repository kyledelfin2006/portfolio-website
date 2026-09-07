# Portfolio developer and maintainer manual

This repository implements Aldrin Kyle Delfin’s portfolio according to `implementations/implementation.md`: a dark-first Harvard-style resume, an About page, and Markdown project case studies. The site is static, immediately readable, and usable without JavaScript. The only application browser behavior is the optional light/dark toggle.

## 1. Architecture and decisions

### Stack

| Package | Purpose |
| --- | --- |
| Astro 5 | Generate HTML for every route at build time; no application server is required. |
| TypeScript 5 | Strict component props, typed workshop data, and generated project types. |
| `@astrojs/check` (development only) | Required to run the blueprint’s `astro check` validation. |

Astro and TypeScript are the complete application dependency list. The checker is the single development dependency because Astro delegates its diagnostics to that package. Native CSS handles the reset, themes, layout, Markdown presentation, responsive behavior, and print output. `package-lock.json` pins the resolved dependency tree; use `npm ci` for reproducible installs.

### Rendering and content flow

1. Astro validates `src/content/projects/*.md` against the Zod schema exported by `src/content/config.ts`.
2. `Projects.astro` queries the collection and sorts entries by `order`. The same component serves the resume and project index.
3. `[slug].astro` generates a static route for each Markdown entry and renders it through `BlogPostLayout.astro`.
4. `ResumeLayout.astro` supplies the common document, metadata, header, stylesheet, and footer.
5. `Workshops.astro` reads one typed array for both the resume and About page.
6. `astro build` produces six HTML pages plus stylesheet and public assets in `dist/`.

No React, component library, global state manager, backend, contact form service, animation library, analytics, remote fonts, or generated illustration is used. Navigation is native anchor navigation. Contact opens the visitor’s email client.

### Theme and accessibility

The HTML starts with `class="dark"`. A small inline script reads the saved `theme` preference before body rendering to avoid a light-theme flash. The button writes only `dark` or `light` to local storage. Storage failures are caught; the toggle still works for the current page. The button is hidden when JavaScript is unavailable, while all content and navigation remain available.

The toggle has a descriptive accessible name and `aria-pressed` state. The page includes a keyboard skip link, visible focus outlines, semantic sections, image alternative text, and an active navigation indication. Links that open a new tab use `noopener noreferrer`. The portrait reserves its dimensions to prevent layout shift.

## 2. Repository anatomy

```text
portfolio-website/
├── implementations/
│   ├── implementation.md          Root implementation guidelines
│   └── ponytail-refactor.md       Tailwind-removal refactor record
├── DOCUMENTATION.md               This maintainer manual
├── README.md                      Quick start
├── .gitignore                     Excludes references, dependencies, builds, and QA scratch files
├── package.json                   Dependencies and four npm commands
├── package-lock.json              Reproducible dependency versions
├── astro.config.mjs               Static output, base path, and site origin
├── tsconfig.json                  Strict Astro TypeScript settings
├── references/                    Original biography, project notes, photo; ignored by Git
├── public/
│   ├── 1x1-bw.jpg                  Clean black-and-white portfolio portrait
│   ├── favicon.ico                 Small icon derived from the supplied portrait
│   └── resume.pdf                  One-page A4 export of the resume
├── src/
│   ├── content/
│   │   ├── config.ts              Zod schema and project collection declaration
│   │   └── projects/
│   │       ├── libro.md           Book API case study
│   │       ├── tabang.md          Flood-response case study
│   │       └── facelog.md         Offline attendance case study
│   ├── data/
│   │   └── workshops.ts           WorkshopEntry interface and editable array
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

### Add a project case study

1. Create `src/content/projects/my-project.md`. Use a lowercase, hyphen-separated filename; it becomes `/projects/my-project/`.
2. Add frontmatter matching the schema. The following is a template, not a real credential or project:

```yaml
---
title: My Project
description: A concise, factual explanation of the project.
category: Backend application
date: '2026' # Optional; omit if unconfirmed.
stack: [Java, PostgreSQL]
repository: https://github.com/your-account/your-repository
order: 4
highlights:
  - A verified capability or contribution.
  - A second concrete implementation detail.
---
```

3. Below the frontmatter, write Markdown sections beginning with `##`. Explain the problem, workflow, architecture, and decisions. The layout already renders the project title; do not add another top-level heading.
4. Set a distinct nonnegative integer `order` to control the sequence on both lists. `date` is display text, not a parsed date. `repository` must be a valid URL. All other fields are required.
5. Run `npm run check` and `npm run build`. Verify the new route, both lists, mobile wrapping, and print pagination. No routing edits are needed.

Changing a filename changes the route. Preserve published filenames unless you also configure a redirect with your host. Use absolute external URLs and prefix site-local links with the deployment base path when authoring raw HTML.

### Add workshops or certifications

Edit `src/data/workshops.ts` and append an object to `workshops`:

```typescript
{
  title: 'Exact title from the credential',
  issuerOrOrganizer: 'Verified issuing organization',
  date: 'September 2026',
  certificateUrl: 'https://issuer.example/verify/credential-id',
  keyTakeaways: ['One specific skill or learning outcome.'],
},
```

Replace the example URL with a real credential before publishing. `title`, `issuerOrOrganizer`, and `date` are strings; use an empty date when it is unknown. `certificateUrl` and `keyTakeaways` are optional. An omitted URL produces no verification link; omitted or empty takeaways produce no list. Entries render in array order on both pages.

Keep entries in simple split rows with optional bullets. Do not add filters, certificate galleries, or modals. A program homepage is not proof of an individual credential.

### Update biography, experience, and skills

Edit the narrative sections directly in `src/pages/about.astro`. Maintain the professional background, engineering philosophy, technical direction, workshops, honors, and contact structure. Edit `Education.astro`, `Experience.astro`, and `Skills.astro` for resume details. Update both biography and resume when a role or year changes.

Identity/contact changes belong in `Header.astro`; check metadata in `ResumeLayout.astro` and each page as well. Use only **Aldrin Kyle Delfin** or **Kyle Delfin** in generated source, content, metadata, and documentation.

### Grounding decisions

The source notes confirm the second-year degree status, internship title, COO position, 25+ community size, scholarship, and project capabilities. They do not provide employment dates, scholarship dates, completed DataCamp tracks, individual verification URLs, GPA, or academic distinctions. Those claims are omitted. The sample scholarship dates and completion claim in the blueprint were placeholders, not verified personal records.

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
