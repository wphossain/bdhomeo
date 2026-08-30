'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Enrollment } from '@/lib/types';
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
  UserCheck
} from 'lucide-react';

export function EnrollmentApprovals() {
  const { enrollments, courses, approveEnrollment, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Manual Enrollment Form
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualCourseId, setManualCourseId] = useState(courses[0]?.id || 'course-basic-foundation');
  const [manualPaymentMethod, setManualPaymentMethod] = useState<'bkash' | 'nagad' | 'cash'>('bkash');
  const [manualSenderPhone, setManualSenderPhone] = useState('');
  const [manualTrxId, setManualTrxId] = useState('');
  const [manualStatus, setManualStatus] = useState<'approved' | 'pending'>('approved');

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

  const handleManualEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone) return;

    const selectedCourse = courses.find((c) => c.id === manualCourseId) || courses[0];
    const newEnrollment: Enrollment = {
      id: `enr-${Date.now()}`,
      studentId: `manual-${Date.now()}`,
      studentName: manualName,
      studentEmail: manualEmail || `${manualPhone}@student.bdhomeo.com`,
      studentPhone: manualPhone,
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      batchType: selectedCourse.batchType,
      admissionStatus: manualStatus,
      trxId: manualTrxId || `MANUAL-${Date.now().toString().slice(-6)}`,
      senderPhone: manualSenderPhone || manualPhone,
      paymentMethod: manualPaymentMethod as any,
      enrolledAt: new Date().toISOString(),
    };

    enrollments.unshift(newEnrollment);
    setIsManualModalOpen(false);
    setManualName('');
    setManualEmail('');
    setManualPhone('');
    setManualSenderPhone('');
    setManualTrxId('');
    showToast(`'${manualName}' শিক্ষার্থীকে সফলভাবে ভর্তি করা হয়েছে!`, 'success');
  };

  return (
    <div className="space-y-6 font-bangla">
      
      {/* Top Summary & Header */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />
            শিক্ষার্থী ভর্তি আবেদন ও অনুমোদন (Enrollment Approvals)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            বিকাশ মার্চেন্ট ও নগদ পেমেন্টের TrxID যাচাই করে শিক্ষার্থীদের ক্লাসরুম আনলক করে দিন অথবা ম্যানুয়ালি শিক্ষার্থী যুক্ত করুন।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>ম্যানুয়ালি শিক্ষার্থী ভর্তি করুন</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="শিক্ষার্থীর নাম, মোবাইল নম্বর বা TrxID দিয়ে খুঁজুন..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-xs text-slate-300 font-bold outline-none cursor-pointer"
            >
              <option value="all">সকল স্ট্যাটাস</option>
              <option value="pending">পেন্ডিং আবেদন ({pendingCount})</option>
              <option value="approved">অনুমোদিত ({approvedCount})</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-300 font-bold outline-none cursor-pointer"
            >
              <option value="all">সকল কোর্স</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* Enrollments Table */}
      {filteredEnrollments.length === 0 ? (
        <div className="bg-slate-950 rounded-3xl p-12 text-center border border-slate-800 text-slate-500 space-y-2">
          <Users className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm font-bold text-slate-400">কোনো ভর্তি আবেদন পাওয়া যায়নি</p>
          <p className="text-xs">শিক্ষার্থীরা আবেদন করলে বা ম্যানুয়ালি যোগ করলে এখানে প্রদর্শিত হবে।</p>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-5">শিক্ষার্থী</th>
                  <th className="py-4 px-5">কোর্স ও ব্যাচ</th>
                  <th className="py-4 px-5">পেমেন্ট মেথড</th>
                  <th className="py-4 px-5">TrxID ও প্রেরক নম্বর</th>
                  <th className="py-4 px-5">স্ট্যাটাস</th>
                  <th className="py-4 px-5 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {filteredEnrollments.map((enr) => (
                  <tr key={enr.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-4 px-5">
                      <p className="font-bold text-white text-sm">{enr.studentName}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{enr.studentEmail}</p>
                    </td>
                    <td className="py-4 px-5">
                      <p className="font-bold text-emerald-400 truncate max-w-[200px]">{enr.courseTitle}</p>
                      <span className="text-[10px] text-slate-400 uppercase bg-slate-900 px-2 py-0.5 rounded">
                        {enr.batchType}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center gap-1 font-bold text-[11px] px-2.5 py-1 rounded-lg uppercase ${
                        enr.paymentMethod === 'bkash'
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                          : enr.paymentMethod === 'nagad'
                            ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {enr.paymentMethod}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <p className="font-mono font-black text-amber-300 text-xs">{enr.trxId}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{enr.senderPhone}</p>
                    </td>
                    <td className="py-4 px-5">
                      {enr.admissionStatus === 'approved' ? (
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> অনুমোদিত
                        </span>
                      ) : enr.admissionStatus === 'pending' ? (
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                          <Clock className="w-3 h-3 text-amber-400" /> যাচাই অপেক্ষমান
                        </span>
                      ) : (
                        <span className="bg-rose-500/20 text-rose-300 text-[10px] font-black px-2.5 py-1 rounded-full">
                          বাতিল
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right">
                      {enr.admissionStatus === 'pending' ? (
                        <button
                          onClick={() => approveEnrollment(enr.id)}
                          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl shadow transition text-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>ভর্তি অনুমোদন করুন</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 font-bold">ভর্তি নিশ্চিত</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manual Student Admission Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl animate-in zoom-in-95 font-bangla">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                ম্যানুয়ালি শিক্ষার্থী ভর্তি ফর্ম
              </h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualEnrollSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">শিক্ষার্থীর নাম *</label>
                  <input
                    type="text"
                    required
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="ডাঃ মোঃ আরিফুল ইসলাম"
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
                  <label className="text-xs font-bold text-slate-400 block mb-1">ইমেইল (যদি থাকে)</label>
                  <input
                    type="email"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    placeholder="doctor@gmail.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">কোর্স সিলেক্ট করুন *</label>
                  <select
                    value={manualCourseId}
                    onChange={(e) => setManualCourseId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500 font-bold"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">পেমেন্ট মেথড</label>
                  <select
                    value={manualPaymentMethod}
                    onChange={(e) => setManualPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  >
                    <option value="bkash">বিকাশ (bKash)</option>
                    <option value="nagad">নগদ (Nagad)</option>
                    <option value="cash">সরাসরি ক্যাশ (Cash)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">ভর্তি স্ট্যাটাস</label>
                  <select
                    value={manualStatus}
                    onChange={(e) => setManualStatus(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-emerald-400 font-bold outline-none focus:border-emerald-500"
                  >
                    <option value="approved">অনুমোদিত (Direct Active)</option>
                    <option value="pending">যাচাই অপেক্ষমান (Pending)</option>
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
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition"
              >
                শিক্ষার্থী ভর্তি নিশ্চিত করুন
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
