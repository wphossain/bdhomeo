'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { CreditCard, CheckCircle2, Clock, AlertCircle, Copy, Check, Send, Sparkles } from 'lucide-react';
import { toBanglaNumber } from '@/lib/utils';

interface MonthlyFeeStatusProps {
  courseId?: string;
}

export function MonthlyFeeStatus({ courseId = 'course-basic-foundation' }: MonthlyFeeStatusProps) {
  const { user, courses, monthlyPayments, settings, submitMonthlyPayment } = useApp();
  const [trxId, setTrxId] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad'>('bkash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const currentCourse = courses.find((c) => c.id === courseId) || courses[0];
  const targetCourseId = currentCourse?.id || 'course-basic-foundation';

  const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  const currentMonthIdx = new Date().getMonth();
  const currentMonthName = months[currentMonthIdx];
  const currentYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(`${currentMonthName} ${currentYear}`);

  const existingPayment = monthlyPayments.find(
    (p) => p.studentId === user?.id && p.courseId === targetCourseId && p.monthName === selectedMonth
  );

  const isPaid = existingPayment?.status === 'approved';
  const isPending = existingPayment?.status === 'pending';

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num.replace(/[^0-9]/g, ''));
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const handleMonthlySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId || !senderPhone) return;

    setIsSubmitting(true);
    const success = await submitMonthlyPayment({
      courseId: targetCourseId,
      monthName: selectedMonth,
      trxId,
      senderPhone,
      paymentMethod,
    });
    setIsSubmitting(false);

    if (success) {
      setTrxId('');
      setSenderPhone('');
      setIsFormOpen(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 font-bangla">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-400" />
            মাসিক ফি স্ট্যাটাস ও ট্রানজেকশন (মাসিক ৫০০/- টাকা)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            প্রতি ইংরেজি মাসের ১ থেকে ৩ তারিখের মধ্যে পরিশোধের অনুরোধ (সর্বোচ্চ ৫ তারিখ)
          </p>
        </div>

        {/* Current Status Pill */}
        <div>
          {isPaid ? (
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black px-4 py-2 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {selectedMonth} মাসের ফি পরিশোধিত
            </span>
          ) : isPending ? (
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 text-amber-400 animate-spin" />
              ফি যাচাইকরণ চলমান
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-black px-4 py-2 rounded-full">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              {selectedMonth} মাসের ফি অপরিশোধিত
            </span>
          )}
        </div>
      </div>

      {/* Month Selector & Trigger Card */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <label className="text-xs text-slate-400 font-bold block">ফি প্রদানের মাস সিলেক্ট করুন:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs font-bold focus:ring-2 focus:ring-emerald-500"
          >
            {months.map((m) => (
              <option key={m} value={`${m} ${currentYear}`}>
                {m} {toBanglaNumber(currentYear)}
              </option>
            ))}
          </select>
        </div>

        {!isPaid && (
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition shrink-0"
          >
            {isFormOpen ? 'ফর্ম বন্ধ করুন' : '৫০০/- টাকা ফি পরিশোধ করুন'}
          </button>
        )}
      </div>

      {/* Dropdown Payment Form */}
      {isFormOpen && (
        <div className="bg-slate-950 rounded-2xl p-6 border-2 border-emerald-500/40 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* bKash Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-pink-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-pink-400 uppercase">বিকাশ ({settings.bkashType} Payment)</span>
                <p className="text-sm font-black font-mono text-white mt-0.5">{settings.bkashNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(settings.bkashNumber)}
                className="text-xs font-bold text-pink-400 bg-pink-500/10 hover:bg-pink-500/20 px-3 py-1.5 rounded-xl border border-pink-500/30 transition flex items-center gap-1"
              >
                {copiedNumber === settings.bkashNumber ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedNumber === settings.bkashNumber ? 'কপি হয়েছে' : 'কপি নম্বর'}</span>
              </button>
            </div>

            {/* Nagad Box */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-orange-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-orange-400 uppercase">নগদ ({settings.nagadType})</span>
                <p className="text-sm font-black font-mono text-white mt-0.5">{settings.nagadNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(settings.nagadNumber)}
                className="text-xs font-bold text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 px-3 py-1.5 rounded-xl border border-orange-500/30 transition flex items-center gap-1"
              >
                {copiedNumber === settings.nagadNumber ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedNumber === settings.nagadNumber ? 'কপি হয়েছে' : 'কপি নম্বর'}</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleMonthlySubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  যে নম্বর থেকে ৫০০/- টাকা পেমেন্ট করেছেন <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="যেমন: 017XXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-emerald-500 text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  ট্রানজেকশন আইডি (TrxID) <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  placeholder="যেমন: 9J87K2MP"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-emerald-500 text-xs outline-none font-mono uppercase"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'ফি সাবমিট হচ্ছে...' : `${selectedMonth} মাসের ৫০০/- টাকা ফি সাবমিট করুন`}</span>
            </button>
          </form>

        </div>
      )}

    </div>
  );
}