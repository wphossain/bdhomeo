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
  AlertTriangle, 
  Award, 
  Clock,
  Heart
} from 'lucide-react';

export function Footer() {
  const { settings } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 font-bangla border-t border-slate-800">
      
      {/* Upper Disclaimer Bar */}
      <div className="bg-amber-950/40 border-b border-amber-900/30 py-4 px-4 sm:px-6 lg:px-8 text-xs text-amber-200/90 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>আইনি নোটিশ:</strong> বিডি হোমিও প্রশিক্ষণ কেন্দ্র সম্পূর্ণ শিক্ষামূলক ও হোমিওপ্যাথিক একাডেমিক প্রশিক্ষণ প্রতিষ্ঠান। এখানে অনলাইনে কোনো প্রকার রোগী দেখা বা চিকিৎসা পরামর্শ দেওয়া হয় না।
          </span>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Sir's Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white p-1 border border-emerald-500/30">
                <Image
                  src="/assets/logo.png"
                  alt="বিডি হোমিও লোগো"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-black text-white leading-tight">
                  {settings.siteTitle || 'বিডি হোমিও প্রশিক্ষণ কেন্দ্র'}
                </h3>
                <p className="text-xs text-amber-400 font-semibold">{settings.slogan || 'Right Homeopath, Right Homeopathy'}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি নির্দেশনায় বিশুদ্ধ ক্লাসিক্যাল অর্গানন ও মেটেরিয়া মেডিকা ভিত্তিক প্রফেশনাল হোমিওপ্যাথি প্রশিক্ষণ।
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.youtubeUrl || 'https://www.youtube.com/@bdhomeo/videos'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white flex items-center justify-center transition border border-red-500/30"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={settings.facebookUrl || 'https://www.facebook.com/geaus.uddin.81099'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white flex items-center justify-center transition border border-blue-500/30"
                title="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/880${settings.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, '') : '01811123993'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-white flex items-center justify-center transition border border-[#25D366]/30"
                title="WhatsApp Support"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-2.5">
              কোর্স ও কারিকুলাম
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/courses/basic-homeopathy-foundation" className="hover:text-emerald-400 transition">
                  • বেসিক হোমিওপ্যাথি ফাউন্ডেশন (৬ মাস)
                </Link>
              </li>
              <li>
                <Link href="/courses/advance-clinical-repertory" className="hover:text-emerald-400 transition">
                  • এডভান্সড ক্লিনিক্যাল রেপার্টরি কোর্স
                </Link>
              </li>
              <li>
                <Link href="/about#gallery" className="hover:text-emerald-400 transition">
                  • কর্মশালা ও সেমিনার গ্যালারি
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-400 transition">
                  • স্টুডেন্ট ক্লাসরুম লগইন
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Certification & Fees */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-2.5">
              সার্টিফিকেশন ও পেমেন্ট
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>• <strong>সনদ:</strong> PTF অনুমোদিত হার্ডকপি সার্টিফিকেট</p>
              <p>• <strong>ডেলিভারি:</strong> সারা বাংলাদেশে কুরিয়ার সার্ভিস</p>
              <p>• <strong>বিকাশ:</strong> {settings.bkashNumber} ({settings.bkashType})</p>
              <p>• <strong>নগদ:</strong> {settings.nagadNumber} ({settings.nagadType})</p>
            </div>
          </div>

          {/* Col 4: Contact & Help */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-2.5">
              হেল্পলাইন ও সহায়তা
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>সরাসরি কল: {settings.helplineNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>হোয়াটসঅ্যাপ: {settings.whatsappNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>লাইভ ক্লাস: {settings.classTime}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} বিডি হোমিও প্রশিক্ষণ কেন্দ্র (BD Homeo) • সর্বস্বত্ব সংরক্ষিত</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition">প্রাইভেসি পলিসি</Link>
            <Link href="/terms" className="hover:text-slate-300 transition">শর্তাবলী ও রিফান্ড নীতি</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}