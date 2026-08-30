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
  Calendar,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  FileCheck2,
  Stethoscope,
  Target,
  Compass
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'ডাঃ মোঃ গিয়াস উদ্দিন ও আমাদের পরিচিতি | বিডি হোমিও একাডেমি',
  description: 'প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক ডাঃ মোঃ গিয়াস উদ্দিন স্যারের জীবনদর্শন, ২০+ বছরের অভিজ্ঞতা এবং বিডি হোমিও প্রশিক্ষণ কেন্দ্রের লক্ষ্য ও কারিকুলাম।',
  openGraph: {
    title: 'ডাঃ মোঃ গিয়াস উদ্দিন ও আমাদের পরিচিতি | বিডি হোমিও একাডেমি',
    description: 'প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক ডাঃ মোঃ গিয়াস উদ্দিন স্যারের জীবনদর্শন, ২০+ বছরের অভিজ্ঞতা এবং বিডি হোমিও প্রশিক্ষণ কেন্দ্রের লক্ষ্য ও কারিকুলাম।',
    url: 'https://bdhomeo.com/about',
    images: ['https://bdhomeo.com/assets/sir/sir-portrait.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-bangla pb-20">
      
      {/* Hero Header Banner */}
      <section className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white py-16 sm:py-20 border-b border-emerald-900/60">
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

              <p className="text-sm sm:text-base text-amber-300 font-bold leading-relaxed">
                Right Homeopath, Right Homeopathy — বিশুদ্ধ হ্যানিম্যানিয়ান দর্শনে নিবেদিত চিকিৎসক ও শিক্ষক
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                বিগত ২০+ বছর ধরে অর্গানন অব মেডিসিনের মৌলিক নীতিমালা, মেটেরিয়া মেডিকার ড্রাগ পিকচার ও রেপার্টরির ব্যবহারিক সমন্বয়ে বাংলাদেশের ৬৪ জেলার চিকিৎসকদের আত্মবিশ্বাসী ক্লাসিক্যাল প্র্যাকটিশনার হিসেবে গড়ে তুলছেন।
              </p>

              <div className="flex flex-wrap gap-3 pt-2 text-xs font-bold">
                <span className="bg-emerald-800/60 border border-emerald-600/50 text-emerald-200 px-3 py-1.5 rounded-xl">
                  🎓 DHMS, MSS (DU), PGT (Homeo)
                </span>
                <span className="bg-emerald-800/60 border border-emerald-600/50 text-emerald-200 px-3 py-1.5 rounded-xl">
                  🏆 ২০+ বছরের অভিজ্ঞতা
                </span>
                <span className="bg-emerald-800/60 border border-emerald-600/50 text-emerald-200 px-3 py-1.5 rounded-xl">
                  📜 PTF সার্টিফিকেশন পার্টনার
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-84 sm:w-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-500/40 bg-slate-900">
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

      {/* Main Content Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Doctor Bio Card & Instructor Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Quick Profile Summary Card */}
          <div className="lg:col-span-5 bg-white p-7 rounded-3xl border border-slate-200 shadow-md space-y-4">
            <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>এক নজরে শিক্ষাগত ও চেম্বার তথ্য</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-slate-900 w-28 shrink-0">নাম:</span>
                <span className="font-semibold text-slate-800">ডাঃ মোঃ গিয়াস উদ্দিন</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-slate-900 w-28 shrink-0">ভূমিকা:</span>
                <span className="font-semibold text-emerald-700">প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক, বিডি হোমিও একাডেমি</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-slate-900 w-28 shrink-0">ডিগ্রি ও যোগ্যতা:</span>
                <span className="font-semibold text-slate-800">DHMS, MSS (ঢাকা বিশ্ববিদ্যালয়), PGT (Homeo)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-slate-900 w-28 shrink-0">অভিজ্ঞতা:</span>
                <span className="font-semibold text-slate-800">২০+ বছরের সফল প্র্যাকটিস ও শিক্ষকতা</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-slate-900 w-28 shrink-0">মর্নিং কেস সাপোর্ট:</span>
                <span className="font-semibold text-teal-700">সপ্তাহে ৬ দিন সকাল ৮:০০ - ৯:০০ টা</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="font-bold text-slate-900 w-28 shrink-0">চেম্বার যোগাযোগের সময়:</span>
                <span className="font-semibold text-slate-800">বিকাল ৫:০০ - রাত ৯:০০ (শুক্রবার বন্ধ)</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <p className="font-bold">📞 হেল্পলাইন ও সরাসরি পরামর্শ:</p>
              <p className="font-mono font-black text-sm text-emerald-800">01811-123993</p>
            </div>
          </div>

          {/* Instructor Message */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200 shadow-md space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200 inline-block">
                আমাদের উদ্দেশ্য ও মিশন
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                “চেম্বারে রোগী আরোগ্যের সঠিক আত্মবিশ্বাস গড়ে তোলাই আমাদের সাধনা”
              </h3>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                হোমিওপ্যাথি কোনো অনুমানভিত্তিক চিকিৎসা নয়; এটি বিজ্ঞানের সুনির্দিষ্ট নিয়মে পরিচালিত সদৃশ চিকিৎসা পদ্ধতি। প্রাতিষ্ঠানিক ডিগ্রি অর্জনের পরও বহু নবীন চিকিৎসক বাস্তব চেম্বারে রোগী এলে কনফিউশনে পড়েন।
              </p>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                এই ঘাটতি দূর করতেই <strong>বিডি হোমিও প্রশিক্ষণ কেন্দ্র</strong> প্রতিষ্ঠা করা হয়েছে। আমরা প্রতিটি ক্লাসে অর্গানন অব মেডিসিনের এফোরিজম, মেটেরিয়া মেডিকার ড্রাগ পিকচার ও রেপার্টরির সঠিক ব্যবহারিক সমন্বয় শেখাই যাতে ছাত্ররা আত্মবিশ্বাসের সাথে একক ওষুধ প্রয়োগ করতে পারেন।
              </p>
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-emerald-400">লাইভ ক্লিনিক্যাল সাপোর্ট</span>
                <p className="text-xs font-bold">সপ্তাহে ৬ দিন সকালে সরাসরি জটিল কেস সমাধান</p>
              </div>
              <Link
                href="/courses"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shrink-0"
              >
                কোর্সসমূহ দেখুন
              </Link>
            </div>
          </div>

        </div>

        {/* 4 Pillars of BD Homeo Education */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              আমাদের পাঠদানের ৪টি মূল স্তম্ভ
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              হ্যানিম্যানের মৌলিক সূত্রের আলোকে পরিচালিত শিক্ষাদান পদ্ধতি
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">অর্গানন অব মেডিসিন</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ১ম থেকে ২৯১তম এফোরিজমের মৌলিক দর্শন, ভাইটাল ফোর্স এবং সঠিক পটেন্সি ও শক্তিমাত্রার গভীর জ্ঞান।
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">ক্লিনিক্যাল মেটেরিয়া মেডিকা</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                তোতাপাখির মতো মুখস্থ না করে রোগীর মানসিক ও শারীরিক অনুভূতির সাথে জীবন্ত ড্রাগ পিকচার মিলিয়ে ওষুধ নির্বাচন।
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">রেপার্টরাইজেশন মেথড</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                কেন্স, বোগার ও বোরিক রেপার্টরির রুব্রিক সিলেকশন এবং কনকমিট্যান্ট লক্ষণের সঠিক প্রায়োগিক সমন্বয়।
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">মায়াজমেটিক কেস সলভিং</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                সোরা, সাইকোসিস ও সিফিলিস মায়াজমের গভীরতা নির্ণয় করে ক্রনিক ও জটিল রোগের স্থায়ী আরোগ্য নিশ্চিতকরণ।
              </p>
            </div>
          </div>
        </div>

        {/* Milestones & Achievements */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-800/40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-emerald-800/60">
            <div className="space-y-1 pt-4 lg:pt-0">
              <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">১০০০+</span>
              <p className="text-xs text-slate-300 font-bold">প্রশিক্ষিত চিকিৎসক</p>
            </div>
            <div className="space-y-1 pt-4 lg:pt-0">
              <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">৬৪</span>
              <p className="text-xs text-slate-300 font-bold">জেলায় সক্রিয় প্র্যাকটিশনার</p>
            </div>
            <div className="space-y-1 pt-4 lg:pt-0">
              <span className="text-3xl sm:text-4xl font-black text-teal-400 font-mono">২০+</span>
              <p className="text-xs text-slate-300 font-bold">বছরের চিকিৎসা ও শিক্ষকতা</p>
            </div>
            <div className="space-y-1 pt-4 lg:pt-0">
              <span className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">৬ দিন</span>
              <p className="text-xs text-slate-300 font-bold">সাপ্তাহিক লাইভ মর্নিং সাপোর্ট</p>
            </div>
          </div>
        </div>

        {/* PTF Certification Partnership */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border-2 border-emerald-500/30">
              <Image
                src="/assets/gallery/certificate-ptf-1.jpg"
                alt="PTF Certificate"
                fill
                sizes="(max-width: 1024px) 100vw, 350px"
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-bold px-3 py-1 rounded-lg">
                <Award className="w-4 h-4 text-amber-700" />
                <span>অফিসিয়াল সার্টিফিকেট পার্টনার</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                PTF (Paramedical Technology Foundation) অনুমোদিত প্রফেশনাল সনদ
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                বিডি হোমিও প্রশিক্ষণ কেন্দ্রের ৬ মাসের কোর্স সফলভাবে সম্পন্নকারী শিক্ষার্থীদের PTF অনুমোদিত অফিসিয়াল সার্টিফিকেট প্রদান করা হয়। কোর্স শেষে সনদপত্র সরাসরি আপনার চেম্বার ঠিকানায় কুরিয়ারে পৌঁছে দেওয়ার সুব্যবস্থা রয়েছে।
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-6 py-3 rounded-xl shadow transition"
                >
                  <span>কোর্স কারিকুলাম ও ভর্তি</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition"
                >
                  <span>কর্মশালার ছবি দেখুন</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
