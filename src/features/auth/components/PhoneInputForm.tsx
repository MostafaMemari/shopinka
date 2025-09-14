import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setOtpSentAt, setMobile } from '@/store/slices/otpSlice';
import { RootState } from '@/store';
import { phoneValidationSchema } from '@/validation/validateIranPhoneNumber';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert } from '@/components/common/Alert';

interface PhoneInputFormProps {
  className?: string;
  ref?: React.Ref<HTMLFormElement>;
  sendOtp: any;
}

type PhoneFormValues = { mobile: string };

function PhoneInputForm({ className, ref, sendOtp }: PhoneInputFormProps) {
  const mobile = useSelector((state: RootState) => state.otp.mobile)!;
  const [error, setError] = React.useState<string | null>(null);

  const dispatch = useDispatch();

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneValidationSchema),
    defaultValues: {
      mobile: mobile || '',
    },
  });

  const handleSubmit = async (values: PhoneFormValues) => {
    sendOtp(values.mobile, {
      onSuccess: () => {
        dispatch(setMobile(values.mobile));
        dispatch(setOtpSentAt(Date.now()));
      },
      onError: (error: Error) => {
        form.reset();
        setError(error.message);
      },
    });
  };

  return (
    <>
      {error && <Alert variant="destructive" icon="error" title={error} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} ref={ref} className={cn('flex flex-col gap-4 mt-1', className)}>
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    autoFocus
                    type="tel"
                    placeholder="شماره موبایل"
                    dir="ltr"
                    className="h-12 text-sm text-center"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        form.handleSubmit(handleSubmit)();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage className="block h-4 text-xs text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <p className="text-center text-sm text-text/90 pt-3">
        با ورود به فروشگاه،
        <Link href="/info/terms-of-service" className="text-primary">
          {' '}
          کلیه قوانین
        </Link>{' '}
        را می‌پذیرم
      </p>
    </>
  );
}

export default PhoneInputForm;
