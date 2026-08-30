'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { 
  Settings, 
  Save, 
  Phone, 
  Megaphone, 
  CreditCard,
  User,
  Share2,
  Upload,
  Globe,
  Clock,
  Sparkles,
  MapPin,
  Mail,
  ChevronDown,
  ChevronUp,
  Youtube,
  Plus,
  Trash2,
  Quote,
  Star,
  RefreshCw
} from 'lucide-react';

export function SiteSettingsForm() {
  const { settings, updateSettings, showToast } = useApp();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  // Accordion Expand/Collapse States
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'branding',
    'doctor',
    'contact',
    'payment',
    'notice',
  ]);

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionKey) ? prev.filter((k) => k !== sectionKey) : [...prev, sectionKey]
    );
  };

  const handleOgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData({ ...formData, metaOgImageUrl: reader.result });
          showToast('সোশ্যাল প্রিভিউ ইমেজ সফলভাবে পরিবর্তন হয়েছে!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const ok = await updateSettings(formData);
      if (ok) {
        showToast('সাইট সেটিংস ও কন্টেন্ট সফলভাবে ডাটাবেজে সংরক্ষিত হয়েছে!', 'success');
      } else {
        showToast('সংরক্ষণে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।', 'error');
      }
    } catch (err: any) {
      showToast('ত্রুটি: ' + err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-bangla text-slate-100">
      
      {/* Top Banner & Submit Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-400" />
            সাইটের সার্বিক কন্টেন্ট ও সিস্টেম সেটিংস
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            বিকাশ/নগদ নম্বর, হেল্পলাইন, স্যারের বার্তা, ক্লাসের সময় ও সাইটের যাবতীয় টেক্সট পরিবর্তন করুন।
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-900/30 transition duration-200"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'সংরক্ষিত হচ্ছে...' : 'সেটিংস সংরক্ষণ করুন'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* ========================================================= */}
        {/* ACCORDION 1: BRANDING & HEADLINES */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('branding')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">১. একাডেমির নাম ও হোমপেজ শিরোনাম</h3>
                <p className="text-xs text-slate-400">একাডেমির নাম, প্রধান স্লোগান, মূল হেডলাইন ও সাব-হেডলাইন</p>
              </div>
            </div>
            {expandedSections.includes('branding') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSections.includes('branding') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-4 bg-slate-900/40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">একাডেমির নাম / সাইট টাইটেল</label>
                  <input
                    type="text"
                    value={formData.siteTitle}
                    onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">একাডেমি স্লোগান (Slogan)</label>
                  <input
                    type="text"
                    value={formData.slogan}
                    onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">হোমপেজ প্রধান হেডলাইন</label>
                  <input
                    type="text"
                    value={formData.heroHeadline}
                    onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">হোমপেজ সাব-হেডলাইন (বিস্তারিত বিবরণ)</label>
                  <textarea
                    rows={2}
                    value={formData.heroSubheadline}
                    onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* ACCORDION 2: DOCTOR PROFILE & MESSAGE */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('doctor')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">২. প্রধান প্রশিক্ষক / চিকিৎসকের পরিচিতি</h3>
                <p className="text-xs text-slate-400">নাম, পদবী, শিক্ষাগত যোগ্যতা, অভিজ্ঞতা ও শিক্ষার্থী বার্তা</p>
              </div>
            </div>
            {expandedSections.includes('doctor') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSections.includes('doctor') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-4 bg-slate-900/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">চিকিৎসকের নাম</label>
                  <input
                    type="text"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">পদবী ও ভূমিকা</label>
                  <input
                    type="text"
                    value={formData.doctorTitle}
                    onChange={(e) => setFormData({ ...formData, doctorTitle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">শিক্ষাগত যোগ্যতা ও ডিগ্রি</label>
                  <input
                    type="text"
                    value={formData.doctorDegrees}
                    onChange={(e) => setFormData({ ...formData, doctorDegrees: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">চিকিৎসা ও শিক্ষকতা অভিজ্ঞতা</label>
                  <input
                    type="text"
                    value={formData.doctorExperience}
                    onChange={(e) => setFormData({ ...formData, doctorExperience: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-400 block">চেম্বার সাক্ষাতের সময়</label>
                  <input
                    type="text"
                    value={formData.doctorChamberTime || ''}
                    onChange={(e) => setFormData({ ...formData, doctorChamberTime: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="md:col-span-3 space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">শিক্ষার্থী ও চিকিৎসকদের উদ্দেশ্যে স্যারের বার্তা</label>
                  <textarea
                    rows={3}
                    value={formData.doctorMessage}
                    onChange={(e) => setFormData({ ...formData, doctorMessage: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* ACCORDION 3: PAYMENT ACCOUNTS */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('payment')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-pink-500/10 text-pink-400 rounded-xl">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">৩. বিকাশ, নগদ ও রকেট পেমেন্ট অ্যাকাউন্ট</h3>
                <p className="text-xs text-slate-400">ভর্তি ফি ও মাসিক ফি গ্রহণের মোবাইল ব্যাংকিং নম্বর</p>
              </div>
            </div>
            {expandedSections.includes('payment') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSections.includes('payment') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-6 bg-slate-900/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* bKash */}
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-pink-900/40 space-y-3">
                  <span className="text-xs font-black text-pink-400 block">bKash (বিকাশ)</span>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">বিকাশ নম্বর</label>
                    <input
                      type="text"
                      value={formData.bkashNumber}
                      onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-pink-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">অ্যাকাউন্টের ধরন</label>
                    <select
                      value={formData.bkashType}
                      onChange={(e) => setFormData({ ...formData, bkashType: e.target.value as 'Personal' | 'Merchant' })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-pink-500"
                    >
                      <option value="Merchant">Merchant (মার্চেন্ট - পেমেন্ট অপশন)</option>
                      <option value="Personal">Personal (ব্যক্তিগত - সেন্ড মানি)</option>
                    </select>
                  </div>
                </div>

                {/* Nagad */}
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-orange-900/40 space-y-3">
                  <span className="text-xs font-black text-orange-400 block">Nagad (নগদ)</span>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">নগদ নম্বর</label>
                    <input
                      type="text"
                      value={formData.nagadNumber}
                      onChange={(e) => setFormData({ ...formData, nagadNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">অ্যাকাউন্টের ধরন</label>
                    <select
                      value={formData.nagadType}
                      onChange={(e) => setFormData({ ...formData, nagadType: e.target.value as 'Personal' | 'Merchant' })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-orange-500"
                    >
                      <option value="Personal">Personal (ব্যক্তিগত - সেন্ড মানি)</option>
                      <option value="Merchant">Merchant (মার্চেন্ট)</option>
                    </select>
                  </div>
                </div>

                {/* Rocket */}
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-purple-900/40 space-y-3">
                  <span className="text-xs font-black text-purple-400 block">Rocket (রকেট)</span>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">রকেট নম্বর (ঐচ্ছিক)</label>
                    <input
                      type="text"
                      value={formData.rocketNumber || ''}
                      onChange={(e) => setFormData({ ...formData, rocketNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">অ্যাকাউন্টের ধরন</label>
                    <input
                      type="text"
                      disabled
                      value="Personal"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* ACCORDION 4: CONTACT & HELPLINE NUMBERS */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('contact')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">৪. হেল্পলাইন ও সরাসরি যোগাযোগ নম্বর</h3>
                <p className="text-xs text-slate-400">হোয়াটসঅ্যাপ, হেল্পলাইন, চেম্বার ঠিকানা ও অফিশিয়াল ইমেইল</p>
              </div>
            </div>
            {expandedSections.includes('contact') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSections.includes('contact') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-4 bg-slate-900/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-emerald-400 block">প্রধান হেল্পলাইন নম্বর</label>
                  <input
                    type="text"
                    value={formData.helplineNumber}
                    onChange={(e) => setFormData({ ...formData, helplineNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-emerald-400 block">হোয়াটসঅ্যাপ নম্বর (WhatsApp)</label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">বিকল্প হেল্পলাইন নম্বর</label>
                  <input
                    type="text"
                    value={formData.alternateHelpline || ''}
                    onChange={(e) => setFormData({ ...formData, alternateHelpline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">অফিশিয়াল ইমেইল</label>
                  <input
                    type="email"
                    value={formData.officialEmail || ''}
                    onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">চেম্বার / একাডেমি ঠিকানা</label>
                  <input
                    type="text"
                    value={formData.chamberAddress || ''}
                    onChange={(e) => setFormData({ ...formData, chamberAddress: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* ACCORDION 5: GOOGLE MEET & NOTICE MARQUEE */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('notice')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">৫. লাইভ ক্লাস গুগল মিট ও শীর্ষ ঘোষণা নোটিশ</h3>
                <p className="text-xs text-slate-400">গুগল মিট রুম লিংক, ক্লাসের রুটিন ও সাইট নোটিশ বার</p>
              </div>
            </div>
            {expandedSections.includes('notice') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSections.includes('notice') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-4 bg-slate-900/40">
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
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">সকালের মর্নিং কেস সাপোর্ট সময়</label>
                  <input
                    type="text"
                    value={formData.morningSupportTime || 'সকাল ৮:০০ - ৯:০০ টা'}
                    onChange={(e) => setFormData({ ...formData, morningSupportTime: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">শীর্ষ ঘোষণা নোটিশ (Announcement Marquee)</label>
                  <textarea
                    rows={2}
                    value={formData.noticeText}
                    onChange={(e) => setFormData({ ...formData, noticeText: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* ACCORDION 6: SOCIAL MEDIA & OG IMAGE */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('social')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">৬. সোশ্যাল মিডিয়া ও শেয়ার ইমেজ (OG Image)</h3>
                <p className="text-xs text-slate-400">ফেসবুক, ইউটিউব ও হোয়াটসঅ্যাপ প্রিভিউ ইমেজ</p>
              </div>
            </div>
            {expandedSections.includes('social') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSections.includes('social') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-4 bg-slate-900/40">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-red-400 block">YouTube চ্যানেল লিংক</label>
                  <input
                    type="url"
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-blue-400 block">Facebook পেজ লিংক</label>
                  <input
                    type="url"
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

      </form>

    </div>
  );
}
