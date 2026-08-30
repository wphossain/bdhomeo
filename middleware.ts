import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isDashboardRoute = pathname.startsWith('/dashboard');

  if (!isAdminRoute && !isDashboardRoute) {
    return NextResponse.next();
  }

  // Look for Supabase auth cookies
  const cookies = request.cookies.getAll();
  const hasAuthCookie = cookies.some((c) => 
    c.name.includes('auth-token') || c.name.includes('sb-')
  );

  // If attempting to access dashboard or admin without any auth cookies, redirect to login
  if (!hasAuthCookie) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
