import { defineConfig } from 'astro/config';

// The preview is deliberately not indexed. Replace SITE_URL and set
// PUBLIC_IS_PREVIEW=false only when publishing the finished professional site.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.org',
  base: process.env.ASTRO_BASE || '/',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: { shikiConfig: { theme: 'github-light' } },
});
