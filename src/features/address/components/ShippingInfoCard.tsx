import { Card, CardContent } from '@/components/ui/card';
import { ShippingInfo } from '@/features/orders/OrderType';
import { ShippingItem } from '@/features/shippings/ShippingType';
import { Package } from 'lucide-react';

interface Props {
  shippingInfo: ShippingInfo | null;
  shippingSnapshot: ShippingItem | null | undefined;
}

const ShippingInfoCard: React.FC<Props> = ({ shippingInfo, shippingSnapshot }) => {
  if (!shippingInfo || !shippingSnapshot) return null;

  return (
    <div className="mb-8">
      <h2 className="my-6 flex items-center gap-3 text-lg font-semibold text-gray-800">
        <Package size={24} />
        اطلاعات ارسال
      </h2>

      <Card className="border hover:shadow-lg transition-shadow duration-300">
        <CardContent className="flex flex-col lg:flex-row justify-between gap-2">
          <p className="text-sm md:text-base text-gray-800">روش ارسال: {shippingSnapshot?.name || '—'}</p>

          <p className="text-sm md:text-base text-gray-800">کد رهگیری: {shippingInfo?.trackingCode || '—'}</p>

          <p className="text-sm md:text-base text-gray-800">
            تاریخ ارسال: {shippingInfo?.sentAt ? new Date(shippingInfo.sentAt).toLocaleDateString('fa-IR') : '—'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingInfoCard;
