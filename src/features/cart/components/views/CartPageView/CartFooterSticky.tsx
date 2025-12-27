import MobileCartSticky from '@/components/common/MobileCartSticky';
import PrimaryButton from '@/components/common/PrimaryButton';
import TomanIcon from '@/components/common/svg/TomanIcon';
import { formatPrice } from '@/utils/formatter';

export default function CartFooterSticky({ price, isLoading, onContinue }: { price: number; isLoading: boolean; onContinue: () => void }) {
  return (
    <MobileCartSticky position="bottom">
      <div className="flex justify-between items-center">
        <PrimaryButton className="w-1/2" onClick={onContinue} isLoading={isLoading}>
          ادامه فرایند خرید
        </PrimaryButton>

        <div className="flex items-center gap-1 text-primary">
          {formatPrice(price)}
          <TomanIcon className="w-4 h-4" />
        </div>
      </div>
    </MobileCartSticky>
  );
}
