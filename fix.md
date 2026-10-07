# GitHub Pages Deployment Recovery Plan

## Verified status

- `https://kyledelfin2006.github.io/` and `https://kyledelfin2006.github.io/portfolio-website/` currently return GitHub Pages 404 pages.
- The local production build succeeds and generates six routes: Main, About, Projects, and three project case studies. `npm run check` reports no errors, warnings, or hints.
- The production preview renders all six routes at 320px without horizontal overflow, broken images, or browser console errors.
- The repository has no tracked GitHub Pages Actions workflow. `astro.config.mjs` defaults `BASE_PATH` to `/` unless the build environment overrides it.

## Diagnosis

The source site builds successfully; the confirmed failure is publication availability. There is no repository workflow to build and publish `dist/` through GitHub Pages. A GitHub project site also needs the `/portfolio-website/` base path so generated navigation and assets resolve beneath the project URL.

The project site’s target URL is `https://kyledelfin2006.github.io/portfolio-website/`. The root URL `https://kyledelfin2006.github.io/` is a separate user-site address; deploying this repository as a project site will not make the root URL serve it. To use the root address, configure a GitHub user-site repository or a custom domain separately.

## Recovery steps

1. In the repository’s **Settings → Pages**, select **GitHub Actions** as the publishing source.
2. Add a workflow under `.github/workflows/` that runs on pull requests for validation and on pushes to `main` for production deployment. Use the official Astro/GitHub Pages deployment actions.
3. In the workflow, install the locked dependencies with `npm ci`, then run `npm run check` and `npm run build` before upload/deploy. Set the workflow permissions required by GitHub Pages deployment (`pages: write` and `id-token: write`), and keep deployment restricted to `main`.
4. Set the build environment to `SITE_URL=https://kyledelfin2006.github.io` and `BASE_PATH=/portfolio-website/`. These are public URL settings, not secrets.
5. Upload the generated `dist/` directory as the Pages artifact and deploy it with the Pages deployment action.

## Acceptance checks

- The Actions validation and deploy jobs complete successfully for `main`.
- The project site homepage, About, Projects, Libro, Tabang, FaceLog, images, certificates, and `/portfolio-website/resume.pdf` return successfully.
- Navigation, styles, scripts, and images use the `/portfolio-website/` prefix; direct refreshes on nested routes work.
- Confirm dark/light themes and 320px layout on the deployed project URL.
- Leave `references/CURRENT_RESUME.pdf` and `public/resume.pdf` unchanged as part of this deployment recovery.

## Scope

This file records the diagnosis and recovery plan only. It does not add a workflow, change GitHub Pages settings, deploy the site, or modify either resume PDF.
