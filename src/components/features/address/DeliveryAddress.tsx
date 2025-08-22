import { Card, CardContent } from '@/components/ui';
import { AddressItem } from '@/types/addressType';
import { MapPinHouse } from 'lucide-react';

interface DeliveryAddressProps {
  address: AddressItem | null | undefined;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ address }) => {
  const fullAddress = [
    `استان ${address?.province}`,
    `شهر ${address?.city}`,
    address?.postalAddress,
    address?.buildingNumber ? `پلاک ${address?.buildingNumber}` : null,
    address?.unit ? `واحد ${address?.unit}` : null,
  ]
    .filter(Boolean)
    .join('، ');

  return (
    <div className="mb-8">
      <h2 className="my-6 flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
        <MapPinHouse size={24} />
        آدرس تحویل سفارش
      </h2>

      <Card>
        <CardContent className="flex flex-col gap-2">
          {address ? (
            <>
              <p className="text-sm md:text-base text-gray-800 dark:text-gray-200">{fullAddress}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">تحویل‌گیرنده: {address?.fullName || '—'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">کدپستی: {address?.postalCode || '—'}</p>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400">آدرس تحویل مشخص نشده است</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryAddress;
