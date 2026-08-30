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
  Eye, 
  Upload, 
  Sparkles, 
  Award, 
  User, 
  Layers,
  Edit2
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
    showToast('à¦¸à¦•à¦² à¦›à¦¬à¦¿ à¦“ à¦—à§à¦¯à¦¾à¦²à¦¾à¦°à¦¿ à¦•à¦¨à¦Ÿà§‡à¦¨à§à¦Ÿ à¦¸à¦«à¦²à¦­à¦¾à¦¬à§‡ à¦¸à§‡à¦­ à¦¹à§Ÿà§‡à¦›à§‡!', 'success');
  };

  const handleAddGalleryItem = () => {
    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      src: '/assets/gallery/workshop-practical.jpg',
      title: 'à¦¨à¦¤à§à¦¨ à¦•à¦°à§à¦®à¦¶à¦¾à¦²à¦¾ à¦“ à¦•à§‡à¦¸ à¦¸à§à¦Ÿà¦¾à¦¡à¦¿ à¦¸à§‡à¦¶à¦¨',
      category: 'à¦•à¦°à§à¦®à¦¶à¦¾à¦²à¦¾',
      desc: 'à¦¡à¦¾à¦ƒ à¦®à§‹à¦ƒ à¦—à¦¿à§Ÿà¦¾à¦¸ à¦‰à¦¦à§à¦¦à¦¿à¦¨ à¦¸à§à¦¯à¦¾à¦°à§‡à¦° à¦¸à¦°à¦¾à¦¸à¦°à¦¿ à¦•à§à¦²à¦¿à¦¨à¦¿à¦•à§à¦¯à¦¾à¦² à¦•à§à¦²à¦¾à¦¸',
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
            à¦›à¦¬à¦¿ à¦“ à¦®à¦¿à¦¡à¦¿à§Ÿà¦¾ à¦®à§à¦¯à¦¾à¦¨à§‡à¦œà¦¾à¦° (Media & Gallery CMS)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            à¦¹à¦¿à¦°à§‹ à¦‡à¦®à§‡à¦œ, à¦¸à§à¦¯à¦¾à¦°à§‡à¦° à¦ªà§‹à¦°à§à¦Ÿà§à¦°à§‡à¦Ÿ, PTF à¦¸à¦¾à¦°à§à¦Ÿà¦¿à¦«à¦¿à¦•à§‡à¦Ÿ à¦“ à¦“à§Ÿà¦¾à¦°à§à¦•à¦¶à¦ª à¦«à¦Ÿà§‹à¦—à§à¦¯à¦¾à¦²à¦¾à¦°à¦¿ à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤à¦¨ à¦•à¦°à§à¦¨à¥¤
          </p>
        </div>

        <button
          onClick={handleSaveMedia}
          disabled={isSaving}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg transition shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'à¦¸à¦‚à¦°à¦•à§à¦·à¦£ à¦¹à¦šà§à¦›à§‡...' : 'à¦›à¦¬à¦¿ à¦“ à¦—à§à¦¯à¦¾à¦²à¦¾à¦°à¦¿ à¦¸à§‡à¦­ à¦•à¦°à§à¦¨'}</span>
        </button>
      </div>

      {/* 1. Core Profile & Branding Images */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <User className="w-5 h-5 text-emerald-400" />
          à§§. à¦ªà§à¦°à¦§à¦¾à¦¨ à¦¬à§à¦°à¦¾à¦¨à§à¦¡à¦¿à¦‚ à¦‡à¦®à§‡à¦œ (Hero, Doctor Bio & PTF Certificate)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Hero Banner Image */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <Image src={heroImg} alt="Hero Banner" fill className="object-cover" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">à¦¹à¦¿à¦°à§‹ à¦¬à§à¦¯à¦¾à¦¨à¦¾à¦° à¦‡à¦®à§‡à¦œ à¦ªà¦¾à¦¥ (URL)</label>
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
              <label className="text-xs font-bold text-slate-300 block mb-1">à¦¸à§à¦¯à¦¾à¦°à§‡à¦° à¦ªà§à¦°à§‹à¦«à¦¾à¦‡à¦² à¦«à¦Ÿà§‹ à¦ªà¦¾à¦¥ (URL)</label>
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
              <label className="text-xs font-bold text-slate-300 block mb-1">PTF à¦¸à¦¾à¦°à§à¦Ÿà¦¿à¦«à¦¿à¦•à§‡à¦Ÿ à¦‡à¦®à§‡à¦œ à¦ªà¦¾à¦¥ (URL)</label>
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
              à§¨. à¦«à¦Ÿà§‹ à¦—à§à¦¯à¦¾à¦²à¦¾à¦°à¦¿ à¦“ à¦•à¦°à§à¦®à¦¶à¦¾à¦²à¦¾ à¦…à§à¦¯à¦¾à¦²à¦¬à¦¾à¦® ({galleryList.length} à¦Ÿà¦¿ à¦›à¦¬à¦¿)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              à¦“à§Ÿà§‡à¦¬à¦¸à¦¾à¦‡à¦Ÿà§‡ à¦ªà§à¦°à¦¦à¦°à§à¦¶à¦¿à¦¤ à¦•à¦°à§à¦®à¦¶à¦¾à¦²à¦¾, à¦¸à§‡à¦®à¦¿à¦¨à¦¾à¦° à¦“ à¦¸à¦¾à¦°à§à¦Ÿà¦¿à¦«à¦¿à¦•à§‡à¦Ÿ à¦¬à¦¿à¦¤à¦°à¦£à§€ à¦«à¦Ÿà§‹à¦—à§à¦²à§‹ à¦†à¦ªà¦¡à§‡à¦Ÿ à¦•à¦°à§à¦¨à¥¤
            </p>
          </div>

          <button
            onClick={handleAddGalleryItem}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
          >
            <Plus className="w-4 h-4" />
            <span>à¦¨à¦¤à§à¦¨ à¦›à¦¬à¦¿ à¦¯à§‹à¦— à¦•à¦°à§à¦¨</span>
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
                    placeholder="à¦›à¦¬à¦¿à¦° à¦•à§à¦¯à¦¾à¦ªà¦¶à¦¨ / à¦¶à¦¿à¦°à§‹à¦¨à¦¾à¦®"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-white font-bold focus:border-emerald-500 outline-none"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={item.category}
                      onChange={(e) => handleUpdateGalleryItem(item.id, 'category', e.target.value)}
                      placeholder="à¦•à§à¦¯à¦¾à¦Ÿà¦¾à¦—à¦°à¦¿"
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-2.5 py-1 text-xs text-slate-300 outline-none"
                    />

                    <input
                      type="text"
                      value={item.src}
                      onChange={(e) => handleUpdateGalleryItem(item.id, 'src', e.target.value)}
                      placeholder="à¦‡à¦®à§‡à¦œ à¦ªà¦¾à¦¥ (/assets/...)"
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
                  <span>à¦®à§à¦›à§‡ à¦«à§‡à¦²à§à¦¨</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}