'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { CheckCircle2, Clock, User, Phone, Check, Eye } from 'lucide-react';

export function EnrollmentApprovals() {
  const { enrollments, approveEnrollment } = useApp();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-bangla space-y-6">
      
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-black text-slate-900">
          ভর্তির আবেদন ভেরিফিকেশন ও অনুমোদন ({enrollments.length})
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          শিক্ষার্থীদের পাঠানো TrxID ও বিকাশ/নগদ নম্বর যাচাই করে এক ক্লিকে ক্লাসরুম এক্সেস অনুমোদন করুন।
        </p>
      </div>

      {enrollments.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed text-xs text-slate-500">
          বর্তমানে কোনো নতুন ভর্তির আবেদন নেই।
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                <th className="pb-3 px-3">শিক্ষার্থী</th>
                <th className="pb-3 px-3">কোর্স / ব্যাচ</th>
                <th className="pb-3 px-3">পেমেন্ট মেথড</th>
                <th className="pb-3 px-3">TrxID / নম্বর</th>
                <th className="pb-3 px-3">স্ট্যাটাস</th>
                <th className="pb-3 px-3 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enrollments.map((enr) => (
                <tr key={enr.id} className="hover:bg-slate-50 transition">
                  <td className="py-4 px-3 font-semibold text-slate-900">
                    <p className="font-bold">{enr.studentName}</p>
                    <p className="text-xs text-slate-500">{enr.studentEmail}</p>
                  </td>
                  <td className="py-4 px-3 text-slate-700 font-medium">
                    {enr.courseTitle}
                  </td>
                  <td className="py-4 px-3">
                    <span className="capitalize font-bold text-xs bg-slate-100 px-2 py-1 rounded">
                      {enr.paymentMethod}
                    </span>
                  </td>
                  <td className="py-4 px-3 font-mono text-xs">
                    <p className="font-bold text-slate-900">{enr.trxId}</p>
                    <p className="text-slate-500">{enr.senderPhone}</p>
                  </td>
                  <td className="py-4 px-3">
                    {enr.admissionStatus === 'approved' ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
                        <Check className="w-3 h-3 text-emerald-600" />
                        Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-full">
                        <Clock className="w-3 h-3 text-amber-600" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-3 text-right">
                    {enr.admissionStatus === 'pending' ? (
                      <button
                        onClick={() => approveEnrollment(enr.id)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition"
                      >
                        অনুমোদন করুন
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-semibold">সম্পন্ন</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}