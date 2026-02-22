import { Card, CardContent } from '@/components/ui/card';
import { ShippingItem } from '@/features/shippings/ShippingType';
import { Truck } from 'lucide-react';

interface ShippingMethodCardProps {
  method: ShippingItem | null | undefined;
}

const ShippingMethodCard: React.FC<ShippingMethodCardProps> = ({ method }) => {
  return (
    <div className="mb-8">
      <h2 className="my-6 flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
        <Truck size={24} />
        روش ارسال
      </h2>

      <Card className="border hover:shadow-lg transition-shadow duration-300">
        <CardContent className="flex flex-col gap-2">
          {method ? (
            <>
              <div className="flex items-center gap-2">
                <p className="text-sm md:text-base text-gray-800 dark:text-gray-200">{method.name}</p>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">{method.price === 0 ? 'پس کرایه' : `${method.price} تومان`}</p>

              {method.estimatedDays !== undefined && (
                <p className="text-sm text-gray-600 dark:text-gray-400">زمان تقریبی تحویل: {method.estimatedDays} روز</p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">روش ارسال مشخص نشده است</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingMethodCard;
