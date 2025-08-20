import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthRoute = pathname === '/sign-in' || pathname === '/sign-up';
  const isPrivateRoute = pathname.startsWith('/profile') || pathname.startsWith('/notes');
  const store = await cookies();
  const accessToken = store.get('accessToken')?.value ?? '';
  const refreshToken = store.get('refreshToken')?.value ?? '';
  if (accessToken) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }
  if (!accessToken && refreshToken) {
    try {
      const sessionUrl = new URL('/api/auth/session', req.url);
      const res = await fetch(sessionUrl, {
        method: 'GET',
        headers: {
          cookie: req.headers.get('cookie') ?? '',
        },
      });
      const setCookieHeader = res.headers.get('set-cookie');
      const { success } = (await res.json().catch(() => ({ success: false }))) as {
        success?: boolean;
      };

      if (success) {
  
        if (isAuthRoute) {
          const redirect = NextResponse.redirect(new URL('/', req.url));
          if (setCookieHeader) redirect.headers.set('set-cookie', setCookieHeader);
          return redirect;
        }
        const next = NextResponse.next();
        if (setCookieHeader) next.headers.set('set-cookie', setCookieHeader);
        return next;
      }
    } catch {
    }
  }

  if (isPrivateRoute) {
    const loginUrl = new URL('/sign-in', req.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};