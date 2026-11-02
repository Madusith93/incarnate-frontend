import fs from 'node:fs/promises';
import path from 'node:path';
import { MIME_BY_EXT, resolveUpload } from '@/lib/cms/uploads';

/** Serves files uploaded through the admin (stored outside /public so they survive deploys). */
export async function GET(_req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await ctx.params;
  const abs = resolveUpload(segments.join('/'));
  const mime = abs ? MIME_BY_EXT[path.extname(abs).slice(1).toLowerCase()] : undefined;
  if (!abs || !mime) return new Response('Not found', { status: 404 });
  try {
    const file = await fs.readFile(abs);
    return new Response(new Uint8Array(file), {
      headers: {
        'Content-Type': mime,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
