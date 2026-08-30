'use client';

import React from 'react';
import { useApp } from '@/lib/store';

export function WhatsAppFloating() {
  const { settings } = useApp();
  const rawNumber = settings.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, '') : '01811123993';
  const cleanPhone = rawNumber.startsWith('88') ? rawNumber : `88${rawNumber.startsWith('0') ? rawNumber : '0' + rawNumber}`;
  const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি বিডি হোমিও প্রশিক্ষণ কেন্দ্রের কোর্স সম্পর্কে জানতে চাই।')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 font-bangla">
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 bg-gradient-to-r from-[#25D366] via-[#22c35e] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7569] text-white px-4 py-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-[0_10px_25px_-5px_rgba(37,211,102,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(37,211,102,0.6)] transition-all duration-300 transform hover:scale-105 border-2 border-white/80"
        aria-label="WhatsApp Helpline"
      >
        {/* Pulsing Ripple Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" />

        {/* Official WhatsApp SVG Vector */}
        <div className="relative z-10 shrink-0">
          <svg
            className="w-7 h-7 fill-current text-white drop-shadow-md"
            viewBox="0 0 24 24"
          >
            <path d="M12.031 0C5.396 0 .029 5.367.029 11.987c0 2.108.549 4.168 1.595 5.972L0 24l6.235-1.635A11.961 11.961 0 0012.03 24c6.634 0 12-5.367 12-11.987S18.665 0 12.031 0zm.019 21.947a9.92 9.92 0 01-5.064-1.385l-.364-.216-3.766.988 1.005-3.67-.238-.378a9.925 9.925 0 01-1.523-5.299c0-5.501 4.475-9.976 9.98-9.976 5.505 0 9.98 4.475 9.98 9.976 0 5.501-4.475 9.976-9.98 9.976zm5.467-7.464c-.3-.15-1.774-.874-2.048-.974-.275-.1-.475-.15-.675.15s-.774.974-.95 1.174-.35.225-.65.075c-.3-.15-1.267-.467-2.413-1.488-.892-.796-1.494-1.78-1.67-2.08-.175-.3-.019-.462.131-.611.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525s-.675-1.625-.925-2.225c-.244-.583-.492-.504-.675-.513l-.575-.01c-.2 0-.525.075-.8.375s-1.05 1.025-1.05 2.5 1.075 2.899 1.225 3.1c.15.2 2.116 3.231 5.127 4.531.716.31 1.275.495 1.71.633.72.228 1.375.196 1.893.119.577-.086 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z" />
          </svg>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full border-2 border-emerald-900 animate-pulse" />
        </div>

        {/* Text Container */}
        <div className="relative z-10 hidden sm:flex flex-col text-left leading-tight">
          <span className="text-[10px] uppercase font-black text-emerald-100 tracking-wider">
            সরাসরি সহায়তা
          </span>
          <span className="font-black text-xs text-white">
            হোয়াটসঅ্যাপে কথা বলুন
          </span>
        </div>
      </a>
    </div>
  );
}
