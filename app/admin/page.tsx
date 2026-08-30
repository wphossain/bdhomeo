'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/lib/store';
import { 
  BarChart3, 
  Users, 
  Clock, 
  DollarSign, 
  BookOpen, 
  Settings, 
  Sparkles, 
  CreditCard,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
  ImageIcon,
  LogOut,
  RefreshCw,
  Truck,
  GraduationCap
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

  const [activeTab, setActiveTab] = useState<string>('overview');

  // Trigger Live Sync on Admin Mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Loading State
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

  // Auth Guard
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 font-bangla bg-slate-900">
        <div className="max-w-md w-full bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center space-y-4 shadow-2xl text-white">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white">অ্যাডমিন এক্সেস সংরক্ষিত</h2>
          <p className="text-xs text-slate-400">
            অ্যাডমিন প্যানেলে প্রবেশের জন্য অনুমোদিত অ্যাডমিন ইমেইল দিয়ে সাইন-ইন করুন।
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
  const pendingMonthly = monthlyPayments.filter((p) => p.status === 'pending');
  const approvedMonthly = monthlyPayments.filter((p) => p.status === 'approved');
  
  const admissionRevenue = approvedEnrollments.reduce((acc, curr) => acc + (curr.amount || 1000), 0);
  const monthlyRevenue = approvedMonthly.reduce((acc, curr) => acc + (curr.amount || 500), 0);
  const totalRevenue = admissionRevenue + monthlyRevenue;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-bangla pb-20">
      
      {/* Top Header Banner */}
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-white">বিডি হোমিও অ্যাডমিন কন্ট্রোল প্যানেল</h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/30 font-mono">
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">{user.email}</p>
          </div>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-2.5">
          
          {/* VIEW AS STUDENT BUTTON */}
          <Link
            href="/dashboard"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-md transition"
            title="স্টুডেন্ট ড্যাশবোর্ড দেখুন"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">স্টুডেন্ট ভিউ (Dashboard)</span>
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
            <span className="hidden sm:inline">{isDataSyncing ? 'সিঙ্ক হচ্ছে...' : 'লাইভ সিঙ্ক'}</span>
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

      {/* Main Admin Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-slate-950 rounded-3xl p-3 border border-slate-800 space-y-1.5 sticky top-20">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'overview'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4" />
              <span>ড্যাশবোর্ড ওভারভিউ</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('fees')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'fees'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <DollarSign className="w-4 h-4" />
              <span>ছাত্র মাসিক ফি অনুমোদন</span>
            </div>
            {pendingMonthly.length > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                {pendingMonthly.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('enrollments')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'enrollments'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>ভর্তি অনুমোদন</span>
            </div>
            {pendingEnrollments.length > 0 && (
              <span className="bg-blue-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                {pendingEnrollments.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'courses'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4" />
              <span>কোর্স ও কারিকুলাম</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'certificates'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4" />
              <span>সনদপত্র ও কুরিয়ার ট্র্যাকার</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'leads'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4" />
              <span>ওরিয়েন্টেশন লিড</span>
            </div>
            {leads.length > 0 && (
              <span className="bg-purple-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                {leads.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'media'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-4 h-4" />
              <span>গ্যালারি ও ফটো অ্যালবাম</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'settings'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4" />
              <span>সাইট সেটিংস ও কন্টেন্ট</span>
            </div>
          </button>

        </aside>

        {/* Right Main Content Tabs */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              <div>
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-emerald-400" />
                  বিডি হোমিও অ্যাডমিন ওভারভিউ ও অ্যানালিটিক্স
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  ভর্তি, মাসিক ফি ও ওরিয়েন্টেশন লিডের রিয়েল-টাইম তথ্য এবং সাইটের সামগ্রিক পরিসংখ্যান।
                </p>
              </div>

              {/* 4 Overview Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Metric 1: Total Revenue */}
                <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">মোট সংগৃহীত আয়</span>
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-2xl font-black text-white font-mono">
                      ৳{totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-emerald-400">
                      ভর্তি: ৳{admissionRevenue.toLocaleString()} • মাসিক ফি: ৳{monthlyRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Metric 2: Enrolled Students */}
                <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">অনুমোদিত শিক্ষার্থী</span>
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-2xl font-black text-white font-mono">
                      {approvedEnrollments.length} জন
                    </p>
                    <p className="text-[11px] text-amber-400 font-bold">
                      অপেক্ষমান আবেদন: {pendingEnrollments.length} টি
                    </p>
                  </div>
                </div>

                {/* Metric 3: Monthly Fee Verification */}
                <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">মাসিক ফি কনফার্মেশন</span>
                    <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                      <CreditCard className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-2xl font-black text-white font-mono">
                      {approvedMonthly.length} টি
                    </p>
                    <p className="text-[11px] text-rose-400 font-bold">
                      পেন্ডিং ভেরিফিকেশন: {pendingMonthly.length} টি
                    </p>
                  </div>
                </div>

                {/* Metric 4: Orientation Leads */}
                <div className="bg-slate-950 p-5 rounded-3xl border border-slate-800 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">ফ্রি ওরিয়েন্টেশন লিড</span>
                    <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-2xl font-black text-white font-mono">
                      {leads.length} জন
                    </p>
                    <p className="text-[11px] text-purple-400 font-bold">
                      নতুন লিড: {leads.length} জন
                    </p>
                  </div>
                </div>

              </div>

              {/* Quick Actions Panel */}
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  অ্যাডমিন শর্টকাট অ্যাকশন
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab('fees')}
                    className="p-4 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 text-left transition flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">মাসিক ফি যাচাই করুন</span>
                      <span className="text-[11px] text-slate-400">{pendingMonthly.length} টি পেন্ডিং</span>
                    </div>
                    <DollarSign className="w-5 h-5 text-amber-400" />
                  </button>

                  <button
                    onClick={() => setActiveTab('enrollments')}
                    className="p-4 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 text-left transition flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">ভর্তি অনুমোদন করুন</span>
                      <span className="text-[11px] text-slate-400">{pendingEnrollments.length} টি আবেদন</span>
                    </div>
                    <Users className="w-5 h-5 text-blue-400" />
                  </button>

                  <button
                    onClick={() => setActiveTab('leads')}
                    className="p-4 bg-slate-900 hover:bg-slate-800 rounded-2xl border border-slate-800 text-left transition flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block">ওরিয়েন্টেশন কল লিস্ট</span>
                      <span className="text-[11px] text-slate-400">{leads.length} টি লিড</span>
                    </div>
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: STUDENT FEE CONFIRMATION */}
          {activeTab === 'fees' && <MonthlyFeeApprovals />}

          {/* TAB 3: ENROLLMENT APPROVALS */}
          {activeTab === 'enrollments' && <EnrollmentApprovals />}

          {/* TAB 4: COURSE MANAGER */}
          {activeTab === 'courses' && <CourseManager />}

          {/* TAB 5: CERTIFICATES */}
          {activeTab === 'certificates' && <CertificateManager />}

          {/* TAB 6: LEAD MANAGER */}
          {activeTab === 'leads' && <LeadManager />}

          {/* TAB 7: MEDIA & GALLERY */}
          {activeTab === 'media' && <MediaManager />}

          {/* TAB 8: SITE SETTINGS */}
          {activeTab === 'settings' && <SiteSettingsForm />}

        </main>

      </div>

    </div>
  );
}
