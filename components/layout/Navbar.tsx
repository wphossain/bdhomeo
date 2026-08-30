'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { 
  Menu, 
  X, 
  BookOpen, 
  User, 
  Phone, 
  Sparkles, 
  LogIn, 
  LogOut, 
  ShieldCheck, 
  GraduationCap,
  ChevronDown
} from 'lucide-react';
import { OrientationModal } from '@/components/landing/OrientationModal';

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut, signInWithGoogle } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrientationOpen, setIsOrientationOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'হোম', href: '/' },
    { name: 'সকল কোর্স', href: '/courses' },
    { name: 'ডাঃ গিয়াস উদ্দিন', href: '/about' },
    { name: 'গ্যালারি ও কর্মশালা', href: '/about#gallery' },
    { name: 'যোগাযোগ', href: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm font-bangla transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Institute Identity */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-md border-2 border-emerald-600/20 group-hover:border-emerald-600 transition-colors">
                <Image
                  src="/assets/logo.png"
                  alt="বিডি হোমিও লোগো"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-emerald-950 tracking-tight leading-none group-hover:text-emerald-700 transition">
                  বিডি হোমিও
                </span>
                <span className="text-[11px] font-bold text-slate-600 tracking-normal mt-0.5">
                  প্রশিক্ষণ কেন্দ্র • BD Homeo
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-bold transition-colors hover:text-emerald-700 relative py-1 ${
                      isActive ? 'text-emerald-800 font-extrabold' : 'text-slate-700'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Button Group */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* Free Orientation Trigger */}
              <button
                onClick={() => setIsOrientationOpen(true)}
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>ফ্রি ওরিয়েন্টেশন</span>
              </button>

              {/* User Account / Login State */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-950 transition"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
                      {user.avatarUrl ? (
                        <Image src={user.avatarUrl} alt={user.fullName} width={24} height={24} className="rounded-full" />
                      ) : (
                        user.fullName.charAt(0)
                      )}
                    </div>
                    <span className="max-w-[110px] truncate">{user.fullName}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-black uppercase ${user.role === 'admin' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-200 text-emerald-900'}`}>
                      {user.role === 'admin' ? 'Admin' : 'Student'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.fullName}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      </div>

                      {user.role === 'admin' ? (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-emerald-900 hover:bg-emerald-50 transition"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-700" />
                          <span>অ্যাডমিন কন্ট্রোল প্যানেল</span>
                        </Link>
                      ) : (
                        <Link
                          href="/dashboard"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-emerald-900 hover:bg-emerald-50 transition"
                        >
                          <GraduationCap className="w-4 h-4 text-emerald-700" />
                          <span>শিক্ষার্থী ক্লাসরুম (Dashboard)</span>
                        </Link>
                      )}

                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition"
                      >
                        <BookOpen className="w-4 h-4 text-slate-500" />
                        <span>আমার কোর্সসমূহ ও ক্লাস</span>
                      </Link>

                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            signOut();
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>লগআউট করুন</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Google সাইন-ইন</span>
                </button>
              )}

            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-emerald-100 bg-white px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 text-sm transition"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsOrientationOpen(true);
                }}
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs py-3 rounded-xl shadow text-center"
              >
                ফ্রি ওরিয়েন্টেশন ক্লাসে জয়েন করুন
              </button>

              {user ? (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                    <span className="text-xs font-bold text-slate-800">{user.fullName}</span>
                    <span className="text-[10px] font-black uppercase bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                      {user.role}
                    </span>
                  </div>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full bg-emerald-800 text-white font-bold text-xs py-2.5 rounded-xl text-center"
                    >
                      অ্যাডমিন কন্ট্রোল প্যানেল
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl text-center"
                  >
                    শিক্ষার্থী ক্লাসরুম ড্যাশবোর্ড
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut();
                    }}
                    className="w-full bg-slate-100 text-rose-600 font-bold text-xs py-2.5 rounded-xl text-center"
                  >
                    লগআউট
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signInWithGoogle();
                  }}
                  className="w-full bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow text-center"
                >
                  Google দিয়ে সাইন-ইন
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Orientation Registration Lead Modal */}
      <OrientationModal
        isOpen={isOrientationOpen}
        onClose={() => setIsOrientationOpen(false)}
      />
    </>
  );
}