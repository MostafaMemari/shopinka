import { z } from 'zod';

export const phoneValidationSchema = z.object({
  mobile: z
    .string()
    .nonempty('شماره موبایل الزامی است')
    .refine((val) => validateIranPhoneNumber(val), {
      message: 'شماره موبایل معتبر نیست',
    }),
});

export type PhoneForm = z.infer<typeof phoneValidationSchema>;

export const validateIranPhoneNumber = (phone: string) => {
  const phoneRegex = /^(?:09|\+989|9)\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};
