'use client';

import React, { useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ShieldCheck, LogIn, Lock, Loader2 } from 'lucide-react';

function LoginContent() {
  const { user, isAuthLoading, signInWithGoogle } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || (user?.role === 'admin' ? '/admin' : '/dashboard');

  useEffect(() => {
    if (!isAuthLoading && user) {
      if (redirect === '/admin' && user.role !== 'admin') {
        router.replace('/dashboard');
      } else {
        router.replace(redirect);
      }
    }
  }, [user, isAuthLoading, redirect, router]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50 font-bangla">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-2xl text-center space-y-6">
        
        {/* Logo */}
        <div className="relative w-16 h-16 min-w-[64px] max-w-[64px] shrink-0 rounded-2xl overflow-hidden mx-auto shadow-md border-2 border-emerald-500/30 p-1 bg-emerald-50">
          <Image src="/assets/logo.png" alt="বিডি হোমিও" fill sizes="64px" className="object-contain p-0.5" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">
            বিডি হোমিও প্রশিক্ষণ কেন্দ্র
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            আপনার অফিসিয়াল Google / Gmail অ্যাকাউন্ট দিয়ে এক ক্লিকে নিরাপদ সাইন-ইন করুন।
          </p>
        </div>

        {isAuthLoading ? (
          <div className="py-6 flex flex-col items-center justify-center gap-2 text-emerald-700">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-bold">লগইন যাচাই হচ্ছে...</span>
          </div>
        ) : user ? (
          <div className="py-6 flex flex-col items-center justify-center gap-2 text-emerald-700">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-bold">ড্যাশবোর্ডে প্রবেশ করানো হচ্ছে...</span>
          </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
            </svg>
            <span>Google দিয়ে নিরাপদ সাইন-ইন করুন</span>
          </button>
        )}

        {/* Security & Roles Info */}
        <div className="pt-6 border-t border-slate-100 space-y-3 text-left">
          <div className="flex items-start gap-2.5 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>রেজিস্টার্ড শিক্ষার্থীদের জন্য স্বয়ংক্রিয় স্টুডেন্ট ড্যাশবোর্ড অ্যাক্সেস।</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-slate-600">
            <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>অনুমোদিত অ্যাডমিন ইমেইল দিয়ে লগইন করলে স্বয়ংক্রিয়ভাবে অ্যাডমিন কন্ট্রোল প্যানেল ওপেন হবে।</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50 font-bangla">
        <div className="text-emerald-700 flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-xs font-bold">লোড হচ্ছে...</span>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
