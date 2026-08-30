'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { OrientationLead } from '@/lib/types';
import { MessageSquare, ExternalLink, CheckCircle2, Clock, Send } from 'lucide-react';

export function LeadManager() {
  const { leads, settings, updateLeadStatus } = useApp();

  const handleSendWhatsApp = (lead: OrientationLead) => {
    const rawNumber = lead.phone.replace(/[^0-9]/g, '');
    const cleanNumber = rawNumber.startsWith('880') ? rawNumber : `880${rawNumber.startsWith('0') ? rawNumber.slice(1) : rawNumber}`;
    const msg = `আসসালামু আলাইকুম ${lead.name} ডাক্তার সাহেব,\n\nবিডি হোমিও প্রশিক্ষণ কেন্দ্রের ফ্রি ওরিয়েন্টেশন ক্লাসে রেজিস্ট্রেশন করার জন্য ধন্যবাদ।\n\n📅 লাইভ ক্লাসের সময়: ${settings.classTime}\n🔗 সরাসরি গুগল মিট লিংক: ${settings.googleMeetUrl}\n\nযেকোনো প্রয়োজনে আমাদের অফিসিয়াল হেল্পলাইনে যোগাযোগ করুন: ${settings.helplineNumber}\n— ডাঃ মোঃ গিয়াস উদ্দিন, বিডি হোমিও`;
    
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    updateLeadStatus(lead.id, 'contacted');
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-bangla space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-700" />
            ফ্রি ওরিয়েন্টেশন লিড ম্যানেজার (Orientation Lead CRM)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            ফ্রি ক্লাসে রেজিস্ট্রেশন করা আগ্রহী শিক্ষার্থীদের সরাসরি হোয়াটসঅ্যাপে গুগল মিট লিংক পাঠিয়ে দিন।
          </p>
        </div>

        <span className="text-xs font-bold bg-blue-100 text-blue-900 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          মোট লিড: {leads.length} জন
        </span>
      </div>

      {leads.length === 0 ? (
        <div className="text-center py-12 text-slate-400 space-y-2">
          <MessageSquare className="w-10 h-10 mx-auto text-slate-300" />
          <p className="text-sm font-bold">এখনো কোনো ওরিয়েন্টেশন লিড জমা পড়েনি</p>
          <p className="text-xs">ল্যান্ডিং পেজ থেকে কেউ রেজিস্ট্রেশন করলে এখানে দেখা যাবে।</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase">
                <th className="py-3 px-4">নাম</th>
                <th className="py-3 px-4">মোবাইল নম্বর</th>
                <th className="py-3 px-4">হোমিও ব্যাকগ্রাউন্ড</th>
                <th className="py-3 px-4">স্ট্যাটাস</th>
                <th className="py-3 px-4 text-right">হোয়াটসঅ্যাপ মেসেজ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {lead.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {lead.phone}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {lead.homeoBackground}
                  </td>
                  <td className="py-3.5 px-4">
                    {lead.status === 'new' && (
                      <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-md text-[10px]">
                        নতুন লিড
                      </span>
                    )}
                    {lead.status === 'contacted' && (
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-md text-[10px] flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" /> লিংক পাঠানো হয়েছে
                      </span>
                    )}
                    {lead.status === 'joined' && (
                      <span className="bg-purple-50 text-purple-700 font-bold px-2.5 py-1 rounded-md text-[10px]">
                        ভর্তি হয়েছে
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleSendWhatsApp(lead)}
                      className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-3.5 py-2 rounded-xl shadow-sm transition"
                    >
                      <Send className="w-3.5 h-3.5" />
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