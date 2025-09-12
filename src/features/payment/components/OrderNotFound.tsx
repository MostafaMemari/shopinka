import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

const OrderNotFound = () => (
  <div className="col-span-12 flex min-h-[320px] items-center justify-center">
    <Card className="flex flex-col items-center gap-6 p-8">
      <AlertCircle className="h-16 w-16 text-destructive animate-pulse" />
      <h1 className="text-center text-xl font-bold tracking-tight text-destructive md:text-2xl">سفارش یافت نشد</h1>
      <p className="max-w-md text-center text-sm text-muted-foreground md:text-base">
        متأسفانه سفارش مورد نظر یافت نشد. لطفاً دوباره تلاش کنید یا با پشتیبانی تماس بگیرید
      </p>
      <Button asChild variant="secondary" className="w-full py-3">
        <Link href="/">بازگشت به خانه</Link>
      </Button>
    </Card>
  </div>
);

export default OrderNotFound;
