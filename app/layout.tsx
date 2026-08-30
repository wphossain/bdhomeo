import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';
import { AppShell } from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'বিডি হোমিও প্রশিক্ষণ কেন্দ্র | ডাঃ মোঃ গিয়াস উদ্দিন | BD Homeo',
  description: 'হোমিওপ্যাথির খাঁটি দর্শনে আত্মবিশ্বাসী প্র্যাকটিশনার হওয়ার ৬ মাসের মাস্টার একাডেমি। অর্গানন, মেটেরিয়া মেডিকা ও রেপার্টরি ভিত্তিক সপ্তাহে ২টি লাইভ ক্লাস ও PTF সার্টিফিকেট।',
  keywords: 'BD Homeo, বিডি হোমিও, হোমিওপ্যাথি একাডেমি, ডাঃ মোঃ গিয়াস উদ্দিন, homeopathy training bangladesh, PTF certificate, Materia Medica, Organon of Medicine',
  authors: [{ name: 'Dr. Md. Geaus Uddin' }],
  metadataBase: new URL('https://bdhomeo.com'),
  openGraph: {
    title: 'বিডি হোমিও প্রশিক্ষণ কেন্দ্র • Right Homeopath, Right Homeopathy',
    description: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের সরাসরি নির্দেশনায় অর্গানন ও মেটেরিয়া মেডিকার ৬ মাসের প্র্যাকটিক্যাল কোর্স।',
    url: 'https://bdhomeo.com',
    siteName: 'বিডি হোমিও (BD Homeo)',
    images: [
      {
        url: '/assets/sir/sir-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'বিডি হোমিও প্রশিক্ষণ কেন্দ্র',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white font-bangla text-slate-900 selection:bg-emerald-200 selection:text-emerald-950">
        <AppProvider>
          <AppShell>
            {children}
          </AppShell>
        </AppProvider>
      </body>
    </html>
  );
}