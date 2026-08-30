'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { 
  Award, 
  BookOpen, 
  Stethoscope, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Clock,
  MapPin,
  HeartHandshake
} from 'lucide-react';

export default function AboutPage() {
  const { settings } = useApp();

  return (
    <div className="font-bangla bg-white">
      
      {/* Hero Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 py-16 lg:py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase px-4 py-1.5 rounded-full">
            আমাদের লক্ষ্য ও দর্শন
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            বিডি হোমিও প্রশিক্ষণ কেন্দ্র ও {settings.doctorName}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
            হোমিওপ্যাথির খাঁটি দর্শন প্রচার এবং বাংলাদেশের প্রতিটি জেলায় আত্মবিশ্বাসী ক্লাসিক্যাল প্র্যাকটিশনার গড়ে তোলার একাডেমিক আন্দোলন।
          </p>
        </div>
      </section>

      {/* Main Bio Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Sir's Profile Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-100 bg-emerald-950">
                <Image
                  src={settings.doctorPortraitUrl || '/assets/sir/sir-portrait.jpg'}
                  alt={settings.doctorName}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                <h3 className="text-lg font-black text-slate-900">এক নজরে পরিচিতি</h3>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <p>🔹 <strong>নাম:</strong> {settings.doctorName}</p>
                  <p>🔹 <strong>পদবী:</strong> {settings.doctorTitle}</p>
                  <p>🔹 <strong>যোগ্যতা:</strong> {settings.doctorDegrees}</p>
                  <p>🔹 <strong>অভিজ্ঞতা:</strong> {settings.doctorExperience}</p>
                  <p>🔹 <strong>সার্টিফিকেশন পার্টনার:</strong> PTF (Paramedical Technology Foundation)</p>
                  <p>🔹 <strong>চেম্বার:</strong> {settings.chamberAddress || 'ঢাকা, বাংলাদেশ'}</p>
                </div>
              </div>
            </div>

            {/* Detailed Philosophy Text */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  একাডেমির প্রতিষ্ঠা ও উদ্দেশ্য
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  খাঁটি হোমিওপ্যাথিক জ্ঞান ছড়িয়ে দেওয়ার প্রত্যয়ে একটি অনন্য শিক্ষা প্রতিষ্ঠান
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি নির্দেশনায় বিডি হোমিও প্রশিক্ষণ কেন্দ্র পরিচালিত হচ্ছে। বহু শিক্ষার্থী প্রাতিষ্ঠানিক ডিগ্রি অর্জনের পরও বাস্তব চেম্বারে রোগী আরোগ্যের ক্ষেত্রে দ্বিধাদ্বন্দ্বে পড়েন। এই ঘাটতি দূর করতেই অর্গানন অব মেডিসিনের মৌলিক নীতিমালা, মেটেরিয়া মেডিকার ড্রাগ পিকচার ও রেপার্টরির সঠিক ব্যবহারিক সমন্বয়ে চালু করা হয়েছে <strong>বিডি হোমিও প্রশিক্ষণ কেন্দ্র</strong>।
              </p>

              <div className="space-y-4 pt-2">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-2">
                  <h4 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-700" />
                    ক্লাসিক্যাল মেটেরিয়া মেডিকা ও ড্রাগ পিকচার
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    ওষুধের লক্ষণাবলি কেবল তোতাপাখির মতো মুখস্থ না করে রোগীর মানসিক অনুভূতির সাথে ওষুধের কেন্দ্রীয় বৈশিষ্ট্য (Core Sensation) মিলিয়ে ওষুধ নির্বাচন করা শেখানো হয়।
                  </p>
                </div>

                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2">
                  <h4 className="text-base font-bold text-amber-950 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-amber-700" />
                    সকালের মর্নিং কেস ডিসকাশন ও সরাসরি সমাধান
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    সপ্তাহে ৬ দিন সকাল ৮:০০ টায় সরাসরি লাইভ ক্লাসে চিকিৎসকদের চেম্বারে আসা জটিল ও নতুন রোগীদের কেস অ্যানালাইসিস করে ওষুধ ও পটেন্সি নির্ধারণ করে দেওয়া হয়।
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow transition flex items-center gap-2"
                >
                  <span>সকল কোর্স দেখুন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-6 py-3.5 rounded-xl transition"
                >
                  যোগাযোগ করুন
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
