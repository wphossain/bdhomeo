'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Sparkles, X, CheckCircle, Send, MessageCircle } from 'lucide-react';

interface OrientationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrientationModal({ isOpen, onClose }: OrientationModalProps) {
  const { submitOrientationLead, settings } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [homeoBackground, setHomeoBackground] = useState('ছাত্র/নতুন শিক্ষার্থী');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    const success = await submitOrientationLead({
      name,
      phone,
      homeoBackground,
    });
    setIsSubmitting(false);

    if (success) {
      setIsDone(true);
    }
  };

  const cleanWaNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const waDirectUrl = `https://wa.me/880${cleanWaNumber}?text=${encodeURIComponent(`আসসালামু আলাইকুম স্যার, আমি (${name || 'শিক্ষার্থী'}) ফ্রি ওরিয়েন্টেশন ক্লাসে অংশ নিতে চাই। আমার ফোন নম্বর: ${phone}`)}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 font-bangla animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-100 overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isDone ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                <Sparkles className="w-4 h-4 text-amber-600" />
                ফ্রি ওরিয়েন্টেশন ক্লাস রেজিস্ট্রেশন
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                হোমিওপ্যাথি ফ্রি ক্লাসে জয়েন করুন
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                গুগল মিট লাইভ ক্লাসের লিংক ও সময়সূচি সরাসরি আপনার হোয়াটসঅ্যাপে পেতে নিচের তথ্য দিন:
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  আপনার পূর্ণ নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ডাঃ / মোঃ ..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  হোয়াটসঅ্যাপ / মোবাইল নম্বর <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  আপনার বর্তমান হোমিওপ্যাথিক অভিজ্ঞতা
                </label>
                <select
                  value={homeoBackground}
                  onChange={(e) => setHomeoBackground(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-600 text-sm outline-none bg-white transition"
                >
                  <option value="ছাত্র/নতুন শিক্ষার্থী">হোমিওপ্যাথি শিক্ষার্থী / ডিপ্লোমা বা ডিএইচএমএস</option>
                  <option value="রানিং প্র্যাকটিশনার (১-৩ বছর)">রানিং প্র্যাকটিশনার (১-৩ বছর)</option>
                  <option value="অভিজ্ঞ চিকিৎসক (৪+ বছর)">অভিজ্ঞ চিকিৎসক (৪+ বছর)</option>
                  <option value="সাধারণ অনুরাগী">হোমিওপ্যাথি অনুরাগী ও নতুন শিখতে আগ্রহী</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold text-sm py-4 rounded-xl shadow-lg transition"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'জমা হচ্ছে...' : 'ফ্রি ক্লাসের জন্য কনফার্ম করুন'}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">
                রেজিস্ট্রেশন সফল হয়েছে!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                ধন্যবাদ {name}, ক্লাসের গুগল মিট লিংক সরাসরি স্যারের হেল্পলাইন হোয়াটসঅ্যাপে এখনই পেতে নিচের বাটনে ক্লিক করুন:
              </p>
            </div>

            <a
              href={waDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-lg transition"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>হোয়াটসঅ্যাপে গুগল মিট লিংক গ্রহণ করুন</span>
            </a>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsDone(false);
                  onClose();
                }}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                উইন্ডো বন্ধ করুন
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}