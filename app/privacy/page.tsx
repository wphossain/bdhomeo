import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen font-bangla py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-black text-slate-900 border-b pb-4">
          প্রাইভেসি পলিসি (Privacy Policy)
        </h1>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">১. তথ্যের গোপনীয়তা</h2>
            <p>
              বিডি হোমিও প্রশিক্ষণ কেন্দ্র (`bdhomeo.com`) শিক্ষার্থীদের ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা বজায় রাখতে প্রতিশ্রুতিবদ্ধ। আপনার নাম, ফোন নম্বর, ইমেইল ও পেমেন্ট সংক্রান্ত কোনো তথ্য কোনো তৃতীয় পক্ষের কাছে হস্তান্তর বা বিক্রয় করা হবে না।
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">২. ফেসবুক বিজ্ঞাপন ও লিড সংগ্রহ</h2>
            <p>
              আমরা যখন ফেসবুক বা অন্যান্য ডিজিটাল মাধ্যমে বিজ্ঞাপন পরিচালনা করি, তখন শুধুমাত্র ফ্রি ওরিয়েন্টেশন ক্লাসে অংশগ্রহণের জন্য আগ্রহী শিক্ষার্থীদের ফোন নম্বর ও নাম সংগ্রহ করা হয়, যেন ক্লাসের গুগল মিট লিংক পাঠানো যায়।
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">৩. অ্যাকাউন্টের নিরাপত্তা</h2>
            <p>
              Google OAuth এর মাধ্যমে সাইন-ইন প্রক্রিয়া সম্পূর্ণ গুগল সিকিউরিটি প্রটোকল দ্বারা পরিচালিত হয়।
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}