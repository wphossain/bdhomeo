'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Megaphone, Phone } from 'lucide-react';

export function AnnouncementBar() {
  const { settings } = useApp();

  if (!settings.noticeText) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 text-xs py-2 px-4 font-bangla font-semibold shadow-inner border-b border-amber-600/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="bg-slate-950 text-amber-300 text-[10px] uppercase font-black px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1 shadow-sm">
            <Megaphone className="w-3 h-3 text-amber-300" />
            জরুরি নোটিশ
          </span>
          <p className="truncate text-xs sm:text-[13px] font-bold text-slate-950">
            {settings.noticeText}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-4 shrink-0 text-xs font-bold text-slate-900">
          <a
            href={`tel:${settings.helplineNumber ? settings.helplineNumber.replace(/[^0-9]/g, '') : '01811123993'}`}
            className="flex items-center gap-1 hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>হেল্পলাইন: {settings.helplineNumber || '01811-123993'}</span>
          </a>
        </div>

      </div>
    </div>
  );
}