'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloating() {
  const { settings } = useApp();
  const rawNumber = settings.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, '') : '01811123993';
  const waLink = `https://wa.me/880${rawNumber.startsWith('0') ? rawNumber.slice(1) : rawNumber}?text=${encodeURIComponent('আসসালামু আলাইকুম স্যার, আমি বিডি হোমিও প্রশিক্ষণ কেন্দ্রের কোর্স সম্পর্কে জানতে চাই।')}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 font-bangla">
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105 border-2 border-white"
        aria-label="WhatsApp Helpline"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-[#25D366] animate-ping" />
        </div>
        <span className="hidden sm:inline font-bold text-xs">
          হোয়াটসঅ্যাপে কথা বলুন
        </span>
      </a>
    </div>
  );
}