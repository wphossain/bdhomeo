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
  RefreshCw
} from 'lucide-react';
import { CourseManager } from '@/components/admin/CourseManager';
import { EnrollmentApprovals } from '@/components/admin/EnrollmentApprovals';
import { MonthlyFeeApprovals } from '@/components/admin/MonthlyFeeApprovals';
import { LeadManager } from '@/components/admin/LeadManager';
import { MediaManager } from '@/components/admin/MediaManager';
import { SiteSettingsForm } from '@/components/admin/SiteSettingsForm';
import { CertificateManager } from '@/components/admin/CertificateManager';
import { Truck } from 'lucide-react';
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
          <h2 className="text-xl font-bold text-white">অ্যাডমিন অ্যাক্সেস সুরক্ষিত</h2>
          <p className="text-xs text-slate-400">
            অ্যাডমিন প্যানেল ব্যবহারের জন্য অনুমোদিত ইমেইল দিয়ে সাইন-ইন করুন।
          </p>
          <Link
            href="/auth/login"
            className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl transition"
          >
            Google লগইন পেইজে যান
          </Link>
        </div>
      </div>
    );
  }

  // Financial & Stats Calculations
  const approvedEnrollments = enrollments.filter((e) => e.admissionStatus === 'approved');
  const pendingEnrollments = enrollments.filter((e) => e.admissionStatus === 'pending');
  const approvedMonthly = monthlyPayments.filter((p) => p.status === 'approved');
  const pendingMonthly = monthlyPayments.filter((p) => p.status === 'pending');

  const admissionRevenue = approvedEnrollments.length * 1000;
  const monthlyRevenue = approvedMonthly.reduce((sum, p) => sum + (p.amount || 500), 0);
  const totalRevenue = admissionRevenue + monthlyRevenue;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-bangla flex flex-col">
      
      {/* Top Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600/20 border border-emerald-500/30 rounded-xl text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black text-white leading-tight">
              বিডি হোমিও অ্যাডমিন কন্ট্রোল হাব
            </h1>
            <p className="text-[11px] text-emerald-400 font-bold">
              সুপার অ্যাডমিন: {user.fullName} ({user.email})
            </p>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2">
          {/* Live Supabase Sync Button */}
          <button
            onClick={() => {
              refreshData();
              showToast('Supabase ডাটাবেজ থেকে লাইভ রিফ্রেশ করা হয়েছে!', 'success');
            }}
            disabled={isDataSyncing}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-bold text-xs px-3.5 py-2 rounded-xl transition"
            title="লাইভ Supabase ডাটাবেজ সিঙ্ক"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isDataSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isDataSyncing ? 'সিঙ্ক হচ্ছে...' : 'Supabase সিঙ্ক'}</span>
          </button>

          {/* Live Meet Shortcut Button */}
          <a
            href={settings.googleMeetUrl || 'https://meet.google.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 font-bold text-xs px-3.5 py-2 rounded-xl transition shadow-sm"
          >
            <VideoIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">লাইভ গুগল মিট</span>
          </a>

          <Link
            href="/"
            target="_blank"
            className="hidden md:flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 transition"
          >
            <span>মূল ওয়েবসাইট</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={signOut}
            className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
            title="লগআউট"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Workspace Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Left Vertical Navigation Menu */}
        <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-6 shrink-0">
          
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider px-3">
              প্রধান মেনু
            </span>

            {/* 1. Dashboard (1st Default Option) */}
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard (ইনসাইটস)</span>
              </div>
            </button>

            {/* 2. Student Fee Confirmation (2nd Position) */}
            <button
              onClick={() => setActiveTab('fees')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition ${
                activeTab === 'fees'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <DollarSign className="w-4 h-4" />
                <span>Student Fee Confirmation</span>
              </div>
              {pendingMonthly.length > 0 && (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {pendingMonthly.length}
                </span>
              )}
            </button>

            {/* 3. Enrollment Approvals */}
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition ${
                activeTab === 'enrollments'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>ভর্তির আবেদন ও শিক্ষার্থী</span>
              </div>
              {pendingEnrollments.length > 0 && (
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  {pendingEnrollments.length}
                </span>
              )}
            </button>

            {/* 4. Course Manager */}
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition ${
                activeTab === 'courses'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" />
                <span>কোর্স ও লেকচার সিলেবাস</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                {courses.length}
              </span>
            </button>

            {/* 5. Orientation Leads */}
            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition ${
                activeTab === 'leads'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4" />
                <span>ওরিয়েন্টেশন লিড ও কলিং</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-amber-400 font-bold px-2 py-0.5 rounded">
                {leads.length}
              </span>
            </button>

            {/* 6. Media & Gallery */}
            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition ${
                activeTab === 'media'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ImageIcon className="w-4 h-4" />
                <span>ছবি ও মিডিয়া ম্যানেজার</span>
              </div>
            </button>

            {/* 7. Site Content & Settings */}
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition ${
                activeTab === 'settings'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>সাইট কনটেন্ট ও সেটিংস</span>
              </div>
            </button>
          </div>

          {/* Database Health Widget */}
          <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-2 text-[11px]">
            <span className="text-slate-400 font-bold block">সুপার ডাটাবেজ হেলথ:</span>
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

        {/* Right Content Workspace */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD (First / Default Option) */}
          {activeTab === 'dashboard' && (
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
                      নতুন লিড: {leads.filter(l => l.status === 'new').length} জন
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

          {/* TAB 2: STUDENT FEE CONFIRMATION (2nd Position) */}
          {activeTab === 'fees' && <MonthlyFeeApprovals />}

          {/* TAB 3: ENROLLMENT APPROVALS */}
          {activeTab === 'enrollments' && <EnrollmentApprovals />}

          {/* TAB 4: COURSE MANAGER */}
          {activeTab === 'courses' && <CourseManager />}

          {/* TAB 5: LEAD MANAGER */}
          {activeTab === 'certificates' && <CertificateManager />}
          {activeTab === 'leads' && <LeadManager />}

          {/* TAB 6: MEDIA & GALLERY */}
          {activeTab === 'media' && <MediaManager />}

          {/* TAB 7: SITE SETTINGS */}
          {activeTab === 'settings' && <SiteSettingsForm />}

        </main>

      </div>

    </div>
  );
}
