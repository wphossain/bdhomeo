'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Youtube, X } from 'lucide-react';

export function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videoList = [
    {
      id: 'v1',
      title: 'সালফার (Sulphur) এর লক্ষণ ও গভীর মনোদৈহিক বিশ্লেষণ',
      subtitle: 'হ্যানিম্যানের অর্গানন ও মেটেরিয়া মেডিকার আলোকে পলিক্রেস্ট ড্রাগ স্টাডি',
      thumbnail: '/assets/courses/materia-medica.jpg',
      youtubeId: 'p9kLm8x0Wq1',
      tag: 'মেটেরিয়া মেডিকা'
    },
    {
      id: 'v2',
      title: 'হোমিও রেপার্টরি শিক্ষা — মাত্র ৩/৪ মাসে গভীর জ্ঞান অর্জন',
      subtitle: 'রোগীর প্রধান রুব্রিক্স শনাক্তকরণ ও রেপার্টরাইজেশন কৌশল',
      thumbnail: '/assets/courses/repertory-mastery.jpg',
      youtubeId: 'kLp901xW8zQ',
      tag: 'রেপার্টরি মাস্টারি'
    },
    {
      id: 'v3',
      title: 'নাক্স ভমিকা (Nux Vomica) — এম্ব্রিও স্টাডি উইথ সায়েন্স',
      subtitle: 'দৈনন্দিন প্র্যাকটিসে নাক্স ভমিকার সঠিক লক্ষণ নির্বাচন',
      thumbnail: '/assets/courses/basic-batch.jpg',
      youtubeId: 'a7z8Rkp90Lw',
      tag: 'ক্লিনিক্যাল স্টাডি'
    },
    {
      id: 'v4',
      title: 'বন্ধ্যাত্ব ও জরায়ু টিউমারের সফল হোমিওপ্যাথিক ব্যবস্থাপনা',
      subtitle: 'এডভান্স ব্যাচের প্র্যাকটিক্যাল কেস স্টাডি ও ফলাফল আলোচনা',
      thumbnail: '/assets/courses/advance-batch.jpg',
      youtubeId: 'q8zL01kP9Mw',
      tag: 'কেস অ্যানালাইসিস'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white font-bangla border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 text-xs font-bold px-4 py-1.5 rounded-full">
            <Youtube className="w-4 h-4 text-red-600" />
            ভিডিও লেকচার ডেমো • ইউটিউব শোকেস
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            স্যারের ক্লাস নেওয়ার মান ও বিশ্লেষণ পদ্ধতি দেখুন
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            ডাঃ মোঃ গিয়াস উদ্দিন স্যারের ক্লাসিক্যাল হোমিওপ্যাথি পাঠদান ও বাস্তব কেস স্টাডির কিছু গুরুত্বপূর্ণ ভিডিও।
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoList.map((video) => (
            <div
              key={video.id}
              onClick={() => setActiveVideo(video.youtubeId)}
              className="group cursor-pointer bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-all">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Tag Pill */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-slate-900/80 backdrop-blur-sm text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded">
                    {video.tag}
                  </span>
                </div>
              </div>

              {/* Video Title & Meta */}
              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-700 transition">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {video.subtitle}
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <Play className="w-3.5 h-3.5" />
                  <span>ভিডিও প্লে করুন</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal Player */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
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