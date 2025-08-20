import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAddress } from '@/hooks/address/useAddress';
import { Loader2Icon } from 'lucide-react';

interface RemoveDialogProps {
  addressId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RemoveDialog({ addressId, open, onOpenChange }: RemoveDialogProps) {
  const { deleteAddress, isDeleteAddressLoading } = useAddress({});

  const handleDelete = async () => {
    try {
      deleteAddress(addressId, () => {
        onOpenChange(false);
      });
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>حذف آدرس</DialogTitle>
          <DialogDescription className="text-primary">آیا از حذف این آدرس مطمئن هستید؟ این عمل غیرقابل بازگشت است.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleteAddressLoading}>
              انصراف
            </Button>
          </DialogClose>

          <Button onClick={handleDelete} disabled={isDeleteAddressLoading}>
            {isDeleteAddressLoading ? <Loader2Icon className="animate-spin" /> : 'حذف'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
