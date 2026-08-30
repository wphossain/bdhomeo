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
  updateCertificateStatus: (id: string, status: 'pending' | 'dispatched' | 'delivered', trackingNumber?: string) => Promise<void>;
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
      setToast((curr) => (curr?.id === newToast.id ? null : curr));
    }, 4500);
  }, []);

  // Check auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const email = session.user.email || '';
          const isAdmin = isAdminEmail(email);
          setUser({
            id: session.user.id,
            email: email,
            fullName: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'হোমিও শিক্ষার্থী',
            avatarUrl: session.user.user_metadata?.avatar_url,
            phone: session.user.user_metadata?.phone,
            role: isAdmin ? 'admin' : 'student',
            createdAt: session.user.created_at,
          });
        }
      } catch (err) {
        console.warn('Auth init check notice:', err);
      } finally {
        setIsAuthLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const email = session.user.email || '';
        const isAdmin = isAdminEmail(email);
        setUser({
          id: session.user.id,
          email: email,
          fullName: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'হোমিও শিক্ষার্থী',
          avatarUrl: session.user.user_metadata?.avatar_url,
          phone: session.user.user_metadata?.phone,
          role: isAdmin ? 'admin' : 'student',
          createdAt: session.user.created_at,
        });
      } else {
        setUser(null);
      }
      setIsAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // =========================================================================
  // SCOPED DATA FETCHING (Public data for all, Private data only when authorized)
  // =========================================================================
  const refreshData = useCallback(async () => {
    setIsDataSyncing(true);
    try {
      // 1. PUBLIC: Site Settings
      try {
        const { data: siteData } = await supabase.from('site_settings').select('*').limit(1);
        if (siteData && siteData.length > 0) {
          const s = siteData[0];
          setSettings((prev) => ({
            ...prev,
            siteTitle: s.site_title || prev.siteTitle,
            slogan: s.slogan || s.tagline || prev.slogan,
            heroHeadline: s.hero_headline || prev.heroHeadline,
            heroSubheadline: s.hero_subheadline || prev.heroSubheadline,
            doctorName: s.doctor_name || prev.doctorName,
            doctorTitle: s.doctor_title || prev.doctorTitle,
            doctorDegrees: s.doctor_degrees || prev.doctorDegrees,
            doctorExperience: s.doctor_experience || prev.doctorExperience,
            doctorChamberTime: s.doctor_chamber_time || prev.doctorChamberTime,
            doctorMessage: s.doctor_message || prev.doctorMessage,
            heroImageUrl: s.hero_image_url || prev.heroImageUrl,
            doctorPortraitUrl: s.doctor_portrait_url || prev.doctorPortraitUrl,
            ptfCertificateImageUrl: s.ptf_certificate_image_url || prev.ptfCertificateImageUrl,
            metaOgImageUrl: s.meta_og_image_url || prev.metaOgImageUrl,
            logoUrl: s.logo_url || prev.logoUrl,
            helplineNumber: s.helpline_number || prev.helplineNumber,
            whatsappNumber: s.whatsapp_number || prev.whatsappNumber,
            alternateHelpline: s.alternate_helpline || prev.alternateHelpline,
            officialEmail: s.official_email || prev.officialEmail,
            chamberAddress: s.chamber_address || prev.chamberAddress,
            googleMeetUrl: s.google_meet_url || prev.googleMeetUrl,
            morningSupportTime: s.morning_support_time || prev.morningSupportTime,
            classTime: s.class_time || prev.classTime,
            noticeText: s.notice_text || prev.noticeText,
            youtubeUrl: s.youtube_url || prev.youtubeUrl,
            facebookUrl: s.facebook_url || prev.facebookUrl,
            facebookGroupUrl: s.facebook_group_url || prev.facebookGroupUrl,
            telegramUrl: s.telegram_url || prev.telegramUrl,
            galleryImages: s.gallery_images && s.gallery_images.length > 0 ? s.gallery_images : prev.galleryImages,
            videoShowcaseList: s.video_showcase_list && s.video_showcase_list.length > 0 ? s.video_showcase_list : prev.videoShowcaseList,
            testimonials: s.testimonials && s.testimonials.length > 0 ? s.testimonials : prev.testimonials,
            faqs: s.faqs && s.faqs.length > 0 ? s.faqs : prev.faqs,
            bkashNumber: s.bkash_number || prev.bkashNumber,
            bkashType: s.bkash_type || prev.bkashType,
            nagadNumber: s.nagad_number || prev.nagadNumber,
            nagadType: s.nagad_type || prev.nagadType,
            rocketNumber: s.rocket_number || prev.rocketNumber,
          }));
        }
      } catch (err) {
        console.warn('Settings sync notice:', err);
      }

      // 2. PUBLIC: Courses
      try {
        const { data: coursesData } = await supabase.from('courses').select('*').order('created_at', { ascending: true });
        if (coursesData && coursesData.length > 0) {
          setCourses(coursesData.map((c: any) => ({
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
          })));
        }
      } catch (err) {
        console.warn('Courses sync notice:', err);
      }

      // 3. PRIVATE & ADMIN DATA: Only fetch if user is logged in
      if (user) {
        const isAdmin = user.role === 'admin' || isAdminEmail(user.email);

        // Enrollments query
        try {
          let enrQuery = supabase.from('enrollments').select('*').order('enrolled_at', { ascending: false });
          if (!isAdmin) {
            enrQuery = enrQuery.or(`student_id.eq.${user.id},student_email.eq.${user.email.toLowerCase()}`);
          }
          const { data: enrs } = await enrQuery;
          if (enrs) {
            setEnrollments(enrs.map((e: any) => ({
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
            })));
          }
        } catch (err) {
          console.warn('Enrollment query notice:', err);
        }

        // Monthly Payments query
        try {
          let payQuery = supabase.from('monthly_payments').select('*').order('created_at', { ascending: false });
          if (!isAdmin) {
            payQuery = payQuery.eq('student_id', user.id);
          }
          const { data: pays } = await payQuery;
          if (pays) {
            setMonthlyPayments(pays.map((p: any) => ({
              id: p.id,
              studentId: p.student_id,
              studentName: p.student_name,
              studentPhone: p.student_phone,
              courseId: p.course_id,
              courseTitle: p.course_title,
              monthName: p.month_name,
              amount: p.amount || 500,
              trxId: p.trx_id,
              senderPhone: p.sender_phone,
              paymentMethod: p.payment_method,
              status: p.status,
              createdAt: p.created_at,
            })));
          }
        } catch (err) {
          console.warn('Monthly payments query notice:', err);
        }

        // Certificate requests query
        try {
          let certQuery = supabase.from('certificate_requests').select('*').order('created_at', { ascending: false });
          if (!isAdmin) {
            certQuery = certQuery.or(`student_id.eq.${user.id},student_email.eq.${user.email.toLowerCase()}`);
          }
          const { data: certs } = await certQuery;
          if (certs) {
            setCertificateRequests(certs.map((c: any) => ({
              id: c.id,
              studentId: c.student_id,
              studentName: c.student_name,
              studentEmail: c.student_email,
              phone: c.phone,
              courierAddress: c.courier_address,
              district: c.district,
              courseId: c.course_id,
              courseTitle: c.course_title,
              status: c.status,
              createdAt: c.created_at,
            })));
          }
        } catch (err) {
          console.warn('Cert requests query notice:', err);
        }

        // Orientation Leads query (ADMIN ONLY)
        if (isAdmin) {
          try {
            const { data: leadsData } = await supabase.from('orientation_leads').select('*').order('created_at', { ascending: false });
            if (leadsData) {
              setLeads(leadsData.map((l: any) => ({
                id: l.id,
                name: l.name,
                phone: l.phone,
                email: l.email,
                homeoBackground: l.homeo_background,
                status: l.status,
                createdAt: l.created_at,
              })));
            }
          } catch (err) {
            console.warn('Leads query notice:', err);
          }
        }
      }
    } finally {
      setIsDataSyncing(false);
    }
  }, [user]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Auth actions
  const signInWithGoogle = async () => {
    try {
      const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: redirectUrl },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Google Sign In Error:', error);
      showToast('গুগল সাইন-ইন সম্পন্ন করা সম্ভব হয়নি: ' + (error?.message || 'পুনরায় চেষ্টা করুন'), 'error');
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setEnrollments([]);
      setMonthlyPayments([]);
      setCertificateRequests([]);
      setLeads([]);
      showToast('সফলভাবে লগআউট হয়েছেন', 'info');
    } catch (error: any) {
      console.error('Sign Out Error:', error);
    }
  };

  // =========================================================================
  // 1. ENROLLMENT SUBMISSION (Student Admission)
  // =========================================================================
  const submitEnrollment = async (data: {
    courseId: string;
    trxId: string;
    senderPhone: string;
    studentPhone?: string;
    paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'cash';
  }): Promise<boolean> => {
    if (!user) {
      showToast('ভর্তি সম্পন্ন করতে প্রথমে Google দিয়ে সাইন-ইন করুন', 'error');
      signInWithGoogle();
      return false;
    }

    const cleanTrxId = data.trxId.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const cleanPhone = (data.studentPhone || data.senderPhone).trim();

    if (!cleanTrxId || cleanTrxId.length < 6) {
      showToast('সঠিক লেনদেন আইডি (TrxID) লিখুন (কমপক্ষে ৬ ডিজিট)', 'error');
      return false;
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
      trxId: cleanTrxId,
      senderPhone: data.senderPhone.trim(),
      paymentMethod: data.paymentMethod,
      enrolledAt: new Date().toISOString(),
    };

    setEnrollments((prev) => [newEnrollment, ...prev]);

    try {
      let { error } = await supabase.from('enrollments').insert({
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
        trx_id: cleanTrxId,
        sender_phone: data.senderPhone.trim(),
        payment_method: data.paymentMethod,
        enrolled_at: newEnrollment.enrolledAt,
      });

      if (error && error.message.includes('amount')) {
        const { error: fallbackErr } = await supabase.from('enrollments').insert({
          id: newEnrollment.id,
          student_id: user.id,
          student_name: user.fullName,
          student_email: user.email,
          student_phone: cleanPhone,
          course_id: data.courseId,
          course_title: targetCourse?.title || 'হোমিওপ্যাথি কোর্স',
          batch_type: targetCourse?.batchType || 'basic',
          admission_status: 'pending',
          trx_id: cleanTrxId,
          sender_phone: data.senderPhone.trim(),
          payment_method: data.paymentMethod,
          enrolled_at: newEnrollment.enrolledAt,
        });
        error = fallbackErr;
      }

      if (error) {
        if (error.code === '23505' || error.message.includes('unique') || error.message.includes('duplicate')) {
          showToast('এই ট্রানজেকশন আইডি (TrxID) দিয়ে ইতোমধ্যে ভর্তি জমা দেওয়া হয়েছে!', 'error');
        } else {
          showToast('ভর্তি সংরক্ষণে সমস্যা: ' + error.message, 'error');
        }
        return false;
      }
    } catch (e: any) {
      console.error('Enrollment submission exception:', e);
      showToast('কানেকশন ত্রুটি: ' + (e?.message || 'পুনরায় চেষ্টা করুন'), 'error');
      return false;
    }

    showToast('ভর্তি আবেদন জমা হয়েছে! অ্যাডমিন ভেরিফিকেশন সাপেক্ষে ক্লাস সক্রিয় হবে।', 'success');
    return true;
  };

  const approveEnrollment = async (id: string) => {
    setEnrollments((prev) =>
      prev.map((e) => (e.id === id ? { ...e, admissionStatus: 'approved' } : e))
    );

    try {
      const { error } = await supabase
        .from('enrollments')
        .update({ admission_status: 'approved' })
        .eq('id', id);

      if (error) {
        console.error('Supabase approve enrollment error:', error);
        showToast('ডাটাবেজে অনুমোদন আপডেট হতে সমস্যা: ' + error.message, 'error');
      } else {
        showToast('ভর্তি সফলভাবে অনুমোদিত হয়েছে!', 'success');
      }
    } catch (e: any) {
      console.warn('Approve enrollment exception:', e);
    }
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
        showToast('ডাটাবেজে বাতিল আপডেট হতে সমস্যা: ' + error.message, 'error');
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
      let { error } = await supabase.from('enrollments').insert({
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

      if (error && error.message.includes('amount')) {
        const { error: fallbackErr } = await supabase.from('enrollments').insert({
          id: newEnr.id,
          student_id: newEnr.studentId,
          student_name: newEnr.studentName,
          student_email: newEnr.studentEmail,
          student_phone: newEnr.studentPhone,
          course_id: newEnr.courseId,
          course_title: newEnr.courseTitle,
          batch_type: newEnr.batchType,
          admission_status: newEnr.admissionStatus,
          trx_id: newEnr.trxId,
          sender_phone: newEnr.senderPhone,
          payment_method: newEnr.paymentMethod,
          enrolled_at: newEnr.enrolledAt,
        });
        error = fallbackErr;
      }

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

  // =========================================================================
  // 2. MONTHLY PAYMENT SUBMISSION (Student Fee)
  // =========================================================================
  const submitMonthlyPayment = async (data: {
    courseId: string;
    monthName: string;
    trxId: string;
    senderPhone: string;
    paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'cash';
  }): Promise<boolean> => {
    if (!user) {
      showToast('ফি জমা দিতে প্রথমে লগইন করুন', 'error');
      return false;
    }

    const cleanTrxId = data.trxId.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const cleanPhone = data.senderPhone.trim();

    if (!cleanTrxId || cleanTrxId.length < 6) {
      showToast('সঠিক লেনদেন আইডি (TrxID) লিখুন', 'error');
      return false;
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
      amount: targetCourse?.monthlyFee || 500,
      trxId: cleanTrxId,
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
        amount: newPayment.amount,
        trx_id: cleanTrxId,
        sender_phone: cleanPhone,
        payment_method: data.paymentMethod,
        status: 'pending',
        created_at: newPayment.createdAt,
      });

      if (error) {
        if (error.code === '23505' || error.message.includes('unique') || error.message.includes('duplicate')) {
          showToast('এই ট্রানজেকশন আইডি (TrxID) দিয়ে ইতোমধ্যে ফি জমা দেওয়া হয়েছে!', 'error');
        } else {
          showToast('ফি সংরক্ষণে সমস্যা: ' + error.message, 'error');
        }
        return false;
      }
    } catch (e: any) {
      console.error('Monthly payment exception:', e);
      showToast('কানেকশন ত্রুটি: ' + (e?.message || 'পুনরায় চেষ্টা করুন'), 'error');
      return false;
    }

    showToast(data.monthName + ' মাসের ফি আবেদন জমা হয়েছে! অ্যাডমিন যাচাই করবেন।', 'success');
    return true;
  };

  const approveMonthlyPayment = async (id: string) => {
    setMonthlyPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'approved' } : p))
    );

    try {
      const { error } = await supabase
        .from('monthly_payments')
        .update({ status: 'approved' })
        .eq('id', id);

      if (error) {
        console.error('Supabase approve payment error:', error);
        showToast('ডাটাবেজে অনুমোদন আপডেট হতে সমস্যা: ' + error.message, 'error');
      } else {
        showToast('মাসিক ফি অনুমোদিত হয়েছে!', 'success');
      }
    } catch (e: any) {
      console.warn('Approve monthly payment exception:', e);
    }
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

  // =========================================================================
  // 3. CERTIFICATE REQUEST SUBMISSION (PTF Delivery)
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
    const cleanAddress = (data.courierAddress || '').trim();

    if (!cleanPhone || cleanPhone.length < 11 || !cleanAddress || cleanAddress.length < 6) {
      showToast('সঠিক ১১ ডিজিটের মোবাইল নম্বর ও পূর্ণাঙ্গ কুরিয়ার ঠিকানা লিখুন', 'error');
      return false;
    }

    const newReq: CertificateRequest = {
      id: 'cert-' + Date.now(),
      studentId: user.id,
      studentName: user.fullName,
      studentEmail: user.email,
      phone: cleanPhone,
      courierAddress: cleanAddress,
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
        courier_address: cleanAddress,
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

  const updateCertificateStatus = async (id: string, status: 'pending' | 'dispatched' | 'delivered', trackingNumber?: string) => {
    setCertificateRequests((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, trackingNumber: trackingNumber || c.trackingNumber } : c))
    );

    try {
      const updateData: any = { status };
      if (trackingNumber) updateData.tracking_number = trackingNumber;
      await supabase.from('certificate_requests').update(updateData).eq('id', id);
    } catch (err) {
      console.warn('Update cert status error:', err);
    }
  };

  // =========================================================================
  // 4. ORIENTATION LEADS (Free Registration)
  // =========================================================================
  const submitOrientationLead = async (data: {
    name: string;
    phone: string;
    email?: string;
    homeoBackground: string;
  }): Promise<boolean> => {
    const newLead: OrientationLead = {
      id: 'lead-' + Date.now(),
      name: data.name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim(),
      homeoBackground: data.homeoBackground,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    setLeads((prev) => [newLead, ...prev]);

    try {
      const { error } = await supabase.from('orientation_leads').insert({
        id: newLead.id,
        name: newLead.name,
        phone: newLead.phone,
        email: newLead.email,
        homeo_background: newLead.homeoBackground,
        status: 'new',
        created_at: newLead.createdAt,
      });

      if (error) {
        console.error('Lead insert error:', error);
        showToast('লিড সংরক্ষণে সমস্যা: ' + error.message, 'error');
        return false;
      }
    } catch (e: any) {
      console.error('Lead exception:', e);
      showToast('কানেকশন ত্রুটি: ' + (e?.message || 'পুনরায় চেষ্টা করুন'), 'error');
      return false;
    }

    showToast('ওরিয়েন্টেশন ক্লাসের জন্য আপনার তথ্য সংরক্ষিত হয়েছে!', 'success');
    return true;
  };

  const updateLeadStatus = async (leadId: string, status: 'contacted' | 'joined') => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status } : l))
    );

    try {
      await supabase.from('orientation_leads').update({ status }).eq('id', leadId);
    } catch (e: any) {
      console.warn('Lead status update exception:', e);
    }
  };

  // =========================================================================
  // 5. SITE SETTINGS & COURSES UPDATES (ADMIN ONLY)
  // =========================================================================
  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<boolean> => {
    const merged: SiteSettings = {
      ...settings,
      ...newSettings,
    };

    setSettings(merged);

    try {
      const { error } = await supabase.from('site_settings').upsert({
        id: 'default',
        site_title: merged.siteTitle,
        slogan: merged.slogan,
        hero_headline: merged.heroHeadline,
        hero_subheadline: merged.heroSubheadline,
        doctor_name: merged.doctorName,
        doctor_title: merged.doctorTitle,
        doctor_degrees: merged.doctorDegrees,
        doctor_experience: merged.doctorExperience,
        doctor_chamber_time: merged.doctorChamberTime,
        doctor_message: merged.doctorMessage,
        hero_image_url: merged.heroImageUrl,
        doctor_portrait_url: merged.doctorPortraitUrl,
        ptf_certificate_image_url: merged.ptfCertificateImageUrl,
        meta_og_image_url: merged.metaOgImageUrl,
        logo_url: merged.logoUrl,
        helpline_number: merged.helplineNumber,
        whatsapp_number: merged.whatsappNumber,
        alternate_helpline: merged.alternateHelpline,
        official_email: merged.officialEmail,
        chamber_address: merged.chamberAddress,
        google_meet_url: merged.googleMeetUrl,
        morning_support_time: merged.morningSupportTime,
        class_time: merged.classTime,
        notice_text: merged.noticeText,
        youtube_url: merged.youtubeUrl,
        facebook_url: merged.facebookUrl,
        facebook_group_url: merged.facebookGroupUrl,
        telegram_url: merged.telegramUrl,
        gallery_images: merged.galleryImages,
        video_showcase_list: merged.videoShowcaseList,
        testimonials: merged.testimonials,
        faqs: merged.faqs,
        bkash_number: merged.bkashNumber,
        bkash_type: merged.bkashType,
        nagad_number: merged.nagadNumber,
        nagad_type: merged.nagadType,
        rocket_number: merged.rocketNumber,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Supabase settings update error:', error);
        showToast('সেটিংস ডাটাবেজে সংরক্ষণে সমস্যা: ' + error.message, 'error');
        return false;
      }
    } catch (e: any) {
      console.error('Settings update exception:', e);
      showToast('কানেকশন ত্রুটি: ' + (e?.message || 'পুনরায় চেষ্টা করুন'), 'error');
      return false;
    }

    showToast('সাইট সেটিংস ডাটাবেজে সফলভাবে সংরক্ষিত হয়েছে!', 'success');
    return true;
  };

  const saveCourse = async (course: Course): Promise<boolean> => {
    setCourses((prev) => {
      const exists = prev.some((c) => c.id === course.id);
      if (exists) {
        return prev.map((c) => (c.id === course.id ? course : c));
      }
      return [...prev, course];
    });

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
        morning_support: course.morningSupport,
        thumbnail_url: course.thumbnailUrl,
        description: course.description,
        features: course.features,
        curriculum: course.curriculum,
      });

      if (error) {
        console.error('Supabase save course error:', error);
        showToast('কোর্স ডাটাবেজে সংরক্ষণে সমস্যা: ' + error.message, 'error');
        return false;
      }
    } catch (e: any) {
      console.error('Save course exception:', e);
      showToast('কানেকশন ত্রুটি: ' + (e?.message || 'পুনরায় চেষ্টা করুন'), 'error');
      return false;
    }

    showToast('কোর্স সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে!', 'success');
    return true;
  };

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
          morning_support: course.morningSupport,
          thumbnail_url: course.thumbnailUrl,
          description: course.description,
          features: course.features,
          curriculum: course.curriculum,
        });
      }
    } catch (e: any) {
      console.error('Update courses exception:', e);
      return false;
    }
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
        certificateRequests,
        submitCertificateRequest,
        updateCertificateStatus,
        submitEnrollment,
        addManualEnrollment,
        approveEnrollment,
        rejectEnrollment,
        submitMonthlyPayment,
        addManualMonthlyPayment,
        approveMonthlyPayment,
        rejectMonthlyPayment,
        submitOrientationLead,
        updateLeadStatus,
        updateSettings,
        updateCourses,
        saveCourse,
        deleteCourse,
        toast,
        showToast,
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
