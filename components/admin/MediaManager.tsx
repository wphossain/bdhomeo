'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { GalleryItem } from '@/lib/types';
import { 
  ImageIcon, 
  Plus, 
  Trash2, 
  Save, 
  Sparkles, 
  User
} from 'lucide-react';

export function MediaManager() {
  const { settings, updateSettings, showToast } = useApp();
  const [heroImg, setHeroImg] = useState(settings.heroImageUrl);
  const [portraitImg, setPortraitImg] = useState(settings.doctorPortraitUrl);
  const [ptfImg, setPtfImg] = useState(settings.ptfCertificateImageUrl);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(settings.galleryImages || []);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveMedia = async () => {
    setIsSaving(true);
    await updateSettings({
      heroImageUrl: heroImg,
      doctorPortraitUrl: portraitImg,
      ptfCertificateImageUrl: ptfImg,
      galleryImages: galleryList,
    });
    setIsSaving(false);
    showToast('সকল ছবি ও গ্যালারি কনটেন্ট সফলভাবে সেভ হয়েছে!', 'success');
  };

  const handleAddGalleryItem = () => {
    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      src: '/assets/gallery/workshop-practical.jpg',
      title: 'নতুন কর্মশালা ও কেস স্টাডি সেশন',
      category: 'কর্মশালা',
      desc: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি ক্লিনিক্যাল ক্লাস',
    };
    setGalleryList([...galleryList, newItem]);
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryList(galleryList.filter((item) => item.id !== id));
  };

  const handleUpdateGalleryItem = (id: string, field: keyof GalleryItem, val: string) => {
    setGalleryList(galleryList.map((item) => (item.id === id ? { ...item, [field]: val } : item)));
  };

  return (
    <div className="space-y-8 font-bangla">
      
      {/* Top Header */}
      <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-emerald-400" />
            ছবি ও মিডিয়া ম্যানেজার (Media & Gallery CMS)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            হিরো ইমেজ, স্যারের পোর্ট্রেট, PTF সার্টিফিকেট ও ওয়ার্কশপ ফটোগ্যালারি পরিবর্তন করুন।
          </p>
        </div>

        <button
          onClick={handleSaveMedia}
          disabled={isSaving}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'ছবি ও গ্যালারি সেভ করুন'}</span>
        </button>
      </div>

      {/* 1. Core Profile & Branding Images */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-emerald-400" />
          ১. প্রধান ব্রান্ডিং ইমেজ (Hero, Doctor Bio & PTF Certificate)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Hero Banner Image */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <Image src={heroImg} alt="Hero Banner" fill className="object-cover" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">হিরো ব্যানার ইমেজ পাথ (URL)</label>
              <input
                type="text"
                value={heroImg}
                onChange={(e) => setHeroImg(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-emerald-300 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Doctor Portrait Image */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <Image src={portraitImg} alt="Doctor Portrait" fill className="object-cover" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">স্যারের প্রোফাইল ফটো পাথ (URL)</label>
              <input
                type="text"
                value={portraitImg}
                onChange={(e) => setPortraitImg(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-emerald-300 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* PTF Certificate Image */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <Image src={ptfImg} alt="PTF Certificate" fill className="object-cover" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">PTF সার্টিফিকেট ইমেজ পাথ (URL)</label>
              <input
                type="text"
                value={ptfImg}
                onChange={(e) => setPtfImg(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-emerald-300 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 2. Photo Gallery & Workshops */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              ২. ফটো গ্যালারি ও কর্মশালা অ্যালবাম ({galleryList.length} টি ছবি)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              ওয়েবসাইটে প্রদর্শিত কর্মশালা, সেমিনার ও সার্টিফিকেট বিতরণী ফটোগুলো আপডেট করুন।
            </p>
          </div>

          <button
            onClick={handleAddGalleryItem}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>নতুন ছবি যোগ করুন</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {galleryList.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3 flex flex-col justify-between"
            >
              <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                  <Image src={item.src} alt={item.title} fill className="object-cover" />
                </div>

                <div className="flex-1 space-y-2 min-w-0">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdateGalleryItem(item.id, 'title', e.target.value)}
                    placeholder="ছবির ক্যাপশন / শিরোনাম"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white font-bold focus:border-emerald-500 outline-none"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleUpdateGalleryItem(item.id, 'category', e.target.value)}
                      placeholder="ক্যাটাগরি"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-300 outline-none"
                    />

                    <input
                      type="text"
                      value={item.src}
                      onChange={(e) => handleUpdateGalleryItem(item.id, 'src', e.target.value)}
                      placeholder="ইমেজ পাথ (/assets/...)"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs font-mono text-emerald-300 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-end">
                <button
                  onClick={() => handleDeleteGalleryItem(item.id)}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-bold"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>মুছে ফেলুন</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
