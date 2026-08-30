'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { 
  Award, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

export function PTFCertificate() {
  const { settings } = useApp();

  const benefits = [
    'প্যারামেডিকেল টেকনোলজি ফাউন্ডেশন (PTF) অনুমোদিত অফিসিয়াল প্রফেশনাল সনদ',
    '৬ মাসের সফল কোর্স সমাপ্তির পর কৃতি চিকিৎসকদের সম্মাননা',
    'সুন্দরবন কুরিয়ার সার্ভিসের মাধ্যমে দেশের যেকোনো জেলায় সরাসরি হোম ডেলিভারি',
    'সার্টিফিকেট রেজিস্ট্রেশন নম্বর যাচাইযোগ্য ও ক্যারিয়ারের জন্য বিশ্বস্ত',
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white font-bangla relative overflow-hidden border-b border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Information */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full border border-amber-400/30">
                <Award className="w-4 h-4 text-amber-400" />
                <span>গভর্নমেন্ট রেজিস্টার্ড প্রফেশনাল স্বীকৃতি</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
                কোর্স সমাপনীতে PTF অনুমোদিত প্রফেশনাল সার্টিফিকেট
              </h2>
            </div>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-medium">
              বিডি হোমিও প্রশিক্ষণ কেন্দ্র থেকে সফলভাবে কোর্স সম্পন্ন করার পর প্যারামেডিকেল টেকনোলজি ফাউন্ডেশন (PTF) অনুমোদিত অফিসিয়াল সার্টিফিকেট আপনার চেম্বার বা ঠিকানায় কুরিয়ারযোগে পৌঁছে দেওয়া হয়।
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              {benefits.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-200">{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                href="/courses"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <span>কোর্সে ভর্তি হয়ে সার্টিফিকেট অর্জন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/gallery"
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs px-5 py-3.5 rounded-xl border border-slate-700 transition"
              >
                <span>সনদ বিতরণী ছবি দেখুন</span>
              </Link>
            </div>

          </div>

          {/* Right Certificate Showcase Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-slate-950 p-4 rounded-3xl border-2 border-emerald-500/40 shadow-2xl space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                <Image
                  src={settings.ptfCertificateImageUrl || '/assets/gallery/certificate-ptf-1.jpg'}
                  alt="PTF Certificate"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-xl flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  <span>সুন্দরবন কুরিয়ার হোম ডেলিভারি</span>
                </div>
                <span className="text-emerald-400 font-bold">সারাদেশে ডেলিভারি</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
