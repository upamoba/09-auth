import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthRoute = pathname === '/sign-in' || pathname === '/sign-up';
  const isPrivateRoute =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && !!refreshToken) {
    const refreshUrl = new URL('/api/auth/refresh', req.url);
    refreshUrl.searchParams.set('next', pathname);

    return NextResponse.redirect(refreshUrl);
  }


  if (!accessToken && isPrivateRoute) {
    const loginUrl = new URL('/sign-in', req.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }
  if (accessToken && isAuthRoute) {
    const profileUrl = new URL('/profile', req.url);
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};