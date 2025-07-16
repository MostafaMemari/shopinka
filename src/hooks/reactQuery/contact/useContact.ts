import { useMutation } from '@tanstack/react-query';

import Toast from '@/utils/swalToast';
import { createContact } from '@/service/contactService';
import { ContactFormType, ContactItem } from '@/types/contactType';

export function useContact() {
  const createMutation = useMutation({
    mutationFn: createContact,
  });

  return {
    createContact: (data: ContactFormType, onSuccess?: (created: ContactItem) => void, onError?: (error: any) => void) => {
      createMutation.mutate(data, {
        onSuccess: (response) => {
          Toast.fire({ icon: 'success', title: 'پیام شما با موفقیت ارسال شد!' });
          onSuccess?.(response.contact);
        },
        onError: (error) => {
          Toast.fire({ icon: 'error', title: error?.message || 'خطا در ارسال پیام' });
          onError?.(error);
        },
      });
    },

    isCreateContactLoading: createMutation.isPending,
  };
}
