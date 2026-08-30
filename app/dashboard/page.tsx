'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { Lesson } from '@/lib/types';
import { MonthlyFeeStatus } from '@/components/lms/MonthlyFeeStatus';
import { GoogleMeetLauncher } from '@/components/lms/GoogleMeetLauncher';
import { MorningSupportBox } from '@/components/lms/MorningSupportBox';
import { PDFList } from '@/components/lms/PDFList';
import { 
  GraduationCap, 
  Video, 
  BookOpen, 
  CreditCard, 
  Award, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  MessageCircle, 
  ChevronRight, 
  PlayCircle,
  FileText,
  Lock,
  Menu, 
  X,
  CheckCircle,
  Home,
  LogOut,
  ShieldCheck
} from 'lucide-react';

type StudentTab = 'classroom' | 'lectures' | 'notes' | 'monthly-fee' | 'certificate' | 'support';

export default function DashboardPage() {
  const { user, courses, enrollments, settings, signInWithGoogle, signOut } = useApp();
  const [activeTab, setActiveTab] = useState<StudentTab>('classroom');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || 'course-basic-foundation');
  
  // Track active playing lesson
  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const allLessons = currentCourse?.curriculum.flatMap((c) => c.lessons) || [];
  const [activeLesson, setActiveLesson] = useState<Lesson>(allLessons[0] || {
    id: 'l1',
    title: '১.১ Organic Organon Basics (ফ্রি ওরিয়েন্টেশন ক্লাস)',
    durationMin: 45,
    isFreePreview: true,
    youtubeVideoId: 'M7lc1UVf-VE',
  });

  // Track completed lessons in state
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['l1']);

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  // Check enrollment for selected course
  const enrollment = enrollments.find(
    (e) => e.studentId === user?.id && e.courseId === currentCourse?.id
  );
  const isApprovedStudent = enrollment?.admissionStatus === 'approved';
  const isPendingStudent = enrollment?.admissionStatus === 'pending';

  // Calculate course completion progress
  const progressPercent = allLessons.length > 0 
    ? Math.round((completedLessonIds.length / allLessons.length) * 100)
    : 0;

  // Not logged in screen
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 font-bangla">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <GraduationCap className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full">
              Student LMS Portal
            </span>
            <h2 className="text-2xl font-black text-white mt-3">
              শিক্ষার্থী ক্লাসরুম ড্যাশবোর্ড
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              আপনার কোর্সের লাইভ ক্লাস, রেকর্ডেড ভিডিও লাইব্রেরি এবং PDF লেকচার শিট পেতে গুগল দিয়ে সাইন-ইন করুন।
            </p>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
            </svg>
            <span>Google অ্যাকাউন্ট দিয়ে প্রবেশ করুন</span>
          </button>

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

  const studentNavItems: { id: StudentTab; label: string; icon: any; badge?: string }[] = [
    { id: 'classroom', label: 'লাইভ ক্লাসরুম ও শিডিউল', icon: Video, badge: 'Live' },
    { id: 'lectures', label: 'ভিডিও লেকচার ও সিলেবাস', icon: PlayCircle },
    { id: 'notes', label: 'লেকচার শিট ও PDF নোটস', icon: FileText },
    { id: 'monthly-fee', label: 'মাসিক ফি (৳৫০০/-) ও স্ট্যাটাস', icon: CreditCard },
    { id: 'certificate', label: 'PTF সার্টিফিকেট ট্র্যাকিং', icon: Award },
    { id: 'support', label: 'হেল্পলাইন ও সাপোর্ট', icon: MessageCircle },
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-bangla flex flex-col">
      
      {/* Top Student SaaS App Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black shadow-md">
              <GraduationCap className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="font-black text-sm text-white tracking-tight leading-none block">
                বিডি হোমিও ক্লাসরুম
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mt-0.5">
                Interactive Student LMS
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
            <span className="hidden sm:inline">মূল ওয়েবসাইট</span>
          </Link>

          {user.role === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-amber-400/30 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">অ্যাডমিন প্যানেল</span>
            </Link>
          )}

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
        
        {/* ===================== LEFT LMS SIDEBAR ===================== */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-80 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-5">
            
            {/* Student Profile Card */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center overflow-hidden">
                  {user.avatarUrl ? (
                    <Image src={user.avatarUrl} alt={user.fullName} fill className="object-cover" />
                  ) : (
                    <span className="text-base">{user.fullName.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-sm text-white truncate">
                    {user.fullName}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">অ্যাকাডেমিক স্ট্যাটাস:</span>
                {isApprovedStudent ? (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> নিয়মিত শিক্ষার্থী
                  </span>
                ) : isPendingStudent ? (
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> ভর্তি যাচাইধীন
                  </span>
                ) : (
                  <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ফ্রি মেম্বার
                  </span>
                )}
              </div>
            </div>

            {/* Course Selector Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                আমার কোর্স সিলেক্ট করুন
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full bg-slate-950 text-emerald-300 border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs font-bold focus:ring-2 focus:ring-emerald-500 cursor-pointer"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Progress Card */}
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">কোর্স অগ্রগতি</span>
                <span className="text-emerald-400 font-english">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 text-right">
                {completedLessonIds.length} / {allLessons.length} ক্লাস সম্পন্ন
              </p>
            </div>

            {/* Student LMS Navigation */}
            <nav className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 px-3 pb-1">
                ক্লাসরুম মেনু
              </p>
              {studentNavItems.map((item) => {
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
                        ? 'bg-emerald-600 text-white shadow-lg font-extrabold' 
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isActive ? 'bg-white text-emerald-950' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

          </div>

          {/* Sidebar Footer Support */}
          <div className="pt-3 border-t border-slate-800">
            <a
              href={`https://wa.me/880${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-xl text-xs font-bold border border-[#25D366]/30 transition"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপ সাপোর্ট</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </aside>

        {/* ===================== RIGHT LMS WORKSPACE ===================== */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-950 overflow-y-auto space-y-6">
          
          {/* Top Breadcrumb & Live Class Shortcut */}
          <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>বিডি হোমিও ক্লাসরুম</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-emerald-400 font-bold">{currentCourse?.title}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                {activeTab === 'classroom' && 'লাইভ গুগল মিট ক্লাস ও ক্লাসরুম শিডিউল'}
                {activeTab === 'lectures' && 'ফুল HD ভিডিও লেকচার লাইব্রেরি'}
                {activeTab === 'notes' && 'অধ্যায়ভিত্তিক PDF লেকচার শিট ও স্টাডি মেটেরিয়াল'}
                {activeTab === 'monthly-fee' && 'মাসিক ফি (৳৫০০/-) পেমেন্ট ও TrxID সাবমিশন'}
                {activeTab === 'certificate' && 'PTF প্রফেশনাল সার্টিফিকেট ও কুরিয়ার ট্র্যাকিং'}
                {activeTab === 'support' && 'একাডেমিক হেল্পলাইন ও সরাসরি সাপোর্ট'}
              </h1>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={settings.googleMeetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-lg transition"
              >
                <Video className="w-4 h-4 animate-pulse" />
                <span>আজকের লাইভ ক্লাসে জয়েন করুন</span>
              </a>
            </div>
          </div>

          {/* Admission Verification Alert for Unenrolled Students */}
          {!isApprovedStudent && (
            <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400 shrink-0">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-amber-300">
                    {isPendingStudent ? 'আপনার ভর্তি আবেদন যাচাই চলছে' : 'এই কোর্সে আপনি এখনো ভর্তি হননি'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {isPendingStudent
                      ? 'অ্যাডমিন আপনার বিকাশ মার্চেন্ট ট্রানজেকশন যাচাই করার সাথে সাথেই প্রিমিয়াম ক্লাস ও PDF আনলক হয়ে যাবে।'
                      : 'সকল প্রিমিয়াম লাইভ ক্লাস, আনলিস্টেড রেকর্ডেড ক্লাস এবং PTF সার্টিফিকেট আনলক করতে এককালীন ভর্তি ফি পরিশোধ করুন।'}
                  </p>
                </div>
              </div>

              {!isPendingStudent && (
                <Link
                  href={`/courses/${currentCourse?.slug || 'basic-homeopathy-foundation'}`}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl shadow-lg transition text-center shrink-0"
                >
                  কোর্সে ভর্তি হন (৳১,০০০/-)
                </Link>
              )}
            </div>
          )}

          {/* 1. Live Classroom Tab */}
          {activeTab === 'classroom' && (
            <div className="space-y-6">
              <GoogleMeetLauncher />
              <MorningSupportBox />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-400" />
                    সাপ্তাহিক লাইভ ক্লাস রুটিন
                  </h3>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="font-bold">ক্লাসের সময়:</span>
                      <span className="text-emerald-400 font-bold">{settings.classTime}</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="font-bold">ক্লাস প্ল্যাটফর্ম:</span>
                      <span className="text-slate-300 font-bold">Google Meet (HD Live)</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                      <span className="font-bold">সাপ্তাহিক শিডিউল:</span>
                      <span className="text-slate-300 font-bold">{currentCourse?.liveSchedule}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    সার্টিফিকেশন গাইডলাইন
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    ৬ মাসের কোর্স সমাপনী পরীক্ষার পর প্যারামেডিকেল টেকনোলজি ফাউন্ডেশন (PTF) অনুমোদিত অফিসিয়াল সার্টিফিকেট আপনার ঠিকানায় কুরিয়ারযোগে হোম ডেলিভারি করা হবে।
                  </p>
                  <button
                    onClick={() => setActiveTab('certificate')}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>সার্টিফিকেট ট্র্যাকার দেখুন</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. Lectures Tab */}
          {activeTab === 'lectures' && (
            <div className="space-y-6">
              
              {/* Cinema Player Section */}
              <div className="bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded">
                      বর্তমানে প্রদর্শিত ক্লাস
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-white mt-1">
                      {activeLesson.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleLessonComplete(activeLesson.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition ${
                        completedLessonIds.includes(activeLesson.id)
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{completedLessonIds.includes(activeLesson.id) ? 'ক্লাস সম্পন্ন হয়েছে' : 'Mark as Completed'}</span>
                    </button>
                  </div>
                </div>

                {/* Video Frame */}
                {activeLesson.isFreePreview || isApprovedStudent ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeLesson.youtubeVideoId}?rel=0&modestbranding=1&autoplay=0`}
                      title={activeLesson.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4 border border-slate-800">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <Lock className="w-7 h-7" />
                    </div>
                    <div className="max-w-md space-y-1">
                      <h3 className="text-base font-bold text-white">এই ক্লাসটি প্রিমিয়াম শিক্ষার্থীদের জন্য সংরক্ষিত</h3>
                      <p className="text-xs text-slate-400">
                        সম্পূর্ণ কারিকুলাম ও ভিডিও লেকচার দেখতে এককালীন ভর্তি ফি পরিশোধ করুন।
                      </p>
                    </div>
                    <Link
                      href={`/courses/${currentCourse?.slug || 'basic-homeopathy-foundation'}`}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition"
                    >
                      ভর্তি সম্পন্ন করুন (৳১,০০০/-)
                    </Link>
                  </div>
                )}
              </div>

              {/* Curriculum Chapters Accordion */}
              <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-6">
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-400" />
                  সম্পূর্ণ কোর্স কারিকুলাম ও লেকচার প্লেলিস্ট ({currentCourse?.title})
                </h3>

                <div className="space-y-4">
                  {currentCourse?.curriculum.map((chapter) => (
                    <div key={chapter.id} className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-emerald-400 uppercase">অধ্যায় {chapter.chapterNo}</span>
                          <h4 className="text-sm font-bold text-white mt-0.5">{chapter.title}</h4>
                        </div>
                        <span className="text-xs text-slate-500">{chapter.lessons.length} টি ক্লাস</span>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        {chapter.lessons.map((lesson) => {
                          const isPlaying = activeLesson.id === lesson.id;
                          const isDone = completedLessonIds.includes(lesson.id);
                          const isLocked = !lesson.isFreePreview && !isApprovedStudent;

                          return (
                            <div
                              key={lesson.id}
                              onClick={() => !isLocked && setActiveLesson(lesson)}
                              className={`
                                flex items-center justify-between p-3 rounded-xl text-xs transition cursor-pointer
                                ${isPlaying 
                                  ? 'bg-emerald-950/80 border border-emerald-500/50 text-white font-bold' 
                                  : isLocked
                                    ? 'bg-slate-900/40 text-slate-500 cursor-not-allowed border border-transparent'
                                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800/60'
                                }
                              `}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : isLocked ? (
                                  <Lock className="w-4 h-4 text-slate-600 shrink-0" />
                                ) : (
                                  <PlayCircle className={`w-4 h-4 shrink-0 ${isPlaying ? 'text-emerald-400' : 'text-slate-400'}`} />
                                )}
                                <span className="truncate">{lesson.title}</span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {lesson.isFreePreview && (
                                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                                    Free
                                  </span>
                                )}
                                <span className="text-[11px] text-slate-500 font-english">{lesson.durationMin} min</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 3. Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <PDFList />
            </div>
          )}

          {/* 4. Monthly Fee Tab */}
          {activeTab === 'monthly-fee' && (
            <div className="space-y-6">
              <MonthlyFeeStatus courseId={selectedCourseId} />
            </div>
          )}

          {/* 5. PTF Certificate Tab */}
          {activeTab === 'certificate' && (
            <div className="space-y-6">
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl">
                    <Award className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">
                      প্যারামেডিকেল টেকনোলজি ফাউন্ডেশন (PTF) সার্টিফিকেট
                    </h3>
                    <p className="text-xs text-slate-400">
                      গভর্নমেন্ট রেজিস্টার্ড প্রফেশনাল হোমিওপ্যাথিক প্র্যাকটিশনার সার্টিফিকেট
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-xs text-slate-400 font-bold">কোর্স মেয়াদ</span>
                    <p className="text-lg font-black text-white">৬ মাস পূর্ণাঙ্গ</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-xs text-slate-400 font-bold">সার্টিফিকেট স্ট্যাটাস</span>
                    <p className="text-lg font-black text-amber-400">কোর্স চলমান</p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <span className="text-xs text-slate-400 font-bold">ডেলিভারি মাধ্যম</span>
                    <p className="text-lg font-black text-emerald-400">সুন্দরবন কুরিয়ার সার্ভিস</p>
                  </div>
                </div>

                <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed">
                  💡 <strong>সার্টিফিকেট প্রাপ্তির নিয়ম:</strong> কোর্স সমাপ্তির পর আপনার সম্পূর্ণ নাম ও কুরিয়ার ডেলিভারি ঠিকানা অ্যাডমিনকে কনফার্ম করলে মূল হার্ডকপি সার্টিফিকেট কুরিয়ারে পাঠিয়ে দেওয়া হবে।
                </div>
              </div>
            </div>
          )}

          {/* 6. Support Tab */}
          {activeTab === 'support' && (
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
                একাডেমিক হেল্পলাইন ও স্যারের সাপোর্ট
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-bold">সরাসরি ফোন হেল্পলাইন</span>
                  <p className="text-xl font-black text-white font-mono">{settings.helplineNumber}</p>
                  <a
                    href={`tel:${settings.helplineNumber.replace(/[^0-9]/g, '')}`}
                    className="inline-block text-xs font-bold text-emerald-400 hover:underline pt-1"
                  >
                    সরাসরি কল করুন →
                  </a>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400 font-bold">অফিসিয়াল হোয়াটসঅ্যাপ সাপোর্ট</span>
                  <p className="text-xl font-black text-[#25D366] font-mono">{settings.whatsappNumber}</p>
                  <a
                    href={`https://wa.me/880${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs font-bold text-[#25D366] hover:underline pt-1"
                  >
                    হোয়াটসঅ্যাপে মেসেজ পাঠান →
                  </a>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
