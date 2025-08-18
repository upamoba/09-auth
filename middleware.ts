import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isPrivate = (path: string) => path.startsWith('/notes') || path.startsWith('/profile');
const isAuthRoute = (path: string) => path.startsWith('/sign-in') || path.startsWith('/sign-up');

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }
  let authed = false;
  try {
    const res = await fetch(`${origin}/api/auth/session`, {
      headers: { cookie: req.headers.get('cookie') ?? '' },
    });
    if (res.ok) {
      try {
        const j = await res.clone().json();
        authed = !!j?.email;
      } catch {
        authed = false;
      }
    }
  } catch {
    authed = false;
  }

  if (isPrivate(pathname) && !authed) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
  if (isAuthRoute(pathname) && authed) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico|api).*)'],
};