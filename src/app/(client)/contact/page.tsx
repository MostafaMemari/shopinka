'use client';

import TextInput from '@/components/common/TextInput';
import { shopInfo } from '@/data/shopInfo';
import Link from 'next/link';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useContactForm } from '@/features/contact/hooks/useContactForm';

export default function ContactPage() {
  const { formik, isCreateContactLoading } = useContactForm();
  const { handleSubmit } = formik;

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
          <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextInput id="fullName" name="fullName" label="نام شما" isRequired formik={formik} />
            <TextInput id="phone" name="phone" label="شماره تماس شما" isRequired formik={formik} />
            <div className="col-span-1 md:col-span-2">
              <TextInput id="email" name="email" label="ایمیل شما" formik={formik} />
            </div>
            <div className="col-span-1 md:col-span-2">
              <TextInput id="message" name="message" label="پیام شما" isRequired formik={formik} type="textarea" rows={3} />
            </div>
            <div className="col-span-1 flex justify-end md:col-span-2">
              <PrimaryButton onClick={handleSubmit} isLoading={isCreateContactLoading} disabled={isCreateContactLoading}>
                ارسال پیام
              </PrimaryButton>
            </div>
          </form>
        </div>
        <div className="col-span-1 md:col-span-2">
          <ul className="space-y-6">
            <li>
              <div className="flex flex-col gap-y-4">
                <p className="text-gray-700">آدرس ایمیل</p>
                <a href={`mailto:${shopInfo.email}`} className="text-primary hover:underline">
                  {shopInfo.email}
                </a>
              </div>
            </li>
            <li>
              <div className="flex flex-col gap-y-4">
                <p className="text-gray-700">تلفن پشتیبانی</p>
                <a dir="ltr" href={`tel:${shopInfo.phone}`} className="text-primary hover:underline">
                  {shopInfo.phone}
                </a>
              </div>
            </li>
            <li>
              <div className="flex flex-col gap-y-4">
                <p className="min-w-fit text-gray-700">آدرس دفتر</p>
                <div className="text-primary hover:underline">{shopInfo.address}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
