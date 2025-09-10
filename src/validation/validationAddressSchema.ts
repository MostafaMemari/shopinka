import { z } from 'zod';

export const validationAddressSchema = z.object({
  fullName: z.string().min(1, 'نام و نام خانوادگی وارد کنید'),
  province: z.string().min(1, 'استان وارد کنید'),
  city: z.string().min(1, 'شهر وارد کنید'),
  postalAddress: z.string().min(1, 'آدرس پستی وارد کنید'),
  buildingNumber: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z.number().int('پلاک باید عدد صحیح باشد').positive('پلاک باید عدد مثبت باشد'),
  ),
  unit: z
    .preprocess(
      (val) => (val === '' || val === null || val === undefined ? null : Number(val)),
      z.number().int('واحد باید عدد صحیح باشد').positive('واحد باید عدد مثبت باشد').nullable(),
    )
    .nullable(),
  postalCode: z.string().regex(/^\d{10}$/, 'کدپستی باید ۱۰ رقمی باشد'),
});
