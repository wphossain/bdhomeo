'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { 
  CheckCircle2, 
  Award, 
  Stethoscope, 
  BookOpen, 
  Flame, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export function DoctorProfile() {
  const { settings } = useApp();

  const highlights = [
    'মহাত্মা স্যামুয়েল হ্যানিম্যানের খাঁটি অর্গানন অব মেডিসিনের নীতিতে পাঠদান',
    'মেটেরিয়া মেডিকার ওষুধের তুলনামূলক ও ক্লিনিক্যাল চিত্র আত্মস্থকরণ',
    'রোগীর প্রধান লক্ষণ নির্বাচন ও সফল রেপার্টরি ব্যবহারের বৈজ্ঞানিক গাইডলাইন',
    'সপ্তাহে ৬ দিন সকালের বিশেষ লাইভ ক্লাসে চেম্বারের জটিল কেস সমাধান',
  ];

  return (
    <section className="py-16 lg:py-24 bg-white font-bangla border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Doctor Image Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-100 bg-emerald-950">
              <Image
                src="/assets/sir/sir-portrait.jpg"
                alt="ডাঃ মোঃ গিয়াস উদ্দিন - অভিজ্ঞ হোমিওপ্যাথিক চিকিৎসক ও গবেষক"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 shadow-lg text-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                    <Award className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base leading-tight">{settings.doctorName || 'ডাঃ মোঃ গিয়াস উদ্দিন'}</h4>
                    <p className="text-xs text-slate-600 font-semibold">{settings.doctorTitle || 'প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক, BD Homeo'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-4 py-2 rounded-2xl shadow-xl border-2 border-white flex items-center gap-1.5 animate-bounce">
              <Flame className="w-4 h-4 fill-slate-950" />
              <span>অভিজ্ঞ গবেষক ও মেন্টর</span>
            </div>
          </div>

          {/* Bio & Academic Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                স্যারের বার্তা ও দর্শন
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                "অর্গাননের সঠিক জ্ঞান ছাড়া লক্ষণ ভিত্তিক হোমিওপ্যাথি চিকিৎসা অসম্ভব"
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium bg-emerald-50/60 p-4 rounded-2xl border-l-4 border-emerald-600">
              {settings.doctorMessage || 'আমাদের লক্ষ্য— প্রতিটি শিক্ষার্থী যেন কেবল তাত্ত্বিক জ্ঞান নয়, বরং চেম্বারে রোগী আরোগ্যের পূর্ণ আত্মবিশ্বাস নিয়ে চিকিৎসা সেবা প্রদান করতে পারেন।'}
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              প্রিয় সহকর্মী চিকিৎসকবৃন্দ ও শিক্ষার্থী বন্ধুরা, আধুনিক সময়ে অনেকেই মেটেরিয়া মেডিকার লক্ষণ মুখস্থ করতে গিয়ে বিভ্রান্ত হয়ে পড়েন। সঠিক রেপার্টরাইজেশন এবং অর্গাননের মূলনীতি জানা থাকলে রোগী দেখামাত্র সঠিক ওষুধ নির্বাচন করা অত্যন্ত সহজ ও আনন্দদায়ক হয়ে ওঠে।
            </p>

            {/* Key Value Points */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                আমাদের প্রশিক্ষণের মূল স্তম্ভসমূহ:
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {highlights.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow transition"
              >
                <span>স্যারের বিস্তারিত জীবনী ও অভিজ্ঞতা পড়ুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}