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

export interface SiteSettings {
  siteTitle: string;
  slogan: string;
  heroHeadline: string;
  heroSubheadline: string;
  doctorName: string;
  doctorTitle: string;
  doctorMessage: string;
  bkashNumber: string;
  bkashType: 'Personal' | 'Merchant';
  nagadNumber: string;
  nagadType: 'Personal' | 'Merchant';
  whatsappNumber: string;
  helplineNumber: string;
  classTime: string;
  googleMeetUrl: string;
  noticeText: string;
  youtubeUrl: string;
  facebookUrl: string;
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
  paymentMethod: 'bkash' | 'nagad';
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
  paymentMethod: 'bkash' | 'nagad';
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

export interface TestimonialItem {
  id: string;
  name: string;
  designation: string;
  batchName: string;
  quote: string;
  avatarUrl?: string;
  rating?: number;
}