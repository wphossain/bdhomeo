import { Metadata } from 'next';
import { CourseDetailClient } from '@/components/courses/CourseDetailClient';
import { initialCourses } from '@/lib/data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const course = initialCourses.find(
    (c) =>
      c.slug === slug ||
      (slug === 'advance-clinical-repertory' && c.slug === 'advanced-clinical-repertory') ||
      (slug === 'advanced-clinical-repertory' && c.slug === 'advance-clinical-repertory')
  );

  if (!course) {
    return {
      title: 'কোর্স পাওয়া যায়নি | বিডি হোমিও',
      description: 'অনুরোধকৃত কোর্সটি পাওয়া যায়নি।',
    };
  }

  const title = `${course.title} | বিডি হোমিও প্রশিক্ষণ কেন্দ্র`;
  const description = `${course.subtitle} - ভর্তি ফি ${course.admissionFee} টাকা। ${course.liveSchedule}।`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://bdhomeo.com/courses/${course.slug}`,
      images: [
        {
          url: course.thumbnailUrl.startsWith('http')
            ? course.thumbnailUrl
            : `https://bdhomeo.com${course.thumbnailUrl}`,
          width: 1200,
          height: 630,
          alt: course.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [course.thumbnailUrl],
    },
  };
}

export function generateStaticParams() {
  return [
    { slug: 'basic-homeopathy-foundation' },
    { slug: 'advanced-clinical-repertory' },
    { slug: 'advance-clinical-repertory' },
  ];
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  return <CourseDetailClient initialSlug={slug} />;
}
