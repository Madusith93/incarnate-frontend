import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * First line of defence: send visitors without a session cookie to the login page.
 * The cookie is cryptographically verified again in every admin page, server action
 * and API route (see lib/cms/auth.ts → requireUser), so this is only a fast redirect.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/admin/login') return NextResponse.next();
  if (!request.cookies.get('cms_session')) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  const res = NextResponse.next();
  res.headers.set('Cache-Control', 'no-store');
  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
