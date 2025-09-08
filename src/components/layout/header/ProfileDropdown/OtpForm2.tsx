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
import { Button, DialogFooter, DrawerClose, DrawerFooter } from '@/components/ui';
import PrimaryButton from '@/components/common/PrimaryButton';
import { DialogClose } from '@radix-ui/react-dialog';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { OTP_EXPIRE_SECONDS } from '@/constants';

const FormSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, 'کد یک‌بارمصرف باید دقیقاً ۶ رقم عددی باشد')
    .required('کد یک‌بارمصرف الزامی است'),
});

interface InputOTPFormProps {
  isDialog?: boolean;
}

type OTPFormValues = { otp: string };

function InputOTPForm({ isDialog }: InputOTPFormProps) {
  const { verifyOtp, resendOtp, verifyOtpStatus, resendOtpStatus } = useAuthMutations();

  const mobile = useSelector((state: RootState) => state.otp.mobile)!;

  const { otpSentAt } = useSelector((state: RootState) => state.otp);

  const { countdown, startCountdown, counting } = useCountdownSeconds(OTP_EXPIRE_SECONDS);
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
    if (otpSentAt) {
      const diff = Math.floor((Date.now() - otpSentAt) / 1000);
      const left = OTP_EXPIRE_SECONDS - diff;
      if (left > 0) {
        startCountdown(left);
      }
    }
  }, [otpSentAt, startCountdown]);

  const handleSubmit = async (values: { otp: string }) => {
    if (isExpired) {
      toast.error('کد یک‌بارمصرف منقضی شده است. لطفا مجددا تلاش کنید.');
      return;
    }

    verifyOtp(
      { mobile, otp: values.otp },
      {
        onError: () => {
          form.reset();
          setTimeout(() => inputRef.current?.focus(), 0);
        },
      },
    );
  };

  const handleResendCode = () => {
    if (isExpired) {
      resendOtp(mobile, {
        onSuccess: () => {
          startCountdown(OTP_EXPIRE_SECONDS);
          form.reset();
        },
        onError: (error) => {
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
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
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

      <Button
        variant="ghost"
        onClick={handleResendCode}
        className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-center cursor-pointer"
        disabled={counting || resendOtpStatus === 'pending' || !isExpired}
      >
        {counting ? (
          <>
            ارسال مجدد کد ({String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')})
          </>
        ) : (
          <>{resendOtpStatus === 'pending' ? 'در حال ارسال...' : 'ارسال مجدد کد'}</>
        )}
      </Button>

      {isDialog ? (
        <DialogFooter>
          <PrimaryButton
            isLoading={verifyOtpStatus === 'pending'}
            disabled={form.formState.isSubmitting || isExpired}
            onClick={form.handleSubmit(handleSubmit)}
            className="flex-1"
          >
            ارسال کد ورود
          </PrimaryButton>
          <DialogClose asChild>
            <Button variant="secondary" className="w-24">
              بستن
            </Button>
          </DialogClose>
        </DialogFooter>
      ) : (
        <DrawerFooter className="h-auto flex-shrink-0">
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
        </DrawerFooter>
      )}
    </>
  );
}

export default InputOTPForm;
