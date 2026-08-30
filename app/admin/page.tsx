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
  CheckCircle2, 
  Clock,
  BookOpen,
  Image as ImageIcon,
  Sparkles,
  Lock,
  GraduationCap,
  LayoutDashboard,
  BarChart3,
  ExternalLink,
  ChevronRight,
  LogOut,
  Video,
  FileText,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

type AdminTab = 'courses' | 'media' | 'settings' | 'enrollments' | 'payments' | 'leads' | 'analytics';

export default function AdminPage() {
  const { user, enrollments, monthlyPayments, leads, courses, settings, demoLogin, signInWithGoogle, signOut } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>('courses');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if Admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 font-bangla">
        <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/30 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest uppercase bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
              Super Admin Access Only
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-2">
              অ্যাডমিন কন্ট্রোল প্যানেল
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              এই পোর্টালটি শুধুমাত্র ডাঃ মোঃ গিয়াস উদ্দিন স্যার এবং নির্দিষ্ট অ্যাডমিনদের জন্য সুরক্ষিত।
            </p>
          </div>

          {user ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <p>লগইন ইউজার: <strong>{user.fullName}</strong> ({user.email})</p>
                <p className="text-emerald-700 font-bold">রোল: Student (সাধারণ শিক্ষার্থী)</p>
              </div>

              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3.5 rounded-xl shadow transition"
              >
                <GraduationCap className="w-4 h-4" />
                <span>আমার ক্লাসরুমে যান</span>
              </Link>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition"
            >
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
              </svg>
              <span>Admin Google Account দিয়ে লগইন</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Statistics
  const pendingEnrollments = enrollments.filter((e) => e.admissionStatus === 'pending');
  const approvedEnrollments = enrollments.filter((e) => e.admissionStatus === 'approved');
  const pendingPayments = monthlyPayments.filter((p) => p.status === 'pending');
  const approvedPayments = monthlyPayments.filter((p) => p.status === 'approved');
  const totalRevenue = approvedEnrollments.length * 1000 + approvedPayments.length * 500;

  const navItems: { id: AdminTab; label: string; icon: any; count?: number; badgeColor?: string }[] = [
    { id: 'courses', label: 'কোর্স ও সিলেবাস সিএমএস', icon: BookOpen },
    { id: 'enrollments', label: 'ভর্তির আবেদন অনুমোদন', icon: Users, count: pendingEnrollments.length, badgeColor: 'bg-amber-500 text-white' },
    { id: 'payments', label: 'মাসিক ৫০০/- ফি যাচাই', icon: CreditCard, count: pendingPayments.length, badgeColor: 'bg-rose-500 text-white' },
    { id: 'leads', label: 'ওরিয়েন্টেশন লিড সিআরএম', icon: MessageSquare, count: leads.length, badgeColor: 'bg-blue-500 text-white' },
    { id: 'media', label: 'ছবি ও মিডিয়া ম্যানেজার', icon: ImageIcon },
    { id: 'settings', label: 'সাইট কনটেন্ট ও নম্বর', icon: Settings },
    { id: 'analytics', label: 'ইনসাইটস ও রেভিনিউ', icon: BarChart3 },
  ];

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-bangla flex flex-col">
      
      {/* Top Mobile Bar */}
      <div className="lg:hidden bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between sticky top-20 z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-bold text-sm text-emerald-400">অ্যাডমিন ড্যাশবোর্ড</span>
        </div>
        <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full">
          Super Admin
        </span>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto">
        
        {/* ===================== LEFT SIDEBAR ===================== */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-72 bg-slate-950 border-r border-slate-800 flex flex-col justify-between p-4 transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-6">
            
            {/* Admin Header */}
            <div className="p-4 bg-gradient-to-r from-emerald-950/80 to-slate-900 rounded-2xl border border-emerald-500/20 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-black">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-sm text-white truncate">
                    BD Homeo Admin
                  </h3>
                  <p className="text-[11px] text-emerald-400/80 font-mono truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Overview Badges */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800/80">
                <p className="text-[10px] text-slate-400 font-bold uppercase">মোট শিক্ষার্থী</p>
                <p className="text-base font-black text-emerald-400 font-english mt-0.5">
                  {approvedEnrollments.length} জন
                </p>
              </div>
              <div className="p-2.5 bg-slate-900/90 rounded-xl border border-slate-800/80">
                <p className="text-[10px] text-slate-400 font-bold uppercase">পেন্ডিং আবেদন</p>
                <p className="text-base font-black text-amber-400 font-english mt-0.5">
                  {pendingEnrollments.length + pendingPayments.length} টি
                </p>
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
                      w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-bold text-xs transition group text-left
                      ${isActive 
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 font-extrabold' 
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
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

          {/* Sidebar Bottom Actions */}
          <div className="space-y-2 pt-4 border-t border-slate-800/80">
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 rounded-xl text-xs font-bold border border-emerald-500/20 transition"
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>শিক্ষার্থী ক্লাসরুম ভিউ</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={signOut}
              className="w-full flex items-center gap-2 px-3.5 py-2.5 text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs font-bold transition"
            >
              <LogOut className="w-4 h-4" />
              <span>লগআউট করুন</span>
            </button>
          </div>

        </aside>

        {/* ===================== RIGHT CONTENT AREA ===================== */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-900 overflow-y-auto">
          
          {/* Top Breadcrumb & Quick Actions Bar */}
          <div className="bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-800 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>বিডি হোমিও অ্যাডমিন</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-emerald-400 font-bold">
                  {navItems.find((n) => n.id === activeTab)?.label}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                {activeTab === 'courses' && 'কোর্স কারিকুলাম ও ভিডিও লেকচার সিএমএস'}
                {activeTab === 'enrollments' && 'নতুন শিক্ষার্থী ভর্তি আবেদন ও ট্রানজেকশন'}
                {activeTab === 'payments' && 'মাসিক ৫০০/- টাকা ফি ট্রানজেকশন ভেরিফিকেশন'}
                {activeTab === 'leads' && 'ফ্রি ওরিয়েন্টেশন ক্লাস লিড ও হোয়াটসঅ্যাপ সিআরএম'}
                {activeTab === 'media' && 'ওয়েবসাইটের ছবি ও ওয়ার্কশপ গ্যালারি ম্যানেজার'}
                {activeTab === 'settings' && 'সাইটের নোটিশ, পেমেন্ট নম্বর ও কনটেন্ট কন্ট্রোল'}
                {activeTab === 'analytics' && 'অ্যাকাডেমিক ও ফাইন্যান্সিয়াল অ্যানালিটিক্স'}
              </h1>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={settings.googleMeetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
              >
                <Video className="w-4 h-4" />
                <span>লাইভ গুগল মিট ক্লাসরুম</span>
              </a>
            </div>
          </div>

          {/* Dynamic Content Switching */}
          <div className="space-y-6">
            
            {activeTab === 'courses' && <CourseManager />}
            {activeTab === 'enrollments' && <EnrollmentApprovals />}
            {activeTab === 'payments' && <MonthlyFeeApprovals />}
            {activeTab === 'leads' && <LeadManager />}
            {activeTab === 'media' && <MediaManager />}
            {activeTab === 'settings' && <SiteSettingsForm />}
            
            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 font-bold uppercase">মোট কোর্স তালিকা</span>
                    <p className="text-3xl font-black text-white font-english">{courses.length}</p>
                    <p className="text-xs text-emerald-400 font-bold">বেসিক ও এডভান্সড মাস্টার ব্যাচ</p>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 font-bold uppercase">সফল ভর্তি অনুমোদন</span>
                    <p className="text-3xl font-black text-emerald-400 font-english">{approvedEnrollments.length}</p>
                    <p className="text-xs text-slate-400">এক্টিভ শিক্ষার্থী সংখ্যা</p>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 font-bold uppercase">পরিশোধিত মাসিক ফি</span>
                    <p className="text-3xl font-black text-amber-400 font-english">{approvedPayments.length}</p>
                    <p className="text-xs text-slate-400">অনুমোদিত মাসিক ট্রানজেকশন</p>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 font-bold uppercase">ফ্রি ক্লাসের আগ্রহ</span>
                    <p className="text-3xl font-black text-blue-400 font-english">{leads.length}</p>
                    <p className="text-xs text-slate-400">রেজিস্ট্রেশনকৃত সম্ভাব্য লিড</p>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    রেভিনিউ ও পেমেন্ট সামারি
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                      <p className="text-xs text-slate-400">ভর্তি ফি বাবদ মোট আয় (৳১,০০০ x {approvedEnrollments.length})</p>
                      <p className="text-2xl font-black text-emerald-400 font-english mt-1">
                        ৳{(approvedEnrollments.length * 1000).toLocaleString('en-US')}/-
                      </p>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                      <p className="text-xs text-slate-400">মাসিক ফি বাবদ মোট আয় (৳৫০০ x {approvedPayments.length})</p>
                      <p className="text-2xl font-black text-amber-400 font-english mt-1">
                        ৳{(approvedPayments.length * 500).toLocaleString('en-US')}/-
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </main>

      </div>

    </div>
  );
}