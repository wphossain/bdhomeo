import { Metadata } from 'next';
import { ContactClient } from '@/components/contact/ContactClient';

export const metadata: Metadata = {
  title: 'যোগাযোগ ও হেল্পলাইন সাপোর্ট | বিডি হোমিও',
  description: 'ভর্তি পরামর্শ, কোর্স সহায়তা ও চেম্বার যোগাযোগের জন্য আমাদের অফিসিয়াল নম্বরে কল বা হোয়াটসঅ্যাপ করুন।',
  openGraph: {
    title: 'যোগাযোগ ও হেল্পলাইন সাপোর্ট | বিডি হোমিও',
    description: 'ভর্তি পরামর্শ, কোর্স সহায়তা ও চেম্বার যোগাযোগের জন্য আমাদের অফিসিয়াল নম্বরে কল বা হোয়াটসঅ্যাপ করুন।',
    url: 'https://bdhomeo.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
