'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, SiteSettings, UserProfile, Enrollment, MonthlyPayment, OrientationLead, UserRole } from './types';
import { initialCourses, initialSiteSettings } from './data';
import { supabase, isInitialAdminEmail } from './supabase';

interface AppContextType {
  user: UserProfile | null;
  courses: Course[];
  settings: SiteSettings;
  enrollments: Enrollment[];
  monthlyPayments: MonthlyPayment[];
  leads: OrientationLead[];
  isAuthLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  demoLogin: (role: 'student' | 'admin') => void;
  submitEnrollment: (data: { courseId: string; trxId: string; senderPhone: string; paymentMethod: 'bkash' | 'nagad' }) => Promise<boolean>;
  submitMonthlyPayment: (data: { courseId: string; monthName: string; trxId: string; senderPhone: string; paymentMethod: 'bkash' | 'nagad' }) => Promise<boolean>;
  submitOrientationLead: (data: { name: string; phone: string; email?: string; homeoBackground: string }) => Promise<boolean>;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<boolean>;
  updateCourses: (updatedCourses: Course[]) => Promise<boolean>;
  saveCourse: (course: Course) => Promise<boolean>;
  approveEnrollment: (enrollmentId: string) => Promise<void>;
  approveMonthlyPayment: (paymentId: string) => Promise<void>;
  updateLeadStatus: (leadId: string, status: 'contacted' | 'joined') => Promise<void>;
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [monthlyPayments, setMonthlyPayments] = useState<MonthlyPayment[]>([]);
  const [leads, setLeads] = useState<OrientationLead[]>([]);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const syncUserProfile = async (sessionUser: any) => {
    if (!sessionUser) {
      setUser(null);
      localStorage.removeItem('bdhomeo_user');
      return;
    }

    const email = sessionUser.email || '';
    const fullName = sessionUser.user_metadata?.full_name || email.split('@')[0];
    const avatarUrl = sessionUser.user_metadata?.avatar_url;

    let role: UserRole = 'student';

    try {
      // 1. Check Supabase profiles table for assigned role
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', sessionUser.id)
        .maybeSingle();

      if (profile && profile.role) {
        role = profile.role === 'admin' ? 'admin' : 'student';
      } else if (isInitialAdminEmail(email)) {
        role = 'admin';
        // Auto upsert admin role in profiles table
        await supabase.from('profiles').upsert({
          id: sessionUser.id,
          email,
          full_name: fullName,
          avatar_url: avatarUrl,
          role: 'admin',
          updated_at: new Date().toISOString(),
        });
      } else {
        // Any new user is saved as 'student' in Supabase
        role = 'student';
        await supabase.from('profiles').upsert({
          id: sessionUser.id,
          email,
          full_name: fullName,
          avatar_url: avatarUrl,
          role: 'student',
          updated_at: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('Could not query profiles from Supabase, falling back:', err);
      role = isInitialAdminEmail(email) ? 'admin' : 'student';
    }

    const userProfile: UserProfile = {
      id: sessionUser.id,
      email,
      fullName,
      avatarUrl,
      role,
      createdAt: sessionUser.created_at || new Date().toISOString(),
    };

    setUser(userProfile);
    localStorage.setItem('bdhomeo_user', JSON.stringify(userProfile));
  };

  useEffect(() => {
    try {
      const savedCourses = localStorage.getItem('bdhomeo_courses');
      if (savedCourses) {
        setCourses(JSON.parse(savedCourses));
      } else {
        setCourses(initialCourses);
        localStorage.setItem('bdhomeo_courses', JSON.stringify(initialCourses));
      }

      const savedSettings = localStorage.getItem('bdhomeo_settings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        if (
          !parsed.bkashNumber ||
          parsed.bkashNumber !== '01815-883101' ||
          parsed.bkashType !== 'Merchant' ||
          parsed.whatsappNumber !== '01811-123993'
        ) {
          const merged = {
            ...initialSiteSettings,
            ...parsed,
            bkashNumber: '01815-883101',
            bkashType: 'Merchant' as const,
            whatsappNumber: '01811-123993',
            helplineNumber: '01811-123993',
            nagadNumber: '01811-123993',
          };
          setSettings(merged);
          localStorage.setItem('bdhomeo_settings', JSON.stringify(merged));
        } else {
          setSettings({ ...initialSiteSettings, ...parsed });
        }
      } else {
        setSettings(initialSiteSettings);
        localStorage.setItem('bdhomeo_settings', JSON.stringify(initialSiteSettings));
      }

      const savedEnrollments = localStorage.getItem('bdhomeo_enrollments');
      if (savedEnrollments) setEnrollments(JSON.parse(savedEnrollments));

      const savedPayments = localStorage.getItem('bdhomeo_payments');
      if (savedPayments) setMonthlyPayments(JSON.parse(savedPayments));

      const savedLeads = localStorage.getItem('bdhomeo_leads');
      if (savedLeads) setLeads(JSON.parse(savedLeads));

      const savedUser = localStorage.getItem('bdhomeo_user');
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await syncUserProfile(session.user);
      }
      setIsAuthLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await syncUserProfile(session.user);
      } else {
        setUser(null);
        localStorage.removeItem('bdhomeo_user');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : '';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });
      if (error) {
        showToast(`Google Login: ${error.message}`, 'error');
      }
    } catch (err: any) {
      showToast('গুগল লগইনে সমস্যা হয়েছে।', 'error');
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.removeItem('bdhomeo_user');
    showToast('সফলভাবে লগআউট করা হয়েছে।', 'info');
  };

  const demoLogin = (role: 'student' | 'admin') => {
    const demoUser: UserProfile = role === 'admin'
      ? {
          id: 'demo-admin-id',
          email: 'mikailhossain3747@gmail.com',
          fullName: 'ডাঃ মোঃ গিয়াস উদ্দিন (Admin)',
          role: 'admin',
          createdAt: new Date().toISOString(),
        }
      : {
          id: 'demo-student-id',
          email: 'student@bdhomeo.com',
          fullName: 'ডাঃ মোঃ আরিফুল ইসলাম (Student)',
          phone: '01811-123993',
          role: 'student',
          createdAt: new Date().toISOString(),
        };
    setUser(demoUser);
    localStorage.setItem('bdhomeo_user', JSON.stringify(demoUser));
    showToast(`${role === 'admin' ? 'অ্যাডমিন' : 'শিক্ষার্থী'} ডেমো লগইন সফল!`, 'success');
  };

  const submitEnrollment = async (data: { courseId: string; trxId: string; senderPhone: string; paymentMethod: 'bkash' | 'nagad' }) => {
    if (!user) {
      showToast('দয়া করে প্রথমে লগইন করুন।', 'error');
      return false;
    }
    const targetCourse = courses.find((c) => c.id === data.courseId);
    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      studentId: user.id,
      studentName: user.fullName,
      studentEmail: user.email,
      studentPhone: data.senderPhone,
      courseId: data.courseId,
      courseTitle: targetCourse?.title || 'হোমিওপ্যাথি কোর্স',
      batchType: targetCourse?.batchType || 'basic',
      admissionStatus: 'pending',
      trxId: data.trxId,
      senderPhone: data.senderPhone,
      paymentMethod: data.paymentMethod,
      enrolledAt: new Date().toISOString(),
    };

    const updated = [newEnrollment, ...enrollments];
    setEnrollments(updated);
    localStorage.setItem('bdhomeo_enrollments', JSON.stringify(updated));

    // Also persist to Supabase if table exists
    try {
      await supabase.from('enrollments').insert({
        id: newEnrollment.id,
        student_id: user.id,
        student_name: user.fullName,
        student_email: user.email,
        student_phone: data.senderPhone,
        course_id: data.courseId,
        course_title: targetCourse?.title || 'হোমিওপ্যাথি কোর্স',
        batch_type: targetCourse?.batchType || 'basic',
        admission_status: 'pending',
        trx_id: data.trxId,
        sender_phone: data.senderPhone,
        payment_method: data.paymentMethod,
      });
    } catch (e) {
      console.warn('Supabase enrollment sync:', e);
    }

    showToast('আপনার ভর্তির আবেদন সফলভাবে জমা হয়েছে! অ্যাডমিন যাচাই করার পর ক্লাস আনলক হবে।', 'success');
    return true;
  };

  const submitMonthlyPayment = async (data: { courseId: string; monthName: string; trxId: string; senderPhone: string; paymentMethod: 'bkash' | 'nagad' }) => {
    if (!user) {
      showToast('দয়া করে প্রথমে লগইন করুন।', 'error');
      return false;
    }
    const targetCourse = courses.find((c) => c.id === data.courseId);
    const newPayment: MonthlyPayment = {
      id: `pay-${Date.now()}`,
      studentId: user.id,
      studentName: user.fullName,
      studentPhone: data.senderPhone,
      courseId: data.courseId,
      courseTitle: targetCourse?.title || 'হোমিওপ্যাথি কোর্স',
      monthName: data.monthName,
      amount: 500,
      trxId: data.trxId,
      senderPhone: data.senderPhone,
      paymentMethod: data.paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const updated = [newPayment, ...monthlyPayments];
    setMonthlyPayments(updated);
    localStorage.setItem('bdhomeo_payments', JSON.stringify(updated));

    try {
      await supabase.from('monthly_payments').insert({
        id: newPayment.id,
        student_id: user.id,
        student_name: user.fullName,
        student_phone: data.senderPhone,
        course_id: data.courseId,
        course_title: targetCourse?.title || 'হোমিওপ্যাথি কোর্স',
        month_name: data.monthName,
        amount: 500,
        trx_id: data.trxId,
        sender_phone: data.senderPhone,
        payment_method: data.paymentMethod,
        status: 'pending',
      });
    } catch (e) {
      console.warn('Supabase monthly payment sync:', e);
    }

    showToast(`${data.monthName} মাসের ৫০০/- টাকা ফি ট্রানজেকশন সফলভাবে সাবমিট হয়েছে!`, 'success');
    return true;
  };

  const submitOrientationLead = async (data: { name: string; phone: string; email?: string; homeoBackground: string }) => {
    const newLead: OrientationLead = {
      id: `lead-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email,
      homeoBackground: data.homeoBackground,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    const updated = [newLead, ...leads];
    setLeads(updated);
    localStorage.setItem('bdhomeo_leads', JSON.stringify(updated));

    try {
      await supabase.from('orientation_leads').insert({
        id: newLead.id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        homeo_background: data.homeoBackground,
        status: 'new',
      });
    } catch (e) {
      console.warn('Supabase orientation lead sync:', e);
    }

    showToast('ধন্যবাদ! ফ্রি ওরিয়েন্টেশন ক্লাসের রেজিস্ট্রেশন সফল হয়েছে।', 'success');
    return true;
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('bdhomeo_settings', JSON.stringify(updated));

    try {
      await supabase.from('site_settings').upsert({
        id: 'global_settings',
        ...updated,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.warn('Supabase site_settings sync:', e);
    }

    showToast('ওয়েবসাইটের কনটেন্ট ও সেটিংস সফলভাবে আপডেট হয়েছে!', 'success');
    return true;
  };

  const updateCourses = async (updatedCourses: Course[]) => {
    setCourses(updatedCourses);
    localStorage.setItem('bdhomeo_courses', JSON.stringify(updatedCourses));
    showToast('কোর্স ও সিলেবাস সফলভাবে আপডেট হয়েছে!', 'success');
    return true;
  };

  const saveCourse = async (course: Course) => {
    const exists = courses.some((c) => c.id === course.id);
    const updated = exists
      ? courses.map((c) => (c.id === course.id ? course : c))
      : [...courses, course];
    setCourses(updated);
    localStorage.setItem('bdhomeo_courses', JSON.stringify(updated));
    showToast(`'${course.title}' কোর্স সফলভাবে সেভ হয়েছে!`, 'success');
    return true;
  };

  const approveEnrollment = async (enrollmentId: string) => {
    const updated = enrollments.map((enr) =>
      enr.id === enrollmentId ? { ...enr, admissionStatus: 'approved' as const } : enr
    );
    setEnrollments(updated);
    localStorage.setItem('bdhomeo_enrollments', JSON.stringify(updated));

    try {
      await supabase
        .from('enrollments')
        .update({ admission_status: 'approved' })
        .eq('id', enrollmentId);
    } catch (e) {
      console.warn('Supabase enrollment approve sync:', e);
    }

    showToast('শিক্ষার্থীর কোর্স এনরোলমেন্ট সফলভাবে অনুমোদিত হয়েছে!', 'success');
  };

  const approveMonthlyPayment = async (paymentId: string) => {
    const updated = monthlyPayments.map((p) =>
      p.id === paymentId ? { ...p, status: 'approved' as const } : p
    );
    setMonthlyPayments(updated);
    localStorage.setItem('bdhomeo_payments', JSON.stringify(updated));

    try {
      await supabase
        .from('monthly_payments')
        .update({ status: 'approved' })
        .eq('id', paymentId);
    } catch (e) {
      console.warn('Supabase monthly payment approve sync:', e);
    }

    showToast('মাসিক ফি পেমেন্ট সফলভাবে অনুমোদিত হয়েছে!', 'success');
  };

  const updateLeadStatus = async (leadId: string, status: 'contacted' | 'joined') => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status } : l));
    setLeads(updated);
    localStorage.setItem('bdhomeo_leads', JSON.stringify(updated));

    try {
      await supabase
        .from('orientation_leads')
        .update({ status })
        .eq('id', leadId);
    } catch (e) {
      console.warn('Supabase lead status sync:', e);
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
        signInWithGoogle,
        signOut,
        demoLogin,
        submitEnrollment,
        submitMonthlyPayment,
        submitOrientationLead,
        updateSettings,
        updateCourses,
        saveCourse,
        approveEnrollment,
        approveMonthlyPayment,
        updateLeadStatus,
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