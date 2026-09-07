import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.string().optional(),
    stack: z.array(z.string()),
    repository: z.string().url(),
    order: z.number().int().nonnegative(),
    highlights: z.array(z.string()),
  }),
});

export const collections = { projects };
