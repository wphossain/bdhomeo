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
      trxId: manualTrxId,
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
    <div className="space-y-6 font-bangla">
      
      {/* Top Banner Stats & Manual Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-black text-slate-900">
              ভর্তি আবেদন ও শিক্ষার্থী এনরোলমেন্ট
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            নতুন শিক্ষার্থীদের ভর্তি যাচাই, TrxID নিশ্চিতকরণ এবং ম্যানুয়াল ভর্তি
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="bg-amber-100 text-amber-800 px-3 py-1.5 rounded-xl border border-amber-200">
              অপেক্ষমান: {pendingCount}
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
            <span>ম্যানুয়ালি ভর্তি করুন</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative sm:col-span-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম / ফোন / TrxID খুঁজুন..."
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

        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600"
        >
          <option value="all">সকল কোর্স</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      {/* Enrollment Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredEnrollments.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <Users className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-600">কোনো ভর্তি আবেদন পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="p-4">শিক্ষার্থী</th>
                  <th className="p-4">কোর্স</th>
                  <th className="p-4">ফি ও ট্রানজেকশন (TrxID)</th>
                  <th className="p-4">স্ট্যাটাস</th>
                  <th className="p-4 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredEnrollments.map((enr) => (
                  <tr key={enr.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 space-y-1">
                      <p className="font-bold text-slate-900">{enr.studentName}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{enr.studentPhone}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{enr.studentEmail}</p>
                    </td>

                    <td className="p-4">
                      <span className="font-semibold text-slate-800 block">{enr.courseTitle}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(enr.enrolledAt).toLocaleDateString('bn-BD')}
                      </span>
                    </td>

                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {formatTaka(enr.amount || 1000)}
                        </span>
                        <span className="uppercase text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {enr.paymentMethod}
                        </span>
                      </div>
                      <div className="font-mono text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <span className="text-slate-400 font-normal">TrxID:</span>
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{enr.trxId}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full ${
                          enr.admissionStatus === 'approved'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : enr.admissionStatus === 'rejected'
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {enr.admissionStatus === 'approved' && <CheckCircle2 className="w-3 h-3" />}
                        {enr.admissionStatus === 'rejected' && <XCircle className="w-3 h-3" />}
                        {enr.admissionStatus === 'pending' && <Clock className="w-3 h-3" />}
                        <span>
                          {enr.admissionStatus === 'approved'
                            ? 'অনুমোদিত'
                            : enr.admissionStatus === 'rejected'
                            ? 'বাতিলকৃত'
                            : 'অপেক্ষমান'}
                        </span>
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {enr.admissionStatus === 'pending' && (
                          <>
                            <button
                              onClick={() => approveEnrollment(enr.id)}
                              className="inline-flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow transition"
                              title="ভর্তি অনুমোদন করুন"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>অনুমোদন</span>
                            </button>

                            <button
                              onClick={() => rejectEnrollment(enr.id)}
                              className="inline-flex items-center gap-1 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-xs px-3 py-1.5 rounded-xl border border-rose-300 transition"
                              title="ভর্তি বাতিল করুন"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>বাতিল</span>
                            </button>
                          </>
                        )}

                        {enr.admissionStatus === 'approved' && (
                          <button
                            onClick={() => rejectEnrollment(enr.id)}
                            className="text-[11px] text-rose-600 hover:underline font-semibold"
                          >
                            বাতিল করুন
                          </button>
                        )}

                        {enr.admissionStatus === 'rejected' && (
                          <button
                            onClick={() => approveEnrollment(enr.id)}
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

      {/* Manual Enrollment Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900">ম্যানুয়ালি শিক্ষার্থী ভর্তি করুন</h3>
              </div>
              <button onClick={() => setIsManualModalOpen(false)} className="text-slate-400 hover:text-slate-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualEnrollSubmit} className="space-y-4">
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

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ইমেইল (ঐচ্ছিক)</label>
                  <input
                    type="email"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">কোর্স নির্বাচন করুন *</label>
                <select
                  value={manualCourseId}
                  onChange={(e) => setManualCourseId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({formatTaka(c.admissionFee)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পেমেন্ট মেথড</label>
                  <select
                    value={manualPaymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600"
                  >
                    <option value="cash">ক্যাশ / হাতে হাতে</option>
                    <option value="bkash">বিকাশ</option>
                    <option value="nagad">নগদ</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ভর্তি ফি (টাকা)</label>
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
                    placeholder="যেমন: CASH-101"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none focus:border-emerald-600 font-mono uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs py-3.5 rounded-xl shadow-lg transition"
              >
                {isSubmitting ? 'ডাটাবেজে সেভ হচ্ছে...' : 'ভর্তি নিশ্চিত করুন ও ডাটাবেজে সংরক্ষণ করুন'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
