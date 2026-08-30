'use client';

import React from 'react';
import { Play, CheckCircle2, Youtube } from 'lucide-react';

interface VideoPlayerProps {
  videoId?: string;
  title: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export function VideoPlayer({ videoId, title, isCompleted, onToggleComplete }: VideoPlayerProps) {
  // Extract ID if a full URL is passed
  let cleanId = videoId || 'M7lc1UVf-VE';
  if (cleanId.includes('watch?v=')) {
    cleanId = cleanId.split('watch?v=')[1]?.split('&')[0] || cleanId;
  } else if (cleanId.includes('youtu.be/')) {
    cleanId = cleanId.split('youtu.be/')[1]?.split('?')[0] || cleanId;
  }

  return (
    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 font-bangla">
      {/* 16:9 Video Frame */}
      <div className="relative w-full aspect-video bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${cleanId}?rel=0&modestbranding=1&enablejsapi=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      {/* Video Footer Bar */}
      <div className="p-4 sm:p-6 bg-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800 inline-block">
            চলমান লেকচার
          </span>
          <h2 className="text-base sm:text-lg font-black text-white leading-snug">
            {title}
          </h2>
        </div>

        <button
          onClick={onToggleComplete}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition shrink-0 ${
            isCompleted
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-900/30'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-amber-300' : 'text-slate-400'}`} />
          <span>{isCompleted ? 'ক্লাসটি সম্পন্ন হয়েছে' : 'সম্পন্ন হিসেবে চিহ্নিত করুন'}</span>
        </button>
      </div>
    </div>
  );
}