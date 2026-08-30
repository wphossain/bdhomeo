'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { Phone, MessageCircle, MapPin, Clock, Mail, Send, Award, Sparkles } from 'lucide-react';

export function ContactClient() {
  const { settings } = useApp();

  const helpline = settings.helplineNumber || '01811-123993';
  const whatsapp = settings.whatsappNumber || '01811-123993';
  const chamber = settings.chamberAddress || 'ঢাকা, বাংলাদেশ';
  const email = settings.officialEmail || 'bdhomeo@gmail.com';
  const altHelpline = settings.alternateHelpline || '';
  const classTime = settings.classTime || 'রাত ৯:৩০ টা';

  return (
    <div className="bg-slate-50 min-h-screen font-bangla pb-20">
      
      <section className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 text-white py-16 border-b border-emerald-900/60 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-400/30">
            <Phone className="w-3.5 h-3.5" />
            <span>সরাসরি যোগাযোগ ও সহায়তা</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            আমাদের সাথে যোগাযোগ করুন
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            কোর্স ভর্তি, লাইভ ক্লাসের রুটিন কিংবা প্র্যাকটিস সহায়তার জন্য আমাদের প্রতিনিধি সার্বক্ষণিক সহায়তার জন্য প্রস্তুত।
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">অফিসিয়াল হেল্পলাইন</h3>
            <p className="font-mono text-base font-black text-emerald-700">{helpline}</p>
            {altHelpline && (
              <p className="font-mono text-xs font-bold text-slate-600">বিকল্প: {altHelpline}</p>
            )}
            <p className="text-xs text-slate-500">সকাল ৯টা থেকে রাত ১০টা পর্যন্ত</p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">হোয়াটসঅ্যাপ সাপোর্ট</h3>
            <p className="font-mono text-base font-black text-teal-700">{whatsapp}</p>
            <a
              href={`https://wa.me/880${whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-bold text-teal-600 hover:underline"
            >
              মেসেজ পাঠান ↗
            </a>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">চেম্বার ও একাডেমি ঠিকানা</h3>
            <p className="text-xs text-slate-700 leading-relaxed">{chamber}</p>
            {email && (
              <p className="text-xs text-slate-500 pt-1 font-mono">ইমেইল: {email}</p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
