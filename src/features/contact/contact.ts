'use server';

import { ContactItem } from '@/types/contactType';
import { cleanObject } from '@/utils/cleanObject';
import { shopApiFetch } from '../../service/api';
import { ContactForm } from '@/validation/validationContactSchema';
import { unwrap } from '@/utils/api-helpers';

export const createContact = async (data: ContactForm): Promise<{ message: string; contact: ContactItem }> => {
  const res = await shopApiFetch('/contact', {
    method: 'POST',
    body: cleanObject(data),
  });

  return unwrap(res);
};
