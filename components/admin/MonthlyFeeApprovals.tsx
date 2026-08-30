'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { MonthlyPayment } from '@/lib/types';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  Check, 
  Calendar,
  Plus,
  X,
  Send,
  UserCheck
} from 'lucide-react';

export function MonthlyFeeApprovals() {
  const { monthlyPayments, courses, approveMonthlyPayment, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  const currentMonthIdx = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  // Manual Fee Modal State
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualCourseId, setManualCourseId] = useState(courses[0]?.id || 'course-basic-foundation');
  const [manualMonth, setManualMonth] = useState(`${months[currentMonthIdx]} ${currentYear}`);
  const [manualAmount, setManualAmount] = useState(500);
  const [manualPaymentMethod, setManualPaymentMethod] = useState<'bkash' | 'nagad' | 'cash'>('bkash');
  const [manualSenderPhone, setManualSenderPhone] = useState('');
  const [manualTrxId, setManualTrxId] = useState('');
  const [manualStatus, setManualStatus] = useState<'approved' | 'pending'>('approved');

  const filteredPayments = monthlyPayments.filter((payment) => {
    const matchesSearch =
      payment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentPhone.includes(searchQuery) ||
      payment.trxId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMonth = monthFilter === 'all' || payment.monthName === monthFilter;
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;

    return matchesSearch && matchesMonth && matchesStatus;
  });

  const pendingCount = monthlyPayments.filter((p) => p.status === 'pending').length;
  const approvedCount = monthlyPayments.filter((p) => p.status === 'approved').length;

  const handleManualFeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone) return;

    const selectedCourse = courses.find((c) => c.id === manualCourseId) || courses[0];
    const newPayment: MonthlyPayment = {
      id: `mp-${Date.now()}`,
      studentId: `manual-${Date.now()}`,
      studentName: manualName,
      studentPhone: manualPhone,
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      monthName: manualMonth,
      amount: Number(manualAmount) || 500,
      trxId: manualTrxId || `FEE-MANUAL-${Date.now().toString().slice(-5)}`,
      senderPhone: manualSenderPhone || manualPhone,
      paymentMethod: manualPaymentMethod as any,
      status: manualStatus,
      createdAt: new Date().toISOString(),
    };

    monthlyPayments.unshift(newPayment);
    setIsManualModalOpen(false);
    setManualName('');
    setManualPhone('');
    setManualSenderPhone('');
    setManualTrxId('');
    showToast(`'${manualName}' এর ${manualMonth} মাসের ৫০০/- টাকা ফি সফলভাবে রেকর্ড করা হয়েছে!`, 'success');
  };

  return (
    <div className="space-y-6 font-bangla">
      
      {/* Header */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-400" />
            Student Fee Confirmation (মাসিক ফি যাচাই ও অনুমোদন)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            শিক্ষার্থীদের জমা দেওয়া ট্রানজেকশন আইডি যাচাই করে মাসিক ৫০০/- টাকা ফি ভেরিফাই করুন অথবা ম্যানুয়ালি ফি রেকর্ড করুন।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>ম্যানুয়ালি মাসিক ফি যোগ করুন</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="শিক্ষার্থীর নাম, ফোন নম্বর বা TrxID দিয়ে খুঁজুন..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-300 font-bold outline-none cursor-pointer"
            >
              <option value="all">সকল মাস</option>
              {months.map((m) => (
                <option key={m} value={`${m} 2026`}>
                  {m} ২০২৬
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-xs text-slate-300 font-bold outline-none cursor-pointer"
            >
              <option value="all">সকল স্ট্যাটাস</option>
              <option value="pending">পেন্ডিং ({pendingCount})</option>
              <option value="approved">অনুমোদিত ({approvedCount})</option>
            </select>
          </div>

        </div>

      </div>

      {/* Table */}
      {filteredPayments.length === 0 ? (
        <div className="bg-slate-950 rounded-3xl p-12 text-center border border-slate-800 text-slate-500 space-y-2">
          <CreditCard className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm font-bold text-slate-400">কোনো মাসিক ফি ট্রানজেকশন পাওয়া যায়নি</p>
          <p className="text-xs">শিক্ষার্থীরা ফি জমা দিলে বা ম্যানুয়ালি যোগ করলে এখানে প্রদর্শিত হবে।</p>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-5">শিক্ষার্থী</th>
                  <th className="py-4 px-5">কোর্স</th>
                  <th className="py-4 px-5">মাস ও পরিমাণ</th>
                  <th className="py-4 px-5">পেমেন্ট মেথড</th>
                  <th className="py-4 px-5">TrxID ও প্রেরক নম্বর</th>
                  <th className="py-4 px-5">স্ট্যাটাস</th>
                  <th className="py-4 px-5 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-4 px-5">
                      <p className="font-bold text-white text-sm">{p.studentName}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{p.studentPhone}</p>
                    </td>
                    <td className="py-4 px-5 font-bold text-slate-300">
                      {p.courseTitle}
                    </td>
                    <td className="py-4 px-5">
                      <span className="font-bold text-emerald-400">{p.monthName}</span>
                      <p className="text-[11px] text-slate-400 font-english font-bold">৳{p.amount}/-</p>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center gap-1 font-bold text-[11px] px-2.5 py-1 rounded-lg uppercase ${
                        p.paymentMethod === 'bkash'
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                          : p.paymentMethod === 'nagad'
                            ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {p.paymentMethod}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <p className="font-mono font-black text-amber-300 text-xs">{p.trxId}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{p.senderPhone}</p>
                    </td>
                    <td className="py-4 px-5">
                      {p.status === 'approved' ? (
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> অনুমোদিত
                        </span>
                      ) : (
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                          <Clock className="w-3 h-3 text-amber-400" /> অপেক্ষমান
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right">
                      {p.status === 'pending' ? (
                        <button
                          onClick={() => approveMonthlyPayment(p.id)}
                          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl shadow transition text-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>ফি অনুমোদন করুন</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 font-bold">পরিশোধিত</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manual Monthly Fee Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-in zoom-in-95 font-bangla">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                ম্যানুয়ালি মাসিক ফি কালেকশন ফর্ম
              </h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualFeeSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">শিক্ষার্থীর নাম *</label>
                  <input
                    type="text"
                    required
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="ডাঃ মোঃ মিজানুর রহমান"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">কোর্স নির্বাচন করুন *</label>
                  <select
                    value={manualCourseId}
                    onChange={(e) => setManualCourseId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500 font-bold"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">ফি প্রদানের মাস *</label>
                  <select
                    value={manualMonth}
                    onChange={(e) => setManualMonth(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500 font-bold"
                  >
                    {months.map((m) => (
                      <option key={m} value={`${m} ${currentYear}`}>
                        {m} {currentYear}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">টাকার পরিমাণ (টাকা) *</label>
                  <input
                    type="number"
                    required
                    value={manualAmount}
                    onChange={(e) => setManualAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-amber-400 font-black font-english outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">পেমেন্ট মেথড</label>
                  <select
                    value={manualPaymentMethod}
                    onChange={(e) => setManualPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  >
                    <option value="bkash">বিকাশ (bKash)</option>
                    <option value="nagad">নগদ (Nagad)</option>
                    <option value="cash">সরাসরি ক্যাশ (Cash)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">প্রেরক ফোন নম্বর</label>
                  <input
                    type="text"
                    value={manualSenderPhone}
                    onChange={(e) => setManualSenderPhone(e.target.value)}
                    placeholder="018XXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">TrxID</label>
                  <input
                    type="text"
                    value={manualTrxId}
                    onChange={(e) => setManualTrxId(e.target.value)}
                    placeholder="9J87K2MP"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-amber-300 outline-none focus:border-emerald-500 font-mono uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition"
              >
                মাসিক ফি রেকর্ড সংরক্ষণ করুন
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
