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
  Phone
} from 'lucide-react';

type StudentTab = 'classroom' | 'lectures' | 'notes' | 'monthly-fee' | 'id-card' | 'certificate' | 'support';

export default function DashboardPage() {
  const { user, courses, enrollments, monthlyPayments, settings, submitCertificateRequest, certificateRequests, signInWithGoogle, signOut, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<StudentTab>('classroom');

  // CINEMA PLAYER / VIDEO LEARNING MODE
  const [learningCourseId, setLearningCourseId] = useState<string | null>(null);
  
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
      notesContent: 'এই ক্লাসে অর্গানন অব মেডিসিনের ১ম থেকে ৮ম এফোরিজমের মূল তাৎপর্য ও ক্লিনিক্যাল প্রয়োগ বিস্তারিত ব্যাখ্যা করা হয়েছে।',
    }
  );

  // Lesson Completion Tracking
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
      courseId: learningCourse?.id || 'course-basic-foundation',
      courseTitle: learningCourse?.title || 'বেসিক হোমিওপ্যাথি ফাউন্ডেশন কোর্স',
    });

    setIsCourierSubmitting(false);
    if (success) {
      showToast('সার্টিফিকেট কুরিয়ার ডেলিভারি রিকোয়েস্ট সফলভাবে জমা হয়েছে!', 'success');
    }
  };

  // Sign In Screen if logged out
  if (!user) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 font-bangla bg-slate-950 text-white">
        <div className="max-w-md w-full bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">শিক্ষার্থী ড্যাশবোর্ড পোর্টাল</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              লাইভ ক্লাসরুম, রেকর্ডেড ভিডিও লেকচার, PDF শিট ও সার্টিফিকেট এক্সেস করতে লগইন করুন।
            </p>
          </div>
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm py-4 rounded-2xl shadow-xl transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
            </svg>
            <span>গুগল দিয়ে স্টুডেন্ট লগইন</span>
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // CINEMA PLAYER / VIDEO CLASSROOM VIEW
  // =========================================================================
  if (learningCourseId) {
    const course = courses.find((c) => c.id === learningCourseId) || courses[0];
    const progressPercent = Math.round((completedLessonIds.length / (allLearningLessons.length || 1)) * 100);

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-bangla pb-20">
        
        {/* Top Video Player Bar */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setLearningCourseId(null)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3.5 py-2 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>ড্যাশবোর্ডে ফিরে যান</span>
          </button>

          <div className="text-center hidden sm:block">
            <h2 className="text-sm font-black text-white">{course.title}</h2>
            <p className="text-[11px] text-emerald-400 font-bold">{activeLesson.title}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 hidden sm:inline">প্রগ্রেস: {progressPercent}%</span>
            <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </div>

        {/* Video Player & Curriculum Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Screen & Notes */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Embedded YouTube Player */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeLesson.youtubeVideoId || 'M7lc1UVf-VE'}?autoplay=1&rel=0`}
                title={activeLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Lesson Title & Controls */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                    ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{completedLessonIds.includes(activeLesson.id) ? 'ক্লাস সম্পন্ন হয়েছে ✓' : 'সম্পন্ন চিহ্নিত করুন'}</span>
              </button>
            </div>

            {/* Lesson PDF Handout & Notes */}
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
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
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 hover:bg-emerald-900/80 px-3 py-1.5 rounded-xl border border-emerald-800/60 transition"
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

          {/* Right Curriculum Playlist */}
          <div className="lg:col-span-4 bg-slate-900 rounded-3xl border border-slate-800 p-5 space-y-4 sticky top-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-black text-white">কোর্স কারিকুলাম</h4>
              <span className="text-xs text-slate-400">{allLearningLessons.length}টি লেকচার</span>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {course.curriculum.map((chapter) => (
                <div key={chapter.id} className="space-y-2">
                  <h5 className="text-xs font-bold text-emerald-400 px-2">{chapter.title}</h5>
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
                              ? 'bg-emerald-600 text-white font-bold shadow-lg'
                              : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800/80'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <PlayCircle className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                            <span className="line-clamp-1">{lesson.title}</span>
                          </div>

                          {isCompleted && (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
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

        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN STUDENT DASHBOARD (7 DISTINCT TABS)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-bangla pb-20">
      
      {/* Top Student Header */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-base shadow">
            {user.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-white">{user.fullName}</h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                ভেরিফায়েড শিক্ষার্থী
              </span>
            </div>
            <p className="text-[11px] text-emerald-400 font-mono">আইডি: BDH-{user.id.substring(0, 6).toUpperCase()}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.role === 'admin' && (
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>অ্যাডমিন প্যানেল</span>
            </Link>
          )}

          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">লগআউট</span>
          </button>
        </div>
      </header>

      {/* Main Student Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Navigation Sidebar (7 TABS) */}
        <aside className="lg:col-span-3 bg-slate-900 rounded-3xl p-3 border border-slate-800 space-y-1.5 sticky top-20">
          
          {/* TAB 1 */}
          <button
            onClick={() => setActiveTab('classroom')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'classroom'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>১. লাইভ ক্লাসরুম ও শিডিউল</span>
          </button>

          {/* TAB 2 */}
          <button
            onClick={() => setActiveTab('lectures')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'lectures'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>২. ভিডিও লেকচার লাইব্রেরি</span>
          </button>

          {/* TAB 3 */}
          <button
            onClick={() => setActiveTab('notes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'notes'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>৩. অধ্যায়ভিত্তিক PDF নোটস</span>
          </button>

          {/* TAB 4 */}
          <button
            onClick={() => setActiveTab('monthly-fee')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'monthly-fee'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>৪. মাসিক ফি ও পেমেন্ট</span>
          </button>

          {/* TAB 5 */}
          <button
            onClick={() => setActiveTab('id-card')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'id-card'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>৫. ভার্চুয়াল আইডি কার্ড</span>
          </button>

          {/* TAB 6 */}
          <button
            onClick={() => setActiveTab('certificate')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'certificate'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>৬. PTF সনদ ও কুরিয়ার</span>
          </button>

          {/* TAB 7 */}
          <button
            onClick={() => setActiveTab('support')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition ${
              activeTab === 'support'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>৭. একাডেমিক হেল্পলাইন</span>
          </button>

        </aside>

        {/* Right Main Content Tabs */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: LIVE CLASSROOM */}
          {activeTab === 'classroom' && (
            <div className="space-y-6">
              
              {/* Google Meet Launcher Banner */}
              <GoogleMeetLauncher />

              {/* Morning Case Support Box */}
              <MorningSupportBox />

              {/* Course Cards */}
              <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-white">আমার কোর্স ও ভিডিও ক্লাসরুম</h3>
                    <p className="text-xs text-slate-400">আপনার কোর্স নির্বাচন করে সরাসরি ক্লাসরুমে প্রবেশ করুন</p>
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
                        onClick={() => setLearningCourseId(course.id)}
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

          {/* TAB 2: LECTURES LIBRARY */}
          {activeTab === 'lectures' && (
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-black text-white">ভিডিও লেকচার লাইব্রেরি</h3>
                <p className="text-xs text-slate-400">যে কোনো কোর্স সিলেক্ট করে প্লেয়ার ওপেন করুন</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3"
                  >
                    <h4 className="font-bold text-sm text-white">{course.title}</h4>
                    <p className="text-xs text-slate-400">{course.curriculum.flatMap((c) => c.lessons).length}টি ভিডিও লেকচার উপলব্ধ</p>
                    <button
                      onClick={() => setLearningCourseId(course.id)}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>ভিডিও প্লেয়ার খুলুন</span>
                    </button>
                  </div>
                ))}
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
                    {user.fullName.charAt(0)}
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
                  <p>কোর্স: বেসিক ও ক্লিনিক্যাল হোমিওপ্যাথি</p>
                  <p>প্রশিক্ষক: ডাঃ মোঃ গিয়াস উদ্দিন</p>
                  <p>মেয়াদ: ২০২৬ ব্যাচ</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PTF CERTIFICATE & COURIER DISPATCH */}
          {activeTab === 'certificate' && (
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
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
