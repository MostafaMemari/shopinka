import React from 'react';

const PaymentDetails = ({ trackingCode, paymentDate, amount }: { trackingCode: string; paymentDate: string; amount: string }) => (
  <div className="w-full rounded border p-4 bg-muted/70 flex flex-col gap-y-3">
    <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm md:text-base">
      <div className="flex flex-col items-center gap-1">
        <span>شماره پیگیری</span>
        <span className="font-mono tracking-wider">{trackingCode}</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span>تاریخ پرداخت</span>
        <span>{paymentDate}</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span>مبلغ</span>
        <span>{amount}</span>
      </div>
    </div>
  </div>
);

export default PaymentDetails;
