import { NextResponse } from 'next/server';
import { getPublicSection } from '@/lib/cms/repo';
import { getSectionDef } from '@/lib/cms/sections';

/** GET /api/public/magazine → { page, items } with active items only, in display order. */
export async function GET(_req: Request, ctx: { params: Promise<{ section: string }> }) {
  const { section } = await ctx.params;
  if (!getSectionDef(section)) return NextResponse.json({ error: 'Unknown section' }, { status: 404 });
  return NextResponse.json(getPublicSection(section), {
    headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  });
}
