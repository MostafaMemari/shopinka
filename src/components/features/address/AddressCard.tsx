import React from 'react';
import { type AddressItem } from '@/types/addressType';
import { useAddress } from '@/hooks/address/useAddress';
import { Card, CardContent, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui';
import { EllipsisVertical, Pencil, Square, SquareCheckBig, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UpdateAddressDialogDrawer } from './UpdateAddressDialogDrawer';
import { RemoveDialog } from './RemoveDialog';
import { useBoolean } from '@/hooks/use-boolean';

interface AddressCardProps {
  item: AddressItem;
}

const AddressCard: React.FC<AddressCardProps> = ({ item }) => {
  const { setDefaultAddress, isSetDefaultAddressLoading } = useAddress({});
  const updateDrawerDialogControl = useBoolean(false);
  const removeDialogControl = useBoolean(false);

  const handleSetDefaultAddress = () => {
    if (item.isDefault || isSetDefaultAddressLoading) return;
    setDefaultAddress(item.id);
  };

  const fullAddress = [
    `استان ${item.province}`,
    `شهر ${item.city}`,
    item.postalAddress,
    item.buildingNumber ? `پلاک ${item.buildingNumber}` : null,
    item.unit ? `واحد ${item.unit}` : null,
  ]
    .filter(Boolean)
    .join('، ');

  return (
    <>
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
              <span className="font-semibold text-base text-foreground dark:text-white">{fullAddress || 'آدرس نامشخص'}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground dark:text-gray-400">
              <span>گیرنده:</span>
              <span className="font-medium">{item.fullName}</span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground dark:text-gray-300">
              {item.postalCode && <span>کد پستی: {item.postalCode}</span>}
            </div>
          </div>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical size={20} onClick={(e) => e.stopPropagation()} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  updateDrawerDialogControl.onToggle();
                }}
              >
                <Pencil className="w-4 h-4 ml-2" /> ویرایش
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  removeDialogControl.onToggle();
                }}
              >
                <Trash className="w-4 h-4 ml-2" /> حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      <UpdateAddressDialogDrawer open={updateDrawerDialogControl.value} onOpenChange={updateDrawerDialogControl.onToggle} item={item} />
      <RemoveDialog open={removeDialogControl.value} onOpenChange={removeDialogControl.onToggle} addressId={item.id} />
    </>
  );
};

export default AddressCard;
