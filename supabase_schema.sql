-- =========================================================================
-- BD HOMEO (বিডি হোমিও প্রশিক্ষণ কেন্দ্র) - MASTER SUPABASE DATABASE SCHEMA
-- Run this complete SQL script in your Supabase Dashboard -> SQL Editor
-- =========================================================================

-- 1. Create PROFILES Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (true);

-- 2. Create COURSES Table
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  batch_type TEXT NOT NULL CHECK (batch_type IN ('basic', 'advance', 'special')),
  duration_months INT NOT NULL DEFAULT 6,
  admission_fee INT NOT NULL DEFAULT 1000,
  monthly_fee INT NOT NULL DEFAULT 500,
  live_schedule TEXT NOT NULL,
  morning_support TEXT,
  thumbnail_url TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  curriculum JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Courses are readable by everyone" ON public.courses;
CREATE POLICY "Courses are readable by everyone" ON public.courses
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone or admins can modify courses" ON public.courses;
CREATE POLICY "Anyone or admins can modify courses" ON public.courses
  FOR ALL USING (true) WITH CHECK (true);

-- 3. Create ENROLLMENTS Table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_phone TEXT NOT NULL,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  batch_type TEXT NOT NULL,
  admission_status TEXT NOT NULL DEFAULT 'pending' CHECK (admission_status IN ('pending', 'approved', 'rejected')),
  trx_id TEXT NOT NULL,
  sender_phone TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enrollments viewable by all" ON public.enrollments;
CREATE POLICY "Enrollments viewable by all" ON public.enrollments
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Students can insert their enrollment" ON public.enrollments;
CREATE POLICY "Students can insert their enrollment" ON public.enrollments
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update enrollments" ON public.enrollments;
CREATE POLICY "Admins can update enrollments" ON public.enrollments
  FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can delete enrollments" ON public.enrollments;
CREATE POLICY "Admins can delete enrollments" ON public.enrollments
  FOR DELETE USING (true);

-- 4. Create MONTHLY_PAYMENTS Table
CREATE TABLE IF NOT EXISTS public.monthly_payments (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_phone TEXT NOT NULL,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  month_name TEXT NOT NULL,
  amount INT NOT NULL DEFAULT 500,
  trx_id TEXT NOT NULL,
  sender_phone TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.monthly_payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Monthly payments viewable by all" ON public.monthly_payments;
CREATE POLICY "Monthly payments viewable by all" ON public.monthly_payments
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Insert monthly payment" ON public.monthly_payments;
CREATE POLICY "Insert monthly payment" ON public.monthly_payments
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Update monthly payment" ON public.monthly_payments;
CREATE POLICY "Update monthly payment" ON public.monthly_payments
  FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Delete monthly payment" ON public.monthly_payments;
CREATE POLICY "Delete monthly payment" ON public.monthly_payments
  FOR DELETE USING (true);

-- 5. Create ORIENTATION_LEADS Table
CREATE TABLE IF NOT EXISTS public.orientation_leads (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  homeo_background TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'joined')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.orientation_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit orientation lead" ON public.orientation_leads;
CREATE POLICY "Anyone can submit orientation lead" ON public.orientation_leads
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view orientation leads" ON public.orientation_leads;
CREATE POLICY "Anyone can view orientation leads" ON public.orientation_leads
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can update orientation leads" ON public.orientation_leads;
CREATE POLICY "Anyone can update orientation leads" ON public.orientation_leads
  FOR UPDATE USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can delete orientation leads" ON public.orientation_leads;
CREATE POLICY "Anyone can delete orientation leads" ON public.orientation_leads
  FOR DELETE USING (true);

-- 6. Create SITE_SETTINGS Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_settings',
  site_title TEXT,
  slogan TEXT,
  hero_headline TEXT,
  hero_subheadline TEXT,
  doctor_name TEXT,
  doctor_title TEXT,
  doctor_degrees TEXT,
  doctor_experience TEXT,
  doctor_chamber_time TEXT,
  doctor_message TEXT,
  hero_image_url TEXT,
  doctor_portrait_url TEXT,
  ptf_certificate_image_url TEXT,
  meta_og_image_url TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  video_showcase_list JSONB DEFAULT '[]'::jsonb,
  testimonials JSONB DEFAULT '[]'::jsonb,
  bkash_number TEXT,
  bkash_type TEXT,
  nagad_number TEXT,
  nagad_type TEXT,
  rocket_number TEXT,
  whatsapp_number TEXT,
  helpline_number TEXT,
  alternate_helpline TEXT,
  official_email TEXT,
  chamber_address TEXT,
  class_time TEXT,
  morning_support_time TEXT,
  google_meet_url TEXT,
  notice_text TEXT,
  youtube_url TEXT,
  facebook_url TEXT,
  facebook_group_url TEXT,
  telegram_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Site settings are viewable by everyone" ON public.site_settings;
CREATE POLICY "Site settings are viewable by everyone" ON public.site_settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Site settings can be updated by all" ON public.site_settings;
CREATE POLICY "Site settings can be updated by all" ON public.site_settings
  FOR ALL USING (true) WITH CHECK (true);

-- 7. Automatic PostgreSQL Auth Trigger for New Google Logins
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  assigned_role TEXT;
BEGIN
  IF LOWER(NEW.email) IN (
    'mikailhossain3747@gmail.com',
    'geaus.uddin.81099@gmail.com',
    'bdhomeo@gmail.com',
    'homoeobangla.bd@gmail.com'
  ) THEN
    assigned_role := 'admin';
  ELSE
    assigned_role := 'student';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', NULL),
    assigned_role
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url),
    role = assigned_role;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill existing users
INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', split_part(email, '@', 1)),
  COALESCE(raw_user_meta_data->>'avatar_url', raw_user_meta_data->>'picture', NULL),
  CASE 
    WHEN LOWER(email) IN ('mikailhossain3747@gmail.com', 'geaus.uddin.81099@gmail.com', 'bdhomeo@gmail.com', 'homoeobangla.bd@gmail.com') THEN 'admin'
    ELSE 'student'
  END
FROM auth.users
ON CONFLICT (id) DO UPDATE SET
  role = CASE 
    WHEN LOWER(EXCLUDED.email) IN ('mikailhossain3747@gmail.com', 'geaus.uddin.81099@gmail.com', 'bdhomeo@gmail.com', 'homoeobangla.bd@gmail.com') THEN 'admin'
    ELSE 'student'
  END;
