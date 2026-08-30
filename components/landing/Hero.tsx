'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Award, 
  BookOpen, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Flame 
} from 'lucide-react';

interface HeroProps {
  onOpenOrientation: () => void;
}

export function Hero({ onOpenOrientation }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-brand-900 to-slate-950 text-white font-bangla pt-10 pb-20 lg:pt-16 lg:pb-28">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & CTA Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 via-emerald-500/20 to-teal-500/20 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Right Homeopath, Right Homeopathy • বিডি হোমিও</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.2] text-white">
              হোমিওপ্যাথির খাঁটি দর্শনে{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
                আত্মবিশ্বাসী প্র্যাকটিশনার
              </span>{' '}
              হওয়ার ৬ মাসের মাস্টার একাডেমি
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি নির্দেশনায় অর্গানন অব মেডিসিন, মেটেরিয়া মেডিকা ও রেপার্টরি ভিত্তিক সপ্তাহে ২টি লাইভ ক্লাস ও ৬ দিন মর্নিং কেস সাপোর্ট।
            </p>

            {/* Key USPs / Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold">PTF সার্টিফিকেট সহ</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl">
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold">সাপ্তাহিক লাইভ ক্লাস</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-2.5 rounded-xl col-span-2 sm:col-span-1">
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold">অধ্যায়ভিত্তিক PDF নোট</span>
              </div>
            </div>

            {/* Conversion CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenOrientation}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm sm:text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-amber-500/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>ফ্রি ওরিয়েন্টেশন ক্লাসে জয়েন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/courses"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-7 py-4 rounded-2xl border border-white/20 transition flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>কোর্স সিলেবাস ও ফি</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Hero High-Res Portrait Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Outer Glow & Gradient Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-600/40 bg-emerald-950 aspect-[4/5]">
                <Image
                  src="/assets/sir/sir-hero.jpg"
                  alt="ডাঃ মোঃ গিয়াস উদ্দিন - বিডি হোমিও"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Subtle Gradient Shade at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Floating Instructor Tag */}
                <div className="absolute bottom-5 left-5 right-5 bg-slate-950/85 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-400 text-xs font-bold uppercase tracking-wider">প্রধান প্রশিক্ষক ও গবেষক</p>
                      <h3 className="text-base sm:text-lg font-black text-white leading-tight">ডাঃ মোঃ গিয়াস উদ্দিন</h3>
                      <p className="text-slate-300 text-xs mt-0.5">বিডি হোমিও প্রশিক্ষণ কেন্দ্র</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/40">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Batch Admission Indicator */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-emerald-600 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-xl border-2 border-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
                <span>নতুন ব্যাচে ভর্তি চলছে</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}