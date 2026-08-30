'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { toBanglaNumber, formatTaka } from '@/lib/utils';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  FileText
} from 'lucide-react';

export function CourseCards() {
  const { courses } = useApp();

  return (
    <section id="courses" className="py-16 lg:py-24 bg-slate-50 font-bangla">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            চলমান ব্যাচসমূহ • সরাসরি ভর্তি চলছে
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            আপনার দক্ষতার স্তর অনুযায়ী সেরা কোর্স বেছে নিন
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            নতুন শিক্ষার্থীদের জন্য বেসিক কোর্স এবং প্র্যাকটিশনারদের জন্য মর্নিং সাপোর্ট সহ এডভান্সড রেপার্টরি কোর্স।
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {courses.map((course) => {
            const isAdvance = course.batchType === 'advance';

            return (
              <div
                key={course.id}
                className={`relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  isAdvance ? 'border-amber-400/80 ring-2 ring-amber-400/20' : 'border-emerald-200'
                }`}
              >
                {/* Popular / Advance Badge */}
                {isAdvance && (
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-amber-300">
                    <Flame className="w-4 h-4 fill-slate-950 text-slate-950" />
                    <span>৬ দিন মর্নিং সাপোর্ট সহ জনপ্রিয়</span>
                  </div>
                )}

                {/* Card Thumbnail */}
                <div className="relative w-full aspect-[16/9] bg-emerald-950 overflow-hidden">
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Category Pill on Image */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-emerald-900/90 text-emerald-200 text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-md border border-emerald-500/40">
                      {isAdvance ? 'উচ্চতর মাস্টার ব্যাচ' : 'ফাউন্ডেশন ব্যাচ'}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Schedule & Timing Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>মেয়াদ: {toBanglaNumber(course.durationMonths)} মাস</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{course.liveSchedule}</span>
                    </div>
                    {course.morningSupport && (
                      <div className="sm:col-span-2 flex items-center gap-2 text-amber-700 font-bold pt-1 border-t border-slate-200/60">
                        <Flame className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{course.morningSupport}</span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      কোর্সের মূল সুবিধাসমূহ:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                      {course.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing Box */}
                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-black text-emerald-950 font-english">
                          {formatTaka(course.admissionFee)}
                        </span>
                        <span className="text-xs font-bold text-emerald-800">এককালীন ভর্তি ফি</span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">
                        + প্রতি মাসে মাত্র <span className="font-bold text-amber-700">{formatTaka(course.monthlyFee)}</span> মাসিক ফি
                      </p>
                    </div>

                    <div className="shrink-0 text-right sm:text-left">
                      <span className="inline-block bg-white text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-md border border-emerald-200 shadow-sm">
                        PTF সার্টিফিকেট সহ
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm py-3.5 rounded-xl transition border border-slate-300"
                    >
                      <FileText className="w-4 h-4 text-slate-600" />
                      <span>সিলেবাস দেখুন</span>
                    </Link>

                    <Link
                      href={`/courses/${course.slug}#enroll`}
                      className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm py-3.5 rounded-xl shadow-md hover:shadow-lg transition"
                    >
                      <span>এখনই ভর্তি হন</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}