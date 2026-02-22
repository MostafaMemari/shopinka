import { validationCancelOrderSchema } from '@/validation/CanceclOrderSchema';
import { z } from 'zod';

export type CancelOrderFormValues = z.infer<typeof validationCancelOrderSchema>;
