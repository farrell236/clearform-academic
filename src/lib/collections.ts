import { getCollection } from 'astro:content';

/** Centralised collection filters keep ordering identical on every page. */
export async function getResearchProjects(selectedOnly = false) {
  const projects = await getCollection(
    'research',
    ({ data }) => !selectedOnly || data.selected,
  );
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getPublications(selectedOnly = false) {
  const publications = await getCollection(
    'publications',
    ({ data }) => !selectedOnly || data.selected,
  );
  return publications.sort((a, b) => (
    b.data.year - a.data.year
    || a.data.order - b.data.order
    || a.data.title.localeCompare(b.data.title)
  ));
}

export async function getWriting(limit?: number) {
  const posts = await getCollection('writing', ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.published.valueOf() - a.data.published.valueOf(),
  );
  return limit === undefined ? sorted : sorted.slice(0, limit);
}
