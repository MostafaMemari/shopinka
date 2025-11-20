'use client';

import { RootState } from '@/store';
import { setBodyBackground } from '@/store/slices/stickerSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EditableSurface = () => {
  const dispatch = useDispatch();
  const { options } = useSelector((state: RootState) => state.sticker);

  console.log(options.bodyBackground);

  const [backgroundGradient, setBackgroundGradient] = useState<string>(
    'linear-gradient(to bottom right, rgba(255,255,255,0.6), rgba(240,240,240,0.6))',
  );

  const getBackgroundMode = (textColor: string) => {
    if (['white', 'yellow', 'gold'].includes(textColor)) {
      return ['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.1)'];
    }
    return ['white', 'lightgray'];
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const colorValue = options.color?.value || 'white';

      const [fromColor, toColor] = getBackgroundMode(colorValue);

      const gradientValue = `linear-gradient(to bottom right, ${fromColor}, ${toColor})`;

      setBackgroundGradient(gradientValue);

      dispatch(setBodyBackground(`${fromColor} ${toColor}`));
    }
  }, [options.color, dispatch]);

  return (
    <div
      className="absolute inset-4 rounded-2xl shadow-2xl border border-zinc-300 overflow-hidden pointer-events-none touch-action-none"
      style={{
        background: backgroundGradient,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="absolute inset-0 bg-white/10" />

      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-grid-pattern" />
      </div>
    </div>
  );
};

export default EditableSurface;
