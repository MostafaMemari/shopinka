import MobileDrawer from '@/components/common/Drawer';
import { Button } from '@/components/ui/button';
import FinalizePreview from './FinalizePreview';

interface FinalizeSummaryDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  lines: any[];
}

export default function FinalizeSummaryDrawer({ isOpen, onOpenChange, lines }: FinalizeSummaryDrawerProps) {
  return (
    <MobileDrawer
      open={isOpen}
      onOpenChange={onOpenChange}
      showClose={false}
      title="خلاصه نهایی"
      className="max-w-[500px] m-auto"
      actions={
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex-1 flex justify-end">
            <Button className="w-full" onClick={() => console.log('Add to cart')}>
              افزودن به سبد خرید
            </Button>
          </div>

          <div className="flex-1 text-left font-semibold text-sm">۴۵۰۰ تومان</div>
        </div>
      }
    >
      <div className="mt-4">
        <FinalizePreview lines={lines} />
      </div>
    </MobileDrawer>
  );
}
