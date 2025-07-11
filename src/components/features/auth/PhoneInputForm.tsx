import Toast from '@/utils/swalToast';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { sendOtp } from '@/service/authService';
import { handleApiError } from '@/utils/handleApiError';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Link from 'next/link';
import { validateIranPhoneNumber } from '@/validation/validateIranPhoneNumber';
import { extractTimeFromText } from '@/utils/utils';

export const errorPhoneNumberStepMessages: Record<number, string> = {
  400: 'شماره نامعتبر است',
  403: 'درخواست بیش‌از‌حد. لطفاً {time} بعد دوباره تلاش کنید',
  409: 'کد قبلاً ارسال شده، {time} بعد امتحان کنید',
  429: 'تعداد درخواست بیش از حد مجاز بود',
  500: 'خطای سرور',
};

interface PhoneInputFormProps {
  mobile: string;
  setMobile: (value: string) => void;
  handleShowOpt: () => void;
}

const phoneValidationSchema = Yup.object({
  mobile: Yup.string()
    .required('شماره موبایل الزامی است')
    .test('is-valid-iran-phone', 'شماره موبایل معتبر نیست', (value) => validateIranPhoneNumber(value || '')),
});

function PhoneInputForm({ mobile, setMobile, handleShowOpt }: PhoneInputFormProps) {
  const handleSubmit = async (
    values: { mobile: string },
    { setSubmitting, setErrors }: { setSubmitting: (isSubmitting: boolean) => void; setErrors: (errors: any) => void },
  ) => {
    try {
      const res = await sendOtp(values.mobile);

      let errorMessage = handleApiError(res.status, errorPhoneNumberStepMessages);

      if (errorMessage) {
        if (res.status == 409) errorMessage = errorMessage.replace('{time}', extractTimeFromText(res?.data?.message) ?? 'بعدا');
        if (res.status == 403) errorMessage = errorMessage.replace('{time}', extractTimeFromText(res?.data?.message) ?? 'بعدا');

        Toast.fire({ icon: 'error', title: errorMessage });
        return;
      }

      if (res.status === 200 || res.status === 201) {
        Toast.fire({ icon: 'success', title: 'کد اعتبار سنجی با موفقیت ارسال شد' });
        setMobile(values.mobile);
        handleShowOpt();
      }
    } catch (error) {
      setErrors({ mobile: 'خطا در ارسال کد تأیید. لطفاً دوباره تلاش کنید.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={{ mobile }} validationSchema={phoneValidationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className="mb-4 space-y-4">
          <div className="relative block rounded-lg border shadow-base">
            <Field
              type="text"
              id="mobile"
              name="mobile"
              dir="auto"
              className={`peer w-full rounded-lg border-none bg-transparent p-4 text-left placeholder-transparent focus:outline-none focus:ring-0`}
              placeholder="شماره موبایل"
              autoFocus
            />
            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/90 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
              شماره موبایل
            </span>
          </div>
          <ErrorMessage name="mobile" component="p" className="h-5 text-sm text-red-500 dark:text-red-400 mt-2" />
          <div className="mb-5">
            <PrimaryButton type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
              ورود
            </PrimaryButton>
          </div>
          <p className="text-center text-sm text-text/90">
            با ورود به فروشگاه،
            <Link href="/info/terms-of-service" className="text-primary">
              {' '}
              کلیه قوانین
            </Link>{' '}
            را می‌پذیرم
          </p>
        </Form>
      )}
    </Formik>
  );
}

export default PhoneInputForm;
