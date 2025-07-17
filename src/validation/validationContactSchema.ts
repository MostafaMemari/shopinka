import * as Yup from 'yup';

const emailRegex = /^[\w.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/;

export const validationContactSchema = Yup.object({
  fullName: Yup.string()
    .required('نام الزامی است')
    .min(3, 'نام باید حداقل ۳ کاراکتر باشد')
    .max(100, 'نام نباید بیش از ۱۰۰ کاراکتر باشد')
    .trim(),

  phone: Yup.string()
    .required('شماره تماس الزامی است')
    .matches(/^(\+98|0)?9\d{9}$/, 'شماره تماس معتبر نیست'),

  email: Yup.string().trim().notRequired().matches(emailRegex, {
    message: 'ایمیل نامعتبر است',
    excludeEmptyString: true,
  }),
  message: Yup.string()
    .required('پیام الزامی است')
    .min(5, 'پیام باید حداقل ۵ کاراکتر باشد')
    .max(1000, 'پیام نباید بیشتر از ۱۰۰۰ کاراکتر باشد'),
});
