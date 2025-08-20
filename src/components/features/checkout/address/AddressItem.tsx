import React from 'react';
import { type AddressItem as AddressItemType } from '@/types/addressType';
import { useAddress } from '@/hooks/address/useAddress';
import { Card, CardContent, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui';
import { EllipsisVertical, MapPin, Square, SquareCheckBig } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddressItemProps {
  item: AddressItemType;
}

const AddressItem: React.FC<AddressItemProps> = ({ item }) => {
  const { deleteAddress, setDefaultAddress, isSetDefaultAddressLoading } = useAddress({});

  const handleDeleteAddress = () => {
    deleteAddress(item.id);
  };

  const handleSetDefaultAddress = () => {
    setDefaultAddress(item.id);
  };

  return (
    <Card
      onClick={handleSetDefaultAddress}
      className={cn(
        isSetDefaultAddressLoading && 'opacity-50 cursor-not-allowed',
        'cursor-pointer transition-all p-4',
        {
          'border-primary bg-primary/10 shadow-md': item.isDefault,
          'border-border bg-card hover:border-muted-foreground/50': !item.isDefault,
        },
        'dark:bg-gray-800 dark:border-gray-700',
      )}
      tabIndex={0}
      role="button"
    >
      <CardContent className="flex justify-between p-0 gap-2">
        {item.isDefault ? <SquareCheckBig size={20} /> : <Square size={20} />}

        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base text-foreground dark:text-white">
              {item.province}
              {item.city && `، ${item.city}`}
              {item.streetAndAlley && ` - ${item.streetAndAlley}`}
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground dark:text-gray-300">
            {item.plate && <span>پلاک: {item.plate}</span>}
            {item.unit && <span>واحد: {item.unit}</span>}
            {item.postalCode && <span>کد پستی: {item.postalCode}</span>}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground dark:text-gray-400">
            <span>گیرنده:</span>
            <span className="font-medium">{item.fullName}</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical size={20} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>ویرایش</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeleteAddress}>حذف</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default AddressItem;
