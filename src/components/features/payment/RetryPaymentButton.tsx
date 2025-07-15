'use client';

import PrimaryButton from '@/components/ui/PrimaryButton';
import { useRetryPayment } from '@/hooks/reactQuery/payment/useRetryPayment';
import React from 'react';

function RetryPaymentButton({ orderId }: { orderId: number }) {
  const { retryPayment, isCreatePaymentLoading } = useRetryPayment();

  const handleRetryPayment = () => {
    retryPayment(orderId);
  };

  return (
    <>
      <PrimaryButton type="submit" onClick={handleRetryPayment} isLoading={isCreatePaymentLoading}>
        پرداخت مجدد
      </PrimaryButton>
    </>
  );
}

export default RetryPaymentButton;
