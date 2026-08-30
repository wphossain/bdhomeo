'use client';

import React from 'react';
import { CheckCircle2, PlayCircle, Lock } from 'lucide-react';

interface VideoPlayerProps {
  videoId?: string;
  title: string;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
}

export function VideoPlayer({
  videoId = 'p9kLm8x0Wq1',
  title,
  isCompleted = false,
  onToggleComplete,
}: VideoPlayerProps) {
  return (
    <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 font-bangla space-y-4 p-4 sm:p-6">
      {/* 16:9 Aspect Video Player */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-slate-800">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      {/* Video Details & Complete Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
            রানিং লেকচার
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
            {title}
          </h2>
        </div>

        {onToggleComplete && (
          <button
            onClick={onToggleComplete}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition shrink-0 ${
              isCompleted
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-white' : 'text-emerald-400'}`} />
            <span>{isCompleted ? 'ক্লাসটি সম্পন্ন হয়েছে' : 'কমপ্লিট চিহ্নিত করুন'}</span>
          </button>
        )}
      </div>
    </div>
  );
}