import React from 'react';
import { Button, Card, CardContent, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui';
import { EllipsisVertical, Pencil, Trash } from 'lucide-react';
import { useBoolean } from '@/hooks/use-boolean';
import { RemoveDialog } from './RemoveDialog';

type AddressItemProps = {
  item: any;
};

const AddressItem: React.FC<AddressItemProps> = ({ item }) => {
  const updateDrawerDialogControl = useBoolean(false);
  const removeDialogControl = useBoolean(false);

  return (
    <>
      <Card
        className={`
        relative rounded-xl p-5 border transition-shadow
        ${true ? 'bg-primary/5 border-primary shadow-lg' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:shadow-md'}
      `}
      >
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="absolute top-2 left-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVertical className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={updateDrawerDialogControl.onToggle}>
                  <Pencil className="w-4 h-4 ml-2" /> ویرایش
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600" onClick={removeDialogControl.onToggle}>
                  <Trash className="w-4 h-4 ml-2" /> حذف
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="font-medium">
            {item.province}
            {item.city && `، ${item.city}`}
            {item.streetAndAlley && ` - ${item.streetAndAlley}`}
          </p>
          <div className="text-sm text-gray-600">
            <p>{item.plate}</p>
            <p>کد پستی: {item.postalCode}</p>
            <p>گزیننده: {item.fullName}</p>
          </div>
        </CardContent>
      </Card>

      {/* <UpdateAddressDialogDrawer open={updateDrawerDialogControl.value} onOpenChange={updateDrawerDialogControl.onToggle} item={item} /> */}
      <RemoveDialog open={removeDialogControl.value} onOpenChange={removeDialogControl.onToggle} addressId={item.id} />
    </>
  );
};

export default AddressItem;
