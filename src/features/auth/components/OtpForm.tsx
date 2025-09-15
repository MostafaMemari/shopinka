'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useEffect, useRef, useState } from 'react';
import { useCountdownSeconds } from '@/hooks/use-countdown';
import { secondsToTime } from '@/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { OTP_EXPIRE_SECONDS } from '@/constants';
import { validationOtpSchema } from '@/validation/ValidateOtp';
import { zodResolver } from '@hookform/resolvers/zod';
import { clearOtp, setOtpSentAt } from '@/store/slices/otpSlice';
import { OtpTimer } from './OtpTimer';
import { Alert } from '@/components/common/Alert';

interface InputOTPFormProps {
  verifyOtp?: any;
  ref: React.Ref<HTMLFormElement>;
}

type OTPFormValues = { otp: string };

function InputOTPForm({ verifyOtp, ref }: InputOTPFormProps) {
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const mobile = useSelector((state: RootState) => state.otp.mobile)!;

  const { otpSentAt } = useSelector((state: RootState) => state.otp);

  const { countdown, startCountdown } = useCountdownSeconds(OTP_EXPIRE_SECONDS);
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
    if (isExpired) {
      dispatch(clearOtp());
    }
  }, [isExpired, dispatch]);

  useEffect(() => {
    if (otpSentAt) {
      const diff = Math.floor((Date.now() - otpSentAt) / 1000);
      const left = OTP_EXPIRE_SECONDS - diff;
      if (left > 0) startCountdown(left);
    }
  }, [otpSentAt, startCountdown]);

  const handleSubmit = async (values: { otp: string }) => {
    verifyOtp(
      { mobile, otp: values.otp },
      {
        onSuccess: () => {
          dispatch(setOtpSentAt(Date.now()));
          form.reset();
        },

        onError: (error: Error) => {
          setError(error.message);
          form.reset();
          setTimeout(() => inputRef.current?.focus(), 0);
        },
      },
    );
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
      {error && <Alert variant="destructive" icon="error" title={error} />}

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

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">مانده تا انقضای کد:</span>
        <OtpTimer timeLeft={timeLeft} />
      </div>
    </>
  );
}

export default InputOTPForm;
