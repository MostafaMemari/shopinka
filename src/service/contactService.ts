'use server';

import { ContactFormType, ContactItem } from '@/types/contactType';
import { cleanObject } from '@/utils/cleanObject';
import { shopApiFetch } from './api';

export const createContact = async (data: ContactFormType): Promise<{ message: string; contact: ContactItem }> => {
  return await shopApiFetch('/contact', {
    method: 'POST',
    body: cleanObject(data),
  });
};
