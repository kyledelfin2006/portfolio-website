import { getCollection, type CollectionEntry } from 'astro:content';

type TextEntry = CollectionEntry<'text'>;
type Category = TextEntry['data']['category'];
export type TextEntryOf<C extends Category> = TextEntry & { data: Extract<TextEntry['data'], { category: C }> };
export const contentId = ({ id }: TextEntry) => id.replace(/\.md$/, '');

export async function getEntries<C extends Category>(category: C): Promise<TextEntryOf<C>[]> {
  return (await getCollection('text'))
    .filter((entry) => entry.data.category === category)
    .sort((a, b) => ('order' in a.data && 'order' in b.data ? a.data.order - b.data.order : 0) || a.id.localeCompare(b.id)) as TextEntryOf<C>[];
}

export async function getRequiredEntry<C extends Category>(id: string, category: C): Promise<TextEntryOf<C>> {
  const entry = (await getCollection('text')).find((candidate) => contentId(candidate) === id);
  if (!entry) throw new Error(`Required Markdown content file "src/content/text/${id}.md" is missing.`);
  if (entry.data.category !== category) throw new Error(`Markdown content "${id}.md" must use category "${category}".`);
  return entry as TextEntryOf<C>;
}
