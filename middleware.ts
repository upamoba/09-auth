import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

function forwardSetCookie(from: Response, to: NextResponse){
  from.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      to.headers.append('set-cookie', value);
    }
  });
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuthRoute = pathname === '/sign-in' || pathname === '/sign-up';
  const isPrivateRoute =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken && refreshToken) {
    const sessionRes = await fetch(new URL('/api/auth/session', req.url), {
      headers: {cookie: req.headers.get('cookie') ?? ''},
      cache: 'no-store',
    });
  const baseNext = NextResponse.next();
  forwardSetCookie(sessionRes, baseNext);
  let success = false;
  try {
    const body = (await sessionRes.json()) as { success?: boolean };
    success = Boolean(body?.success); 
  }catch{
    success = false;
  }
  if(success){
    if(isAuthRoute){
      const res = NextResponse.redirect(new URL('/profile',req.url) );
      forwardSetCookie(sessionRes, res)
      return res;
    }
    return baseNext;
  }
if(isPrivateRoute){
  const loginUrl = new URL('/sign-in',req.url);
  loginUrl.searchParams.set('next',pathname);
}
return baseNext;
  }

  if (!accessToken && isPrivateRoute) {
    const loginUrl = new URL('/sign-in', req.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }
  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/profile', req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
