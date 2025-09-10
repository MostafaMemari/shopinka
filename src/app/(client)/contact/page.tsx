import Link from 'next/link';
import ContactInfo from '@/features/contact/components/ContactInfo';
import ContactForm from '@/features/contact/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="container rounded-2xl bg-muted/70 shadow-lg border border-border/60 p-8 transition-all duration-200">
      <div className="mb-5 flex">
        <h1 className="relative text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary drop-shadow-lg">
          تماس با ما
          <span className="absolute -bottom-2 left-0 h-1 w-3/5 rounded-full bg-primary transition-all duration-500 animate-pulse"></span>
        </h1>
      </div>
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
    </div>
  );
}
