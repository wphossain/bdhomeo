'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { FileText, Download, BookOpen, ExternalLink } from 'lucide-react';

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
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 font-bangla">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-black text-white">ক্লাস নোটস ও হ্যান্ডআউট পিডিএফ</h3>
          <p className="text-xs text-slate-400">কোর্সের সকল লেকচার নোটস, মেটেরিয়া মেডিকা ও রেপার্টরি শিট</p>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
          মোট {allPdfLessons.length}টি পিডিএফ উপলব্ধ
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allPdfLessons.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950 p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition flex items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-white truncate">{item.title}</h4>
                <p className="text-[11px] text-slate-400 truncate">{item.chapterTitle} • {item.courseTitle}</p>
              </div>
            </div>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition shrink-0 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ডাউনলোড</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
