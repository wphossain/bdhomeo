import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kcbettnkbbjnekbewzcu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjYmV0dG5rYmJqbmVrYmV3emN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNDQyMjYsImV4cCI6MjEwMzYyMDIyNn0.Vbp4QVpUN9lzWe2qq05ahOXpt01l4A8cXMEuaW9G-lc';

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

export const ADMIN_EMAILS = [
  'mcdanielnehemiah12@gmail.com',
  'mikailhossain3747@gmail.com',
  'geaus.uddin.81099@gmail.com',
  'bdhomeo@gmail.com',
  'homoeobangla.bd@gmail.com',
];

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

/**
 * Uploads an image file to Supabase Storage Bucket ('bdhomeo-media')
 * and returns the public CDN URL.
 */
export async function uploadImageToSupabase(file: File, folder: string = 'gallery'): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('bdhomeo-media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.warn('Storage upload notice:', error.message);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('bdhomeo-media')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.warn('Upload exception:', err);
    return null;
  }
}
