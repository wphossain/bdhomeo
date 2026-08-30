'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-amber-600 shrink-0" />,
  };

  const bgStyles = {
    success: 'bg-emerald-50 border-emerald-300 text-emerald-950',
    error: 'bg-rose-50 border-rose-300 text-rose-950',
    info: 'bg-amber-50 border-amber-300 text-amber-950',
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md max-w-md ${bgStyles[toast.type]}`}>
        {icons[toast.type]}
        <p className="text-xs sm:text-sm font-semibold font-bangla leading-snug">
          {toast.message}
        </p>
      </div>
    </div>
  );
}