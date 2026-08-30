'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Flame, Clock, Users, Video, Stethoscope, Sparkles } from 'lucide-react';

export function MorningSupportBox() {
  const { settings } = useApp();

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-yellow-500/10 rounded-3xl p-6 sm:p-8 border-2 border-amber-400/40 shadow-md font-bangla relative overflow-hidden text-slate-100">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-400/40">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>প্রতিদিনের বিশেষ কেস সাপোর্ট সেশন</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
            সকালের লাইভ ক্লিনিক্যাল কেস ডিসকাশন ও সাপোর্ট
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            প্রতিদিন সকাল ৮:০০ টা থেকে ৯:০০ টা পর্যন্ত শিক্ষার্থীদের চেম্বারের বাস্তব রোগীর লক্ষণ, জটিল প্রেসক্রিপশন ও রেপার্টরাইজেশনে ডাঃ মোঃ গিয়াস উদ্দিন স্যার সরাসরি গাইড ও প্রেসক্রিপশন পরামর্শ প্রদান করেন।
          </p>
        </div>

        <div className="shrink-0 bg-slate-950 p-5 rounded-2xl border border-amber-400/30 shadow-sm text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{settings.morningSupportTime || 'সকাল ৮:০০ - ৯:০০ টা'}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            সপ্তাহে ৬ দিন নিয়মিত (শুক্রবার ব্যতিত)
          </p>
          <span className="inline-block bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-3 py-1 rounded-full border border-amber-500/30">
            লাইভ কেস সলভিং সুবিধা
          </span>
        </div>

      </div>
    </div>
  );
}
