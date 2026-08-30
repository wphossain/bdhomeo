'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { Star, MessageSquare, Quote, CheckCircle2, Award } from 'lucide-react';

export function TestimonialSection() {
  const { settings } = useApp();
  const testimonials = settings.testimonials && settings.testimonials.length > 0
    ? settings.testimonials
    : [
        {
          id: 't1',
          name: 'ডাঃ মোঃ রফিকুল ইসলাম',
          designation: 'হোমিও প্র্যাকটিশনার, বগুড়া সদর',
          batchName: 'বেসিক ফাউন্ডেশন ৯ম ব্যাচ',
          quote: 'ডিএইচএমএস শেষ করার পরও চেম্বারে রোগী দেখে ওষুধ নির্বাচনে দ্বিধায় ভুগতাম। ডাঃ মোঃ গিয়াস উদ্দিন স্যারের অর্গানন ও মেটেরিয়া মেডিকার বিশ্লেষণ আমার চেম্বার প্র্যাকটিসে শতভাগ আত্মবিশ্বাস ফিরিয়ে দিয়েছে।',
          rating: 5,
        },
        {
          id: 't2',
          name: 'ডাঃ ফারহানা আক্তার',
          designation: 'ডিএইচএমএস শেষ বর্ষ, খুলনা',
          batchName: 'এডভান্সড ক্লিনিক্যাল ব্যাচ',
          quote: 'স্যারের সকালের মর্নিং কেস সাপোর্ট আমার জন্য আশীর্বাদস্বরূপ। প্রতিদিন সকালে চেম্বারের বাস্তব রোগীদের কেস নিয়ে স্যারের সাথে সরাসরি কথা বলে সিমিলিমাম ওষুধ নির্ধারণ করতে পারছি।',
          rating: 5,
        },
        {
          id: 't3',
          name: 'ডাঃ কামরুল হাসান',
          designation: 'রেজিস্টার্ড ক্লাসিক্যাল চিকিৎসক, চট্টগ্রাম',
          batchName: 'বেসিক ফাউন্ডেশন ৮ম ব্যাচ',
          quote: 'রেপার্টরির এমন সহজ ও প্রাঞ্জল ব্যাখ্যা আগে কোথাও পাইনি। ক্লাসিক্যাল নীতিমালার প্র্যাকটিক্যাল প্রয়োগ ও PTF অনুমোদিত সার্টিফিকেট আমার চিকিৎসাজীবনের বড় অর্জন।',
          rating: 5,
        },
      ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white font-bangla relative overflow-hidden border-b border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full border border-amber-400/30">
            <Quote className="w-3.5 h-3.5" />
            <span>কৃতি শিক্ষার্থীদের অভিজ্ঞতা ও মতামত</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            শিক্ষার্থী ও চিকিৎসকদের অকপট মূল্যায়ন
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/80">
            বিডি হোমিও প্রশিক্ষণ কেন্দ্র থেকে কোর্স সম্পন্নকারী সম্মানিত ডাক্তারদের বাস্তব সাফল্যের গল্প।
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/80 rounded-3xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300 shadow-xl space-y-5"
            >
              <div className="space-y-4">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  "{item.quote}"
                </p>
              </div>

              {/* Student Identity Footer */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-3.5">
                <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-sm shadow-md overflow-hidden shrink-0 border border-emerald-400/40">
                  {item.avatarUrl ? (
                    <Image src={item.avatarUrl} alt={item.name} fill sizes="44px" className="object-cover" />
                  ) : (
                    item.name.charAt(0)
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-white truncate flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  </h4>
                  <p className="text-[11px] text-slate-400 truncate">{item.designation}</p>
                  <span className="text-[10px] text-amber-400 font-bold block mt-0.5">{item.batchName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
