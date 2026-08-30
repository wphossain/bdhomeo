'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { 
  Settings, 
  Save, 
  Phone, 
  Megaphone, 
  Video, 
  Clock, 
  Globe, 
  Youtube, 
  Facebook, 
  CreditCard,
  User,
  Sparkles
} from 'lucide-react';

export function SiteSettingsForm() {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings(formData);
    setIsSaving(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-bangla space-y-8">
      
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-700" />
          সাইট কনটেন্ট, নম্বর ও ডাইনামিক সিএমএস কন্ট্রোল
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          বিকাশ মার্চেন্ট নম্বর, হোয়াটসঅ্যাপ নম্বর, হেল্পলাইন, নোটিশ এবং ল্যান্ডিং পেজের কনটেন্ট পরিবর্তন করুন।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* 1. Official Payment Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-emerald-100 pb-2">
            <CreditCard className="w-4 h-4 text-emerald-700" />
            <h4 className="font-black text-sm uppercase tracking-wider">
              ১. অফিসিয়াল পেমেন্ট নম্বর সেটিংস (bKash Merchant & Nagad)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* bKash */}
            <div className="space-y-2 p-4 bg-pink-50/60 rounded-2xl border border-pink-200">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-pink-950">
                  বিকাশ মার্চেন্ট পেমেন্ট নম্বর (Payment)
                </label>
                <span className="bg-pink-200 text-pink-900 text-[10px] font-black px-2 py-0.5 rounded">
                  Merchant
                </span>
              </div>
              <input
                type="text"
                value={formData.bkashNumber}
                onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-pink-300 text-sm font-mono font-black bg-white text-pink-950"
              />
              <div className="flex items-center gap-4 text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-pink-900">
                  <input
                    type="radio"
                    name="bkashType"
                    checked={formData.bkashType === 'Merchant'}
                    onChange={() => setFormData({ ...formData, bkashType: 'Merchant' })}
                  />
                  <span>Merchant (Payment - শিক্ষার্থী Payment করবে)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
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
            <div className="space-y-2 p-4 bg-orange-50/60 rounded-2xl border border-orange-200">
              <label className="block text-xs font-bold text-orange-950">
                নগদ নম্বর (Send Money / Payment)
              </label>
              <input
                type="text"
                value={formData.nagadNumber}
                onChange={(e) => setFormData({ ...formData, nagadNumber: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-orange-300 text-sm font-mono font-black bg-white text-orange-950"
              />
              <div className="flex items-center gap-4 text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-bold text-orange-900">
                  <input
                    type="radio"
                    name="nagadType"
                    checked={formData.nagadType === 'Personal'}
                    onChange={() => setFormData({ ...formData, nagadType: 'Personal' })}
                  />
                  <span>Personal (Send Money)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
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

        {/* 2. Helpline, WhatsApp & Social Links */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-emerald-100 pb-2">
            <Phone className="w-4 h-4 text-emerald-700" />
            <h4 className="font-black text-sm uppercase tracking-wider">
              ২. স্যারের মূল ফোন, হোয়াটসঅ্যাপ ও সোশ্যাল মিডিয়া লিংক
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2">
              <label className="block text-xs font-bold text-emerald-950">
                হোয়াটসঅ্যাপ নম্বর (WhatsApp Floating ও সাপোর্ট)
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 text-sm font-mono font-bold bg-white text-emerald-950"
              />
              <p className="text-[11px] text-emerald-800 font-medium">ডিফল্ট: 01811-123993</p>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2">
              <label className="block text-xs font-bold text-emerald-950">
                সরাসরি ফোন কল ও হেল্পলাইন
              </label>
              <input
                type="text"
                value={formData.helplineNumber}
                onChange={(e) => setFormData({ ...formData, helplineNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 text-sm font-mono font-bold bg-white text-emerald-950"
              />
              <p className="text-[11px] text-emerald-800 font-medium">ডিফল্ট: 01811-123993</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ইউটিউব চ্যানেল লিংক (YouTube Channel URL)
              </label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                স্যারের ফেসবুক প্রোফাইল লিংক (Facebook Profile URL)
              </label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono bg-white"
              />
            </div>
          </div>
        </div>

        {/* 3. Live Class Google Meet & Notice Bar */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-emerald-100 pb-2">
            <Megaphone className="w-4 h-4 text-emerald-700" />
            <h4 className="font-black text-sm uppercase tracking-wider">
              ৩. গুগল মিট লাইভ ক্লাসরুম ও শীর্ষ ঘোষণা নোটিশ
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                গুগল মিট (Google Meet) ক্লাসরুম লিংক
              </label>
              <input
                type="url"
                value={formData.googleMeetUrl}
                onChange={(e) => setFormData({ ...formData, googleMeetUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold text-emerald-900 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ক্লাসের সময়সূচি টেক্সট
              </label>
              <input
                type="text"
                value={formData.classTime}
                onChange={(e) => setFormData({ ...formData, classTime: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                প্রতিষ্ঠানের স্লোগান
              </label>
              <input
                type="text"
                value={formData.slogan}
                onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                শীর্ষ ঘোষণা নোটিশ (Announcement Bar Marquee)
              </label>
              <textarea
                rows={2}
                value={formData.noticeText}
                onChange={(e) => setFormData({ ...formData, noticeText: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              />
            </div>
          </div>
        </div>

        {/* 4. Hero Section & Doctor Profile Text */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-900 border-b border-emerald-100 pb-2">
            <Globe className="w-4 h-4 text-emerald-700" />
            <h4 className="font-black text-sm uppercase tracking-wider">
              ৪. হোমপেজ হিরো সেকশন ও স্যারের বার্তা
            </h4>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                হিরো সেকশনের মূল হেডলাইন
              </label>
              <input
                type="text"
                value={formData.heroHeadline}
                onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                হিরো সাব-হেডলাইন বিবরণ
              </label>
              <textarea
                rows={2}
                value={formData.heroSubheadline}
                onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ডাঃ মোঃ গিয়াস উদ্দিন স্যারের অনুপ্রেরণামূলক বার্তা
              </label>
              <textarea
                rows={3}
                value={formData.doctorMessage}
                onChange={(e) => setFormData({ ...formData, doctorMessage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-xl transition"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সকল কনটেন্ট ও সেটিংস সংরক্ষণ করুন'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}