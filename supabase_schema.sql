-- =========================================================================
-- BD HOMEO (বিডি হোমিও প্রশিক্ষণ কেন্দ্র) - SECURE ENTERPRISE RLS SCHEMA
-- Run this complete SQL script in your Supabase Dashboard -> SQL Editor
-- =========================================================================

-- 1. Helper function to check if current authenticated user is an Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
DECLARE
  current_user_email TEXT;
BEGIN
  -- Check via auth.jwt email claim first
  current_user_email := LOWER(COALESCE(auth.jwt()->>'email', ''));
  IF current_user_email IN (
    'mikailhossain3747@gmail.com',
    'geaus.uddin.81099@gmail.com',
    'bdhomeo@gmail.com',
    'homoeobangla.bd@gmail.com'
  ) THEN
    RETURN TRUE;
  END IF;

  -- Fallback check via profiles table role
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create / Upgrade PROFILES Table & Secure RLS
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

DROP POLICY IF EXISTS "Profiles viewable by owner or admin" ON public.profiles;
CREATE POLICY "Profiles viewable by owner or admin" ON public.profiles
  FOR SELECT USING (public.is_admin() OR auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND (
      public.is_admin() OR 
      role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
    )
  );

-- 3. Create / Upgrade COURSES Table & Secure RLS
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

DROP POLICY IF EXISTS "Only admins can insert courses" ON public.courses;
CREATE POLICY "Only admins can insert courses" ON public.courses
  FOR INSERT WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Only admins can update courses" ON public.courses;
CREATE POLICY "Only admins can update courses" ON public.courses
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Only admins can delete courses" ON public.courses;
CREATE POLICY "Only admins can delete courses" ON public.courses
  FOR DELETE USING (public.is_admin());

-- 4. Create / Upgrade SITE_SETTINGS Table & Secure RLS
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY,
  site_title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  helpline_number TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  emergency_number TEXT,
  chamber_address TEXT NOT NULL,
  google_meet_url TEXT NOT NULL,
  morning_support_time TEXT NOT NULL,
  class_time TEXT NOT NULL,
  notice_text TEXT,
  is_admission_open BOOLEAN NOT NULL DEFAULT true,
  admission_deadline TEXT,
  stats JSONB NOT NULL DEFAULT '[]'::jsonb,
  faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
  gallery_images JSONB NOT NULL DEFAULT '[]'::jsonb,
  video_showcase_list JSONB NOT NULL DEFAULT '[]'::jsonb,
  testimonials JSONB NOT NULL DEFAULT '[]'::jsonb,
  bkash_number TEXT NOT NULL,
  bkash_type TEXT NOT NULL,
  nagad_number TEXT NOT NULL,
  nagad_type TEXT NOT NULL,
  rocket_number TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Site settings readable by everyone" ON public.site_settings;
CREATE POLICY "Site settings readable by everyone" ON public.site_settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Only admins can insert/update settings" ON public.site_settings;
CREATE POLICY "Only admins can insert/update settings" ON public.site_settings
  FOR INSERT WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Only admins can update settings" ON public.site_settings;
CREATE POLICY "Only admins can update settings" ON public.site_settings
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 5. Create / Upgrade ENROLLMENTS Table & Secure Strict RLS
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
  amount INT NOT NULL DEFAULT 1000,
  trx_id TEXT NOT NULL,
  sender_phone TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS amount INT NOT NULL DEFAULT 1000;
DO $$ BEGIN
  ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_trx_id_unique UNIQUE (trx_id);
EXCEPTION
  WHEN duplicate_table THEN NULL;
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- Students only see their own enrollments, Admins see all
DROP POLICY IF EXISTS "Students can view their own enrollments" ON public.enrollments;
CREATE POLICY "Students can view their own enrollments" ON public.enrollments
  FOR SELECT USING (
    public.is_admin() OR 
    auth.uid()::text = student_id OR
    LOWER(student_email) = LOWER(COALESCE(auth.jwt()->>'email', ''))
  );

-- Students can insert only pending enrollments for themselves
DROP POLICY IF EXISTS "Students can insert pending enrollment" ON public.enrollments;
CREATE POLICY "Students can insert pending enrollment" ON public.enrollments
  FOR INSERT WITH CHECK (
    (auth.uid()::text = student_id OR public.is_admin() OR auth.uid() IS NOT NULL) AND
    (admission_status = 'pending' OR public.is_admin())
  );

-- Only Admins can approve/reject/modify enrollments
DROP POLICY IF EXISTS "Admins can update enrollments" ON public.enrollments;
CREATE POLICY "Admins can update enrollments" ON public.enrollments
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete enrollments" ON public.enrollments;
CREATE POLICY "Admins can delete enrollments" ON public.enrollments
  FOR DELETE USING (public.is_admin());

-- 6. Create / Upgrade MONTHLY_PAYMENTS Table & Secure Strict RLS
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

DO $$ BEGIN
  ALTER TABLE public.monthly_payments ADD CONSTRAINT monthly_payments_trx_id_unique UNIQUE (trx_id);
EXCEPTION
  WHEN duplicate_table THEN NULL;
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE public.monthly_payments ENABLE ROW LEVEL SECURITY;

-- Students only see their own payments, Admins see all
DROP POLICY IF EXISTS "Students can view their monthly payments" ON public.monthly_payments;
CREATE POLICY "Students can view their monthly payments" ON public.monthly_payments
  FOR SELECT USING (
    public.is_admin() OR 
    auth.uid()::text = student_id
  );

-- Students can insert pending payments
DROP POLICY IF EXISTS "Students can submit monthly payment" ON public.monthly_payments;
CREATE POLICY "Students can submit monthly payment" ON public.monthly_payments
  FOR INSERT WITH CHECK (
    (auth.uid()::text = student_id OR public.is_admin() OR auth.uid() IS NOT NULL) AND
    (status = 'pending' OR public.is_admin())
  );

-- Only Admins can update/delete payment records
DROP POLICY IF EXISTS "Admins can update monthly payments" ON public.monthly_payments;
CREATE POLICY "Admins can update monthly payments" ON public.monthly_payments
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete monthly payments" ON public.monthly_payments;
CREATE POLICY "Admins can delete monthly payments" ON public.monthly_payments
  FOR DELETE USING (public.is_admin());

-- 7. Create / Upgrade ORIENTATION_LEADS Table & Secure RLS
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

-- Anyone can submit orientation registration lead
DROP POLICY IF EXISTS "Anyone can register for free orientation" ON public.orientation_leads;
CREATE POLICY "Anyone can register for free orientation" ON public.orientation_leads
  FOR INSERT WITH CHECK (true);

-- Only Admins can view leads (prevents student PII leakage)
DROP POLICY IF EXISTS "Admins can view leads" ON public.orientation_leads;
CREATE POLICY "Admins can view leads" ON public.orientation_leads
  FOR SELECT USING (public.is_admin());

-- Only Admins can update lead status
DROP POLICY IF EXISTS "Admins can update lead status" ON public.orientation_leads;
CREATE POLICY "Admins can update lead status" ON public.orientation_leads
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete leads" ON public.orientation_leads;
CREATE POLICY "Admins can delete leads" ON public.orientation_leads
  FOR DELETE USING (public.is_admin());

-- 8. Create / Upgrade CERTIFICATE_REQUESTS Table & Secure RLS (PTF Delivery)
CREATE TABLE IF NOT EXISTS public.certificate_requests (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  phone TEXT NOT NULL,
  courier_address TEXT NOT NULL,
  district TEXT,
  course_id TEXT NOT NULL,
  course_title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'dispatched', 'delivered')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.certificate_requests ENABLE ROW LEVEL SECURITY;

-- Students see only their own certificate requests, Admins see all
DROP POLICY IF EXISTS "Students can see their own certificate requests" ON public.certificate_requests;
CREATE POLICY "Students can see their own certificate requests" ON public.certificate_requests
  FOR SELECT USING (
    public.is_admin() OR 
    auth.uid()::text = student_id OR
    LOWER(student_email) = LOWER(COALESCE(auth.jwt()->>'email', ''))
  );

-- Students can submit only pending certificate requests
DROP POLICY IF EXISTS "Students can insert certificate request" ON public.certificate_requests;
CREATE POLICY "Students can insert certificate request" ON public.certificate_requests
  FOR INSERT WITH CHECK (
    (auth.uid()::text = student_id OR public.is_admin() OR auth.uid() IS NOT NULL) AND
    (status = 'pending' OR public.is_admin())
  );

-- Only Admins can update delivery status (dispatched/delivered)
DROP POLICY IF EXISTS "Admins can update certificate requests" ON public.certificate_requests;
CREATE POLICY "Admins can update certificate requests" ON public.certificate_requests
  FOR UPDATE USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins can delete certificate requests" ON public.certificate_requests;
CREATE POLICY "Admins can delete certificate requests" ON public.certificate_requests
  FOR DELETE USING (public.is_admin());

-- 9. Automatic PostgreSQL Auth Trigger for New Google Logins
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, phone, role)
  VALUES (
    NEW.id,
    LOWER(NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'হোমিও শিক্ষার্থী'),
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'phone',
    CASE
      WHEN LOWER(NEW.email) IN (
        'mikailhossain3747@gmail.com',
        'geaus.uddin.81099@gmail.com',
        'bdhomeo@gmail.com',
        'homoeobangla.bd@gmail.com'
      ) THEN 'admin'
      ELSE 'student'
    END
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    role = CASE
      WHEN LOWER(EXCLUDED.email) IN (
        'mikailhossain3747@gmail.com',
        'geaus.uddin.81099@gmail.com',
        'bdhomeo@gmail.com',
        'homoeobangla.bd@gmail.com'
      ) THEN 'admin'
      ELSE profiles.role
    END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
