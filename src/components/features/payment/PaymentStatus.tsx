import { BiCheckCircle, BiXCircle } from 'react-icons/bi';

const PaymentStatus = ({ isSuccess, orderId }: { isSuccess: boolean; orderId: string }) => (
  <div className="flex flex-col items-center gap-3">
    {isSuccess ? <BiCheckCircle className="h-20 w-20 text-success" /> : <BiXCircle className="h-20 w-20 text-destructive" />}
    <h1 className={`text-center font-bold text-lg md:text-xl ${isSuccess ? 'text-success' : 'text-destructive'}`}>
      پرداخت سفارش {orderId} {isSuccess ? 'موفق' : 'ناموفق'} بود
    </h1>
    <p className="text-center text-muted-foreground">
      {isSuccess ? 'پرداخت با موفقیت انجام شد. سفارش شما در حال پردازش است.' : 'پرداخت ناموفق بود. لطفاً دوباره تلاش کنید.'}
    </p>
  </div>
);

export default PaymentStatus;
