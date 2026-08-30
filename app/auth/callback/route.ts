import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_EMAILS, isAdminEmail } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || requestUrl.searchParams.get('redirect') || '/dashboard';

  let targetRedirect = next;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kcbettnkbbjnekbewzcu.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjYmV0dG5rYmJqbmVrYmV3emN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNDQyMjYsImV4cCI6MjEwMzYyMDIyNn0.Vbp4QVpUN9lzWe2qq05ahOXpt01l4A8cXMEuaW9G-lc';

  let response = NextResponse.redirect(new URL(targetRedirect, requestUrl.origin));

  if (code) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data?.user?.email) {
      if (isAdminEmail(data.user.email)) {
        targetRedirect = '/admin';
      }
      response = NextResponse.redirect(new URL(targetRedirect, requestUrl.origin));
    }
  }

  return response;
}
