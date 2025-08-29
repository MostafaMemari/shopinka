'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { forwardRef, useEffect, useRef } from 'react';
import TextInput from '@/components/common/TextInput';
import SuggestionRadio from './SuggestionRadio';
import { validationCommentSchema } from '@/validation/validationCommentSchema';
import { CommentItem } from '@/types/commentType';
import { useCreateComment } from '@/hooks/reactQuery/comment/useCreateComment';
import PrimaryButton from '@/components/common/PrimaryButton';
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
}

function CommentForm({ productId, className = '', parentId, onSuccess }: CommentFormProps) {
  const { createComment, isCreateCommentLoading } = useCreateComment();

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
    <form onSubmit={formik.handleSubmit} className={cn('space-y-1 text-right', className)} dir="rtl">
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

      <PrimaryButton isLoading={isCreateCommentLoading} className="w-full mt-6" type="submit">
        {parentId ? 'پاسخ به دیدگاه' : 'ثبت دیدگاه'}
      </PrimaryButton>
    </form>
  );
}

CommentForm.displayName = 'CommentForm';

export default CommentForm;
