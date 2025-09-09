'use client';

import { useFormik } from 'formik';
import TextInput from '@/components/form/TextInput';
import SuggestionRadio from './SuggestionRadio';
import { validationCommentSchema } from '@/validation/validationCommentSchema';
import { cn } from '@/lib/utils';

export interface CommentFormikType {
  title: string;
  content: string;
  isRecommended?: boolean;
}

interface CommentFormProps {
  productId: number;
  parentId?: number;
  className?: string;
  onSuccess?: () => void;
  createComment?: any;
  ref?: React.Ref<HTMLFormElement>;
}

function CommentForm({ productId, className = '', parentId, onSuccess, createComment, ref }: CommentFormProps) {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      isRecommended: true,
    },
    validationSchema: validationCommentSchema,
    onSubmit: async (values) => {
      createComment({ productId, parentId, ...values }, () => {
        formik.resetForm();
        onSuccess?.();
      });
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} ref={ref} className={cn('space-y-1 text-right', className)} dir="rtl">
      <div className="grid grid-cols-2 gap-4">
        <TextInput id="title" name="title" isRequired label="عنوان دیدگاه" formik={formik} className="col-span-2 mb-1" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <div className="mb-4 text-sm text-text/60">این محصول را به دیگران پیشنهاد</div>
          <SuggestionRadio
            name="isRecommended"
            selected={formik.values.isRecommended}
            onChange={(value) => formik.setFieldValue('isRecommended', value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <TextInput
            id="content"
            name="content"
            type="textarea"
            label="متن دیدگاه"
            isRequired
            rows={3}
            formik={formik}
            className="col-span-2"
          />
        </div>
      </div>
    </form>
  );
}

CommentForm.displayName = 'CommentForm';

export default CommentForm;
