import { z } from 'zod';

export const validationAddressSchema = z.object({
  fullName: z.string().trim().min(1, 'نام و نام خانوادگی الزامی است'),
  province: z.string().trim().min(1, 'استان الزامی است'),
  city: z.string().trim().min(1, 'شهر الزامی است'),
  postalAddress: z.string().trim().min(1, 'آدرس پستی الزامی است'),
  buildingNumber: z
    .string()
    .trim()
    .refine((val) => /^\d+$/.test(val) && Number(val) > 0, {
      message: 'پلاک باید عدد صحیح مثبت باشد',
    }),
  unit: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || (/^\d+$/.test(val) && Number(val) > 0), {
      message: 'واحد باید عدد صحیح مثبت باشد',
    }),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{10}$/, 'کدپستی باید دقیقا ۱۰ رقم باشد'),
});
