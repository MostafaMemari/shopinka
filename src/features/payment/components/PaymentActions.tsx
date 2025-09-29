import React from 'react';
import RetryPaymentButton from './RetryPaymentButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PaymentActions = ({ isSuccess, orderId, orderStatus }: { isSuccess: boolean; orderId: string; orderStatus: string }) => {
  const ButtonGoToHome = (
    <Button asChild className="w-1/2" variant="secondary">
      <Link href="/">بازگشت به خانه</Link>
    </Button>
  );

  return (
    <div className="flex w-full gap-3 mt-3">
      {isSuccess ? (
        <>
          <Button asChild className="w-1/2">
            <Link href="/profile/orders">مشاهده سفارش‌ها</Link>
          </Button>
          {ButtonGoToHome}
        </>
      ) : (
        <>
          {orderStatus === 'PENDING' && <RetryPaymentButton orderId={Number(orderId)} className="w-1/2" />} {ButtonGoToHome}
        </>
      )}
    </div>
  );
};
export default PaymentActions;
