'use client';

import { Form } from '@/components/ui/form';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useContact } from '@/features/contact/hooks/useContact';
import { type ContactForm, validationContactSchema } from '@/validation/validationContactSchema';
import { FormInput, FormTextarea } from '@/components/form/FormField';
import PrimaryButton from '@/components/common/PrimaryButton';

function ContactForm() {
  const { createContact, isCreateContactLoading } = useContact();

  const form = useForm({
    resolver: zodResolver(validationContactSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactForm) => {
    createContact(data, () => {
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormInput control={form.control} name="fullName" label="نام شما" />

        <FormInput control={form.control} name="phone" label="شماره تماس شما" />

        <FormInput control={form.control} name="email" label="ایمیل شما" className="col-span-1 md:col-span-2" type="email" />

        <FormTextarea control={form.control} name="message" label="پیام شما" className="col-span-1 md:col-span-2" rows={3} />
        <div className="col-span-1 flex justify-end md:col-span-2">
          <PrimaryButton type="submit" className="w-full lg:w-3xs" disabled={isCreateContactLoading} isLoading={isCreateContactLoading}>
            {isCreateContactLoading ? 'در حال ارسال...' : 'ارسال پیام'}
          </PrimaryButton>
        </div>
      </form>
    </Form>
  );
}

export default ContactForm;
