import { CheckCircle, XCircle } from 'lucide-react';

interface PaymentStatusProps {
  isSuccess: boolean;
  orderId: string;
}

const PaymentStatus = ({ isSuccess, orderId }: PaymentStatusProps) => (
  <div className="flex flex-col items-center gap-4">
    {isSuccess ? <CheckCircle className="h-20 w-20 text-success" /> : <XCircle className="h-20 w-20 text-destructive" />}
    <h1 className={`text-center text-lg font-bold md:text-xl ${isSuccess ? 'text-success' : 'text-destructive'}`}>
      پرداخت سفارش {orderId} {isSuccess ? 'موفق' : 'ناموفق'} بود
    </h1>
    <p className="max-w-md text-center text-sm text-muted-foreground md:text-base">
      {isSuccess ? 'پرداخت با موفقیت انجام شد. سفارش شما در حال پردازش است.' : 'پرداخت ناموفق بود. لطفاً دوباره تلاش کنید.'}
    </p>
  </div>
);

export default PaymentStatus;
