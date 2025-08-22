import * as Yup from 'yup';

export const validationAddressSchema = Yup.object({
  fullName: Yup.string().trim().required('نام و نام خانوادگی وارد کنید'),
  province: Yup.string().required('استان وارد کنید'),
  city: Yup.string().required('شهر وارد کنید'),
  postalAddress: Yup.string().required('آدرس پستی وارد کنید'),

  buildingNumber: Yup.number()
    .transform((value, originalValue) => (String(originalValue).trim() === '' ? undefined : Number(originalValue)))
    .typeError('پلاک باید عدد باشد')
    .integer('پلاک باید عدد صحیح باشد')
    .positive('پلاک باید عدد مثبت باشد')
    .required('پلاک وارد کنید'),

  unit: Yup.number()
    .transform((value, originalValue) => (String(originalValue).trim() === '' ? undefined : Number(originalValue)))
    .typeError('واحد باید عدد باشد')
    .integer('واحد باید عدد صحیح باشد')
    .positive('واحد باید عدد مثبت باشد')
    .optional(),

  postalCode: Yup.string()
    .matches(/^\d{10}$/, 'کدپستی باید ۱۰ رقمی باشد')
    .required('کدپستی وارد کنید'),
});
