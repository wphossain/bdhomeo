'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { toBanglaNumber, formatTaka, copyToClipboard } from '@/lib/utils';
import { CreditCard, Copy, Check, Send, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface MonthlyFeeStatusProps {
  courseId: string;
}

export function MonthlyFeeStatus({ courseId }: MonthlyFeeStatusProps) {
  const { user, courses, settings, monthlyPayments, submitMonthlyPayment } = useApp();
  const currentCourse = courses.find((c) => c.id === courseId) || courses[0];

  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad'>('bkash');
  const [senderPhone, setSenderPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Bengali Month Names
  const banglaMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];
  const currentMonthName = banglaMonths[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  // Find payment for current month
  const currentMonthPayment = monthlyPayments.find(
    (p) => p.studentId === user?.id && p.courseId === courseId && p.monthName.includes(currentMonthName)
  );

  const isPaid = currentMonthPayment?.status === 'approved';
  const isPending = currentMonthPayment?.status === 'pending';

  const handleCopy = async (num: string) => {
    const ok = await copyToClipboard(num.replace(/[^0-9]/g, ''));
    if (ok) {
      setCopiedNumber(num);
      setTimeout(() => setCopiedNumber(null), 2500);
    }
  };

  const handleMonthlySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId || !senderPhone) return;

    setIsSubmitting(true);
    const success = await submitMonthlyPayment({
      courseId,
      monthName: `${currentMonthName} ${currentYear}`,
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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-bangla space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-700" />
            মাসিক ফি স্ট্যাটাস (মাসিক ৫০০/- টাকা)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            প্রতি ইংরেজি মাসের ১ থেকে ৩ তারিখের মধ্যে পরিশোধযোগ্য (সর্বোচ্চ ৫ তারিখ)
          </p>
        </div>

        {/* Current Status Pill */}
        <div>
          {isPaid ? (
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              চলতি মাসের ফি পরিশোধিত
            </span>
          ) : isPending ? (
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-300">
              <Clock className="w-4 h-4 text-amber-600 animate-spin" />
              ফি যাচাইকরণ চলছে
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-rose-200">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              চলতি মাসের ফি অপরিশোধিত
            </span>
          )}
        </div>
      </div>

      {/* Main Info Card */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            {currentMonthName} {toBanglaNumber(currentYear)} এর মাসিক ফি ৫০০/- টাকা পরিশোধ করুন
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            টাকা পাঠিয়ে TrxID দিলে ক্লাসরুম এক্সেস নিরবচ্ছিন্ন থাকবে।
          </p>
        </div>

        {!isPaid && (
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow transition shrink-0"
          >
            {isFormOpen ? 'ফর্ম বন্ধ করুন' : 'ফি পরিশোধ ফর্ম খুলুন'}
          </button>
        )}
      </div>

      {/* Dropdown Payment Form */}
      {isFormOpen && (
        <div className="bg-emerald-50/50 rounded-2xl p-6 border-2 border-emerald-300 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* bKash Box */}
            <div className="p-3.5 rounded-2xl bg-white border border-pink-200 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[11px] font-bold text-pink-700 uppercase">বিকাশ ({settings.bkashType})</span>
                <p className="text-sm font-black font-mono text-pink-950">{settings.bkashNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(settings.bkashNumber)}
                className="text-xs font-bold text-pink-700 bg-pink-50 hover:bg-pink-100 px-3 py-1.5 rounded-xl border border-pink-200 transition flex items-center gap-1"
              >
                {copiedNumber === settings.bkashNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedNumber === settings.bkashNumber ? 'কপি হয়েছে' : 'কপি'}</span>
              </button>
            </div>

            {/* Nagad Box */}
            <div className="p-3.5 rounded-2xl bg-white border border-orange-200 flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[11px] font-bold text-orange-700 uppercase">নগদ ({settings.nagadType})</span>
                <p className="text-sm font-black font-mono text-orange-950">{settings.nagadNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(settings.nagadNumber)}
                className="text-xs font-bold text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-xl border border-orange-200 transition flex items-center gap-1"
              >
                {copiedNumber === settings.nagadNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedNumber === settings.nagadNumber ? 'কপি হয়েছে' : 'কপি'}</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleMonthlySubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  যে নম্বর থেকে ৫০০/- টাকা পাঠিয়েছেন <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="যেমন: 017XXXXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 text-sm outline-none bg-white"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 text-sm outline-none font-mono uppercase bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'ফি সাবমিট হচ্ছে...' : 'মাসিক ৫০০/- ফি সাবমিট করুন'}</span>
            </button>
          </form>

        </div>
      )}

    </div>
  );
}