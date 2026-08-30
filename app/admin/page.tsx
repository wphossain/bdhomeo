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
  ImageIcon, 
  Sparkles, 
  Lock, 
  GraduationCap, 
  BarChart3, 
  ExternalLink, 
  ChevronRight, 
  LogOut, 
  Video, 
  FileText, 
  Menu, 
  X,
  Home,
  ChevronDown
} from 'lucide-react';

type AdminTab = 'courses' | 'media' | 'settings' | 'enrollments' | 'payments' | 'leads' | 'analytics';

export default function AdminPage() {
  const { user, enrollments, monthlyPayments, leads, courses, settings, demoLogin, signInWithGoogle, signOut } = useApp();
  const [activeTab, setActiveTab] = useState<AdminTab>('courses');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCourseSubmenuOpen, setIsCourseSubmenuOpen] = useState(true);

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
              à¦…à§à¦¯à¦¾à¦¡à¦®à¦¿à¦¨ à¦•à¦¨à§à¦Ÿà§à¦°à§‹à¦² à¦ªà§à¦¯à¦¾à¦¨à§‡à¦²
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              à¦à¦‡ à¦ªà§‹à¦°à§à¦Ÿà¦¾à¦²à¦Ÿà¦¿ à¦¶à§à¦§à§à¦®à¦¾à¦¤à§à¦° à¦¡à¦¾à¦ƒ à¦®à§‹à¦ƒ à¦—à¦¿à§Ÿà¦¾à¦¸ à¦‰à¦¦à§à¦¦à¦¿à¦¨ à¦¸à§à¦¯à¦¾à¦° à¦à¦¬à¦‚ à¦¨à¦¿à¦°à§à¦¦à¦¿à¦·à§à¦Ÿ à¦…à§à¦¯à¦¾à¦¡à¦®à¦¿à¦¨à¦¦à§‡à¦° à¦œà¦¨à§à¦¯ à¦¸à§à¦°à¦•à§à¦·à¦¿à¦¤à¥¤
            </p>
          </div>

          {user ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                <p>à¦²à¦—à¦‡à¦¨ à¦‡à¦‰à¦œà¦¾à¦°: <strong className="text-white">{user.fullName}</strong></p>
                <p className="text-emerald-400 font-bold">à¦°à§‹à¦²: Student (à¦¸à¦¾à¦§à¦¾à¦°à¦£ à¦¶à¦¿à¦•à§à¦·à¦¾à¦°à§à¦¥à§€)</p>
              </div>

              <Link
                href="/dashboard"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl shadow transition"
              >
                <GraduationCap className="w-4 h-4" />
                <span>à¦†à¦®à¦¾à¦° à¦•à§à¦²à¦¾à¦¸à¦°à§à¦®à§‡ à¦¯à¦¾à¦¨</span>
              </Link>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition"
            >
              <span>Admin Google Account à¦¦à¦¿à§Ÿà§‡ à¦¸à¦¾à¦‡à¦¨-à¦‡à¦¨</span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-emerald-400 font-bold flex items-center justify-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>à¦®à§‚à¦² à¦¹à§‹à¦®à¦ªà§‡à¦œà§‡ à¦«à¦¿à¦°à§‡ à¦¯à¦¾à¦¨</span>
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

  const navItems: { id: AdminTab; label: string; icon: any; count?: number; badgeColor?: string }[] = [
    { id: 'courses', label: 'à¦•à§‹à¦°à§à¦¸ à¦“ à¦¸à¦¿à¦²à§‡à¦¬à¦¾à¦¸ à¦¸à¦¿à¦à¦®à¦à¦¸', icon: BookOpen },
    { id: 'enrollments', label: 'à¦­à¦°à§à¦¤à¦¿à¦° à¦†à¦¬à§‡à¦¦à¦¨ à¦…à¦¨à§à¦®à§‹à¦¦à¦¨', icon: Users, count: pendingEnrollments.length, badgeColor: 'bg-amber-500 text-white' },
    { id: 'payments', label: 'à¦®à¦¾à¦¸à¦¿à¦• à§«à§¦à§¦/- à¦«à¦¿ à¦¯à¦¾à¦šà¦¾à¦‡', icon: CreditCard, count: pendingPayments.length, badgeColor: 'bg-rose-500 text-white' },
    { id: 'leads', label: 'à¦“à¦°à¦¿à§Ÿà§‡à¦¨à§à¦Ÿà§‡à¦¶à¦¨ à¦²à¦¿à¦¡ à¦¸à¦¿à¦†à¦°à¦à¦®', icon: MessageSquare, count: leads.length, badgeColor: 'bg-blue-500 text-white' },
    { id: 'media', label: 'à¦›à¦¬à¦¿ à¦“ à¦®à¦¿à¦¡à¦¿à§Ÿà¦¾ à¦®à§à¦¯à¦¾à¦¨à§‡à¦œà¦¾à¦°', icon: ImageIcon },
    { id: 'settings', label: 'à¦¸à¦¾à¦‡à¦Ÿ à¦•à¦¨à¦Ÿà§‡à¦¨à§à¦Ÿ à¦“ à¦¨à¦®à§à¦¬à¦°', icon: Settings },
    { id: 'analytics', label: 'à¦‡à¦¨à¦¸à¦¾à¦‡à¦Ÿà¦¸ à¦“ à¦°à§‡à¦­à¦¿à¦¨à¦¿à¦‰', icon: BarChart3 },
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
                à¦¬à¦¿à¦¡à¦¿ à¦¹à§‹à¦®à¦¿à¦“ à¦…à§à¦¯à¦¾à¦¡à¦®à¦¿à¦¨
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mt-0.5">
                Full CMS Control Hub
              </span>
            </div>
          </Link>
        </div>

        {/* Right Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">à¦®à§‚à¦² à¦“à§Ÿà§‡à¦¬à¦¸à¦¾à¦‡à¦Ÿ</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-500/30 transition"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">à¦¶à¦¿à¦•à§à¦·à¦¾à¦°à§à¦¥à§€ à¦•à§à¦²à¦¾à¦¸à¦°à§à¦®</span>
          </Link>

          <button
            onClick={signOut}
            className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
            title="à¦²à¦—à¦†à¦‰à¦Ÿ"
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
                à¦®à§à¦¯à¦¾à¦¨à§‡à¦œà¦®à§‡à¦¨à§à¦Ÿ à¦®à§‡à¦¨à§
              </p>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <div key={item.id} className="space-y-1">
                    <button
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

                    {/* Submenu for Course CMS */}
                    {item.id === 'courses' && (
                      <div className="pl-6 space-y-1 pt-0.5">
                        {courses.map((course) => (
                          <button
                            key={course.id}
                            onClick={() => {
                              setActiveTab('courses');
                              setIsSidebarOpen(false);
                            }}
                            className="w-full text-left px-3 py-1.5 text-[11px] text-slate-400 hover:text-emerald-300 hover:bg-slate-800/60 rounded-lg truncate transition flex items-center gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span className="truncate">{course.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

          </div>

          {/* Sidebar Footer */}
          <div className="pt-3 border-t border-slate-800">
            <a
              href={settings.googleMeetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
            >
              <Video className="w-4 h-4" />
              <span>à¦²à¦¾à¦‡à¦­ à¦—à§à¦—à¦² à¦®à¦¿à¦Ÿ à¦•à§à¦²à¦¾à¦¸à¦°à§à¦®</span>
            </a>
          </div>

        </aside>

        {/* ===================== RIGHT WORKSPACE ===================== */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-950 overflow-y-auto">
          {activeTab === 'courses' && <CourseManager />}
          {activeTab === 'enrollments' && <EnrollmentApprovals />}
          {activeTab === 'payments' && <MonthlyFeeApprovals />}
          {activeTab === 'leads' && <LeadManager />}
          {activeTab === 'media' && <MediaManager />}
          {activeTab === 'settings' && <SiteSettingsForm />}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">à¦®à§‹à¦Ÿ à¦•à§‹à¦°à§à¦¸</span>
                  <p className="text-3xl font-black text-white font-english">{courses.length}</p>
                  <p className="text-xs text-emerald-400 font-bold">à¦¬à§‡à¦¸à¦¿à¦• à¦“ à¦à¦¡à¦­à¦¾à¦¨à§à¦¸à¦¡ à¦®à¦¾à¦¸à§à¦Ÿà¦¾à¦° à¦¬à§à¦¯à¦¾à¦š</p>
                </div>

                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">à¦¸à¦«à¦² à¦­à¦°à§à¦¤à¦¿ à¦…à¦¨à§à¦®à§‹à¦¦à¦¨</span>
                  <p className="text-3xl font-black text-emerald-400 font-english">{approvedEnrollments.length}</p>
                  <p className="text-xs text-slate-400">à¦à¦•à§à¦Ÿà¦¿à¦­ à¦¶à¦¿à¦•à§à¦·à¦¾à¦°à§à¦¥à§€ à¦¸à¦‚à¦–à§à¦¯à¦¾</p>
                </div>

                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">à¦ªà¦°à¦¿à¦¶à§‹à¦§à¦¿à¦¤ à¦®à¦¾à¦¸à¦¿à¦• à¦«à¦¿</span>
                  <p className="text-3xl font-black text-amber-400 font-english">{approvedPayments.length}</p>
                  <p className="text-xs text-slate-400">à¦…à¦¨à§à¦®à§‹à¦¦à¦¿à¦¤ à¦®à¦¾à¦¸à¦¿à¦• à¦Ÿà§à¦°à¦¾à¦¨à¦œà§‡à¦•à¦¶à¦¨</p>
                </div>

                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-bold uppercase">à¦«à§à¦°à¦¿ à¦•à§à¦²à¦¾à¦¸à§‡à¦° à¦²à¦¿à¦¡</span>
                  <p className="text-3xl font-black text-blue-400 font-english">{leads.length}</p>
                  <p className="text-xs text-slate-400">à¦°à§‡à¦œà¦¿à¦¸à§à¦Ÿà§à¦°à§‡à¦¶à¦¨à¦•à§ƒà¦¤ à¦†à¦—à§à¦°à¦¹à§€ à¦¸à¦‚à¦–à§à¦¯à¦¾</p>
                </div>
              </div>

              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  à¦°à§‡à¦­à¦¿à¦¨à¦¿à¦‰ à¦“ à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦¸à¦¾à¦®à¦¾à¦°à¦¿
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <p className="text-xs text-slate-400">à¦­à¦°à§à¦¤à¦¿ à¦«à¦¿ à¦¬à¦¾à¦¬à¦¦ à¦®à§‹à¦Ÿ à¦†à§Ÿ (à§³à§§,à§¦à§¦à§¦ x {approvedEnrollments.length})</p>
                    <p className="text-2xl font-black text-emerald-400 font-english mt-1">
                      à§³{(approvedEnrollments.length * 1000).toLocaleString('en-US')}/-
                    </p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <p className="text-xs text-slate-400">à¦®à¦¾à¦¸à¦¿à¦• à¦«à¦¿ à¦¬à¦¾à¦¬à¦¦ à¦®à§‹à¦Ÿ à¦†à§Ÿ (à§³à§«à§¦à§¦ x {approvedPayments.length})</p>
                    <p className="text-2xl font-black text-amber-400 font-english mt-1">
                      à§³{(approvedPayments.length * 500).toLocaleString('en-US')}/-
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}