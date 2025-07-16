import { useFormik } from 'formik';
import { validationContactSchema } from '@/validation/validationContactSchema';
import { useContact } from '@/hooks/contact/useContact';

export const useContactForm = () => {
  const { createContact, isCreateContactLoading } = useContact();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      phone: '',
      email: '',
      message: '',
    },
    validationSchema: validationContactSchema,
    onSubmit: async (values, { resetForm }) => {
      createContact(
        values,
        () => {
          resetForm();
        },
        (error) => {
          console.error('خطا در ارسال پیام:', error);
        },
      );
    },
  });

  return {
    formik,
    isCreateContactLoading,
  };
};
