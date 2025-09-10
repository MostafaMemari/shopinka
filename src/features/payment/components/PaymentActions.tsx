import React from 'react';
import RetryPaymentButton from './RetryPaymentButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PaymentActions = ({ isSuccess, orderId, orderStatus }: { isSuccess: boolean; orderId: string; orderStatus: string }) => (
  <div className="flex w-full gap-3 mt-3">
    {orderStatus === 'PENDING' && <RetryPaymentButton orderId={Number(orderId)} />}
    {isSuccess ? (
      <>
        <Button asChild className="w-1/2">
          <Link href="/profile/orders">مشاهده سفارش‌ها</Link>
        </Button>
        <Button asChild variant="secondary" className="w-1/2 py-3">
          <Link href="/">بازگشت به خانه</Link>
        </Button>
      </>
    ) : (
      <Button asChild className="w-full">
        <Link href="/">بازگشت به خانه</Link>
      </Button>
    )}
  </div>
);
export default PaymentActions;
