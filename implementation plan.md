# Implementation Plan

## Goal

Reorder and curate the About page, remove its Learning and Technical Focus & Direction sections, update two Main-page honors details, and make the provided current resume the site’s printable/downloadable PDF.

## About page

- Set the About page order to **About Me → Technical Skills → Certifications & Workshops → Engineering Philosophy**, followed by the existing Resume & Contact section.
- Remove Learning from the About page and remove Technical Focus & Direction; delete their About-only renderers/content when no longer referenced.
- Build an About-specific skills catalog rather than reusing or mirroring the Main page’s `skills/*.md` data or `Skills.astro`. Curate it from verified About copy and project/profile references; keep its current focus on Java 21+, Spring Boot, PostgreSQL/MySQL/SQLite, Docker, Python desktop applications, automated testing, and API documentation.
- Add actual high-resolution vector logos beside individual About skill names where official icons are available and permitted. Prefer local SVG assets so they stay sharp, preserve visible text labels for every skill, use text-only fallback when there is no suitable icon, and avoid a runtime CDN or new dependency. Check each icon’s individual license and brand terms.
- Add the About-specific section ID, data schema/content, and renderer; update About heading/accessible-label fields and maintainer documentation. Leave Main-page skill data and rendering unchanged.

## Main page honors

- Change the RSTW honor metadata to exactly `October 2026`.
- Change the UPV KomsaiHack honor title to exactly `UPV KomsaiHack 2026: Risk Ready Finalist` and its summary to: “Tabang, our flood reporting and response application for Aklan, secured a spot in the Top 10 among teams from across Western Visayas at UPV KomsaiHack 2026.”
- Change the Most Analytical Programmer summary to: “Recognized during DICT Region VI’s Python Programming Essentials Training for analytical reasoning, problem-solving, OpenCV, Matplotlib, Pandas, data structures.”
- Keep honor facts in `references/INFO.md` and `references/PROJECTS.md` aligned with the visitor-facing summaries.

## Resume PDF

- Keep `references/CURRENT_RESUME.pdf` in place and unchanged. Create `public/resume.pdf` as its exact delivery copy, which restores the homepage’s existing PDF download target.
- Delete the obsolete tracked `output/pdf/DELFIN_RESUME_formatted.pdf` and stale generated resume PDFs in `tmp/qa/` or `dist/`; retain certificate PDFs and other non-resume documents.
- Keep the HTML Main page as portfolio content. Its Download resume (PDF) link must resolve to the supplied PDF copy.

## Verification

- Run `npm run check` and `npm run build`; confirm the generated About page has the requested order and the build includes `resume.pdf`.
- Confirm the About page no longer shows Learning or Technical Focus & Direction, displays its separate skills set, and uses actual local vector icons where available. Confirm the Main-page skill list is unchanged.
- Confirm Main-page honors show `October 2026` and `UPV KomsaiHack 2026: Risk Ready Finalist`.
- Compare the source and delivery PDF hashes to confirm the published file is an exact copy without opening or transforming the protected source.
- Check the homepage PDF link, and confirm no obsolete resume PDFs remain outside the protected source and `public/resume.pdf`.
- Review About in dark and light themes at desktop and 320px; check section order, icon/name alignment, wrapping, keyboard/screen-reader labels, and no horizontal overflow. Check A4 print output and confirm the resume download remains the supplied PDF.

## Assumptions and constraints

- “All other resumes” means obsolete and generated resume PDF files; the site keeps the protected master plus one `public/resume.pdf` copy because the homepage links to that public asset. The HTML Main page remains.
- Remove the About Learning section and its unused content/component, but retain resume/contact and the existing Certifications & Workshops section after Engineering Philosophy.
- About technical skills are an independent, curated catalog; overlapping technologies may appear only when supported by the About content and verified references.
- Only use icons that have a suitable match and permitted use. Simple Icons states that individual icon licenses and brand guidelines can differ, so check each chosen icon rather than assuming the library-wide license applies.
- The source PDF is user-owned and immutable. Do not rename, move, edit, convert, overwrite, or delete it.

## Icon source

- [Simple Icons](https://simpleicons.org/)
- [Simple Icons licensing and trademark disclaimer](https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md)
