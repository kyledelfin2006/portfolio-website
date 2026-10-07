import { defineCollection, z } from 'astro:content';
import { aboutSections, projectSections, resumeSections } from './sections';

const copy = z.string().min(1);
const ordered = { title: copy, order: z.number().int().nonnegative() };
const image = z.object({
  path: copy,
  alt: copy,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
}).strict();
const sectionOrder = <T extends readonly [string, ...string[]]>(ids: T) =>
  z.array(z.enum(ids)).refine((sections) => new Set(sections).size === sections.length, 'Section IDs must be unique.');

const text = defineCollection({
  type: 'content',
  schema: z.discriminatedUnion('category', [
    z.object({
      category: z.literal('site'), fullName: copy, shortName: copy,
      professionalSubtitle: copy, location: copy, email: z.string().email(), portraitAlt: copy,
      navigationAriaLabel: copy,
      navigation: z.object({ main: copy, about: copy, projects: copy }).strict(),
      profiles: z.array(z.object({ label: copy, url: z.string().url() }).strict()),
      theme: z.object({ lightMode: copy, darkMode: copy, switchToLight: copy, switchToDark: copy }).strict(),
      skipLink: copy, downloadResume: copy, credentialLink: copy,
      projectLinks: z.object({ caseStudy: copy, sourceCode: copy, viewSource: copy, returnToMain: copy, notes: copy }).strict(),
    }).strict(),
    z.object({
      category: z.literal('page-home'), title: copy, description: copy,
      sectionOrder: sectionOrder(resumeSections),
      sections: z.object({
        education: z.object({ heading: copy, ariaLabel: copy }).strict(),
        experience: z.object({ heading: copy, ariaLabel: copy }).strict(),
        projects: z.object({ heading: copy, ariaLabel: copy }).strict(),
        honors: z.object({ heading: copy, ariaLabel: copy }).strict(),
      }).strict(),
    }).strict(),
    z.object({ category: z.literal('page-about'), title: copy, description: copy, sections: sectionOrder(aboutSections), learningHeading: copy, skillsHeading: copy, skillsAriaLabel: copy, workshopsHeading: copy, workshopsAriaLabel: copy }).strict(),
    z.object({ category: z.literal('page-projects'), title: copy, description: copy, eyebrow: copy, sections: sectionOrder(projectSections), sectionHeading: copy, sectionAriaLabel: copy }).strict(),
    z.object({ category: z.literal('about'), title: copy, itemTitle: copy.optional(), meta: copy.optional(), contactProfileLabels: z.array(copy).min(1).optional() }).strict(),
    z.object({ category: z.literal('honor'), ...ordered, meta: copy.optional(), summary: copy, certificatePath: copy.optional(), images: z.array(image).min(1).optional() }).strict(),
    z.object({ category: z.literal('learning'), ...ordered }).strict(),
    z.object({ category: z.literal('education'), ...ordered, meta: copy, subtitle: copy }).strict(),
    z.object({ category: z.literal('experience'), ...ordered, organization: copy }).strict(),
    z.object({ category: z.literal('skill'), ...ordered }).strict(),
    z.object({ category: z.literal('workshop'), ...ordered, issuerOrOrganizer: copy, date: copy.optional(), certificatePath: copy.optional() }).strict(),
    z.object({
      category: z.literal('project'), ...ordered, description: copy, projectCategory: copy,
      date: copy.optional(), stack: z.array(copy).min(1), repository: z.string().url(), certificatePath: copy.optional(),
      logo: image.optional(),
      highlights: z.array(copy).min(1),
    }).strict(),
  ]),
});

export const collections = { text };
