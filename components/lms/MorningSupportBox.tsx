'use client';

import React from 'react';
import { Flame, Clock, Users, Video, Stethoscope, Sparkles } from 'lucide-react';

export function MorningSupportBox() {
  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-yellow-500/10 rounded-3xl p-6 sm:p-8 border-2 border-amber-400/40 shadow-md font-bangla relative overflow-hidden">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-900 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-400/40">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-600" />
            <span>এডভান্সড ব্যাচ স্পেশাল সুবিধা</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            সপ্তাহে ৬ দিন সকালের লাইভ মর্নিং কেস সাপোর্ট
          </h3>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            প্রতিদিন সকাল ৮:০০ টায় সরাসরি ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সাথে লাইভ আলোচনা সেশন। আপনার চেম্বারের গোলমেলে, জটিল ও ক্রনিক কেসগুলো সরাসরি প্রেজেন্ট করে সঠিক প্রেসক্রিপশন ও রেপার্টরি গাইডেন্স নিন।
          </p>
        </div>

        <div className="shrink-0 bg-white p-5 rounded-2xl border border-amber-300 shadow-sm text-center space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>সকাল ৮:০০ টা — ৯:০০ টা</span>
          </div>
          <p className="text-[11px] text-slate-500">
            শনিবার থেকে বৃহস্পতিবার (সপ্তাহে ৬ দিন)
          </p>
          <span className="inline-block bg-amber-100 text-amber-900 text-[10px] font-extrabold px-3 py-1 rounded-full">
            রানিং চেম্বার চিকিৎসকদের জন্য
          </span>
        </div>

      </div>

    </div>
  );
}