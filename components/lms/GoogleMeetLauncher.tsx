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
            <span>লাইভ ক্লাস ক্লাসরুম</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            আজকের লাইভ ক্লাস শুরু হবে {settings.classTime || 'রাত ৯:৩০'}-এ
          </h3>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>সাপ্তাহিক ২ দিন লাইভ ক্লাস</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>নির্ধারিত সময়: {settings.classTime || 'রাত ৯:৩০'}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <a
            href={meetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-4 rounded-2xl shadow-xl hover:shadow-emerald-500/30 transition transform hover:-translate-y-0.5"
          >
            <Video className="w-5 h-5 text-slate-950" />
            <span>গুগল মিট ক্লাসরুমে প্রবেশ করুন</span>
            <ExternalLink className="w-4 h-4 text-slate-950" />
          </a>
        </div>

      </div>
    </div>
  );
}
