'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloating() {
  const { settings } = useApp();
  const phone = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/880${phone}?text=${encodeURIComponent('আসসালামু আলাইকুম স্যার, আমি বিডি হোমিও প্রশিক্ষণ কেন্দ্রের কোর্স সম্পর্কে বিস্তারিত জানতে চাই।')}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group border-2 border-white font-bangla"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
      </div>
      <span className="text-xs sm:text-sm font-black tracking-wide hidden sm:inline-block">
        হোয়াটসঅ্যাপে কথা বলুন
      </span>
    </a>
  );
}