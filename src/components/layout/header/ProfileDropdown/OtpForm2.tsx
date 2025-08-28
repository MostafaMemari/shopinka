'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useEffect, useRef } from 'react';
import { useCountdownSeconds } from '@/hooks/use-countdown';
import { secondsToTime } from '@/utils/utils';
import { useAuthMutations } from '@/hooks/auth/useAuth';
import { Button, DrawerClose, DrawerFooter } from '@/components/ui';
import PrimaryButton from '@/components/common/PrimaryButton';

const FormSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, 'کد یک‌بارمصرف باید دقیقاً ۶ رقم عددی باشد')
    .required('کد یک‌بارمصرف الزامی است'),
});

interface InputOTPFormProps {
  mobile: string;
  onSuccess: () => void;
}

type OTPFormValues = { otp: string };

function InputOTPForm({ mobile, onSuccess }: InputOTPFormProps) {
  const { verifyOtp, sendOtp, verifyOtpStatus, sendOtpStatus } = useAuthMutations();

  const { countdown, counting, startCountdown } = useCountdownSeconds(60 * 5);
  const isExpired = countdown === 0;
  const timeLeft = secondsToTime(countdown);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<OTPFormValues>({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  const handleSubmit = async (values: OTPFormValues) => {
    if (isExpired) {
      toast.error('کد یک‌بارمصرف منقضی شده است. لطفا مجددا تلاش کنید.');
      return;
    }

    verifyOtp(
      { mobile, otp: values.otp },
      {
        onSuccess: () => {
          onSuccess();
          toast.success('ورود شما با موفقیت انجام شد');
        },
        onError: (error) => {
          toast.error(error.message);
          form.reset();

          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 0);
        },
      },
    );
  };

  const handleResendCode = () => {
    if (isExpired) {
      sendOtp(mobile, {
        onSuccess: () => {
          toast.success('کد اعتبار سنجی مجددا ارسال شد');
          startCountdown();
          form.reset();
        },
        onError: (error: Error) => {
          toast.error(error.message);
          form.reset();
        },
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const firstOtpInput = document.querySelector<HTMLInputElement>('input[autocomplete="one-time-code"]');
      firstOtpInput?.focus();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Form {...form}>
        <form className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center justify-center">
                <FormControl>
                  <InputOTP
                    disabled={isExpired}
                    ref={(e) => {
                      field.ref(e);
                      inputRef.current = e;
                    }}
                    inputMode="numeric"
                    maxLength={6}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    className="w-full"
                  >
                    <InputOTPGroup className="flex gap-1 sm:gap-2 flex-row-reverse [direction:ltr] justify-center">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <InputOTPSlot key={index} index={index} className="w-12 h-12 text-base sm:text-lg ..." />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>

                <FormMessage className="block h-4 text-xs text-red-500 dark:text-red-400" />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Button variant="ghost" onClick={handleResendCode} className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-center">
        ارسال مجدد کد {counting && `${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`}
      </Button>

      <DrawerFooter className="h-auto flex-shrink-0">
        <div className="flex justify-between gap-2 w-full">
          <PrimaryButton
            isLoading={verifyOtpStatus === 'pending'}
            disabled={form.formState.isSubmitting || isExpired}
            onClick={form.handleSubmit(handleSubmit)}
            className="flex-1"
          >
            ارسال کد ورود
          </PrimaryButton>

          <DrawerClose asChild>
            <Button variant="secondary" className="w-24">
              بستن
            </Button>
          </DrawerClose>
        </div>
      </DrawerFooter>
    </>
  );
}

export default InputOTPForm;

// useImperativeHandle(formRef, () => ({
//   submit: () => form.handleSubmit(handleSubmit)(),
// }));
