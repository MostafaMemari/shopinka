'use client';

import FinalizePreview from './FinalizePreview';
import TomanIcon from '@/components/common/svg/TomanIcon';

import PrimaryButton from '@/components/common/PrimaryButton';
import { useEffect, useState } from 'react';
import {
  createCustomStickerProduct,
  customStickerPricing,
  uploadPreviewImage,
} from '@/features/custom-sticker/services/customStickerService';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';
import { useAppSelector } from '@/store/hooks';
import { useBoolean } from '@/hooks/use-boolean';
import { openAuthDialog } from '@/store/slices/authDialogSlice';
import { useDispatch } from 'react-redux';
import { useCart } from '@/features/cart/hooks/useCart';
import { showAddToCartToast } from '@/utils/toastUtils';
import { useRouter } from 'next/navigation';
import { setLines, setText } from '@/store/slices/stickerSlice';
import AppDialog from '@/components/wrappers/AppDialog';
import { formatPrice } from '@/lib/utils';

interface FinalizeSummaryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCloseFinalizeSticker: () => void;
}

export default function FinalizeSummaryDialog({ isOpen, onOpenChange, onCloseFinalizeSticker }: FinalizeSummaryDialogProps) {
  const { materialId, fontId, lines } = useSelectedStickerAssets();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  const { addToCart, isAddingToCart } = useCart();
  const router = useRouter();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [pendingAddToCart, setPendingAddToCart] = useState(false);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const finalizeControl = useBoolean(false);

  useEffect(() => {
    if (!lines?.length || !fontId || !materialId) return;

    customStickerPricing({
      fontId,
      materialId,
      lines: lines
        .filter((l) => l.width != null && l.height != null)
        .map((line, index) => ({
          lineNumber: index + 1,
          width: line.width!,
          height: line.height!,
        })),
    }).then((res) => {
      if (res.success && res.data) {
        setPrice(res.data.pricing);
      }
    });
  }, [lines, fontId, materialId]);

  const handleAddToCart = () => {
    if (!isLogin) {
      setPendingAddToCart(true);
      dispatch(openAuthDialog());
      return;
    }

    startFinalizeFlow();
  };

  useEffect(() => {
    if (isLogin && pendingAddToCart) {
      setPendingAddToCart(false);
      startFinalizeFlow();
    }
  }, [isLogin]);

  const startFinalizeFlow = async () => {
    if (!previewImage || !fontId || !materialId || !lines?.length) return;

    try {
      setLoading(true);

      const uploadRes = await uploadPreviewImage(previewImage).then((res) => {
        if (res.success && res.data) {
          return res.data.galleryItem.id;
        }
      });

      const productRes = await createCustomStickerProduct({
        name: 'استیکر سفارشی',
        fontId,
        materialId,
        previewImageId: uploadRes!,
        lines: lines.map((line, index) => ({
          text: line.text,
          ratio: line.ratio,
          lineNumber: index + 1,
          width: line.width!,
          height: line.height!,
        })),
        style: 'normal',
        weight: 'regular',
        letterSpacing: 0,
        description: 'استیکر سفارشی',
      }).then((res) => {
        if (res.success && res.data) {
          return res.data;
        }
      });

      addToCart(
        {
          productId: null,
          productVariantId: null,
          customStickerId: productRes?.customSticker.id,
          quantity: 1,
        },
        {
          onSuccess: () => {
            showAddToCartToast(router);
            dispatch(setText(''));
            dispatch(setLines([]));
            onCloseFinalizeSticker();
            onOpenChange(false);
          },
        },
      );

      finalizeControl.onTrue();
    } catch (error) {
      console.error('Finalize error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      showClose={false}
      title="خلاصه نهایی"
      className="max-w-[500px] m-auto"
      actions={
        <div className="flex justify-between items-center w-full">
          <div className="w-1/2 mx-1">
            <PrimaryButton onClick={handleAddToCart} disabled={loading} className="flex w-full items-center justify-center gap-2">
              {loading || isAddingToCart ? 'در حال پردازش...' : 'افزودن به سبد خرید'}
            </PrimaryButton>
          </div>

          <div className="flex items-center gap-1 font-semibold text-primary">
            <span>{formatPrice(price)}</span>
            <TomanIcon className="w-4 h-4" />
          </div>
        </div>
      }
    >
      <div className="mt-4">
        <FinalizePreview lines={lines} onPreviewImageChange={setPreviewImage} />
      </div>
    </AppDialog>
  );
}
