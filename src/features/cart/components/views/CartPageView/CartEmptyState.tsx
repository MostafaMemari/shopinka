import { Card } from '@/components/ui/card';
import EmptyState from '@/features/profile/EmptyState';
import { Link, ShoppingBasket } from 'lucide-react';

export default function CartEmptyState() {
  return (
    <div className="col-span-12">
      <Card className="p-6 min-h-[300px] flex flex-col items-center gap-4">
        <EmptyState
          icon={<ShoppingBasket className="w-12 h-12 text-gray-400" />}
          message="سبد خرید شما خالی است!"
          description="محصولات مورد علاقه‌تون رو اضافه کنید."
        />
        <Link href="/shop" className="btn-primary">
          مشاهده محصولات
        </Link>
      </Card>
    </div>
  );
}
