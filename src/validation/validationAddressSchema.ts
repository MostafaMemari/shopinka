// validation/validationAddressSchema.ts
import * as Yup from 'yup';

export const validationAddressSchema = Yup.object({
  fullName: Yup.string().trim().required('نام و نام خانوادگی الزامی است'),
  province: Yup.string().required('استان الزامی است'),
  city: Yup.string().required('شهر الزامی است'),
  plate: Yup.string().required('پلاک الزامی است'),
  streetAndAlley: Yup.string().required('خیابان و کوچه الزامی است'),
  unit: Yup.string(), // اختیاری باقی می‌مونه
  postalCode: Yup.string()
    .matches(/^\d{10}$/, 'کدپستی باید ۱۰ رقمی باشد')
    .required('کدپستی الزامی است'),
});
