import { z } from 'zod';

export const validationCommentSchema = z.object({
  title: z.string().trim().min(1, 'عنوان الزامی است'),
  content: z.string().trim().min(1, 'متن دیدگاه الزامی است'),
  isRecommended: z.boolean().optional(),
});

export type CommentFormValues = z.infer<typeof validationCommentSchema>;
