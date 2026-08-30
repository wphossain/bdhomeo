-- BD Homeo Complete Supabase Schema
-- Run this in your Supabase SQL Editor: https://kcbettnkbbjnekbewzcu.supabase.co

-- 1. Profiles Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Site Settings Table (CMS)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'global_settings',
  site_title TEXT NOT NULL DEFAULT 'বিডি হোমিও প্রশিক্ষণ কেন্দ্র',
  slogan TEXT NOT NULL DEFAULT 'Right Homeopath, Right Homeopathy',
  hero_headline TEXT NOT NULL DEFAULT 'হোমিওপ্যাথির খাঁটি দর্শনে আত্মবিশ্বাসী প্র্যাকটিশনার হওয়ার ৬ মাসের মাস্টার একাডেমি',
  hero_subheadline TEXT NOT NULL DEFAULT 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি নির্দেশনায় অর্গানন অব মেডিসিন, মেটেরিয়া মেডিকা ও রেপার্টরি ভিত্তিক সপ্তাহে ২টি লাইভ ক্লাস ও ৬ দিন মর্নিং কেস সাপোর্ট।',
  doctor_name TEXT NOT NULL DEFAULT 'ডাঃ মোঃ গিয়াস উদ্দিন',
  doctor_title TEXT NOT NULL DEFAULT 'প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক, বিডি হোমিও',
  doctor_message TEXT NOT NULL DEFAULT 'অর্গাননের সঠিক জ্ঞান ছাড়া লক্ষণ ভিত্তিক হোমিওপ্যাথি চিকিৎসা অসম্ভব। আমাদের লক্ষ্য— প্রতিটি শিক্ষার্থী যেন কেবল তাত্ত্বিক জ্ঞান নয়, বরং চেম্বারে রোগী আরোগ্যের পূর্ণ আত্মবিশ্বাস নিয়ে চিকিৎসা সেবা প্রদান করতে পারেন।',
  hero_image_url TEXT NOT NULL DEFAULT '/assets/sir/sir-hero.jpg',
  doctor_portrait_url TEXT NOT NULL DEFAULT '/assets/sir/sir-portrait.jpg',
  ptf_certificate_image_url TEXT NOT NULL DEFAULT '/assets/gallery/certificate-ptf-1.jpg',
  gallery_images JSONB DEFAULT '[]'::jsonb,
  bkash_number TEXT NOT NULL DEFAULT '01815-883101',
  bkash_type TEXT NOT NULL DEFAULT 'Merchant',
  nagad_number TEXT NOT NULL DEFAULT '01811-123993',
  nagad_type TEXT NOT NULL DEFAULT 'Personal',
  whatsapp_number TEXT NOT NULL DEFAULT '01811-123993',
  helpline_number TEXT NOT NULL DEFAULT '01811-123993',
  class_time TEXT NOT NULL DEFAULT 'রাত ৯:৩০ টা',
  google_meet_url TEXT NOT NULL DEFAULT 'https://meet.google.com/bdhomeo-live-class',
  notice_text TEXT NOT NULL DEFAULT 'আগামী নতুন ব্যাচের ভর্তি চলছে! ফ্রি ওরিয়েন্টেশন ক্লাসে অংশ নিতে এখনই রেজিস্ট্রেশন করুন। হেল্পলাইন: 01811-123993',
  youtube_url TEXT NOT NULL DEFAULT 'https://www.youtube.com/@bdhomeo/videos',
  facebook_url TEXT NOT NULL DEFAULT 'https://www.facebook.com/geaus.uddin.81099',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  batch_type TEXT NOT NULL CHECK (batch_type IN ('basic', 'advance', 'special')),
  duration_months INTEGER DEFAULT 6 NOT NULL,
  admission_fee NUMERIC DEFAULT 1000 NOT NULL,
  monthly_fee NUMERIC DEFAULT 500 NOT NULL,
  live_schedule TEXT NOT NULL,
  morning_support TEXT,
  thumbnail_url TEXT,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  curriculum JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enrollments Table (Admission Applications)
CREATE TABLE IF NOT EXISTS public.enrollments (
  id TEXT PRIMARY KEY DEFAULT 'enr_' || gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_phone TEXT NOT NULL,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  course_title TEXT NOT NULL,
  batch_type TEXT NOT NULL,
  admission_status TEXT DEFAULT 'pending' CHECK (admission_status IN ('pending', 'approved', 'rejected')),
  trx_id TEXT NOT NULL,
  sender_phone TEXT NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('bkash', 'nagad')),
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Monthly Payments Table (500 BDT Monthly Fee)
CREATE TABLE IF NOT EXISTS public.monthly_payments (
  id TEXT PRIMARY KEY DEFAULT 'pay_' || gen_random_uuid(),
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  student_phone TEXT NOT NULL,
  course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
  course_title TEXT NOT NULL,
  month_name TEXT NOT NULL,
  amount NUMERIC DEFAULT 500 NOT NULL,
  trx_id TEXT NOT NULL,
  sender_phone TEXT NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('bkash', 'nagad')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Orientation Leads Table (Free Class Attendees)
CREATE TABLE IF NOT EXISTS public.orientation_leads (
  id TEXT PRIMARY KEY DEFAULT 'lead_' || gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  homeo_background TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'joined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.monthly_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orientation_leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to prevent conflict
DROP POLICY IF EXISTS "Public can read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public can read site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Public can read courses" ON public.courses;
DROP POLICY IF EXISTS "Anyone can insert enrollment" ON public.enrollments;
DROP POLICY IF EXISTS "Anyone can insert monthly payment" ON public.monthly_payments;
DROP POLICY IF EXISTS "Anyone can insert lead" ON public.orientation_leads;

-- Profiles Policies
CREATE POLICY "Public can read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Site Settings & Courses
CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can read courses" ON public.courses FOR SELECT USING (true);

-- Forms & Transactions Policies
CREATE POLICY "Anyone can insert enrollment" ON public.enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read enrollments" ON public.enrollments FOR SELECT USING (true);
CREATE POLICY "Anyone can insert monthly payment" ON public.monthly_payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read monthly payments" ON public.monthly_payments FOR SELECT USING (true);
CREATE POLICY "Anyone can insert lead" ON public.orientation_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read leads" ON public.orientation_leads FOR SELECT USING (true);

-- Insert initial default settings
INSERT INTO public.site_settings (id, bkash_number, bkash_type, nagad_number, nagad_type, whatsapp_number, helpline_number)
VALUES ('global_settings', '01815-883101', 'Merchant', '01811-123993', 'Personal', '01811-123993', '01811-123993')
ON CONFLICT (id) DO UPDATE SET
  bkash_number = '01815-883101',
  bkash_type = 'Merchant',
  nagad_number = '01811-123993',
  whatsapp_number = '01811-123993',
  helpline_number = '01811-123993';