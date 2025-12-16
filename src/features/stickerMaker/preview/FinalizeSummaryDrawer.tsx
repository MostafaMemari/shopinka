import MobileDrawer from '@/components/common/Drawer';
import FinalizePreview from './FinalizePreview';
import TomanIcon from '@/components/common/svg/TomanIcon';
import { formatPrice } from '@/utils/formatter';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useEffect, useState } from 'react';
import { customStickerPricing } from '@/features/custom-sticker/services/customStickerService';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';

interface FinalizeSummaryDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FinalizeSummaryDrawer({ isOpen, onOpenChange }: FinalizeSummaryDrawerProps) {
  const { materialId, fontId, text, selectedFont, lines } = useSelectedStickerAssets();

  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!lines || lines.length === 0) return;
    if (!fontId || !materialId) return;

    customStickerPricing({
      fontId: fontId,
      materialId: materialId,
      lines: lines
        .filter((line) => line.width != null && line.height != null)
        .map((line, index) => ({
          lineNumber: index,
          width: line?.width!,
          height: line?.height!,
        })),
    }).then((response) => {
      if (response.success && response.data) {
        setPrice(response.data.pricing);
      }
    });
  }, []);

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
            <span className="text-base font-semibold lg:text-lg lg:font-bold">{formatPrice(price / 100)}</span>
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
