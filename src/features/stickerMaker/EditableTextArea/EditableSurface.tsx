'use client';

import { RootState } from '@/store';
import { setBodyBackground } from '@/store/slices/stickerSlice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EditableSurface = () => {
  const dispatch = useDispatch();
  const { options } = useSelector((state: RootState) => state.sticker);

  const [fromColor, toColor] = options.bodyBackground.split(' ');

  const getBackgroundMode = (textColor: string) => {
    if (['white', 'yellow', 'gold'].includes(textColor)) {
      return 'rgba(0,0,0,0.25) rgba(0,0,0,0.1)';
    }

    return 'white lightgray';
  };

  useEffect(() => {
    const colorValue = options.color?.value || 'white';

    const backgroundValue = getBackgroundMode(colorValue);

    dispatch(setBodyBackground(backgroundValue));
  }, [options.color, dispatch]);

  return (
    <div
      className="absolute inset-4 rounded-2xl shadow-2xl border border-zinc-300 overflow-hidden pointer-events-none touch-action-none"
      style={{
        background: `linear-gradient(to bottom right, ${fromColor}, ${toColor})`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className="absolute inset-0 bg-white/10"></div>

      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-grid-pattern"></div>
      </div>
    </div>
  );
};

export default EditableSurface;
