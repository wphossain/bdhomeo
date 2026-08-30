'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { MonthlyPayment } from '@/lib/types';
import { formatTaka } from '@/lib/utils';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Check, 
  Plus, 
  X,
  XCircle,
  AlertCircle
} from 'lucide-react';

export function MonthlyFeeApprovals() {
  const { monthlyPayments, courses, approveMonthlyPayment, rejectMonthlyPayment, addManualMonthlyPayment, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Manual Fee Form
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualCourseId, setManualCourseId] = useState(courses[0]?.id || 'course-basic-foundation');
  const [manualMonth, setManualMonth] = useState('জানুয়ারি ২০২৬');
  const [manualAmount, setManualAmount] = useState('500');
  const [manualMethod, setManualMethod] = useState<'bkash' | 'nagad' | 'cash'>('cash');
  const [manualTrxId, setManualTrxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const monthsList = [
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

  const filteredPayments = monthlyPayments.filter((pay) => {
    const matchesSearch =
      pay.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pay.studentPhone.includes(searchQuery) ||
      pay.trxId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pay.monthName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || pay.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = monthlyPayments.filter((p) => p.status === 'pending').length;
  const approvedCount = monthlyPayments.filter((p) => p.status === 'approved').length;

  const handleManualFeeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone) {
      showToast('শিক্ষার্থীর নাম ও ফোন নম্বর প্রদান করুন', 'error');
      return;
    }

    setIsSubmitting(true);
    const ok = await addManualMonthlyPayment({
      studentName: manualName,
      studentPhone: manualPhone,
      senderPhone: manualPhone,
      courseId: manualCourseId,
      monthName: manualMonth,
      amount: parseInt(manualAmount, 10) || 500,
      paymentMethod: manualMethod,
      trxId: manualTrxId || `CASH-${Date.now().toString().slice(-6)}`,
      status: 'approved',
    });
    setIsSubmitting(false);

    if (ok) {
      setIsManualModalOpen(false);
      setManualName('');
      setManualPhone('');
      setManualTrxId('');
    }
  };

  return (
    <div className="space-y-6 font-bangla text-slate-100">
      
      {/* Top Banner Stats & Manual Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-black text-white">
              ছাত্র মাসিক ফি অনুমোদন ও রেকর্ড (Monthly Fee Confirmation)
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            শিক্ষার্থীদের পাঠানো মাসিক ফি যাচাই, অনুমোদন এবং নতুন ফি ম্যানুয়ালি এন্ট্রি করুন।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400">পেন্ডিং:</span>
            <span className="font-bold text-amber-400 font-mono">{pendingCount} টি</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400">অনুমোদিত:</span>
            <span className="font-bold text-emerald-400 font-mono">{approvedCount} টি</span>
          </div>

          <button
            onClick={() => setIsManualModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>ম্যানুয়ালি ফি যোগ করুন</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম, ফোন নম্বর, TrxID বা মাস দিয়ে খুঁজুন..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st === 'all' && 'সকল পেমেন্ট'}
              {st === 'pending' && `অপেক্ষমান (${pendingCount})`}
              {st === 'approved' && 'অনুমোদিত'}
              {st === 'rejected' && 'বাতিল'}
            </button>
          ))}
        </div>
      </div>

      {/* Payment Records Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold">
                <th className="p-4">শিক্ষার্থীর নাম ও ফোন</th>
                <th className="p-4">কোর্স ও মাস</th>
                <th className="p-4">পেমেন্ট মেথড ও TrxID</th>
                <th className="p-4">পরিমাণ</th>
                <th className="p-4">তারিখ</th>
                <th className="p-4">স্ট্যাটাস</th>
                <th className="p-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    কোনো মাসিক ফি রেকর্ড পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredPayments.map((pay) => {
                  const course = courses.find((c) => c.id === pay.courseId);
                  return (
                    <tr key={pay.id} className="hover:bg-slate-950/40 transition">
                      <td className="p-4">
                        <div className="font-bold text-white">{pay.studentName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{pay.studentPhone}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-slate-300 font-medium">{course?.title || 'কোর্স'}</div>
                        <div className="text-[11px] text-amber-400 font-bold">{pay.monthName}</div>
                      </td>
                      <td className="p-4">
                        <span className="capitalize font-bold text-slate-300">{pay.paymentMethod}</span>
                        <div className="text-[11px] text-emerald-400 font-mono font-bold">{pay.trxId}</div>
                      </td>
                      <td className="p-4 font-mono font-bold text-white">
                        {formatTaka(pay.amount || 500)}
                      </td>
                      <td className="p-4 text-slate-400 text-[11px] font-mono">
                        {pay.createdAt ? new Date(pay.createdAt).toLocaleDateString('bn-BD') : '২০২৬'}
                      </td>
                      <td className="p-4">
                        {pay.status === 'approved' && (
                          <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3" />
                            অনুমোদিত
                          </span>
                        )}
                        {pay.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-amber-500/30 animate-pulse">
                            <Clock className="w-3 h-3" />
                            পেন্ডিং
                          </span>
                        )}
                        {pay.status === 'rejected' && (
                          <span className="inline-flex items-center gap-1 bg-rose-500/20 text-rose-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-rose-500/30">
                            <XCircle className="w-3 h-3" />
                            বাতিল
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {pay.status !== 'approved' && (
                            <button
                              onClick={() => approveMonthlyPayment(pay.id)}
                              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition shadow"
                              title="অনুমোদন করুন"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>অনুমোদন</span>
                            </button>
                          )}
                          {pay.status !== 'rejected' && (
                            <button
                              onClick={() => rejectMonthlyPayment(pay.id)}
                              className="inline-flex items-center gap-1 bg-rose-950 hover:bg-rose-900 text-rose-300 font-bold px-3 py-1.5 rounded-lg text-xs transition border border-rose-800/40"
                              title="বাতিল করুন"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>বাতিল</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Monthly Fee Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <span>ম্যানুয়ালি মাসিক ফি যোগ করুন</span>
              </h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualFeeSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">শিক্ষার্থীর পূর্ণ নাম *</label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="যেমন: ডাঃ মোঃ আশরাফুল ইসলাম"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">কোর্স</label>
                  <select
                    value={manualCourseId}
                    onChange={(e) => setManualCourseId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">কোন মাসের ফি</label>
                  <select
                    value={manualMonth}
                    onChange={(e) => setManualMonth(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    {monthsList.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">পেমেন্ট মেথড</label>
                  <select
                    value={manualMethod}
                    onChange={(e) => setManualMethod(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="bkash">বিকাশ (bKash)</option>
                    <option value="nagad">নগদ (Nagad)</option>
                    <option value="cash">সরাসরি ক্যাশ (Cash)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">পরিমাণ (৳)</label>
                  <input
                    type="number"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Transaction ID (ঐচ্ছিক)</label>
                <input
                  type="text"
                  value={manualTrxId}
                  onChange={(e) => setManualTrxId(e.target.value)}
                  placeholder="যেমন: BKL983949 বা খালি রাখুন"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition"
                >
                  {isSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'মাসিক ফি এন্ট্রি করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
