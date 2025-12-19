import React from 'react';

interface CartItemCustomStickerProps {
  customStickerValues: {
    font: {
      name: string;
    };
    material: {
      name: string;
      surface: 'MATTE' | 'GLOSSY' | 'RAINBOW' | 'REFLECTIVE';
      colorCode: string;
    };
  };
}

function CartItemCustomSticker({ customStickerValues }: CartItemCustomStickerProps) {
  return (
    <>
      <div className="w-px rounded-full bg-background" />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        {customStickerValues.material.colorCode && (
          <div className="flex items-center gap-x-1">
            <span className="h-4 w-4 rounded-full" style={{ background: customStickerValues.material.colorCode || '#000' }} />
            <span>رنگ: {customStickerValues.material.name}</span>
          </div>
        )}

        {customStickerValues.font.name && (
          <div className="flex items-center gap-x-1">
            <span>فونت: {customStickerValues.font.name}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default CartItemCustomSticker;
