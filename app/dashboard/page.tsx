'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { Course, Lesson } from '@/lib/types';
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
  LogOut, 
  ShieldCheck, 
  Download, 
  Printer, 
  MapPin, 
  Send, 
  Sparkles,
  ArrowLeft,
  FileDown,
  Play,
  Share2,
  Truck,
  Phone,
  Home,
  Menu,
  X
} from 'lucide-react';

type StudentTab = 'classroom' | 'lectures' | 'notes' | 'monthly-fee' | 'id-card' | 'certificate' | 'support';

export default function DashboardPage() {
  const { user, courses, enrollments, monthlyPayments, settings, submitCertificateRequest, certificateRequests, signInWithGoogle, signOut, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<StudentTab>('classroom');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0]?.id || 'course-basic-foundation');

  // CINEMA PLAYER / VIDEO LEARNING MODE
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);
  
  const currentCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const allLessons = currentCourse?.curriculum.flatMap((c) => c.lessons) || [];
  
  const [activeLesson, setActiveLesson] = useState<Lesson>(
    allLessons[0] || {
      id: 'l1',
      title: '১.১ পরিচিতি ও অর্গাননের মূল দর্শন (ফ্রি ওরিয়েন্টেশন ক্লাস)',
      durationMin: 45,
      isFreePreview: true,
      youtubeVideoId: 'M7lc1UVf-VE',
      pdfNotesTitle: 'Organon_Chapter_1_Handout.pdf',
      pdfNotesUrl: 'https://drive.google.com/file/d/sample-organon-1/view',
      notesContent: 'এই ক্লাসে অর্গানন অব মেডিসিনের ১ম থেকে ৮ম এফোরিজমের মূল তাৎপর্য ও ক্লিনিক্যাল প্রয়োগ বিস্তারিত ব্যাখ্যা করা হয়েছে।',
    }
  );

  // Lesson Completion Tracking
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useEffect(() => {
    if (user?.id && currentCourse?.id) {
      try {
        const saved = localStorage.getItem(`bdhomeo_progress_${user.id}_${currentCourse.id}`);
        if (saved) {
          setCompletedLessonIds(JSON.parse(saved));
        } else {
          setCompletedLessonIds(['l1']);
        }
      } catch (err) {
        setCompletedLessonIds(['l1']);
      }
    }
  }, [user?.id, currentCourse?.id]);

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      const next = prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId];
      if (user?.id && currentCourse?.id) {
        try {
          localStorage.setItem(`bdhomeo_progress_${user.id}_${currentCourse.id}`, JSON.stringify(next));
        } catch (err) {}
      }
      return next;
    });
  };

  // PTF Certificate Courier State
  const existingCertReq = certificateRequests.find(
    (r) => r.studentId === user?.id || (user?.email && r.studentEmail?.toLowerCase() === user.email.toLowerCase())
  );
  const [courierName, setCourierName] = useState(user?.fullName || '');
  const [courierPhone, setCourierPhone] = useState(user?.phone || '');
  const [courierAddress, setCourierAddress] = useState('');
  const [isCourierSubmitting, setIsCourierSubmitting] = useState(false);

  const handleCourierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courierPhone || !courierAddress) {
      showToast('মোবাইল নম্বর ও সম্পূর্ণ সুন্দরবন কুরিয়ার শাখা ঠিকানা প্রদান করুন', 'error');
      return;
    }

    setIsCourierSubmitting(true);
    const success = await submitCertificateRequest({
      phone: courierPhone,
      courierAddress: courierAddress,
      courseId: currentCourse?.id || 'course-basic-foundation',
      courseTitle: currentCourse?.title || 'বেসিক হোমিওপ্যাথি ফাউন্ডেশন কোর্স',
    });

    setIsCourierSubmitting(false);
    if (success) {
      showToast('সার্টিফিকেট কুরিয়ার ডেলিভারি রিকোয়েস্ট সফলভাবে জমা হয়েছে!', 'success');
    }
  };

  const progressPercent = Math.round((completedLessonIds.length / (allLessons.length || 1)) * 100);

  // Sign In Screen if logged out
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 font-bangla bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white">
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

  // =========================================================================
  // FULL-SCREEN SAAS STUDENT DASHBOARD LAYOUT
  // =========================================================================
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-bangla">
      
      {/* Top Full-Width Header Bar */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-md">
        
        {/* Left Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-black text-white">বিডি হোমিও স্টুডেন্ট পোর্টাল</h1>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 font-mono">
                LMS
              </span>
            </div>
            <p className="text-[11px] text-emerald-400 font-mono hidden sm:block">আইডি: BDH-{user.id.substring(0, 6).toUpperCase()}</p>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Course Selector Dropdown */}
          <div className="hidden md:flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 text-[11px]">কোর্স:</span>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="bg-transparent text-emerald-400 font-bold outline-none cursor-pointer"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Live Meet Quick Button */}
          {settings.googleMeetUrl && (
            <a
              href={settings.googleMeetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow transition"
              title="গুগল মিট ক্লাসরুমে প্রবেশ করুন"
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">লাইভ ক্লাস মিট</span>
            </a>
          )}

          {/* Admin Panel Link if Admin */}
          {user.role === 'admin' && (
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition shadow"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">অ্যাডমিন কন্ট্রোল</span>
            </Link>
          )}

          {/* Home Link */}
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-2.5 py-1.5 rounded-xl border border-slate-700 transition"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden md:inline">হোমপেজ</span>
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
            
            {/* Student Profile Card */}
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3 shadow-inner">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-black text-base flex items-center justify-center shadow">
                {user.fullName ? user.fullName.charAt(0) : 'S'}
              </div>
              <div className="truncate">
                <h3 className="text-xs font-bold text-white truncate">{user.fullName || 'শিক্ষার্থী'}</h3>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60 inline-block mt-0.5">
                  ভেরিফায়েড শিক্ষার্থী
                </span>
              </div>
            </div>

            {/* Navigation Menu (7 Distinct Tabs) */}
            <nav className="space-y-1.5">
              
              {/* TAB 1 */}
              <button
                onClick={() => {
                  setActiveTab('classroom');
                  setIsCinemaMode(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'classroom' && !isCinemaMode
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>১. লাইভ ক্লাসরুম ও শিডিউল</span>
              </button>

              {/* TAB 2 */}
              <button
                onClick={() => {
                  setActiveTab('lectures');
                  setIsCinemaMode(true);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'lectures' || isCinemaMode
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>২. ভিডিও লেকচার লাইব্রেরি</span>
              </button>

              {/* TAB 3 */}
              <button
                onClick={() => {
                  setActiveTab('notes');
                  setIsCinemaMode(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'notes' && !isCinemaMode
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>৩. অধ্যায়ভিত্তিক PDF নোটস</span>
              </button>

              {/* TAB 4 */}
              <button
                onClick={() => {
                  setActiveTab('monthly-fee');
                  setIsCinemaMode(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'monthly-fee' && !isCinemaMode
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>৪. মাসিক ফি ও পেমেন্ট</span>
              </button>

              {/* TAB 5 */}
              <button
                onClick={() => {
                  setActiveTab('id-card');
                  setIsCinemaMode(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'id-card' && !isCinemaMode
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>৫. ভার্চুয়াল আইডি কার্ড</span>
              </button>

              {/* TAB 6 */}
              <button
                onClick={() => {
                  setActiveTab('certificate');
                  setIsCinemaMode(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'certificate' && !isCinemaMode
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>৬. PTF সনদ ও কুরিয়ার</span>
              </button>

              {/* TAB 7 */}
              <button
                onClick={() => {
                  setActiveTab('support');
                  setIsCinemaMode(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl font-bold text-xs transition text-left ${
                  activeTab === 'support' && !isCinemaMode
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>৭. একাডেমিক হেল্পলাইন</span>
              </button>

            </nav>

          </div>

          {/* Sidebar Footer Live Meet Button */}
          {settings.googleMeetUrl && (
            <div className="pt-3 border-t border-slate-800">
              <a
                href={settings.googleMeetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs py-2.5 rounded-xl shadow transition"
              >
                <Video className="w-4 h-4" />
                <span>লাইভ গুগল মিট ক্লাসরুম</span>
              </a>
            </div>
          )}

        </aside>

        {/* Right Full-Width Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-950 overflow-y-auto">
          
          {/* ========================================================= */}
          {/* TAB 1: LIVE CLASSROOM & SCHEDULE */}
          {/* ========================================================= */}
          {activeTab === 'classroom' && !isCinemaMode && (
            <div className="space-y-6">
              
              {/* Google Meet Launcher Banner */}
              <GoogleMeetLauncher />

              {/* Morning Case Support Box */}
              <MorningSupportBox />

              {/* Enrolled Course Cards */}
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-white">আমার কোর্স ও ভিডিও ক্লাসরুম</h3>
                    <p className="text-xs text-slate-400">আপনার কোর্স নির্বাচন করে সরাসরি সিনেমা প্লেয়ার ক্লাসরুমে প্রবেশ করুন</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4 hover:border-emerald-500/40 transition shadow-lg"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                        <Image src={course.thumbnailUrl} alt={course.title} fill sizes="400px" className="object-cover" />
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-white">{course.title}</h4>
                        <p className="text-xs text-slate-400">{course.curriculum.flatMap((c) => c.lessons).length}টি ভিডিও লেকচার</p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCourseId(course.id);
                          setIsCinemaMode(true);
                          setActiveTab('lectures');
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl shadow transition flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        <span>ভিডিও ক্লাসরুমে প্রবেশ করুন</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2 / CINEMA PLAYER (STEP 955: LEFT PLAYLIST + RIGHT VIDEO) */}
          {/* ========================================================= */}
          {(activeTab === 'lectures' || isCinemaMode) && (
            <div className="space-y-6">
              
              {/* Top Progress & Back Bar */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsCinemaMode(false);
                      setActiveTab('classroom');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 transition"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
                    <span>ক্লাসরুমে ফিরে যান</span>
                  </button>

                  <div className="truncate max-w-sm">
                    <h3 className="text-xs font-bold text-white truncate">{currentCourse.title}</h3>
                    <p className="text-[11px] text-emerald-400 font-bold truncate">{activeLesson.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400">প্রগ্রেস: {progressPercent}%</span>
                  <div className="w-28 bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-emerald-500 h-full transition-all duration-500 rounded-full" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
              </div>

              {/* Step 955 Grid: LEFT PLAYLIST (4 cols) + RIGHT VIDEO SCREEN (8 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT: CHAPTER CURRICULUM PLAYLIST (4 cols) */}
                <div className="lg:col-span-4 bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-4 shadow-lg order-2 lg:order-1">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-black text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      <span>কোর্স কারিকুলাম</span>
                    </h4>
                    <span className="text-xs text-slate-400 font-mono">{allLessons.length}টি লেকচার</span>
                  </div>

                  <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                    {currentCourse.curriculum.map((chapter) => (
                      <div key={chapter.id} className="space-y-2">
                        <h5 className="text-xs font-bold text-emerald-400 px-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>{chapter.title}</span>
                        </h5>
                        
                        <div className="space-y-1.5">
                          {chapter.lessons.map((lesson) => {
                            const isActive = activeLesson.id === lesson.id;
                            const isCompleted = completedLessonIds.includes(lesson.id);

                            return (
                              <div
                                key={lesson.id}
                                onClick={() => setActiveLesson(lesson)}
                                className={`p-3 rounded-2xl cursor-pointer transition flex items-center justify-between text-xs ${
                                  isActive
                                    ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-900/30'
                                    : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <PlayCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                                  <span className="truncate">{lesson.title}</span>
                                </div>

                                {isCompleted && (
                                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold shrink-0 ml-2">
                                    ✓
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT: 16:9 VIDEO SCREEN & NOTES (8 cols) */}
                <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
                  
                  {/* Embedded YouTube Player Screen */}
                  <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${activeLesson.youtubeVideoId || 'M7lc1UVf-VE'}?autoplay=1&rel=0`}
                      title={activeLesson.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>

                  {/* Lesson Title & Completion Checkmark Button */}
                  <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
                        ক্লাস লেকচার • {activeLesson.durationMin} মিনিট
                      </span>
                      <h3 className="text-lg font-black text-white leading-snug">{activeLesson.title}</h3>
                    </div>

                    <button
                      onClick={() => toggleLessonComplete(activeLesson.id)}
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition shrink-0 ${
                        completedLessonIds.includes(activeLesson.id)
                          ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 shadow-inner'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{completedLessonIds.includes(activeLesson.id) ? 'ক্লাস সম্পন্ন হয়েছে ✓' : 'সম্পন্ন চিহ্নিত করুন'}</span>
                    </button>
                  </div>

                  {/* Lesson PDF Handout & Notes */}
                  <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-lg">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-amber-400" />
                        <h4 className="text-sm font-bold text-white">ক্লাস লেকচার নোটস ও হ্যান্ডআউট</h4>
                      </div>

                      {activeLesson.pdfNotesUrl && (
                        <a
                          href={activeLesson.pdfNotesUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/80 px-3.5 py-2 rounded-xl border border-emerald-800/60 transition shadow"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF ডাউনলোড</span>
                        </a>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activeLesson.notesContent || 'এই ক্লাসের হ্যান্ডআউট ও লেকচার নোটস শীঘ্রই সংযোজন করা হবে।'}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: NOTES & PDF HANDOUTS */}
          {/* ========================================================= */}
          {activeTab === 'notes' && !isCinemaMode && <PDFList />}

          {/* ========================================================= */}
          {/* TAB 4: MONTHLY FEE */}
          {/* ========================================================= */}
          {activeTab === 'monthly-fee' && !isCinemaMode && <MonthlyFeeStatus />}

          {/* ========================================================= */}
          {/* TAB 5: STUDENT ID CARD */}
          {/* ========================================================= */}
          {activeTab === 'id-card' && !isCinemaMode && (
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 text-center shadow-xl">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-white">ভার্চুয়াল স্টুডেন্ট আইডি কার্ড</h3>
                <p className="text-xs text-slate-400">বিডি হোমিও প্রশিক্ষণ কেন্দ্র কর্তৃক অনুমোদিত ডিজিটাল স্টুডেন্ট কার্ড</p>
              </div>
              
              <div className="max-w-sm mx-auto bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 rounded-3xl p-6 border-2 border-emerald-500/40 shadow-2xl text-left space-y-5">
                <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
                  <span className="text-xs font-black text-emerald-400">বিডি হোমিও প্রশিক্ষণ কেন্দ্র</span>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white font-black text-lg flex items-center justify-center shadow">
                    {user.fullName ? user.fullName.charAt(0) : 'S'}
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">{user.fullName}</h4>
                    <p className="text-[10px] text-slate-300 font-mono">আইডি: BDH-{user.id.substring(0, 8).toUpperCase()}</p>
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                      ভেরিফায়েড শিক্ষার্থী
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 space-y-1 pt-2 border-t border-emerald-800/40">
                  <p>কোর্স: {currentCourse.title}</p>
                  <p>প্রশিক্ষক: ডাঃ মোঃ গিয়াস উদ্দিন</p>
                  <p>মেয়াদ: ২০২৬ ব্যাচ</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: PTF CERTIFICATE & COURIER DISPATCH */}
          {/* ========================================================= */}
          {activeTab === 'certificate' && !isCinemaMode && (
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">প্যারামেডিকেল টেকনোলজি ফাউন্ডেশন (PTF) সার্টিফিকেট</h3>
                  <p className="text-xs text-slate-400">গভর্নমেন্ট রেজিস্টার্ড প্রফেশনাল হোমিওপ্যাথিক প্র্যাকটিশনার সার্টিফিকেট</p>
                </div>
              </div>

              {existingCertReq ? (
                <div className="bg-emerald-950/60 border border-emerald-800 rounded-2xl p-6 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>আপনার সার্টিফিকেট কুরিয়ার ডেলিভারি রিকোয়েস্ট জমা আছে!</span>
                  </div>
                  <div className="text-xs text-slate-300 space-y-1">
                    <p><strong>প্রাপকের ঠিকানা:</strong> {existingCertReq.courierAddress}</p>
                    <p><strong>মোবাইল:</strong> {existingCertReq.phone}</p>
                    <p><strong>বর্তমান স্ট্যাটাস:</strong> <span className="font-bold text-amber-400 uppercase">{existingCertReq.status}</span></p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCourierSubmit} className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      সার্টিফিকেটে যে নাম থাকবে (Full Name) *
                    </label>
                    <input
                      type="text"
                      disabled
                      value={user.fullName}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      কুরিয়ার যোগাযোগের মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      value={courierPhone}
                      onChange={(e) => setCourierPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      সম্পূর্ণ কুরিয়ার ডেলিভারি ঠিকানা (জেলা, থানা ও সুন্দরবন কুরিয়ার শাখা) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={courierAddress}
                      onChange={(e) => setCourierAddress(e.target.value)}
                      placeholder="যেমন: ডাঃ আশরাফুল চেম্বার, সুন্দরবন কুরিয়ার সার্ভিস, সদর ব্রাঞ্চ, বগুড়া..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isCourierSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <Truck className="w-4 h-4" />
                    <span>{isCourierSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'সনদপত্র ডেলিভারি ঠিকানা সাবমিট করুন'}</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: SUPPORT */}
          {/* ========================================================= */}
          {activeTab === 'support' && !isCinemaMode && (
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-xl">
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
