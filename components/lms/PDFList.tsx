'use client';

import React from 'react';
import { FileText, Download, FileCheck } from 'lucide-react';

interface PDFItem {
  id: string;
  title: string;
  chapterTitle: string;
  pdfUrl?: string;
}

interface PDFListProps {
  items: PDFItem[];
}

export function PDFList({ items }: PDFListProps) {
  if (!items || items.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 font-bangla text-slate-500 text-xs">
        এই কোর্সের জন্য এখনো কোনো পিডিএফ নোট সংযুক্ত করা হয়নি।
      </div>
    );
  }

  return (
    <div className="space-y-3 font-bangla">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((pdf) => (
          <div
            key={pdf.id}
            className="flex items-center justify-between p-4 bg-slate-50 hover:bg-emerald-50/60 rounded-2xl border border-slate-200 hover:border-emerald-300 transition group"
          >
            <div className="flex items-center gap-3 truncate pr-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="truncate">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-emerald-800 transition truncate">
                  {pdf.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">
                  {pdf.chapterTitle}
                </p>
              </div>
            </div>

            <a
              href={pdf.pdfUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white hover:bg-emerald-700 hover:text-white text-emerald-800 border border-emerald-300 text-xs font-bold px-3.5 py-2 rounded-xl transition shrink-0 shadow-sm"
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