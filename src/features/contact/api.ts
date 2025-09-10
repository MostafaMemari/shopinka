'use server';

import { ContactItem } from '@/types/contactType';
import { cleanObject } from '@/utils/cleanObject';
import { shopApiFetch } from '../../service/api';
import { ContactForm } from '@/validation/validationContactSchema';

export const createContact = async (data: ContactForm): Promise<{ message: string; contact: ContactItem }> => {
  return await shopApiFetch('/contact', {
    method: 'POST',
    body: cleanObject(data),
  });
};
