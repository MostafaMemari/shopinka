import React from 'react';
import { PiWarningCircleDuotone } from 'react-icons/pi';

const PaymentWarnings = ({ expiresInMinutes }: { expiresInMinutes: number }) => (
  <div className="w-full flex flex-col gap-y-3">
    <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-md px-3 py-2">
      <PiWarningCircleDuotone className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
      <span className="text-xs md:text-sm text-yellow-700 dark:text-yellow-100">
        سفارش شما تا <b className="text-destructive">{expiresInMinutes}</b> دقیقه دیگر حذف خواهد شد. برای تکمیل سفارش، پرداخت را انجام دهید.
      </span>
    </div>
    <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-700/50 rounded-md px-3 py-2">
      <PiWarningCircleDuotone className="h-6 w-6 text-gray-400" />
      <span className="text-xs md:text-sm text-muted-foreground">در صورت کسر مبلغ، تا ۲۴ ساعت آینده به حساب شما بازمی‌گردد.</span>
    </div>
  </div>
);

export default PaymentWarnings;
