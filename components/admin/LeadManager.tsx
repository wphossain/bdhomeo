'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { MessageSquare, MessageCircle, Check, Phone } from 'lucide-react';

export function LeadManager() {
  const { leads, updateLeadStatus, settings } = useApp();

  const handleSendWhatsApp = (lead: any) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const meetLink = settings.googleMeetUrl || 'https://meet.google.com/bdhomeo-live';
    const message = `আসসালামু আলাইকুম ${lead.name}, বিডি হোমিও প্রশিক্ষণ কেন্দ্রের ফ্রি ওরিয়েন্টেশন ক্লাসে আপনার রেজিস্ট্রেশনের জন্য ধন্যবাদ। আগামী ক্লাসের গুগল মিট লিংক: ${meetLink} (ক্লাস সময়: ${settings.classTime})। ক্লাসে স্বাগতম!`;
    const url = `https://wa.me/880${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    updateLeadStatus(lead.id, 'contacted');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-bangla space-y-6">
      
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-black text-slate-900">
          ফ্রি ওরিয়েন্টেশন ক্লাস লিড তালিকা ({leads.length})
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          ল্যান্ডিং পেজ থেকে যারা ফ্রি ক্লাসের আগ্রহ প্রকাশ করেছেন। ১-ক্লিকে তাদের হোয়াটসঅ্যাপে গুগল মিট লিংক ও আমন্ত্রণ পাঠান।
        </p>
      </div>

      {leads.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed text-xs text-slate-500">
          এখনো কোনো ওরিয়েন্টেশন লিড জমা পড়েনি।
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs font-bold uppercase">
                <th className="pb-3 px-3">নাম</th>
                <th className="pb-3 px-3">ফোন নম্বর</th>
                <th className="pb-3 px-3">ব্যাকগ্রাউন্ড</th>
                <th className="pb-3 px-3">স্ট্যাটাস</th>
                <th className="pb-3 px-3 text-right">১-ক্লিক হোয়াটসঅ্যাপ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition">
                  <td className="py-4 px-3 font-bold text-slate-900">
                    {lead.name}
                  </td>
                  <td className="py-4 px-3 font-mono text-slate-700">
                    {lead.phone}
                  </td>
                  <td className="py-4 px-3 text-slate-600">
                    {lead.homeoBackground}
                  </td>
                  <td className="py-4 px-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        lead.status === 'contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : lead.status === 'joined'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {lead.status === 'contacted' ? 'আমন্ত্রিত' : lead.status === 'joined' ? 'জয়েন করেছে' : 'নতুন'}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => handleSendWhatsApp(lead)}
                      className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-sm transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Meet লিংক পাঠান</span>
                    </button>
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