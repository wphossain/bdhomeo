import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { initialCourses } from '@/lib/data';
import { toBanglaNumber, formatTaka } from '@/lib/utils';
import { Calendar, Clock, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'সকল কোর্স ও প্রশিক্ষণ প্রোগ্রাম | বিডি হোমিও',
  description: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের পরিচালনায় অর্গানন, মেটেরিয়া মেডিকা ও রেপার্টরি ভিত্তিক ৬ মাসের অনলাইন কোর্স।',
  openGraph: {
    title: 'সকল কোর্স ও প্রশিক্ষণ প্রোগ্রাম | বিডি হোমিও',
    description: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের পরিচালনায় অর্গানন, মেটেরিয়া মেডিকা ও রেপার্টরি ভিত্তিক ৬ মাসের অনলাইন কোর্স।',
    url: 'https://bdhomeo.com/courses',
  },
};

export default function CoursesPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-bangla py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>প্রফেশনাল হোমিওপ্যাথি প্রশিক্ষণ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            আমাদের একাডেমি কোর্স কারিকুলাম
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            হ্যানিম্যানের খাঁটি হোমিওপ্যাথি দর্শনে আত্মবিশ্বাসী প্র্যাকটিশনার হতে আপনার পছন্দের কোর্স বেছে নিন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {initialCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 sm:p-8 space-y-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-100">
                  <Image
                    src={course.thumbnailUrl}
                    alt={course.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-black uppercase text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    {course.batchType === 'advance' ? 'এডভান্সড মাস্টার কোর্স' : 'ফাউন্ডেশন কোর্স'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    {course.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {course.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-semibold text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{toBanglaNumber(course.durationMonths)} মাস মেয়াদী</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{course.liveSchedule}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">কোর্সের সুবিধাসমূহ:</span>
                  <div className="space-y-1.5">
                    {course.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold block uppercase">ভর্তি ফি</span>
                  <span className="text-xl font-black text-slate-900 font-mono">
                    {formatTaka(course.admissionFee)}
                  </span>
                </div>

                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-3 rounded-xl shadow transition"
                >
                  <span>কোর্স বিস্তারিত ও ভর্তি</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
