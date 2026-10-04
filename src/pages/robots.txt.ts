import type { APIRoute } from 'astro';
import { isPreview } from '../config';
export const GET: APIRoute = () => new Response(
  `User-agent: *\n${isPreview ? 'Disallow: /' : 'Allow: /'}\n`,
  { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
);
