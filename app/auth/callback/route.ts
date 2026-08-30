import { NextResponse } from 'next/server';
import { supabase, isAdminEmail } from '@/lib/supabase';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  let targetRedirect = '/dashboard';

  if (code) {
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    if (data?.user?.email && isAdminEmail(data.user.email)) {
      targetRedirect = '/admin';
    }
  }

  return NextResponse.redirect(new URL(targetRedirect, requestUrl.origin));
}
