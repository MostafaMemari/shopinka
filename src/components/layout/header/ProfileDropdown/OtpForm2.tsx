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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { clearOtp, setOtpSentAt } from '@/store/slices/otpSlice';

const FormSchema = Yup.object().shape({
  otp: Yup.string()
    .matches(/^\d{6}$/, 'کد یک‌بارمصرف باید دقیقاً ۶ رقم عددی باشد')
    .required('کد یک‌بارمصرف الزامی است'),
});

interface InputOTPFormProps {
  mobile: string;
  onSuccess: () => void;
  isDialog?: boolean;
}

type OTPFormValues = { otp: string };

function InputOTPForm({ mobile, onSuccess, isDialog }: InputOTPFormProps) {
  const { verifyOtp, sendOtp, verifyOtpStatus, sendOtpStatus } = useAuthMutations();

  const { otpSentAt } = useSelector((state: RootState) => state.otp);
  const dispatch = useDispatch();

  const { countdown, startCountdown, counting } = useCountdownSeconds(60 * 5);
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
      const left = 5 * 60 - diff;
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
        onSuccess: () => {
          dispatch(clearOtp());
          onSuccess();
          toast.success('ورود شما با موفقیت انجام شد');
        },
        onError: (error) => {
          toast.error(error.message);
          form.reset();
          setTimeout(() => inputRef.current?.focus(), 0);
        },
      },
    );
  };

  const handleResendCode = () => {
    if (isExpired) {
      sendOtp(mobile, {
        onSuccess: () => {
          toast.success('کد اعتبار سنجی مجددا ارسال شد');
          dispatch(setOtpSentAt(Date.now()));
          startCountdown(60 * 5);
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

      <Button
        variant="ghost"
        onClick={handleResendCode}
        className="mt-1 text-sm text-gray-500 dark:text-gray-400 text-center"
        disabled={counting}
      >
        {counting ? (
          <>
            ارسال مجدد کد ({String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')})
          </>
        ) : (
          'ارسال مجدد کد'
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

// useImperativeHandle(formRef, () => ({
//   submit: () => form.handleSubmit(handleSubmit)(),
// }));
