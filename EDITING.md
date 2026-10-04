# Editing and recovery guide

This starter is designed so that ordinary updates do not require changing the
page layouts. Edit content first, run the checks, and only then change
components or CSS if the design itself needs to change.

## The three files and folders to remember

| What you want to change | Edit here |
| --- | --- |
| Name, email, portrait, CV, profile links, navigation and launch flags | `src/config.ts` |
| Homepage text, page introductions, About, talks and teaching | `src/data/pages.ts` |
| Projects and articles | `src/content/research/` and `src/content/writing/` |
| Publications | `public/citations/YYYY-NN-slug.bib` |
| Colours, type and shape | `src/styles/theme.css` |

Do not edit `dist/`, `.astro/` or `node_modules/`. They are generated and can
be replaced at any time.

## First local run

Install Node 22.12 or later and pnpm 11, then run:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:4321>. Keep the development server running while you
edit; Astro refreshes the page after saved changes.

Before keeping or publishing an edit, run:

```sh
pnpm verify
```

This validates content fields and TypeScript, builds every route, checks local
links and assets, and runs the template safeguards.

## Personalise the starter

1. Replace the identity and every link in `src/config.ts`.
2. Replace the copy in `src/data/pages.ts`.
3. Replace the sample projects, publications, academic activities and writing.
4. Replace `public/images/avatar.svg`, `public/files/sample-cv.pdf`, the favicon
   and both social-preview files. Keep the same filenames, or update their paths.
5. Set `demoContent` to `false` only after all fictional material is gone.
6. Copy `.env.example` to `.env`, enter the public origin and base path, and
   leave `PUBLIC_IS_PREVIEW=true` until launch.
7. Run `pnpm verify` again. Search the finished source for `Example`, `Sample`,
   `Placeholder` and `fictional` before publishing.

## Add a research project

Copy `src/content/templates/research.md` to
`src/content/research/your-project-slug.md`. The filename becomes the URL:
`/research/your-project-slug/`.

Edit every frontmatter field:

- `title` is the detail-page heading; `shortTitle` is used on cards.
- `description` is used on cards and in page metadata.
- `order` controls the research-list order. Use a unique whole number.
- `selected: true` includes the project on the homepage.
- `illustration` is an optional theme hint. The bundled choices are `geometry`,
  `retina` and `language`; missing or unknown values use neutral artwork.
- `links` can contain local paths or complete `https://` URLs; use `links: []`
  if there are no resources yet.

Write the project body below the second `---` using Markdown headings and
paragraphs. Then run `pnpm verify`.

## Add a publication

Copy `src/content/templates/publication.bib` to a filename such as
`public/citations/2026-01-short-paper-title.bib`. The loader watches that folder
while `pnpm dev` is running and rebuilds the publication collection when a file
is added, changed or removed.

The filename is part of the data contract:

- `YYYY` is the publication year and must match the BibTeX `year` field.
- `NN` is the position within that year: `01`, `02`, `03`, and so on.
- The remaining slug must use lowercase letters, numbers and hyphens.
- Every file must contain exactly one entry, and every BibTeX citation key must
  be unique.

Use standard BibTeX fields wherever possible:

- `author`, `title` and `year` are required. Separate authors with `and`.
- Add one of `journal`, `booktitle`, `publisher`, `institution`, `school` or
  `howpublished`; volume, number and pages are formatted automatically.
- `url` creates the Paper action. If it is absent, `doi` or an arXiv `eprint`
  is used when available.
- Optional `code` and `slides` fields create matching actions.
- Optional `summary` or standard `abstract` text creates the expandable Summary.
- Optional `selected = {true}` includes the paper on the homepage.

The BibTeX download action is added automatically because the source file is
already a public asset. Author spelling should resolve to `profile.name`
exactly when you want your name highlighted. Remove unavailable fields rather
than leaving misleading placeholder links.

## Add a writing entry

Copy `src/content/templates/writing.md` to
`src/content/writing/your-article-slug.md`. The filename becomes the article
URL. Keep `draft: true` while working; change it to `false` to include the
article in the build. Use `archived: true` for an old article that should carry
an archival warning.

## Edit About, talks, teaching or homepage copy

These are plain data objects in `src/data/pages.ts`. Change quoted text and
array entries, but retain property names, commas and brackets. Add another talk,
teaching item or About section by copying an adjacent object and changing its
values. Page templates read this file automatically.

## Change navigation

Edit the `navigation` array in `src/config.ts`. A local page uses a path such as
`/research/`; an external destination uses its complete `https://` URL. Removing
a navigation item does not delete its page.

## Theme adjustments

Start with the documented variables in `src/styles/theme.css`.
Changing `--canvas`, `--surface`, `--text`, `--secondary` and `--accent` is safer
than searching for individual colours throughout the stylesheet. Light and
dark palettes are next to each other. Run `pnpm verify` after colour changes;
the checks reject text combinations below 4.5:1 contrast.

Structural CSS in `src/styles/global.css` is grouped in order: foundation, shell/navigation, homepage,
research, publications/writing, inner pages, responsive rules, accessibility
preferences and print. Search for the visible component's class before editing.
See `THEME.md` before replacing components or applying an upstream theme update;
it defines the content-owned paths and the content-format 1 compatibility rules.

## GitHub Pages settings

For `username.github.io`, use:

```text
SITE_URL=https://username.github.io
ASTRO_BASE=/
```

For `username.github.io/repository-name/`, use:

```text
SITE_URL=https://username.github.io
ASTRO_BASE=/repository-name/
```

Test the project-site form locally with:

```sh
ASTRO_BASE=/repository-name/ pnpm verify
```

Never add the repository name to both values.

## Recovery plan

- Make one category of change at a time and run `pnpm verify` before moving on.
- Commit or copy the folder before framework, component or large CSS changes.
- If Markdown fails, compare its frontmatter with the matching template.
- If publications fail, compare the filename and fields with
  `src/content/templates/publication.bib`; the build reports filename, syntax,
  missing-field, year-mismatch and duplicate-key errors.
- If a page is missing, confirm its Markdown filename, `draft` value and schema
  fields; generated routes are listed during `pnpm build`.
- If links break only on GitHub Pages, verify `ASTRO_BASE` and use the shared
  `url()` helper for any new link written in an Astro component.
- If dependency installation changes the lockfile unexpectedly, restore
  `pnpm-lock.yaml` and reinstall with `pnpm install --frozen-lockfile`.
- A clean rebuild is safe: remove `dist/` and `.astro/`, then run `pnpm verify`.
  Never delete `src/`, `public/`, `package.json` or `pnpm-lock.yaml` as cleanup.

When asking someone else for help, share the exact `pnpm verify` error plus the
file you last changed. That is normally enough to reproduce a content mistake.
