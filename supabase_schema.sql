-- BD Homeo Database Schema (Supabase PostgreSQL)

-- 1. Profiles Table (Students & Admins)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Site Settings & CMS Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  batch_type TEXT NOT NULL CHECK (batch_type IN ('basic', 'advance', 'special')),
  duration_months INT DEFAULT 6,
  admission_fee INT DEFAULT 1000,
  monthly_fee INT DEFAULT 500,
  live_schedule TEXT DEFAULT '??? ?:?? (??????? ? ???)',
  morning_support TEXT,
  thumbnail_url TEXT,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Lessons Table (YouTube Unlisted & PDF Hub)
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  chapter_no INT NOT NULL,
  title TEXT NOT NULL,
  duration_min INT DEFAULT 60,
  youtube_video_id TEXT,
  pdf_notes_url TEXT,
  pdf_notes_title TEXT,
  is_free_preview BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Enrollments Table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  admission_status TEXT DEFAULT 'pending' CHECK (admission_status IN ('pending', 'approved', 'rejected')),
  trx_id TEXT NOT NULL,
  sender_phone TEXT NOT NULL,
  payment_method TEXT DEFAULT 'bkash',
  notes TEXT,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

-- 6. Monthly Payments Table
CREATE TABLE IF NOT EXISTS public.monthly_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  month_name TEXT NOT NULL,
  amount INT DEFAULT 500,
  trx_id TEXT NOT NULL,
  sender_phone TEXT NOT NULL,
  payment_method TEXT DEFAULT 'bkash',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

-- 7. Orientation Leads Table
CREATE TABLE IF NOT EXISTS public.orientation_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  homeo_background TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'joined')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed Initial Site Settings
INSERT INTO public.site_settings (key, value) VALUES
('general', '{
  "site_name": "???? ????? ????????? ???????",
  "tagline": "Right Homeopath, Right Homeopathy",
  "instructor_name": "??? ??? ????? ??????",
  "instructor_designation": "?????? ???????????? ??????? ? ????????",
  "whatsapp_number": "01971357760",
  "bkash_number": "01971-357760",
  "bkash_type": "Personal (Send Money)",
  "nagad_number": "01971-357760",
  "nagad_type": "Personal (Send Money)",
  "notice_text": "????? ???? ??????? ????? ????! ???? ??????????? ?????? ??? ???? ???? ???????????? ?????",
  "notice_active": true,
  "google_meet_url": "https://meet.google.com/saa-myko-fkx",
  "class_time": "??? ?:??"
}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orientation_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for courses & site_settings
CREATE POLICY "Public can view active courses" ON public.courses FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (TRUE);
CREATE POLICY "Anyone can insert orientation leads" ON public.orientation_leads FOR INSERT WITH CHECK (TRUE);

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Lessons policy: Free preview or enrolled
CREATE POLICY "Enrolled students or free preview can view lessons" ON public.lessons FOR SELECT USING (
  is_free_preview = TRUE OR 
  EXISTS (
    SELECT 1 FROM public.enrollments 
    WHERE enrollments.course_id = lessons.course_id 
    AND enrollments.student_id = auth.uid() 
    AND enrollments.admission_status = 'approved'
  )
);
