'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { validationCommentSchema } from '@/validation/validationCommentSchema';
import SuggestionRadio from './SuggestionRadio';
import { cn } from '@/lib/utils';

export interface CommentFormValues {
  title: string;
  content: string;
  isRecommended: boolean;
}

interface CommentFormProps {
  productId: number;
  parentId?: number;
  className?: string;
  onSuccess?: () => void;
  createComment?: any;
  ref?: React.Ref<HTMLFormElement>;
}

const CommentForm = ({ productId, className = '', parentId, onSuccess, createComment, ref }: CommentFormProps) => {
  const form = useForm<CommentFormValues>({
    // @ts-ignore
    resolver: zodResolver(validationCommentSchema),
    defaultValues: {
      title: '',
      content: '',
      isRecommended: true,
    },
    mode: 'onBlur',
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<any> = async (values: CommentFormValues) => {
    createComment({ productId, parentId, ...values }, () => {
      reset();
      onSuccess?.();
    });
  };

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4 text-right', className)} dir="rtl">
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <div className="col-span-2">
              <Input {...field} placeholder="عنوان دیدگاه" />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>
          )}
        />
      </div>

      <div className="col-span-2">
        <div className="mb-2 text-sm text-text/60">این محصول را به دیگران پیشنهاد</div>
        <Controller
          name="isRecommended"
          control={control}
          render={({ field }) => <SuggestionRadio selected={field.value} onChange={(val) => field.onChange(val)} />}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <div className="col-span-2">
              <Textarea {...field} placeholder="متن دیدگاه" rows={3} />
              {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content.message}</p>}
            </div>
          )}
        />
      </div>

      <div>
        <Button type="submit">ثبت دیدگاه</Button>
      </div>
    </form>
  );
};

CommentForm.displayName = 'CommentForm';
export default CommentForm;
