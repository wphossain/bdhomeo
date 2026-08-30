'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { GalleryItem } from '@/lib/types';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Sparkles, 
  Check, 
  Camera, 
  Award,
  User,
  UploadCloud
} from 'lucide-react';

export function MediaManager() {
  const { settings, updateSettings } = useApp();
  const [heroImg, setHeroImg] = useState(settings.heroImageUrl || '/assets/sir/sir-hero.jpg');
  const [docPortrait, setDocPortrait] = useState(settings.doctorPortraitUrl || '/assets/sir/sir-portrait.jpg');
  const [ptfImg, setPtfImg] = useState(settings.ptfCertificateImageUrl || '/assets/gallery/certificate-ptf-1.jpg');
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(settings.galleryImages || []);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddGalleryItem = () => {
    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      src: '/assets/gallery/workshop-practical.jpg',
      title: 'নতুন কর্মশালার শিরোনাম',
      category: 'কর্মশালা',
      desc: 'কর্মশালার সংক্ষিপ্ত বিবরণ লিখুন',
    };
    setGalleryList([...galleryList, newItem]);
  };

  const handleUpdateGalleryItem = (id: string, field: keyof GalleryItem, val: string) => {
    setGalleryList(galleryList.map((item) => (item.id === id ? { ...item, [field]: val } : item)));
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই ছবিটি গ্যালারি থেকে মুছে ফেলতে চান?')) return;
    setGalleryList(galleryList.filter((item) => item.id !== id));
  };

  const handleSaveMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateSettings({
      heroImageUrl: heroImg,
      doctorPortraitUrl: docPortrait,
      ptfCertificateImageUrl: ptfImg,
      galleryImages: galleryList,
    });
    setIsSaving(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm font-bangla space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-700" />
            ছবি ও গ্যালারি মিডিয়া ম্যানেজার (Media & Image Assets CMS)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            হোমপেজের হিরো ছবি, স্যারের প্রোফাইল ফটো, PTF সার্টিফিকেট এবং কর্মশালা ফটো গ্যালারির ছবি পরিবর্তন করুন।
          </p>
        </div>

        <button
          onClick={handleSaveMedia}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-lg transition shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সকল ছবি সেভ করুন'}</span>
        </button>
      </div>

      <form onSubmit={handleSaveMedia} className="space-y-8">
        
        {/* 1. Core Feature Images (Hero, Bio, PTF) */}
        <div className="space-y-4">
          <h4 className="font-black text-slate-900 text-sm border-b pb-2 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            ১. ওয়েবসাইটের মূল ব্যানার ও সার্টিফিকেট ছবিসমূহ
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Hero Image */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-700" />
                  হিরো সেকশন ফটো
                </span>
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-300">
                  <Image src={heroImg} alt="Hero Preview" fill className="object-cover" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-600">ইমেজ পাথ বা অনলাইন URL</label>
                <input
                  type="text"
                  value={heroImg}
                  onChange={(e) => setHeroImg(e.target.value)}
                  placeholder="/assets/sir/sir-hero.jpg"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs bg-white"
                />
              </div>
            </div>

            {/* Doctor Portrait Image */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-emerald-700" />
                  স্যারের বায়ো / পরিচিতি ফটো
                </span>
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-300">
                  <Image src={docPortrait} alt="Doctor Portrait" fill className="object-cover" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-600">ইমেজ পাথ বা অনলাইন URL</label>
                <input
                  type="text"
                  value={docPortrait}
                  onChange={(e) => setDocPortrait(e.target.value)}
                  placeholder="/assets/sir/sir-portrait.jpg"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs bg-white"
                />
              </div>
            </div>

            {/* PTF Certificate Image */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" />
                  PTF সার্টিফিকেট শোকেস
                </span>
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-300">
                  <Image src={ptfImg} alt="PTF Certificate" fill className="object-cover" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-600">ইমেজ পাথ বা অনলাইন URL</label>
                <input
                  type="text"
                  value={ptfImg}
                  onChange={(e) => setPtfImg(e.target.value)}
                  placeholder="/assets/gallery/certificate-ptf-1.jpg"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs bg-white"
                />
              </div>
            </div>

          </div>
        </div>

        {/* 2. Photo Gallery Items */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="font-black text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-emerald-700" />
              ২. কর্মশালা ও সেমিনার ফটো গ্যালারি ({galleryList.length} টি ছবি)
            </h4>
            <button
              type="button"
              onClick={handleAddGalleryItem}
              className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-200 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>নতুন ছবি যোগ করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {galleryList.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start">
                  
                  {/* Thumbnail Preview */}
                  <div className="sm:col-span-5 relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-300">
                    <Image src={item.src} alt={item.title} fill className="object-cover" />
                  </div>

                  {/* Fields */}
                  <div className="sm:col-span-7 space-y-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700">ছবির শিরোনাম</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateGalleryItem(item.id, 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700">ক্যাটাগরি ট্যাগ</label>
                        <input
                          type="text"
                          value={item.category}
                          onChange={(e) => handleUpdateGalleryItem(item.id, 'category', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                        />
                      </div>
                      <div className="flex items-end justify-end">
                        <button
                          type="button"
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border border-rose-200 transition text-xs flex items-center gap-1 font-bold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>মুছুন</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700">সংক্ষিপ্ত বিবরণ</label>
                      <input
                        type="text"
                        value={item.desc}
                        onChange={(e) => handleUpdateGalleryItem(item.id, 'desc', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600">ইমেজ পাথ বা অনলাইন URL</label>
                  <input
                    type="text"
                    value={item.src}
                    onChange={(e) => handleUpdateGalleryItem(item.id, 'src', e.target.value)}
                    placeholder="/assets/gallery/..."
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 font-mono text-xs bg-white text-emerald-950"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-xl transition"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সকল ছবি সেভ করুন'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}