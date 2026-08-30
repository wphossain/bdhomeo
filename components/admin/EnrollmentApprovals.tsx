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
  Check
} from 'lucide-react';

export function EnrollmentApprovals() {
  const { enrollments, courses, approveEnrollment } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');

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
            বিকাশ মার্চেন্ট ও নগদ পেমেন্টের TrxID যাচাই করে শিক্ষার্থীদের ক্লাসরুম আনলক করে দিন।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold px-3.5 py-2 rounded-xl">
            পেন্ডিং: {pendingCount} জন
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3.5 py-2 rounded-xl">
            অনুমোদিত: {approvedCount} জন
          </div>
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
          <p className="text-xs">নতুন কোনো শিক্ষার্থী আবেদন করলে এখানে প্রদর্শিত হবে।</p>
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
                          : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
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

    </div>
  );
}
