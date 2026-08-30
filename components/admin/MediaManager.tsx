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
  Upload, 
  Sparkles, 
  User,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Eye
} from 'lucide-react';

export function MediaManager() {
  const { settings, updateSettings, showToast } = useApp();
  const [heroImg, setHeroImg] = useState(settings.heroImageUrl);
  const [portraitImg, setPortraitImg] = useState(settings.doctorPortraitUrl);
  const [ptfImg, setPtfImg] = useState(settings.ptfCertificateImageUrl);
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(settings.galleryImages || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
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
      subtitle: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি ক্লিনিক্যাল ক্লাস',
      category: 'কর্মশালা',
      desc: 'বাস্তব রোগীর কেস টেকিং ও লক্ষণ সংগ্রহের বিশেষ সেশন।',
      date: 'আগস্ট ২০২৬',
      showOnHome: true,
    };
    setGalleryList([newItem, ...galleryList]);
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryList(galleryList.filter((item) => item.id !== id));
  };

  const handleUpdateGalleryItem = (id: string, field: keyof GalleryItem, val: any) => {
    setGalleryList(galleryList.map((item) => (item.id === id ? { ...item, [field]: val } : item)));
  };

  const filteredGallery = galleryList.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

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
            কম্পিউটার থেকে ছবি আপলোড করুন, গ্যালারি অ্যালবাম তৈরি করুন এবং হোমপেজ সেকশনের জন্য ছবি সিলেক্ট করুন।
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
          
          {/* Hero Banner */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">হিরো ব্যানার ইমেজ</span>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <Image src={heroImg} alt="Hero Banner" fill sizes="33vw" className="object-cover" />
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

          {/* Doctor Portrait */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">স্যারের প্রোফাইল পোর্ট্রেট</span>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <Image src={portraitImg} alt="Doctor Portrait" fill sizes="33vw" className="object-cover" />
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

          {/* PTF Certificate */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">PTF সার্টিফিকেট সনদ</span>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <Image src={ptfImg} alt="PTF Certificate" fill sizes="33vw" className="object-cover" />
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

      {/* 2. Photo Gallery & Workshops CMS */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              ২. ফটো গ্যালারি ও কর্মশালা অ্যালবাম ({galleryList.length} টি ছবি)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              গ্যালারি পেজ ও হোমপেজ সেকশনের জন্য ছবি যোগ, শিরোনাম ও হোমপেজ টগল সেট করুন।
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

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="শিরোনাম দিয়ে গ্যালারি খুঁজুন..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-300 font-bold outline-none cursor-pointer"
            >
              <option value="all">সকল ক্যাটাগরি</option>
              <option value="কর্মশালা">কর্মশালা</option>
              <option value="সার্টিফিকেশন">সার্টিফিকেশন</option>
              <option value="আলোচনা সভা">আলোচনা সভা</option>
              <option value="একাডেমিক সেশন">একাডেমিক সেশন</option>
            </select>
          </div>
        </div>

        {/* Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3 flex flex-col justify-between"
            >
              <div className="flex gap-4">
                <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                  <Image src={item.src} alt={item.title} fill sizes="128px" className="object-cover" />
                </div>

                <div className="flex-1 space-y-2 min-w-0">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdateGalleryItem(item.id, 'title', e.target.value)}
                    placeholder="ছবির মূল শিরোনাম"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white font-bold focus:border-emerald-500 outline-none"
                  />

                  <input
                    type="text"
                    value={item.subtitle || ''}
                    onChange={(e) => handleUpdateGalleryItem(item.id, 'subtitle', e.target.value)}
                    placeholder="সাব-টাইটেল বা সংক্ষিপ্ত বিবরণ"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 outline-none"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={item.category}
                      onChange={(e) => handleUpdateGalleryItem(item.id, 'category', e.target.value)}
                      className="bg-slate-950 border border-slate-700/80 rounded-lg px-2 py-1 text-xs text-slate-300 outline-none"
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

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={item.date || ''}
                      onChange={(e) => handleUpdateGalleryItem(item.id, 'date', e.target.value)}
                      placeholder="তারিখ (যেমন: আগস্ট ২০২৬)"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1 text-[10px] text-slate-300 outline-none"
                    />

                    <label className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.showOnHome !== false}
                        onChange={(e) => handleUpdateGalleryItem(item.id, 'showOnHome', e.target.checked)}
                        className="rounded text-emerald-600 focus:ring-0"
                      />
                      <span>হোমপেজে দেখান</span>
                    </label>
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
