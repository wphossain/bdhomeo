'use client';

import React, { useState } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
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
  ChevronDown,
  ShieldCheck,
  User,
  LogIn,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { courses, settings, user, submitEnrollment, signInWithGoogle, showToast } = useApp();
  const slug = params?.slug as string;

  const course = courses.find((c) => c.slug === slug || (slug === 'advance-clinical-repertory' && c.slug === 'advanced-clinical-repertory') || (slug === 'advanced-clinical-repertory' && c.slug === 'advance-clinical-repertory'));

  // If slug is invalid, render official 404 page
  if (!course) {
    notFound();
  }

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
      showToast('ভর্তি সম্পন্ন করতে প্রথমে Google দিয়ে সাইন-ইন করুন', 'error');
      signInWithGoogle();
      return;
    }

    if (!senderPhone || !trxId) {
      showToast('মোবাইল নম্বর ও TrxID উভয় ফিল্ড পূরণ করুন', 'error');
      return;
    }

    setIsSubmitting(true);
    const success = await submitEnrollment({
      courseId: course.id,
      trxId: trxId.trim().toUpperCase(),
      senderPhone: senderPhone.trim(),
      studentPhone: senderPhone.trim(),
      paymentMethod,
    });
    setIsSubmitting(false);

    if (success) {
      router.push('/dashboard');
    }
  };

  const targetBkash = settings.bkashNumber;
  const targetNagad = settings.nagadNumber;

  return (
    <div className="bg-slate-50 min-h-screen font-bangla pb-20">
      
      {/* Course Header Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white py-14 lg:py-20 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3.5 py-1 rounded-full border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>৬ মাসের মাস্টার সার্টিফিকেট কোর্স</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {course.subtitle}
              </p>

              {/* USP Strip */}
              <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-emerald-200">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{toBanglaNumber(course.durationMonths)} মাস মেয়াদী</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{course.liveSchedule}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>PTF অনুমোদিত সনদ</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-full aspect-video sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/40 bg-slate-900">
                <Image
                  src={course.thumbnailUrl}
                  alt={course.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 350px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Curriculum & Features */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Highlights Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                কোর্সের প্রধান সুবিধাসমূহ
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-700">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Accordion */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                পূর্ণাঙ্গ কোর্স সিলেবাস ও পাঠ পরিকল্পনা
              </h3>

              <div className="space-y-3">
                {course.curriculum.map((chapter) => {
                  const isOpen = openChapter === chapter.id;
                  return (
                    <div key={chapter.id} className="border border-slate-200 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenChapter(isOpen ? null : chapter.id)}
                        className="w-full p-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left transition font-bold text-xs sm:text-sm text-slate-900"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-mono">
                            {chapter.chapterNo}
                          </span>
                          <span>{chapter.title}</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="p-4 space-y-2.5 bg-white divide-y divide-slate-100">
                          {chapter.lessons.map((lesson) => (
                            <div key={lesson.id} className="pt-2 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <Video className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span className="font-semibold text-slate-800">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {lesson.isFreePreview ? (
                                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                                    ফ্রি প্রভিউ
                                  </span>
                                ) : (
                                  <Lock className="w-3 h-3 text-slate-400" />
                                )}
                                <span className="text-slate-400 font-mono text-[11px]">{lesson.durationMin} মিনিট</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Seamless Admission Checkout Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-2xl space-y-6">
              
              {/* Pricing Header */}
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <span className="text-[11px] font-black uppercase text-amber-600 tracking-wider">
                  এককালীন ভর্তি ফি
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 font-mono">
                    {formatTaka(course.admissionFee)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    (মাসিক ফি ৫০০/- টাকা)
                  </span>
                </div>
              </div>

              {/* ========================================================= */}
              {/* STEP 1: AUTHENTICATION CHECK GATEWAY                      */}
              {/* ========================================================= */}
              {!user ? (
                <div className="bg-emerald-50/80 rounded-2xl p-5 border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <LogIn className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-black text-slate-900">
                      ভর্তি হতে প্রথমে সাইন-ইন করুন
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      গুগল সাইন-ইন করলে আপনার ভর্তি আবেদন ও পেমেন্ট সরাসরি আপনার ভার্চুয়াল স্টুডেন্ট আইডি ও ক্লাসরুমের সাথে স্বয়ংক্রিয়ভাবে যুক্ত হবে।
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    className="w-full flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
                    </svg>
                    <span>Google দিয়ে এক ক্লিকে সাইন-ইন করুন</span>
                  </button>

                  <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-semibold">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>নিরাপদ একাউন্ট</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>তাৎক্ষণিক ক্লাসরুম আইডি</span>
                    </span>
                  </div>
                </div>
              ) : (
                /* ========================================================= */
                /* STEP 2: VERIFIED USER & UNLOCKED ADMISSION PAYMENT FORM    */
                /* ========================================================= */
                <div className="space-y-6">
                  
                  {/* Verified Student Badge */}
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs shrink-0">
                        {user.avatarUrl ? (
                          <Image src={user.avatarUrl} alt={user.fullName} width={36} height={36} className="rounded-full object-cover" />
                        ) : (
                          user.fullName.charAt(0)
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.fullName}</p>
                        <p className="text-[10px] text-slate-500 truncate font-mono">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded shrink-0">
                      লগইন আছে ✅
                    </span>
                  </div>

                  {/* Payment Instructions Box */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-slate-800 block">
                      পেমেন্ট পাঠানোর অফিসিয়াল নম্বর:
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('bkash')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                          paymentMethod === 'bkash'
                            ? 'bg-pink-600 text-white shadow'
                            : 'bg-white border border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>বিকাশ ({settings.bkashType})</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('nagad')}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                          paymentMethod === 'nagad'
                            ? 'bg-orange-600 text-white shadow'
                            : 'bg-white border border-slate-200 text-slate-700'
                        }`}
                      >
                        <span>নগদ ({settings.nagadType})</span>
                      </button>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-bold">
                          {paymentMethod === 'bkash' ? 'বিকাশ মার্চেন্ট নম্বর (Payment অপশন)' : 'নগদ পার্সোনাল নম্বর (Send Money)'}
                        </span>
                        <span className="font-mono font-black text-sm text-slate-900">
                          {paymentMethod === 'bkash' ? targetBkash : targetNagad}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(paymentMethod === 'bkash' ? targetBkash : targetNagad)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                        title="নম্বর কপি করুন"
                      >
                        {copiedNumber ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-tight">
                      💡 বিকাশ অ্যাপের <strong>Payment</strong> অপশনে অথবা নগদ থেকে Send Money করে TrxID নিচে বসান।
                    </p>
                  </div>

                  {/* Submission Form */}
                  <form onSubmit={handleEnrollSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        যে নম্বর থেকে টাকা পাঠিয়েছেন (Sender Mobile) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-600 focus:bg-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        লেনদেনের ট্রানজেকশন আইডি (TrxID) *
                      </label>
                      <input
                        type="text"
                        required
                        value={trxId}
                        onChange={(e) => setTrxId(e.target.value.toUpperCase())}
                        placeholder="যেমন: BLG74H92XP"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-600 focus:bg-white font-mono uppercase"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-black text-xs py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'যাচাই ও জমা হচ্ছে...' : 'ভর্তি আবেদন নিশ্চিত করুন'}</span>
                    </button>
                  </form>

                </div>
              )}

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
