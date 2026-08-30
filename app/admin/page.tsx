'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  GraduationCap,
  Video,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Layers,
  MessageSquare
} from 'lucide-react';
import { CourseManager } from '@/components/admin/CourseManager';
import { EnrollmentApprovals } from '@/components/admin/EnrollmentApprovals';
import { MonthlyFeeApprovals } from '@/components/admin/MonthlyFeeApprovals';
import { LeadManager } from '@/components/admin/LeadManager';
import { MediaManager } from '@/components/admin/MediaManager';
import { SiteSettingsForm } from '@/components/admin/SiteSettingsForm';
import { CertificateManager } from '@/components/admin/CertificateManager';

export default function AdminDashboardPage() {
  const { 
    user, 
    isAuthLoading,
    courses, 
    settings, 
    enrollments, 
    monthlyPayments, 
    leads, 
    certificateRequests,
    signOut,
    refreshData,
    isDataSyncing,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isCourseSubmenuOpen, setIsCourseSubmenuOpen] = useState(true);

  // Trigger Supabase Live Sync on Admin Mount
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Loading State
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 font-bangla bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-400" />
          <p className="text-sm font-bold text-slate-300">অ্যাডমিন অনুমতি যাচাই হচ্ছে...</p>
        </div>
      </div>
    );
  }

  // Auth Protection
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 font-bangla bg-slate-950">
        <div className="max-w-md w-full bg-slate-900 p-8 rounded-3xl border border-slate-800 text-center space-y-4 shadow-2xl text-white">
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
  const pendingCertificates = certificateRequests.filter((c) => c.status === 'pending');
  
  const admissionRevenue = approvedEnrollments.reduce((acc, curr) => acc + (curr.amount || 1000), 0);
  const monthlyRevenue = approvedMonthly.reduce((acc, curr) => acc + (curr.amount || 500), 0);
  const totalRevenue = admissionRevenue + monthlyRevenue;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-bangla">
      
      {/* ========================================================= */}
      {/* TOP FULL-WIDTH HEADER BAR */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        
        {/* Left Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-black text-white">বিডি হোমিও অ্যাডমিন কন্ট্রোল</h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 font-mono animate-pulse">
                LIVE 🟢
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">{user.email}</p>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Live Meet Quick Launcher */}
          {settings.googleMeetUrl && (
            <a
              href={settings.googleMeetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow transition"
              title="গুগল মিট ক্লাসরুমে প্রবেশ করুন"
            >
              <Video className="w-3.5 h-3.5" />
              <span>লাইভ ক্লাস মিট</span>
            </a>
          )}

          {/* VIEW AS STUDENT BUTTON */}
          <Link
            href="/dashboard"
            target="_blank"
            className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow transition"
            title="স্টুডেন্ট ড্যাশবোর্ড দেখুন"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden md:inline">স্টুডেন্ট ভিউ (Dashboard)</span>
            <ExternalLink className="w-3 h-3 opacity-80" />
          </Link>

          {/* Sync DB Button */}
          <button
            onClick={() => {
              refreshData();
              showToast('ডাটাবেজ লাইভ সিঙ্ক সম্পন্ন হয়েছে!', 'success');
            }}
            disabled={isDataSyncing}
            className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs px-2.5 py-1.5 rounded-xl border border-slate-700 transition"
            title="Supabase ডাটা সিঙ্ক করুন"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isDataSyncing ? 'animate-spin text-emerald-400' : ''}`} />
            <span className="hidden xl:inline">{isDataSyncing ? 'সিঙ্ক...' : 'লাইভ সিঙ্ক'}</span>
          </button>

          {/* View Website */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-2.5 py-1.5 rounded-xl border border-slate-700 transition"
          >
            <span>লাইভ সাইট</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {/* Logout */}
          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-1 bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-bold px-2.5 py-1.5 rounded-xl border border-rose-800/60 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MAIN BODY: FULL-HEIGHT LEFT SIDEBAR + RIGHT WORKSPACE */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 shrink-0 flex flex-col justify-between overflow-y-auto space-y-6">
          
          <div className="space-y-4">
            
            {/* Admin Profile Badge */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3 shadow-inner">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-base flex items-center justify-center shadow">
                {user.fullName ? user.fullName.charAt(0) : 'A'}
              </div>
              <div className="truncate">
                <h3 className="text-xs font-bold text-white truncate">{user.fullName || 'অ্যাডমিনিস্ট্রেটর'}</h3>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 inline-block mt-0.5">
                  Super Admin
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1.5">
              
              {/* 1. Overview */}
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'overview'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4" />
                  <span>১. ড্যাশবোর্ড ওভারভিউ</span>
                </div>
              </button>

              {/* 2. Fee Confirmation */}
              <button
                onClick={() => setActiveTab('fees')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'fees'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-4 h-4" />
                  <span>২. ছাত্র মাসিক ফি অনুমোদন</span>
                </div>
                {pendingMonthly.length > 0 && (
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                    {pendingMonthly.length}
                  </span>
                )}
              </button>

              {/* 3. Course Manager with Submenu */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('courses');
                    setIsCourseSubmenuOpen(!isCourseSubmenuOpen);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                    activeTab === 'courses'
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4" />
                    <span>৩. কোর্স ও সিলেবাস CMS</span>
                  </div>
                  {isCourseSubmenuOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>

                {isCourseSubmenuOpen && (
                  <div className="pl-6 space-y-1 pt-0.5">
                    {courses.map((course) => (
                      <button
                        key={course.id}
                        onClick={() => setActiveTab('courses')}
                        className="w-full text-left px-2.5 py-1.5 text-[11px] text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60 rounded-lg truncate transition flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span className="truncate">{course.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Enrollment Approvals */}
              <button
                onClick={() => setActiveTab('enrollments')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'enrollments'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>৪. ভর্তি অনুমোদন ও শিক্ষার্থী</span>
                </div>
                {pendingEnrollments.length > 0 && (
                  <span className="bg-blue-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                    {pendingEnrollments.length}
                  </span>
                )}
              </button>

              {/* 5. Certificate Tracker */}
              <button
                onClick={() => setActiveTab('certificates')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'certificates'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4" />
                  <span>৫. সনদপত্র ও কুরিয়ার ট্র্যাকার</span>
                </div>
                {pendingCertificates.length > 0 && (
                  <span className="bg-rose-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                    {pendingCertificates.length}
                  </span>
                )}
              </button>

              {/* 6. Lead CRM */}
              <button
                onClick={() => setActiveTab('leads')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'leads'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4" />
                  <span>৬. ফ্রি ওরিয়েন্টেশন লিড CRM</span>
                </div>
                {leads.length > 0 && (
                  <span className="bg-purple-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full font-mono">
                    {leads.length}
                  </span>
                )}
              </button>

              {/* 7. Media Library */}
              <button
                onClick={() => setActiveTab('media')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'media'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ImageIcon className="w-4 h-4" />
                  <span>৭. ছবি ও মিডিয়া লাইব্রেরি</span>
                </div>
              </button>

              {/* 8. Site Settings */}
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'settings'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4" />
                  <span>৮. সাইট কনটেন্ট ও সার্বিক সেটিংস</span>
                </div>
              </button>

            </nav>

          </div>

          {/* Database Health Widget at Bottom of Sidebar */}
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-[11px]">
            <span className="text-slate-400 font-bold block">ডাটাবেজ ও ক্লাউড স্ট্যাটাস:</span>
            <div className="flex items-center justify-between text-emerald-400">
              <span>Supabase Cloud</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>Google OAuth</span>
              <span className="text-emerald-400 font-bold">Active</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>ডাটা সিঙ্ক</span>
              <span className="text-emerald-400 font-bold">{isDataSyncing ? 'Syncing...' : 'Live 🟢'}</span>
            </div>
          </div>

        </aside>

        {/* Right Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-950 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
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
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">মোট সংগৃহীত আয়</span>
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-white font-mono">
                      ৳{totalRevenue.toLocaleString()}
                    </p>
                    <p className="text-[11px] text-emerald-400">
                      ভর্তি: ৳{admissionRevenue.toLocaleString()} • মাসিক ফি: ৳{monthlyRevenue.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Metric 2: Enrolled Students */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">অনুমোদিত শিক্ষার্থী</span>
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-white font-mono">
                      {approvedEnrollments.length} জন
                    </p>
                    <p className="text-[11px] text-amber-400 font-bold">
                      অপেক্ষমান আবেদন: {pendingEnrollments.length} টি
                    </p>
                  </div>
                </div>

                {/* Metric 3: Monthly Fee Verification */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">পরিশোধিত মাসিক ফি</span>
                    <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                      <CreditCard className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-white font-mono">
                      {approvedMonthly.length} টি
                    </p>
                    <p className="text-[11px] text-rose-400 font-bold">
                      পেন্ডিং ভেরিফিকেশন: {pendingMonthly.length} টি
                    </p>
                  </div>
                </div>

                {/* Metric 4: Orientation Leads */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase">ফ্রি ক্লাসের লিড</span>
                    <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-white font-mono">
                      {leads.length} জন
                    </p>
                    <p className="text-[11px] text-purple-400 font-bold">
                      রেজিস্ট্রেশনকৃত আগ্রহী সদস্য
                    </p>
                  </div>
                </div>

              </div>

              {/* Quick Actions Shortcuts & Financial Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 4 Shortcut Action Cards */}
                <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    কুইক অ্যাকশন শর্টকাট
                  </h3>

                  <div className="space-y-2.5">
                    <button
                      onClick={() => setActiveTab('courses')}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 text-xs font-bold text-slate-200 transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <BookOpen className="w-4 h-4 text-emerald-400" />
                        <span>কোর্স ও সিলেবাস পরিচালনা করুন</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
                    </button>

                    <button
                      onClick={() => setActiveTab('fees')}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 text-xs font-bold text-slate-200 transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-amber-400" />
                        <span>Student Fee Confirmation ({pendingMonthly.length} টি পেন্ডিং)</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
                    </button>

                    <button
                      onClick={() => setActiveTab('enrollments')}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 text-xs font-bold text-slate-200 transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span>ম্যানুয়াল শিক্ষার্থী ভর্তি ও অনুমোদন</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
                    </button>

                    <button
                      onClick={() => setActiveTab('settings')}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 text-xs font-bold text-slate-200 transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>পেমেন্ট নম্বর ও সাইট কনটেন্ট সেটিংস</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                    </button>
                  </div>
                </div>

                {/* Financial Breakdown Summary */}
                <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4 lg:col-span-2">
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    আয় ও পেমেন্ট সামারি (Financial Overview)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-xs text-slate-400">এককালীন ভর্তি ফি বাবদ আয় (৳১,০০০ x {approvedEnrollments.length})</span>
                      <p className="text-2xl font-black text-emerald-400 font-mono mt-1">
                        ৳{admissionRevenue.toLocaleString()}/-
                      </p>
                      <p className="text-[11px] text-slate-500">অনুমোদিত ভর্তি সংখ্যা: {approvedEnrollments.length} জন</p>
                    </div>

                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-xs text-slate-400">মাসিক ফি বাবদ সংগৃহীত আয় (৳৫০০ x {approvedMonthly.length})</span>
                      <p className="text-2xl font-black text-amber-400 font-mono mt-1">
                        ৳{monthlyRevenue.toLocaleString()}/-
                      </p>
                      <p className="text-[11px] text-slate-500">অনুমোদিত মাসিক ট্রানজেকশন: {approvedMonthly.length} টি</p>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/30 text-xs text-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span>💡 বিকাশ মার্চেন্ট: <strong>{settings.bkashNumber}</strong> • নগদ পার্সোনাল: <strong>{settings.nagadNumber}</strong></span>
                    <button onClick={() => setActiveTab('settings')} className="text-xs font-bold underline hover:text-white">
                      পরিবর্তন করুন
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: STUDENT FEE CONFIRMATION */}
          {activeTab === 'fees' && <MonthlyFeeApprovals />}

          {/* TAB 3: COURSE MANAGER */}
          {activeTab === 'courses' && <CourseManager />}

          {/* TAB 4: ENROLLMENT APPROVALS */}
          {activeTab === 'enrollments' && <EnrollmentApprovals />}

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
