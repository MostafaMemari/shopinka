import MobileDrawer from '@/components/common/Drawer';
import FinalizePreview from './FinalizePreview';
import TomanIcon from '@/components/common/svg/TomanIcon';
import { formatPrice } from '@/utils/formatter';
import PrimaryButton from '@/components/common/PrimaryButton';

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
        <div className="flex justify-between items-center w-full">
          <div className="w-1/2 mx-1">
            <PrimaryButton
              type="button"
              className="flex w-full items-center justify-center gap-2 shadow-md shadow-primary/50 transition-all duration-300 hover:shadow-none"
            >
              افزودن به سبد خرید
            </PrimaryButton>
          </div>

          <div className="flex items-center gap-1 text-left font-semibold text-primary text-base">
            <span className="text-base font-semibold lg:text-lg lg:font-bold">{formatPrice(250000)}</span>
            <TomanIcon className="w-4 h-4" />
          </div>
        </div>
      }
    >
      <div className="mt-4">
        <FinalizePreview lines={lines} />
      </div>
    </MobileDrawer>
  );
}
