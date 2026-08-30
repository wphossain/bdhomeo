'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Sparkles, X, CheckCircle2, Send, Phone, User, BookOpen } from 'lucide-react';

interface OrientationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrientationModal({ isOpen, onClose }: OrientationModalProps) {
  const { submitOrientationLead, showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [homeoBackground, setHomeoBackground] = useState('ডিএইচএমএস শিক্ষার্থী');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneRegex = /^(?:\+?88|88)?01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      showToast('সঠিক ১১ সংখ্যার মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)', 'error');
      return;
    }

    setIsSubmitting(true);
    const ok = await submitOrientationLead({
      name,
      phone,
      email,
      homeoBackground,
    });
    setIsSubmitting(false);

    if (ok) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 font-bangla animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Top Ribbon */}
        <div className="bg-gradient-to-r from-emerald-950 via-brand-900 to-slate-950 text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-black px-3 py-1 rounded-full border border-amber-400/30 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>১০০% ফ্রি লাইভ ওরিয়েন্টেশন ক্লাস</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            হোমিওপ্যাথি ক্লাসিক্যাল মাস্টারক্লাসে যুক্ত হোন
          </h3>
          <p className="text-xs text-emerald-100/80 mt-1">
            ডাঃ মোঃ গিয়াস উদ্দিন স্যারের বিশেষ ফ্রি ক্লাসে অংশ নিয়ে অর্গানন ও মেটেরিয়া মেডিকার নতুন দিগন্ত উন্মোচন করুন।
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {isSuccess ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="text-xl font-bold text-slate-900">রেজিস্ট্রেশন সফল হয়েছে!</h4>
              <p className="text-xs text-slate-600">
                আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে হোয়াটসঅ্যাপে গুগল মিট লিংক শেয়ার করবেন।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  আপনার নাম (Full Name) *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: ডাঃ মোঃ আশরাফুল ইসলাম"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  হোয়াটসঅ্যাপ / মোবাইল নম্বর *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-600 focus:bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  আপনার হোমিওপ্যাথিক ব্যাকগ্রাউন্ড
                </label>
                <select
                  value={homeoBackground}
                  onChange={(e) => setHomeoBackground(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-emerald-600 focus:bg-white cursor-pointer"
                >
                  <option value="ডিএইচএমএস শিক্ষার্থী">ডিএইচএমএস শিক্ষার্থী (DHMS Student)</option>
                  <option value="ডিএইচএমএস চিকিৎসক">ডিএইচএমএস চিকিৎসক (DHMS Doctor)</option>
                  <option value="বিএইচএমএস শিক্ষার্থী/চিকিৎসক">বিএইচএমএস শিক্ষার্থী / চিকিৎসক (BHMS)</option>
                  <option value="নতুন প্র্যাকটিশনার">নতুন চেম্বার প্র্যাকটিশনার</option>
                  <option value="হোমিওপ্যাথি অনুরাগী">হোমিওপ্যাথি অনুরাগী ও সাধারণ শিক্ষার্থী</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'জমা হচ্ছে...' : 'ফ্রি ক্লাসে আসন বুক করুন'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
