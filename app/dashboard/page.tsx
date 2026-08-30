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
  ChevronRight, 
  PlayCircle, 
  FileText, 
  Lock, 
  CheckCircle, 
  Home, 
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
  Truck,
  AlertCircle
} from 'lucide-react';

type StudentTab = 'classroom' | 'lectures' | 'notes' | 'monthly-fee' | 'id-card' | 'certificate';

export default function DashboardPage() {
  const { user, courses, enrollments, settings, submitCertificateRequest, certificateRequests, signInWithGoogle, signOut, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<StudentTab>('classroom');

  // Strict enrollment matching
  const myEnrolledCourses = courses.filter((course) =>
    enrollments.some(
      (enr) =>
        (enr.studentId === user?.id || (user?.email && enr.studentEmail.toLowerCase() === user.email.toLowerCase())) &&
        enr.courseId === course.id &&
        enr.admissionStatus === 'approved'
    )
  );

  const pendingEnrollments = enrollments.filter(
    (enr) =>
      (enr.studentId === user?.id || (user?.email && enr.studentEmail.toLowerCase() === user.email.toLowerCase())) &&
      enr.admissionStatus === 'pending'
  );

  // FOCUSED LEARNING / PLAYER MODE
  const [learningCourseId, setLearningCourseId] = useState<string | null>(null);
  
  const learningCourse = courses.find((c) => c.id === learningCourseId) || courses[0];
  const isEnrolledInCurrent = myEnrolledCourses.some((c) => c.id === learningCourse?.id);
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
      notesContent: 'এই ক্লাসে অর্গানন অব মেডিসিনের ১ম থেকে ৮ম এফোরিজমের মূল তাৎপর্য ও ক্লিনিক্যাল প্রয়োগ বিস্তারিত ব্যাখ্যা করা হয়েছে।',
    }
  );

  // Persistent Lesson Progress
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  useEffect(() => {
    if (user?.id && learningCourse?.id) {
      try {
        const saved = localStorage.getItem(`bdhomeo_progress_${user.id}_${learningCourse.id}`);
        if (saved) {
          setCompletedLessonIds(JSON.parse(saved));
        } else {
          setCompletedLessonIds(['l1']);
        }
      } catch (err) {
        setCompletedLessonIds(['l1']);
      }
    }
  }, [user?.id, learningCourse?.id]);

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      const next = prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId];
      if (user?.id && learningCourse?.id) {
        try {
          localStorage.setItem(`bdhomeo_progress_${user.id}_${learningCourse.id}`, JSON.stringify(next));
        } catch (err) {}
      }
      return next;
    });
  };

  // Courier Delivery Form State for PTF Certificate
  const [courierPhone, setCourierPhone] = useState(user?.phone || '');
  const [courierAddress, setCourierAddress] = useState('');
  const [courierDistrict, setCourierDistrict] = useState('');
  const [isCourierSubmitting, setIsCourierSubmitting] = useState(false);

  const existingCertReq = certificateRequests.find((r) => r.studentId === user?.id || (user?.email && r.studentEmail.toLowerCase() === user.email.toLowerCase()));

  const handleEnterCoursePlayer = (course: Course) => {
    const isEnrolled = myEnrolledCourses.some((c) => c.id === course.id);
    if (!isEnrolled) {
      showToast('এই কোর্সের সকল পেইড লেকচার দেখতে প্রথমে ভর্তি সম্পন্ন ও অনুমোদন প্রয়োজন। ফ্রি প্রিভিউ ক্লাস চালু করা হচ্ছে...', 'info');
    }
    setLearningCourseId(course.id);
    const firstLesson = course.curriculum[0]?.lessons[0];
    if (firstLesson) setActiveLesson(firstLesson);
  };

  const handleCourierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courierAddress || !courierPhone) {
      showToast('মোবাইল নম্বর ও সম্পূর্ণ কুরিয়ার ঠিকানা লিখুন', 'error');
      return;
    }

    setIsCourierSubmitting(true);
    const ok = await submitCertificateRequest({
      phone: courierPhone,
      courierAddress,
      district: courierDistrict,
      courseId: learningCourse.id,
      courseTitle: learningCourse.title,
    });
    setIsCourierSubmitting(false);
  };

  // Dynamic progress calculation
  const totalLessonsCount = allLearningLessons.length || 1;
  const progressPercent = Math.min(100, Math.round((completedLessonIds.length / totalLessonsCount) * 100));

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
              শিক্ষার্থী ভার্চুয়াল ক্লাসরুম
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              আপনার লাইভ ক্লাস, রেকর্ডেড লেকচার ও প্র্যাকটিস নোটস পেতে সাইন-ইন করুন।
            </p>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition"
          >
            <span>Google দিয়ে সাইন-ইন করুন</span>
          </button>

          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-emerald-400 font-bold flex items-center justify-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              <span>হোমপেজে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW A: FOCUSED FULLSCREEN LEARNING MODE
  // =========================================================================
  if (learningCourseId) {
    const isLockedLesson = !isEnrolledInCurrent && !activeLesson.isFreePreview;

    return (
      <div className="min-h-screen bg-slate-950 text-white font-bangla flex flex-col">
        {/* Top Focused Navbar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLearningCourseId(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>ড্যাশবোর্ডে ফিরুন</span>
            </button>
            <div className="hidden sm:block border-l border-slate-700 h-5" />
            <h1 className="text-xs sm:text-sm font-bold text-emerald-400 truncate max-w-md">
              {learningCourse.title}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {isEnrolledInCurrent ? (
              <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-300">
                <span>প্রগ্রেস: {progressPercent}%</span>
                <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <span className="text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full">
                ফ্রি প্রিভিউ মোড
              </span>
            )}
          </div>
        </header>

        {/* Learning Workspace Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Left Column: Lesson Curriculum & Lecture List */}
          <div className="lg:col-span-4 bg-slate-900/90 border-r border-slate-800 p-4 overflow-y-auto space-y-4 max-h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-300">কোর্স কারিকুলাম</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400">{allLearningLessons.length}টি লেকচার</span>
            </div>

            <div className="space-y-3">
              {learningCourse.curriculum.map((chapter) => (
                <div key={chapter.id} className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 bg-slate-800/60 rounded-lg">
                    {chapter.title}
                  </div>
                  <div className="space-y-1">
                    {chapter.lessons.map((lesson) => {
                      const isActive = activeLesson.id === lesson.id;
                      const isDone = completedLessonIds.includes(lesson.id);
                      const isLocked = !isEnrolledInCurrent && !lesson.isFreePreview;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            if (isLocked) {
                              showToast('এই ক্লাসটি লক করা। সম্পূর্ণ কোর্স আনলক করতে ভর্তি সম্পন্ন করুন।', 'error');
                            }
                            setActiveLesson(lesson);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl transition flex items-center justify-between gap-2.5 text-xs ${
                            isActive
                              ? 'bg-emerald-600/30 border border-emerald-500/50 text-white'
                              : 'bg-slate-800/40 hover:bg-slate-800 text-slate-300'
                          } ${isLocked ? 'opacity-60' : ''}`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            {isLocked ? (
                              <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            ) : isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Play className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            )}
                            <span className="truncate font-semibold">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">
                            {lesson.isFreePreview ? 'ফ্রি' : `${lesson.durationMin} মি.`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Video Player & Notes */}
          <div className="lg:col-span-8 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-4rem)] space-y-6">
            
            {isLockedLesson ? (
              <div className="aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-amber-500/40 p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-md">
                  <h3 className="text-lg font-black text-white">এই ভিডিও লেকচারটি লক করা</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    সম্পূর্ণ কোর্স কারিকুলাম ও সকল রেকর্ডেড ক্লাস আনলক করতে ভর্তি সম্পন্ন করুন।
                  </p>
                </div>
                <Link
                  href={`/courses/${learningCourse.slug}`}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition"
                >
                  <span>এখনই ভর্তি নিশ্চিত করুন</span>
                </Link>
              </div>
            ) : (
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeLesson.youtubeVideoId || 'M7lc1UVf-VE'}?rel=0&modestbranding=1`}
                  title={activeLesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            )}

            {/* Video Action & Title Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  বর্তমানে চলছে • {activeLesson.durationMin} মিনিট {activeLesson.isFreePreview && '(ফ্রি ওরিয়েন্টেশন)'}
                </span>
                <h2 className="text-base sm:text-lg font-black text-white">
                  {activeLesson.title}
                </h2>
              </div>

              {isEnrolledInCurrent && (
                <button
                  onClick={() => toggleLessonComplete(activeLesson.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                    completedLessonIds.includes(activeLesson.id)
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>
                    {completedLessonIds.includes(activeLesson.id)
                      ? 'সম্পন্ন হয়েছে ✅'
                      : 'সম্পন্ন হিসেবে চিহ্নিত করুন'}
                  </span>
                </button>
              )}
            </div>

            {/* Lecture Notes & PDF Handout Download */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">ক্লাস নোটস ও লেকচার হ্যান্ডআউট</h3>
                </div>

                {activeLesson.pdfNotesUrl && (
                  <a
                    href={activeLesson.pdfNotesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition shadow"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>পিডিএফ ডাউনলোড</span>
                  </a>
                )}
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                {activeLesson.notesContent || 'এই ক্লাসের হ্যান্ডআউট ও পয়েন্টসমূহ অর্গানন ও মেটেরিয়া মেডিকা ভিত্তিক। নিয়মিত রিভিশন ও প্র্যাকটিস করুন।'}
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: MAIN STUDENT DASHBOARD PORTAL
  // =========================================================================
  const tabs: { id: StudentTab; label: string; icon: any }[] = [
    { id: 'classroom', label: 'লাইভ ক্লাসরুম ও কোর্স', icon: GraduationCap },
    { id: 'lectures', label: 'রেকর্ডেড লেকচার', icon: Video },
    { id: 'notes', label: 'পিডিএফ ও নোটস', icon: FileText },
    { id: 'monthly-fee', label: 'মাসিক ফি (৫০০/-)', icon: CreditCard },
    { id: 'id-card', label: 'স্টুডেন্ট আইডি কার্ড', icon: ShieldCheck },
    { id: 'certificate', label: 'সনদপত্র ও কুরিয়ার', icon: Award },
  ];

  return (
    <div className="bg-slate-950 min-h-screen font-bangla text-slate-100 flex flex-col">
      
      {/* Student Portal Header */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow">
                BD
              </div>
              <span className="font-black text-white text-base hidden sm:inline">বিডি হোমিও পোর্টাল</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                {user.fullName.charAt(0)}
              </div>
              <span className="text-xs font-bold text-slate-200 hidden sm:inline">{user.fullName}</span>
            </div>

            <button
              onClick={signOut}
              className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 rounded-xl transition"
              title="লগআউট"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-3 bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl">
            <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-center space-y-1">
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">স্টুডেন্ট একাউন্ট</span>
              <p className="text-xs font-black text-white truncate">{user.fullName}</p>
              <p className="text-[10px] text-slate-400 font-mono truncate">{user.email}</p>
            </div>

            <div className="space-y-1 pt-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Display Pane */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Pending Admission Alert (If submitted but not yet approved) */}
            {pendingEnrollments.length > 0 && myEnrolledCourses.length === 0 && (
              <div className="bg-amber-950/60 border border-amber-500/40 rounded-3xl p-5 flex items-start gap-4 text-amber-200">
                <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">আপনার ভর্তি আবেদনটি যাচাইাধীন রয়েছে</h4>
                  <p className="text-xs text-amber-200/80 leading-relaxed">
                    অ্যাডমিন কর্তৃক পেমেন্ট ভেরিফিকেশন সম্পন্ন হওয়ার পর আপনার সম্পূর্ণ ভিডিও ক্লাসরুম ও স্টুডেন্ট আইডি স্বয়ংক্রিয়ভাবে সক্রিয় হবে।
                  </p>
                </div>
              </div>
            )}

            {/* TAB 1: CLASSROOM & ENROLLED COURSES */}
            {activeTab === 'classroom' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GoogleMeetLauncher />
                  <MorningSupportBox />
                </div>

                <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-black text-white">আমার এনরোল্ড কোর্সসমূহ</h3>
                      <p className="text-xs text-slate-400">কোর্সের রেকর্ডেড ক্লাস ও লেকচার দেখতে ক্লাসরুমে প্রবেশ করুন</p>
                    </div>
                  </div>

                  {myEnrolledCourses.length === 0 ? (
                    <div className="bg-slate-950 rounded-2xl border border-slate-800 p-8 text-center space-y-4">
                      <GraduationCap className="w-10 h-10 text-slate-500 mx-auto" />
                      <div className="space-y-1 max-w-md mx-auto">
                        <h4 className="text-base font-bold text-white">আপনি এখনো কোনো কোর্সে ভর্তি হননি</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          হ্যানিম্যানের খাঁটি হোমিওপ্যাথি প্রশিক্ষণ নিতে আপনার পছন্দের কোর্সে ভর্তি আবেদন সম্পন্ন করুন।
                        </p>
                      </div>
                      <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition"
                      >
                        <span>সকল কোর্স দেখুন ও ভর্তি হোন</span>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {myEnrolledCourses.map((course) => (
                        <div
                          key={course.id}
                          className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4 flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900">
                              <Image src={course.thumbnailUrl} alt={course.title} fill className="object-cover" />
                            </div>
                            <h4 className="text-sm font-bold text-white leading-snug">{course.title}</h4>
                            <p className="text-xs text-slate-400 line-clamp-2">{course.subtitle}</p>
                          </div>

                          <button
                            onClick={() => handleEnterCoursePlayer(course)}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow"
                          >
                            <PlayCircle className="w-4 h-4" />
                            <span>ভিডিও ক্লাসরুমে প্রবেশ করুন</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: RECORDED LECTURES */}
            {activeTab === 'lectures' && (
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-white">রেকর্ডেড ভিডিও লেকচার</h3>
                    <p className="text-xs text-slate-400">যে কোর্সটির ক্লাস দেখতে চান সিলেক্ট করুন</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {courses.map((course) => {
                    const isEnrolled = myEnrolledCourses.some((c) => c.id === course.id);
                    return (
                      <div key={course.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-sm text-white">{course.title}</h4>
                          {isEnrolled ? (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded shrink-0">
                              অনুমোদিত ✅
                            </span>
                          ) : (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded shrink-0">
                              ফ্রি ট্রায়াল
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-400">{course.curriculum.flatMap((c) => c.lessons).length}টি ভিডিও লেকচার উপলব্ধ</p>

                        <button
                          onClick={() => handleEnterCoursePlayer(course)}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          <span>{isEnrolled ? 'ভিডিও প্লেয়ার খুলুন' : 'ফ্রি ক্লাস দেখুন'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: NOTES & PDF HANDOUTS */}
            {activeTab === 'notes' && <PDFList />}

            {/* TAB 4: MONTHLY FEE */}
            {activeTab === 'monthly-fee' && <MonthlyFeeStatus />}

            {/* TAB 5: STUDENT ID CARD */}
            {activeTab === 'id-card' && (
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 text-center">
                <h3 className="text-lg font-black text-white">ভার্চুয়াল স্টুডেন্ট আইডি কার্ড</h3>
                
                {myEnrolledCourses.length > 0 ? (
                  <div className="max-w-sm mx-auto bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 rounded-3xl p-6 border-2 border-emerald-500/40 shadow-2xl text-left space-y-5">
                    <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
                      <span className="text-xs font-black text-emerald-400">বিডি হোমিও প্রশিক্ষণ কেন্দ্র</span>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white font-black text-lg flex items-center justify-center shadow">
                        {user.fullName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">{user.fullName}</h4>
                        <p className="text-[10px] text-slate-300 font-mono">আইডি: BDH-{user.id.substring(0, 8).toUpperCase()}</p>
                        <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                          সক্রিয় শিক্ষার্থী ✅
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300 space-y-1 pt-2 border-t border-emerald-800/40">
                      <p>কোর্স: {myEnrolledCourses[0]?.title}</p>
                      <p>প্রশিক্ষক: ডাঃ মোঃ গিয়াস উদ্দিন</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 max-w-sm mx-auto space-y-3">
                    <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                    <p className="text-xs text-slate-300">ভর্তি অনুমোদিত হলে আপনার ভার্চুয়াল আইডি কার্ড জেনারেট হবে।</p>
                    <Link href="/courses" className="inline-block text-xs font-bold text-emerald-400 hover:underline">
                      কোর্স ক্যাটালগ দেখুন ↗
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: PTF CERTIFICATE & COURIER DISPATCH */}
            {activeTab === 'certificate' && (
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <Award className="w-6 h-6 text-amber-400" />
                  <div>
                    <h3 className="text-lg font-black text-white">PTF প্রফেশনাল সার্টিফিকেট ও কুরিয়ার ডেলিভারি</h3>
                    <p className="text-xs text-slate-400">৬ মাসের কোর্স সমাপনী সনদপত্র সরাসরি আপনার চেম্বার বা ঠিকানায় কুরিয়ারে পেতে ফর্ম পূরণ করুন</p>
                  </div>
                </div>

                {existingCertReq ? (
                  <div className="bg-emerald-950/60 border border-emerald-800 rounded-2xl p-6 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>আপনার সার্টিফিকেট কুরিয়ার রিকোয়েস্ট জমা আছে!</span>
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
                        সম্পূর্ণ কুরিয়ার ডেলিভারি ঠিকানা (চেম্বার / বাড়ি) *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={courierAddress}
                        onChange={(e) => setCourierAddress(e.target.value)}
                        placeholder="যেমন: ডাঃ আশরাফুল চেম্বার, মেইন রোড, সদর..."
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

          </div>

        </div>
      </div>

    </div>
  );
}
