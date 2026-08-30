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
  AlertCircle,
  Calendar,
  XCircle
} from 'lucide-react';

export function MonthlyFeeApprovals() {
  const { monthlyPayments, approveMonthlyPayment } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all');

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

  const months = ['à¦œà¦¾à¦¨à§à§Ÿà¦¾à¦°à¦¿', 'à¦«à§‡à¦¬à§à¦°à§à§Ÿà¦¾à¦°à¦¿', 'à¦®à¦¾à¦°à§à¦š', 'à¦à¦ªà§à¦°à¦¿à¦²', 'à¦®à§‡', 'à¦œà§à¦¨', 'à¦œà§à¦²à¦¾à¦‡', 'à¦†à¦—à¦¸à§à¦Ÿ', 'à¦¸à§‡à¦ªà§à¦Ÿà§‡à¦®à§à¦¬à¦°', 'à¦…à¦•à§à¦Ÿà§‹à¦¬à¦°', 'à¦¨à¦­à§‡à¦®à§à¦¬à¦°', 'à¦¡à¦¿à¦¸à§‡à¦®à§à¦¬à¦°'];

  return (
    <div className="space-y-6 font-bangla">
      
      {/* Header */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-emerald-400" />
            à¦®à¦¾à¦¸à¦¿à¦• à§«à§¦à§¦/- à¦Ÿà¦¾à¦•à¦¾ à¦«à¦¿ à¦¯à¦¾à¦šà¦¾à¦‡ à¦“ à¦…à¦¨à§à¦®à§‹à¦¦à¦¨ (Monthly Fee Approvals)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            à¦¶à¦¿à¦•à§à¦·à¦¾à¦°à§à¦¥à§€à¦¦à§‡à¦° à¦œà¦®à¦¾ à¦¦à§‡à¦“à§Ÿà¦¾ à¦Ÿà§à¦°à¦¾à¦¨à¦œà§‡à¦•à¦¶à¦¨ à¦†à¦‡à¦¡à¦¿ à¦¯à¦¾à¦šà¦¾à¦‡ à¦•à¦°à§‡ à¦«à¦¿ à¦­à§‡à¦°à¦¿à¦«à¦¾à¦‡ à¦•à¦°à§à¦¨à¥¤
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold px-3.5 py-2 rounded-xl">
            à¦ªà§‡à¦¨à§à¦¡à¦¿à¦‚ à¦«à¦¿: {pendingCount} à¦Ÿà¦¿
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-3.5 py-2 rounded-xl">
            à¦…à¦¨à§à¦®à§‹à¦¦à¦¿à¦¤: {approvedCount} à¦Ÿà¦¿
          </div>
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
            placeholder="à¦¶à¦¿à¦•à§à¦·à¦¾à¦°à§à¦¥à§€à¦° à¦¨à¦¾à¦®, à¦«à§‹à¦¨ à¦¨à¦®à§à¦¬à¦° à¦¬à¦¾ TrxID à¦¦à¦¿à§Ÿà§‡ à¦–à§à¦à¦œà§à¦¨..."
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
              <option value="all">à¦¸à¦•à¦² à¦®à¦¾à¦¸</option>
              {months.map((m) => (
                <option key={m} value={`${m} 2026`}>
                  {m} à§¨à§¦à§¨à§¬
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
              <option value="all">à¦¸à¦•à¦² à¦¸à§à¦Ÿà§à¦¯à¦¾à¦Ÿà¦¾à¦¸</option>
              <option value="pending">à¦ªà§‡à¦¨à§à¦¡à¦¿à¦‚ ({pendingCount})</option>
              <option value="approved">à¦…à¦¨à§à¦®à§‹à¦¦à¦¿à¦¤ ({approvedCount})</option>
            </select>
          </div>

        </div>

      </div>

      {/* Table */}
      {filteredPayments.length === 0 ? (
        <div className="bg-slate-950 rounded-3xl p-12 text-center border border-slate-800 text-slate-500 space-y-2">
          <CreditCard className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm font-bold text-slate-400">à¦•à§‹à¦¨à§‹ à¦®à¦¾à¦¸à¦¿à¦• à¦«à¦¿ à¦Ÿà§à¦°à¦¾à¦¨à¦œà§‡à¦•à¦¶à¦¨ à¦ªà¦¾à¦“à§Ÿà¦¾ à¦¯à¦¾à§Ÿà¦¨à¦¿</p>
          <p className="text-xs">à¦¶à¦¿à¦•à§à¦·à¦¾à¦°à§à¦¥à§€à¦°à¦¾ à¦«à¦¿ à¦œà¦®à¦¾ à¦¦à¦¿à¦²à§‡ à¦à¦–à¦¾à¦¨à§‡ à¦ªà§à¦°à¦¦à¦°à§à¦¶à¦¿à¦¤ à¦¹à¦¬à§‡à¥¤</p>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-5">à¦¶à¦¿à¦•à§à¦·à¦¾à¦°à§à¦¥à§€</th>
                  <th className="py-4 px-5">à¦•à§‹à¦°à§à¦¸</th>
                  <th className="py-4 px-5">à¦®à¦¾à¦¸ à¦“ à¦ªà¦°à¦¿à¦®à¦¾à¦£</th>
                  <th className="py-4 px-5">à¦ªà§‡à¦®à§‡à¦¨à§à¦Ÿ à¦®à§‡à¦¥à¦¡</th>
                  <th className="py-4 px-5">TrxID à¦“ à¦ªà§à¦°à§‡à¦°à¦• à¦¨à¦®à§à¦¬à¦°</th>
                  <th className="py-4 px-5">à¦¸à§à¦Ÿà§à¦¯à¦¾à¦Ÿà¦¾à¦¸</th>
                  <th className="py-4 px-5 text-right">à¦…à§à¦¯à¦¾à¦•à¦¶à¦¨</th>
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
                      <p className="text-[11px] text-slate-400 font-english font-bold">à§³{p.amount}/-</p>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center gap-1 font-bold text-[11px] px-2.5 py-1 rounded-lg uppercase ${
                        p.paymentMethod === 'bkash'
                          ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                          : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
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
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> à¦…à¦¨à§à¦®à§‹à¦¦à¦¿à¦¤
                        </span>
                      ) : (
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                          <Clock className="w-3 h-3 text-amber-400" /> à¦…à¦ªà§‡à¦•à§à¦·à¦®à¦¾à¦¨
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
                          <span>à¦«à¦¿ à¦…à¦¨à§à¦®à§‹à¦¦à¦¨ à¦•à¦°à§à¦¨</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 font-bold">à¦ªà¦°à¦¿à¦¶à§‹à¦§à¦¿à¦¤</span>
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