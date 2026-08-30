'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { VideoShowcaseItem, TestimonialItem } from '@/lib/types';
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
    'schedule',
    'videos',
    'testimonials',
    'social',
  ]);

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionKey) ? prev.filter((k) => k !== sectionKey) : [...prev, sectionKey]
    );
  };

  // Video Showcase Handlers
  const handleAddVideo = () => {
    const newVideo: VideoShowcaseItem = {
      id: `v-${Date.now()}`,
      title: 'নতুন লেকচার ভিডিও ক্লাস',
      subtitle: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি ক্লিনিক্যাল ক্লাস',
      youtubeId: 'M7lc1UVf-VE',
      duration: '৪৫ মিনিট',
      tag: 'ক্লিনিক্যাল ক্লাস',
    };
    setFormData({
      ...formData,
      videoShowcaseList: [...(formData.videoShowcaseList || []), newVideo],
    });
  };

  const handleUpdateVideo = (id: string, field: keyof VideoShowcaseItem, val: string) => {
    setFormData({
      ...formData,
      videoShowcaseList: (formData.videoShowcaseList || []).map((v) =>
        v.id === id ? { ...v, [field]: val } : v
      ),
    });
  };

  const handleDeleteVideo = (id: string) => {
    setFormData({
      ...formData,
      videoShowcaseList: (formData.videoShowcaseList || []).filter((v) => v.id !== id),
    });
  };

  // Testimonials Handlers
  const handleAddTestimonial = () => {
    const newTestimonial: TestimonialItem = {
      id: `t-${Date.now()}`,
      name: 'ডাঃ নতুন শিক্ষার্থী',
      designation: 'DHMS, প্র্যাকটিশনার',
      batchName: 'বেসিক ব্যাচ',
      quote: 'বিডি হোমিও প্রশিক্ষণ কেন্দ্র থেকে কোর্স সম্পন্ন করে আমার চেম্বারের রোগী আরোগ্যের হার অনেক বৃদ্ধি পেয়েছে।',
      rating: 5,
      avatarUrl: '/assets/sir/sir-portrait.jpg',
    };
    setFormData({
      ...formData,
      testimonials: [...(formData.testimonials || []), newTestimonial],
    });
  };

  const handleUpdateTestimonial = (id: string, field: keyof TestimonialItem, val: any) => {
    setFormData({
      ...formData,
      testimonials: (formData.testimonials || []).map((t) =>
        t.id === id ? { ...t, [field]: val } : t
      ),
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    setFormData({
      ...formData,
      testimonials: (formData.testimonials || []).filter((t) => t.id !== id),
    });
  };

  // Submit & Save into Supabase Database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const ok = await updateSettings(formData);
      if (ok) {
        showToast('সাইট সেটিংস ও কন্টেন্ট ডাটাবেজে সফলভাবে সংরক্ষিত হয়েছে!', 'success');
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
    <form onSubmit={handleSubmit} className="space-y-6 font-bangla text-slate-100">
      
      {/* Top Header & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-black text-white">সাইটের যাবতীয় কন্টেন্ট, নাম্বার ও সেটিংস পরিচালনা</h2>
          </div>
          <p className="text-xs text-slate-400">
            এখানে পরিবর্তন করা সকল তথ্য তাত্ক্ষণিকভাবে হোমপেজ, কোর্স পেজ ও ডাটাবেজে আপডেট হবে।
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3.5 rounded-2xl shadow-lg transition"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'সংরক্ষিত হচ্ছে...' : 'সেটিংস সংরক্ষণ করুন'}</span>
        </button>
      </div>

      {/* SECTION 1: BRANDING & HEADLINES */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('branding')}
          className="w-full p-5 flex items-center justify-between text-left font-bold text-sm text-white hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>১. একাডেমি ব্র্যান্ডিং, শিরোনাম ও নোটিশ বার</span>
          </div>
          {expandedSections.includes('branding') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {expandedSections.includes('branding') && (
          <div className="p-6 pt-0 border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">একাডেমির নাম</label>
                <input
                  type="text"
                  value={formData.siteTitle}
                  onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">স্লোগান / ট্যাগলাইন</label>
                <input
                  type="text"
                  value={formData.slogan}
                  onChange={(e) => setFormData({ ...formData, slogan: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">হোমপেজ প্রধান হেডলাইন</label>
              <input
                type="text"
                value={formData.heroHeadline}
                onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">হোমপেজ সাব-হেডলাইন বিবরণ</label>
              <textarea
                rows={2}
                value={formData.heroSubheadline}
                onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-amber-400 flex items-center gap-1">
                <Megaphone className="w-3.5 h-3.5" />
                <span>টপ জরুরি নোটিশ বার টেক্সট</span>
              </label>
              <input
                type="text"
                value={formData.noticeText}
                onChange={(e) => setFormData({ ...formData, noticeText: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-amber-200 focus:border-amber-400 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: DOCTOR PROFILE & PHILOSOPHY */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('doctor')}
          className="w-full p-5 flex items-center justify-between text-left font-bold text-sm text-white hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-emerald-400" />
            <span>২. প্রধান প্রশিক্ষক / চিকিৎসকের পরিচিতি ও বার্তা</span>
          </div>
          {expandedSections.includes('doctor') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {expandedSections.includes('doctor') && (
          <div className="p-6 pt-0 border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">নাম</label>
                <input
                  type="text"
                  value={formData.doctorName}
                  onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">পদবী ও ভূমিকা</label>
                <input
                  type="text"
                  value={formData.doctorTitle}
                  onChange={(e) => setFormData({ ...formData, doctorTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">ডিগ্রি ও যোগ্যতা</label>
                <input
                  type="text"
                  value={formData.doctorDegrees}
                  onChange={(e) => setFormData({ ...formData, doctorDegrees: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">শিক্ষক বার্তা / দর্শন</label>
              <textarea
                rows={3}
                value={formData.doctorMessage}
                onChange={(e) => setFormData({ ...formData, doctorMessage: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: CONTACT & HELPLINE NUMBERS */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('contact')}
          className="w-full p-5 flex items-center justify-between text-left font-bold text-sm text-white hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>৩. হেল্পলাইন, হোয়াটসঅ্যাপ ও চেম্বার তথ্য</span>
          </div>
          {expandedSections.includes('contact') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {expandedSections.includes('contact') && (
          <div className="p-6 pt-0 border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-emerald-400">প্রধান হেল্পলাইন নাম্বার</label>
                <input
                  type="text"
                  value={formData.helplineNumber}
                  onChange={(e) => setFormData({ ...formData, helplineNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-emerald-400">হোয়াটসঅ্যাপ নাম্বার</label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">বিকল্প হেল্পলাইন নাম্বার</label>
                <input
                  type="text"
                  value={formData.alternateHelpline || ''}
                  onChange={(e) => setFormData({ ...formData, alternateHelpline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">অফিসিয়াল ইমেইল</label>
                <input
                  type="email"
                  value={formData.officialEmail || ''}
                  onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">চেম্বার ঠিকানা</label>
                <input
                  type="text"
                  value={formData.chamberAddress || ''}
                  onChange={(e) => setFormData({ ...formData, chamberAddress: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: PAYMENT ACCOUNTS */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('payment')}
          className="w-full p-5 flex items-center justify-between text-left font-bold text-sm text-white hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>৪. পেমেন্ট অ্যাকাউন্ট (বিকাশ ও নগদ নাম্বার)</span>
          </div>
          {expandedSections.includes('payment') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {expandedSections.includes('payment') && (
          <div className="p-6 pt-0 border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-slate-950 p-4 rounded-2xl border border-pink-900/40 space-y-2">
                <span className="text-xs font-black text-pink-400 block">bKash (বিকাশ পেমেন্ট অ্যাকাউন্ট)</span>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">বিকাশ নাম্বার</label>
                  <input
                    type="text"
                    value={formData.bkashNumber}
                    onChange={(e) => setFormData({ ...formData, bkashNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-pink-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">অ্যাকাউন্টের ধরন</label>
                  <select
                    value={formData.bkashType}
                    onChange={(e) => setFormData({ ...formData, bkashType: e.target.value as 'Merchant' | 'Personal' })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="Merchant">Merchant (মার্চেন্ট - পেমেন্ট অপশন)</option>
                    <option value="Personal">Personal (ব্যক্তিগত - সেন্ড মানি)</option>
                  </select>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-orange-900/40 space-y-2">
                <span className="text-xs font-black text-orange-400 block">Nagad (নগদ পেমেন্ট অ্যাকাউন্ট)</span>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">নগদ নাম্বার</label>
                  <input
                    type="text"
                    value={formData.nagadNumber}
                    onChange={(e) => setFormData({ ...formData, nagadNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-orange-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">অ্যাকাউন্টের ধরন</label>
                  <select
                    value={formData.nagadType}
                    onChange={(e) => setFormData({ ...formData, nagadType: e.target.value as 'Merchant' | 'Personal' })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="Personal">Personal (ব্যক্তিগত - সেন্ড মানি)</option>
                    <option value="Merchant">Merchant (মার্চেন্ট)</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* SECTION 5: CLASS SCHEDULES & GOOGLE MEET */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('schedule')}
          className="w-full p-5 flex items-center justify-between text-left font-bold text-sm text-white hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>৫. লাইভ ক্লাসের সময়সূচী ও গুগল মিট লিংক</span>
          </div>
          {expandedSections.includes('schedule') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {expandedSections.includes('schedule') && (
          <div className="p-6 pt-0 border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">মূল ক্লাসের সময়</label>
                <input
                  type="text"
                  value={formData.classTime}
                  onChange={(e) => setFormData({ ...formData, classTime: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">মর্নিং কেস সাপোর্ট সময়</label>
                <input
                  type="text"
                  value={formData.morningSupportTime || ''}
                  onChange={(e) => setFormData({ ...formData, morningSupportTime: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">চেম্বার সাক্ষাতের সময়</label>
                <input
                  type="text"
                  value={formData.doctorChamberTime || ''}
                  onChange={(e) => setFormData({ ...formData, doctorChamberTime: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-teal-400">গুগল মিট লাইভ ক্লাসের লিংক (Google Meet URL)</label>
              <input
                type="url"
                value={formData.googleMeetUrl}
                onChange={(e) => setFormData({ ...formData, googleMeetUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-teal-200 font-mono focus:border-teal-400 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION 6: VIDEO SHOWCASE DEMO LECTURES */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5 font-bold text-sm text-white">
            <Youtube className="w-4 h-4 text-red-500" />
            <span>৬. হোমপেজ ভিডিও লেকচার শোকেস</span>
          </div>

          <button
            type="button"
            onClick={handleAddVideo}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ভিডিও যোগ করুন</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {(formData.videoShowcaseList || []).map((vid, idx) => (
            <div key={vid.id || idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 font-mono">ভিডিও #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteVideo(vid.id)}
                  className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">ভিডিওর শিরোনাম</label>
                  <input
                    type="text"
                    value={vid.title}
                    onChange={(e) => handleUpdateVideo(vid.id, 'title', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">ইউটিউব Video ID (যেমন: M7lc1UVf-VE)</label>
                  <input
                    type="text"
                    value={vid.youtubeId}
                    onChange={(e) => handleUpdateVideo(vid.id, 'youtubeId', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">ক্লাসের মেয়াদ</label>
                  <input
                    type="text"
                    value={vid.duration}
                    onChange={(e) => handleUpdateVideo(vid.id, 'duration', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">সাব-টাইটেল / সংক্ষিপ্ত বিবরণ</label>
                <input
                  type="text"
                  value={vid.subtitle}
                  onChange={(e) => handleUpdateVideo(vid.id, 'subtitle', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 7: TESTIMONIALS */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5 font-bold text-sm text-white">
            <Quote className="w-4 h-4 text-amber-400" />
            <span>৭. শিক্ষার্থী চিকিৎসকদের রিভিউ ও মন্তব্য (Testimonials)</span>
          </div>

          <button
            type="button"
            onClick={handleAddTestimonial}
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>রিভিউ যোগ করুন</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          {(formData.testimonials || []).map((t, idx) => (
            <div key={t.id || idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 font-mono">রিভিউ #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleDeleteTestimonial(t.id)}
                  className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">শিক্ষার্থীর নাম</label>
                  <input
                    type="text"
                    value={t.name}
                    onChange={(e) => handleUpdateTestimonial(t.id, 'name', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">পদবী / জেলা</label>
                  <input
                    type="text"
                    value={t.designation}
                    onChange={(e) => handleUpdateTestimonial(t.id, 'designation', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">ব্যাচ নাম</label>
                  <input
                    type="text"
                    value={t.batchName}
                    onChange={(e) => handleUpdateTestimonial(t.id, 'batchName', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">মতামত / রিভিউ টেক্সট</label>
                <textarea
                  rows={2}
                  value={t.quote}
                  onChange={(e) => handleUpdateTestimonial(t.id, 'quote', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 8: SOCIAL MEDIA LINKS */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('social')}
          className="w-full p-5 flex items-center justify-between text-left font-bold text-sm text-white hover:bg-slate-800/50 transition"
        >
          <div className="flex items-center gap-2.5">
            <Share2 className="w-4 h-4 text-emerald-400" />
            <span>৮. সোশ্যাল মিডিয়া ও চ্যানেল লিংক</span>
          </div>
          {expandedSections.includes('social') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {expandedSections.includes('social') && (
          <div className="p-6 pt-0 border-t border-slate-800 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-red-400">YouTube চ্যানেল লিংক</label>
                <input
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-red-500 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-blue-400">Facebook পেইজ লিংক</label>
                <input
                  type="url"
                  value={formData.facebookUrl}
                  onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Floating Save Bar */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/40 shadow-2xl">
        <p className="text-xs text-slate-300 font-bold">
          সকল পরিবর্তন ডাটাবেজে সংরক্ষণ করতে পাশের বাটনে ক্লিক করুন ➔
        </p>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg transition"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'সংরক্ষিত হচ্ছে...' : 'সেটিংস সংরক্ষণ করুন'}</span>
        </button>
      </div>

    </form>
  );
}
