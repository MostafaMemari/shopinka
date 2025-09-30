import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';
import { createContact } from '@/features/contact/contact';
import { ContactItem } from '@/types/contactType';
import { ContactForm } from '@/validation/validationContactSchema';

export function useContact() {
  const createMutation = useMutation({
    mutationFn: createContact,
  });

  return {
    createContact: (data: ContactForm, onSuccess?: (created: ContactItem) => void) => {
      createMutation.mutate(data, {
        onSuccess: (response) => {
          if (response.success) {
            toast.success('پیام شما با موفقیت ثبت شد');
            onSuccess?.(response.data.contact);
          } else {
            toast.error('خطا در ارسال پیام');
          }
        },
      });
    },

    isCreateContactLoading: createMutation.isPending,
  };
}
