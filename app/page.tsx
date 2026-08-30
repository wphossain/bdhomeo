'use client';

import React, { useState } from 'react';
import { Hero } from '@/components/landing/Hero';
import { DoctorProfile } from '@/components/landing/DoctorProfile';
import { CourseCards } from '@/components/landing/CourseCards';
import { PTFCertificate } from '@/components/landing/PTFCertificate';
import { VideoShowcase } from '@/components/landing/VideoShowcase';
import { TrustGallery } from '@/components/landing/TrustGallery';
import { FaqSection } from '@/components/landing/FaqSection';
import { OrientationModal } from '@/components/landing/OrientationModal';
import { Sparkles, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [isOrientationOpen, setIsOrientationOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Hero Section with Sir's Portrait */}
      <Hero onOpenOrientation={() => setIsOrientationOpen(true)} />

      {/* 2. Doctor / Instructor Profile & Message */}
      <DoctorProfile />

      {/* 3. Course Catalog Cards (Basic & Advance) */}
      <CourseCards />

      {/* 4. PTF Certification & Courier Delivery Showcase */}
      <PTFCertificate />

      {/* 5. YouTube Video Lectures Demo Showcase */}
      <VideoShowcase />

      {/* 6. Real Workshop & Certificate Distribution Trust Gallery */}
      <TrustGallery />

      {/* 7. Bottom High-Converting Call to Action */}
      <section className="py-16 bg-gradient-to-r from-emerald-950 via-brand-900 to-slate-950 text-white font-bangla text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-400/40">
            <Sparkles className="w-3.5 h-3.5" />
            আগামী ব্যাচের ভর্তি চলছে
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            হোমিওপ্যাথি প্র্যাকটিসে নিজেকে একধাপ এগিয়ে নিতে চান?
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto">
            ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি তত্ত্বাবধানে ৬ মাসের নিয়মতান্ত্রিক কোর্সে অংশ নিন এবং অর্গানন ও মেটেরিয়া মেডিকার গভীর জ্ঞানে পারদর্শী হয়ে উঠুন।
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsOrientationOpen(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-base px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105"
            >
              ফ্রি ওরিয়েন্টেশন ক্লাসে যোগ দিন
            </button>
            <Link
              href="/courses"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold text-base px-7 py-4 rounded-2xl border border-white/20 transition"
            >
              সকল কোর্স ও সিলেবাস দেখুন
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FAQ Section */}
      <FaqSection />

      {/* Free Orientation Lead Capture Modal */}
      <OrientationModal
        isOpen={isOrientationOpen}
        onClose={() => setIsOrientationOpen(false)}
      />

    </div>
  );
}