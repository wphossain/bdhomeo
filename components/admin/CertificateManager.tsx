'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { CertificateRequest } from '@/lib/types';
import { Award, Truck, CheckCircle2, Clock, MapPin, Phone, User, Search, Mail } from 'lucide-react';

export function CertificateManager() {
  const { certificateRequests, updateCertificateStatus, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'dispatched' | 'delivered'>('all');

  const filtered = certificateRequests.filter((req) => {
    const matchesSearch =
      req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.phone.includes(searchTerm) ||
      req.courierAddress.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'dispatched' | 'delivered') => {
    await updateCertificateStatus(id, newStatus);
    showToast('কুরিয়ার স্ট্যাটাস আপডেট করা হয়েছে!', 'success');
  };

  return (
    <div className="space-y-6 font-bangla">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-600" />
            <h2 className="text-xl font-black text-slate-900">
              সনদপত্র কুরিয়ার ডেলিভারি ট্র্যাকার
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            শিক্ষার্থীদের সাবমিট করা PTF সার্টিফিকেট কুরিয়ার ঠিকানা ও ডেলিভারি স্ট্যাটাস ম্যানেজমেন্ট
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="নাম / ফোন / ঠিকানা..."
              className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600 focus:bg-white"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-emerald-600"
          >
            <option value="all">সকল স্ট্যাটাস</option>
            <option value="pending">অপেক্ষমান (Pending)</option>
            <option value="dispatched">কুরিয়ারে প্রেরিত (Dispatched)</option>
            <option value="delivered">ডেলিভার্ড (Delivered)</option>
          </select>
        </div>
      </div>

      {/* Table / List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Truck className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-600">কোনো কুরিয়ার রিকোয়েস্ট পাওয়া যায়নি</p>
            <p className="text-xs text-slate-400">শিক্ষার্থী ড্যাশবোর্ড থেকে ঠিকানা সাবমিট করলে এখানে প্রদর্শিত হবে।</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="p-4">শিক্ষার্থীর বিবরণ</th>
                  <th className="p-4">কোর্স</th>
                  <th className="p-4">কুরিয়ার ডেলিভারি ঠিকানা</th>
                  <th className="p-4">স্ট্যাটাস</th>
                  <th className="p-4 text-right">পদক্ষেপ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filtered.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-bold text-slate-900">{req.studentName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>{req.phone}</span>
                      </div>
                      {req.studentEmail && (
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                          <Mail className="w-3 h-3" />
                          <span>{req.studentEmail}</span>
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      <span className="font-semibold text-slate-800">{req.courseTitle}</span>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {new Date(req.createdAt).toLocaleDateString('bn-BD')}
                      </span>
                    </td>

                    <td className="p-4 max-w-xs space-y-1">
                      <div className="flex items-start gap-1.5 text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{req.courierAddress}</span>
                      </div>
                      {req.district && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold inline-block">
                          জেলা: {req.district}
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full ${
                          req.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : req.status === 'dispatched'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {req.status === 'delivered' && <CheckCircle2 className="w-3 h-3" />}
                        {req.status === 'dispatched' && <Truck className="w-3 h-3" />}
                        {req.status === 'pending' && <Clock className="w-3 h-3" />}
                        <span>
                          {req.status === 'delivered'
                            ? 'ডেলিভার্ড'
                            : req.status === 'dispatched'
                            ? 'কুরিয়ারে প্রেরিত'
                            : 'অপেক্ষমান'}
                        </span>
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value as any)}
                        className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 outline-none focus:border-emerald-600 cursor-pointer font-bold"
                      >
                        <option value="pending">Pending</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
