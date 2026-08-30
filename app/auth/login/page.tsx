'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { LogIn, ShieldCheck, User } from 'lucide-react';

export default function LoginPage() {
  const { user, signInWithGoogle, demoLogin } = useApp();

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 bg-slate-50 font-bangla">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
        
        {/* Logo */}
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden mx-auto shadow-md border border-emerald-200">
          <Image src="/assets/logo.png" alt="???? ?????" fill className="object-cover" />
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900">
            ???? ????? ????????
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            ????? Google / Gmail ?????????? ???? ?? ?????? ????-?? ????
          </p>
        </div>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm py-4 rounded-2xl shadow-md hover:shadow-lg transition-all"
        >
          <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/>
          </svg>
          <span>Google ???? ?-?????? ????</span>
        </button>

        {/* Demo login shortcuts */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <p className="text-xs text-slate-400">?? ????? ???? ??????? ????? ????:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => demoLogin('student')}
              className="py-2.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              Student Demo
            </button>
            <button
              onClick={() => demoLogin('admin')}
              className="py-2.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 text-xs font-bold rounded-xl transition"
            >
              Admin Demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
