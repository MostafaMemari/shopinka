'use client';

import { RootState } from '@/store';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const EditableSurface = () => {
  const { options } = useSelector((state: RootState) => state.sticker);

  const [backgroundGradient, setBackgroundGradient] = useState<string>(
    'linear-gradient(to bottom right, rgba(255,255,255,0.6), rgba(240,240,240,0.6))',
  );

  useEffect(() => {
    const bg = options?.color?.backgroundMode;

    const from = bg?.from || 'white';
    const to = bg?.to || 'lightgray';

    const gradient = `linear-gradient(to bottom right, ${from}, ${to})`;

    setBackgroundGradient(gradient);
  }, [options?.color]);

  return (
    <div
      className="absolute inset-1 rounded-2xl shadow-2xl border border-zinc-300 overflow-hidden pointer-events-none touch-action-none"
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
