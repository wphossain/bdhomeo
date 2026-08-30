'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Settings, Save, CheckCircle2, Phone, Megaphone, Video, Clock } from 'lucide-react';

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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-bangla space-y-6">
      
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-700" />
          সাইট সেটিংস ও ডাইনামিক নোটিশ কন্ট্রোল
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          বিকাশ/নগদ নম্বর, ক্লাসের সময় বা নোটিশ পরিবর্তন করলে তা সাথে সাথে পুরো ওয়েবসাইটে আপডেট হয়ে যাবে।
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Payment Numbers */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-emerald-800">
            ১. অফিসিয়াল পেমেন্ট নম্বর সেটিংস
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* bKash */}
            <div className="space-y-2 p-4 bg-pink-50/50 rounded-2xl border border-pink-200">
              <label className="block text-xs font-bold text-pink-900">
                বিকাশ নম্বর
              </label>
              <input
                type="text"
                value={formData.bkashNumber}
                onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-pink-300 text-sm font-mono font-bold bg-white"
              />
              <div className="flex items-center gap-4 text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="bkashType"
                    checked={formData.bkashType === 'Personal'}
                    onChange={() => setFormData({ ...formData, bkashType: 'Personal' })}
                  />
                  <span>Personal (Send Money)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="bkashType"
                    checked={formData.bkashType === 'Merchant'}
                    onChange={() => setFormData({ ...formData, bkashType: 'Merchant' })}
                  />
                  <span>Merchant (Payment)</span>
                </label>
              </div>
            </div>

            {/* Nagad */}
            <div className="space-y-2 p-4 bg-orange-50/50 rounded-2xl border border-orange-200">
              <label className="block text-xs font-bold text-orange-900">
                নগদ নম্বর
              </label>
              <input
                type="text"
                value={formData.nagadNumber}
                onChange={(e) => setFormData({ ...formData, nagadNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-orange-300 text-sm font-mono font-bold bg-white"
              />
              <div className="flex items-center gap-4 text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="nagadType"
                    checked={formData.nagadType === 'Personal'}
                    onChange={() => setFormData({ ...formData, nagadType: 'Personal' })}
                  />
                  <span>Personal</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="nagadType"
                    checked={formData.nagadType === 'Merchant'}
                    onChange={() => setFormData({ ...formData, nagadType: 'Merchant' })}
                  />
                  <span>Merchant</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Helpline & Schedule */}
        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-emerald-800">
            ২. হেল্পলাইন ও ক্লাস ইনফো
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                হোয়াটসঅ্যাপ / হেল্পলাইন নম্বর
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ক্লাসের সময়সূচি
              </label>
              <input
                type="text"
                value={formData.classTime}
                onChange={(e) => setFormData({ ...formData, classTime: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Live Meet Link & Notice Bar */}
        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider text-emerald-800">
            ৩. গুগল মিট লিংক ও নোটিশ বার
          </h4>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                গুগল মিট (Google Meet) ক্লাসরুম লিংক
              </label>
              <input
                type="url"
                value={formData.googleMeetUrl}
                onChange={(e) => setFormData({ ...formData, googleMeetUrl: e.target.value })}
                placeholder="https://meet.google.com/xyz-abcd-efg"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                শীর্ষ ঘোষণা নোটিশ (Announcement Banner)
              </label>
              <input
                type="text"
                value={formData.noticeText}
                onChange={(e) => setFormData({ ...formData, noticeText: e.target.value })}
                placeholder="যেমন: আগামী ব্যাচের ভর্তি চলছে..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm px-7 py-3 rounded-xl shadow-lg transition"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সেটিংস সেভ করুন'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}