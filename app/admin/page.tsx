'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { CourseManager } from '@/components/admin/CourseManager';
import { MediaManager } from '@/components/admin/MediaManager';
import { SiteSettingsForm } from '@/components/admin/SiteSettingsForm';
import { EnrollmentApprovals } from '@/components/admin/EnrollmentApprovals';
import { MonthlyFeeApprovals } from '@/components/admin/MonthlyFeeApprovals';
import { LeadManager } from '@/components/admin/LeadManager';
import { 
  ShieldCheck, 
  Users, 
  CreditCard, 
  MessageSquare, 
  Settings, 
  BookOpen, 
  ImageIcon, 
  Lock, 
  GraduationCap, 
  BarChart3, 
  LogOut, 
  Video, 
  Menu, 
  X,
  Home,
  LayoutDashboard,
  Activity,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

type AdminTab = 'dashboard' | 'payments' | 'courses' | 'enrollments' | 'leads' | 'media' | 'settings';

export default function AdminPage() {
  const { user, enrollments, monthlyPayments, leads, courses, settings, signInWithGoogle, signOut } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if Admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 font-bangla">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">
              Super Admin Access Only
            </span>
            <h2 className="text-2xl font-black text-white mt-3">
              অ্যাডমিন কন্ট্রোল প্যানেল
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              এই পোর্টালটি শুধুমাত্র ডাঃ মোঃ গিয়াস উদ্দিন স্যার এবং নির্দিষ্ট অ্যাডমিনদের জন্য সুরক্ষিত।
            </p>
          </div>

          {user ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                <p>লগইন ইউজার: <strong className="text-white">{user.fullName}</strong></p>
                <p className="text-emerald-400 font-bold">রোল: Student (সাধারণ শিক্ষার্থী)</p>
              </div>

              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl shadow transition"
              >
                <GraduationCap className="w-4 h-4" />
                <span>আমার ক্লাসরুমে যান</span>
              </Link>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition"
            >
              <span>Admin Google Account দিয়ে সাইন-ইন</span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-emerald-400 font-bold flex items-center justify-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>মূল হোমপেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Statistics
  const pendingEnrollments = enrollments.filter((e) => e.admissionStatus === 'pending');
  const approvedEnrollments = enrollments.filter((e) => e.admissionStatus === 'approved');
  const pendingPayments = monthlyPayments.filter((p) => p.status === 'pending');
  const approvedPayments = monthlyPayments.filter((p) => p.status === 'approved');

  const totalAdmissionRevenue = approvedEnrollments.length * 1000;
  const totalMonthlyRevenue = approvedPayments.length * 500;
  const totalRevenue = totalAdmissionRevenue + totalMonthlyRevenue;

  const navItems: { id: AdminTab; label: string; icon: any; count?: number; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'payments', label: 'Student Fee Confirmation', icon: CreditCard, count: pendingPayments.length, badgeColor: 'bg-rose-500 text-white' },
    { id: 'courses', label: 'কোর্স ও সিলেবাস সিএমএস', icon: BookOpen },
    { id: 'enrollments', label: 'ভর্তির আবেদন অনুমোদন', icon: Users, count: pendingEnrollments.length, badgeColor: 'bg-amber-500 text-white' },
    { id: 'leads', label: 'ওরিয়েন্টেশন লিড সিআরএম', icon: MessageSquare, count: leads.length, badgeColor: 'bg-blue-500 text-white' },
    { id: 'media', label: 'ছবি ও মিডিয়া ম্যানেজার', icon: ImageIcon },
    { id: 'settings', label: 'সাইট কনটেন্ট ও নম্বর', icon: Settings },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-bangla flex flex-col">
      
      {/* Top Admin SaaS App Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black shadow-md">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="font-black text-sm text-white tracking-tight leading-none block">
                বিডি হোমিও অ্যাডমিন
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mt-0.5">
                Full CMS Control Hub
              </span>
            </div>
          </Link>
        </div>

        {/* Right Quick Actions (Google Meet, Main Site, Student Portal, Logout) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Live Google Meet Shortcut in Top Header */}
          <a
            href={settings.googleMeetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition"
          >
            <Video className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">লাইভ গুগল মিট</span>
          </a>

          <Link
            href="/"
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">মূল ওয়েবসাইট</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-500/30 transition"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">শিক্ষার্থী ক্লাসরুম</span>
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

      <div className="flex-1 flex max-w-[1700px] w-full mx-auto">
        
        {/* ===================== LEFT SIDEBAR ===================== */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-5">
            
            {/* User Details */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
                {user.avatarUrl ? (
                  <Image src={user.avatarUrl} alt={user.fullName} width={40} height={40} className="rounded-xl" />
                ) : (
                  user.fullName.charAt(0)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xs text-white truncate">{user.fullName}</p>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 font-black px-1.5 py-0.2 rounded uppercase">
                  Super Admin
                </span>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 pb-1">
                ম্যানেজমেন্ট মেনু
              </p>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition group text-left
                      ${isActive 
                        ? 'bg-emerald-600 text-white shadow-lg font-extrabold' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.count !== undefined && item.count > 0 && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isActive ? 'bg-white text-emerald-950' : item.badgeColor || 'bg-emerald-500 text-white'}`}>
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

          </div>

          {/* Sidebar Status Pill */}
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Server Online</span>
            </span>
            <span className="font-english font-bold text-emerald-400">99.9% Uptime</span>
          </div>

        </aside>

        {/* ===================== RIGHT WORKSPACE ===================== */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-950 overflow-y-auto">
          
          {/* 1. DASHBOARD OVERVIEW TAB (DEFAULT) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 font-bangla animate-in fade-in duration-200">
              
              {/* Top Banner with Live Site Health */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 p-6 sm:p-8 rounded-3xl border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Production
                    </span>
                    <span className="text-xs text-slate-400 font-english">BD Homeo Cloud Engine</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
                    অ্যাকাডেমিক কন্ট্রোল হাব & Dashboard
                  </h1>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    ডাঃ মোঃ গিয়াস উদ্দিন স্যারের বিডি হোমিও প্রশিক্ষণ কেন্দ্রের সার্বিক ভর্তি, মাসিক ফি, শিক্ষার্থী ও কোর্স ব্যবস্থাপনা।
                  </p>
                </div>

                {/* Site Health Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
                  <div className="p-2 text-center">
                    <span className="text-[10px] text-slate-400 block font-bold">ডাটাবেজ</span>
                    <span className="text-xs font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Online
                    </span>
                  </div>
                  <div className="p-2 text-center border-l border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-bold">Auth API</span>
                    <span className="text-xs font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  </div>
                  <div className="p-2 text-center border-l border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-bold">ক্লাউড স্টোরেজ</span>
                    <span className="text-xs font-black text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </span>
                  </div>
                  <div className="p-2 text-center border-l border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-bold">সার্ভার লেটেন্সি</span>
                    <span className="text-xs font-black text-amber-400 font-english mt-0.5 block">
                      24ms
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 Core Summary Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Total Revenue */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2 hover:border-emerald-500/40 transition shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold uppercase">মোট কালেকশন (Revenue)</span>
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-400 font-english">
                    ৳{totalRevenue.toLocaleString('en-US')}/-
                  </p>
                  <p className="text-[11px] text-slate-400">ভর্তি ও মাসিক ফি বাবদ সর্বমোট আদায়</p>
                </div>

                {/* Approved Students */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2 hover:border-emerald-500/40 transition shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold uppercase">এক্টিভ শিক্ষার্থী</span>
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-white font-english">
                    {approvedEnrollments.length} জন
                  </p>
                  <p className="text-[11px] text-emerald-400 font-bold">ভর্তি নিশ্চিতকৃত শিক্ষার্থী</p>
                </div>

                {/* Pending Actions (Enrollment + Monthly Fee) */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2 hover:border-amber-500/40 transition shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold uppercase">পেন্ডিং ফি ও ভর্তি যাচাই</span>
                    <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-amber-400 font-english">
                    {pendingEnrollments.length + pendingPayments.length} টি
                  </p>
                  <p className="text-[11px] text-slate-400">
                    ভর্তি: {pendingEnrollments.length} | মাসিক ফি: {pendingPayments.length}
                  </p>
                </div>

                {/* Orientation Leads */}
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2 hover:border-purple-500/40 transition shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-bold uppercase">ফ্রি ক্লাসের লিড</span>
                    <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-purple-300 font-english">
                    {leads.length} জন
                  </p>
                  <p className="text-[11px] text-slate-400">রেজিস্ট্রেশনকৃত আগ্রহী সদস্য</p>
                </div>

              </div>

              {/* Quick Actions & Recent Activities Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Quick Action Shortcuts */}
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
                      onClick={() => setActiveTab('payments')}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-950 hover:bg-slate-800 rounded-2xl border border-slate-800 text-xs font-bold text-slate-200 transition group"
                    >
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-amber-400" />
                        <span>Student Fee Confirmation ({pendingPayments.length} টি পেন্ডিং)</span>
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

                {/* Revenue Breakdown */}
                <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4 lg:col-span-2">
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    আয় ও পেমেন্ট সামারি (Financial Overview)
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-xs text-slate-400">এককালীন ভর্তি ফি আয় (৳১,০০০ x {approvedEnrollments.length})</span>
                      <p className="text-2xl font-black text-emerald-400 font-english mt-1">
                        ৳{totalAdmissionRevenue.toLocaleString('en-US')}/-
                      </p>
                      <p className="text-[11px] text-slate-500">অনুমোদিত ভর্তি সংখ্যা: {approvedEnrollments.length} জন</p>
                    </div>

                    <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                      <span className="text-xs text-slate-400">মাসিক ফি বাবদ আয় (৳৫০০ x {approvedPayments.length})</span>
                      <p className="text-2xl font-black text-amber-400 font-english mt-1">
                        ৳{totalMonthlyRevenue.toLocaleString('en-US')}/-
                      </p>
                      <p className="text-[11px] text-slate-500">অনুমোদিত মাসিক ট্রানজেকশন: {approvedPayments.length} টি</p>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between">
                    <span>💡 বিকাশ মার্চেন্ট ও নগদ পেমেন্ট নম্বর: <strong>{settings.bkashNumber}</strong></span>
                    <button onClick={() => setActiveTab('settings')} className="text-xs font-bold underline hover:text-white">
                      পরিবর্তন করুন
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 2. STUDENT FEE CONFIRMATION TAB */}
          {activeTab === 'payments' && <MonthlyFeeApprovals />}

          {/* 3. COURSES & SYLLABUS CMS */}
          {activeTab === 'courses' && <CourseManager />}

          {/* 4. ENROLLMENTS APPROVALS */}
          {activeTab === 'enrollments' && <EnrollmentApprovals />}

          {/* 5. ORIENTATION LEADS CRM */}
          {activeTab === 'leads' && <LeadManager />}

          {/* 6. MEDIA & GALLERY MANAGER */}
          {activeTab === 'media' && <MediaManager />}

          {/* 7. SITE SETTINGS */}
          {activeTab === 'settings' && <SiteSettingsForm />}

        </main>

      </div>

    </div>
  );
}
