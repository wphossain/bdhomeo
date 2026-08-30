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
  Clock,
  MapPin,
  GraduationCap
} from 'lucide-react';

export function DoctorProfile() {
  const { settings } = useApp();

  const highlights = [
    'ক্লাসিক্যাল অর্গানন ও হ্যানিমানিয়ান মৌলিক নীতিমালার নিখুঁত প্রয়োগ',
    'সপ্তাহে ৬ দিন সকাল ৮:০০ টায় সরাসরি লাইভ মর্নিং কেস ডিসকাশন ও প্রেসক্রিপশন গাইড',
    'ক্লিনিক্যাল মেটেরিয়া মেডিকা ও কমপ্লিট রেপার্টরির রুব্রিক্সভিত্তিক বিশ্লেষণ',
    'প্র্যাকটিক্যাল কেস টেকিং ও ক্রনিক জটিল রোগীর সিমিলিমাম নির্বাচন কৌশল',
  ];

  return (
    <section className="py-16 lg:py-24 bg-white font-bangla border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Doctor Image Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-100 bg-emerald-950">
              <Image
                src={settings.doctorPortraitUrl || '/assets/sir/sir-portrait.jpg'}
                alt={settings.doctorName || 'ডাঃ মোঃ গিয়াস উদ্দিন'}
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
                    <h4 className="font-extrabold text-sm sm:text-base leading-tight">
                      {settings.doctorName || 'ডাঃ মোঃ গিয়াস উদ্দিন'}
                    </h4>
                    <p className="text-xs text-slate-600 font-semibold mt-0.5">
                      {settings.doctorTitle || 'প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক, বিডি হোমিও'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-4 py-2 rounded-2xl shadow-xl border-2 border-white flex items-center gap-1.5 animate-bounce">
              <Flame className="w-4 h-4 fill-slate-950" />
              <span>{settings.doctorExperience || '২০+ বছরের অভিজ্ঞতা'}</span>
            </div>
          </div>

          {/* Bio & Academic Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                প্রধান প্রশিক্ষকের বার্তা
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                "অর্গাননের সঠিক জ্ঞান ছাড়া লক্ষণ ভিত্তিক হোমিওপ্যাথি চিকিৎসা অসম্ভব"
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium bg-emerald-50/60 p-4 rounded-2xl border-l-4 border-emerald-600">
              {settings.doctorMessage || 'হোমিওপ্যাথি কেবল কতগুলো ওষুধের নাম মুখস্থ করার বিষয় নয়, বরং রোগীর সার্বদৈহিক ও মানসিক লক্ষণের গভীর মূল্যায়নের মাধ্যমে নিখুঁত সিমিলিমাম ওষুধ নির্ধারণ করার একটি বিজ্ঞানসম্মত ও কার্যকরী চিকিৎসা দর্শন।'}
            </p>

            {/* Qualifications & Degrees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-emerald-700 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">ডিগ্রী ও গবেষণা</span>
                  <p className="text-xs font-bold text-slate-900">{settings.doctorDegrees || 'ডিএইচএমএস (ঢাকা), বিএইচএমএস'}</p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">চেম্বার শিডিউল</span>
                  <p className="text-xs font-bold text-slate-900">{settings.doctorChamberTime || 'সকাল ৯:০০ - রাত ৮:০০'}</p>
                </div>
              </div>
            </div>

            {/* Key Value Points */}
            <div className="space-y-2.5 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                বিডি হোমিও একাডেমির মূল বৈশিষ্ট্যসমূহ:
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
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow transition"
              >
                <span>স্যারের বিস্তারিত পরিচিতি ও ইতিহাস</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/880${(settings.whatsappNumber || '01811123993').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm px-5 py-3.5 rounded-xl border border-slate-200 transition"
              >
                <span>সরাসরি কথা বলুন</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
