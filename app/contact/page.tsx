'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Mail, 
  Globe, 
  Youtube, 
  Facebook 
} from 'lucide-react';

export default function ContactPage() {
  const { settings, submitOrientationLead, showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    await submitOrientationLead({
      name,
      phone,
      homeoBackground: message ? `মেসেজ: ${message}` : 'সরাসরি যোগাযোগ ফর্ম',
    });

    setIsSubmitted(true);
    showToast('আপনার মেসেজ সফলভাবে পৌঁছেছে! শীঘ্রই যোগাযোগ করা হবে।', 'success');
  };

  return (
    <div className="font-bangla bg-white min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 py-16 lg:py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase px-4 py-1.5 rounded-full">
            যোগাযোগ ও চেম্বার তথ্য
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
            ভর্তি সংক্রান্ত তথ্য, লাইভ ক্লাস শিডিউল বা ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সাথে যোগাযোগের মাধ্যম।
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
              <h3 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-3">
                অফিসিয়াল যোগাযোগ
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">সরাসরি ফোন হেল্পলাইন</span>
                    <a href={`tel:${settings.helplineNumber.replace(/[^0-9]/g, '')}`} className="font-bold text-slate-900 font-mono text-base hover:text-emerald-700">
                      {settings.helplineNumber}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-[#25D366]/20 text-[#25D366] rounded-xl shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">অফিসিয়াল হোয়াটসঅ্যাপ</span>
                    <a
                      href={`https://wa.me/880${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#25D366] font-mono text-base hover:underline"
                    >
                      {settings.whatsappNumber}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">লাইভ ক্লাসের সময়সূচি</span>
                    <p className="font-bold text-slate-900">{settings.classTime}</p>
                    <p className="text-xs text-slate-500">মর্নিং কেস সাপোর্ট: {settings.morningSupportTime || 'সকাল ৮:০০ টা'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-purple-100 text-purple-800 rounded-xl shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">চেম্বার ও প্রধান কার্যালয়</span>
                    <p className="font-bold text-slate-900">{settings.chamberAddress || 'ঢাকা, বাংলাদেশ'}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900">
                আমাদের মেসেজ পাঠান
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                আপনার নাম ও মোবাইল নম্বর দিয়ে মেসেজ লিখুন, আমরা দ্রুত আপনার সাথে যোগাযোগ করব।
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">মেসেজ সফলভাবে পৌঁছেছে!</h4>
                <p className="text-xs text-slate-600">আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন।</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="যেমন: ডাঃ মোঃ আরিফ হাসান"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 outline-none focus:border-emerald-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 outline-none focus:border-emerald-600 focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">আপনার বার্তা বা প্রশ্ন</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="কোর্সের নিয়মাবলি, লাইভ ক্লাস বা চেম্বার সাপোর্ট সম্পর্কে আপনার প্রশ্ন লিখুন..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-900 outline-none focus:border-emerald-600 focus:bg-white leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>মেসেজ সাবমিট করুন</span>
                </button>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
