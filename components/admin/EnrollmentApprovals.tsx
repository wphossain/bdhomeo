'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Enrollment } from '@/lib/types';
import { formatTaka } from '@/lib/utils';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  BookOpen, 
  Check,
  Plus,
  X,
  UserCheck,
  XCircle,
  AlertCircle
} from 'lucide-react';

export function EnrollmentApprovals() {
  const { enrollments, courses, approveEnrollment, rejectEnrollment, addManualEnrollment, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Manual Enrollment Form
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualCourseId, setManualCourseId] = useState(courses[0]?.id || 'course-basic-foundation');
  const [manualPaymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'cash'>('cash');
  const [manualSenderPhone, setManualSenderPhone] = useState('');
  const [manualTrxId, setManualTrxId] = useState('');
  const [manualAmount, setManualAmount] = useState('1000');
  const [manualStatus, setManualStatus] = useState<'approved' | 'pending'>('approved');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredEnrollments = enrollments.filter((enr) => {
    const matchesSearch =
      enr.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enr.studentEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enr.studentPhone.includes(searchQuery) ||
      enr.trxId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || enr.admissionStatus === statusFilter;
    const matchesCourse = courseFilter === 'all' || enr.courseId === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const pendingCount = enrollments.filter((e) => e.admissionStatus === 'pending').length;
  const approvedCount = enrollments.filter((e) => e.admissionStatus === 'approved').length;

  const handleManualEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone) {
      showToast('শিক্ষার্থীর নাম ও ফোন নম্বর লিখুন', 'error');
      return;
    }

    setIsSubmitting(true);
    const ok = await addManualEnrollment({
      studentName: manualName,
      studentEmail: manualEmail || `student-${Date.now()}@bdhomeo.com`,
      studentPhone: manualPhone,
      courseId: manualCourseId,
      paymentMethod: manualPaymentMethod,
      senderPhone: manualSenderPhone || manualPhone,
      trxId: manualTrxId || `MANUAL-${Date.now().toString().slice(-6)}`,
      amount: parseInt(manualAmount, 10) || 1000,
      admissionStatus: manualStatus,
    });
    setIsSubmitting(false);

    if (ok) {
      setIsManualModalOpen(false);
      setManualName('');
      setManualEmail('');
      setManualPhone('');
      setManualTrxId('');
      setManualSenderPhone('');
    }
  };

  return (
    <div className="space-y-6 font-bangla text-slate-100">
      
      {/* Top Banner Stats & Manual Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-black text-white">
              ভর্তি আবেদন ও শিক্ষার্থী এনরোলমেন্ট (Enrollment Approvals)
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            শিক্ষার্থীদের কোর্স ভর্তির আবেদন পর্যালোচনা, অনুমোদন এবং সরাসরি শিক্ষার্থী ভর্তি করান।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400">পেন্ডিং আবেদন:</span>
            <span className="font-bold text-blue-400 font-mono">{pendingCount} টি</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400">অনুমোদিত ভর্তি:</span>
            <span className="font-bold text-emerald-400 font-mono">{approvedCount} জন</span>
          </div>

          <button
            onClick={() => setIsManualModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>ম্যানুয়ালি শিক্ষার্থী ভর্তি করুন</span>
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
            placeholder="নাম, ইমেইল, মোবাইল বা TrxID..."
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
              {st === 'all' && 'সকল আবেদন'}
              {st === 'pending' && `অপেক্ষমান (${pendingCount})`}
              {st === 'approved' && 'অনুমোদিত'}
              {st === 'rejected' && 'বাতিল'}
            </button>
          ))}
        </div>
      </div>

      {/* Enrollment Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold">
                <th className="p-4">শিক্ষার্থীর বিবরণ</th>
                <th className="p-4">কোর্স</th>
                <th className="p-4">পেমেন্ট মেথড ও TrxID</th>
                <th className="p-4">পরিমাণ</th>
                <th className="p-4">তারিখ</th>
                <th className="p-4">স্ট্যাটাস</th>
                <th className="p-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredEnrollments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    কোনো ভর্তি আবেদন পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredEnrollments.map((enr) => {
                  const course = courses.find((c) => c.id === enr.courseId);
                  return (
                    <tr key={enr.id} className="hover:bg-slate-950/40 transition">
                      <td className="p-4">
                        <div className="font-bold text-white">{enr.studentName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{enr.studentEmail}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{enr.studentPhone}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-200">{course?.title || 'কোর্স'}</div>
                        <div className="text-[11px] text-slate-400">{course?.batchType || 'অনলাইন ব্যাচ'}</div>
                      </td>
                      <td className="p-4">
                        <span className="capitalize font-bold text-slate-300">{enr.paymentMethod}</span>
                        <div className="text-[11px] text-emerald-400 font-mono font-bold">{enr.trxId}</div>
                      </td>
                      <td className="p-4 font-mono font-bold text-white">
                        {formatTaka(enr.amount || 1000)}
                      </td>
                      <td className="p-4 text-slate-400 text-[11px] font-mono">
                        {enr.enrolledAt ? new Date(enr.enrolledAt).toLocaleDateString('bn-BD') : '২০২৬'}
                      </td>
                      <td className="p-4">
                        {enr.admissionStatus === 'approved' && (
                          <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3" />
                            অনুমোদিত
                          </span>
                        )}
                        {enr.admissionStatus === 'pending' && (
                          <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-blue-500/30 animate-pulse">
                            <Clock className="w-3 h-3" />
                            পেন্ডিং
                          </span>
                        )}
                        {enr.admissionStatus === 'rejected' && (
                          <span className="inline-flex items-center gap-1 bg-rose-500/20 text-rose-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-rose-500/30">
                            <XCircle className="w-3 h-3" />
                            বাতিল
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {enr.admissionStatus !== 'approved' && (
                            <button
                              onClick={() => approveEnrollment(enr.id)}
                              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition shadow"
                              title="ভর্তি অনুমোদন করুন"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>অনুমোদন</span>
                            </button>
                          )}
                          {enr.admissionStatus !== 'rejected' && (
                            <button
                              onClick={() => rejectEnrollment(enr.id)}
                              className="inline-flex items-center gap-1 bg-rose-950 hover:bg-rose-900 text-rose-300 font-bold px-3 py-1.5 rounded-lg text-xs transition border border-rose-800/40"
                              title="আবেদন বাতিল করুন"
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

      {/* Manual Enrollment Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <span>ম্যানুয়ালি শিক্ষার্থী ভর্তি করান</span>
              </h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualEnrollSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">শিক্ষার্থীর পূর্ণ নাম *</label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="যেমন: ডাঃ আশরাফুল ইসলাম"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">ইমেইল ঠিকানা (ঐচ্ছিক)</label>
                <input
                  type="email"
                  value={manualEmail}
                  onChange={(e) => setManualEmail(e.target.value)}
                  placeholder="student@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">কোর্স নির্বাচন করুন *</label>
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">পেমেন্ট মেথড</label>
                  <select
                    value={manualPaymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="cash">সরাসরি ক্যাশ (Cash)</option>
                    <option value="bkash">বিকাশ (bKash)</option>
                    <option value="nagad">নগদ (Nagad)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">ফি পরিমাণ (৳)</label>
                  <input
                    type="number"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition"
                >
                  {isSubmitting ? 'ভর্তি সম্পন্ন হচ্ছে...' : 'সরাসরি ভর্তি কনফার্ম করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
