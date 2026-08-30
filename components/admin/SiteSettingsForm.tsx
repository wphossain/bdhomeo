'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { 
  Settings, 
  Save, 
  Phone, 
  Megaphone, 
  CreditCard,
  Globe,
  Share2,
  Mail,
  MapPin,
  Sparkles
} from 'lucide-react';

export function SiteSettingsForm() {
  const { settings, updateSettings, showToast } = useApp();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings(formData);
    setIsSaving(false);
    showToast('ওয়েবসাইটের কনটেন্ট ও সকল সেটিংস সফলভাবে আপডেট হয়েছে!', 'success');
  };

  return (
    <div className="space-y-6 font-bangla">
      
      {/* Header */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-400" />
            সাইট কনটেন্ট ও সার্বিক সেটিংস (Site Settings CMS)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            পেমেন্ট নম্বর, হেল্পলাইন, সোশ্যাল লিংক, গুগল মিট ক্লাসরুম ও নোটিশ আপডেট করুন।
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সকল সেটিংস সংরক্ষণ করুন'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Official Payment Numbers */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            ১. অফিসিয়াল পেমেন্ট নম্বর সেটিংস (bKash Merchant & Nagad)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* bKash */}
            <div className="space-y-3 p-4 bg-slate-900 rounded-2xl border border-pink-500/30">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-pink-400">
                  বিকাশ মার্চেন্ট পেমেন্ট নম্বর (Payment Option)
                </label>
                <span className="bg-pink-500/20 text-pink-300 text-[10px] font-black px-2 py-0.5 rounded">
                  Merchant
                </span>
              </div>
              <input
                type="text"
                value={formData.bkashNumber}
                onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                className="w-full bg-slate-950 border border-pink-500/40 rounded-xl px-3.5 py-2.5 text-sm font-mono font-black text-white outline-none focus:border-pink-500"
              />
              <div className="flex items-center gap-4 text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-pink-300">
                  <input
                    type="radio"
                    name="bkashType"
                    checked={formData.bkashType === 'Merchant'}
                    onChange={() => setFormData({ ...formData, bkashType: 'Merchant' })}
                  />
                  <span>Merchant (Payment)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-400">
                  <input
                    type="radio"
                    name="bkashType"
                    checked={formData.bkashType === 'Personal'}
                    onChange={() => setFormData({ ...formData, bkashType: 'Personal' })}
                  />
                  <span>Personal (Send Money)</span>
                </label>
              </div>
            </div>

            {/* Nagad */}
            <div className="space-y-3 p-4 bg-slate-900 rounded-2xl border border-orange-500/30">
              <label className="text-xs font-bold text-orange-400 block">
                নগদ নম্বর (Send Money / Payment)
              </label>
              <input
                type="text"
                value={formData.nagadNumber}
                onChange={(e) => setFormData({ ...formData, nagadNumber: e.target.value })}
                className="w-full bg-slate-950 border border-orange-500/40 rounded-xl px-3.5 py-2.5 text-sm font-mono font-black text-white outline-none focus:border-orange-500"
              />
              <div className="flex items-center gap-4 text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-orange-300">
                  <input
                    type="radio"
                    name="nagadType"
                    checked={formData.nagadType === 'Personal'}
                    onChange={() => setFormData({ ...formData, nagadType: 'Personal' })}
                  />
                  <span>Personal (Send Money)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-400">
                  <input
                    type="radio"
                    name="nagadType"
                    checked={formData.nagadType === 'Merchant'}
                    onChange={() => setFormData({ ...formData, nagadType: 'Merchant' })}
                  />
                  <span>Merchant (Payment)</span>
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* 2. Helpline, WhatsApp & Chamber Contacts */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Phone className="w-5 h-5 text-emerald-400" />
            ২. অফিসিয়াল হেল্পলাইন, হোয়াটসঅ্যাপ ও যোগাযোগ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-500/30 space-y-1.5">
              <label className="text-xs font-bold text-emerald-400 block">
                হোয়াটসঅ্যাপ নম্বর (WhatsApp Floating)
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white outline-none"
              />
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-emerald-500/30 space-y-1.5">
              <label className="text-xs font-bold text-emerald-400 block">
                সরাসরি ফোন কল ও প্রধান হেল্পলাইন
              </label>
              <input
                type="text"
                value={formData.helplineNumber}
                onChange={(e) => setFormData({ ...formData, helplineNumber: e.target.value })}
                className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3 py-2 text-xs font-mono font-bold text-white outline-none"
              />
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">
                বিকল্প সাপোর্ট নম্বর (Alternate)
              </label>
              <input
                type="text"
                value={formData.alternateHelpline || '01815-883101'}
                onChange={(e) => setFormData({ ...formData, alternateHelpline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">অফিসিয়াল ইমেইল (Official Email)</label>
              <input
                type="email"
                value={formData.officialEmail || 'bdhomeo@gmail.com'}
                onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-400 block">চেম্বার ও প্রধান কার্যালয়ের ঠিকানা</label>
              <input
                type="text"
                value={formData.chamberAddress || 'ঢাকা, বাংলাদেশ'}
                onChange={(e) => setFormData({ ...formData, chamberAddress: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Social Media & Community Links */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Share2 className="w-5 h-5 text-emerald-400" />
            ৩. সোশ্যাল মিডিয়া ও কমিউনিটি চ্যানেল
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">ইউটিউব চ্যানেল লিংক (YouTube URL)</label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">স্যারের ফেসবুক প্রোফাইল লিংক (Facebook Profile)</label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">অফিসিয়াল ফেসবুক গ্রুপ (Facebook Group)</label>
              <input
                type="url"
                value={formData.facebookGroupUrl || 'https://www.facebook.com/groups/bdhomeo'}
                onChange={(e) => setFormData({ ...formData, facebookGroupUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">টেলিগ্রাম চ্যানেল / গ্রুপ (Telegram Channel)</label>
              <input
                type="url"
                value={formData.telegramUrl || 'https://t.me/bdhomeo'}
                onChange={(e) => setFormData({ ...formData, telegramUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* 4. Live Class Google Meet & Notice Bar */}
        <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Megaphone className="w-5 h-5 text-emerald-400" />
            ৪. গুগল মিট লাইভ ক্লাসরুম ও শীর্ষ ঘোষণা নোটিশ
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">গুগল মিট (Google Meet) ক্লাসরুম লিংক</label>
              <input
                type="url"
                value={formData.googleMeetUrl}
                onChange={(e) => setFormData({ ...formData, googleMeetUrl: e.target.value })}
                className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-emerald-300 outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">লাইভ ক্লাসের সময়সূচি টেক্সট</label>
              <input
                type="text"
                value={formData.classTime}
                onChange={(e) => setFormData({ ...formData, classTime: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">প্রতিষ্ঠানের স্লোগান</label>
              <input
                type="text"
                value={formData.slogan}
                onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-400 block">শীর্ষ ঘোষণা নোটিশ (Announcement Marquee)</label>
              <textarea
                rows={2}
                value={formData.noticeText}
                onChange={(e) => setFormData({ ...formData, noticeText: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

      </form>

    </div>
  );
}
