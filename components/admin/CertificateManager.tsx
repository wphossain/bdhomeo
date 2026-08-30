'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { CertificateRequest } from '@/lib/types';
import { Award, Truck, CheckCircle2, Clock, MapPin, Phone, User, Search, Mail, Edit3, Save } from 'lucide-react';

export function CertificateManager() {
  const { certificateRequests, updateCertificateStatus, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'dispatched' | 'delivered'>('all');

  const filtered = certificateRequests.filter((req) => {
    const matchesSearch =
      (req.studentName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.phone || '').includes(searchTerm) ||
      (req.courierAddress || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (req.trackingNumber || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = certificateRequests.filter((c) => c.status === 'pending').length;
  const dispatchedCount = certificateRequests.filter((c) => c.status === 'dispatched').length;
  const deliveredCount = certificateRequests.filter((c) => c.status === 'delivered').length;

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'dispatched' | 'delivered', trackingNo?: string) => {
    await updateCertificateStatus(id, newStatus, trackingNo);
    showToast('সনদপত্রের ডেলিভারি স্ট্যাটাস সফলভাবে আপডেট হয়েছে!', 'success');
  };

  return (
    <div className="space-y-6 font-bangla text-slate-100">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-black text-white">
              সনদপত্র ও কুরিয়ার ট্র্যাকার (Certificate Dispatch CRM)
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            শিক্ষার্থীদের PTF সার্টিফিকেট কুরিয়ার ডেলিভারি ঠিকানা যাচাই এবং পার্সেল ট্র্যাকিং পরিচালনা করুন।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400">পেন্ডিং:</span>
            <span className="font-bold text-amber-400 font-mono ml-1">{pendingCount} টি</span>
          </div>
          <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400">কুরিয়ারে প্রেরিত:</span>
            <span className="font-bold text-blue-400 font-mono ml-1">{dispatchedCount} টি</span>
          </div>
          <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400">ডেলিভার্ড:</span>
            <span className="font-bold text-emerald-400 font-mono ml-1">{deliveredCount} টি</span>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="নাম, ফোন নম্বর, কুরিয়ার ঠিকানা..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {(['all', 'pending', 'dispatched', 'delivered'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st === 'all' && 'সকল রিকোয়েস্ট'}
              {st === 'pending' && `অপেক্ষমান (${pendingCount})`}
              {st === 'dispatched' && `কুরিয়ারে প্রেরিত (${dispatchedCount})`}
              {st === 'delivered' && 'ডেলিভার্ড'}
            </button>
          ))}
        </div>
      </div>

      {/* Certificate Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <div className="md:col-span-2 bg-slate-900 p-12 rounded-3xl border border-slate-800 text-center text-slate-500 text-xs">
            কোনো সার্টিফিকেট ডেলিভারি রিকোয়েস্ট পাওয়া যায়নি।
          </div>
        ) : (
          filtered.map((req) => (
            <div
              key={req.id}
              className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-slate-700 transition shadow-lg"
            >
              <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-sm">
                    {req.studentName ? req.studentName.charAt(0) : 'S'}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{req.studentName}</h3>
                    <p className="text-[11px] text-slate-400 font-mono">{req.studentEmail}</p>
                  </div>
                </div>

                <div>
                  {req.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-amber-500/30 animate-pulse">
                      <Clock className="w-3 h-3" />
                      পেন্ডিং
                    </span>
                  )}
                  {req.status === 'dispatched' && (
                    <span className="inline-flex items-center gap-1 bg-blue-500/20 text-blue-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-blue-500/30">
                      <Truck className="w-3 h-3" />
                      কুরিয়ারে প্রেরিত
                    </span>
                  )}
                  {req.status === 'delivered' && (
                    <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full text-[10px] border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" />
                      ডেলিভার্ড
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono">{req.phone}</span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req.courierAddress}</span>
                </div>

                {req.trackingNumber && (
                  <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>সুন্দরবন ট্র্যাকিং নম্বর: <strong className="font-mono text-blue-300">{req.trackingNumber}</strong></span>
                  </div>
                )}
              </div>

              {/* Status Actions */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-500 font-mono">
                  আবেদনের তারিখ: {new Date(req.createdAt).toLocaleDateString('bn-BD')}
                </div>

                <div className="flex items-center gap-2">
                  {req.status === 'pending' && (
                    <button
                      onClick={() => {
                        const trNo = prompt('সুন্দরবন কুরিয়ারের ট্র্যাকিং নম্বর লিখুন (ঐচ্ছিক):');
                        handleStatusChange(req.id, 'dispatched', trNo || undefined);
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>ডিসপ্যাচ চিহ্নিত করুন</span>
                    </button>
                  )}

                  {req.status === 'dispatched' && (
                    <button
                      onClick={() => handleStatusChange(req.id, 'delivered')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>ডেলিভার্ড সম্পন্ন</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
