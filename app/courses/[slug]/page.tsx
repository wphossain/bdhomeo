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
  ChevronDown
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { courses, settings, user, submitEnrollment, signInWithGoogle, showToast } = useApp();
  const slug = params?.slug as string;

  const course = courses.find((c) => c.slug === slug);

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
      showToast('ভর্তি সম্পন্ন করতে প্রথমে সাইন-ইন করুন', 'error');
      signInWithGoogle();
      return;
    }

    setIsSubmitting(true);
    const success = await submitEnrollment({
      courseId: course.id,
      trxId,
      senderPhone,
      studentPhone: senderPhone,
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

          {/* Right Column: Admission & Fee Payment Sticky Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/40 shadow-xl space-y-6">
              
              <div className="space-y-1">
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

              {/* Payment Instructions */}
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
                      {paymentMethod === 'bkash' ? 'বিকাশ পেমেন্ট নম্বর' : 'নগদ পার্সোনাল নম্বর'}
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
                  💡 বিকাশ অ্যাপ থেকে <strong>Payment</strong> অপশনে অথবা নগদ থেকে Send Money করে TrxID নিচে বসান।
                </p>
              </div>

              {/* Admission Submission Form */}
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
                    onChange={(e) => setTrxId(e.target.value)}
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
                  <span>{isSubmitting ? 'জমা হচ্ছে...' : 'ভর্তি আবেদন সাবমিট করুন'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
