import React from 'react';
import { type AddressItem } from '@/features/address/AddressType';
import { useAddress } from '@/features/address/addressHooks';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Circle, CircleCheckBig } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UpdateAddressDialogDrawer } from './UpdateAddressDialogDrawer';
import { useBoolean } from '@/hooks/use-boolean';
import RemoveAddressConfirm from './RemoveAddressConfirm';

interface AddressCardProps {
  item: AddressItem;
}

const AddressCard: React.FC<AddressCardProps> = ({ item }) => {
  const { setDefaultAddress, isSetDefaultAddressLoading } = useAddress({});
  const updateAddressDialog = useBoolean(false);
  const deleteAddressDialog = useBoolean(false);

  const isDefault = item.isDefault;
  const isDisabled = isDefault || isSetDefaultAddressLoading;

  const handleSetDefaultAddress = () => {
    if (isDisabled) return;
    setDefaultAddress(item.id);
  };

  return (
    <>
      <Card
        onClick={handleSetDefaultAddress}
        className={cn(
          'border p-4 transition-all cursor-pointer',
          isDefault ? 'border-primary bg-primary/10 shadow-md' : 'border-border bg-card hover:border-muted-foreground/50',
          'dark:bg-gray-800 dark:border-gray-700',
        )}
        tabIndex={0}
        role="button"
      >
        <CardHeader className={cn('px-0', isDefault && 'text-primary font-bold')}>
          <div className="flex items-center gap-2 text-xs">
            {isDefault ? <CircleCheckBig size={18} /> : <Circle size={18} />}
            <span>{isDefault ? 'انتخاب شده' : 'انتخاب این آدرس'}</span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-0">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-base text-foreground dark:text-white">
              {item.province}، {item.city}
            </span>
            <div className="flex flex-col gap-1 text-sm text-gray-900 dark:text-white">
              <span className="truncate" title={item.postalAddress}>
                {item.postalAddress}
              </span>
              {(item.buildingNumber || item.unit) && (
                <div className="flex gap-2">
                  {item.buildingNumber && <span>پلاک {item.buildingNumber}</span>}
                  {item.unit && <span>واحد {item.unit}</span>}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground dark:text-gray-400">
              <span>گیرنده:</span>
              <span className="font-medium">{item.fullName}</span>
            </div>
            {item.postalCode && <span className="text-xs text-muted-foreground dark:text-gray-300">کد پستی: {item.postalCode}</span>}
          </div>
          <div className="flex justify-end gap-2 text-xs">
            <button
              type="button"
              className="font-semibold text-muted-foreground hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                updateAddressDialog.onToggle();
              }}
            >
              ویرایش
            </button>
            <span>|</span>
            <button
              type="button"
              className="font-semibold text-muted-foreground hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                deleteAddressDialog.onToggle();
              }}
            >
              حذف
            </button>
          </div>
        </CardContent>
      </Card>

      <UpdateAddressDialogDrawer open={updateAddressDialog.value} onOpenChange={updateAddressDialog.onToggle} item={item} />
      <RemoveAddressConfirm key={item.id} addressId={item.id} control={deleteAddressDialog} />
    </>
  );
};

export default AddressCard;
