export type UserRole = 'student' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  durationMin: number;
  isFreePreview: boolean;
  youtubeVideoId?: string;
  pdfNotesTitle?: string;
  pdfNotesUrl?: string;
  notesContent?: string;
}

export interface Chapter {
  id: string;
  chapterNo: number;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  batchType: 'basic' | 'advance' | 'special';
  durationMonths: number;
  admissionFee: number;
  monthlyFee: number;
  liveSchedule: string;
  morningSupport?: string;
  thumbnailUrl: string;
  description: string;
  features: string[];
  curriculum: Chapter[];
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  subtitle?: string;
  category: string;
  desc: string;
  date?: string;
  showOnHome?: boolean;
}

export interface VideoShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  youtubeId: string;
  duration: string;
  tag: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  designation: string;
  batchName: string;
  quote: string;
  avatarUrl?: string;
  rating?: number;
}

export interface SiteSettings {
  siteTitle: string;
  slogan: string;
  heroHeadline: string;
  heroSubheadline: string;
  doctorName: string;
  doctorTitle: string;
  doctorDegrees: string;
  doctorExperience: string;
  doctorMessage: string;
  doctorChamberTime: string;
  heroImageUrl: string;
  doctorPortraitUrl: string;
  ptfCertificateImageUrl: string;
  metaOgImageUrl: string;
  galleryImages: GalleryItem[];
  videoShowcaseList: VideoShowcaseItem[];
  testimonials: TestimonialItem[];
  bkashNumber: string;
  bkashType: 'Personal' | 'Merchant';
  nagadNumber: string;
  nagadType: 'Personal' | 'Merchant';
  rocketNumber?: string;
  whatsappNumber: string;
  helplineNumber: string;
  alternateHelpline?: string;
  officialEmail?: string;
  chamberAddress?: string;
  classTime: string;
  morningSupportTime?: string;
  googleMeetUrl: string;
  noticeText: string;
  youtubeUrl: string;
  facebookUrl: string;
  facebookGroupUrl?: string;
  telegramUrl?: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  batchType: 'basic' | 'advance' | 'special';
  admissionStatus: 'pending' | 'approved' | 'rejected';
  trxId: string;
  senderPhone: string;
  paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'cash';
  enrolledAt: string;
}

export interface MonthlyPayment {
  id: string;
  studentId: string;
  studentName: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  monthName: string;
  amount: number;
  trxId: string;
  senderPhone: string;
  paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'cash';
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface OrientationLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  homeoBackground: string;
  status: 'new' | 'contacted' | 'joined';
  createdAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
