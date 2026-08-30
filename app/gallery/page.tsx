import { Metadata } from 'next';
import { GalleryClient } from '@/components/gallery/GalleryClient';

export const metadata: Metadata = {
  title: 'ফটো গ্যালারি ও কর্মশালার খণ্ডচিত্র | বিডি হোমিও',
  description: 'বিডি হোমিও প্রশিক্ষণ কেন্দ্রের বিভিন্ন ব্যাচের শিক্ষার্থী, আলোচনা সভা, কর্মশালা ও সার্টিফিকেট প্রদান অনুষ্ঠানের ছবি।',
  openGraph: {
    title: 'ফটো গ্যালারি ও কর্মশালার খণ্ডচিত্র | বিডি হোমিও',
    description: 'বিডি হোমিও প্রশিক্ষণ কেন্দ্রের বিভিন্ন ব্যাচের শিক্ষার্থী, আলোচনা সভা, কর্মশালা ও সার্টিফিকেট প্রদান অনুষ্ঠানের ছবি।',
    url: 'https://bdhomeo.com/gallery',
    images: ['https://bdhomeo.com/assets/gallery/workshop-1.jpg'],
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
