'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { FAQItem, VideoShowcaseItem, TestimonialItem } from '@/lib/types';
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
  RefreshCw,
  HelpCircle,
  Video,
  ImageIcon,
  MessageSquare
} from 'lucide-react';

export function SiteSettingsForm() {
  const { settings, updateSettings, showToast } = useApp();
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  // Synchronize when store updates
  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  // Accordion Expand/Collapse States
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'branding',
    'doctor',
    'contact',
    'payment',
    'notice',
    'faq',
    'video',
    'testimonial',
    'social',
  ]);

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionKey) ? prev.filter((k) => k !== sectionKey) : [...prev, sectionKey]
    );
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof typeof formData) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({ ...prev, [fieldName]: reader.result }));
          showToast('ছবি সফলভাবে নির্বাচিত হয়েছে!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // FAQ CRUD Handlers
  const handleAddFaq = () => {
    const newFaq: FAQItem = {
      question: 'নতুন প্রশ্ন লিখুন?',
      answer: 'এখানে বিস্তারিত উত্তর লিখুন।',
    };
    setFormData((prev) => ({
      ...prev,
      faqs: [...(prev.faqs || []), newFaq],
    }));
    showToast('নতুন FAQ যুক্ত হয়েছে!', 'info');
  };

  const handleUpdateFaq = (index: number, field: keyof FAQItem, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.faqs || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, faqs: updated };
    });
  };

  const handleDeleteFaq = (index: number) => {
    setFormData((prev) => {
      const updated = (prev.faqs || []).filter((_, i) => i !== index);
      return { ...prev, faqs: updated };
    });
    showToast('FAQ মুছে ফেলা হয়েছে।', 'info');
  };

  // Video Showcase CRUD Handlers
  const handleAddVideo = () => {
    const newVideo: VideoShowcaseItem = {
      id: `v-${Date.now()}`,
      title: 'নতুন ভিডিও লেকচারের শিরোনাম',
      subtitle: 'লেকচারের সংক্ষিপ্ত বিবরণ বা আলোচ্য বিষয়',
      youtubeId: 'M7lc1UVf-VE',
      duration: '২০:০০ মিনিট',
      tag: 'ক্লিনিক্যাল ক্লাস',
    };
    setFormData((prev) => ({
      ...prev,
      videoShowcaseList: [...(prev.videoShowcaseList || []), newVideo],
    }));
    showToast('নতুন ইউটিউব লেকচার ডেমো যোগ হয়েছে!', 'info');
  };

  const handleUpdateVideo = (index: number, field: keyof VideoShowcaseItem, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.videoShowcaseList || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, videoShowcaseList: updated };
    });
  };

  const handleDeleteVideo = (index: number) => {
    setFormData((prev) => {
      const updated = (prev.videoShowcaseList || []).filter((_, i) => i !== index);
      return { ...prev, videoShowcaseList: updated };
    });
    showToast('ভিডিও ডেমো মুছে ফেলা হয়েছে।', 'info');
  };

  // Testimonial CRUD Handlers
  const handleAddTestimonial = () => {
    const newTestimonial: TestimonialItem = {
      id: `t-${Date.now()}`,
      name: 'ডাঃ নতুন শিক্ষার্থীর নাম',
      designation: 'হোমিও প্র্যাকটিশনার, জেলা',
      batchName: 'বেসিক ফাউন্ডেশন ব্যাচ',
      quote: 'বিডি হোমিও একাডেমি ও ডাঃ মোঃ গিয়াস উদ্দিন স্যারের অর্গানন ও মেটেরিয়া মেডিকা ক্লাস আমার চেম্বার প্র্যাকটিসে অনেক সাহায্য করেছে।',
      rating: 5,
    };
    setFormData((prev) => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), newTestimonial],
    }));
    showToast('নতুন শিক্ষার্থী রিভিউ যোগ হয়েছে!', 'info');
  };

  const handleUpdateTestimonial = (index: number, field: keyof TestimonialItem, value: any) => {
    setFormData((prev) => {
      const updated = [...(prev.testimonials || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, testimonials: updated };
    });
  };

  const handleDeleteTestimonial = (index: number) => {
    setFormData((prev) => {
      const updated = (prev.testimonials || []).filter((_, i) => i !== index);
      return { ...prev, testimonials: updated };
    });
    showToast('রিভিউ মুছে ফেলা হয়েছে।', 'info');
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-xl sticky top-24 z-20 backdrop-blur-md bg-slate-950/95">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-400" />
            সাইটের সার্বিক কন্টেন্ট ও সিস্টেম সেটিংস
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            বিকাশ/নগদ নম্বর, হেল্পলাইন, স্যারের বার্তা, ছবি, ভিডিও, FAQ, রিভিউ ও সাইটের যাবতীয় কনটেন্ট পরিবর্তন করুন।
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3.5 rounded-2xl shadow-lg shadow-emerald-900/30 transition duration-200"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'সংরক্ষিত হচ্ছে...' : 'সকল সেটিংস সংরক্ষণ করুন'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* ========================================================= */}
        {/* ACCORDION 1: BRANDING & IMAGES */}
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
                <h3 className="text-base font-black text-white">১. একাডেমির নাম, লোগো ও হোমপেজ ব্যানার</h3>
                <p className="text-xs text-slate-400">একাডেমির নাম, স্লোগান, হেডলাইন, সাইট লোগো ও হিরো ছবি</p>
              </div>
            </div>
            {expandedSections.includes('branding') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSections.includes('branding') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-6 bg-slate-900/40">
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

              {/* Logo & Core Image URLs */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>সাইট লোগো ও ব্যানার ইমেজ লিংক / আপলোড</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Site Logo */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">ওয়েবসাইট লোগো (Logo Image URL)</label>
                    <input
                      type="text"
                      value={formData.logoUrl || '/assets/logo.png'}
                      onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                    />
                    <div className="flex items-center gap-3 pt-1">
                      <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-600 inline-flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>ডিভাইস থেকে ছবি নির্বাচন</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileUpload(e, 'logoUrl')}
                        />
                      </label>
                      {formData.logoUrl && (
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-700 bg-white p-0.5">
                          <Image src={formData.logoUrl} alt="Logo Preview" fill className="object-contain" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hero Image */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">হোমপেজ হিরো ব্যানার ইমেজ (Hero Image URL)</label>
                    <input
                      type="text"
                      value={formData.heroImageUrl || '/assets/sir/sir-hero.jpg'}
                      onChange={(e) => setFormData({ ...formData, heroImageUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                    />
                    <div className="flex items-center gap-3 pt-1">
                      <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-600 inline-flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>ডিভাইস থেকে ছবি নির্বাচন</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileUpload(e, 'heroImageUrl')}
                        />
                      </label>
                      {formData.heroImageUrl && (
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                          <Image src={formData.heroImageUrl} alt="Hero Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Doctor Portrait Image */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">স্যারের পোর্ট্রেট ছবি (Doctor Portrait URL)</label>
                    <input
                      type="text"
                      value={formData.doctorPortraitUrl || '/assets/sir/sir-portrait.jpg'}
                      onChange={(e) => setFormData({ ...formData, doctorPortraitUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                    />
                    <div className="flex items-center gap-3 pt-1">
                      <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-600 inline-flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>ডিভাইস থেকে ছবি নির্বাচন</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileUpload(e, 'doctorPortraitUrl')}
                        />
                      </label>
                      {formData.doctorPortraitUrl && (
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                          <Image src={formData.doctorPortraitUrl} alt="Portrait Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* PTF Certificate Image */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                    <label className="text-xs font-bold text-slate-300 block">PTF সার্টিফিকেট সনদ ছবি (Certificate URL)</label>
                    <input
                      type="text"
                      value={formData.ptfCertificateImageUrl || '/assets/gallery/certificate-ptf-1.jpg'}
                      onChange={(e) => setFormData({ ...formData, ptfCertificateImageUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none font-mono"
                    />
                    <div className="flex items-center gap-3 pt-1">
                      <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded-lg border border-slate-600 inline-flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>ডিভাইস থেকে ছবি নির্বাচন</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageFileUpload(e, 'ptfCertificateImageUrl')}
                        />
                      </label>
                      {formData.ptfCertificateImageUrl && (
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-slate-700 bg-slate-900">
                          <Image src={formData.ptfCertificateImageUrl} alt="Certificate Preview" fill className="object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
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
        {/* ACCORDION 6: FAQ MANAGER (প্রশ্নোত্তর ম্যানেজমেন্ট) */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('faq')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-yellow-500/10 text-yellow-400 rounded-xl">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">৬. সাধারণ জিজ্ঞাসা ও উত্তর (FAQ Manager)</h3>
                <p className="text-xs text-slate-400">হোমপেজের প্রশ্ন ও উত্তর যোগ, এডিট ও পরিবর্তন করুন</p>
              </div>
            </div>
            {expandedSections.includes('faq') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSections.includes('faq') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-4 bg-slate-900/40">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">মোট প্রশ্ন: {(formData.faqs || []).length} টি</span>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন FAQ যোগ করুন</span>
                </button>
              </div>

              <div className="space-y-4">
                {(formData.faqs || []).map((faq, index) => (
                  <div key={index} className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3 relative group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-yellow-400">প্রশ্ন #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteFaq(index)}
                        className="text-rose-400 hover:text-rose-300 p-1 rounded-lg hover:bg-rose-500/10 transition"
                        title="FAQ ডিলিট করুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => handleUpdateFaq(index, 'question', e.target.value)}
                        placeholder="প্রশ্নটি লিখুন..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none focus:border-yellow-500"
                      />
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => handleUpdateFaq(index, 'answer', e.target.value)}
                        placeholder="উত্তরটি লিখুন..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none focus:border-yellow-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* ACCORDION 7: YOUTUBE VIDEO SHOWCASE MANAGER */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('video')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">৭. ইউটিউব ভিডিও লেকচার শোকেস (Video Showcase)</h3>
                <p className="text-xs text-slate-400">হোমপেজে প্রদর্শিত ডেমো ক্লাস ও বাস্তব কেস স্টাডি ভিডিও</p>
              </div>
            </div>
            {expandedSections.includes('video') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSections.includes('video') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-4 bg-slate-900/40">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">মোট ডেমো ভিডিও: {(formData.videoShowcaseList || []).length} টি</span>
                <button
                  type="button"
                  onClick={handleAddVideo}
                  className="bg-red-700 hover:bg-red-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন ভিডিও ডেমো যোগ করুন</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.videoShowcaseList || []).map((video, index) => (
                  <div key={video.id || index} className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-400">ভিডিও #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteVideo(index)}
                        className="text-rose-400 hover:text-rose-300 p-1 rounded-lg hover:bg-rose-500/10 transition"
                        title="ভিডিও ডিলিট করুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block">ভিডিও শিরোনাম</label>
                        <input
                          type="text"
                          value={video.title}
                          onChange={(e) => handleUpdateVideo(index, 'title', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-white outline-none focus:border-red-500"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block">সংক্ষিপ্ত সাবটাইটেল</label>
                        <input
                          type="text"
                          value={video.subtitle}
                          onChange={(e) => handleUpdateVideo(index, 'subtitle', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-300 outline-none focus:border-red-500"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase font-bold block">YouTube ID</label>
                          <input
                            type="text"
                            value={video.youtubeId}
                            onChange={(e) => handleUpdateVideo(index, 'youtubeId', e.target.value)}
                            placeholder="M7lc1UVf-VE"
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-mono text-white outline-none focus:border-red-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase font-bold block">ডিউরেশন</label>
                          <input
                            type="text"
                            value={video.duration}
                            onChange={(e) => handleUpdateVideo(index, 'duration', e.target.value)}
                            placeholder="১৮:৪৫ মিনিট"
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-red-500"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase font-bold block">ক্যাটাগরি ট্যাগ</label>
                          <input
                            type="text"
                            value={video.tag}
                            onChange={(e) => handleUpdateVideo(index, 'tag', e.target.value)}
                            placeholder="মেটেরিয়া মেডিকা"
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* ACCORDION 8: TESTIMONIALS MANAGER */}
        {/* ========================================================= */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('testimonial')}
            className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/60 transition"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
                <Quote className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">৮. কৃতি শিক্ষার্থীদের মতামত ও রিভিউ (Testimonials)</h3>
                <p className="text-xs text-slate-400">কোর্স সম্পন্নকারী ডাক্তারদের রিভিউ, রেটিং ও পরিচয়</p>
              </div>
            </div>
            {expandedSections.includes('testimonial') ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {expandedSections.includes('testimonial') && (
            <div className="p-6 sm:p-8 border-t border-slate-800 space-y-4 bg-slate-900/40">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">মোট রিভিউ: {(formData.testimonials || []).length} টি</span>
                <button
                  type="button"
                  onClick={handleAddTestimonial}
                  className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>নতুন রিভিউ যোগ করুন</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.testimonials || []).map((item, index) => (
                  <div key={item.id || index} className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400">রিভিউ #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteTestimonial(index)}
                        className="text-rose-400 hover:text-rose-300 p-1 rounded-lg hover:bg-rose-500/10 transition"
                        title="রিভিউ ডিলিট করুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase font-bold block">শিক্ষার্থীর নাম</label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdateTestimonial(index, 'name', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-bold text-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase font-bold block">পদবী / জেলা</label>
                          <input
                            type="text"
                            value={item.designation}
                            onChange={(e) => handleUpdateTestimonial(index, 'designation', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase font-bold block">ব্যাচের নাম</label>
                          <input
                            type="text"
                            value={item.batchName}
                            onChange={(e) => handleUpdateTestimonial(index, 'batchName', e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-amber-300 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 uppercase font-bold block">স্টার রেটিং (1-5)</label>
                          <input
                            type="number"
                            min={1}
                            max={5}
                            value={item.rating || 5}
                            onChange={(e) => handleUpdateTestimonial(index, 'rating', parseInt(e.target.value) || 5)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 uppercase font-bold block">মতামত / কোট টেক্সট</label>
                        <textarea
                          rows={2}
                          value={item.quote}
                          onChange={(e) => handleUpdateTestimonial(index, 'quote', e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-slate-300 outline-none"
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
        {/* ACCORDION 9: SOCIAL MEDIA & OG IMAGE */}
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
                <h3 className="text-base font-black text-white">৯. সোশ্যাল মিডিয়া ও শেয়ার ইমেজ (Social Links & OG)</h3>
                <p className="text-xs text-slate-400">ইউটিউব, ফেসবুক পেজ, ফেসবুক গ্রুপ ও টেলিগ্রাম লিংক</p>
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
                    value={formData.youtubeUrl || ''}
                    onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-blue-400 block">Facebook পেজ / প্রোফাইল লিংক</label>
                  <input
                    type="url"
                    value={formData.facebookUrl || ''}
                    onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-blue-300 block">Facebook গ্রুপ লিংক</label>
                  <input
                    type="url"
                    value={formData.facebookGroupUrl || ''}
                    onChange={(e) => setFormData({ ...formData, facebookGroupUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sky-400 block">Telegram গ্রুপ / চ্যানেল লিংক</label>
                  <input
                    type="url"
                    value={formData.telegramUrl || ''}
                    onChange={(e) => setFormData({ ...formData, telegramUrl: e.target.value })}
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
