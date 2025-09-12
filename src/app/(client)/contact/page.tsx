import Link from 'next/link';
import ContactInfo from '@/features/contact/components/ContactInfo';
import ContactForm from '@/features/contact/components/ContactForm';
import { Card, CardHeader } from '@/components/ui/card';
import { SectionHeader } from '@/components/common/SectionHeader';

export default function ContactPage() {
  return (
    <Card>
      <CardHeader>
        <SectionHeader title="تماس با ما" />
      </CardHeader>

      <CardHeader>
        <p className="mb-5 leading-loose text-gray-700">
          قبل از مطرح کردن هرگونه سوال، بخش{' '}
          <Link href="/faq" className="text-primary hover:underline">
            سوالات متداول
          </Link>{' '}
          را مطالعه نمایید.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          <div className="col-span-1 md:col-span-3">
            <ContactForm />
          </div>
          <div className="col-span-1 md:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
