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
  isActive: boolean;
}

export interface Chapter {
  id: string;
  chapterNo: number;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  durationMin: number;
  youtubeVideoId?: string;
  pdfNotesUrl?: string;
  pdfNotesTitle?: string;
  isFreePreview: boolean;
  completed?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  role: 'student' | 'admin';
  createdAt: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  courseTitle: string;
  batchType: string;
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

export interface SiteSettings {
  siteName: string;
  tagline: string;
  instructorName: string;
  instructorDesignation: string;
  whatsappNumber: string;
  bkashNumber: string;
  bkashType: string;
  nagadNumber: string;
  nagadType: string;
  noticeText: string;
  noticeActive: boolean;
  googleMeetUrl: string;
  classTime: string;
  ptfCertified: boolean;
}
