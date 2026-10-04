# Completeness audit — Clearform

Reviewed on 3 October 2026, scrubbed for use as a generic public starter and
prepared for beta release on 4 October 2026.
Status: **complete as a reusable beta template with fictional demo content**.
A manual-only GitHub Pages workflow is included, but Pages is not configured or
deployed. The repository is licensed under `GPL-3.0-or-later` with a separate
provenance record.

## Coverage

| Area | Result |
| --- | --- |
| Academic-first homepage | Research statement, three selected projects, three citations; writing last |
| Page layouts | Overview, research listing/detail, publications, talks/teaching, writing listing/article, about/contact, demo resources, 404 |
| Content structure | Schema-validated Markdown, typed page data and parsed BibTeX; writing drafts excluded from routes |
| GitHub Pages paths | Both `/` and `/clearform-academic/` builds and all seventeen verification checks pass |
| Dependency installation | Frozen lockfile succeeds; only esbuild's build script is approved |
| Static output | 12 HTML pages, CSS and neutral assets; no client JavaScript runtime or server adapter |
| Search/social metadata | Canonicals, descriptions, correct article dates, PNG social image, preview noindex and robots policy |
| Demo identity | Fictional profile, neutral avatar, sample CV and citations; no personal source assets |

## Public-template privacy pass

- Replaced identity, biography, affiliations, contact address and account links
  with Alex Example, Example University and the reserved example.org domain.
- Removed the copied real portrait and CV. Added project-specific SVG avatar
  artwork and a one-page sample PDF labelled fictional throughout; checked its
  text, metadata and rendered layout. Its optional generator is included.
- Replaced every project, publication, coauthor, teaching activity, talk and
  writing example with invented sample content. BibTeX files also say fictional.
- Replaced real paper identifiers, repositories, profile IDs and slides URLs.
  Academic actions now resolve to local demo-resource anchors rather than real
  accounts or nonexistent publications. Additional social links use only the
  neutral Hugging Face, Instagram and Twitter / X homepages.
- Replaced the favicon, social SVG/PNG and deployment-origin default; page
  titles, descriptions and image alternatives use the fictional configuration.
- Suppressed Person structured data while the fictional demo identity is active.
- Scrubbed accompanying documentation and regenerated the screenshot previews.
- Rebuilt generated output to remove obsolete routes and copied assets. A scan
  of source, documentation, public assets, generated cache and output found no
  known original personal identifiers. PDF text and metadata were checked
  separately; the social PNG was regenerated without source image metadata.
- Added a demo-fixture check for fictional authors, placeholder email, safe
  link destinations, asset inventory and explicit BibTeX notices. It is not a
  universal PII detector for content subsequently added by template users.

## Findings corrected

- Refactored the starter around a small, documented manual-editing surface.
  Identity, navigation and launch state remain in `src/config.ts`; homepage and
  static-page copy now live in `src/data/pages.ts`; projects and writing remain
  Markdown; publications are one-entry BibTeX files. Shared collection helpers centralise
  filtering and ordering, while reusable page/section headings remove repeated
  layout markup. Copy-ready content templates, `.env.example` and `EDITING.md`
  provide addition recipes and a recovery plan without introducing a content
  management system or client-side runtime.
- Strengthened content validation for hand edits: required strings are trimmed
  and non-empty, authors cannot be empty, years are bounded, project order is a
  non-negative integer, and optional links retain safe defaults. The custom
  publication loader additionally rejects invalid filenames, multiple entries
  per file, duplicate citation keys, missing fields and year mismatches. Invalid
  manual content now fails during `pnpm verify` with its source filename.
- Expanded the publication fixture to two entries in each of 2025, 2024 and
  2023 while keeping only three homepage selections. A required, unique
  `NN` filename segment makes archive ordering deterministic when several papers
  share a year; the publication template and editing guide document it.
- Replaced the hand-maintained publication JSON with a watched BibTeX loader.
  `public/citations/YYYY-NN-slug.bib` is now both the source of truth and the
  downloadable asset. A maintained parser handles nested BibTeX/LaTeX syntax and
  author lists at build time; no parser code or client JavaScript ships publicly.
- Refined the iOS 7 interpretation by limiting translucency to navigation
  chrome. Subtle fixed colour fields remain behind an 82%-white frosted header
  and a denser full-width mobile menu; research cards, publication lists and
  content panels are now opaque grouped surfaces with square edges and hairline
  separators. Helvetica Neue leads the fallback stack, display headings use
  lighter weights, icons use a finer stroke and the menu receives a restrained
  240ms reveal. Unsupported browsers retain solid navigation, and
  reduced-transparency, increased-contrast, forced-colour and print contexts
  receive solid fallbacks. Each part is independently reversible in the shared
  stylesheet; no shadows were introduced.
- Restored a consistent right edge on About, research details, writing details
  and demo resources. The 68-character reading measure now constrains prose
  inside a full-width panel instead of shrinking the panel itself. First/last
  child margins no longer add accidental vertical padding, and borderless
  resource labels align with their surrounding text rather than retaining a
  hidden 16px button inset.
- Shifted the neutral blue-gray theme to an iOS 7-informed palette: crisp white
  surfaces, pale cool canvas, accessible deep-blue links, and authentic bright
  blue/cyan/green/pink/yellow reserved for illustrations. Each research graphic
  now has a distinct pastel field, while the avatar, favicon and editable/raster
  social previews use the same palette. Dark mode uses deep navy surfaces and
  lighter equivalents rather than pretending iOS 7 had a native dark theme.
- Replaced the canvas's ambient rose glow with a restrained cool navy field
  (`rgba(18, 68, 128, .1)` in light mode and `rgba(45, 105, 170, .13)` in dark
  mode). The pale canvas, opaque surfaces, navigation glass and intentionally
  pink synthetic-data illustration remain unchanged.
- Reworked the former 16px card and 10px control rounding into a restrained
  square-surface/2px-control system informed by iOS 7. Grouped content, panels,
  menus and project artwork now use square edges; code blocks retain 4px corners,
  and separators become device-pixel hairlines on high-density screens. Buttons
  are borderless tinted actions,
  icons are lighter, and display headings use a calmer weight. The circular
  portrait remains circular, and accessibility focus/target sizes are intact.
- Replaced the duplicate header identity with a functional Home link and an
  original outline icon. Removed Overview from both navigation menus, unused
  initials from configuration and obsolete brand styling. The active homepage
  is indicated on Home, while section pages retain their navigation indicator.
- Removed the three-line profile tagline and its unused styling. Added Hugging
  Face, Instagram and Twitter / X to the configurable links, with a broader
  accessible navigation label covering both academic and social destinations.
  The longer sidebar scrolls normally in short windows rather than keeping
  the CV and contact actions pinned below the viewport.
- Enlarged the profile avatar to 160px on desktop and 128px at compact widths,
  centred above the name without changing the sidebar's readable text layout.
- Removed decorative introductory labels across all page layouts. Main page and
  section headings remain; project fields/years and article dates appear as
  useful metadata below the title rather than as introductory labels.
- Year-grouped citations incorrectly retained the homepage's narrow year column.
  A dedicated full-width layout now handles entries without an inline year.
- Project figures inherited the browser's horizontal margins. Their artwork and
  captions now align with the content column.
- The research listing jumped from h1 to h3. Cards now accept the appropriate
  heading level; all page outlines are checked.
- Sample editorial summaries were labelled “Abstract”. Both the disclosure and
  data field now say “Summary”; no invented verbatim abstracts are implied.
- Hero and first-section spacing accumulated twice. The first research module
  now sits closer to the research introduction.
- Project resource links now use the same base-path helper as other internal
  assets, including future local citation links.
- CV links now have a native download attribute, matching their label.
- Repeated project and slide links have topic-specific accessible names.
- SVG-only social metadata was replaced with a real 1200×630 PNG; editable SVG
  source is retained.
- An unused CSS token and unused script import were removed.
- Tests now read colours from the actual CSS rather than an independent copy
  that could drift after a design edit.

## Verification performed

Latest checks: 0 errors, 0 warnings, 0 hints; 12 pages built; 17 checks passed.
The checks cover all page types, local links/assets/fragments, semantic and
metadata essentials, heading order/unique identifiers/current navigation,
social image/robots policy, homepage content order, 18 text contrast pairs and
generic-demo content/asset safeguards, external profile links/tagline removal,
the functional Home header without a duplicate identity or Overview link,
low-radius/hairline/borderless-control visual tokens and shared panel/action
alignment. They also lock in compact publication rows while preserving 44px
action targets. They require glass effects to remain navigation-only and
progressive, opaque grouped content surfaces, and reduced-transparency and
increased-contrast fallbacks. The generic-demo check also requires multiple
publication examples per year with unique within-year ordering.
The compatibility check fixes the public content contract at version 1,
requires the replaceable token skin to remain separate from structural CSS,
prevents user-owned data modules from importing presentation code and verifies
that unknown research-art hints retain a neutral fallback.

The same seventeen checks passed after a separate `/clearform-academic/` build.
The root-path preview was rebuilt afterward. This validates static path
generation independently of the GitHub Pages workflow.

Browser checks in the Codex in-app browser:

- Compact publication spacing inspected at 1280px and 390px. Row padding is
  18px, the text stack uses reduced inter-line gaps, and action targets remain
  44px high. All six entries render without horizontal overflow.
- BibTeX-derived publication archive inspected at 1280px and 390px. All six
  files render in filename-defined year/order, with parsed author order, venue
  details, optional resource actions, summaries and six downloadable BibTeX
  links. Neither viewport overflows and the links resolve to the source files.
- Refactored data-driven homepage, About and Academic pages inspected at
  1280px; homepage also inspected at 390px. Headings, five academic activity
  rows and all six profile links render from the new data modules with no
  horizontal overflow. The visual composition is unchanged.
- Publication groups inspected at 1280px and 390px: all three year headings
  contain two ordered entries, the archive shows six entries, and neither
  viewport overflows. The homepage remains limited to three selected entries.
- All 12 generic routes at 1280px and 320px: no document-wide horizontal overflow;
  placeholder avatars load and the expected page content appears.
- Homepage and publication layout also inspected at 390px.
- iOS 7-inspired refinement inspected at 1280px and 390px: grouped academic
  surfaces are square and opaque, controls retain 2px corners, actions remain
  44px high, button backgrounds are transparent, the menu has no shadow, and
  neither width overflows.
- Updated palette inspected at 1280px: computed canvas/accent tokens match
  `#F2F2F7`/`#005FC4`; the three research fields resolve to distinct cyan,
  pink and green pastels without horizontal overflow.
- Cool-blue ambient canvas inspected at 1280px and 390px: the computed
  `--ambient-cool` token matches the source and neither viewport overflows.
- Navigation glass inspected at 1280px and 390px. Supporting browsers compute
  the header at 82% white with 22px blur and the mobile navigation at 97% white
  with 26px blur; content surfaces compute to opaque white with no backdrop
  filter. At 390px the menu spans exactly 390px beneath the 64px header; every
  row is 48px high, square-edged and separated by a hairline. Neither width
  overflows.
- About and Structured Learning alignment inspected at 1280px: both About
  panels, the project figure and its prose panel share the 872px content grid.
  At 390px they each occupy the full 350px available column; action labels sit
  on their surrounding content edge and neither page overflows horizontally.
- Enlarged avatar measured precisely centred within the profile at 1220px,
  390px and 320px; no horizontal overflow at those widths.
- Native mobile menu opens and navigates to Publications, then closes on the
  new page. Current-section styling updates.
- Updated Home header checked at 1280px, 390px and 320px with no overflow and
  a 44px-high Home target. The mobile menu now excludes Overview; navigating
  to Research then selecting Home returns to `/` and updates current-page state.
- Publication summaries expand successfully without JavaScript.
- Keyboard Tab exposes the skip link with a 3px focus indicator; Enter moves
  focus to `main`.
- Standalone homepage actions measure at least 44px high at the compact width.
- All six profile links remain 44px high and wrap without overflow at 390px
  and 320px. At 1280×720, scrolling brings the contact action fully into view.
- No warnings/errors recorded in the inspected browser console.
- Sample profile navigation reaches the matching local demo-resource anchor.
- Temporary viewport override reset after testing.

Visual captures were used during the local audit but are intentionally excluded
from the distributable source repository; the automated checks and measurements
above are the durable verification record.

### Measured colour contrast

| Role | Light canvas / surface / quiet | Dark canvas / surface / quiet |
| --- | --- | --- |
| Text | 15.25 / 17.01 / 15.15 | 17.70 / 16.00 / 13.73 |
| Secondary | 5.95 / 6.64 / 5.91 | 10.59 / 9.58 / 8.22 |
| Accent | 5.48 / 6.12 / 5.44 | 8.93 / 8.08 / 6.93 |

Ratios are `:1`; all exceed 4.5:1. Button foreground/accent contrast uses the
same surface/accent pair. Decorative artwork and separators are not text.

## Upstream dependency finding — remains open

`pnpm audit --prod --audit-level high` reports one high-severity advisory:
[GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp),
for `http-cache-semantics@4.2.0`, brought in by Astro 7.3.5. The advisory lists
no patched release; a registry check confirmed that 4.2.1 was not published.
Do not override to a nonexistent version or suppress the advisory.

Source inspection locates Astro's use in its build-time remote-image caching.
This template uses a local, ordinary `img`, imports no `astro:assets` image
components, and builds only static HTML/CSS/assets. The dependency is absent
from the distributed site. Based on that implementation, the shared-cache
cross-user response scenario is not exposed by this template; this is a scope
assessment, not a guarantee that Astro or its toolchain is vulnerability-free.
Recheck when a fix is released, before launch, and before adding remote image
processing, a shared cache or server rendering. `pnpm audit:deps` remains an
unsuppressed check and will report the advisory until upstream is fixed.

## Before personalising or publishing

- For your own website, replace every fictional identity, institution, project,
  citation, activity, article, contact address, resource link and CV. Turn off
  demo mode only after replacing the sample content. Verify all factual claims.
- For a public template release, retain fictional content, the GPL license and
  attribution record. Exclude the surrounding workspace, local caches and
  environment files. Review any Git history if publishing from an existing
  repository.
- For a personalised fork, the workflow derives its Pages origin and repository
  path automatically. Remove preview indexing restrictions only at an
  intentional launch.
- Test deployed social crawlers, 404 status, redirects and any sitemap.
- Perform a full screen-reader and cross-browser/device audit. Actual 200%
  browser zoom, visual dark-mode rendering, and user preference combinations
  were not separately exercised here. The template uses rem/fluid sizing,
  system dark-mode tokens, visible focus and reduced-motion styles, but these
  are not claims of comprehensive accessibility certification.

## Final design critique

The profile rail, portrait and modular content establish a clear identity. The
hierarchy is academic: research and citations lead; archived writing is
secondary. Opaque surfaces, a platform font stack, restrained accent colour and
quiet diagrams apply the requested Apple reference without Apple branding or
native-app chrome. Recent-post widgets, tag clouds, social-sharing panels,
decorative counts and automatic entrance animation are absent. The remaining
trade-off is deliberate: generous space favours readable research summaries
over fitting every publication above the fold.
