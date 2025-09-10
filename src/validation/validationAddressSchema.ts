import { z } from 'zod';

export const validationAddressSchema = z.object({
  fullName: z.string().trim().min(1, 'نام و نام خانوادگی وارد کنید'),
  province: z.string().trim().min(1, 'استان وارد کنید'),
  city: z.string().trim().min(1, 'شهر وارد کنید'),
  postalAddress: z.string().trim().min(1, 'آدرس پستی وارد کنید'),

  buildingNumber: z.coerce
    .number()
    .int('پلاک باید عدد صحیح باشد')
    .positive('پلاک باید عدد مثبت باشد')
    .refine((val) => val > 0, 'پلاک وارد کنید'),

  unit: z.coerce.number().int('واحد باید عدد صحیح باشد').positive('واحد باید عدد مثبت باشد').optional(),

  postalCode: z.string().regex(/^\d{10}$/, 'کدپستی باید ۱۰ رقمی باشد'),
});
