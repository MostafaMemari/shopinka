import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';
import { createContact } from '@/features/contact/api';
import { ContactFormType, ContactItem } from '@/types/contactType';

export function useContact() {
  const createMutation = useMutation({
    mutationFn: createContact,
  });

  return {
    createContact: (data: ContactFormType, onSuccess?: (created: ContactItem) => void, onError?: (error: any) => void) => {
      createMutation.mutate(data, {
        onSuccess: (response) => {
          toast.success('پیام شما با موفقیت ثبت شد');
          onSuccess?.(response.contact);
        },
        onError: (error) => {
          toast.error('خطا در ارسال پیام');
          onError?.(error);
        },
      });
    },

    isCreateContactLoading: createMutation.isPending,
  };
}
