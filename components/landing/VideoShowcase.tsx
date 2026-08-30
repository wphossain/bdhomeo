'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { Play, Youtube, X, Clock, Sparkles } from 'lucide-react';

export function VideoShowcase() {
  const { settings } = useApp();
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const videoList = settings.videoShowcaseList && settings.videoShowcaseList.length > 0
    ? settings.videoShowcaseList
    : [
        {
          id: 'v1',
          title: 'সালফার (Sulphur) এর লক্ষণ ও গভীর মনোদৈহিক বিশ্লেষণ',
          subtitle: 'হ্যানিম্যানের অর্গানন ও মেটেরিয়া মেডিকার আলোকে কিং অব অ্যান্টিসোরিক ড্রাগ স্টাডি',
          youtubeId: '3JZ_D3ELwOQ',
          duration: '১৮:৪৫ মিনিট',
          tag: 'মেটেরিয়া মেডিকা',
        },
        {
          id: 'v2',
          title: 'হোমিও রেপার্টরি শিক্ষা — মাত্র ৩/৪ মাসে গভীর জ্ঞান অর্জন',
          subtitle: 'কেনটের প্রধান রুব্রিক্স শনাক্তকরণ ও রেপার্টরাইজেশন কৌশল',
          youtubeId: 'M7lc1UVf-VE',
          duration: '২২:৩০ মিনিট',
          tag: 'রেপার্টরি মাস্টারি',
        },
        {
          id: 'v3',
          title: 'নাক্স ভমিকা (Nux Vomica) — প্রভিউ স্টাডি উইথ স্যার',
          subtitle: 'দৈনন্দিন প্র্যাকটিসে ধাতুগুন অনুযায়ী সঠিক লক্ষণ নির্বাচন',
          youtubeId: 'LXb3EKWsInQ',
          duration: '১৫:২০ মিনিট',
          tag: 'ক্লিনিক্যাল স্টাডি',
        },
        {
          id: 'v4',
          title: 'বন্ধ্যাত্ব ও জরায়ু টিউমারের সফল হোমিওপ্যাথিক ব্যবস্থাপনা',
          subtitle: 'সফলতার সাথে প্র্যাকটিক্যাল কেস স্টাডি ও ফলাফল আলোচনা',
          youtubeId: 'fJ9rUzIMcZQ',
          duration: '২৫:১০ মিনিট',
          tag: 'কেস অ্যানালাইসিস',
        },
      ];

  // Helper to extract Clean YouTube ID
  const getCleanYoutubeId = (rawId: string) => {
    if (!rawId) return 'M7lc1UVf-VE';
    if (rawId.includes('v=')) return rawId.split('v=')[1]?.split('&')[0] || rawId;
    if (rawId.includes('youtu.be/')) return rawId.split('youtu.be/')[1]?.split('?')[0] || rawId;
    return rawId;
  };

  return (
    <section className="py-16 lg:py-24 bg-white font-bangla border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-full">
            <Youtube className="w-4 h-4 text-red-600" />
            <span>ভিডিও লেকচার ডেমো • ইউটিউব শোকেস</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            স্যারের ক্লাস নেওয়ার মান ও বিশ্লেষণ পদ্ধতি দেখুন
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            ডাঃ মোঃ গিয়াস উদ্দিন স্যারের ক্লাসিক্যাল হোমিওপ্যাথি পাঠদান ও বাস্তব কেস স্টাডির কিছু গুরুত্বপূর্ণ ভিডিও।
          </p>
        </div>

        {/* 4-Column Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoList.map((video) => {
            const cleanId = getCleanYoutubeId(video.youtubeId);
            const thumbUrl = `https://img.youtube.com/vi/${cleanId}/hqdefault.jpg`;

            return (
              <div
                key={video.id}
                onClick={() => setActiveVideoId(cleanId)}
                className="group cursor-pointer bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Dynamic YouTube Thumbnail with Overlay & Duration Badge */}
                <div className="relative w-full aspect-video bg-slate-950 overflow-hidden">
                  <Image
                    src={thumbUrl}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-950/25 group-hover:bg-slate-950/10 transition-colors" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:bg-red-500 transition-all">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Tag Pill & Duration */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-lg backdrop-blur-sm border border-slate-800">
                      {video.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3">
                    <span className="bg-slate-950/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm flex items-center gap-1 font-english">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {video.duration || '২০ মিনিট'}
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition leading-snug">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {video.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-emerald-700">
                    <span className="flex items-center gap-1">
                      <Play className="w-3.5 h-3.5 fill-emerald-700" />
                      <span>ভিডিও প্লে করুন</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal">YouTube Live</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Lightbox Modal */}
        {activeVideoId && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
              <button
                onClick={() => setActiveVideoId(null)}
                className="absolute top-4 right-4 z-10 text-white hover:text-white p-2 bg-black/60 hover:bg-black rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
