'use client';

import React, { useState } from 'react';
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
  Menu, 
  X, 
  CheckCircle, 
  Home, 
  LogOut, 
  ShieldCheck, 
  QrCode, 
  Download, 
  Printer, 
  MapPin, 
  Send, 
  Sparkles,
  ArrowLeft,
  FileDown,
  Play,
  Share2
} from 'lucide-react';

type StudentTab = 'classroom' | 'lectures' | 'notes' | 'monthly-fee' | 'id-card' | 'certificate' | 'support';

export default function DashboardPage() {
  const { user, courses, enrollments, monthlyPayments, settings, signInWithGoogle, signOut, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<StudentTab>('classroom');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // FOCUSED LEARNING / PLAYER MODE (When entering a course classroom)
  const [learningCourseId, setLearningCourseId] = useState<string | null>(null);
  
  // Track active playing lesson in Learning Mode
  const learningCourse = courses.find((c) => c.id === learningCourseId) || courses[0];
  const allLearningLessons = learningCourse?.curriculum.flatMap((c) => c.lessons) || [];
  
  const [activeLesson, setActiveLesson] = useState<Lesson>(
    allLearningLessons[0] || {
      id: 'l1',
      title: '১.১ পরিচিতি ও অর্গাননের মূল দর্শন (ফ্রি ওরিয়েন্টেশন ক্লাস)',
      durationMin: 45,
      isFreePreview: true,
      youtubeVideoId: 'M7lc1UVf-VE',
      pdfNotesTitle: 'Organon_Chapter_1_Handout.pdf',
      pdfNotesUrl: 'https://drive.google.com/file/d/sample-organon-1/view',
      notesContent: 'এই ক্লাসে অর্গানন অব মেডিসিনের ১ম থেকে ৮ম এফোরিজমের মূল তাৎপর্য ব্যাখ্যা করা হয়েছে।',
    }
  );

  // Track completed lessons in state
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(['l1']);

  // Courier Delivery for PTF Certificate
  const [courierName, setCourierName] = useState(user?.fullName || '');
  const [courierPhone, setCourierPhone] = useState(user?.phone || '');
  const [courierAddress, setCourierAddress] = useState('');
  const [isCourierSubmitted, setIsCourierSubmitted] = useState(false);

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  // Find enrolled courses for this student
  const myEnrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enr) =>
        (enr.studentId === user?.id || enr.studentEmail === user?.email || enr.studentPhone === user?.phone) &&
        enr.courseId === course.id &&
        enr.admissionStatus === 'approved'
    )
  );

  // Unapproved/all available courses if none enrolled yet
  const displayedCourses = myEnrolledCourses.length > 0 ? myEnrolledCourses : courses;

  const handleEnterCoursePlayer = (course: Course) => {
    setLearningCourseId(course.id);
    const firstLesson = course.curriculum[0]?.lessons[0];
    if (firstLesson) setActiveLesson(firstLesson);
  };

  const handleCourierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courierAddress) return;
    setIsCourierSubmitted(true);
    showToast('আপনার সুন্দরবন কুরিয়ার ডেলিভারি ঠিকানা সফলভাবে সংরক্ষিত হয়েছে!', 'success');
  };

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

  // =======================================================================
  // 🎥 FOCUSED LEARNING / CINEMA PLAYER MODE
  // (Left: Playlist & Chapters | Right: Pure Video + Class Notes + PDF Download)
  // =======================================================================
  if (learningCourseId && learningCourse) {
    const isApprovedForThisCourse = enrollments.some(
      (e) => (e.studentId === user.id || e.studentEmail === user.email) && e.courseId === learningCourse.id && e.admissionStatus === 'approved'
    );

    const isDone = completedLessonIds.includes(activeLesson.id);

    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen font-bangla flex flex-col">
        
        {/* Learning Top Navigation Bar */}
        <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLearningCourseId(null)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>আমার সকল কোর্স</span>
            </button>

            <div className="hidden sm:block">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">
                {learningCourse.title}
              </span>
              <h2 className="text-xs sm:text-sm font-black text-white truncate max-w-md">
                {activeLesson.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleLessonComplete(activeLesson.id)}
              className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl border transition ${
                isDone
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">{isDone ? 'ক্লাস সম্পন্ন হয়েছে' : 'Mark as Completed'}</span>
            </button>

            <a
              href={settings.googleMeetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-500/30 transition"
            >
              <Video className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">আজকের লাইভ ক্লাস</span>
            </a>
          </div>
        </header>

        {/* 2-Column Responsive Workspace */}
        <div className="flex-1 flex flex-col lg:flex-row max-w-[1750px] w-full mx-auto">
          
          {/* LEFT COLUMN: CHAPTERS & LESSONS PLAYLIST SIDEBAR */}
          <aside className="w-full lg:w-96 bg-slate-900 border-r border-slate-800 p-4 space-y-4 shrink-0 lg:h-[calc(100vh-60px)] lg:overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                কোর্স সিলেবাস ও ক্লাস তালিকা
              </h3>
              <span className="text-[11px] text-emerald-400 font-bold font-english">
                {allLearningLessons.length} টি ক্লাস
              </span>
            </div>

            <div className="space-y-4">
              {learningCourse.curriculum.map((chapter) => (
                <div key={chapter.id} className="bg-slate-950 rounded-2xl p-3 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-emerald-400 uppercase">অধ্যায় {chapter.chapterNo}</span>
                      <h4 className="text-xs font-bold text-white">{chapter.title}</h4>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    {chapter.lessons.map((lesson) => {
                      const isPlaying = activeLesson.id === lesson.id;
                      const isLessonDone = completedLessonIds.includes(lesson.id);
                      const isLocked = !lesson.isFreePreview && !isApprovedForThisCourse;

                      return (
                        <div
                          key={lesson.id}
                          onClick={() => {
                            if (!isLocked) setActiveLesson(lesson);
                          }}
                          className={`
                            flex items-center justify-between p-2.5 rounded-xl text-xs transition cursor-pointer
                            ${isPlaying
                              ? 'bg-emerald-950/90 border border-emerald-500/60 text-white font-bold'
                              : isLocked
                                ? 'bg-slate-900/40 text-slate-600 cursor-not-allowed border border-transparent'
                                : 'bg-slate-900 hover:bg-slate-800/80 text-slate-300 border border-slate-800/50'
                            }
                          `}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {isLessonDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : isLocked ? (
                              <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                            ) : (
                              <Play className={`w-3.5 h-3.5 shrink-0 ${isPlaying ? 'text-emerald-400 fill-emerald-400' : 'text-slate-500'}`} />
                            )}
                            <span className="truncate text-[11px]">{lesson.title}</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {lesson.isFreePreview && (
                              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded">
                                Free
                              </span>
                            )}
                            <span className="text-[10px] text-slate-500 font-english">{lesson.durationMin}m</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* RIGHT COLUMN: PURE VIDEO PLAYER + CLASS NOTES + PDF DOWNLOAD */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-y-auto">
            
            {/* Embedded Video Player Box (Distraction Free) */}
            <div className="bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
              {activeLesson.isFreePreview || isApprovedForThisCourse ? (
                <div className="relative aspect-video w-full">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeLesson.youtubeVideoId}?rel=0&modestbranding=1&autoplay=0`}
                    title={activeLesson.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4">
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
                    href={`/courses/${learningCourse.slug}`}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition"
                  >
                    ভর্তি সম্পন্ন করুন (৳১,০০০/-)
                  </Link>
                </div>
              )}
            </div>

            {/* Lesson Title & Quick Meta */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2.5 py-0.5 rounded">
                  বর্তমান ক্লাসের বিবরণ
                </span>
                <h1 className="text-lg sm:text-xl font-black text-white mt-1">
                  {activeLesson.title}
                </h1>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-bold">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>{activeLesson.durationMin} মিনিট</span>
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Full HD 1080p</span>
                </span>
              </div>
            </div>

            {/* Class Notes & Discussion Summary */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
              <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <FileText className="w-5 h-5 text-emerald-400" />
                ক্লাসের সারসংক্ষেপ ও গুরুত্বপূর্ণ নোটস (Lecture Notes)
              </h3>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 font-medium">
                {activeLesson.notesContent ? (
                  <p className="whitespace-pre-line bg-slate-950 p-5 rounded-2xl border border-slate-800/80">
                    {activeLesson.notesContent}
                  </p>
                ) : (
                  <p className="text-slate-500 italic bg-slate-950 p-5 rounded-2xl border border-slate-800/80">
                    এই ক্লাসের জন্য কোনো অতিরিক্ত লিখিত নোটস সংযুক্ত করা হয়নি। ভিডিও লেকচারটি মনোযোগ দিয়ে দেখুন।
                  </p>
                )}
              </div>
            </div>

            {/* PDF Lecture Sheet Download Card */}
            {activeLesson.pdfNotesUrl && (
              <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/40 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-emerald-500/20 text-emerald-400 rounded-2xl shrink-0">
                    <FileDown className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">স্টাডি মেটেরিয়াল</span>
                    <h4 className="text-sm font-black text-white mt-0.5">
                      {activeLesson.pdfNotesTitle || 'Class_Lecture_Handout.pdf'}
                    </h4>
                    <p className="text-xs text-slate-400">
                      এই ক্লাসের কালারফুল PDF লেকচার শিট ডাউনলোড করে প্রিন্ট বা সংরক্ষণ করুন।
                    </p>
                  </div>
                </div>

                <a
                  href={activeLesson.pdfNotesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>PDF ডাউনলোড করুন</span>
                </a>
              </div>
            )}

            {/* Ask Sir Question Support Box */}
            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#25D366]/20 text-[#25D366] rounded-2xl">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">ক্লাস সম্পর্কিত কোনো প্রশ্ন আছে?</h4>
                  <p className="text-xs text-slate-400">ডাঃ মোঃ গিয়াস উদ্দিন স্যারকে সরাসরি হোয়াটসঅ্যাপে প্রশ্ন পাঠান।</p>
                </div>
              </div>

              <a
                href={`https://wa.me/880${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`আসসালামু আলাইকুম স্যার, আমি '${activeLesson.title}' ক্লাসটি দেখছিলাম। এই বিষয়ে আমার একটি প্রশ্ন ছিল...`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>স্যারকে প্রশ্ন করুন</span>
              </a>
            </div>

          </main>

        </div>

      </div>
    );
  }

  // =======================================================================
  // STANDARD STUDENT DASHBOARD
  // =======================================================================
  const studentNavItems: { id: StudentTab; label: string; icon: any; badge?: string }[] = [
    { id: 'classroom', label: 'লাইভ ক্লাসরুম ও শিডিউল', icon: Video, badge: 'Live' },
    { id: 'lectures', label: 'ভিডিও লেকচার ও সিলেবাস', icon: PlayCircle },
    { id: 'notes', label: 'লেকচার শিট ও PDF নোটস', icon: FileText },
    { id: 'monthly-fee', label: 'মাসিক ফি (৳৫০০/-) ও রসিদ', icon: CreditCard },
    { id: 'id-card', label: 'ভার্চুয়াল স্টুডেন্ট আইডি কার্ড', icon: QrCode },
    { id: 'certificate', label: 'PTF সার্টিফিকেট ও কুরিয়ার', icon: Award },
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
          <a
            href={settings.googleMeetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm transition"
          >
            <Video className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">আজকের লাইভ ক্লাস</span>
          </a>

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
        
        {/* ===================== LEFT SIDEBAR ===================== */}
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
                {myEnrolledCourses.length > 0 ? (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> নিয়মিত শিক্ষার্থী
                  </span>
                ) : (
                  <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ফ্রি মেম্বার
                  </span>
                )}
              </div>
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
          
          {/* TAB 1: LIVE CLASSROOM */}
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
                      <span className="font-bold">মর্নিং কেস সাপোর্ট:</span>
                      <span className="text-amber-400 font-bold">{settings.morningSupportTime || 'সকাল ৮:০০ টা'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    PTF সার্টিফিকেট ও কুরিয়ার
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

          {/* TAB 2: ENROLLED COURSES & VIDEO LECTURES OVERVIEW */}
          {activeTab === 'lectures' && (
            <div className="space-y-6 font-bangla">
              
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <PlayCircle className="w-6 h-6 text-emerald-400" />
                    আমার কোর্স ও ভিডিও লেকচার লাইব্রেরি
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    কোর্সের ক্লাসরুমে প্রবেশ করে অধ্যায়ভিত্তিক ভিডিও, লেকচার শিট ও আলোচনা নোটস দেখুন।
                  </p>
                </div>
              </div>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedCourses.map((course) => {
                  const totalLessons = course.curriculum.reduce((acc, c) => acc + c.lessons.length, 0);
                  const isEnrolled = enrollments.some(
                    (e) => (e.studentId === user.id || e.studentEmail === user.email) && e.courseId === course.id && e.admissionStatus === 'approved'
                  );

                  return (
                    <div
                      key={course.id}
                      className="bg-slate-900 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition shadow-xl group space-y-5"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                            course.batchType === 'advance'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {course.batchType === 'advance' ? 'এডভান্সড ক্লিনিক্যাল ব্যাচ' : 'বেসিক ব্যাচ'}
                          </span>
                          <span className="text-xs text-slate-500 font-bold font-english">
                            {course.durationMonths} মাস কোর্স
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                            {course.subtitle}
                          </p>
                        </div>

                        {/* Progress Bar & Class counts */}
                        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-400">মোট ভিডিও ক্লাস:</span>
                            <span className="text-white font-english">{totalLessons} টি</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                              style={{ width: '25%' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Action Button: Enter Focused Classroom */}
                      <button
                        onClick={() => handleEnterCoursePlayer(course)}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>ক্লাসরুমে প্রবেশ করুন (ভিডিও ও নোটস)</span>
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 3: NOTES & PDFS */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <PDFList />
            </div>
          )}

          {/* TAB 4: MONTHLY FEE & RECEIPTS */}
          {activeTab === 'monthly-fee' && (
            <div className="space-y-6">
              <MonthlyFeeStatus courseId={courses[0]?.id || 'course-basic-foundation'} />

              {/* Monthly Fee Invoices */}
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-base font-black text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                    আমার মাসিক ফি রসিদ ও ট্রানজেকশন হিস্ট্রি
                  </h3>
                  <span className="text-xs text-slate-400">প্রতি মাস ৫০০/- টাকা</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 font-bold uppercase">
                        <th className="py-3 px-4 rounded-l-xl">মাস</th>
                        <th className="py-3 px-4">পরিমাণ</th>
                        <th className="py-3 px-4">TrxID ও মেথড</th>
                        <th className="py-3 px-4">স্ট্যাটাস</th>
                        <th className="py-3 px-4 text-right rounded-r-xl">রসিদ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {monthlyPayments.filter((p) => p.studentId === user.id || p.studentPhone === user.phone).length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-slate-500">
                            এখনো কোনো মাসিক ফি রেকর্ড নেই। উপরের ফর্ম থেকে ট্রানজেকশন আইডি সাবমিট করুন।
                          </td>
                        </tr>
                      ) : (
                        monthlyPayments
                          .filter((p) => p.studentId === user.id || p.studentPhone === user.phone)
                          .map((p) => (
                            <tr key={p.id} className="hover:bg-slate-950/40">
                              <td className="py-3 px-4 font-bold text-white">{p.monthName}</td>
                              <td className="py-3 px-4 font-black font-english text-amber-400">৳{p.amount}/-</td>
                              <td className="py-3 px-4 font-mono text-slate-300">{p.trxId} ({p.paymentMethod})</td>
                              <td className="py-3 px-4">
                                {p.status === 'approved' ? (
                                  <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold">পরিশোধিত</span>
                                ) : (
                                  <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-bold">যাচাইধীন</span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => window.print()}
                                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
                                  title="রসিদ প্রিন্ট করুন"
                                >
                                  <Printer className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STUDENT ID CARD */}
          {activeTab === 'id-card' && (
            <div className="space-y-6">
              <div className="max-w-lg mx-auto bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white shadow">
                      <GraduationCap className="w-6 h-6 text-amber-300" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-white">বিডি হোমিও প্রশিক্ষণ কেন্দ্র</h3>
                      <p className="text-[10px] text-emerald-400 font-bold uppercase">Official Student Identity Card</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                    VALID 2026
                  </span>
                </div>

                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-slate-950 border-2 border-emerald-500/50 shrink-0">
                    {user.avatarUrl ? (
                      <Image src={user.avatarUrl} alt={user.fullName} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-black text-white bg-emerald-700">
                        {user.fullName.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <h4 className="font-black text-base text-white truncate">{user.fullName}</h4>
                    <p className="text-xs text-slate-400 font-mono truncate">{user.email}</p>
                    <span className="inline-block text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                      ID: BDH-2026-{user.id.slice(0, 5).toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">প্রশিক্ষক</span>
                    <span className="font-bold text-white">ডাঃ মোঃ গিয়াস উদ্দিন</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">স্ট্যাটাস</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ভেরিফায়েড
                    </span>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl border border-slate-700 shadow transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>আইডি কার্ড প্রিন্ট / সেভ করুন</span>
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 6: PTF CERTIFICATE & COURIER TRACKER */}
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

                <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    সার্টিফিকেট পাওয়ার জন্য সুন্দরবন কুরিয়ার ঠিকানা সাবমিট করুন
                  </h4>

                  {isCourierSubmitted ? (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-bold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      আপনার কুরিয়ার ডেলিভারি তথ্য সফলভাবে সংরক্ষিত হয়েছে।
                    </div>
                  ) : (
                    <form onSubmit={handleCourierSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-slate-400 font-bold block mb-1">প্রাপকের পুরো নাম</label>
                          <input
                            type="text"
                            required
                            value={courierName}
                            onChange={(e) => setCourierName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-slate-400 font-bold block mb-1">যোগাযোগের মোবাইল নম্বর</label>
                          <input
                            type="tel"
                            required
                            value={courierPhone}
                            onChange={(e) => setCourierPhone(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500 font-mono"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[11px] text-slate-400 font-bold block mb-1">
                            সম্পূর্ণ কুরিয়ার ঠিকানা (জেলা, থানা ও নিকটস্থ সুন্দরবন কুরিয়ার শাখা)
                          </label>
                          <textarea
                            rows={2}
                            required
                            value={courierAddress}
                            onChange={(e) => setCourierAddress(e.target.value)}
                            placeholder="যেমন: ডাঃ মোঃ ... , সুন্দরবন কুরিয়ার সার্ভিস, সদর ব্রাঞ্চ, বগুড়া।"
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition"
                      >
                        ঠিকানা সংরক্ষণ করুন
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SUPPORT */}
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
