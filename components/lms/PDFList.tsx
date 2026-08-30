'use client';

import React from 'react';
import { FileText, Download, FileCheck, BookOpen, Sparkles } from 'lucide-react';

export interface PDFItem {
  id: string;
  title: string;
  chapterTitle: string;
  pdfUrl?: string;
  fileSize?: string;
}

interface PDFListProps {
  items?: PDFItem[];
}

const defaultPDFList: PDFItem[] = [
  {
    id: 'pdf-1',
    title: 'অধ্যায় ১: অর্গানন অব মেডিসিন — মৌলিক ভিত্তি ও দর্শন হ্যান্ডআউট',
    chapterTitle: 'হ্যানিম্যানের মূল এফোরিজম ও হোমিওপ্যাথিক নীতিমালার গভীর বিশ্লেষণ',
    pdfUrl: 'https://drive.google.com/file/d/sample-organon-basics/view',
    fileSize: '২.৪ MB',
  },
  {
    id: 'pdf-2',
    title: 'অধ্যায় ১: ভাইটাল ফোর্স ও ডিজিজ ডাইনামিক্স সামারি শিট',
    chapterTitle: 'অর্গানন অব মেডিসিন — মৌলিক ভিত্তি ও দর্শন',
    pdfUrl: 'https://drive.google.com/file/d/sample-vital-force/view',
    fileSize: '১.৮ MB',
  },
  {
    id: 'pdf-3',
    title: 'অধ্যায় ২: সালফার (Sulphur) এর গভীর মনোদৈহিক ড্রাগ পিকচার চার্ট',
    chapterTitle: 'ক্লিনিক্যাল মেটেরিয়া মেডিকা — পলিক্রেস্ট ড্রাগ স্টাডি',
    pdfUrl: 'https://drive.google.com/file/d/sample-sulphur-study/view',
    fileSize: '৩.১ MB',
  },
  {
    id: 'pdf-4',
    title: 'অধ্যায় ২: নাক্স ভমিকা ও লাইকোপোডিয়ামের তুলনামূলক ডায়াগনস্টিক শিট',
    chapterTitle: 'ক্লিনিক্যাল মেটেরিয়া মেডিকা — পলিক্রেস্ট ড্রাগ স্টাডি',
    pdfUrl: 'https://drive.google.com/file/d/sample-nux-lyc/view',
    fileSize: '২.২ MB',
  },
  {
    id: 'pdf-5',
    title: 'অধ্যায় ৩: স্ট্যান্ডার্ড হোমিওপ্যাথিক কেস টেকিং শিট ও চেম্বার প্রোটোকল',
    chapterTitle: 'কেস টেকিং ও লক্ষণ সংগ্রহ পদ্ধতি',
    pdfUrl: 'https://drive.google.com/file/d/sample-case-taking-sheet/view',
    fileSize: '১.৫ MB',
  },
  {
    id: 'pdf-6',
    title: 'এডভান্সড: কেনটের রেপার্টরি রুব্রিক্স ডিকোডিং ও ক্লিনিক্যাল গাইড',
    chapterTitle: 'রেপার্টরি মাস্টারি ও রুব্রিক্স ডিকোড',
    pdfUrl: 'https://drive.google.com/file/d/sample-repertory-guide/view',
    fileSize: '৪.২ MB',
  },
];

export function PDFList({ items }: PDFListProps) {
  const displayItems = items && items.length > 0 ? items : defaultPDFList;

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 font-bangla">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-emerald-400" />
            অধ্যায়ভিত্তিক PDF লেকচার শিট ও স্টাডি মেটেরিয়াল
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            ডাঃ মোঃ গিয়াস উদ্দিন স্যারের রিসার্চ শিট, কেস টেকিং ফরম্যাট ও ড্রাগ পিকচার চার্ট
          </p>
        </div>
        <span className="text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-xl self-start sm:self-auto">
          মোট শিট: {displayItems.length} টি
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayItems.map((pdf) => (
          <div
            key={pdf.id}
            className="flex items-center justify-between p-4 bg-slate-950 hover:bg-slate-900 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 transition group"
          >
            <div className="flex items-center gap-3 min-w-0 pr-3">
              <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-emerald-400 transition truncate">
                  {pdf.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                  <span className="truncate">{pdf.chapterTitle}</span>
                  {pdf.fileSize && (
                    <span className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.5 rounded font-english shrink-0">
                      {pdf.fileSize}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <a
              href={pdf.pdfUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shrink-0 shadow-sm"
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