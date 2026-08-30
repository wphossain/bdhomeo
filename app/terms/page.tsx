import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen font-bangla py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-black text-slate-900 border-b pb-4">
          শর্তাবলী ও রিফান্ড নীতি (Terms & Refund Policy)
        </h1>

        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">১. সেবা ও উদ্দেশ্য</h2>
            <p>
              বিডি হোমিও প্রশিক্ষণ কেন্দ্র একটি সম্পূর্ণ পেশাগত হোমিও শিক্ষা প্রতিষ্ঠান। এটি কোনো অনলাইন হাসপাতাল বা টেলিমেডিসিন প্ল্যাটফর্ম নয়।
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">২. মাসিক ফি নীতি</h2>
            <p>
              ভর্তি ফি এককালীন ১,০০০/- টাকা এবং মাসিক ফি প্রতি ইংরেজি মাসের ১ থেকে ৩ তারিখের মধ্যে ৫০০/- টাকা পরিশোধ করতে হবে। অনিয়মিত হলে নোটিশ দিয়ে কোর্স এক্সেস স্থগিত হতে পারে।
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">৩. রিফান্ড গ্যারান্টি</h2>
            <p>
              ক্লাস চলাকালীন কোনো শিক্ষার্থী যদি যৌক্তিক কারণ দর্শিয়ে কোর্সের মান নিয়ে অসন্তোষ প্রকাশ করেন, তবে স্যারের পূর্ব প্রতিশ্রুতি মোতাবেক যাচাই সাপেক্ষে ব্যবস্থা নেওয়া হবে।
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}