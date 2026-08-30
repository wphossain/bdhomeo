import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Users, 
  GraduationCap, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ডাঃ মোঃ গিয়াস উদ্দিন ও আমাদের ইতিহাস | বিডি হোমিও',
  description: 'প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক ডাঃ মোঃ গিয়াস উদ্দিন স্যারের জীবনদর্শন, ২০+ বছরের শিক্ষকতা এবং বিডি হোমিও প্রশিক্ষণ কেন্দ্রের লক্ষ্য।',
  openGraph: {
    title: 'ডাঃ মোঃ গিয়াস উদ্দিন ও আমাদের ইতিহাস | বিডি হোমিও',
    description: 'প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক ডাঃ মোঃ গিয়াস উদ্দিন স্যারের জীবনদর্শন, ২০+ বছরের শিক্ষকতা এবং বিডি হোমিও প্রশিক্ষণ কেন্দ্রের লক্ষ্য।',
    url: 'https://bdhomeo.com/about',
    images: ['https://bdhomeo.com/assets/sir/sir-portrait.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-bangla pb-20">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white py-16 sm:py-24 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক পরিচিতি</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white">
                ডাঃ মোঃ গিয়াস উদ্দিন
              </h1>

              <p className="text-sm sm:text-base text-emerald-200/90 font-semibold leading-relaxed">
                Right Homeopath, Right Homeopathy — হোমিওপ্যাথির বিশুদ্ধ দর্শনে একনিষ্ঠ চিকিৎসক ও শিক্ষক
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                বিগত ২০+ বছর ধরে অর্গানন অব মেডিসিন, মেটেরিয়া মেডিকা ও রেপার্টরাইজেশনের মৌলিক নীতিমালার আলোকে বাংলাদেশের প্রতিটি জেলার চিকিৎসকদের হাতে-কলমে প্রশিক্ষণ দিয়ে আসছেন। তাঁর লক্ষ্য— প্রতিটি হোমিওপ্যাথি শিক্ষার্থী যেন চেম্বারে রোগী আরোগ্যের পূর্ণ আত্মবিশ্বাস অর্জন করেন।
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-500/30 bg-slate-900">
                <Image
                  src="/assets/sir/sir-portrait.jpg"
                  alt="ডাঃ মোঃ গিয়াস উদ্দিন"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">বিশুদ্ধ হ্যানিম্যানিয়ান দর্শন</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              অর্গাননের নীতি ও লক্ষণ ভিত্তিক সদৃশ বিধানের শতভাগ প্রয়োগ শিক্ষা।
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">৬ দিন মর্নিং কেস সাপোর্ট</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              সপ্তাহে ৬ দিন সকালে সরাসরি স্যারের সাথে জটিল রোগীর প্রেসক্রিপশন আলোচনা।
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">PTF অনুমোদিত সনদ</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ৬ মাসের প্রশিক্ষণ সফলভাবে সম্পন্নকারীদের জন্য পেশাদার সার্টিফিকেট।
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
