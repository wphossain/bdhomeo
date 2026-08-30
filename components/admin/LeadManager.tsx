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
  X,
  Check,
  Phone,
  User,
  Calendar,
  Sparkles
} from 'lucide-react';

export function LeadManager() {
  const { leads, settings, updateLeadStatus, submitOrientationLead, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'joined'>('all');
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  // New manual lead form
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [selectedPresetBackground, setSelectedPresetBackground] = useState('হোমিওপ্যাথি শিক্ষার্থী (DHMS)');
  const [customBackground, setCustomBackground] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const backgroundPresets = [
    'হোমিওপ্যাথি শিক্ষার্থী (DHMS)',
    'রেজিস্টার্ড প্র্যাকটিশনার / ডিএইচএমএস পাস',
    'মেডিকেল শিক্ষার্থী / ডাক্তার / এমবিবিএস',
    'উচ্চতর হোমিওপ্যাথি (BHMS) গ্র্যাজুয়েট',
    'ফার্মাসিস্ট / স্বাস্থ্যকর্মী',
    'সাধারণ শিক্ষার্থী (অন্যান্য ব্যাকগ্রাউন্ড)'
  ];

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.homeoBackground.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const newCount = leads.filter((l) => l.status === 'new').length;
  const contactedCount = leads.filter((l) => l.status === 'contacted').length;
  const joinedCount = leads.filter((l) => l.status === 'joined').length;

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualPhone) {
      showToast('নাম ও মোবাইল নম্বর লিখুন', 'error');
      return;
    }

    const finalBg = customBackground.trim() ? customBackground : selectedPresetBackground;
    setIsSubmitting(true);
    const ok = await submitOrientationLead({
      name: manualName,
      phone: manualPhone,
      homeoBackground: finalBg,
    });
    setIsSubmitting(false);

    if (ok) {
      setIsAddLeadModalOpen(false);
      setManualName('');
      setManualPhone('');
      setCustomBackground('');
      showToast('নতুন ওরিয়েন্টেশন লিড সফলভাবে যুক্ত হয়েছে!', 'success');
    }
  };

  return (
    <div className="space-y-6 font-bangla text-slate-100">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-black text-white">
              ফ্রি ওরিয়েন্টেশন ক্লাস লিড CRM (Orientation Leads)
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            হোমপেজ থেকে ফ্রি ক্লাসের জন্য রেজিস্টার করা আগ্রহী শিক্ষার্থী ও ডাক্তারদের কল লিস্ট।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-400">নতুন লিড:</span>
            <span className="font-bold text-purple-400 font-mono ml-1">{newCount} জন</span>
          </div>

          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন লিড যোগ করুন</span>
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নাম, ফোন বা ব্যাকগ্রাউন্ড..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {(['all', 'new', 'contacted', 'joined'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                statusFilter === st
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st === 'all' && 'সকল লিড'}
              {st === 'new' && `নতুন (${newCount})`}
              {st === 'contacted' && `কল দেওয়া হয়েছে (${contactedCount})`}
              {st === 'joined' && `ভর্তি সম্পন্ন (${joinedCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold">
                <th className="p-4">নাম ও মোবাইল</th>
                <th className="p-4">হোমিওপ্যাথিক ব্যাকগ্রাউন্ড</th>
                <th className="p-4">রেজিস্ট্রেশন তারিখ</th>
                <th className="p-4">স্ট্যাটাস</th>
                <th className="p-4 text-right">কল ও হোয়াটসঅ্যাপ অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    কোনো ওরিয়েন্টেশন লিড পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-950/40 transition">
                    <td className="p-4">
                      <div className="font-bold text-white">{lead.name}</div>
                      <div className="text-[11px] text-emerald-400 font-mono font-bold">{lead.phone}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-950 text-slate-300 font-medium px-2.5 py-1 rounded-lg border border-slate-800">
                        {lead.homeoBackground}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 text-[11px] font-mono">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('bn-BD') : '২০২৬'}
                    </td>
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2.5 py-1 text-xs outline-none focus:border-emerald-500"
                      >
                        <option value="new">নতুন লিড</option>
                        <option value="contacted">কল করা হয়েছে</option>
                        <option value="joined">কোর্সে ভর্তি হয়েছে</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`tel:${lead.phone.replace(/[^0-9]/g, '')}`}
                          className="p-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 rounded-xl border border-emerald-800/60 transition"
                          title="সরাসরি ফোন কল করুন"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/880${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`আসসালামু আলাইকুম ${lead.name} ডাক্তার সাহেব, বিডি হোমিও একাডেমি থেকে যোগাযোগ করা হলো।`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-xl border border-[#25D366]/30 transition"
                          title="হোয়াটসঅ্যাপে মেসেজ পাঠান"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Lead Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <span>নতুন ওরিয়েন্টেশন লিড এন্ট্রি</span>
              </h3>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">নাম *</label>
                <input
                  type="text"
                  required
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  placeholder="যেমন: ডাঃ মোঃ কামরুল ইসলাম"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  required
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">হোমিওপ্যাথিক ব্যাকগ্রাউন্ড</label>
                <select
                  value={selectedPresetBackground}
                  onChange={(e) => setSelectedPresetBackground(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none mb-2"
                >
                  {backgroundPresets.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  value={customBackground}
                  onChange={(e) => setCustomBackground(e.target.value)}
                  placeholder="অথবা কাস্টম ব্যাকগ্রাউন্ড লিখুন..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition"
                >
                  {isSubmitting ? 'সংরক্ষণ হচ্ছে...' : 'লিড সেভ করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
