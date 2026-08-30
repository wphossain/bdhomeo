'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, SiteSettings, UserProfile, Enrollment, MonthlyPayment, OrientationLead } from './types';
import { initialCourses, initialSiteSettings } from './data';
import { supabase, isAdminUser } from './supabase';

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

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('bdhomeo_settings');
      if (savedSettings) setSettings(JSON.parse(savedSettings));

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

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const email = session.user.email || '';
        const role = isAdminUser(email) ? 'admin' : 'student';
        const profile: UserProfile = {
          id: session.user.id,
          email,
          fullName: session.user.user_metadata?.full_name || email.split('@')[0],
          avatarUrl: session.user.user_metadata?.avatar_url,
          role,
          createdAt: session.user.created_at,
        };
        setUser(profile);
        localStorage.setItem('bdhomeo_user', JSON.stringify(profile));
      }
      setIsAuthLoading(false);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const email = session.user.email || '';
        const role = isAdminUser(email) ? 'admin' : 'student';
        const profile: UserProfile = {
          id: session.user.id,
          email,
          fullName: session.user.user_metadata?.full_name || email.split('@')[0],
          avatarUrl: session.user.user_metadata?.avatar_url,
          role,
          createdAt: session.user.created_at,
        };
        setUser(profile);
        localStorage.setItem('bdhomeo_user', JSON.stringify(profile));
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
          phone: '01711223344',
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
    showToast('ধন্যবাদ! ফ্রি ওরিয়েন্টেশন ক্লাসের রেজিস্ট্রেশন সফল হয়েছে।', 'success');
    return true;
  };

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('bdhomeo_settings', JSON.stringify(updated));
    showToast('ওয়েবসাইটের সেটিংস সফলভাবে আপডেট হয়েছে!', 'success');
    return true;
  };

  const approveEnrollment = async (enrollmentId: string) => {
    const updated = enrollments.map((enr) =>
      enr.id === enrollmentId ? { ...enr, admissionStatus: 'approved' as const } : enr
    );
    setEnrollments(updated);
    localStorage.setItem('bdhomeo_enrollments', JSON.stringify(updated));
    showToast('শিক্ষার্থীর কোর্স এনরোলমেন্ট সফলভাবে অনুমোদিত হয়েছে!', 'success');
  };

  const approveMonthlyPayment = async (paymentId: string) => {
    const updated = monthlyPayments.map((p) =>
      p.id === paymentId ? { ...p, status: 'approved' as const } : p
    );
    setMonthlyPayments(updated);
    localStorage.setItem('bdhomeo_payments', JSON.stringify(updated));
    showToast('মাসিক ফি পেমেন্ট সফলভাবে অনুমোদিত হয়েছে!', 'success');
  };

  const updateLeadStatus = async (leadId: string, status: 'contacted' | 'joined') => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status } : l));
    setLeads(updated);
    localStorage.setItem('bdhomeo_leads', JSON.stringify(updated));
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