'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { 
  BarChart3, 
  Users, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  BookOpen, 
  Settings, 
  Sparkles, 
  Video, 
  MessageSquare, 
  CreditCard,
  FileCheck,
  TrendingUp,
  Award,
  VideoIcon,
  ShieldCheck,
  ExternalLink,
  ImageIcon,
  LogOut,
  RefreshCw,
  Eye,
  GraduationCap,
  Truck,
  Layers
} from 'lucide-react';
import { CourseManager } from '@/components/admin/CourseManager';
import { EnrollmentApprovals } from '@/components/admin/EnrollmentApprovals';
import { MonthlyFeeApprovals } from '@/components/admin/MonthlyFeeApprovals';
import { LeadManager } from '@/components/admin/LeadManager';
import { MediaManager } from '@/components/admin/MediaManager';
import { SiteSettingsForm } from '@/components/admin/SiteSettingsForm';
import { CertificateManager } from '@/components/admin/CertificateManager';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { 
    user, 
    isAuthLoading,
    courses, 
    settings, 
    enrollments, 
    monthlyPayments, 
    leads, 
    signOut,
    refreshData,
    isDataSyncing,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Trigger Supabase Live Sync on Admin Mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Loading State while verifying session
  if (isAuthLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 font-bangla bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
          <p className="text-sm font-bold text-slate-300">অ্যাডমিন অনুমতি যাচাই হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // Auth Protection: If user is not logged in or is not an admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 font-bangla bg-slate-900">
        <div className="max-w-md w-full bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center space-y-4 shadow-2xl text-white">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">অ্যাডমিন এক্সেস সংরক্ষিত</h2>
          <p className="text-xs text-slate-400">
            অ্যাডমিন কন্ট্রোল প্যানেলে প্রবেশের জন্য অনুমোদিত অ্যাডমিন ইমেইল দিয়ে সাইন-ইন করুন।
          </p>
          <Link
            href="/auth/login?redirect=/admin"
            className="inline-block bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition"
          >
            অ্যাডমিন লগইন করুন
          </Link>
        </div>
      </div>
    );
  }

  // Calculated Stats
  const pendingEnrollments = enrollments.filter((e) => e.admissionStatus === 'pending');
  const approvedEnrollments = enrollments.filter((e) => e.admissionStatus === 'approved');
  const pendingMonthlyPayments = monthlyPayments.filter((p) => p.status === 'pending');
  const totalApprovedRevenue = approvedEnrollments.length * 1000 + monthlyPayments.filter((p) => p.status === 'approved').length * 500;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-bangla pb-20">
      
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-white">বিডি হোমিও অ্যাডমিন কন্ট্রোল</h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/30 font-mono">
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">{user.email}</p>
          </div>
        </div>

        {/* Action Controls in Header */}
        <div className="flex items-center gap-3">
          
          {/* VIEW AS STUDENT BUTTON */}
          <Link
            href="/dashboard"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition"
            title="স্টুডেন্ট ড্যাশবোর্ড নতুন ট্যাবে খুলুন"
          >
            <GraduationCap className="w-4 h-4" />
            <span>স্টুডেন্ট ভিউ (Dashboard)</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </Link>

          {/* Sync DB Button */}
          <button
            onClick={() => {
              refreshData();
              showToast('ডাটাবেজ লাইভ সিঙ্ক সম্পন্ন হয়েছে!', 'success');
            }}
            disabled={isDataSyncing}
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-3 py-2 rounded-xl border border-slate-700 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isDataSyncing ? 'animate-spin text-emerald-400' : ''}`} />
            <span className="hidden sm:inline">{isDataSyncing ? 'সিঙ্ক হচ্ছে...' : 'রিফ্রেশ'}</span>
          </button>

          {/* View Website */}
          <Link
            href="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 transition"
          >
            <span>লাইভ সাইট</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Logout */}
          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-1 bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-bold px-3 py-2 rounded-xl border border-rose-800/60 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-slate-800">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeTab === 'dashboard'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>ড্যাশবোর্ড ও পরিসংখ্যান</span>
          </button>

          <button
            onClick={() => setActiveTab('enrollments')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 relative ${
              activeTab === 'enrollments'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ভর্তি অনুমোদন</span>
            {pendingEnrollments.length > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full font-mono">
                {pendingEnrollments.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('monthly')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 relative ${
              activeTab === 'monthly'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>মাসিক ফি অনুমোদন</span>
            {pendingMonthlyPayments.length > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full font-mono">
                {pendingMonthlyPayments.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeTab === 'certificates'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>সনদপত্র ও কুরিয়ার ট্র্যাকার</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeTab === 'courses'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>কোর্স ও কারিকুলাম</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeTab === 'leads'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>ওরিয়েন্টেশন লিড</span>
            {leads.length > 0 && (
              <span className="bg-emerald-400 text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full font-mono">
                {leads.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeTab === 'media'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>গ্যালারি ও ফটো অ্যালবাম</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shrink-0 ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>সাইট সেটিংস ও কন্টেন্ট</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="pt-6">
          
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Top Quick Stats Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">মোট নিবন্ধিত শিক্ষার্থী</span>
                    <Users className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {enrollments.length}
                  </p>
                  <p className="text-[11px] text-emerald-400 font-bold">
                    অনুমোদিত: {approvedEnrollments.length} জন
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">ভর্তি অনুমোদন পেন্ডিং</span>
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">
                    {pendingEnrollments.length}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {pendingEnrollments.length > 0 ? 'যাচাই করুন ও অনুমোদন দিন' : 'কোনো পেন্ডিং ভর্তি নেই'}
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">মাসিক ফি পেন্ডিং</span>
                    <CreditCard className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">
                    {pendingMonthlyPayments.length}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {pendingMonthlyPayments.length > 0 ? 'টাকা রিসিভ নিশ্চিত করুন' : 'সকল পেমেন্ট ক্লিয়ার'}
                  </p>
                </div>

                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold">মোট ওরিয়েন্টেশন লিড</span>
                    <Sparkles className="w-5 h-5 text-teal-400" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-teal-400 font-mono">
                    {leads.length}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    ফ্রি ক্লাসে অংশগ্রহণে আগ্রহী
                  </p>
                </div>

              </div>

              {/* Quick Jump Shortcuts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div 
                  onClick={() => setActiveTab('enrollments')}
                  className="cursor-pointer bg-slate-900/80 hover:bg-slate-800 p-5 rounded-2xl border border-slate-800 transition flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white">ভর্তি অনুমোদন করুন</h4>
                    <p className="text-xs text-slate-400">নতুন ছাত্র ভর্তি এবং TrxID যাচাই</p>
                  </div>
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>

                <div 
                  onClick={() => setActiveTab('settings')}
                  className="cursor-pointer bg-slate-900/80 hover:bg-slate-800 p-5 rounded-2xl border border-slate-800 transition flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white">সাইট কন্টেন্ট ও নাম্বার</h4>
                    <p className="text-xs text-slate-400">বিকাশ/নগদ নাম্বার ও নোটিশ এডিট</p>
                  </div>
                  <Settings className="w-6 h-6 text-amber-400" />
                </div>

                <div 
                  onClick={() => setActiveTab('media')}
                  className="cursor-pointer bg-slate-900/80 hover:bg-slate-800 p-5 rounded-2xl border border-slate-800 transition flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white">গ্যালারি ও ফটো অ্যালবাম</h4>
                    <p className="text-xs text-slate-400">কর্মশালা ও সনদের ছবি পরিচালনা</p>
                  </div>
                  <ImageIcon className="w-6 h-6 text-teal-400" />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ENROLLMENTS */}
          {activeTab === 'enrollments' && <EnrollmentApprovals />}

          {/* TAB 3: MONTHLY FEES */}
          {activeTab === 'monthly' && <MonthlyFeeApprovals />}

          {/* TAB 4: CERTIFICATES & COURIER */}
          {activeTab === 'certificates' && <CertificateManager />}

          {/* TAB 5: COURSES */}
          {activeTab === 'courses' && <CourseManager />}

          {/* TAB 6: LEADS */}
          {activeTab === 'leads' && <LeadManager />}

          {/* TAB 7: MEDIA & GALLERY */}
          {activeTab === 'media' && <MediaManager />}

          {/* TAB 8: SITE SETTINGS */}
          {activeTab === 'settings' && <SiteSettingsForm />}

        </div>

      </div>

    </div>
  );
}
