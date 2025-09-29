'use client';

import PrimaryButton from '@/components/common/PrimaryButton';
import { useRetryPayment } from '@/features/payment/hooks/useRetryPayment';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

interface RetryPaymentButtonProps {
  orderId: number;
  className?: ReactNode;
}

function RetryPaymentButton({ orderId, className }: RetryPaymentButtonProps) {
  const { retryPayment, isCreatePaymentLoading } = useRetryPayment();

  const handleRetryPayment = () => {
    retryPayment(orderId);
  };

  return (
    <PrimaryButton
      type="submit"
      className={cn('w-full', className)}
      onClick={handleRetryPayment}
      disabled={isCreatePaymentLoading}
      isLoading={isCreatePaymentLoading}
    >
      پرداخت مجدد
    </PrimaryButton>
  );
}

export default RetryPaymentButton;
