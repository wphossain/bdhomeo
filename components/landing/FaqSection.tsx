'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { initialFaqs } from '@/lib/data';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const { settings } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = settings.faqs && settings.faqs.length > 0 ? settings.faqs : initialFaqs;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50 font-bangla border-t border-emerald-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-4 py-1.5 rounded-full">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            সাধারণ জিজ্ঞাসা ও উত্তর
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            কোর্স সংক্রান্ত সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
          </h2>
          <p className="text-sm text-slate-600">
            ভর্তি প্রক্রিয়া, ফি ও ক্লাস নিয়ে যেকোনো দ্বিধা দূর করতে উত্তরগুলো পড়ুন।
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm sm:text-base hover:text-emerald-700 transition gap-4"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-emerald-700 shrink-0 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}