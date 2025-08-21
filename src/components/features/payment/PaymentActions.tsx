import React from 'react';
import RetryPaymentButton from './RetryPaymentButton';
import Link from 'next/link';

const PaymentActions = ({ isSuccess, orderId, orderStatus }: { isSuccess: boolean; orderId: string; orderStatus: string }) => (
  <div className="flex w-full gap-3 mt-3">
    {orderStatus === 'PENDING' && (
      <div>
        <RetryPaymentButton orderId={Number(orderId)} />
      </div>
    )}
    {isSuccess ? (
      <>
        <Link href={`/profile/orders/${orderId}`} className="btn-primary w-full py-3 text-center">
          مشاهده سفارش
        </Link>
        <Link href="/" className="btn-secondary w-full py-3 text-center">
          بازگشت به خانه
        </Link>
      </>
    ) : (
      <Link href="/" className="btn-secondary w-full py-3 text-center">
        بازگشت
      </Link>
    )}
  </div>
);
export default PaymentActions;
