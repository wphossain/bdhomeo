import { Metadata } from 'next';
import Image from 'next/image';
import { initialSiteSettings } from '@/lib/data';
import { Camera, Calendar, Award, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ফটো গ্যালারি ও কর্মশালার খণ্ডচিত্র | বিডি হোমিও',
  description: 'বিডি হোমিও প্রশিক্ষণ কেন্দ্রের বিভিন্ন ব্যাচের শিক্ষার্থী, আলোচনা সভা, কর্মশালা ও সার্টিফিকেট প্রদান অনুষ্ঠানের ছবি।',
  openGraph: {
    title: 'ফটো গ্যালারি ও কর্মশালার খণ্ডচিত্র | বিডি হোমিও',
    description: 'বিডি হোমিও প্রশিক্ষণ কেন্দ্রের বিভিন্ন ব্যাচের শিক্ষার্থী, আলোচনা সভা, কর্মশালা ও সার্টিফিকেট প্রদান অনুষ্ঠানের ছবি।',
    url: 'https://bdhomeo.com/gallery',
    images: ['https://bdhomeo.com/assets/gallery/workshop-1.jpg'],
  },
};

export default function GalleryPage() {
  const images = initialSiteSettings.galleryImages;

  return (
    <div className="bg-slate-50 min-h-screen font-bangla pb-20">
      
      <section className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white py-16 border-b border-emerald-900/60 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-400/30">
            <Camera className="w-3.5 h-3.5" />
            <span>স্মৃতি ও সাফল্যের অ্যালবাম</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            আমাদের কর্মশালা ও সফল ব্যাচসমূহ
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            দেশব্যাপী বিভিন্ন জেলার হোমিওপ্যাথিক চিকিৎসকদের সাথে অনুষ্ঠিত কর্মশালা, একাডেমিক সেমিনার ও বাস্তব কেস স্টাডির খণ্ডচিত্র।
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-emerald-900/80 backdrop-blur-md text-emerald-200 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span>{item.subtitle || 'বিডি হোমিও একাডেমি'}</span>
                  {item.date && (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
