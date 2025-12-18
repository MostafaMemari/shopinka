import { z } from 'zod';

const numberStringWithRange = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .nonempty({ message: `${label} الزامی است` })
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num >= min && num <= max;
      },
      {
        message: `${label} باید بین ${min} تا ${max} سانتی‌متر باشد`,
      },
    );

export const stickerLineSchema = z.object({
  text: z.string().min(1, 'متن الزامی است'),
  width: numberStringWithRange('عرض', 10, 60),
  height: numberStringWithRange('طول', 3, 20),
});

export type StickerLineFormValues = z.infer<typeof stickerLineSchema>;
