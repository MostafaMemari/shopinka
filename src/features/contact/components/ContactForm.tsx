'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useContact } from '@/features/contact/hooks/useContact';
import { type ContactForm, validationContactSchema } from '@/validation/validationContactSchema';

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
    createContact(
      data,
      () => {
        form.reset();
      },
      (error) => {
        console.error('خطا در ارسال پیام:', error);
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام شما</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>شماره تماس شما</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>ایمیل شما</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-2">
              <FormLabel>پیام شما</FormLabel>
              <FormControl>
                <Textarea {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-1 flex justify-end md:col-span-2">
          <Button type="submit" disabled={isCreateContactLoading}>
            {isCreateContactLoading ? 'در حال ارسال...' : 'ارسال پیام'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ContactForm;
