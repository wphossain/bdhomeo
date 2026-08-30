import { Metadata } from 'next';
import { CoursesClient } from '@/components/courses/CoursesClient';

export const metadata: Metadata = {
  title: 'সকল কোর্স ও প্রশিক্ষণ প্রোগ্রাম | বিডি হোমিও',
  description: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের পরিচালনায় অর্গানন, মেটেরিয়া মেডিকা ও রেপার্টরি ভিত্তিক ৬ মাসের অনলাইন কোর্স।',
  openGraph: {
    title: 'সকল কোর্স ও প্রশিক্ষণ প্রোগ্রাম | বিডি হোমিও',
    description: 'ডাঃ মোঃ গিয়াস উদ্দিন স্যারের পরিচালনায় অর্গানন, মেটেরিয়া মেডিকা ও রেপার্টরি ভিত্তিক ৬ মাসের অনলাইন কোর্স।',
    url: 'https://bdhomeo.com/courses',
  },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
