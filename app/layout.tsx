import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloating } from '@/components/layout/WhatsAppFloating';
import { Toast } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'বিডি হোমিও প্রশিক্ষণ কেন্দ্র | ডাঃ মোঃ গিয়াস উদ্দিন | BD Homeo',
  description: 'বাংলাদেশের অন্যতম সেরা হোমিওপ্যাথিক প্রশিক্ষণ একাডেমি। অর্গানন অব মেডিসিন, মেটেরিয়া মেডিকা ও রেপার্টরি ভিত্তিক ৬ মাসের অনলাইন কোর্স ও PTF অনুমোদিত সার্টিফিকেট।',
  keywords: 'BD Homeo, বিডি হোমিও, হোমিওপ্যাথি কোর্স, ডা. গিয়াস উদ্দিন, homeopathy training bangladesh, PTF certificate, Materia Medica, Organon of Medicine',
  authors: [{ name: 'Dr. Md. Geaus Uddin' }],
  metadataBase: new URL('https://bdhomeo.com'),
  openGraph: {
    title: 'বিডি হোমিও প্রশিক্ষণ কেন্দ্র • Right Homeopath, Right Homeopathy',
    description: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের ক্লাসিক্যাল হোমিওপ্যাথি অনলাইন প্রশিক্ষণ একাডেমি।',
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
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppFloating />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}