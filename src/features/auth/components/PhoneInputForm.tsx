import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { validateIranPhoneNumber } from '@/validation/validateIranPhoneNumber';
import { cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/hooks/useAuth';
import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setOtpSentAt, setMobile } from '@/store/slices/otpSlice';
import { RootState } from '@/store';

interface PhoneInputFormProps {
  className?: string;
  ref?: React.Ref<HTMLFormElement>;
  sendOtp: any;
}

const phoneValidationSchema = Yup.object({
  mobile: Yup.string()
    .required('شماره موبایل الزامی است')
    .test('is-valid-iran-phone', 'شماره موبایل معتبر نیست', (value) => validateIranPhoneNumber(value || '')),
});

type PhoneFormValues = { mobile: string };

function PhoneInputForm({ className, ref, sendOtp }: PhoneInputFormProps) {
  const mobile = useSelector((state: RootState) => state.otp.mobile)!;

  const dispatch = useDispatch();

  const form = useForm<PhoneFormValues>({
    resolver: yupResolver(phoneValidationSchema),
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
        toast.error(error.message);
      },
    });
  };

  return (
    <>
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
