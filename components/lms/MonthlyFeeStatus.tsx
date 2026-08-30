'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { toBanglaNumber, formatTaka, copyToClipboard } from '@/lib/utils';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  Copy, 
  Check, 
  Calendar,
  Sparkles
} from 'lucide-react';

interface MonthlyFeeStatusProps {
  courseId: string;
}

export function MonthlyFeeStatus({ courseId }: MonthlyFeeStatusProps) {
  const { user, settings, monthlyPayments, submitMonthlyPayment } = useApp();
  
  const currentMonthName = 'ভাদ্র / সেপ্টেম্বর ২০২৬';
  const [trxId, setTrxId] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad'>('bkash');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayForm, setShowPayForm] = useState(false);

  // Find latest payment for this month & course
  const currentPayment = monthlyPayments.find(
    (p) => p.studentId === user?.id && p.courseId === courseId
  );

  const handleCopy = async (num: string) => {
    const ok = await copyToClipboard(num.replace(/[^0-9]/g, ''));
    if (ok) {
      setCopiedNumber(num);
      setTimeout(() => setCopiedNumber(null), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId || !senderPhone) return;

    setIsSubmitting(true);
    const ok = await submitMonthlyPayment({
      courseId,
      monthName: currentMonthName,
      trxId,
      senderPhone,
      paymentMethod,
    });
    setIsSubmitting(false);
    if (ok) {
      setShowPayForm(false);
      setTrxId('');
      setSenderPhone('');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-bangla space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-black text-slate-900">
              মাসিক ফি স্ট্যাটাস (মাসিক ৫০০/- টাকা)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            প্রতি ইংরেজি মাসের ১ থেকে ৩ তারিখের মধ্যে পরিশোধযোগ্য (সর্বোচ্চ ৫ তারিখ)
          </p>
        </div>

        {/* Status Badge */}
        <div>
          {currentPayment?.status === 'approved' ? (
            <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              এই মাসের ফি পরিশোধিত (Approved)
            </span>
          ) : currentPayment?.status === 'pending' ? (
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-200">
              <Clock className="w-4 h-4 text-amber-600 animate-spin" />
              যাচাই চলছে (Pending)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-800 text-xs font-bold px-3.5 py-1.5 rounded-full border border-rose-200">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              চলতি মাসের ফি অপরিশোধিত
            </span>
          )}
        </div>
      </div>

      {/* Action to Toggle Submission Form */}
      {currentPayment?.status !== 'approved' && !showPayForm && (
        <div className="flex items-center justify-between bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-emerald-950">
              {currentMonthName} এর মাসিক ফি ৫০০/- টাকা পরিশোধ করুন
            </p>
            <p className="text-[11px] text-slate-600">
              টাকা পাঠিয়ে TrxID দিলে ক্লাসরুম এক্সেস নিরবচ্ছিন্ন থাকবে।
            </p>
          </div>
          <button
            onClick={() => setShowPayForm(true)}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
          >
            ফি পরিশোধ ফর্ম খুলুন
          </button>
        </div>
      )}

      {/* Submission Form */}
      {showPayForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* bKash */}
            <div className="p-3 bg-white rounded-xl border border-pink-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-pink-700 uppercase">বিকাশ ({settings.bkashType})</span>
                <p className="text-xs font-black font-mono">{settings.bkashNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(settings.bkashNumber)}
                className="text-[11px] text-pink-700 bg-pink-50 hover:bg-pink-100 px-2 py-1 rounded-lg border border-pink-200 transition flex items-center gap-1"
              >
                {copiedNumber === settings.bkashNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedNumber === settings.bkashNumber ? 'কপি' : 'কপি'}</span>
              </button>
            </div>

            {/* Nagad */}
            <div className="p-3 bg-white rounded-xl border border-orange-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-orange-700 uppercase">নগদ ({settings.nagadType})</span>
                <p className="text-xs font-black font-mono">{settings.nagadNumber}</p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(settings.nagadNumber)}
                className="text-[11px] text-orange-700 bg-orange-50 hover:bg-orange-100 px-2 py-1 rounded-lg border border-orange-200 transition flex items-center gap-1"
              >
                {copiedNumber === settings.nagadNumber ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedNumber === settings.nagadNumber ? 'কপি' : 'কপি'}</span>
              </button>
            </div>
          </div>

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
                placeholder="017XXXXXXXX"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-emerald-600 bg-white"
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
                placeholder="9J87K2MP"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none focus:border-emerald-600 bg-white font-mono uppercase"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'জমা হচ্ছে...' : 'পেমেন্ট ইনফো সাবমিট করুন'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowPayForm(false)}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-3 py-2"
            >
              বাতিল
            </button>
          </div>

        </form>
      )}

    </div>
  );
}