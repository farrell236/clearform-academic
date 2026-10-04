import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { parse as parseBibTeX } from '@retorquere/bibtex-parser';

const output = resolve('dist');
const base = `/${(process.env.ASTRO_BASE || '/').replace(/^\/+|\/+$/g, '')}`.replace(/\/$/, '');
async function files(folder) {
  const entries = await readdir(folder, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(resolve(folder, entry.name)) : resolve(folder, entry.name)))).flat();
}
const htmlFiles = (await files(output)).filter(path => path.endsWith('.html'));

test('all template page types are built', async () => {
  for (const path of ['index.html', 'research/index.html', 'research/structured-learning/index.html', 'research/synthetic-data/index.html', 'research/multimodal-systems/index.html', 'publications/index.html', 'academic/index.html', 'writing/index.html', 'writing/research-workflow/index.html', 'about/index.html', 'about/demo-resources/index.html', '404.html']) {
    assert.ok((await stat(resolve(output, path))).isFile(), path);
  }
});

test('public demo uses fictional identities and neutral resource placeholders', async t => {
  const config = await readFile(resolve('src/config.ts'), 'utf8');
  if (!/export const demoContent = true/.test(config)) return t.skip('Personalised site, not the generic demo');
  const citationDirectory = resolve('public/citations');
  const citationFiles = (await readdir(citationDirectory)).filter(path => path.endsWith('.bib')).sort();
  const publications = [];
  for (const filename of citationFiles) {
    const filenameMatch = filename.match(/^(\d{4})-(\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*\.bib$/);
    assert.ok(filenameMatch, `Invalid citation filename: ${filename}`);
    const source = await readFile(resolve(citationDirectory, filename), 'utf8');
    const library = parseBibTeX(source, { sentenceCase: false, unsupported: 'ignore' });
    assert.equal(library.errors.length, 0, filename);
    assert.equal(library.entries.length, 1, filename);
    const [entry] = library.entries;
    assert.equal(Number(entry.fields.year), Number(filenameMatch[1]), filename);
    assert.match(source, /Fictional template example\. Not a real publication\./);
    publications.push({
      year: Number(filenameMatch[1]),
      order: Number(filenameMatch[2]),
      selected: /^(?:true|yes|1)$/i.test(String(entry.fields.selected || '')),
      authors: entry.fields.author || [],
    });
  }
  const permittedHosts = new Set(['example.org', new URL(process.env.SITE_URL || 'https://example.org').hostname]);
  const permittedPlatformUrls = new Set(['https://huggingface.co/', 'https://www.instagram.com/', 'https://x.com/']);
  assert.ok(publications.every(publication => publication.authors.every(author => {
    const name = author.name || [author.firstName, author.prefix, author.lastName, author.suffix].filter(Boolean).join(' ');
    return /(?:Example|Sample|Placeholder)$/.test(name);
  })));
  assert.equal(publications.filter(publication => publication.selected).length, 3);
  const publicationsPerYear = Map.groupBy(publications, publication => publication.year);
  for (const entries of publicationsPerYear.values()) {
    assert.ok(entries.length >= 2);
    assert.equal(new Set(entries.map(publication => publication.order)).size, entries.length);
  }
  for (const path of htmlFiles) {
    const html = await readFile(path, 'utf8');
    assert.ok(!html.includes('Fictional demo content · Replace with your own profile and research.'));
    assert.ok(!html.includes('"@type":"Person"'));
    for (const match of html.matchAll(/href="mailto:([^"]+)"/g)) assert.ok(match[1].endsWith('@example.org'));
    for (const match of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
      assert.ok(permittedHosts.has(new URL(match[1]).hostname) || permittedPlatformUrls.has(match[1]), `Non-generic external destination: ${match[1]}`);
    }
  }
  const publicFiles = (await files(resolve('public'))).map(path => relative(resolve('public'), path)).sort();
  assert.deepEqual(publicFiles, [
    ...citationFiles.map(path => `citations/${path}`),
    'favicon.svg',
    'files/sample-cv.pdf',
    'images/avatar.svg',
    'social-preview.png',
    'social-preview.svg',
  ].sort());
});

test('profile links include the external platforms without the decorative tagline', async () => {
  for (const path of htmlFiles) {
    const html = await readFile(path, 'utf8');
    assert.match(html, /<nav class="profile-links" aria-label="Profile links"/);
    for (const href of ['https://huggingface.co/', 'https://www.instagram.com/', 'https://x.com/']) {
      assert.ok(html.includes(`href="${href}"`), `Missing ${href} in ${path}`);
    }
    assert.doesNotMatch(html, /Scientific questions\.|Thoughtful methods\.|Open research\.|profile-note/);
    const footer = html.match(/<footer class="site-footer">([\s\S]*?)<\/footer>/)?.[1];
    assert.ok(footer, `Missing footer in ${path}`);
    assert.equal([...footer.matchAll(/<span>/g)].length, 1);
    assert.match(footer, /© \d{4} Alex Example/);
    assert.doesNotMatch(footer, /Imperfect Academic|Fictional demo|Design preview/);
  }
});

test('header uses one functional Home link without a duplicate identity or Overview', async () => {
  for (const path of htmlFiles) {
    const html = await readFile(path, 'utf8');
    const header = html.match(/<header class="site-header">([\s\S]*?)<\/header>/)[1];
    const home = header.match(/<a class="home-link"[^>]+>([\s\S]*?)<\/a>/);
    assert.ok(home, `Missing Home link in ${path}`);
    assert.ok(home[0].includes(`href="${base}/"`));
    assert.match(home[1], /<svg\b[^>]+aria-hidden="true"/);
    assert.ok(home[1].includes('<span>Home</span>'));
    assert.equal([...header.matchAll(/class="home-link"/g)].length, 1);
    assert.doesNotMatch(header, /class="brand(?:-|"|\s)|>Overview</);
    assert.equal(home[0].includes('aria-current="page"'), path === resolve(output, 'index.html'));
  }
});

test('every local link, asset and fragment resolves under the configured base', async () => {
  for (const path of htmlFiles) {
    const html = await readFile(path, 'utf8');
    const route = `/${relative(output, path).replace(/index\.html$/, '')}`;
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const href = match[1].replace(/&amp;/g, '&');
      if (/^(https?:|mailto:|data:)/.test(href)) continue;
      assert.ok(href.length > 0 && href !== '#', `Empty link in ${path}`);
      const target = new URL(href, `https://template.test${base}${route}`);
      assert.ok(!base || target.pathname === base || target.pathname.startsWith(`${base}/`), `${href} is missing ${base}`);
      const targetPath = decodeURIComponent(target.pathname.slice(base.length));
      let diskPath = resolve(output, `.${targetPath}`);
      assert.ok(diskPath === output || diskPath.startsWith(`${output}/`), 'Path must stay inside output');
      if ((await stat(diskPath)).isDirectory()) diskPath = resolve(diskPath, 'index.html');
      assert.ok((await stat(diskPath)).isFile(), `${href} in ${relative(output, path)}`);
      if (target.hash && diskPath.endsWith('.html')) {
        assert.ok((await readFile(diskPath, 'utf8')).includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${href} fragment missing`);
      }
    }
  }
});

test('semantic and metadata essentials are present on every page', async () => {
  for (const path of htmlFiles) {
    const html = await readFile(path, 'utf8');
    assert.match(html, /<html lang="en"/);
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, path);
    assert.doesNotMatch(html, /class="eyebrow"/, 'No decorative introductory labels');
    assert.match(html, /<main[^>]+id="main"/);
    assert.match(html, /name="description" content="[^"]+"/);
    assert.match(html, /rel="canonical" href="https:\/\//);
    const robots = process.env.PUBLIC_IS_PREVIEW === 'false' ? 'index, follow' : 'noindex, nofollow';
    assert.ok(html.includes(`name="robots" content="${robots}"`));
    assert.ok(!html.includes('0001-01-01'));
    for (const img of html.matchAll(/<img\b[^>]*>/g)) assert.match(img[0], /alt="[^"]+"/);
    assert.ok(!/<script(?![^>]*type="application\/ld\+json")/.test(html), 'No client runtime required');
  }
});

test('heading outlines, identifiers and navigation remain consistent', async () => {
  for (const path of htmlFiles) {
    const html = await readFile(path, 'utf8');
    let previous = 0;
    for (const heading of html.matchAll(/<h([1-6])(?:\s|>)/g)) {
      const level = Number(heading[1]);
      assert.ok(level <= previous + 1, `Skipped heading level in ${relative(output, path)}`);
      previous = level;
    }
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, `Duplicate identifiers in ${path}`);
    const currentLinks = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*aria-current="page"/g)].map(match => match[1]);
    if (!path.endsWith('404.html')) assert.equal(new Set(currentLinks).size, 1, `Expected one active section in ${path}`);
  }
});

test('social image and preview indexing policy are complete', async () => {
  const html = await readFile(resolve(output, 'index.html'), 'utf8');
  const socialImage = html.match(/property="og:image" content="([^"]+)"/)[1];
  assert.ok(new URL(socialImage).pathname.startsWith(`${base}/`));
  const bytes = await readFile(resolve(output, 'social-preview.png'));
  assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
  assert.equal(bytes.readUInt32BE(16), 1200);
  assert.equal(bytes.readUInt32BE(20), 630);
  const robots = await readFile(resolve(output, 'robots.txt'), 'utf8');
  assert.ok(robots.includes(process.env.PUBLIC_IS_PREVIEW === 'false' ? 'Allow: /' : 'Disallow: /'));
});

test('the homepage is academic-first', async () => {
  const html = await readFile(resolve(output, 'index.html'), 'utf8');
  const content = html.slice(html.indexOf('<main'));
  assert.ok(content.indexOf('Selected research') < content.indexOf('Selected publications'));
  assert.ok(content.indexOf('Selected publications') < content.indexOf('Beyond the papers'));
  assert.ok(!content.includes('Recent Posts'));
});

// Read both the replaceable skin and structural CSS so design assertions cannot drift.
const themeCss = await readFile(resolve('src/styles/theme.css'), 'utf8');
const globalCss = await readFile(resolve('src/styles/global.css'), 'utf8');
const css = `${themeCss}\n${globalCss}`;

test('content format v1 stays independent from the visual theme', async () => {
  const config = await readFile(resolve('src/config.ts'), 'utf8');
  const contract = await readFile(resolve('src/lib/content-contract.ts'), 'utf8');
  const contentConfig = await readFile(resolve('src/content.config.ts'), 'utf8');
  const researchArt = await readFile(resolve('src/components/ResearchArt.astro'), 'utf8');
  assert.match(config, /contentFormatVersion\s*=\s*1 as const/);
  assert.match(contract, /supportedContentFormatVersion\s*=\s*1 as const/);
  assert.match(contract, /illustration:\s*requiredText\.default\('default'\)/);
  assert.match(contentConfig, /publicationSchema, researchSchema, writingSchema/);
  assert.match(researchArt, /:\s*'geometry';/);
  assert.match(globalCss, /^@import '\.\/theme\.css';/);
  for (const path of [resolve('src/config.ts'), ...(await files(resolve('src/data')))]) {
    const source = await readFile(path, 'utf8');
    assert.doesNotMatch(source, /from\s+['"][^'"]*(?:components|layouts|styles|pages)\//, `Content imports presentation code: ${path}`);
  }
});

test('the visual system keeps its restrained iOS 7-inspired accents', () => {
  assert.match(css, /--canvas:\s*#f2f2f7/);
  assert.match(css, /--accent:\s*#005fc4/);
  for (const colour of ['007aff', '34aadc', '4cd964', 'ff2d55', 'ffcc00']) assert.match(css, new RegExp(`--ios-[^:]+:\\s*#${colour}`));
  assert.match(css, /--ambient-cool:\s*rgba\(18, 68, 128, \.1\)/);
  assert.match(css, /radial-gradient\(circle at 90% 22%, var\(--ambient-cool\), transparent 30rem\)/);
  assert.match(css, /--radius:\s*\.25rem/);
  assert.match(css, /--control-radius:\s*\.125rem/);
  assert.match(css, /--hairline:\s*1px/);
  assert.match(css, /@media \(min-resolution: 2dppx\)[\s\S]*--hairline:\s*\.5px/);
  assert.match(css, /\.button-primary, \.button-secondary \{[^}]*background:\s*transparent;[^}]*border:\s*none;/);
  assert.doesNotMatch(css, /box-shadow:/);
});

test('prose panels and borderless resource actions retain the content grid', () => {
  assert.match(css, /\.prose \{[^}]*max-width:\s*none;[^}]*width:\s*100%;/);
  assert.match(css, /\.prose > :where\(p, ul, ol, blockquote, pre\) \{[^}]*max-width:\s*68ch;/);
  assert.match(css, /\.prose > :first-child \{[^}]*margin-top:\s*0;/);
  assert.match(css, /\.resource-links \.button \{[^}]*padding-inline:\s*0;/);
  assert.match(css, /\.resource-links \.button:hover \{[^}]*background:\s*transparent;/);
});

test('glass surfaces are progressive and respect transparency preferences', () => {
  assert.match(css, /--glass-header:\s*rgba\(255, 255, 255, \.82\)/);
  assert.match(css, /@supports \(\(-webkit-backdrop-filter: blur\(1px\)\) or \(backdrop-filter: blur\(1px\)\)\)/);
  assert.match(css, /backdrop-filter:\s*blur\(22px\) saturate\(150%\)/);
  assert.match(css, /@media \(prefers-reduced-transparency: reduce\)[\s\S]*backdrop-filter:\s*none;/);
  assert.match(css, /@media \(prefers-contrast: more\)[\s\S]*backdrop-filter:\s*none;/);
  assert.match(css, /@media \(forced-colors: active\)[\s\S]*backdrop-filter:\s*none;/);
});

test('content uses flat iOS-style grouped surfaces instead of glass cards', () => {
  assert.match(css, /font-family:\s*'Helvetica Neue', -apple-system/);
  assert.match(css, /\.research-list \{[^}]*gap:\s*0;[^}]*border-block:\s*var\(--hairline\) solid var\(--separator\);/);
  assert.match(css, /\.research-card \{[^}]*border:\s*0;[^}]*border-radius:\s*0;/);
  assert.match(css, /\.publication-list \{[^}]*border-block:[^}]*border-inline:\s*0;[^}]*border-radius:\s*0;/);
  assert.match(css, /\.panel \{[^}]*border-block:[^}]*border-inline:\s*0;[^}]*border-radius:\s*0;/);
  const glassBlock = css.slice(css.indexOf('@supports ((-webkit-backdrop-filter'), css.indexOf('@keyframes menu-reveal'));
  assert.doesNotMatch(glassBlock, /\.research-card|\.publication-list|\.panel|\.illustration-caption/);
});

test('publication rows stay compact without shrinking action targets', () => {
  assert.match(css, /\.publication \{[^}]*padding:\s*1\.125rem 0;/);
  assert.match(css, /\.authors \{[^}]*line-height:\s*1\.5;[^}]*margin-top:\s*\.25rem;/);
  assert.match(css, /\.publication-actions \{[^}]*margin-top:\s*\.125rem;/);
  assert.match(css, /\.publication-actions > a, \.publication-summary summary \{[^}]*min-height:\s*2\.75rem;/);
});

test('mobile navigation expands as a full-width hairline-separated list', () => {
  assert.match(css, /\.header-inner \{[^}]*position:\s*relative;/);
  assert.match(css, /\.mobile-menu \{[^}]*position:\s*static;/);
  assert.match(css, /\.mobile-menu nav \{[^}]*inset-inline:\s*0;[^}]*top:\s*100%;[^}]*width:\s*auto;[^}]*border-radius:\s*0;/);
  assert.match(css, /\.mobile-menu nav a \+ a \{[^}]*border-top:\s*var\(--hairline\) solid var\(--separator\);/);
  assert.match(css, /\.mobile-menu nav a\[aria-current\] \{[^}]*background:\s*transparent;/);
});

const roles = ['canvas', 'surface', 'quiet', 'text', 'secondary', 'accent'];
function paletteFrom(block) {
  return Object.fromEntries(roles.map(role => [role, block.match(new RegExp(`--${role}:\\s*(#[a-f\\d]{6})`, 'i'))[1]]));
}
const palettes = {
  light: paletteFrom(css.slice(css.indexOf(':root {'), css.indexOf('@media'))),
  dark: paletteFrom(css.slice(css.indexOf('@media (prefers-color-scheme: dark)'), css.indexOf('* {'))),
};
function luminance(hex) {
  const rgb = hex.match(/[\da-f]{2}/gi).map(value => Number.parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
test('all text-role combinations exceed 4.5:1 in both palettes', () => {
  for (const [appearance, palette] of Object.entries(palettes)) {
    for (const fg of ['text', 'secondary', 'accent']) {
      for (const bg of ['canvas', 'surface', 'quiet']) {
        const [lighter, darker] = [luminance(palette[fg]), luminance(palette[bg])].sort((a, b) => b - a);
        const ratio = (lighter + .05) / (darker + .05);
        assert.ok(ratio >= 4.5, `${appearance} ${fg}/${bg}: ${ratio.toFixed(2)}`);
        console.log(`${appearance} ${fg}/${bg}: ${ratio.toFixed(2)}:1`);
      }
    }
  }
});
