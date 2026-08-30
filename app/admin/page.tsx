'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { CourseManager } from '@/components/admin/CourseManager';
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
  Globe,
  Layers,
  Sparkles
} from 'lucide-react';

export default function AdminPage() {
  const { user, enrollments, monthlyPayments, leads, demoLogin, signInWithGoogle } = useApp();
  const [activeTab, setActiveTab] = useState<'courses' | 'settings' | 'enrollments' | 'payments' | 'leads'>('courses');

  // Check if Admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50 font-bangla">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border-2 border-emerald-500/40 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              অ্যাডমিন কন্ট্রোল প্যানেল
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              এই ড্যাশবোর্ডটি শুধুমাত্র ডাঃ মোঃ গিয়াস উদ্দিন স্যার এবং সাইট অ্যাডমিনদের জন্য সুরক্ষিত।
            </p>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
            </svg>
            <span>Admin Google Account দিয়ে সাইন-ইন</span>
          </button>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] text-slate-400 mb-2">বা দ্রুত অ্যাডমিন ভিউ টেস্ট করুন:</p>
            <button
              onClick={() => demoLogin('admin')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-lg transition"
            >
              Demo Admin হিসেবে লগইন করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Count stats
  const pendingEnrollmentsCount = enrollments.filter((e) => e.admissionStatus === 'pending').length;
  const pendingPaymentsCount = monthlyPayments.filter((p) => p.status === 'pending').length;
  const approvedEnrollmentsCount = enrollments.filter((e) => e.admissionStatus === 'approved').length;

  return (
    <div className="bg-slate-100 min-h-screen font-bangla pb-20">
      
      {/* Admin Top Header */}
      <div className="bg-emerald-950 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-emerald-900 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-800 rounded-2xl border border-emerald-700 shadow-inner">
              <ShieldCheck className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight">
                  অ্যাডমিন কন্ট্রোল সেন্টার (Full CMS)
                </h1>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-emerald-300">
                স্বাগতম, {user.fullName} • বিডি হোমিও প্রশিক্ষণ কেন্দ্র
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="bg-emerald-800/80 hover:bg-emerald-800 text-xs font-bold px-4 py-2 rounded-xl transition border border-emerald-700"
            >
              শিক্ষার্থী ক্লাসরুম ভিউ
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>পেন্ডিং ভর্তি আবেদন</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 font-english">
              {pendingEnrollmentsCount}
            </p>
            <span className="text-[11px] text-amber-600 font-medium">যাচাইয়ের অপেক্ষায়</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>পেন্ডিং মাসিক ফি</span>
              <CreditCard className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 font-english">
              {pendingPaymentsCount}
            </p>
            <span className="text-[11px] text-rose-600 font-medium">ফি পরিশোধ রিকোয়েস্ট</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>অনুমোদিত শিক্ষার্থী</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-emerald-900 font-english">
              {approvedEnrollmentsCount}
            </p>
            <span className="text-[11px] text-emerald-600 font-medium">এক্টিভ ক্লাসরুম এক্সেস</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
              <span>ওরিয়েন্টেশন লিড</span>
              <MessageSquare className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-black text-slate-900 font-english">
              {leads.length}
            </p>
            <span className="text-[11px] text-blue-600 font-medium">ফ্রি ক্লাসে আগ্রহী</span>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
          
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'courses'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>কোর্স ও ভিডিও লেকচার সিএমএস</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'settings'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>সাইট কনটেন্ট, নম্বর ও লিংকস</span>
          </button>

          <button
            onClick={() => setActiveTab('enrollments')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'enrollments'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>ভর্তির আবেদন ({pendingEnrollmentsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'payments'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>মাসিক ৫০০/- ফি ({pendingPaymentsCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition ${
              activeTab === 'leads'
                ? 'bg-emerald-800 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>ওরিয়েন্টেশন লিড ({leads.length})</span>
          </button>

        </div>

        {/* Tab Content */}
        {activeTab === 'courses' && <CourseManager />}
        {activeTab === 'settings' && <SiteSettingsForm />}
        {activeTab === 'enrollments' && <EnrollmentApprovals />}
        {activeTab === 'payments' && <MonthlyFeeApprovals />}
        {activeTab === 'leads' && <LeadManager />}

      </div>

    </div>
  );
}