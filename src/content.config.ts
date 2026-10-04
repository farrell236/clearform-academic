import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { bibtexLoader } from './loaders/bibtex';
import { publicationSchema, researchSchema, writingSchema } from './lib/content-contract';

const research = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/research' }),
  schema: researchSchema,
});

const publications = defineCollection({
  loader: bibtexLoader({ base: './public/citations' }),
  schema: publicationSchema,
});

const writing = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/writing' }),
  schema: writingSchema,
});

export const collections = { research, publications, writing };
