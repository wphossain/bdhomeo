'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { 
  Phone, 
  MessageCircle, 
  Youtube, 
  Facebook, 
  Award, 
  AlertTriangle
} from 'lucide-react';

export function Footer() {
  const { settings } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-emerald-950/80 pt-16 pb-12 font-bangla">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Warning Banner */}
        <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 sm:p-6 mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-amber-200">
          <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-amber-300 mb-1">
              জরুরি আইনি ও পেশাগত নোটিশ
            </h4>
            <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed">
              বিডি হোমিও প্রশিক্ষণ কেন্দ্র সম্পূর্ণভাবে একটি একাডেমিক ও পেশাগত দক্ষতা উন্নয়ন প্রতিষ্ঠান। 
              <span className="font-bold underline ml-1">
                এখানে কোনো প্রকার অনলাইন রোগী দেখা হয় না এবং কোনো প্রকার চিকিৎসা পরামর্শ প্রদান করা হয় না।
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-emerald-700/50">
                <Image src="/assets/logo.png" alt="বিডি হোমিও" fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">বিডি হোমিও</h3>
                <p className="text-xs text-emerald-400 font-semibold">প্রশিক্ষণ কেন্দ্র</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              সঠিক নিয়মে হোমিওপ্যাথি শিক্ষা, অর্গানন অব মেডিসিন, মেটেরিয়া মেডিকা ও রেপার্টরি ভিত্তিক প্রেসক্রিপশন তৈরির বিশ্বস্ত একাডেমি।
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-800">
                <Award className="w-4 h-4 text-amber-400" />
                PTF অনুমোদিত একাডেমি
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              গুরুত্বপূর্ণ লিঙ্কসমূহ
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  › হোমপেজ
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  › চলমান সকল কোর্স ও ব্যাচ
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  › ডা. মোঃ গিয়াস উদ্দিন স্যারের জীবনী
                </Link>
              </li>
              <li>
                <Link href="/about#gallery" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  › কর্মশালা ও সার্টিফিকেট বিতরণ গ্যালারি
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  › যোগাযোগ ও চেম্বার নির্দেশিকা
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Highlights */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-400 pl-2">
              একাডেমিক সুবিধাসমূহ
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                সাপ্তাহিক ২টি লাইভ ক্লাস (Google Meet)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                সপ্তাহে ৬ দিন সকালের মর্নিং কেস সাপোর্ট
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                অধ্যায়ভিত্তিক রিচ PDF লেকচার শিট
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                কোর্স শেষে কুরিয়ারে PTF সার্টিফিকেট
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                আনলিস্টেড ফুল HD রেকর্ডেড ক্লাস লাইব্রেরি
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Socials */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-emerald-400 pl-2">
              সরাসরি যোগাযোগ
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-slate-300">
                <strong className="text-white">হেল্পলাইন / হোয়াটসঅ্যাপ:</strong>
                <br />
                <a href={`tel:${settings.whatsappNumber}`} className="text-emerald-400 hover:underline font-bold text-sm">
                  {settings.whatsappNumber}
                </a>
              </p>
              <p className="text-slate-400">
                বিকাশ/নগদ পেমেন্ট নম্বর: <span className="text-amber-300 font-mono">{settings.bkashNumber}</span>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.youtube.com/@bdhomeo/videos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white flex items-center justify-center transition"
                title="BD Homeo YouTube Channel"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/geaus.uddin.81099"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white flex items-center justify-center transition"
                title="ডাঃ মোঃ গিয়াস উদ্দিন Facebook Profile"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/880${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white flex items-center justify-center transition"
                title="WhatsApp Group Helpline"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright & Policy Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} বিডি হোমিও (BD Homeo) • সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition">প্রাইভেসি পলিসি</Link>
            <Link href="/terms" className="hover:text-slate-300 transition">শর্তাবলী ও রিফান্ড নীতি</Link>
            <span className="text-emerald-500 font-semibold font-english">Domain: bdhomeo.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
}