'use client';

import PrimaryButton from '@/components/common/PrimaryButton';
import { useRetryPayment } from '@/hooks/reactQuery/payment/useRetryPayment';
import React from 'react';

function RetryPaymentButton({ orderId }: { orderId: number }) {
  const { retryPayment, isCreatePaymentLoading } = useRetryPayment();

  const handleRetryPayment = () => {
    retryPayment(orderId);
  };

  return (
    <PrimaryButton type="submit" onClick={handleRetryPayment} disabled={isCreatePaymentLoading} isLoading={isCreatePaymentLoading}>
      پرداخت مجدد
    </PrimaryButton>
  );
}

export default RetryPaymentButton;
