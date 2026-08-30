'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 bg-slate-50 font-bangla">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
        
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto text-3xl font-black font-mono border border-amber-500/20">
          404
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            আপনি যে কোর্স বা পৃষ্ঠাটি খুঁজছেন সেটি পরিবর্তিত বা সরানো হতে পারে। অনুগ্রহ করে সঠিক কোর্স লিংকে যান।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded-xl transition shadow"
          >
            <Home className="w-4 h-4" />
            <span>হোমপেজে যান</span>
          </Link>
          <Link
            href="/courses"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 rounded-xl transition border border-slate-200"
          >
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>সকল কোর্স দেখুন</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
