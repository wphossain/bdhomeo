'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { GoogleMeetLauncher } from '@/components/lms/GoogleMeetLauncher';
import { MorningSupportBox } from '@/components/lms/MorningSupportBox';
import { MonthlyFeeStatus } from '@/components/lms/MonthlyFeeStatus';
import { VideoPlayer } from '@/components/lms/VideoPlayer';
import { PDFList } from '@/components/lms/PDFList';
import { 
  BookOpen, 
  Video, 
  FileText, 
  CheckCircle2, 
  Lock, 
  Clock, 
  Sparkles, 
  User, 
  AlertCircle,
  LogIn,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, courses, enrollments, signInWithGoogle, demoLogin } = useApp();

  // Selected active course
  const [selectedCourseId, setSelectedCourseId] = useState<string>(courses[0].id);
  const [activeLessonId, setActiveLessonId] = useState<string>('l1');
  const [completedLessons, setCompletedLessons] = useState<string[]>(['l1']);

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50 font-bangla">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              শিক্ষার্থী ক্লাসরুমে প্রবেশ করুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              লাইভ ক্লাসের লিংক, আনলিস্টেড রেকর্ডেড লেকচার ও পিডিএফ নোট দেখতে অনুগ্রহ করে গুগল দিয়ে লগইন করুন।
            </p>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3.5 rounded-xl shadow-md transition"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
            </svg>
            <span>Google দিয়ে ১-ক্লিকে লগইন</span>
          </button>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] text-slate-400 mb-2">অথবা ডেমো একাউন্ট ব্যবহার করুন:</p>
            <button
              onClick={() => demoLogin('student')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-lg transition"
            >
              Demo Student হিসেবে লগইন করুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activeCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const isAdvance = activeCourse.batchType === 'advance';

  // Check enrollment status
  const userEnrollment = enrollments.find(
    (e) => (e.studentId === user.id || user.role === 'admin') && e.courseId === activeCourse.id
  );
  const isApproved = user.role === 'admin' || userEnrollment?.admissionStatus === 'approved';
  const isPending = userEnrollment?.admissionStatus === 'pending';

  // Find all lessons for active course
  const allLessons = activeCourse.curriculum.flatMap((c) => c.lessons);
  const currentLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];

  // All PDFs for active course
  const allPdfs = activeCourse.curriculum.flatMap((c) =>
    c.lessons
      .filter((l) => l.pdfNotesTitle)
      .map((l) => ({
        id: `pdf-${l.id}`,
        title: l.pdfNotesTitle || `${l.title}.pdf`,
        chapterTitle: c.title,
        pdfUrl: l.pdfNotesUrl,
      }))
  );

  const toggleComplete = (id: string) => {
    if (completedLessons.includes(id)) {
      setCompletedLessons(completedLessons.filter((i) => i !== id));
    } else {
      setCompletedLessons([...completedLessons, id]);
    }
  };

  const progressPercentage = Math.round(
    (completedLessons.filter((id) => allLessons.some((l) => l.id === id)).length / allLessons.length) * 100
  );

  return (
    <div className="bg-slate-100 min-h-screen font-bangla pb-20">
      
      {/* Top Student Header */}
      <div className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white font-bold text-lg flex items-center justify-center shadow-inner">
              {user.avatarUrl ? (
                <Image src={user.avatarUrl} alt={user.fullName} width={48} height={48} className="rounded-2xl" />
              ) : (
                user.fullName.charAt(0)
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {user.fullName}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  {user.role === 'admin' ? 'অ্যাডমিন' : 'শিক্ষার্থী ড্যাশবোর্ড'}
                </span>
              </div>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
          </div>

          {/* Batch Selector Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start md:self-auto">
            {courses.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCourseId(c.id);
                  setActiveLessonId(c.curriculum[0]?.lessons[0]?.id || 'l1');
                }}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition ${
                  selectedCourseId === c.id
                    ? 'bg-white text-emerald-900 shadow-sm'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                {c.batchType === 'advance' ? 'এডভান্সড ব্যাচ' : 'বেসিক ব্যাচ'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* 1. Live Class Google Meet Launcher */}
        <GoogleMeetLauncher batchType={activeCourse.batchType} />

        {/* 2. Advance Batch Morning Support Box */}
        {isAdvance && <MorningSupportBox />}

        {/* 3. Enrollment Status Alert if not approved */}
        {!isApproved && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-black text-base">
                <AlertCircle className="w-5 h-5 text-amber-700" />
                <span>
                  {isPending ? 'ভর্তির আবেদন ভেরিফিকেশন চলছে' : 'এই কোর্সে আপনি এখনো ভর্তি হননি'}
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                {isPending
                  ? 'আপনার দেওয়া বিকাশ/নগদ TrxID যাচাই করা হচ্ছে। স্যার অনুমোদন দিলেই পেইড লেকচার ও পিডিএফ স্বয়ংক্রিয়ভাবে আনলক হয়ে যাবে।'
                  : 'ক্লাসরুমের সকল প্রিমিয়াম রেকর্ডেড ক্লাস ও পিডিএফ শিট আনলক করতে কোর্সটিতে ভর্তি হন।'}
              </p>
            </div>
            {!isPending && (
              <Link
                href={`/courses/${activeCourse.slug}#enroll`}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow transition shrink-0 text-center"
              >
                কোর্সে ভর্তি হন (৳১০০০/-)
              </Link>
            )}
          </div>
        )}

        {/* 4. Monthly Fee Tracker */}
        <MonthlyFeeStatus courseId={activeCourse.id} />

        {/* 5. Battle-Tested LMS Classroom Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video & Lesson Content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Video Player */}
            {isApproved || currentLesson.isFreePreview ? (
              <VideoPlayer
                videoId={currentLesson.youtubeVideoId}
                title={currentLesson.title}
                isCompleted={completedLessons.includes(currentLesson.id)}
                onToggleComplete={() => toggleComplete(currentLesson.id)}
              />
            ) : (
              <div className="aspect-video w-full bg-slate-900 rounded-3xl flex flex-col items-center justify-center text-slate-300 p-8 text-center space-y-4 border border-slate-800">
                <Lock className="w-12 h-12 text-amber-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">এই ক্লাসটি লকড করা রয়েছে</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    কোর্সে ভর্তি এপ্রুভ হওয়ার পর এই ক্লাসের এইচডি ভিডিও ও পিডিএফ লেকচার শিট আনলক হবে।
                  </p>
                </div>
                <Link
                  href={`/courses/${activeCourse.slug}#enroll`}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow transition"
                >
                  ভর্তির আবেদন করুন
                </Link>
              </div>
            )}

            {/* PDF Notes Section for Active Course */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-700" />
                  অধ্যায়ভিত্তিক PDF লেকচার শিট ডাউনলোড সেন্টার
                </h3>
                <span className="text-xs font-bold text-slate-500 font-mono">
                  {allPdfs.length} টি ফাইল
                </span>
              </div>
              <PDFList items={allPdfs} />
            </div>

          </div>

          {/* Lesson Navigation Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 sticky top-24">
            
            {/* Course Progress */}
            <div className="space-y-2 pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700">কোর্স অগ্রগতি (Progress)</span>
                <span className="text-emerald-700 font-mono font-black">{progressPercentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Chapters & Lessons List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {activeCourse.curriculum.map((chapter) => (
                <div key={chapter.id} className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    অধ্যায় {chapter.chapterNo}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {chapter.title}
                  </h4>

                  <div className="space-y-1.5 pt-1">
                    {chapter.lessons.map((lesson) => {
                      const isActive = activeLessonId === lesson.id;
                      const isDone = completedLessons.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLessonId(lesson.id)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition text-xs ${
                            isActive
                              ? 'bg-emerald-700 text-white font-bold shadow-sm'
                              : 'bg-slate-50 hover:bg-emerald-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            {isDone ? (
                              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-300' : 'text-emerald-600'}`} />
                            ) : (
                              <Video className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-200' : 'text-slate-400'}`} />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>

                          {!isApproved && !lesson.isFreePreview && (
                            <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}