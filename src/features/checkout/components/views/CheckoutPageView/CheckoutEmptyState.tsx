import Link from 'next/link';
import EmptyState from '@/features/profile/EmptyState';
import { ShoppingBasket } from 'lucide-react';
import { Card } from '@/components/ui/card';

function CheckoutEmptyState() {
  return (
    <div className="col-span-12">
      <Card className="p-4 min-h-[300px] flex flex-col items-center justify-center gap-4">
        <EmptyState
          icon={<ShoppingBasket className="w-12 h-12 text-gray-400" />}
          message="سبد خرید شما خالی است!"
          description="محصولات مورد علاقه‌تون رو به سبد خرید اضافه کنید."
        />
        <Link href="/shop" className="btn-primary">
          مشاهده محصولات
        </Link>
      </Card>
    </div>
  );
}

export default CheckoutEmptyState;
