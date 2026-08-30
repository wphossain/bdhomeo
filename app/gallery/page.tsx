'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { GalleryItem } from '@/lib/types';
import { 
  Camera, 
  Filter, 
  Calendar, 
  X, 
  Maximize2, 
  Sparkles, 
  Home, 
  ChevronRight,
  Award,
  BookOpen
} from 'lucide-react';

export default function GalleryPage() {
  const { settings } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল ছবি');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const galleryList: GalleryItem[] = settings.galleryImages || [];

  const categories = ['সকল ছবি', 'কর্মশালা', 'সার্টিফিকেশন', 'আলোচনা সভা', 'একাডেমিক সেশন'];

  const filteredItems = galleryList.filter((item) => {
    if (selectedCategory === 'সকল ছবি') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="font-bangla bg-white min-h-screen">
      
      {/* Hero Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 py-16 lg:py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase px-4 py-1.5 rounded-full">
            <Camera className="w-4 h-4" />
            <span>ফটো অ্যালবাম ও বাস্তব কর্মশালা</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            বিডি হোমিও কর্মশালা ও ফটো গ্যালারি
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
            ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি ক্লিনিক্যাল ক্লাস, PTF সনদ বিতরণী ও দেশব্যাপী চিকিৎসকদের মতবিনিময় সেশনের মুহূর্তসমূহ।
          </p>
        </div>
      </section>

      {/* Main Gallery Workspace */}
      <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 4-Column Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group cursor-pointer bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors" />

                <div className="absolute top-3 left-3">
                  <span className="bg-emerald-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-emerald-700">
                    {item.category}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-xl bg-black/60 text-white flex items-center justify-center backdrop-blur-sm">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {item.date && (
                  <div className="absolute bottom-2.5 right-3">
                    <span className="bg-slate-950/80 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      {item.date}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.subtitle || item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Lightbox Preview Modal */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 space-y-4 p-4 sm:p-6">
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black">
              <Image
                src={activeLightboxItem.src}
                alt={activeLightboxItem.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            <div className="space-y-1 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded">
                  {activeLightboxItem.category}
                </span>
                {activeLightboxItem.date && (
                  <span className="text-xs text-slate-400 font-bold">{activeLightboxItem.date}</span>
                )}
              </div>
              <h3 className="text-lg font-black text-white">{activeLightboxItem.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{activeLightboxItem.desc}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
