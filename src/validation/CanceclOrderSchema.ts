import { z } from 'zod';

export const validationCancelOrderSchema = z.object({
  reason: z.string().trim().min(1, 'دلیل لغو الزامی است'),
});
