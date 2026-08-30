'use client';

import React from 'react';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { Award, Truck, CheckCircle2 } from 'lucide-react';

export function PTFCertificate() {
  const { settings } = useApp();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-900 to-emerald-950 text-white font-bangla relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Certificate Graphics & Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/40 bg-slate-950">
              <Image
                src={settings.ptfCertificateImageUrl || '/assets/gallery/certificate-ptf-1.jpg'}
                alt="PTF সার্টিফিকেট বিতরণী অনুষ্ঠান"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              {/* Gold Ribbon Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg border border-amber-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 fill-slate-950" />
                <span>PTF গভর্নমেন্ট রেজিস্টার্ড ফাউন্ডেশন</span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-xs">
                <p className="font-bold text-amber-300">ডাঃ মোঃ গিয়াস উদ্দিন স্যারের হাত থেকে কৃতি শিক্ষার্থীদের সার্টিফিকেট গ্রহণ</p>
                <p className="text-[11px] text-slate-300">সফলভাবে ৬ মাসের কোর্স সমাপনী ব্যাচ</p>
              </div>
            </div>
          </div>

          {/* Value Props & Courier Delivery Info */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider bg-amber-400/20 px-3.5 py-1 rounded-full border border-amber-400/30">
                স্বীকৃতি ও প্রত্যয়নপত্র
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                PTF অনুমোদিত প্রফেশনাল সার্টিফিকেট ও কুরিয়ার ডেলিভারি
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              বিডি হোমিও প্রশিক্ষণ কেন্দ্র থেকে ৬ মাসের বেসিক বা এডভান্সড কোর্স সম্পন্নকারী প্রতিটি নিয়মিত শিক্ষার্থীকে <strong>প্যারামেডিকেল টেকনোলজি ফাউন্ডেশন (PTF)</strong> এর অধীনে প্রফেশনাল কোর্স সমাপনী সার্টিফিকেট প্রদান করা হয়।
            </p>

            {/* Courier Highlight Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
              <div className="flex items-center gap-3 text-amber-300 font-bold text-base">
                <div className="p-2 bg-amber-400/20 rounded-xl text-amber-300">
                  <Truck className="w-5 h-5" />
                </div>
                <span>সারা বাংলাদেশে কুরিয়ারের মাধ্যমে হোম ডেলিভারি</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                অনলাইন কোর্সের হলেও সার্টিফিকেট কোনো সফটকপিতে সীমাবদ্ধ নয়— সুন্দর হার্ডকপি ফ্রেমযোগ্য সার্টিফিকেট সরাসরি আপনার ঠিকানায় সুন্দরবন/এসএ পরিবহন কুরিয়ারের মাধ্যমে পৌঁছে দেওয়া হয়।
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PTF এর অফিসিয়াল সিল ও গভর্নিং বডির স্বাক্ষর সংবলিত</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>পেশাগত প্র্যাকটিস ও চেম্বার প্রদর্শনের জন্য বিশেষ উপযোগী</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}