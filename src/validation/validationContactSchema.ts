import { z } from 'zod';

const emailRegex = /^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/;

export const validationContactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, 'نام باید حداقل ۳ کاراکتر باشد')
    .max(100, 'نام نباید بیش از ۱۰۰ کاراکتر باشد')
    .nonempty('نام الزامی است'),

  phone: z
    .string()
    .regex(/^(\+98|0)?9\d{9}$/, 'شماره تماس معتبر نیست')
    .nonempty('شماره تماس الزامی است'),

  email: z.string().trim().regex(emailRegex, 'ایمیل نامعتبر است').optional().or(z.literal('')), // اجازه می‌ده خالی هم باشه

  message: z
    .string()
    .min(5, 'پیام باید حداقل ۵ کاراکتر باشد')
    .max(1000, 'پیام نباید بیشتر از ۱۰۰۰ کاراکتر باشد')
    .nonempty('پیام الزامی است'),
});

export type ContactForm = z.infer<typeof validationContactSchema>;
