'use client';

import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentFormValues, validationCommentSchema } from '@/validation/validationCommentSchema';
import SuggestionRadio from './SuggestionRadio';
import { cn } from '@/lib/utils';
import { FormInput, FormTextarea } from '@/components/form/FormField';
import { Form } from '@/components/ui/form';

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
    resolver: zodResolver(validationCommentSchema),
    defaultValues: {
      title: '',
      content: '',
      isRecommended: true,
    },
    mode: 'onBlur',
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit: SubmitHandler<any> = async (values: CommentFormValues) => {
    createComment({ productId, parentId, ...values }, () => {
      reset();
      onSuccess?.();
    });
  };

  return (
    <Form {...form}>
      <form ref={ref} onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4 text-right', className)} dir="rtl">
        <div className="grid grid-cols-1 gap-4">
          <FormInput control={form.control} name="title" label="عنوان دیدگاه" />
        </div>

        <div className="col-span-2">
          <div className="mb-2 text-sm text-text/60">این محصول را به دیگران پیشنهاد</div>
          <Controller
            name="isRecommended"
            control={control}
            render={({ field }) => <SuggestionRadio selected={field.value} onChange={(val) => field.onChange(val)} />}
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <FormTextarea control={form.control} name="content" label="متن دیدگاه" />
        </div>
      </form>
    </Form>
  );
};

CommentForm.displayName = 'CommentForm';
export default CommentForm;
