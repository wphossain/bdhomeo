'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  UserProfile, 
  Course, 
  SiteSettings, 
  Enrollment, 
  MonthlyPayment, 
  OrientationLead,
  CertificateRequest,
  ToastNotification 
} from './types';
import { initialCourses, initialSiteSettings } from './data';
import { supabase, isAdminEmail } from './supabase';

interface AppContextType {
  user: UserProfile | null;
  courses: Course[];
  settings: SiteSettings;
  enrollments: Enrollment[];
  monthlyPayments: MonthlyPayment[];
  leads: OrientationLead[];
  isAuthLoading: boolean;
  isDataSyncing: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshData: () => Promise<void>;
  certificateRequests: CertificateRequest[];
  submitCertificateRequest: (data: { phone: string; courierAddress: string; district?: string; courseId: string; courseTitle: string }) => Promise<boolean>;
  updateCertificateStatus: (id: string, status: 'pending' | 'dispatched' | 'delivered') => Promise<void>;
  submitEnrollment: (data: { courseId: string; trxId: string; senderPhone: string; studentPhone?: string; paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'cash' }) => Promise<boolean>;
  addManualEnrollment: (data: { studentName: string; studentEmail: string; studentPhone: string; courseId: string; batchType?: 'basic' | 'advance' | 'special'; paymentMethod: 'bkash' | 'nagad' | 'cash' | 'rocket'; senderPhone: string; trxId: string; admissionStatus?: 'approved' | 'pending'; amount?: number }) => Promise<boolean>;
  approveEnrollment: (enrollmentId: string) => Promise<void>;
  rejectEnrollment: (enrollmentId: string) => Promise<void>;
  submitMonthlyPayment: (data: { courseId: string; monthName: string; trxId: string; senderPhone: string; paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'cash' }) => Promise<boolean>;
  addManualMonthlyPayment: (data: { studentName: string; studentPhone: string; courseId: string; monthName: string; amount: number; paymentMethod: 'bkash' | 'nagad' | 'cash' | 'rocket'; senderPhone: string; trxId: string; status?: 'approved' | 'pending' }) => Promise<boolean>;
  approveMonthlyPayment: (paymentId: string) => Promise<void>;
  rejectMonthlyPayment: (paymentId: string) => Promise<void>;
  submitOrientationLead: (data: { name: string; phone: string; email?: string; homeoBackground: string }) => Promise<boolean>;
  updateLeadStatus: (leadId: string, status: 'contacted' | 'joined') => Promise<void>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<boolean>;
  updateCourses: (updatedCourses: Course[]) => Promise<boolean>;
  saveCourse: (course: Course) => Promise<boolean>;
  deleteCourse: (courseId: string) => Promise<boolean>;
  toast: ToastNotification | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isDataSyncing, setIsDataSyncing] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [monthlyPayments, setMonthlyPayments] = useState<MonthlyPayment[]>([]);
  const [leads, setLeads] = useState<OrientationLead[]>([]);
  const [toast, setToast] = useState<ToastNotification | null>(null);
  const [certificateRequests, setCertificateRequests] = useState<CertificateRequest[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const newToast: ToastNotification = { id: Date.now().toString(), message, type };
    setToast(newToast);
    setTimeout(() => {
      setToast((current) => (current?.id === newToast.id ? null : current));
    }, 4500);
  }, []);

  // =========================================================================
  // 1. SUPABASE FETCH & TWO-WAY SYNC
  // =========================================================================
  const refreshData = useCallback(async () => {
    setIsDataSyncing(true);
    try {
      // 1. Fetch Site Settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (!settingsError && settingsData) {
        setSettings((prev) => ({
          ...prev,
          siteTitle: settingsData.site_title || prev.siteTitle,
          slogan: settingsData.slogan || prev.slogan,
          heroHeadline: settingsData.hero_headline || prev.heroHeadline,
          heroSubheadline: settingsData.hero_subheadline || prev.heroSubheadline,
          doctorName: settingsData.doctor_name || prev.doctorName,
          doctorTitle: settingsData.doctor_title || prev.doctorTitle,
          doctorDegrees: settingsData.doctor_degrees || prev.doctorDegrees,
          doctorExperience: settingsData.doctor_experience || prev.doctorExperience,
          doctorChamberTime: settingsData.doctor_chamber_time || prev.doctorChamberTime,
          doctorMessage: settingsData.doctor_message || prev.doctorMessage,
          heroImageUrl: settingsData.hero_image_url || prev.heroImageUrl,
          doctorPortraitUrl: settingsData.doctor_portrait_url || prev.doctorPortraitUrl,
          ptfCertificateImageUrl: settingsData.ptf_certificate_image_url || prev.ptfCertificateImageUrl,
          metaOgImageUrl: settingsData.meta_og_image_url || prev.metaOgImageUrl,
          galleryImages: settingsData.gallery_images && settingsData.gallery_images.length > 0 ? settingsData.gallery_images : prev.galleryImages,
          videoShowcaseList: settingsData.video_showcase_list && settingsData.video_showcase_list.length > 0 ? settingsData.video_showcase_list : prev.videoShowcaseList,
          testimonials: settingsData.testimonials && settingsData.testimonials.length > 0 ? settingsData.testimonials : prev.testimonials,
          bkashNumber: settingsData.bkash_number || prev.bkashNumber,
          bkashType: (settingsData.bkash_type as any) || prev.bkashType,
          nagadNumber: settingsData.nagad_number || prev.nagadNumber,
          nagadType: (settingsData.nagad_type as any) || prev.nagadType,
          rocketNumber: settingsData.rocket_number || prev.rocketNumber,
          whatsappNumber: settingsData.whatsapp_number || prev.whatsappNumber,
          helplineNumber: settingsData.helpline_number || prev.helplineNumber,
          alternateHelpline: settingsData.alternate_helpline || prev.alternateHelpline,
          officialEmail: settingsData.official_email || prev.officialEmail,
          chamberAddress: settingsData.chamber_address || prev.chamberAddress,
          classTime: settingsData.class_time || prev.classTime,
          morningSupportTime: settingsData.morning_support_time || prev.morningSupportTime,
          googleMeetUrl: settingsData.google_meet_url || prev.googleMeetUrl,
          noticeText: settingsData.notice_text || prev.noticeText,
          youtubeUrl: settingsData.youtube_url || prev.youtubeUrl,
          facebookUrl: settingsData.facebook_url || prev.facebookUrl,
          facebookGroupUrl: settingsData.facebook_group_url || prev.facebookGroupUrl,
          telegramUrl: settingsData.telegram_url || prev.telegramUrl,
        }));
      }

      // 2. Fetch Courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });

      if (!coursesError && coursesData && coursesData.length > 0) {
        const mappedCourses: Course[] = coursesData.map((c: any) => ({
          id: c.id,
          slug: c.slug,
          title: c.title,
          subtitle: c.subtitle,
          batchType: c.batch_type,
          durationMonths: c.duration_months,
          admissionFee: c.admission_fee,
          monthlyFee: c.monthly_fee,
          liveSchedule: c.live_schedule,
          morningSupport: c.morning_support,
          thumbnailUrl: c.thumbnail_url,
          description: c.description,
          features: c.features || [],
          curriculum: c.curriculum || [],
        }));
        setCourses(mappedCourses);
      }

      // 3. Fetch Enrollments
      const { data: enrData, error: enrError } = await supabase
        .from('enrollments')
        .select('*')
        .order('enrolled_at', { ascending: false });

      if (!enrError && enrData) {
        const mappedEnr: Enrollment[] = enrData.map((e: any) => ({
          id: e.id,
          studentId: e.student_id,
          studentName: e.student_name,
          studentEmail: e.student_email,
          studentPhone: e.student_phone,
          courseId: e.course_id,
          courseTitle: e.course_title,
          batchType: e.batch_type,
          admissionStatus: e.admission_status,
            amount: e.amount || 1000,
          trxId: e.trx_id,
          senderPhone: e.sender_phone,
          paymentMethod: e.payment_method,
          enrolledAt: e.enrolled_at,
        }));
        setEnrollments(mappedEnr);
      }

      // 4. Fetch Monthly Payments
      const { data: payData, error: payError } = await supabase
        .from('monthly_payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (!payError && payData) {
        const mappedPay: MonthlyPayment[] = payData.map((p: any) => ({
          id: p.id,
          studentId: p.student_id,
          studentName: p.student_name,
          studentPhone: p.student_phone,
          courseId: p.course_id,
          courseTitle: p.course_title,
          monthName: p.month_name,
          amount: p.amount,
          trxId: p.trx_id,
          senderPhone: p.sender_phone,
          paymentMethod: p.payment_method,
          status: p.status,
          createdAt: p.created_at,
        }));
        setMonthlyPayments(mappedPay);
      }

      // 5. Fetch Orientation Leads
      const { data: leadData, error: leadError } = await supabase
        .from('orientation_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (!leadError && leadData) {
        const mappedLeads: OrientationLead[] = leadData.map((l: any) => ({
          id: l.id,
          name: l.name,
          phone: l.phone,
          email: l.email,
          homeoBackground: l.homeo_background,
          status: l.status,
          createdAt: l.created_at,
        }));
        setLeads(mappedLeads);
      }

    } catch (err) {
      console.warn('Supabase live fetch note:', err);
    } finally {
      setIsDataSyncing(false);
    }
  }, []);

  // =========================================================================
  // 2. AUTHENTICATION (Google OAuth + Whitelist)
  // =========================================================================
  useEffect(() => {
    // Initial Auth Check
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const authUser = session.user;
          const assignedRole = isAdminEmail(authUser.email) ? 'admin' : 'student';

          setUser({
            id: authUser.id,
            email: authUser.email || '',
            fullName: authUser.user_metadata?.full_name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'শিক্ষার্থী',
            avatarUrl: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || undefined,
            role: assignedRole,
            createdAt: authUser.created_at,
          });
        } else {
          setUser(null);
        }
      } catch (e) {
        console.warn('Auth check exception:', e);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuth();

    // Supabase Auth State Change Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const authUser = session.user;
        const assignedRole = isAdminEmail(authUser.email) ? 'admin' : 'student';

        setUser({
          id: authUser.id,
          email: authUser.email || '',
          fullName: authUser.user_metadata?.full_name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'শিক্ষার্থী',
          avatarUrl: authUser.user_metadata?.avatar_url || authUser.user_metadata?.picture || undefined,
          role: assignedRole,
          createdAt: authUser.created_at,
        });
      } else {
        setUser(null);
      }
      setIsAuthLoading(false);
    });

    // Trigger Initial Supabase Sync
    refreshData();

    return () => {
      subscription.unsubscribe();
    };
  }, [refreshData]);

  const signInWithGoogle = async () => {
    try {
      const redirectUrl = typeof window !== 'undefined'
        ? window.location.origin + '/auth/callback'
        : 'https://bdhomeo.com/auth/callback';

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        showToast('Google সাইন-ইন করতে সমস্যা হয়েছে: ' + error.message, 'error');
      }
    } catch (err: any) {
      showToast('লগইন ত্রুটি: ' + (err?.message || 'অনুগ্রহ করে পুনরায় চেষ্টা করুন'), 'error');
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('bdhomeo_user');
      }
      showToast('সফলভাবে লগআউট করা হয়েছে', 'info');
    } catch (e: any) {
      showToast('লগআউট ব্যর্থ: ' + e?.message, 'error');
    }
  };

  // =========================================================================
  // 3. STUDENT ENROLLMENT SUBMISSION (Supabase Insert + Error Checking)
  // =========================================================================
  const submitEnrollment = async (data: { 
    courseId: string; 
    trxId: string; 
    senderPhone: string; 
    studentPhone?: string; 
    paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'cash' 
  }): Promise<boolean> => {
    if (!user) {
      showToast('ভর্তি সম্পন্ন করতে প্রথমে Google দিয়ে সাইন-ইন করুন', 'error');
      return false;
    }

    const cleanPhone = (data.studentPhone || data.senderPhone || '').trim();
    const cleanTrx = (data.trxId || '').trim().toUpperCase();

    // 1. Bangladeshi Phone Validation (11 digits starting with 013-019)
    const phoneRegex = /^(?:\+?88|88)?01[3-9]\d{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      showToast('সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)', 'error');
      return false;
    }

    // 2. Transaction ID Format Validation (6 to 18 alphanumeric characters)
    const trxRegex = /^[A-Z0-9]{6,18}$/;
    if (!trxRegex.test(cleanTrx)) {
      showToast('সঠিক ট্রানজেকশন আইডি (TrxID) লিখুন (৬-১৮ অক্ষরের)', 'error');
      return false;
    }

    // 3. Duplicate TrxID Prevention
    try {
      const { data: dupEnr } = await supabase
        .from('enrollments')
        .select('id')
        .eq('trx_id', cleanTrx)
        .limit(1);

      if (dupEnr && dupEnr.length > 0) {
        showToast('এই TrxID (' + cleanTrx + ') টি পূর্বে একবার ব্যবহার করা হয়েছে!', 'error');
        return false;
      }

      const { data: dupPay } = await supabase
        .from('monthly_payments')
        .select('id')
        .eq('trx_id', cleanTrx)
        .limit(1);

      if (dupPay && dupPay.length > 0) {
        showToast('এই TrxID (' + cleanTrx + ') টি ইতিমধ্যে জমা দেওয়া হয়েছে!', 'error');
        return false;
      }
    } catch (err) {
      console.warn('Duplicate check check:', err);
    }

    const targetCourse = courses.find((c) => c.id === data.courseId);
    const newEnrollment: Enrollment = {
      id: 'enr-' + Date.now(),
      studentId: user.id,
      studentName: user.fullName,
      studentEmail: user.email,
      studentPhone: cleanPhone,
      courseId: data.courseId,
      courseTitle: targetCourse?.title || 'হোমিওপ্যাথি কোর্স',
      batchType: targetCourse?.batchType || 'basic',
      admissionStatus: 'pending',
      amount: targetCourse?.admissionFee || 1000,
      trxId: cleanTrx,
      senderPhone: data.senderPhone.trim(),
      paymentMethod: data.paymentMethod,
      enrolledAt: new Date().toISOString(),
    };

    setEnrollments((prev) => [newEnrollment, ...prev]);

    try {
      const { error } = await supabase.from('enrollments').insert({
        id: newEnrollment.id,
        student_id: user.id,
        student_name: user.fullName,
        student_email: user.email,
        student_phone: cleanPhone,
        course_id: data.courseId,
        course_title: targetCourse?.title || 'হোমিওপ্যাথি কোর্স',
        batch_type: targetCourse?.batchType || 'basic',
        admission_status: 'pending',
        amount: targetCourse?.admissionFee || 1000,
        trx_id: cleanTrx,
        sender_phone: data.senderPhone.trim(),
        payment_method: data.paymentMethod,
        enrolled_at: newEnrollment.enrolledAt,
      });

      if (error) {
        console.error('Supabase enrollment insert error:', error);
        showToast('ডাটাবেজে ভর্তি তথ্য সেভ হতে সমস্যা হয়েছে: ' + error.message, 'error');
        return false;
      }
    } catch (e: any) {
      console.error('Supabase enrollment exception:', e);
      showToast('ডাটাবেজ কানেকশন ত্রুটি: ' + (e?.message || 'পুনরায় চেষ্টা করুন'), 'error');
      return false;
    }

    showToast('ভর্তি আবেদন ও ট্রানজেকশন সফলভাবে জমা হয়েছে! অ্যাডমিন ভেরিফিকেশন সাপেক্ষে ক্লাস আনলক হবে।', 'success');
    return true;
  };

  const rejectEnrollment = async (id: string) => {
    setEnrollments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, admissionStatus: 'rejected' } : e))
    );

    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ admission_status: 'rejected' })
        .eq('id', id);

      if (error) {
        console.error('Supabase reject enrollment error:', error);
        showToast('ভর্তি বাতিলের তথ্য ডাটাবেজে আপডেট হয়নি: ' + error.message, 'error');
      } else {
        showToast('ভর্তি আবেদন বাতিল করা হয়েছে!', 'info');
      }
    } catch (e: any) {
      console.warn('Reject enrollment exception:', e);
    }
  };

  const addManualEnrollment = async (data: {
    studentName: string;
    studentEmail: string;
    studentPhone: string;
    courseId: string;
    batchType?: 'basic' | 'advance' | 'special';
    paymentMethod: 'bkash' | 'nagad' | 'cash' | 'rocket';
    senderPhone: string;
    trxId: string;
    admissionStatus?: 'approved' | 'pending';
    amount?: number;
  }): Promise<boolean> => {
    const targetCourse = courses.find((c) => c.id === data.courseId);
    const newEnr: Enrollment = {
      id: 'enr-' + Date.now(),
      studentId: 'manual-' + Date.now(),
      studentName: data.studentName.trim(),
      studentEmail: data.studentEmail.trim().toLowerCase(),
      studentPhone: data.studentPhone.trim(),
      courseId: data.courseId,
      courseTitle: targetCourse?.title || 'হোমিওপ্যাথি কোর্স',
      batchType: data.batchType || targetCourse?.batchType || 'basic',
      admissionStatus: data.admissionStatus || 'approved',
      amount: data.amount || targetCourse?.admissionFee || 1000,
      trxId: data.trxId.trim().toUpperCase() || ('CASH-' + Date.now().toString().substring(6)),
      senderPhone: data.senderPhone.trim() || data.studentPhone.trim(),
      paymentMethod: data.paymentMethod,
      enrolledAt: new Date().toISOString(),
    };

    setEnrollments((prev) => [newEnr, ...prev]);

    try {
      const { error } = await supabase.from('enrollments').insert({
        id: newEnr.id,
        student_id: newEnr.studentId,
        student_name: newEnr.studentName,
        student_email: newEnr.studentEmail,
        student_phone: newEnr.studentPhone,
        course_id: newEnr.courseId,
        course_title: newEnr.courseTitle,
        batch_type: newEnr.batchType,
        admission_status: newEnr.admissionStatus,
        amount: newEnr.amount,
        trx_id: newEnr.trxId,
        sender_phone: newEnr.senderPhone,
        payment_method: newEnr.paymentMethod,
        enrolled_at: newEnr.enrolledAt,
      });

      if (error) {
        console.error('Manual enrollment error:', error);
        showToast('ডাটাবেজে সেভ হতে সমস্যা: ' + error.message, 'error');
        return false;
      }
    } catch (err: any) {
      console.error('Manual enrollment exception:', err);
      showToast('কানেকশন ত্রুটি: ' + (err?.message || 'পুনরায় চেষ্টা করুন'), 'error');
      return false;
    }

    showToast('শিক্ষার্থী সফলভাবে ডাটাবেজে ম্যানুয়ালি ভর্তি করা হয়েছে!', 'success');
    return true;
  };

  const rejectMonthlyPayment = async (id: string) => {
    setMonthlyPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'rejected' } : p))
    );

    try {
      const { error } = await supabase
        .from('monthly_payments')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) {
        console.error('Supabase reject payment error:', error);
        showToast('ফি বাতিলের তথ্য ডাটাবেজে আপডেট হয়নি: ' + error.message, 'error');
      } else {
        showToast('মাসিক ফি পেমেন্ট বাতিল করা হয়েছে!', 'info');
      }
    } catch (e: any) {
      console.warn('Reject payment exception:', e);
    }
  };

  const addManualMonthlyPayment = async (data: {
    studentName: string;
    studentPhone: string;
    courseId: string;
    monthName: string;
    amount: number;
    paymentMethod: 'bkash' | 'nagad' | 'cash' | 'rocket';
    senderPhone: string;
    trxId: string;
    status?: 'approved' | 'pending';
  }): Promise<boolean> => {
    const targetCourse = courses.find((c) => c.id === data.courseId);
    const newPay: MonthlyPayment = {
      id: 'pay-' + Date.now(),
      studentId: 'manual-' + Date.now(),
      studentName: data.studentName.trim(),
      studentPhone: data.studentPhone.trim(),
      courseId: data.courseId,
      courseTitle: targetCourse?.title || 'হোমিওপ্যাথি কোর্স',
      monthName: data.monthName,
      amount: data.amount || 500,
      trxId: data.trxId.trim().toUpperCase() || ('CASH-' + Date.now().toString().substring(6)),
      senderPhone: data.senderPhone.trim() || data.studentPhone.trim(),
      paymentMethod: data.paymentMethod,
      status: data.status || 'approved',
      createdAt: new Date().toISOString(),
    };

    setMonthlyPayments((prev) => [newPay, ...prev]);

    try {
      const { error } = await supabase.from('monthly_payments').insert({
        id: newPay.id,
        student_id: newPay.studentId,
        student_name: newPay.studentName,
        student_phone: newPay.studentPhone,
        course_id: newPay.courseId,
        course_title: newPay.courseTitle,
        month_name: newPay.monthName,
        amount: newPay.amount,
        trx_id: newPay.trxId,
        sender_phone: newPay.senderPhone,
        payment_method: newPay.paymentMethod,
        status: newPay.status,
        created_at: newPay.createdAt,
      });

      if (error) {
        console.error('Manual monthly payment error:', error);
        showToast('ডাটাবেজে সেভ হতে সমস্যা: ' + error.message, 'error');
        return false;
      }
    } catch (err: any) {
      console.error('Manual payment exception:', err);
      showToast('কানেকশন ত্রুটি: ' + (err?.message || 'পুনরায় চেষ্টা করুন'), 'error');
      return false;
    }

    showToast(data.monthName + ' মাসের ফি ডাটাবেজে ম্যানুয়ালি রেকর্ড করা হয়েছে!', 'success');
    return true;
  };

  const deleteCourse = async (id: string): Promise<boolean> => {
    setCourses((prev) => prev.filter((c) => c.id !== id));

    try {
      const { error } = await supabase.from('courses').delete().eq('id', id);
      if (error) {
        console.error('Supabase delete course error:', error);
        showToast('ডাটাবেজ থেকে কোর্স ডিলিট হতে সমস্যা: ' + error.message, 'error');
        return false;
      }
    } catch (e: any) {
      console.error('Delete course exception:', e);
      showToast('কানেকশন ত্রুটি: ' + (e?.message || 'পুনরায় চেষ্টা করুন'), 'error');
      return false;
    }

    showToast('কোর্সটি ডাটাবেজ থেকে স্থায়ীভাবে মুছে ফেলা হয়েছে!', 'info');
    return true;
  };

  // =========================================================================
  // 4. MONTHLY PAYMENT SUBMISSION (Supabase Insert + Error Checking)
  // =========================================================================
  const submitMonthlyPayment = async (data: { 
    courseId: string; 
    monthName: string; 
    trxId: string; 
    senderPhone: string; 
    paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'cash' 
  }): Promise<boolean> => {
    if (!user) {
      showToast('ফি জমা দিতে প্রথমে সাইন-ইন করুন', 'error');
      return false;
    }

    const cleanPhone = (data.senderPhone || '').trim();
    const cleanTrx = (data.trxId || '').trim().toUpperCase();

    // 1. Phone validation
    const phoneRegex = /^(?:\+?88|88)?01[3-9]\d{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      showToast('সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)', 'error');
      return false;
    }

    // 2. TrxID Format validation
    const trxRegex = /^[A-Z0-9]{6,18}$/;
    if (!trxRegex.test(cleanTrx)) {
      showToast('সঠিক ট্রানজেকশন আইডি (TrxID) লিখুন (৬-১৮ অক্ষরের)', 'error');
      return false;
    }

    // 3. Duplicate TrxID Prevention
    try {
      const { data: dupPay } = await supabase
        .from('monthly_payments')
        .select('id')
        .eq('trx_id', cleanTrx)
        .limit(1);

      if (dupPay && dupPay.length > 0) {
        showToast('এই TrxID (' + cleanTrx + ') টি পূর্বে একবার ব্যবহার করা হয়েছে!', 'error');
        return false;
      }
    } catch (err) {
      console.warn('Duplicate payment check:', err);
    }

    const targetCourse = courses.find((c) => c.id === data.courseId);
    const newPayment: MonthlyPayment = {
      id: 'pay-' + Date.now(),
      studentId: user.id,
      studentName: user.fullName,
      studentPhone: cleanPhone,
      courseId: data.courseId,
      courseTitle: targetCourse?.title || 'হোমিওপ্যাথি কোর্স',
      monthName: data.monthName,
      amount: 500,
      trxId: cleanTrx,
      senderPhone: cleanPhone,
      paymentMethod: data.paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setMonthlyPayments((prev) => [newPayment, ...prev]);

    try {
      const { error } = await supabase.from('monthly_payments').insert({
        id: newPayment.id,
        student_id: user.id,
        student_name: user.fullName,
        student_phone: cleanPhone,
        course_id: data.courseId,
        course_title: targetCourse?.title || 'হোমিওপ্যাথি কোর্স',
        month_name: data.monthName,
        amount: 500,
        trx_id: cleanTrx,
        sender_phone: cleanPhone,
        payment_method: data.paymentMethod,
        status: 'pending',
        created_at: newPayment.createdAt,
      });

      if (error) {
        console.error('Supabase monthly payment error:', error);
        showToast('পেমেন্ট তথ্য ডাটাবেজে সেভ হতে সমস্যা হয়েছে: ' + error.message, 'error');
        return false;
      }
    } catch (e: any) {
      console.error('Supabase payment exception:', e);
      showToast('পেমেন্ট সেভ ত্রুটি: ' + (e?.message || 'পুনরায় চেষ্টা করুন'), 'error');
      return false;
    }

    showToast(data.monthName + ' মাসের ফি ৫০০/- টাকা সফলভাবে জমা হয়েছে!', 'success');
    return true;
  };

  // =========================================================================
  // 5. ORIENTATION LEAD SUBMISSION (Supabase Insert + Error Checking)
  // =========================================================================
  const submitOrientationLead = async (data: { 
    name: string; 
    phone: string; 
    email?: string; 
    homeoBackground: string 
  }): Promise<boolean> => {
    const cleanPhone = (data.phone || '').trim();

    const phoneRegex = /^(?:\+?88|88)?01[3-9]\d{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      showToast('সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর লিখুন (যেমন: 018XXXXXXXX)', 'error');
      return false;
    }

    const newLead: OrientationLead = {
      id: 'lead-' + Date.now(),
      name: data.name.trim(),
      phone: cleanPhone,
      email: data.email?.trim(),
      homeoBackground: data.homeoBackground,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    setLeads((prev) => [newLead, ...prev]);

    try {
      const { error } = await supabase.from('orientation_leads').insert({
        id: newLead.id,
        name: data.name.trim(),
        phone: cleanPhone,
        email: data.email?.trim() || null,
        homeo_background: data.homeoBackground,
        status: 'new',
        created_at: newLead.createdAt,
      });

      if (error) {
        console.error('Supabase orientation lead insert error:', error);
        showToast('লিড ডাটাবেজে সেভ হতে সমস্যা হয়েছে: ' + error.message, 'error');
        return false;
      }
    } catch (e: any) {
      console.error('Supabase lead exception:', e);
      showToast('কানেকশন ত্রুটি: ' + (e?.message || 'পুনরায় চেষ্টা করুন'), 'error');
      return false;
    }

    showToast('অভিনন্দন! ফ্রি ওরিয়েন্টেশন ক্লাসে আপনার রেজিস্ট্রেশন সফল হয়েছে।', 'success');
    return true;
  };

  // =========================================================================
  // 6. CERTIFICATE REQUEST SUBMISSION (PTF Courier Delivery)
  // =========================================================================
  const submitCertificateRequest = async (data: {
    phone: string;
    courierAddress: string;
    district?: string;
    courseId: string;
    courseTitle: string;
  }): Promise<boolean> => {
    if (!user) {
      showToast('ঠিকানা সাবমিট করতে লগইন করুন', 'error');
      return false;
    }

    const cleanPhone = (data.phone || '').trim();
    if (!cleanPhone || !data.courierAddress.trim()) {
      showToast('ফোন নম্বর ও সম্পূর্ণ কুরিয়ার ঠিকানা লিখুন', 'error');
      return false;
    }

    const newReq: CertificateRequest = {
      id: 'cert-' + Date.now(),
      studentId: user.id,
      studentName: user.fullName,
      studentEmail: user.email,
      phone: cleanPhone,
      courierAddress: data.courierAddress.trim(),
      district: data.district?.trim() || '',
      courseId: data.courseId,
      courseTitle: data.courseTitle,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setCertificateRequests((prev) => [newReq, ...prev]);

    try {
      const { error } = await supabase.from('certificate_requests').insert({
        id: newReq.id,
        student_id: user.id,
        student_name: user.fullName,
        student_email: user.email,
        phone: cleanPhone,
        courier_address: data.courierAddress.trim(),
        district: data.district?.trim() || null,
        course_id: data.courseId,
        course_title: data.courseTitle,
        status: 'pending',
        created_at: newReq.createdAt,
      });

      if (error) {
        console.error('Certificate request insert error:', error);
        showToast('ঠিকানা সংরক্ষণে সমস্যা: ' + error.message, 'error');
        return false;
      }
    } catch (e: any) {
      console.error('Certificate exception:', e);
      showToast('কানেকশন ত্রুটি: ' + (e?.message || 'পুনরায় চেষ্টা করুন'), 'error');
      return false;
    }

    showToast('সার্টিফিকেট কুরিয়ার ঠিকানা সফলভাবে সংরক্ষিত হয়েছে!', 'success');
    return true;
  };

  const updateCertificateStatus = async (id: string, status: 'pending' | 'dispatched' | 'delivered') => {
    setCertificateRequests((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );

    try {
      await supabase.from('certificate_requests').update({ status }).eq('id', id);
    } catch (err) {
      console.warn('Update cert status error:', err);
    }
  };

  // =========================================================================
  // 7. SITE SETTINGS UPDATE (Supabase Upsert)
  // =========================================================================
  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<boolean> => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);

    try {
      const { error } = await supabase.from('site_settings').upsert({
        id: 'global_settings',
        site_title: updated.siteTitle,
        slogan: updated.slogan,
        hero_headline: updated.heroHeadline,
        hero_subheadline: updated.heroSubheadline,
        doctor_name: updated.doctorName,
        doctor_title: updated.doctorTitle,
        doctor_degrees: updated.doctorDegrees,
        doctor_experience: updated.doctorExperience,
        doctor_chamber_time: updated.doctorChamberTime,
        doctor_message: updated.doctorMessage,
        hero_image_url: updated.heroImageUrl,
        doctor_portrait_url: updated.doctorPortraitUrl,
        ptf_certificate_image_url: updated.ptfCertificateImageUrl,
        meta_og_image_url: updated.metaOgImageUrl,
        gallery_images: updated.galleryImages,
        video_showcase_list: updated.videoShowcaseList,
        testimonials: updated.testimonials,
        bkash_number: updated.bkashNumber,
        bkash_type: updated.bkashType,
        nagad_number: updated.nagadNumber,
        nagad_type: updated.nagadType,
        rocket_number: updated.rocketNumber,
        whatsapp_number: updated.whatsappNumber,
        helpline_number: updated.helplineNumber,
        alternate_helpline: updated.alternateHelpline,
        official_email: updated.officialEmail,
        chamber_address: updated.chamberAddress,
        class_time: updated.classTime,
        morning_support_time: updated.morningSupportTime,
        google_meet_url: updated.googleMeetUrl,
        notice_text: updated.noticeText,
        youtube_url: updated.youtubeUrl,
        facebook_url: updated.facebookUrl,
        facebook_group_url: updated.facebookGroupUrl,
        telegram_url: updated.telegramUrl,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Supabase site_settings upsert error:', error);
        showToast('সাইট সেটিংস ডাটাবেজে সেভ হতে সমস্যা: ' + error.message, 'error');
        return false;
      }
    } catch (e: any) {
      console.error('Supabase settings exception:', e);
      showToast('সেটিংস সেভ ত্রুটি: ' + e?.message, 'error');
      return false;
    }

    showToast('ওয়েবসাইটের কনটেন্ট ও সকল সেটিংস সফলভাবে সেভ হয়েছে!', 'success');
    return true;
  };

  // =========================================================================
  // 7. COURSE MANAGEMENT (Supabase Upsert)
  // =========================================================================
  const updateCourses = async (updatedCourses: Course[]): Promise<boolean> => {
    setCourses(updatedCourses);

    try {
      for (const course of updatedCourses) {
        await supabase.from('courses').upsert({
          id: course.id,
          slug: course.slug,
          title: course.title,
          subtitle: course.subtitle,
          batch_type: course.batchType,
          duration_months: course.durationMonths,
          admission_fee: course.admissionFee,
          monthly_fee: course.monthlyFee,
          live_schedule: course.liveSchedule,
          morning_support: course.morningSupport || null,
          thumbnail_url: course.thumbnailUrl,
          description: course.description,
          features: course.features,
          curriculum: course.curriculum,
          created_at: new Date().toISOString(),
        });
      }
    } catch (e: any) {
      console.error('Supabase courses batch sync error:', e);
      showToast('কোর্স ডাটাবেজে সেভ হতে সমস্যা: ' + e?.message, 'error');
      return false;
    }

    showToast('কোর্স ও সিলেবাস সফলভাবে ডাটাবেজে সেভ হয়েছে!', 'success');
    return true;
  };

  const saveCourse = async (course: Course): Promise<boolean> => {
    const exists = courses.some((c) => c.id === course.id);
    const updated = exists
      ? courses.map((c) => (c.id === course.id ? course : c))
      : [...courses, course];
    setCourses(updated);

    try {
      const { error } = await supabase.from('courses').upsert({
        id: course.id,
        slug: course.slug,
        title: course.title,
        subtitle: course.subtitle,
        batch_type: course.batchType,
        duration_months: course.durationMonths,
        admission_fee: course.admissionFee,
        monthly_fee: course.monthlyFee,
        live_schedule: course.liveSchedule,
        morning_support: course.morningSupport || null,
        thumbnail_url: course.thumbnailUrl,
        description: course.description,
        features: course.features,
        curriculum: course.curriculum,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Supabase course save error:', error);
        showToast("'" + course.title + "' ডাটাবেজে সেভ হতে সমস্যা: " + error.message, 'error');
        return false;
      }
    } catch (e: any) {
      console.error('Supabase course save exception:', e);
      showToast('কোর্স সেভ ত্রুটি: ' + e?.message, 'error');
      return false;
    }

    showToast("'" + course.title + "' কোর্স ডাটাবেজে সফলভাবে সংরক্ষিত হয়েছে!", 'success');
    return true;
  };

  // =========================================================================
  // 8. APPROVALS & UPDATES (Supabase Updates)
  // =========================================================================
  const approveEnrollment = async (enrollmentId: string) => {
    setEnrollments((prev) =>
      prev.map((enr) => (enr.id === enrollmentId ? { ...enr, admissionStatus: 'approved' } : enr))
    );

    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ admission_status: 'approved' })
        .eq('id', enrollmentId);

      if (error) {
        console.error('Supabase enrollment approve error:', error);
        showToast('অ্যাপ্রুভাল ডাটাবেজে সেভ হয়নি: ' + error.message, 'error');
        return;
      }
    } catch (e: any) {
      showToast('অ্যাপ্রুভাল ত্রুটি: ' + e?.message, 'error');
      return;
    }

    showToast('শিক্ষার্থীর কোর্স অনুমোদন সফলভাবে সম্পন্ন হয়েছে!', 'success');
  };

  const approveMonthlyPayment = async (paymentId: string) => {
    setMonthlyPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, status: 'approved' } : p))
    );

    try {
      const { error } = await supabase
        .from('monthly_payments')
        .update({ status: 'approved' })
        .eq('id', paymentId);

      if (error) {
        console.error('Supabase payment approve error:', error);
        showToast('ফি ভেরিফিকেশন ডাটাবেজে সেভ হয়নি: ' + error.message, 'error');
        return;
      }
    } catch (e: any) {
      showToast('পেমেন্ট অনুমোদন ত্রুটি: ' + e?.message, 'error');
      return;
    }

    showToast('মাসিক ফি ভেরিফিকেশন সফলভাবে সম্পন্ন হয়েছে!', 'success');
  };

  const updateLeadStatus = async (leadId: string, status: 'contacted' | 'joined') => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status } : l)));

    try {
      const { error } = await supabase
        .from('orientation_leads')
        .update({ status })
        .eq('id', leadId);

      if (error) {
        showToast('লিড স্ট্যাটাস ডাটাবেজে আপডেট হয়নি: ' + error.message, 'error');
        return;
      }
    } catch (e: any) {
      showToast('লিড স্ট্যাটাস ত্রুটি: ' + e?.message, 'error');
      return;
    }

    showToast('লিড স্ট্যাটাস আপডেট হয়েছে!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        courses,
        settings,
        enrollments,
        monthlyPayments,
        leads,
        isAuthLoading,
        isDataSyncing,
        signInWithGoogle,
        signOut,
        refreshData,
        submitEnrollment,
        submitMonthlyPayment,
        submitOrientationLead,
        updateSettings,
        updateCourses,
        saveCourse,
        approveEnrollment,
        rejectEnrollment,
        addManualEnrollment,
        approveMonthlyPayment,
        rejectMonthlyPayment,
        addManualMonthlyPayment,
        deleteCourse,
        updateLeadStatus,
        toast,
        showToast,
        certificateRequests,
        submitCertificateRequest,
        updateCertificateStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
