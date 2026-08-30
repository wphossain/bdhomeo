'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { GalleryItem } from '@/lib/types';
import { 
  ImageIcon, 
  Plus, 
  Trash2, 
  Save, 
  Upload, 
  Sparkles, 
  User,
  FolderOpen,
  CheckCircle2
} from 'lucide-react';

export function MediaManager() {
  const { settings, updateSettings, showToast } = useApp();
  const [heroImg, setHeroImg] = useState(settings.heroImageUrl);
  const [portraitImg, setPortraitImg] = useState(settings.doctorPortraitUrl);
  const [ptfImg, setPtfImg] = useState(settings.ptfCertificateImageUrl);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(settings.galleryImages || []);
  const [isSaving, setIsSaving] = useState(false);

  // File Upload Helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setter(reader.result);
          showToast('ছবি সফলভাবে আপলোড হয়েছে!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryFileUpload = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          handleUpdateGalleryItem(itemId, 'src', reader.result);
          showToast('গ্যালারি ছবি আপলোড হয়েছে!', 'success');
        }
      };
      reader.readAsDataURL(file);
    }
  };

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
            কম্পিউটার থেকে ছবি আপলোড করুন অথবা পাথ পরিবর্তন করে ওয়েবসাইট ব্যানার ও অ্যালবাম সাজান।
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
          ১. প্রধান ব্রান্ডিং ইমেজ (Hero Banner, Doctor Bio & PTF Certificate)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Hero Banner Image */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">হিরো ব্যানার ইমেজ</span>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <Image src={heroImg} alt="Hero Banner" fill className="object-cover" />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="w-full flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-700/80 rounded-xl py-2.5 text-xs font-bold cursor-pointer transition">
                <Upload className="w-3.5 h-3.5" />
                <span>কম্পিউটার থেকে আপলোড</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, setHeroImg)}
                  className="hidden"
                />
              </label>

              <input
                type="text"
                value={heroImg}
                onChange={(e) => setHeroImg(e.target.value)}
                placeholder="ইমেজ URL বা পাথ"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-[11px] font-mono text-slate-300 outline-none"
              />
            </div>
          </div>

          {/* Doctor Portrait Image */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">স্যারের প্রোফাইল পোর্ট্রেট</span>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <Image src={portraitImg} alt="Doctor Portrait" fill className="object-cover" />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="w-full flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-700/80 rounded-xl py-2.5 text-xs font-bold cursor-pointer transition">
                <Upload className="w-3.5 h-3.5" />
                <span>কম্পিউটার থেকে আপলোড</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, setPortraitImg)}
                  className="hidden"
                />
              </label>

              <input
                type="text"
                value={portraitImg}
                onChange={(e) => setPortraitImg(e.target.value)}
                placeholder="ইমেজ URL বা পাথ"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-[11px] font-mono text-slate-300 outline-none"
              />
            </div>
          </div>

          {/* PTF Certificate Image */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">PTF সার্টিফিকেট সনদ</span>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <Image src={ptfImg} alt="PTF Certificate" fill className="object-cover" />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="w-full flex items-center justify-center gap-2 bg-slate-950 hover:bg-slate-800 text-emerald-400 border border-slate-700/80 rounded-xl py-2.5 text-xs font-bold cursor-pointer transition">
                <Upload className="w-3.5 h-3.5" />
                <span>কম্পিউটার থেকে আপলোড</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, setPtfImg)}
                  className="hidden"
                />
              </label>

              <input
                type="text"
                value={ptfImg}
                onChange={(e) => setPtfImg(e.target.value)}
                placeholder="ইমেজ URL বা পাথ"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-[11px] font-mono text-slate-300 outline-none"
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
              কর্মশালা, সেমিনার ও সার্টিফিকেট বিতরণী অ্যালবাম পরিবর্তন করুন।
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
                <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
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
                    <select
                      value={item.category}
                      onChange={(e) => handleUpdateGalleryItem(item.id, 'category', e.target.value)}
                      className="bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-300 outline-none"
                    >
                      <option value="কর্মশালা">কর্মশালা</option>
                      <option value="সার্টিফিকেশন">সার্টিফিকেশন</option>
                      <option value="আলোচনা সভা">আলোচনা সভা</option>
                      <option value="একাডেমিক সেশন">একাডেমিক সেশন</option>
                    </select>

                    <label className="flex items-center justify-center gap-1 bg-slate-950 hover:bg-slate-800 border border-slate-700/80 rounded-lg px-2 py-1 text-[11px] font-bold text-emerald-400 cursor-pointer transition">
                      <Upload className="w-3 h-3" />
                      <span>ছবি পাল্টান</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleGalleryFileUpload(e, item.id)}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <input
                    type="text"
                    value={item.src}
                    onChange={(e) => handleUpdateGalleryItem(item.id, 'src', e.target.value)}
                    placeholder="ইমেজ পাথ বা URL"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1 text-[10px] font-mono text-slate-400 outline-none"
                  />
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
