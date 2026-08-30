'use client';

import React from 'react';
import Image from 'next/image';
import { Camera, Award, Sparkles, Users } from 'lucide-react';

export function TrustGallery() {
  const galleryItems = [
    {
      src: '/assets/gallery/certificate-ptf-1.jpg',
      title: 'কৃতি শিক্ষার্থীদের PTF সার্টিফিকেট বিতরণী',
      category: 'সার্টিফিকেশন',
      desc: 'কোর্স সমাপনী ব্যাচের শিক্ষার্থীদের সম্মাননা ও সনদ প্রদান'
    },
    {
      src: '/assets/gallery/workshop-practical.jpg',
      title: 'হোমিওপ্যাথিক কেস স্টাডি ও বাস্তব কর্মশালা',
      category: 'কর্মশালা',
      desc: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি ক্লিনিক্যাল ক্লাস'
    },
    {
      src: '/assets/gallery/seminar-session.jpg',
      title: 'চিকিৎসকদের সাথে মতবিনিময় ও গ্রুপ স্টাডি',
      category: 'আলোচনা সভা',
      desc: 'বিভিন্ন জেলা থেকে আগত চিকিৎসকদের মতবিনিময় ও অভিজ্ঞতা শেয়ার'
    },
    {
      src: '/assets/gallery/clinical-books.jpg',
      title: 'হ্যানিম্যানের মূলগ্রন্থ ও রেপার্টরি গবেষণা',
      category: 'একাডেমিক সেশন',
      desc: 'ক্লাসিক্যাল নীতিমালার প্র্যাকটিক্যাল ব্যবহার'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50 font-bangla">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-1.5 rounded-full">
            <Camera className="w-4 h-4 text-emerald-700" />
            বাস্তব অভিজ্ঞতা ও ফটো গ্যালারি
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            আমাদের কর্মশালা ও সফল ব্যাচসমূহের খণ্ডচিত্র
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            বিডি হোমিও প্রশিক্ষণ কেন্দ্র থেকে সহস্রাধিক শিক্ষার্থী প্রশিক্ষণ নিয়ে দেশের বিভিন্ন প্রান্তে সফলভাবে চিকিৎসা সেবা প্রদান করছেন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-3xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-[4/3] bg-slate-900 overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-3 left-3">
                  <span className="bg-emerald-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-emerald-700">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}