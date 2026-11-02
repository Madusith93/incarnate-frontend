import { NextResponse } from 'next/server';
import { getPublicItem } from '@/lib/cms/repo';
import { getSectionDef } from '@/lib/cms/sections';

/** GET /api/public/magazine/<slug> → one active item (with its active sub content). */
export async function GET(_req: Request, ctx: { params: Promise<{ section: string; slug: string }> }) {
  const { section, slug } = await ctx.params;
  if (!getSectionDef(section)) return NextResponse.json({ error: 'Unknown section' }, { status: 404 });
  const item = getPublicItem(section, slug);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item, {
    headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}
