'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { 
  BookOpen, 
  Sparkles, 
  Menu, 
  X, 
  Phone, 
  Award, 
  LogIn, 
  LogOut, 
  User, 
  ShieldCheck, 
  GraduationCap,
  MessageCircle,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { OrientationModal } from '@/components/landing/OrientationModal';

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut, signInWithGoogle, demoLogin } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orientationModalOpen, setOrientationModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'হোম', href: '/' },
    { name: 'সকল কোর্স', href: '/courses' },
    { name: 'ডাঃ গিয়াস উদ্দিন', href: '/about' },
    { name: 'গ্যালারি ও কর্মশালা', href: '/about#gallery' },
    { name: 'যোগাযোগ', href: '/contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Institute Branding */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-md border-2 border-emerald-600/30 group-hover:border-emerald-600 transition-colors">
                <Image
                  src="/assets/logo.png"
                  alt="বিডি হোমিও লোগো"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl text-emerald-950 font-bangla tracking-tight group-hover:text-emerald-700 transition">
                  বিডি হোমিও
                </span>
                <span className="text-[11px] font-bold text-amber-600 font-bangla -mt-1 tracking-wide">
                  প্রশিক্ষণ কেন্দ্র • BD Homeo
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all font-bangla ${
                      isActive
                        ? 'text-emerald-800 bg-emerald-50/80 font-bold'
                        : 'text-slate-700 hover:text-emerald-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              
              {/* Free Orientation Button CTA */}
              <button
                onClick={() => setOrientationModalOpen(true)}
                className="flex items-center gap-1.5 text-xs lg:text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition transform hover:-translate-y-0.5 font-bangla"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>ফ্রি ওরিয়েন্টেশন</span>
              </button>

              {/* User Account / Google Sign-In */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center overflow-hidden">
                      {user.avatarUrl ? (
                        <Image src={user.avatarUrl} alt={user.fullName} width={32} height={32} />
                      ) : (
                        user.fullName.charAt(0)
                      )}
                    </div>
                    <span className="text-xs font-bold text-emerald-950 font-bangla max-w-[100px] truncate">
                      {user.fullName}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 font-bangla">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">{user.fullName}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {user.role === 'admin' ? 'অ্যাডমিন' : 'শিক্ষার্থী'}
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl transition"
                        >
                          <GraduationCap className="w-4 h-4 text-emerald-600" />
                          <span>আমার ক্লাসরুম</span>
                        </Link>

                        {user.role === 'admin' && (
                          <Link
                            href="/admin"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100/80 rounded-xl transition mt-1"
                          >
                            <ShieldCheck className="w-4 h-4 text-amber-600" />
                            <span>অ্যাডমিন ড্যাশবোর্ড</span>
                          </Link>
                        )}
                      </div>

                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            signOut();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>লগআউট করুন</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={signInWithGoogle}
                    className="flex items-center gap-2 text-xs lg:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition font-bangla"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Google সাইন-ইন</span>
                  </button>
                </div>
              )}

            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setOrientationModalOpen(true)}
                className="text-[11px] font-bold bg-amber-400 text-slate-950 px-2.5 py-1.5 rounded-lg shadow-sm font-bangla"
              >
                ফ্রি ক্লাস
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 font-bangla">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-800 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl shadow"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>আমার ক্লাসরুম ({user.fullName})</span>
                  </Link>

                  {user.role === 'admin' && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 bg-amber-500 text-slate-950 text-xs font-bold py-3 rounded-xl shadow"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>অ্যাডমিন প্যানেল</span>
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="w-full text-xs text-rose-600 font-bold py-2 hover:bg-rose-50 rounded-lg transition"
                  >
                    লগআউট
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signInWithGoogle();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl shadow"
                >
                  <LogIn className="w-4 h-4" />
                  <span>গুগল দিয়ে লগইন</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Free Orientation Class Modal */}
      <OrientationModal
        isOpen={orientationModalOpen}
        onClose={() => setOrientationModalOpen(false)}
      />
    </>
  );
}