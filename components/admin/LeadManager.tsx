'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { OrientationLead } from '@/lib/types';
import { 
  MessageSquare, 
  Send, 
  Search, 
  Filter, 
  Plus, 
  CheckCircle2, 
  X
} from 'lucide-react';

export function LeadManager() {
  const { leads, settings, updateLeadStatus, submitOrientationLead } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'joined'>('all');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  // New manual lead form
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualBackground, setManualBackground] = useState('হোমিওপ্যাথিক প্র্যাকটিশনার');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.homeoBackground.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSendWhatsApp = (lead: OrientationLead) => {
    const rawNumber = lead.phone.replace(/[^0-9]/g, '');
    const cleanNumber = rawNumber.startsWith('880') ? rawNumber : `880${rawNumber.startsWith('0') ? rawNumber.slice(1) : rawNumber}`;
    const msg = `আসসালামু আলাইকুম ${lead.name} ডাক্তার সাহেব,\n\nবিডি হোমিও প্রশিক্ষণ কেন্দ্রের ফ্রি ওরিয়েন্টেশন ক্লাসে রেজিস্ট্রেশন করার জন্য ধন্যবাদ।\n\n📅 লাইভ ক্লাসের সময়: ${settings.classTime}\n🔗 সরাসরি গুগল মিট লিংক: ${settings.googleMeetUrl}\n\nযেকোনো প্রয়োজনে আমাদের অফিসিয়াল হেল্পলাইনে যোগাযোগ করুন: ${settings.helplineNumber}\n— ডাঃ মোঃ গিয়াস উদ্দিন, বিডি হোমিও`;
    
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    updateLeadStatus(lead.id, 'contacted');
  };

  const handleManualAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone) return;

    await submitOrientationLead({
      name: manualName,
      phone: manualPhone,
      homeoBackground: manualBackground,
    });

    setManualName('');
    setManualPhone('');
    setIsAddLeadModalOpen(false);
  };

  const newCount = leads.filter((l) => l.status === 'new').length;
  const contactedCount = leads.filter((l) => l.status === 'contacted').length;
  const joinedCount = leads.filter((l) => l.status === 'joined').length;

  return (
    <div className="space-y-6 font-bangla">
      
      {/* Header */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-400" />
            ফ্রি ওরিয়েন্টেশন লিড সিআরএম (Orientation Lead CRM)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            ফ্রি ক্লাসে রেজিস্ট্রেশন করা আগ্রহীদের ১-ক্লিকে হোয়াটসঅ্যাপে গুগল মিট লিংক পাঠান।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>ম্যানুয়ালি লিড যোগ করুন</span>
          </button>
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
            placeholder="নাম, মোবাইল নম্বর বা ব্যাকগ্রাউন্ড দিয়ে খুঁজুন..."
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
              <option value="all">সকল লিড ({leads.length})</option>
              <option value="new">নতুন লিড ({newCount})</option>
              <option value="contacted">লিংক পাঠানো হয়েছে ({contactedCount})</option>
              <option value="joined">ভর্তি নিশ্চিত ({joinedCount})</option>
            </select>
          </div>

        </div>

      </div>

      {/* Table */}
      {filteredLeads.length === 0 ? (
        <div className="bg-slate-950 rounded-3xl p-12 text-center border border-slate-800 text-slate-500 space-y-2">
          <MessageSquare className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm font-bold text-slate-400">কোনো লিড পাওয়া যায়নি</p>
          <p className="text-xs">ল্যান্ডিং পেজ থেকে ফ্রি ক্লাসের জন্য ফর্ম পূরণ করলে এখানে দেখা যাবে।</p>
        </div>
      ) : (
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-4 px-5">নাম ও তথ্য</th>
                  <th className="py-4 px-5">মোবাইল নম্বর</th>
                  <th className="py-4 px-5">হোমিওপ্যাথিক ব্যাকগ্রাউন্ড</th>
                  <th className="py-4 px-5">স্ট্যাটাস</th>
                  <th className="py-4 px-5 text-right">হোয়াটসঅ্যাপ লিংক পাঠান</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-4 px-5 font-bold text-white text-sm">
                      {lead.name}
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-emerald-400 text-xs">
                      {lead.phone}
                    </td>
                    <td className="py-4 px-5 text-slate-300">
                      {lead.homeoBackground}
                    </td>
                    <td className="py-4 px-5">
                      {lead.status === 'new' && (
                        <span className="bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[10px] font-black px-2.5 py-1 rounded-full">
                          নতুন লিড
                        </span>
                      )}
                      {lead.status === 'contacted' && (
                        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> লিংক পাঠানো হয়েছে
                        </span>
                      )}
                      {lead.status === 'joined' && (
                        <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-black px-2.5 py-1 rounded-full">
                          ভর্তি সম্পন্ন
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleSendWhatsApp(lead)}
                        className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-3.5 py-2 rounded-xl shadow transition text-xs"
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
        </div>
      )}

      {/* Manual Add Lead Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" />
                ম্যানুয়ালি নতুন লিড যুক্ত করুন
              </h3>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualAddLead} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">শিক্ষার্থীর নাম</label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="যেমন: ডাঃ মোঃ রফিকুল ইসলাম"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  required
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  placeholder="যেমন: 017XXXXXXXX"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">হোমিওপ্যাথিক ব্যাকগ্রাউন্ড</label>
                <input
                  type="text"
                  value={manualBackground}
                  onChange={(e) => setManualBackground(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg transition"
              >
                লিড সেভ করুন
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
