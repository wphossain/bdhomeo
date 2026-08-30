'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloating } from '@/components/layout/WhatsAppFloating';
import { Toast } from '@/components/ui/Toast';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith('/admin') || pathname.startsWith('/dashboard');

  if (isDashboardRoute) {
    return (
      <>
        <main className="flex-1 w-full min-h-screen bg-slate-950 text-slate-100">
          {children}
        </main>
        <Toast />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppFloating />
      <Toast />
    </>
  );
}