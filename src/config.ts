/**
 * Primary editing surface for identity, navigation and launch state.
 * Page copy lives in src/data/pages.ts; repeatable content lives in
 * src/content/ and public/citations/*.bib.
 */

export type Link = {
  label: string;
  href: string;
};

// User content using this version remains compatible with visual-only updates.
export const contentFormatVersion = 1 as const;

export const site = {
  name: 'Clearform',
  language: 'en',
};

export const profile = {
  name: 'Alex Example',
  discipline: 'Computational science & machine learning',
  introduction: 'Exploring how structure, data and language can support scientific discovery.',
  email: 'alex@example.org',
  portrait: '/images/avatar.svg',
  portraitAlt: 'Generic placeholder avatar for the fictional researcher Alex Example',
  cv: '/files/sample-cv.pdf',
  links: [
    { label: 'Google Scholar', href: '/about/demo-resources/#scholar' },
    { label: 'GitHub', href: '/about/demo-resources/#github' },
    { label: 'LinkedIn', href: '/about/demo-resources/#linkedin' },
    // Neutral platform homepages: replace with your own profiles when customising.
    { label: 'Hugging Face', href: 'https://huggingface.co/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Twitter / X', href: 'https://x.com/' },
  ] satisfies Link[],
};

export const navigation = [
  { label: 'Research', href: '/research/' },
  { label: 'Publications', href: '/publications/' },
  { label: 'Academic', href: '/academic/' },
  { label: 'Writing', href: '/writing/' },
  { label: 'About', href: '/about/' },
] satisfies Link[];

// Leave preview mode on until the finished site is ready for search engines.
export const isPreview = import.meta.env.PUBLIC_IS_PREVIEW !== 'false';

// Keep true for the public template demo; set false after replacing every example.
export const demoContent = true;
