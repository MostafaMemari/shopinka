'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { FormTextarea } from '@/components/form/FormField';
import { Form } from '@/components/ui/form';
import { CancelOrderFormValues } from './CancelOrderType';
import { validationCancelOrderSchema } from '@/validation/CanceclOrderSchema';
import { useCancelOrder } from './cancelOrderHooks';

interface props {
  orderId: number;
  className?: string;
  onSuccess?: () => void;
  ref?: React.Ref<HTMLFormElement>;
  onLoadingChange?: (isLoading: boolean) => void;
}

export default function OrderCancellForm({ orderId, className = '', onSuccess, ref, onLoadingChange }: props) {
  const { cancelOrder, isCancelLoading } = useCancelOrder();
  const isLoadingSubmit = isCancelLoading;

  const defaultValues: CancelOrderFormValues = {
    reason: '',
  };

  const form = useForm<CancelOrderFormValues>({
    resolver: zodResolver(validationCancelOrderSchema),
    defaultValues,
    mode: 'onBlur',
  });

  useEffect(() => {
    onLoadingChange?.(isLoadingSubmit);
  }, [isLoadingSubmit, onLoadingChange]);

  const onSubmit: SubmitHandler<any> = (values: CancelOrderFormValues) => {
    cancelOrder(orderId, values.reason, () => {
      form.reset();
      onSuccess?.();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} ref={ref} className={cn('space-y-2.5 text-right', className)} dir="rtl">
        <FormTextarea control={form.control} name="reason" label="دلیل لغو سفارش" />
      </form>
    </Form>
  );
}
