'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { Camera, ArrowRight, Calendar } from 'lucide-react';

export function TrustGallery() {
  const { settings } = useApp();
  
  // Filter only items marked for homepage (or first 4 items)
  const homeGalleryItems = settings.galleryImages && settings.galleryImages.length > 0
    ? settings.galleryImages.filter((item) => item.showOnHome !== false).slice(0, 4)
    : [];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 font-bangla border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-1.5 rounded-full">
            <Camera className="w-4 h-4 text-emerald-700" />
            <span>বাস্তব অভিজ্ঞতা ও ফটো গ্যালারি</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            আমাদের কর্মশালা ও সফল ব্যাচসমূহের খণ্ডচিত্র
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            বিডি হোমিও প্রশিক্ষণ কেন্দ্র থেকে সহস্রাধিক শিক্ষার্থী প্রশিক্ষণ নিয়ে দেশের বিভিন্ন প্রান্তে সফলভাবে চিকিৎসা সেবা প্রদান করছেন।
          </p>
        </div>

        {/* 4 Column Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeGalleryItems.map((item, idx) => (
            <div
              key={item.id || idx}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-2xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute top-3 left-3">
                  <span className="bg-emerald-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-emerald-700">
                    {item.category}
                  </span>
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

        {/* View Full Gallery Link */}
        <div className="text-center pt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow transition"
          >
            <span>সম্পূর্ণ ফটো গ্যালারি ও কর্মশালা অ্যালবাম দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
