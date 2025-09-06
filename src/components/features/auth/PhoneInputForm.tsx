import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { validateIranPhoneNumber } from '@/validation/validateIranPhoneNumber';
import { cn } from '@/lib/utils';
import { useAuthMutations } from '@/hooks/auth/useAuth';
import React from 'react';
import { Button, DialogFooter, DrawerClose, DrawerFooter } from '@/components/ui';
import PrimaryButton from '@/components/common/PrimaryButton';
import Link from 'next/link';
import { DialogClose } from '@radix-ui/react-dialog';
import { useDispatch } from 'react-redux';
import { setOtpSentAt, setPhone } from '@/store/slices/otpSlice';

interface PhoneInputFormProps {
  mobile: string;
  setMobile: (value: string) => void;
  className?: string;
  isDialog?: boolean;
}

const phoneValidationSchema = Yup.object({
  mobile: Yup.string()
    .required('شماره موبایل الزامی است')
    .test('is-valid-iran-phone', 'شماره موبایل معتبر نیست', (value) => validateIranPhoneNumber(value || '')),
});

type PhoneFormValues = { mobile: string };

function PhoneInputForm({ mobile, setMobile, className, isDialog }: PhoneInputFormProps) {
  const { sendOtp, sendOtpStatus } = useAuthMutations();

  const dispatch = useDispatch();

  const form = useForm<PhoneFormValues>({
    resolver: yupResolver(phoneValidationSchema),
    defaultValues: {
      mobile,
    },
  });

  const handleSubmit = async (values: PhoneFormValues) => {
    sendOtp(values.mobile, {
      onSuccess: () => {
        toast.success('کد تایید به شماره موبایل شما ارسال شد');
        dispatch(setPhone(values.mobile));
        dispatch(setOtpSentAt(Date.now()));
        setMobile(values.mobile);
      },
      onError: (error) => {
        form.reset();
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={cn('flex flex-col gap-4', className)}>
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

      <p className="text-center text-sm text-text/90 pb-1">
        با ورود به فروشگاه،
        <Link href="/info/terms-of-service" className="text-primary">
          {' '}
          کلیه قوانین
        </Link>{' '}
        را می‌پذیرم
      </p>

      {isDialog ? (
        <DialogFooter className="h-auto flex-shrink-0">
          <div className="flex justify-between gap-2 w-full">
            <PrimaryButton onClick={form.handleSubmit(handleSubmit)} isLoading={sendOtpStatus === 'pending'} className="flex-1">
              ارسال کد ورود
            </PrimaryButton>

            <DialogClose asChild>
              <Button variant="secondary" className="w-24">
                بستن
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      ) : (
        <DrawerFooter className="h-auto flex-shrink-0">
          <div className="flex justify-between gap-2 w-full">
            <PrimaryButton onClick={form.handleSubmit(handleSubmit)} isLoading={sendOtpStatus === 'pending'} className="flex-1">
              ارسال کد ورود
            </PrimaryButton>

            <DrawerClose asChild>
              <Button variant="secondary" className="w-24">
                بستن
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      )}
    </>
  );
}

export default PhoneInputForm;
