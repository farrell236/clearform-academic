# Clearform

A quiet, content-first academic theme for Astro. Its versioned content contract
keeps authored research, publications and writing independent from visual theme
updates. All profile and research content in the starter is fictional.

Live demo: [farrell236.github.io/clearform-academic](https://farrell236.github.io/clearform-academic/)

**Start with [EDITING.md](EDITING.md)** for the manual editing workflow, content
recipes, GitHub Pages settings and a recovery checklist. Theme authors and
upgraders should also read the compatibility contract in [THEME.md](THEME.md).

## Preview locally

Use Node 22.12+ and pnpm. Dependencies and the package lock are pinned.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:4321. For a production preview:

```sh
pnpm verify
pnpm preview
```

The only approved dependency build script is esbuild. No global installations
or scripts from the Apple reference repository are required.

## Content map

- `src/config.ts`: identity, academic/social links and navigation.
- `src/data/pages.ts`: homepage copy, section introductions, About, talks and teaching.
- `src/styles/theme.css`: replaceable colour, type and shape tokens.
- `src/styles/global.css`: structural, responsive and accessibility rules.
- `src/content/research/*.md`: projects; selected/order fields control the homepage.
- `public/citations/YYYY-NN-slug.bib`: publications, grouping and within-year order.
- `src/content/writing/*.md`: optional writing archive. Draft entries do not build.
- `src/content/templates/`: safe copy-and-edit starters for each repeatable content type.

Most personalisation should stop in the content-owned paths above. Components,
layouts, page templates, loaders and styles are theme implementation code; edit
them only when changing structure, behaviour or presentation. Content format 1
is declared in `src/config.ts` and checked against the theme during every build.
Shared collection sorting lives in `src/lib/collections.ts`, so the homepage and
archive pages cannot silently disagree after routine content additions.
The custom loader in `src/loaders/bibtex.ts` parses one entry per `.bib` file,
derives citation display fields, validates the filename and automatically adds
Paper, Code, Slides and downloadable BibTeX actions when their fields exist.

Alex Example, Example University, all coauthors, projects, publications, talks,
teaching and writing are invented placeholders. The avatar is original SVG;
the downloadable CV and BibTeX files are explicitly fictional. The email uses
the reserved example.org domain. There are no real account IDs, affiliations,
paper identifiers, copied photographs or personal documents in this starter.

Academic profile, paper, code and slide actions lead to `/about/demo-resources/` anchors.
They remain navigable without suggesting that fictional resources really exist.
Hugging Face, Instagram and Twitter / X use the platforms' homepages as neutral
external placeholders, not fictional account handles. Replace these URLs with
your own verified resources and profiles when customising.

Keep `demoContent = true` in `src/config.ts` for the public template demo. It
suppresses Person structured data for the fictional identity. Set it to false
only after replacing the sample content.
The separate preview indexing flag is described below.

Copy `.env.example` to `.env` for local deployment settings. `.env` is ignored
so machine-specific values do not become part of the reusable template.

## GitHub Pages compatibility

Static output needs no server, client framework, CDN fonts or remote script
libraries. Build locally or in GitHub Actions and publish `dist/`.
The BibTeX parser is build-time only and is not included in the published site.

User site (`username.github.io`): set `SITE_URL=https://username.github.io`,
`ASTRO_BASE=/`. Project site (`username.github.io/website/`): use the same
`SITE_URL` and `ASTRO_BASE=/website/`. A single URL helper prefixes all internal
navigation and assets. Never put the repository path into SITE_URL as well.

```sh
ASTRO_BASE=/website/ pnpm build
ASTRO_BASE=/website/ pnpm test
```

The included `deploy-pages.yml` workflow derives the owner and repository path,
verifies the project and publishes the fictional demo from `main`. The demo
intentionally keeps `PUBLIC_IS_PREVIEW=true`, producing `noindex, nofollow`
metadata and a disallowing robots file. Set `PUBLIC_IS_PREVIEW=false` only for
an intentional launch of a fully personalised site. The local default deployment
origin remains `https://example.org`, a neutral placeholder.

A 1200×630 PNG social image is included, with editable SVG source beside it.
When changing the identity, regenerate the PNG and check social previews after
deployment; a local template cannot verify a platform's deployed URL crawler.

## Design and attribution

See [DESIGN.md](DESIGN.md) for the plan and application of
[dickwu/apple-design-skill](https://github.com/dickwu/apple-design-skill).
The design applies Apple's foundations to the web, not native app chrome or
Apple branding. The reference repository is not installed as a global skill.
Frost is limited to the header and mobile navigation; academic content remains
opaque and table-like. The CSS-only `backdrop-filter` is progressive enhancement:
unsupported browsers and reduced-transparency, increased-contrast, forced-colour
and print contexts keep opaque navigation. No JavaScript is required for the effect.

Early compositional inspiration came from
[Hugo Future Imperfect](https://github.com/jpescador/hugo-future-imperfect),
but Clearform is an original implementation and does not copy its templates,
JavaScript or CSS.
Avatar, research graphics and interface icons are original code-native SVG
illustrations, not photographs, medical data, SF Symbols or model outputs.
The sample CV can optionally be regenerated with
`python scripts/create-sample-cv.py` (requires ReportLab); Python is not required
to build the website. SVG social artwork can be edited and re-exported to PNG.

Framework, theme and content updates are separate. Visual-only releases preserve
content format 1: existing profile data, page copy, Markdown and BibTeX must keep
building. Research illustration names are optional theme hints; unknown values
fall back to neutral artwork instead of invalidating content. See [THEME.md](THEME.md)
for owned paths, release rules and the safe update procedure.

## Completeness and verification

See [QA.md](QA.md) for the completed checks, fixes and launch-only follow-ups.
Run `pnpm verify` after edits and `pnpm audit:deps` to recheck dependencies.
The latter currently reports an upstream advisory in Astro's build dependency
`http-cache-semantics@4.2.0`; no published fixed version was available at the
audit date. The template uses local images and static output, not shared HTTP
response caching. This does not make the dependency audit clean: recheck it
before launch or introducing remote image processing/server rendering.

## Sharing the generic starter

Publish this directory's source, `public/`, documentation, package manifest and
lockfile, not the surrounding workspace. Exclude `node_modules/`, `.astro/`,
`.env` files and local caches; `.gitignore` already covers them. Build output
is regenerated from the generic source for a demo deployment.

The demo-content checks confirm the placeholder email, local resource URLs,
the exact neutral external platform homepages,
fictional citations and neutral assets. They are not a general-purpose PII
detector for personal content that you might add later. Choose an appropriate
distribution license before granting reuse rights; none is assigned in this
beta release.
