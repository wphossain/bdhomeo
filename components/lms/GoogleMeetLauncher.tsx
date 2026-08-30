'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Video, Clock, ExternalLink, Calendar } from 'lucide-react';

interface GoogleMeetLauncherProps {
  batchType?: 'basic' | 'advance' | 'special';
}

export function GoogleMeetLauncher({ batchType }: GoogleMeetLauncherProps) {
  const { settings, user } = useApp();

  const meetUrl = settings.googleMeetUrl || 'https://meet.google.com/bdhomeo-live-class';

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30 relative overflow-hidden font-bangla">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-emerald-500/40">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>লাইভ মিট ক্লাসরুম</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            আজকের লাইভ ক্লাস শুরু হবে {settings.classTime}-এ
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>সপ্তাহে ২ দিন লাইভ ক্লাস</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>নির্ধারিত সময়: {settings.classTime}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-stretch sm:items-end gap-2">
          <a
            href={meetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-xl transition-all hover:scale-105"
          >
            <Video className="w-4 h-4" />
            <span>লাইভ ক্লাসে যুক্ত হোন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="text-[10px] text-emerald-200/80 text-center sm:text-right">
            * গুগল মিটে যুক্ত হওয়ার সময় আপনার নাম লিখুন
          </span>
        </div>

      </div>
    </div>
  );
}
