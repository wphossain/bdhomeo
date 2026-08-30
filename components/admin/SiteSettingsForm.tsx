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
  Star
} from 'lucide-react';

export function SiteSettingsForm() {
  const { settings, updateSettings, showToast } = useApp();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  // Accordion Expand/Collapse States
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'doctor',
    'videos',
    'testimonials',
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
      title: 'নতুন ভিডিও লেকচার ক্লাস',
      subtitle: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি ক্লিনিক্যাল ক্লাস',
      youtubeId: 'M7lc1UVf-VE',
      duration: '২০:০০ মিনিট',
      tag: 'ক্লিনিক্যাল ক্লাস',
    };
    setFormData({
      ...formData,
      videoShowcaseList: [...(formData.videoShowcaseList || []), newVideo],
    });
  };

  const handleDeleteVideo = (id: string) => {
    setFormData({
      ...formData,
      videoShowcaseList: (formData.videoShowcaseList || []).filter((v) => v.id !== id),
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

  // Testimonials Handlers
  const handleAddTestimonial = () => {
    const newTestimonial: TestimonialItem = {
      id: `t-${Date.now()}`,
      name: 'ডাঃ নতুন শিক্ষার্থী',
      designation: 'ডিএইচএমএস শিক্ষার্থী, ঢাকা',
      batchName: 'বেসিক ফাউন্ডেশন ব্যাচ',
      quote: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের অর্গানন ও মেটেরিয়া মেডিকার বিশ্লেষণ অসাধারণ!',
      rating: 5,
    };
    setFormData({
      ...formData,
      testimonials: [...(formData.testimonials || []), newTestimonial],
    });
  };

  const handleDeleteTestimonial = (id: string) => {
    setFormData({
      ...formData,
      testimonials: (formData.testimonials || []).filter((t) => t.id !== id),
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

  // File Upload Helper for OG Share Image
  const handleOgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData({ ...formData, metaOgImageUrl: reader.result });
          showToast('WhatsApp / Social Share প্রিভিউ ছবি আপলোড হয়েছে!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
            সাইট কনটেন্ট ও কন্ট্রোল হাব (Dropdown Settings CMS)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            প্রতিটি ড্রপডাউন ওপেন করে স্যারের পরিচিতি, পেমেন্ট নম্বর, ভিডিও শোকেস ও রিভিউ সহজেই এডিট করুন।
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সকল পরিবর্তন সংরক্ষণ করুন'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* ========================================================= */}
        {/* ACCORDION 1: DOCTOR BIO & PROFILE CMS */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('doctor')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">১. ডাঃ মোঃ গিয়াস উদ্দিন স্যারের প্রোফাইল ও পরিচিতি</h3>
                <p className="text-xs text-slate-400">নাম, পদবী, শিক্ষাগত যোগ্যতা, অভিজ্ঞতা ও মূল বাণী</p>
              </div>
            </div>
            {expandedSections.includes('doctor') ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {expandedSections.includes('doctor') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-4 bg-slate-900/40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">স্যারের পুরো নাম</label>
                  <input
                    type="text"
                    value={formData.doctorName || 'ডাঃ মোঃ গিয়াস উদ্দিন'}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-bold outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">প্রতিষ্ঠানের পদবী / টাইটেল</label>
                  <input
                    type="text"
                    value={formData.doctorTitle || 'প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক, বিডি হোমিও'}
                    onChange={(e) => setFormData({ ...formData, doctorTitle: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">শিক্ষাগত যোগ্যতা ও ডিগ্রী</label>
                  <input
                    type="text"
                    value={formData.doctorDegrees || 'ডিএইচএমএস (ঢাকা), বিএইচএমএস (রিসার্চার)'}
                    onChange={(e) => setFormData({ ...formData, doctorDegrees: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">ক্লিনিক্যাল অভিজ্ঞতার বিবরণ</label>
                  <input
                    type="text"
                    value={formData.doctorExperience || '২০+ বছরের অভিজ্ঞ প্র্যাকটিশনার ও ট্রেইনার'}
                    onChange={(e) => setFormData({ ...formData, doctorExperience: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 block">চেম্বার ও রোগী দেখার সময়সূচি</label>
                  <input
                    type="text"
                    value={formData.doctorChamberTime || 'শনিবার থেকে বৃহস্পতিবার (সকাল ৯:০০ - রাত ৮:০০)'}
                    onChange={(e) => setFormData({ ...formData, doctorChamberTime: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-400 block">স্যারের মূল বাণী ও দর্শন (Doctor Message)</label>
                  <textarea
                    rows={3}
                    value={formData.doctorMessage}
                    onChange={(e) => setFormData({ ...formData, doctorMessage: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white leading-relaxed outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* ACCORDION 2: YOUTUBE VIDEO SHOWCASE CMS */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('videos')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl">
                <Youtube className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">২. হোমপেজ ইউটিউব ভিডিও শোকেস ম্যানেজার ({formData.videoShowcaseList?.length || 0} টি ভিডিও)</h3>
                <p className="text-xs text-slate-400">ভিডিও লিঙ্ক, শিরোনাম, সাব-টাইটেল, ডিউরেশন ও ট্যাগ এডিট করুন</p>
              </div>
            </div>
            {expandedSections.includes('videos') ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {expandedSections.includes('videos') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-6 bg-slate-900/40">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddVideo}
                  className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন ভিডিও যোগ করুন</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.videoShowcaseList || []).map((video) => (
                  <div key={video.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-red-400 uppercase">YouTube ID বা Link</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteVideo(video.id)}
                          className="p-1 text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={video.youtubeId}
                        onChange={(e) => handleUpdateVideo(video.id, 'youtubeId', e.target.value)}
                        placeholder="যেমন: M7lc1UVf-VE"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-emerald-300 outline-none"
                      />

                      <input
                        type="text"
                        value={video.title}
                        onChange={(e) => handleUpdateVideo(video.id, 'title', e.target.value)}
                        placeholder="ভিডিওর শিরোনাম"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-white outline-none"
                      />

                      <input
                        type="text"
                        value={video.subtitle}
                        onChange={(e) => handleUpdateVideo(video.id, 'subtitle', e.target.value)}
                        placeholder="সাব-টাইটেল বা বিবরণ"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 outline-none"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={video.duration}
                          onChange={(e) => handleUpdateVideo(video.id, 'duration', e.target.value)}
                          placeholder="সময় (যেমন: ১৮:৪৫ মিনিট)"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-slate-300 outline-none"
                        />
                        <input
                          type="text"
                          value={video.tag}
                          onChange={(e) => handleUpdateVideo(video.id, 'tag', e.target.value)}
                          placeholder="ট্যাগ (যেমন: মেটেরিয়া মেডিকা)"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-[11px] text-amber-400 font-bold outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* ACCORDION 3: STUDENT TESTIMONIALS CMS */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('testimonials')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
                <Quote className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">৩. শিক্ষার্থী রিভিউ ও প্রশংসাপত্র CMS ({formData.testimonials?.length || 0} টি রিভিউ)</h3>
                <p className="text-xs text-slate-400">হোমপেজে প্রদর্শিত বাংলা রিভিউ, চিকিৎসকের নাম, ব্যাচ ও রেটিং</p>
              </div>
            </div>
            {expandedSections.includes('testimonials') ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {expandedSections.includes('testimonials') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-6 bg-slate-900/40">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddTestimonial}
                  className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন রিভিউ যোগ করুন</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(formData.testimonials || []).map((t) => (
                  <div key={t.id} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteTestimonial(t.id)}
                          className="p-1 text-rose-400 hover:text-rose-300"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => handleUpdateTestimonial(t.id, 'name', e.target.value)}
                        placeholder="শিক্ষার্থীর নাম"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold text-white outline-none"
                      />

                      <input
                        type="text"
                        value={t.designation}
                        onChange={(e) => handleUpdateTestimonial(t.id, 'designation', e.target.value)}
                        placeholder="পদবী ও জেলা (যেমন: হোমিও প্র্যাকটিশনার, বগুড়া)"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 outline-none"
                      />

                      <input
                        type="text"
                        value={t.batchName}
                        onChange={(e) => handleUpdateTestimonial(t.id, 'batchName', e.target.value)}
                        placeholder="ব্যাচের নাম (যেমন: বেসিক ৯ম ব্যাচ)"
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-[11px] text-amber-400 font-bold outline-none"
                      />

                      <textarea
                        rows={3}
                        value={t.quote}
                        onChange={(e) => handleUpdateTestimonial(t.id, 'quote', e.target.value)}
                        placeholder="শিক্ষার্থীর বিস্তারিত রিভিউ..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* ACCORDION 4: OFFICIAL PAYMENT NUMBERS */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('payments')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-pink-500/10 text-pink-400 rounded-xl">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">৪. অফিসিয়াল পেমেন্ট নম্বর সেটিংস</h3>
                <p className="text-xs text-slate-400">বিকাশ মার্চেন্ট (01815-883101) ও নগদ (01811-123993)</p>
              </div>
            </div>
            {expandedSections.includes('payments') ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {expandedSections.includes('payments') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-4 bg-slate-900/40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* bKash */}
                <div className="space-y-3 p-4 bg-slate-900 rounded-2xl border border-pink-500/30">
                  <label className="text-xs font-bold text-pink-400 block">
                    বিকাশ মার্চেন্ট পেমেন্ট নম্বর (Payment Option)
                  </label>
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
          )}
        </div>

        {/* ========================================================= */}
        {/* ACCORDION 5: HELPLINES & SOCIAL LINKS */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('contacts')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">৫. হেল্পলাইন, হোয়াটসঅ্যাপ ও সোশ্যাল মিডিয়া</h3>
                <p className="text-xs text-slate-400">হোয়াটসঅ্যাপ, ফোন কল, ফেসবুক পেজ ও গ্রুপ, ইউটিউব ও টেলিগ্রাম</p>
              </div>
            </div>
            {expandedSections.includes('contacts') ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {expandedSections.includes('contacts') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-4 bg-slate-900/40">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-emerald-400 block">হোয়াটসঅ্যাপ নম্বর</label>
                  <input
                    type="text"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-emerald-400 block">প্রধান হেল্পলাইন ফোন</label>
                  <input
                    type="text"
                    value={formData.helplineNumber}
                    onChange={(e) => setFormData({ ...formData, helplineNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">বিকল্প সাপোর্ট নম্বর</label>
                  <input
                    type="text"
                    value={formData.alternateHelpline || '01815-883101'}
                    onChange={(e) => setFormData({ ...formData, alternateHelpline: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-300 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">ইউটিউব চ্যানেল লিংক</label>
                  <input
                    type="url"
                    value={formData.youtubeUrl}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">ফেসবুক প্রোফাইল লিংক</label>
                  <input
                    type="url"
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 block">ফেসবুক গ্রুপ লিংক</label>
                  <input
                    type="url"
                    value={formData.facebookGroupUrl || ''}
                    onChange={(e) => setFormData({ ...formData, facebookGroupUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* ACCORDION 6: GOOGLE MEET & NOTICE MARQUEE */}
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
                <h3 className="text-base font-black text-white">৬. লাইভ ক্লাস গুগল মিট ও শীর্ষ ঘোষণা নোটিশ</h3>
                <p className="text-xs text-slate-400">গুগল মিট রুম লিংক, ক্লাসের রুটিন ও সাইট নোটিশ বার</p>
              </div>
            </div>
            {expandedSections.includes('notice') ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
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
                    value={formData.morningSupportTime || 'সকাল ৮:০০ টা'}
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
        {/* ACCORDION 7: SOCIAL SHARE & OG IMAGE */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('ogimage')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">৭. সোশ্যাল শেয়ার ও হোয়াটসঅ্যাপ প্রিভিউ ইমেজ (OG Image)</h3>
                <p className="text-xs text-slate-400">হোয়াটসঅ্যাপ ও ফেসবুকে লিংক শেয়ার দিলে এই ছবি শো করবে</p>
              </div>
            </div>
            {expandedSections.includes('ogimage') ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {expandedSections.includes('ogimage') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-4 bg-slate-900/40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    কম্পিউটার থেকে ছবি সিলেক্ট করুন অথবা ইমেজ লিংক পরিবর্তন করুন।
                  </p>

                  <label className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold cursor-pointer transition">
                    <Upload className="w-4 h-4" />
                    <span>প্রিভিউ ইমেজ আপলোড করুন</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleOgImageUpload}
                      className="hidden"
                    />
                  </label>

                  <input
                    type="text"
                    value={formData.metaOgImageUrl || ''}
                    onChange={(e) => setFormData({ ...formData, metaOgImageUrl: e.target.value })}
                    placeholder="https://bdhomeo.com/assets/sir/sir-hero.jpg"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-300 outline-none"
                  />
                </div>

                <div className="relative aspect-[1200/630] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-md">
                  <Image
                    src={formData.metaOgImageUrl || '/assets/sir/sir-hero.jpg'}
                    alt="Social Meta Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
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
