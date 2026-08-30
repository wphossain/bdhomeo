'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { CreditCard, Check, Clock } from 'lucide-react';
import { formatTaka } from '@/lib/utils';

export function MonthlyFeeApprovals() {
  const { monthlyPayments, approveMonthlyPayment } = useApp();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-bangla space-y-6">
      
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-black text-slate-900">
          মাসিক ৫০০/- ফি পেমেন্ট অনুমোদন ({monthlyPayments.length})
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          শিক্ষার্থীদের মাসিক ফি পরিশোধ যাচাই করুন এবং ক্লাসরুম এক্সেস অব্যাহত রাখুন।
        </p>
      </div>

      {monthlyPayments.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed text-xs text-slate-500">
          বর্তমানে কোনো মাসিক ফি রিকোয়েস্ট পেন্ডিং নেই।
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                <th className="pb-3 px-3">শিক্ষার্থী</th>
                <th className="pb-3 px-3">মাস</th>
                <th className="pb-3 px-3">পরিমাণ</th>
                <th className="pb-3 px-3">TrxID / নম্বর</th>
                <th className="pb-3 px-3">স্ট্যাটাস</th>
                <th className="pb-3 px-3 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {monthlyPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition">
                  <td className="py-4 px-3 font-semibold text-slate-900">
                    <p className="font-bold">{p.studentName}</p>
                    <p className="text-xs text-slate-500">{p.courseTitle}</p>
                  </td>
                  <td className="py-4 px-3 font-medium text-slate-700">
                    {p.monthName}
                  </td>
                  <td className="py-4 px-3 font-black text-emerald-900 font-english">
                    {formatTaka(p.amount)}
                  </td>
                  <td className="py-4 px-3 font-mono text-xs">
                    <p className="font-bold text-slate-900">{p.trxId}</p>
                    <p className="text-slate-500">{p.senderPhone} ({p.paymentMethod})</p>
                  </td>
                  <td className="py-4 px-3">
                    {p.status === 'approved' ? (
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
                    {p.status === 'pending' ? (
                      <button
                        onClick={() => approveMonthlyPayment(p.id)}
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