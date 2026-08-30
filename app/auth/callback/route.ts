import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { isAdminEmail } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || requestUrl.searchParams.get('redirect') || '/dashboard';
  const origin = requestUrl.origin;

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kcbettnkbbjnekbewzcu.supabase.co';
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjYmV0dG5rYmJqbmVrYmV3emN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNDQyMjYsImV4cCI6MjEwMzYyMDIyNn0.Vbp4QVpUN9lzWe2qq05ahOXpt01l4A8cXMEuaW9G-lc';

    let targetRedirect = next;
    let initialResponse = NextResponse.redirect(new URL(targetRedirect, origin));

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          cookiesToSet.forEach(({ name, value, options }) => {
            initialResponse.cookies.set(name, value, options);
          });
        },
      },
    });

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user?.email) {
      if (isAdminEmail(data.user.email)) {
        targetRedirect = '/admin';
      }

      const finalResponse = NextResponse.redirect(new URL(targetRedirect, origin));
      initialResponse.cookies.getAll().forEach((cookie) => {
        finalResponse.cookies.set(cookie.name, cookie.value);
      });
      return finalResponse;
    }
  }

  // Fallback if code exchange failed
  return NextResponse.redirect(new URL('/auth/login?error=auth_failed', origin));
}
