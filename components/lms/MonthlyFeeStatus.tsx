'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { CreditCard, CheckCircle2, Clock, AlertCircle, Copy, Check, Send, Sparkles } from 'lucide-react';
import { toBanglaNumber, formatTaka } from '@/lib/utils';

interface MonthlyFeeStatusProps {
  courseId?: string;
}

export function MonthlyFeeStatus({ courseId = 'course-basic-foundation' }: MonthlyFeeStatusProps) {
  const { user, courses, monthlyPayments, settings, submitMonthlyPayment, showToast } = useApp();
  const [trxId, setTrxId] = useState('');
  const [senderPhone, setSenderPhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad'>('bkash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const currentCourse = courses.find((c) => c.id === courseId) || courses[0];
  const targetCourseId = currentCourse?.id || 'course-basic-foundation';

  const months = [
    'জানুয়ারি ২০২৬',
    'ফেব্রুয়ারি ২০২৬',
    'মার্চ ২০২৬',
    'এপ্রিল ২০২৬',
    'মে ২০২৬',
    'জুন ২০২৬',
    'জুলাই ২০২৬',
    'আগস্ট ২০২৬',
    'সেপ্টেম্বর ২০২৬',
    'অক্টোবর ২০২৬',
    'নভেম্বর ২০২৬',
    'ডিসেম্বর ২০২৬'
  ];
  const currentMonthIdx = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIdx] || 'জানুয়ারি ২০২৬');

  const existingPayment = monthlyPayments.find(
    (p) => (p.studentId === user?.id || (user?.phone && p.studentPhone === user.phone) || (p.studentEmail && user?.email && p.studentEmail.toLowerCase() === user.email.toLowerCase())) &&
           p.courseId === targetCourseId &&
           p.monthName === selectedMonth
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
    if (!trxId || !senderPhone) {
      showToast('ট্রানজেকশন আইডি ও মোবাইল নম্বর প্রদান করুন', 'error');
      return;
    }

    setIsSubmitting(true);
    const ok = await submitMonthlyPayment({
      courseId: targetCourseId,
      monthName: selectedMonth,
      paymentMethod,
      senderPhone,
      trxId,
    });
    setIsSubmitting(false);

    if (ok) {
      setTrxId('');
      setIsFormOpen(false);
      showToast('মাসিক ফি পেমেন্ট সফলভাবে জমা হয়েছে!', 'success');
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 font-bangla text-slate-100 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-400" />
            <span>কোর্স মাসিক ফি ও পেমেন্ট হিস্ট্রি</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            প্রতি মাসের ৫ তারিখের মধ্যে মাসিক ফি (৳৫০০/-) পরিশোধ করুন।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-emerald-400 font-bold rounded-xl px-3.5 py-2 text-xs outline-none cursor-pointer"
          >
            {months.map((m) => (
              <option key={m} value={m} className="bg-slate-900 text-white">
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Month Status Card */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">নির্বাচিত মাস:</span>
            <span className="text-sm font-black text-white">{selectedMonth}</span>
          </div>
          <p className="text-xs text-slate-400">
            মাসিক ফি পরিমাণ: <strong className="text-amber-400 font-mono font-bold">৳{currentCourse?.monthlyFee || 500}/-</strong>
          </p>
        </div>

        <div>
          {isPaid ? (
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 font-bold px-4 py-2 rounded-xl text-xs border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
              পরিশোধিত ✓
            </span>
          ) : isPending ? (
            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 font-bold px-4 py-2 rounded-xl text-xs border border-amber-500/30 animate-pulse">
              <Clock className="w-4 h-4" />
              ভেরিফিকেশন অপেক্ষমান
            </span>
          ) : (
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition"
            >
              {isFormOpen ? 'ফর্ম বন্ধ করুন' : 'ফি পরিশোধ করুন'}
            </button>
          )}
        </div>
      </div>

      {/* Payment Form (If Not Paid) */}
      {isFormOpen && !isPaid && !isPending && (
        <form onSubmit={handleMonthlySubmit} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-5">
          <h4 className="text-sm font-black text-white border-b border-slate-800 pb-3">
            মোবাইল ব্যাংকিং পেমেন্ট সাবমিশন
          </h4>

          {/* Payment Account Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-pink-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-pink-400">bKash (বিকাশ মার্চেন্ট পেমেন্ট)</span>
                <button
                  type="button"
                  onClick={() => handleCopy(settings.bkashNumber)}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedNumber === settings.bkashNumber ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>কপি</span>
                </button>
              </div>
              <p className="text-sm font-mono font-bold text-white">{settings.bkashNumber}</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-orange-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-orange-400">Nagad (নগদ পার্সোনাল সেন্ড মানি)</span>
                <button
                  type="button"
                  onClick={() => handleCopy(settings.nagadNumber)}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                >
                  {copiedNumber === settings.nagadNumber ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>কপি</span>
                </button>
              </div>
              <p className="text-sm font-mono font-bold text-white">{settings.nagadNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">পেমেন্ট মেথড</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
              >
                <option value="bkash">বিকাশ (bKash Payment)</option>
                <option value="nagad">নগদ (Nagad Send Money)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">যে নম্বর থেকে টাকা পাঠিয়েছেন *</label>
              <input
                type="tel"
                required
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">TrxID / ট্রানজেকশন আইডি *</label>
              <input
                type="text"
                required
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
                placeholder="যেমন: BKL983949"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'জমা হচ্ছে...' : 'মাসিক ফি তথ্য সাবমিট করুন'}</span>
          </button>
        </form>
      )}

      {/* Student's Payment History Table */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-white">আমার অতীতের পেমেন্ট রেকর্ড</h4>
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-900/60">
                <th className="p-3.5">মাস</th>
                <th className="p-3.5">মেথড ও TrxID</th>
                <th className="p-3.5">পরিমাণ</th>
                <th className="p-3.5">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {monthlyPayments
                .filter((p) => p.studentId === user?.id || (user?.phone && p.studentPhone === user.phone) || (p.studentEmail && user?.email && p.studentEmail.toLowerCase() === user.email.toLowerCase()))
                .map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-900/30 transition">
                    <td className="p-3.5 font-bold text-white">{pay.monthName}</td>
                    <td className="p-3.5">
                      <span className="capitalize text-slate-300">{pay.paymentMethod}</span>
                      <span className="font-mono text-emerald-400 ml-2">{pay.trxId}</span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-white">{formatTaka(pay.amount || 500)}</td>
                    <td className="p-3.5">
                      {pay.status === 'approved' && <span className="text-emerald-400 font-bold">অনুমোদিত ✓</span>}
                      {pay.status === 'pending' && <span className="text-amber-400 font-bold">অপেক্ষমান...</span>}
                      {pay.status === 'rejected' && <span className="text-rose-400 font-bold">বাতিল</span>}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
