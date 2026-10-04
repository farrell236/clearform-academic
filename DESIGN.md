# Clearform — design direction

An academic-first, reusable Astro starter with fictional, shareable demo content.

## Thesis and audience

Help collaborators, researchers and hiring teams understand the research and
reach its papers and code quickly. Keep Future Imperfect's portrait, profile
rail, clear header and modular content; change the information hierarchy.

## Design reference and applicability

Reviewed `dickwu/apple-design-skill` at
`904b0eedc7cc778152f545506075d5bb5219ce77`.
This is a web site: Apple's foundations apply; native tab bars, window chrome,
menu bars and app-specific navigation conventions do not. No Apple logos,
downloaded SF fonts or SF Symbols are redistributed. A system font stack uses
the user's platform font when available.

The visual refinement also takes selective cues from Apple's iOS 7 transition:
clarity, restrained ornament, fine separators, lighter outline icons and
borderless tinted actions. It does not reproduce iOS chrome, blur layers or
historically thin text. The web implementation retains strong contrast,
visible focus and 44px targets. Primary references:

- [Apple's iOS 7 announcement](https://www.apple.com/newsroom/2013/06/10Apple-Unveils-iOS-7/)
- [iOS 7 UI Transition Guide: Controls](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/TransitionGuide/Controls.html)
- [iOS 7 UI Transition Guide: Bars and Bar Buttons](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/TransitionGuide/Bars.html)

Read: accessibility, layout, typography, color, designing-for-macos,
cross-platform, design-principles, sidebars, buttons, dark-mode, motion, branding.

## Before implementation: compact token plan

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| Canvas | #F2F2F7 | #0B1020 | Cool, pale canvas / deep navy canvas |
| Surface | #FFFFFF | #151B2D | Content modules |
| Text | #1C1C1E | #F5F7FF | Headings and body |
| Secondary | #565D68 | #B9C2D6 | Metadata and supporting text |
| Accent | #005FC4 | #70B7FF | Accessible links, focus and actions |
| Separator | #C7C7CC | #35415F | Nonessential grouping |

The brighter iOS 7 blue `#007AFF`, cyan `#34AADC`, green `#4CD964`, pink
`#FF2D55` and yellow `#FFCC00` are reserved for non-text illustration accents.
Normal-size interface text uses the darker `#005FC4` so the visual reference
does not weaken WCAG contrast on white and pale-blue surfaces.

Calculate contrast during verification and record it in QA.md. All text,
including secondary text, must exceed 4.5:1 on its actual surface. Separators
are decorative, not the only indicator of a control or group.

Type: platform system sans throughout, regular/medium/semibold. Display 44–54px,
section 24px, card title 20px, body 17px, utility 14px; expressed in rem and
fluid sizes. No artificially tiny labels or letter-spaced uppercase paragraphs.
Spacing: 4, 8, 12, 16, 24, 32, 48, 64px equivalents. Content radii are a
restrained 4px and control radii 2px; circular portraits remain circular.
Separators use a one-device-pixel hairline where supported. All standalone
actions have a minimum 44px hit region.

Layout: a compact identity rail beside the research overview at regular widths,
collapsing above the content at compact widths without hiding any sections.

```text
Regular
[Home]        Research  Publications  Academic  Writing  About
--------------------------------------------------------------
Portrait / name       Research statement
Discipline / links    Short introduction + research action
CV / contact          Selected research: one feature + two rows
                      Selected publications: citation list
                      Writing: compact archive links

Compact
[Home]                                    [Menu]
Portrait + name
Discipline / academic links / CV
Research statement
Selected research (stacked)
Selected publications (wrapping rows)
Writing / footer
```

Signature: a quiet three-plane imaging illustration, with the highlighted plane
representing the link between image geometry and learning. It is a
project-specific SVG, explicitly a conceptual illustration, not patient imagery
or a research result. Other graphics are also conceptual, not purported data.

Motion: none on entry, no parallax or automatic animation. Brief colour feedback
only, disabled when reduced motion is requested. Surfaces remain opaque, so
reduced-transparency preferences do not need a blur fallback.

## Critique of the plan

The initial blog-card model gave dates and article metadata too much emphasis.
It has been replaced by research summaries and compact, year-labelled citations.
A generic gradient hero was rejected: the plane illustration conveys structure
and relationships without relying on a real researcher's work or results.
Recent-post widgets, category clouds, social sharing panels, ornamental
numbering and citation-count badges have been removed.

## Reference-to-implementation mapping

- `layout.md › Visual hierarchy`: “Order content by relative importance.”
  Research first; writing is secondary. Alignment and whitespace group content.
- `typography.md › Supporting Dynamic Type`: keep text and hierarchy useful
  when enlarged. Web equivalent: rem units, browser zoom, no text clamping.
- `accessibility.md › Vision` and `Mobility`: measured contrast, meaningful
  labels, 44px targets, skip link, keyboard focus and native links/details.
- `color.md › Best practices`: semantic CSS tokens, tested in both appearances.
- `dark-mode.md › Best practices`: follow `prefers-color-scheme` automatically;
  no site-specific switch that competes with the user's system preference.
- `motion.md › Best practices`: no unnecessary motion; honour reduced motion.
- `branding.md › Best practices`: project-specific research graphics provide identity;
  navigation remains familiar, and the design does not imitate Apple's branding.
- `sidebars.md › Platform considerations`: the web profile rail becomes a
  compact identity block when horizontal room is scarce.
- `iOS 7 UI Transition Guide › Controls`: rounded-rectangle buttons were
  replaced by borderless, tint-colour system buttons. The web actions follow
  that visual hierarchy while preserving descriptive labels and focus states.

## Content and scope

Every person, institution, appointment, project, publication and article is a
fictional placeholder. The sample CV and BibTeX files say so explicitly. The
avatar, favicon and social artwork contain no real person's photograph or
identity. Example-domain email and local demo-resource links avoid associating
the fictional profile with real accounts. Person structured data is omitted
while demo mode is enabled. The design remains reusable, and no deployment is
assumed.

Project provenance, acknowledgements and the non-affiliation statement are
maintained in [ATTRIBUTION.md](ATTRIBUTION.md).
