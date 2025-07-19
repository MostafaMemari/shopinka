'use client';

import Toast from '@/utils/swalToast';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { verifyOtp, sendOtp } from '@/service/authService';
import { handleApiError } from '@/utils/handleApiError';
import { errorPhoneNumberStepMessages } from './PhoneInputForm';
import { extractTimeFromText } from '@/utils/utils';
import { useLoginUser } from '@/hooks/reactQuery/auth/useLoginUser';
import { useSyncCart } from '@/hooks/reactQuery/cart/useSyncCart';
import { useOtpTimer } from '@/hooks/useOtpTimer';
import PrimaryButton from '@/components/ui/PrimaryButton';
import OTPInput from 'react-otp-input';

export const errorOtpStepMessages: Record<number, string> = {
  400: 'کد وارد شده نادرست است.',
  403: 'درخواست بیش‌از‌حد. لطفاً {time} بعد دوباره تلاش کنید',
  409: 'کد قبلاً ارسال شده، {time} بعد امتحان کنید',
  429: 'درخواست زیاد بود. بعداً تلاش کنید.',
  500: 'خطای سرور. دوباره امتحان کنید.',
};

interface OtpFormProps {
  mobile: string;
  backUrl: string;
}

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .required('لطفاً کد ۶ رقمی را وارد کنید')
    .matches(/^\d{6}$/, 'لطفاً کد ۶ رقمی را وارد کنید'),
});

export default function OtpForm({ mobile, backUrl }: OtpFormProps) {
  const router = useRouter();
  const loginUser = useLoginUser();
  const syncCart = useSyncCart();
  const { timeLeft, isExpired, formatTime, resetTimer } = useOtpTimer(300);

  const handleSubmit = async (
    values: { otp: string },
    {
      setSubmitting,
      setErrors,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; setErrors: (errors: any) => void; resetForm: () => void },
  ) => {
    if (isExpired) {
      setErrors({ otp: 'زمان شما به اتمام رسیده' });
      resetForm();
      return;
    }

    try {
      const res = await verifyOtp(mobile, values.otp);
      let errorMessage = handleApiError(res.status, errorOtpStepMessages);

      if (errorMessage) {
        if (res.status === 403 || res.status === 409) {
          errorMessage = errorMessage.replace('{time}', extractTimeFromText(res?.data?.message) ?? 'بعدا');
        }

        Toast.fire({ icon: 'error', title: errorMessage });
        resetForm();
        return;
      }

      if (res.status === 200 || res.status === 201) {
        await loginUser({ mobile, role: 'CUSTOMER', full_name: '' });
        await syncCart();
        resetTimer();
        Toast.fire({ icon: 'success', title: 'ورود شما با موفقیت انجام شد' });
        router.push(backUrl || '/');
      }
    } catch (error) {
      setErrors({ otp: 'کد تأیید نامعتبر است' });
      resetForm();
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOtp = async (setSubmitting: (isSubmitting: boolean) => void) => {
    try {
      const res = await sendOtp(mobile);
      let errorMessage = handleApiError(res.status, errorPhoneNumberStepMessages);

      if (errorMessage) {
        if (res.status === 403 || res.status === 409) {
          errorMessage = errorMessage.replace('{time}', extractTimeFromText(res?.data?.message) ?? 'بعدا');
        }

        Toast.fire({ icon: 'error', title: errorMessage });
        return;
      }

      if (res.status === 200 || res.status === 201) {
        Toast.fire({ icon: 'success', title: 'کد تأیید مجدداً ارسال شد' });
        resetTimer();
      }
    } catch (error) {
      Toast.fire({ icon: 'error', title: 'خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={{ otp: '' }} validationSchema={otpValidationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting, setSubmitting, setFieldValue, values, submitForm, validateForm }) => (
        <Form className="space-y-4">
          <div dir="ltr" className="flex justify-center">
            <Field name="otp">
              {({ field }: any) => (
                <div className="relative">
                  <input
                    {...field}
                    dir="ltr"
                    autoFocus
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="------"
                    className={`w-full text-center tracking-[0.5em] text-xl sm:text-2xl md:text-3xl py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary bg-muted transition-all duration-150 ${
                      values.otp.length === 6 ? 'ring-2 ring-primary' : ''
                    }`}
                    maxLength={6}
                    value={values.otp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setFieldValue('otp', value);

                      if (value.length === 6 && !isExpired) {
                        setTimeout(() => submitForm(), 0);
                      }
                    }}
                  />
                  <ErrorMessage name="otp" component="p" className="text-sm text-red-500 mt-2 text-center" />
                </div>
              )}
            </Field>
          </div>

          <div className="flex flex-col sm:justify-between gap-3">
            <PrimaryButton type="submit" isLoading={isSubmitting} disabled={isSubmitting || isExpired}>
              تایید
            </PrimaryButton>

            {isExpired ? (
              <button
                type="button"
                onClick={() => handleResendOtp(setSubmitting)}
                disabled={isSubmitting}
                className="text-sm text-primary hover:underline disabled:text-gray-400 disabled:cursor-not-allowed text-center"
              >
                ارسال مجدد کد
              </button>
            ) : (
              <p className="text-primary text-sm text-center mt-4">
                <span className="font-bold">{formatTime(timeLeft)}</span> مانده تا دریافت مجدد کد
              </p>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
