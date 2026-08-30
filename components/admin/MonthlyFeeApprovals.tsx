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
  const [manualMonth, setManualMonth] = useState('সেপ্টেম্বর ২০২৬');
  const [manualAmount, setManualAmount] = useState('500');
  const [manualMethod, setManualMethod] = useState<'bkash' | 'nagad' | 'cash'>('cash');
  const [manualTrxId, setManualTrxId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      showToast('শিক্ষার্থীর নাম ও ফোন নম্বর পূরণ করুন', 'error');
      return;
    }

    setIsSubmitting(true);
    const ok = await addManualMonthlyPayment({
      studentName: manualName,
      studentPhone: manualPhone,
      courseId: manualCourseId,
      monthName: manualMonth,
      amount: parseInt(manualAmount, 10) || 500,
      paymentMethod: manualMethod,
      senderPhone: manualPhone,
      trxId: manualTrxId,
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
    <div className="space-y-6 font-bangla">
      
      {/* Top Banner Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-black text-slate-900">
              মাসিক ফি কনফার্মেশন (Student Fee Confirmation)
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            শিক্ষার্থীদের ৫০০/- টাকার মাসিক ফি অনুমোদন, TrxID যাচাই ও ম্যানুয়াল ফি এন্ট্রি
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-xl border border-amber-200">
              অপেক্ষমান ফি: {pendingCount}
            </span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
              অনুমোদিত: {approvedCount}
            </span>
          </div>

          <button
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>ম্যানুয়ালি ফি রেকর্ড করুন</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম / ফোন / TrxID / মাস খুঁজুন..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600 focus:bg-white"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600"
        >
          <option value="all">সকল স্ট্যাটাস</option>
          <option value="pending">অপেক্ষমান (Pending)</option>
          <option value="approved">অনুমোদিত (Approved)</option>
          <option value="rejected">বাতিলকৃত (Rejected)</option>
        </select>
      </div>

      {/* Fee Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredPayments.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <CreditCard className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-600">কোনো মাসিক ফি রেকর্ড পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="p-4">শিক্ষার্থী</th>
                  <th className="p-4">কোর্স ও মাস</th>
                  <th className="p-4">পরিমাণ ও TrxID</th>
                  <th className="p-4">স্ট্যাটাস</th>
                  <th className="p-4 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 space-y-0.5">
                      <p className="font-bold text-slate-900">{pay.studentName}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{pay.studentPhone}</p>
                    </td>

                    <td className="p-4 space-y-0.5">
                      <span className="font-semibold text-slate-800 block">{pay.courseTitle}</span>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block border border-emerald-200">
                        {pay.monthName}
                      </span>
                    </td>

                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-slate-900">{formatTaka(pay.amount)}</span>
                        <span className="uppercase text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {pay.paymentMethod}
                        </span>
                      </div>
                      <div className="font-mono text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span className="text-slate-400 font-normal">TrxID:</span>
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{pay.trxId}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full ${
                          pay.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : pay.status === 'rejected'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {pay.status === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                        {pay.status === 'rejected' && <XCircle className="w-3 h-3" />}
                        {pay.status === 'pending' && <Clock className="w-3 h-3" />}
                        <span>
                          {pay.status === 'approved'
                            ? 'অনুমোদিত'
                            : pay.status === 'rejected'
                            ? 'বাতিলকৃত'
                            : 'অপেক্ষমান'}
                        </span>
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {pay.status === 'pending' && (
                          <>
                            <button
                              onClick={() => approveMonthlyPayment(pay.id)}
                              className="inline-flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow transition"
                              title="ফি অনুমোদন করুন"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>অনুমোদন</span>
                            </button>

                            <button
                              onClick={() => rejectMonthlyPayment(pay.id)}
                              className="inline-flex items-center gap-1 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs px-3 py-1.5 rounded-xl border border-rose-300 transition"
                              title="ফি বাতিল করুন"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>বাতিল</span>
                            </button>
                          </>
                        )}

                        {pay.status === 'approved' && (
                          <button
                            onClick={() => rejectMonthlyPayment(pay.id)}
                            className="text-[11px] text-rose-600 hover:underline font-semibold"
                          >
                            বাতিল করুন
                          </button>
                        )}

                        {pay.status === 'rejected' && (
                          <button
                            onClick={() => approveMonthlyPayment(pay.id)}
                            className="text-[11px] text-emerald-700 hover:underline font-semibold"
                          >
                            পুনরায় অনুমোদন
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Manual Monthly Fee Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900">ম্যানুয়ালি মাসিক ফি রেকর্ড করুন</h3>
              </div>
              <button onClick={() => setIsManualModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualFeeSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">শিক্ষার্থীর নাম *</label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="ডাঃ মোঃ আশরাফুল ইসলাম"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">কোর্স</label>
                  <select
                    value={manualCourseId}
                    onChange={(e) => setManualCourseId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">কোন মাসের ফি?</label>
                  <input
                    type="text"
                    required
                    value={manualMonth}
                    onChange={(e) => setManualMonth(e.target.value)}
                    placeholder="সেপ্টেম্বর ২০২৬"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পেমেন্ট মেথড</label>
                  <select
                    value={manualMethod}
                    onChange={(e) => setManualMethod(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600"
                  >
                    <option value="cash">ক্যাশ / ক্যাশ রিসিট</option>
                    <option value="bkash">বিকাশ</option>
                    <option value="nagad">নগদ</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পরিমাণ (টাকা)</label>
                  <input
                    type="number"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">TrxID / ভাউচার</label>
                  <input
                    type="text"
                    value={manualTrxId}
                    onChange={(e) => setManualTrxId(e.target.value)}
                    placeholder="CASH-FEE-01"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600 font-mono uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs py-3.5 rounded-xl shadow-lg transition"
              >
                {isSubmitting ? 'ডাটাবেজে সেভ হচ্ছে...' : 'মাসিক ফি নিশ্চিত ও ডাটাবেজে সংরক্ষণ করুন'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
