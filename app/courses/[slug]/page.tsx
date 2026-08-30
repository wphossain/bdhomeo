import { Metadata } from 'next';
import { CourseDetailClient } from '@/components/courses/CourseDetailClient';
import { initialCourses } from '@/lib/data';
import { supabase } from '@/lib/supabase';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  let course: any = null;

  try {
    const { data } = await supabase.from('courses').select('*').eq('slug', slug).single();
    if (data) course = data;
  } catch (err) {
    // fallback
  }

  if (!course) {
    course = initialCourses.find(
      (c) =>
        c.slug === slug ||
        (slug === 'advance-clinical-repertory' && c.slug === 'advanced-clinical-repertory') ||
        (slug === 'advanced-clinical-repertory' && c.slug === 'advance-clinical-repertory')
    );
  }

  if (!course) {
    return {
      title: 'কোর্স পাওয়া যায়নি | বিডি হোমিও',
      description: 'অনুরোধকৃত কোর্সটি পাওয়া যায়নি।',
    };
  }

  const title = `${course.title} | বিডি হোমিও প্রশিক্ষণ কেন্দ্র`;
  const description = `${course.subtitle} - ভর্তি ফি ${course.admission_fee || course.admissionFee || 1000} টাকা। ${course.live_schedule || course.liveSchedule || 'সাপ্তাহিক লাইভ ক্লাস'}।`;
  const imgUrl = course.thumbnail_url || course.thumbnailUrl || '/assets/sir/sir-portrait.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://bdhomeo.com/courses/${course.slug}`,
      images: [
        {
          url: imgUrl.startsWith('http') ? imgUrl : `https://bdhomeo.com${imgUrl}`,
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
      images: [imgUrl],
    },
  };
}

export async function generateStaticParams() {
  try {
    const { data: courses } = await supabase.from('courses').select('slug');
    if (courses && courses.length > 0) {
      return courses.map((c) => ({ slug: c.slug }));
    }
  } catch (e) {
    // fallback
  }

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
