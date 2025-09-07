import React from 'react';
import { type AddressItem } from '@/types/addressType';
import { useAddress } from '@/hooks/address/useAddress';
import { Card, CardContent, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui';
import { EllipsisVertical, Pencil, Square, SquareCheckBig, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UpdateAddressDialogDrawer } from './UpdateAddressDialogDrawer';
import { useBoolean } from '@/hooks/use-boolean';
import ConfirmDialog from '../cart/ConfirmDialog';
import { formatFullAddress } from '@/utils/address';

interface AddressCardProps {
  item: AddressItem;
}

const AddressCard: React.FC<AddressCardProps> = ({ item }) => {
  const { setDefaultAddress, deleteAddress, isDeleteAddressLoading, isSetDefaultAddressLoading } = useAddress({});
  const updateAddressDialog = useBoolean(false);
  const deleteAddressDialog = useBoolean(false);

  const handleSetDefaultAddress = () => {
    if (item.isDefault || isSetDefaultAddressLoading) return;
    setDefaultAddress(item.id);
  };

  const fullAddress = formatFullAddress(item);

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
                  updateAddressDialog.onToggle();
                }}
              >
                <Pencil className="w-4 h-4 ml-2" /> ویرایش
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteAddressDialog.onToggle();
                }}
              >
                <Trash className="w-4 h-4 ml-2" /> حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      <UpdateAddressDialogDrawer open={updateAddressDialog.value} onOpenChange={updateAddressDialog.onToggle} item={item} />

      <ConfirmDialog
        open={deleteAddressDialog.value}
        isLoadingConfirm={isDeleteAddressLoading}
        onOpenChange={deleteAddressDialog.onToggle}
        title="حذف آدرس"
        text="آیا مطمئن هستید که می‌خواهید این آدرس را حذف کنید؟"
        onConfirm={() => deleteAddress(item.id)}
      />
    </>
  );
};

export default AddressCard;
