'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { GalleryItem } from '@/lib/types';
import { uploadImageToSupabase } from '@/lib/supabase';
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
  Eye,
  RefreshCw,
  Award
} from 'lucide-react';

export function MediaManager() {
  const { settings, updateSettings, showToast } = useApp();
  const [heroImg, setHeroImg] = useState(settings.heroImageUrl || '/assets/sir/sir-hero.jpg');
  const [portraitImg, setPortraitImg] = useState(settings.doctorPortraitUrl || '/assets/sir/sir-portrait.jpg');
  const [ptfImg, setPtfImg] = useState(settings.ptfCertificateImageUrl || '/assets/gallery/certificate-ptf-1.jpg');
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(settings.galleryImages || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // File Upload Helper to Supabase Storage
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    showToast('ছবি আপলোড হচ্ছে...', 'info');

    try {
      const publicUrl = await uploadImageToSupabase(file, 'banners');
      if (publicUrl) {
        setter(publicUrl);
        showToast('ছবি ক্লাউডে সফলভাবে আপলোড হয়েছে!', 'success');
      } else {
        // Fallback to Data URL if storage bucket is not configured
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setter(reader.result);
            showToast('ছবি লোকাল প্রিভিউতে সেট হয়েছে!', 'success');
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      showToast('আপলোড ত্রুটি: ' + err.message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    showToast('গ্যালারি ছবি আপলোড হচ্ছে...', 'info');

    try {
      const publicUrl = await uploadImageToSupabase(file, 'gallery');
      if (publicUrl) {
        handleUpdateGalleryItem(itemId, 'src', publicUrl);
        showToast('গ্যালারি ছবি ক্লাউডে আপলোড হয়েছে!', 'success');
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            handleUpdateGalleryItem(itemId, 'src', reader.result);
            showToast('গ্যালারি ছবি প্রিভিউতে সেট হয়েছে!', 'success');
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      showToast('আপলোড ত্রুটি: ' + err.message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Gallery Item CRUD
  const handleAddGalleryItem = () => {
    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      src: '/assets/gallery/ptf-certificate-distribution.jpg',
      title: 'নতুন কর্মশালার ছবি',
      subtitle: 'বিডি হোমিও একাডেমি প্রশিক্ষণ ব্যাচ',
      category: 'কর্মশালা ও সেমিনার',
      desc: 'শিক্ষার্থীদের সরাসরি অংশগ্রহণে ক্লিনিক্যাল প্রশিক্ষণ কর্মশালা।',
      date: '২০২৬',
      showOnHome: false,
    };
    setGalleryList([newItem, ...galleryList]);
    showToast('নতুন গ্যালারি আইটেম যোগ হয়েছে!', 'info');
  };

  const handleUpdateGalleryItem = (id: string, field: keyof GalleryItem, value: any) => {
    setGalleryList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteGalleryItem = (id: string) => {
    setGalleryList((prev) => prev.filter((item) => item.id !== id));
    showToast('গ্যালারি আইটেমটি মুছে ফেলা হয়েছে।', 'info');
  };

  // Save All Media to Supabase
  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      const ok = await updateSettings({
        heroImageUrl: heroImg,
        doctorPortraitUrl: portraitImg,
        ptfCertificateImageUrl: ptfImg,
        galleryImages: galleryList,
      });

      if (ok) {
        showToast('গ্যালারি ও সকল ছবি সফলভাবে সংরক্ষিত হয়েছে!', 'success');
      } else {
        showToast('সংরক্ষণে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।', 'error');
      }
    } catch (err: any) {
      showToast('ত্রুটি: ' + err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredGallery = galleryList.filter((item) => {
    const matchesSearch =
      (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8 font-bangla text-slate-100 pb-12">
      
      {/* Header & Save Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-black text-white">গ্যালারি ও সাইট মিডিয়া ম্যানেজার</h2>
          </div>
          <p className="text-xs text-slate-400">
            হোমপেজের ব্যানার, স্যারের ছবি এবং ৪-কলাম কর্মশালা অ্যালবাম পরিচালনা করুন।
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving || isUploading}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3.5 rounded-2xl shadow-lg transition"
        >
          {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? 'সংরক্ষিত হচ্ছে...' : 'সকল ছবি সংরক্ষণ করুন'}</span>
        </button>
      </div>

      {/* 1. KEY SITE BANNERS & PROFILE IMAGES */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-sm text-white">মূল সাইটের ৩টি প্রধান ব্যানার ও ছবি</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Hero Doctor Image */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-emerald-400 block">১. হোমপেজ Hero ব্যানার ছবি</span>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              <Image src={heroImg} alt="Hero Banner" fill sizes="300px" className="object-cover" />
            </div>
            <input
              type="text"
              value={heroImg}
              onChange={(e) => setHeroImg(e.target.value)}
              placeholder="ছবির URL বা পাথ..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-white font-mono outline-none"
            />
            <label className="cursor-pointer block text-center bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 rounded-xl border border-slate-700 transition">
              <Upload className="w-3.5 h-3.5 inline mr-1" />
              <span>ছবি পরিবর্তন করুন</span>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setHeroImg)} className="hidden" />
            </label>
          </div>

          {/* About Doctor Portrait */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-emerald-400 block">২. স্যারের পরিচিতি পোর্ট্রেট</span>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              <Image src={portraitImg} alt="Doctor Portrait" fill sizes="300px" className="object-cover" />
            </div>
            <input
              type="text"
              value={portraitImg}
              onChange={(e) => setPortraitImg(e.target.value)}
              placeholder="ছবির URL বা পাথ..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-white font-mono outline-none"
            />
            <label className="cursor-pointer block text-center bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 rounded-xl border border-slate-700 transition">
              <Upload className="w-3.5 h-3.5 inline mr-1" />
              <span>ছবি পরিবর্তন করুন</span>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setPortraitImg)} className="hidden" />
            </label>
          </div>

          {/* PTF Certificate Frame */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-amber-400 block">৩. PTF সনদপত্র প্রদর্শনী ছবি</span>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
              <Image src={ptfImg} alt="PTF Certificate" fill sizes="300px" className="object-cover" />
            </div>
            <input
              type="text"
              value={ptfImg}
              onChange={(e) => setPtfImg(e.target.value)}
              placeholder="ছবির URL বা পাথ..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-[11px] text-white font-mono outline-none"
            />
            <label className="cursor-pointer block text-center bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold py-2 rounded-xl border border-slate-700 transition">
              <Upload className="w-3.5 h-3.5 inline mr-1" />
              <span>ছবি পরিবর্তন করুন</span>
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setPtfImg)} className="hidden" />
            </label>
          </div>

        </div>
      </div>

      {/* 2. PHOTO GALLERY ALBUM MANAGER */}
      <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              <span>কর্মশালা ও সেমিনার ফটো গ্যালারি ({galleryList.length}টি ছবি)</span>
            </h3>
            <p className="text-xs text-slate-400">
              যেসব ছবিতে <span className="text-amber-400 font-bold">"হোমপেজে দেখান"</span> টিক থাকবে, সেগুলো হোমপেজের ৪-কলামে প্রদর্শিত হবে।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddGalleryItem}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন ছবি যোগ করুন</span>
            </button>
          </div>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-28 h-24 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                  <Image src={item.src} alt={item.title} fill sizes="120px" className="object-cover" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      ছবি #{idx + 1}
                    </span>

                    <button
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded transition"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleUpdateGalleryItem(item.id, 'title', e.target.value)}
                    placeholder="ছবির শিরোনাম..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-bold focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">ক্যাটাগরি</label>
                  <input
                    type="text"
                    value={item.category || ''}
                    onChange={(e) => handleUpdateGalleryItem(item.id, 'category', e.target.value)}
                    placeholder="যেমন: কর্মশালা ও সেমিনার"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">তারিখ / ব্যাচ</label>
                  <input
                    type="text"
                    value={item.date || ''}
                    onChange={(e) => handleUpdateGalleryItem(item.id, 'date', e.target.value)}
                    placeholder="যেমন: ২০২৬ ব্যাচ"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">ছবির URL / পাথ</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={item.src}
                    onChange={(e) => handleUpdateGalleryItem(item.id, 'src', e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-[11px] text-slate-300 font-mono outline-none"
                  />
                  <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-bold transition flex items-center gap-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>ফাইল</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGalleryFileUpload(e, item.id)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Show On Home Toggle */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.showOnHome !== false}
                    onChange={(e) => handleUpdateGalleryItem(item.id, 'showOnHome', e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-0 cursor-pointer accent-emerald-600"
                  />
                  <span className="text-xs font-bold text-amber-300">হোমপেজের ৪-কার্ড গ্যালারিতে দেখান</span>
                </label>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
