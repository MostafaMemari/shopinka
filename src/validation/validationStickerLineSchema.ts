import { z } from 'zod';

const positiveNumberString = (label: string) =>
  z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: `${label} باید عدد مثبت باشد`,
      },
    );

export const stickerLineSchema = z.object({
  text: z.string().min(1, 'متن الزامی است'),

  width: positiveNumberString('عرض'),
  height: positiveNumberString('طول'),
});

export type StickerLineFormValues = z.infer<typeof stickerLineSchema>;
