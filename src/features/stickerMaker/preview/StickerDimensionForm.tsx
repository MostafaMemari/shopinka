'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setLines, setText, Line } from '@/store/slices/stickerSlice';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { StickerLineFormValues, stickerLineSchema } from '@/validation/validationStickerLineSchema';
import { FormInput } from '@/components/form/FormField';

interface Props {
  line: Line;
  onValidityChange: (isValid: boolean) => void;
}

export default function StickerDimensionForm({ line, onValidityChange }: Props) {
  const dispatch = useDispatch();
  const { lines } = useSelector((state: RootState) => state.sticker);

  const form = useForm<StickerLineFormValues>({
    resolver: zodResolver(stickerLineSchema),
    mode: 'onChange',
    defaultValues: {
      text: line.text ?? '',
      width: line.width != null ? String(line.width) : '',
      height: line.height != null ? String(line.height) : '',
    },
  });

  const handleWidthChange = (value: string) => {
    const width = Number(value);
    if (Number.isNaN(width)) return;

    form.setValue('width', value, { shouldValidate: true });

    if (line.ratio) {
      const newHeight = (width / line.ratio).toFixed(1);
      form.setValue('height', newHeight, { shouldValidate: true });
    }
  };

  const handleHeightChange = (value: string) => {
    const height = Number(value);
    if (Number.isNaN(height)) return;

    form.setValue('height', value, { shouldValidate: true });

    if (line.ratio) {
      const newWidth = (height * line.ratio).toFixed(1);
      form.setValue('width', newWidth, { shouldValidate: true });
    }
  };

  const {
    watch,
    formState: { isValid },
  } = form;

  const text = watch('text');
  const width = watch('width');
  const height = watch('height');

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid]);

  useEffect(() => {
    form.reset({
      text: line.text ?? '',
      width: line.width != null ? String(line.width) : '',
      height: line.height != null ? String(line.height) : '',
    });
  }, [line.lineNumber]);

  useEffect(() => {
    if (!isValid) return;

    const toNumber = (v?: string) => (v ? Number(v) : undefined);

    const newLines = lines.map((l) =>
      l.lineNumber === line.lineNumber
        ? {
            ...l,
            text,
            width: toNumber(width),
            height: toNumber(height),
          }
        : l,
    );

    dispatch(setLines(newLines));
  }, [text, width, height, isValid]);

  return (
    <Form {...form}>
      <form className="p-4 space-y-4">
        <FormInput control={form.control} name="text" label="متن" className="text-right" />

        <div className="flex gap-4">
          <FormInput
            control={form.control}
            name="width"
            label="عرض (cm)"
            className="flex-1 text-right"
            onChange={(value) => {
              const width = Number(value);
              if (Number.isNaN(width)) return;

              if (line.ratio) {
                const newHeight = (width / line.ratio).toFixed(1);
                form.setValue('height', newHeight, { shouldValidate: true });
              }
            }}
          />

          <FormInput
            control={form.control}
            name="height"
            label="طول (cm)"
            className="flex-1 text-right"
            onChange={(value) => {
              const height = Number(value);
              if (Number.isNaN(height)) return;

              if (line.ratio) {
                const newWidth = (height * line.ratio).toFixed(1);
                form.setValue('width', newWidth, { shouldValidate: true });
              }
            }}
          />
        </div>
      </form>
    </Form>
  );
}
