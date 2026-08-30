'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Sparkles, X, Megaphone } from 'lucide-react';

export function AnnouncementBar() {
  const { settings } = useApp();
  const [isVisible, setIsVisible] = useState(true);

  if (!settings.noticeText || !isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 px-4 py-2 text-xs sm:text-sm font-bold font-bangla shadow-sm border-b border-amber-600/30 flex items-center justify-between transition-all">
      <div className="max-w-7xl mx-auto flex items-center gap-2 truncate">
        <div className="p-1 bg-slate-950 text-amber-300 rounded-md shrink-0">
          <Megaphone className="w-3.5 h-3.5" />
        </div>
        <span className="truncate">{settings.noticeText}</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="p-1 hover:bg-black/10 rounded-md transition text-slate-900 shrink-0"
        aria-label="Close Notice"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}