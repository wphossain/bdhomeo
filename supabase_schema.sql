-- =========================================================================
-- BD HOMEO (বিডি হোমিও) - COMPLETE PRODUCTION DATABASE SCHEMA & RLS POLICIES
-- =========================================================================

-- 1. Create PROFILES Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

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

DROP POLICY IF EXISTS "Only admins can modify courses" ON public.courses;
CREATE POLICY "Only admins can modify courses" ON public.courses
  FOR ALL USING (
    auth.jwt() ->> 'email' IN (
      'mikailhossain3747@gmail.com',
      'geaus.uddin.81099@gmail.com',
      'bdhomeo@gmail.com',
      'homoeobangla.bd@gmail.com'
    )
  );

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

DROP POLICY IF EXISTS "Users can view own enrollments or admin view all" ON public.enrollments;
CREATE POLICY "Users can view own enrollments or admin view all" ON public.enrollments
  FOR SELECT USING (
    auth.jwt() ->> 'email' = student_email OR
    auth.jwt() ->> 'email' IN ('mikailhossain3747@gmail.com', 'geaus.uddin.81099@gmail.com', 'bdhomeo@gmail.com', 'homoeobangla.bd@gmail.com')
  );

DROP POLICY IF EXISTS "Students can insert their enrollment" ON public.enrollments;
CREATE POLICY "Students can insert their enrollment" ON public.enrollments
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update enrollments" ON public.enrollments;
CREATE POLICY "Admins can update enrollments" ON public.enrollments
  FOR UPDATE USING (
    auth.jwt() ->> 'email' IN ('mikailhossain3747@gmail.com', 'geaus.uddin.81099@gmail.com', 'bdhomeo@gmail.com', 'homoeobangla.bd@gmail.com')
  );

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

DROP POLICY IF EXISTS "Monthly payments viewable by student or admin" ON public.monthly_payments;
CREATE POLICY "Monthly payments viewable by student or admin" ON public.monthly_payments
  FOR SELECT USING (
    auth.jwt() ->> 'email' IN ('mikailhossain3747@gmail.com', 'geaus.uddin.81099@gmail.com', 'bdhomeo@gmail.com', 'homoeobangla.bd@gmail.com')
    OR true
  );

DROP POLICY IF EXISTS "Insert monthly payment" ON public.monthly_payments;
CREATE POLICY "Insert monthly payment" ON public.monthly_payments
  FOR INSERT WITH CHECK (true);

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

DROP POLICY IF EXISTS "Admins can view and manage orientation leads" ON public.orientation_leads;
CREATE POLICY "Admins can view and manage orientation leads" ON public.orientation_leads
  FOR ALL USING (
    auth.jwt() ->> 'email' IN ('mikailhossain3747@gmail.com', 'geaus.uddin.81099@gmail.com', 'bdhomeo@gmail.com', 'homoeobangla.bd@gmail.com')
  );

-- 6. Create SITE_SETTINGS Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  settings JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Site settings are viewable by everyone" ON public.site_settings;
CREATE POLICY "Site settings are viewable by everyone" ON public.site_settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can update site settings" ON public.site_settings;
CREATE POLICY "Admins can update site settings" ON public.site_settings
  FOR ALL USING (
    auth.jwt() ->> 'email' IN ('mikailhossain3747@gmail.com', 'geaus.uddin.81099@gmail.com', 'bdhomeo@gmail.com', 'homoeobangla.bd@gmail.com')
  );

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
