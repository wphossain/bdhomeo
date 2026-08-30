'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TrustGallery } from '@/components/landing/TrustGallery';
import { 
  Award, 
  BookOpen, 
  Stethoscope, 
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen font-bangla">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-950 text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-4 py-1.5 rounded-full border border-amber-400/30">
            <Award className="w-4 h-4" />
            প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            ডাঃ মোঃ গিয়াস উদ্দিন ও বিডি হোমিও পরিচিতি
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
            ক্লাসিক্যাল হোমিওপ্যাথির খাঁটি দর্শন এবং বাংলাদেশে আধুনিক বিজ্ঞানসম্মত হোমিও চিকিৎসার রূপরেখা।
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
                  src="/assets/sir/sir-portrait.jpg"
                  alt="ডাঃ মোঃ গিয়াস উদ্দিন"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                <h3 className="text-lg font-black text-slate-900">একনজরে পরিচিতি</h3>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                  <p>• <strong>নাম:</strong> ডাঃ মোঃ গিয়াস উদ্দিন</p>
                  <p>• <strong>পদবি:</strong> অভিজ্ঞ হোমিওপ্যাথিক চিকিৎসক ও গবেষক</p>
                  <p>• <strong>প্রতিষ্ঠাতা:</strong> বিডি হোমিও প্রশিক্ষণ কেন্দ্র</p>
                  <p>• <strong>সার্টিফিকেশন পার্টনার:</strong> PTF (Paramedical Technology Foundation)</p>
                  <p>• <strong>ইউটিউব চ্যানেল:</strong> BD HOMEO (@bdhomeo)</p>
                </div>
              </div>
            </div>

            {/* Detailed Philosophy Text */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  আমাদের গল্প ও লক্ষ্য
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  সঠিক হোমিওপ্যাথি শিক্ষার মাধ্যমে আত্মবিশ্বাসী চিকিৎসক গড়ে তোলার প্রয়াস
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                ডাঃ মোঃ গিয়াস উদ্দিন দীর্ঘ এক দশকেরও বেশি সময় ধরে বাংলাদেশে ক্লাসিক্যাল হোমিওপ্যাথি প্র্যাকটিস ও গবেষণার সাথে নিবিড়ভাবে জড়িত। হোমিওপ্যাথিক চিকিৎসা জগতে বিভ্রান্তি দূর করে মহাত্মা স্যামুয়েল হ্যানিম্যানের মূলনীতি অনুসারে সঠিক লক্ষণ সংগ্রহ ও প্রেসক্রিপশন শেখাতে তিনি প্রতিষ্ঠা করেছেন <strong>"বিডি হোমিও প্রশিক্ষণ কেন্দ্র"</strong>।
              </p>

              <div className="space-y-4 pt-2">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-2">
                  <h4 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-700" />
                    শিক্ষাদানের বিশেষত্ব
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    মেটেরিয়া মেডিকার জটিল লক্ষণগুলোকে কেবল মুখস্থ করানোর পরিবর্তে ওষুধের অন্তর্নিহিত অনুভূতি ও কোর সেনসেশন (Core Sensation) ধরিয়ে দেওয়া হয়, যেন চেম্বারে রোগী দেখামাত্রই সঠিক ওষুধের ছবি চোখের সামনে ভেসে ওঠে।
                  </p>
                </div>

                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2">
                  <h4 className="text-base font-bold text-amber-950 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-amber-700" />
                    সরাসরি মর্নিং সাপোর্ট ও জবাবদিহিতা
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    সপ্তাহে ৬ দিন সকালের বিশেষ লাইভ সেশনে শিক্ষার্থীরা তাদের চেম্বারের জটিল ও গোলমেলে কেসগুলো সরাসরি স্যারের সাথে আলোচনা করে সঠিক সমাধান খুঁজে পান।
                  </p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow transition flex items-center gap-2"
                >
                  <span>চলমান কোর্সসমূহ দেখুন</span>
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

      {/* Trust Gallery Component */}
      <div id="gallery">
        <TrustGallery />
      </div>

    </div>
  );
}