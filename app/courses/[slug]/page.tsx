'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { toBanglaNumber, formatTaka, copyToClipboard } from '@/lib/utils';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  BookOpen, 
  Award, 
  Flame, 
  Sparkles, 
  Copy, 
  Check, 
  Send,
  Video,
  FileText,
  Lock,
  ChevronDown
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { courses, settings, user, submitEnrollment, signInWithGoogle } = useApp();
  const slug = params?.slug as string;

  const course = courses.find((c) => c.slug === slug) || courses[0];
  const isAdvance = course.batchType === 'advance';

  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad'>('bkash');
  const [senderPhone, setSenderPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openChapter, setOpenChapter] = useState<string | null>('c1');

  const handleCopy = async (num: string) => {
    const ok = await copyToClipboard(num.replace(/[^0-9]/g, ''));
    if (ok) {
      setCopiedNumber(num);
      setTimeout(() => setCopiedNumber(null), 2500);
    }
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('দয়া করে প্রথমে লগইন করুন।');
      return;
    }
    if (!trxId || !senderPhone) return;

    setIsSubmitting(true);
    const success = await submitEnrollment({
      courseId: course.id,
      trxId,
      senderPhone,
      paymentMethod,
    });
    setIsSubmitting(false);

    if (success) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-bangla pb-20">
      
      {/* Course Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-950 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-500/30">
                <BookOpen className="w-4 h-4" />
                {isAdvance ? 'উচ্চতর মাস্টার কোর্স' : 'ফাউন্ডেশন কোর্স'}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
                {course.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-emerald-200 pt-2">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>মেয়াদ: {toBanglaNumber(course.durationMonths)} মাস</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{course.liveSchedule}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>PTF সার্টিফিকেট সহ</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-600/40 bg-emerald-950">
                <Image
                  src={course.thumbnailUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Syllabus & Details */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                কোর্স সম্পর্কে বিস্তারিত
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                {course.description}
              </p>

              {course.morningSupport && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold flex items-center gap-3">
                  <Flame className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>{course.morningSupport}</span>
                </div>
              )}
            </div>

            {/* Curriculum Accordion */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-xl font-bold text-slate-900">
                  ৬ মাসের পূর্ণাঙ্গ পাঠ্যসূচি (Syllabus)
                </h2>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {toBanglaNumber(course.curriculum.length)} টি অধ্যায়
                </span>
              </div>

              <div className="space-y-3">
                {course.curriculum.map((chapter) => {
                  const isOpen = openChapter === chapter.id;

                  return (
                    <div
                      key={chapter.id}
                      className="border border-slate-200 rounded-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenChapter(isOpen ? null : chapter.id)}
                        className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-emerald-50/50 text-left transition font-bold text-slate-900 text-sm gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-emerald-700 text-white text-xs flex items-center justify-center font-mono">
                            {chapter.chapterNo}
                          </span>
                          <span>{chapter.title}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-emerald-700 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-white border-t border-slate-100 space-y-2.5">
                          {chapter.description && (
                            <p className="text-xs text-slate-500 italic mb-2">
                              {chapter.description}
                            </p>
                          )}
                          <div className="space-y-2">
                            {chapter.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 text-xs font-medium text-slate-800 transition"
                              >
                                <div className="flex items-center gap-2.5">
                                  <Video className="w-4 h-4 text-emerald-600 shrink-0" />
                                  <span>{lesson.title}</span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {lesson.isFreePreview ? (
                                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                                      ফ্রি ডেমো
                                    </span>
                                  ) : (
                                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                                  )}
                                  <span className="text-slate-400 font-mono text-[11px]">{toBanglaNumber(lesson.durationMin)} মিনিট</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Enrollment & bKash/Nagad Payment Box */}
          <div id="enroll" className="lg:col-span-5 sticky top-24 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-xl space-y-6">
              
              <div className="space-y-2">
                <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                  সরাসরি ভর্তি প্রক্রিয়া
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  কোর্সে ভর্তি নিশ্চিত করুন
                </h3>
              </div>

              {/* Price Summary */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold text-slate-600">ভর্তি ফি (এককালীন):</span>
                  <span className="text-2xl font-black text-emerald-950">
                    {formatTaka(course.admissionFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 border-t border-emerald-200/60 pt-2">
                  <span>মাসিক ফি:</span>
                  <span className="font-bold text-amber-700">{formatTaka(course.monthlyFee)} / প্রতি মাস</span>
                </div>
              </div>

              {/* Payment Instructions & Number copy */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-800">
                  💳 নিচের যেকোনো নম্বরে ভর্তি ফি ১,০০০/- টাকা Send Money করুন:
                </p>

                {/* bKash */}
                <div className="p-3.5 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-pink-700 uppercase">বিকাশ ({settings.bkashType})</span>
                    <p className="text-sm font-black font-mono text-pink-950">{settings.bkashNumber}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(settings.bkashNumber)}
                    className="text-xs font-bold text-pink-700 bg-white hover:bg-pink-100 px-3 py-1.5 rounded-xl border border-pink-300 transition flex items-center gap-1.5"
                  >
                    {copiedNumber === settings.bkashNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNumber === settings.bkashNumber ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                  </button>
                </div>

                {/* Nagad */}
                <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-orange-700 uppercase">নগদ ({settings.nagadType})</span>
                    <p className="text-sm font-black font-mono text-orange-950">{settings.nagadNumber}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(settings.nagadNumber)}
                    className="text-xs font-bold text-orange-700 bg-white hover:bg-orange-100 px-3 py-1.5 rounded-xl border border-orange-300 transition flex items-center gap-1.5"
                  >
                    {copiedNumber === settings.nagadNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNumber === settings.nagadNumber ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                  </button>
                </div>
              </div>

              {/* Enrollment Form or Login Prompt */}
              {user ? (
                <form onSubmit={handleEnrollSubmit} className="space-y-4 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      যে বিকাশ/নগদ নম্বর থেকে টাকা পাঠিয়েছেন <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder="যেমন: 017XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ট্রানজেকশন আইডি (TrxID) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      placeholder="যেমন: 9J87K2MP"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 text-sm outline-none font-mono uppercase"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'ভর্তি প্রসেসিং হচ্ছে...' : 'ভর্তির আবেদন সাবমিট করুন'}</span>
                  </button>
                </form>
              ) : (
                <div className="pt-2 border-t border-slate-100 space-y-3 text-center">
                  <p className="text-xs text-slate-600">
                    ভর্তির আবেদন সাবমিট করার জন্য অনুগ্রহ করে গুগল দিয়ে লগইন করুন:
                  </p>
                  <button
                    onClick={signInWithGoogle}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3.5 rounded-xl shadow transition"
                  >
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
                    </svg>
                    <span>Google দিয়ে লগইন করে ভর্তি হন</span>
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}