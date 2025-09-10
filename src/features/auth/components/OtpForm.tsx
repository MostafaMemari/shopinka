'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useEffect, useRef } from 'react';
import { useCountdownSeconds } from '@/hooks/use-countdown';
import { secondsToTime } from '@/utils/utils';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { OTP_EXPIRE_SECONDS } from '@/constants';
import { Button } from '@/components/ui/button';
import { validationOtpSchema } from '@/validation/ValidateOtp';
import { zodResolver } from '@hookform/resolvers/zod';

interface InputOTPFormProps {
  verifyOtp?: any;
  ref: React.Ref<HTMLFormElement>;
}

type OTPFormValues = { otp: string };

function InputOTPForm({ verifyOtp, ref }: InputOTPFormProps) {
  const { resendOtp, resendOtpStatus } = useAuth();

  const mobile = useSelector((state: RootState) => state.otp.mobile)!;

  const { otpSentAt } = useSelector((state: RootState) => state.otp);

  const { countdown, startCountdown, counting } = useCountdownSeconds(OTP_EXPIRE_SECONDS);
  const isExpired = countdown === 0;
  const timeLeft = secondsToTime(countdown);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<OTPFormValues>({
    resolver: zodResolver(validationOtpSchema),
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
        <form onSubmit={form.handleSubmit(handleSubmit)} ref={ref} className="flex flex-col gap-4 mt-1">
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
    </>
  );
}

export default InputOTPForm;
