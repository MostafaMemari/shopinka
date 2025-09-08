import Link from 'next/link';
import { PiWarningCircleDuotone } from 'react-icons/pi';

const OrderNotFound = () => (
  <div className="col-span-12">
    <div className="rounded-lg bg-muted p-8 min-h-[320px] flex items-center justify-center shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <PiWarningCircleDuotone className="h-16 w-16 text-destructive animate-pulse" />
        <h1 className="text-center text-xl md:text-2xl font-bold text-destructive tracking-tight">سفارش یافت نشد</h1>
        <p className="text-center text-sm md:text-base text-muted-foreground max-w-md">
          متأسفانه سفارش مورد نظر یافت نشد. لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.
        </p>
        <Link href="/" className="btn-secondary w-full py-3 text-center">
          بازگشت به خانه
        </Link>
      </div>
    </div>
  </div>
);

export default OrderNotFound;
