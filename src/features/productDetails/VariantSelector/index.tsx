'use client';

import { useMemo, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedButton, setSelectedColor, setSelectedVariant } from '@/store/slices/productSlice';
import ColorSelector from './ColorSelector';
import ButtonSelector from './ButtonSelector';
import { getDefaultSelections, transformVariants } from '../utils/productVariants';

import { findMatchingVariant } from '../utils/productVariants';
import { Attribute, AttributeValues } from '@/types/attributeType';
import { ProductVariant } from '@/features/products/ProductType';
interface ProductVariantsProps {
  variants: ProductVariant[];
  attributes: Attribute[];
  productType: 'VARIABLE' | 'SIMPLE';
  defaultVariantId?: number;
}

export default function ProductVariants({ variants, attributes, productType, defaultVariantId }: ProductVariantsProps) {
  const dispatch = useDispatch();
  const { selectedColor, selectedButton, selectedVariant } = useSelector((state: RootState) => state.product);

  const resetVariant = useCallback(() => {
    dispatch(setSelectedVariant(null));
    dispatch(setSelectedColor(null));
    dispatch(setSelectedButton(null));
  }, [dispatch]);

  useEffect(() => {
    if (!defaultVariantId) resetVariant();
  }, [defaultVariantId, resetVariant]);

  useEffect(() => {
    if (productType === 'VARIABLE' && defaultVariantId && !selectedVariant) {
      const { defaultColor, defaultButton, defaultVariant } = getDefaultSelections(variants, attributes, defaultVariantId);
      if (defaultVariant) {
        dispatch(setSelectedVariant(defaultVariant));
        if (defaultColor) dispatch(setSelectedColor(defaultColor));
        if (defaultButton) dispatch(setSelectedButton(defaultButton));
      }
    }
  }, [defaultVariantId, productType, variants, attributes, dispatch, selectedVariant]);

  useEffect(() => {
    if (productType === 'VARIABLE') {
      if (!selectedColor && !selectedButton) {
        dispatch(setSelectedVariant(null));
        return;
      }
      const matchingVariant = findMatchingVariant(variants, selectedColor, selectedButton, attributes);

      if (matchingVariant && matchingVariant.id !== selectedVariant?.id) {
        dispatch(setSelectedVariant(matchingVariant));
      }
    } else {
      dispatch(setSelectedVariant(null));
    }
  }, [selectedColor, selectedButton, variants, attributes, productType, dispatch, selectedVariant?.id]);

  const onChangeColor = (color: string) => {
    dispatch(setSelectedColor(color));
    dispatch(setSelectedButton(null));
  };

  const validButtons = useMemo(() => {
    const buttonAttrId = attributes.find((attr) => attr.type === 'BUTTON')?.id;
    const transformedButtons = transformVariants(variants, attributes).buttons;

    if (!buttonAttrId || !selectedColor) {
      return transformedButtons.map((button) => ({ ...button, isDisabled: true }));
    }

    const validVariants = variants.filter((variant) =>
      variant.attributeValues.some(
        (attr) => attr.attributeId === attributes.find((a) => a.type === 'COLOR')?.id && attr.id.toString() === selectedColor,
      ),
    );

    const validButtonSlugs = new Set(
      validVariants.flatMap((variant) =>
        variant.attributeValues.filter((attr: AttributeValues) => attr.attributeId === buttonAttrId).map((attr) => attr.slug),
      ),
    );

    return transformedButtons.map((button) => ({
      ...button,
      isDisabled: !validButtonSlugs.has(button.slug),
    }));
  }, [selectedColor, variants, attributes]);

  const validColors = useMemo(() => {
    return transformVariants(variants, attributes).colors.map((color) => ({
      ...color,
      isDisabled: false,
    }));
  }, [variants, attributes]);

  useEffect(() => {
    if (selectedColor && validButtons.length > 0 && selectedButton === null) {
      const firstEnabledButton = validButtons.find((button) => !button.isDisabled);
      if (firstEnabledButton) {
        dispatch(setSelectedButton(firstEnabledButton.slug));
      }
    } else if (selectedColor && validButtons.every((button) => button.isDisabled)) {
      dispatch(setSelectedButton(null));
    }
  }, [selectedColor, validButtons, selectedButton, dispatch]);

  const handleReset = () => {
    resetVariant();
  };

  const colorLabel = attributes.find((attr) => attr.type === 'COLOR')?.name || 'انتخاب رنگ';
  const buttonLabel = attributes.find((attr) => attr.type === 'BUTTON')?.name || 'انتخاب نوع';

  if (productType === 'SIMPLE') return null;

  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center text-md md:text-sm">
        <h3 className="font-semibold text-gray-800">انتخاب مشخصات</h3>
        {(selectedColor || selectedButton) && (
          <button onClick={handleReset} className="text-sm text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
            پاک کردن انتخاب‌ها
          </button>
        )}
      </div>

      {validColors.length > 0 && (
        <div>
          <ColorSelector label={colorLabel} colors={validColors} selectedColor={selectedColor} onColorChange={onChangeColor} />
          {selectedColor && validButtons.every((button) => button.isDisabled) && (
            <p className="text-sm text-gray-500 mt-2">این رنگ نوع برچسب ندارد.</p>
          )}
        </div>
      )}

      {validButtons.length > 0 && (
        <div>
          <ButtonSelector
            title={buttonLabel}
            options={validButtons}
            selectedOption={selectedButton}
            onOptionChange={(button) => {
              dispatch(setSelectedButton(button));
            }}
          />
        </div>
      )}
    </div>
  );
}
