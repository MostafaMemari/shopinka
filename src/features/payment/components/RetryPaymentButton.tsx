'use client';

import PrimaryButton from '@/components/common/PrimaryButton';
import { useRetryPayment } from '@/features/payment/hooks/useRetryPayment';
import React from 'react';

function RetryPaymentButton({ orderId }: { orderId: number }) {
  const { retryPayment, isCreatePaymentLoading } = useRetryPayment();

  const handleRetryPayment = () => {
    retryPayment(orderId);
  };

  return (
    <PrimaryButton
      type="submit"
      className="w-full"
      onClick={handleRetryPayment}
      disabled={isCreatePaymentLoading}
      isLoading={isCreatePaymentLoading}
    >
      پرداخت مجدد
    </PrimaryButton>
  );
}

export default RetryPaymentButton;
