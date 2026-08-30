import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kcbettnkbbjnekbewzcu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjYmV0dG5rYmJqbmVrYmV3emN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNDQyMjYsImV4cCI6MjEwMzYyMDIyNn0.Vbp4QVpUN9lzWe2qq05ahOXpt01l4A8cXMEuaW9G-lc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Admin emails (Only Sir and your email can be initial admins)
export const DEFAULT_ADMIN_EMAILS = [
  'mikailhossain3747@gmail.com',
  'geaus.uddin.81099@gmail.com',
  'bdhomeo@gmail.com',
];

export function isInitialAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return DEFAULT_ADMIN_EMAILS.includes(email.toLowerCase().trim());
}