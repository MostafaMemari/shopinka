import { z } from 'zod';

export const validationOtpSchema = z.object({
  otp: z
    .string()
    .regex(/^\d{6}$/, 'کد یک‌بارمصرف باید دقیقاً ۶ رقم عددی باشد')
    .nonempty('کد یک‌بارمصرف الزامی است'),
});

export type OtpForm = z.infer<typeof validationOtpSchema>;
