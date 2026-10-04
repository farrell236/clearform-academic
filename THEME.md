# Theme and content compatibility

This starter treats content as durable user data and the theme as replaceable
presentation code. It follows the same practical principle as a Hugo site:
layouts may evolve without requiring authors to rewrite their content.

The current public contract is **content format 1**. It is declared by
`contentFormatVersion` in `src/config.ts` and supported by
`src/lib/content-contract.ts`. A build stops with a clear error if a future
theme cannot read the configured content format.

## Ownership boundary

Preserve these content-owned paths when applying a theme update:

| Path | User-owned data |
| --- | --- |
| `src/config.ts` | Identity, navigation, links, launch flags and content version |
| `src/data/pages.ts` | Homepage and static-page copy, talks and teaching |
| `src/content/research/` | Research frontmatter and Markdown bodies |
| `src/content/writing/` | Writing frontmatter and Markdown bodies |
| `public/citations/` | One publication per BibTeX file |
| `public/images/`, `public/files/` | Portrait, CV and other personal assets |

These paths implement the replaceable theme and build adapter:

| Path | Theme responsibility |
| --- | --- |
| `src/styles/theme.css` | Visual skin tokens: palettes, type and corner treatment |
| `src/styles/global.css` | Layout, components, responsive behaviour and accessibility |
| `src/components/` | Reusable presentation components |
| `src/layouts/` | Shared document chrome and metadata |
| `src/pages/` | Route templates that connect content to components |
| `src/lib/`, `src/loaders/` | Content contract, ordering, URL and BibTeX adapters |
| `src/content.config.ts` | Astro collection registration |

`src/content/templates/` contains documentation examples. Theme updates may
improve those examples, but existing authored entries do not need to be copied
again when the content format remains compatible.

## Compatibility guarantee

Visual-only releases within the same supported content format may change:

- colours, typography, spacing, borders and responsive breakpoints;
- component markup and page composition;
- navigation presentation and decorative artwork;
- accessibility and browser-compatibility implementation.

They must not require users to:

- rename existing frontmatter or `src/data/pages.ts` properties;
- rewrite Markdown or BibTeX files;
- rename content files or change their generated URLs;
- change publication filename ordering conventions;
- replace valid configuration solely because the appearance changed.

The `illustration` research field is deliberately a theme hint, not a required
visual API. It defaults to neutral artwork, and an unknown value also renders
the neutral fallback. A different theme can therefore ignore or reinterpret
the hint without rejecting the research entry.

Adding optional fields with defaults is backward-compatible. Renaming or
removing fields, changing their meaning, changing URL rules, or tightening a
previously valid value is a content-format change and requires a migration note
plus a new content-format number.

## Applying a theme update

1. Commit or copy the working site so the update is reversible.
2. Preserve the content-owned paths in the table above.
3. Apply the updated theme-owned paths and any dependency-lock changes supplied
   by the release.
4. Read the release notes. If the supported content format is still `1`, no
   content migration should be required.
5. Run `pnpm verify`.
6. For a GitHub project site, also run
   `ASTRO_BASE=/repository-name/ pnpm verify`.
7. Inspect the homepage, one research page, publications, writing and About at
   desktop and mobile widths before publishing.

Do not copy `dist/`, `.astro/` or `node_modules/` between releases. They are
generated and can safely be rebuilt.

## Creating a visual variant

For a palette or typography variant, start in `src/styles/theme.css`. It is the
smallest replaceable visual surface and contains no routes or content. Keep the
semantic variables (`--canvas`, `--surface`, `--text`, `--secondary`,
`--accent`, `--separator` and `--focus`) even when changing their values so the
structural stylesheet remains portable.

For a layout variant, change `src/styles/global.css` and the relevant component
or layout. Consume collection data through the existing properties rather than
reading source files directly. Decorative choices must have a safe fallback.

Run `pnpm verify` after every theme change. The checks validate the format
version, one-way content-to-theme dependency boundary, token contract, routes,
links, accessibility essentials, contrast and the representative content set.

## Releasing changes

- Patch release: fixes that preserve both appearance intent and content format.
- Minor release: visual or component features that still support content format 1.
- Major release: a deliberate content-format or URL contract change.

During beta, label breaking changes clearly even if semantic-version rules
permit them before 1.0. Prefer deprecation and a migration script or checklist
over an abrupt schema change.
