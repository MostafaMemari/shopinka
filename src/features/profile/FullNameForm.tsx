'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef } from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const fullNameSchema = z.object({
  fullName: z.string().trim().min(1, 'نام و نام خانوادگی الزامی است'),
});

type FullNameFormType = z.infer<typeof fullNameSchema>;

interface AddressProps {
  onSubmit: (values: FullNameFormType) => Promise<void>;
  initialValues?: FullNameFormType;
  className?: string;
}

const FullNameForm = forwardRef<HTMLFormElement, AddressProps>(({ onSubmit, initialValues = { fullName: '' }, className = '' }, ref) => {
  const form = useForm<FullNameFormType>({
    resolver: zodResolver(fullNameSchema),
    defaultValues: initialValues,
  });

  const handleSubmit = async (values: FullNameFormType) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form ref={ref} onSubmit={form.handleSubmit(handleSubmit)} className={`space-y-4 p-4 text-right ${className}`.trim()} dir="rtl">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام و نام خانوادگی</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});

FullNameForm.displayName = 'FullNameForm';

export default FullNameForm;
