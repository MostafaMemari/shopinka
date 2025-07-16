'use server';

import { ContactFormType, ContactItem } from '@/types/contactType';
import { cleanObject } from '@/utils/cleanObject';
import { shopApiFetch } from './api';

export const createContact = async (data: ContactFormType): Promise<{ message: string; contact: ContactItem }> => {
  const res = await shopApiFetch('/contact', {
    method: 'POST',
    body: cleanObject(data),
  });

  if (res.status >= 400 || !res.data?.contact) throw new Error(res.data?.message);

  return res.data;
};
