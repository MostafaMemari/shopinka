import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const OrderFetchError = () => (
  <div className="col-span-12 flex min-h-[320px] items-center justify-center">
    <Card className="flex flex-col items-center gap-6 p-8">
      <AlertTriangle className="h-16 w-16 text-destructive animate-bounce" />
      <h1 className="text-center text-xl font-bold tracking-tight text-destructive md:text-2xl">خطا در دریافت سفارش</h1>
      <p className="max-w-md text-center text-sm text-muted-foreground md:text-base">
        متأسفانه در هنگام دریافت اطلاعات سفارش مشکلی پیش آمد. لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید.
      </p>

      <div className="flex w-full gap-3 mt-3">
        <Button asChild className="w-1/2">
          <Link href="/contact">تماس با پشتیبانی</Link>
        </Button>
        <Button asChild variant="secondary" className="w-1/2">
          <Link href="/">بازگشت به خانه</Link>
        </Button>
      </div>
    </Card>
  </div>
);

export default OrderFetchError;
