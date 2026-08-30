'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { FileText, Download, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

export function PDFList() {
  const { courses } = useApp();

  // Extract all real lessons that have PDF handouts across all courses
  const allPdfLessons = courses.flatMap((course) =>
    course.curriculum.flatMap((chapter) =>
      chapter.lessons
        .filter((lesson) => lesson.pdfNotesUrl)
        .map((lesson) => ({
          id: lesson.id,
          title: lesson.pdfNotesTitle || lesson.title,
          url: lesson.pdfNotesUrl!,
          courseTitle: course.title,
          chapterTitle: chapter.title,
          size: '২.৫ MB',
        }))
    )
  );

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 font-bangla text-slate-100 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>অধ্যায়ভিত্তিক PDF নোটস ও লেকচার শিট</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            ক্লিনিক্যাল অর্গানন, মেটেরিয়া মেডিকা ও রেপার্টরির সাজানো রঙিন লেকচার শিট ডাউনলোড করুন।
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-3.5 py-1.5 rounded-full border border-emerald-800/60 self-start sm:self-auto">
          মোট {allPdfLessons.length}টি হ্যান্ডআউট উপলব্ধ
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allPdfLessons.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition flex items-center justify-between gap-4 shadow-lg group"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500/20 transition">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 inline-block mb-1">
                  {item.chapterTitle}
                </span>
                <h4 className="font-bold text-xs text-white truncate group-hover:text-emerald-300 transition">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">{item.courseTitle}</p>
              </div>
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shrink-0 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF ডাউনলোড</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
