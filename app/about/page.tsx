import { Metadata } from 'next';
import { AboutClient } from '@/components/about/AboutClient';

export const metadata: Metadata = {
  title: 'ডাঃ মোঃ গিয়াস উদ্দিন ও আমাদের পরিচিতি | বিডি হোমিও একাডেমি',
  description: 'প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক ডাঃ মোঃ গিয়াস উদ্দিন স্যারের জীবনদর্শন, ২০+ বছরের অভিজ্ঞতা এবং বিডি হোমিও প্রশিক্ষণ কেন্দ্রের লক্ষ্য ও কারিকুলাম।',
  openGraph: {
    title: 'ডাঃ মোঃ গিয়াস উদ্দিন ও আমাদের পরিচিতি | বিডি হোমিও একাডেমি',
    description: 'প্রতিষ্ঠাতা ও প্রধান প্রশিক্ষক ডাঃ মোঃ গিয়াস উদ্দিন স্যারের জীবনদর্শন, ২০+ বছরের অভিজ্ঞতা এবং বিডি হোমিও প্রশিক্ষণ কেন্দ্রের লক্ষ্য ও কারিকুলাম।',
    url: 'https://bdhomeo.com/about',
    images: ['https://bdhomeo.com/assets/sir/sir-portrait.jpg'],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
