'use client';

import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';
import React, { useEffect, useState } from 'react';

const EditableSurface = () => {
  const { selectedMaterial } = useSelectedStickerAssets();

  const [backgroundGradient, setBackgroundGradient] = useState<string>(
    'linear-gradient(to bottom right, rgba(255,255,255,0.6), rgba(240,240,240,0.6))',
  );

  useEffect(() => {
    const bg = { from: selectedMaterial?.backgroundFrom, to: selectedMaterial?.backgroundTo };

    const from = bg?.from || 'white';
    const to = bg?.to || 'lightgray';

    const gradient = `linear-gradient(to bottom right, ${from}, ${to})`;

    setBackgroundGradient(gradient);
  }, [selectedMaterial?.backgroundFrom, selectedMaterial?.backgroundTo]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none touch-action-none"
      style={{ background: backgroundGradient, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    ></div>
  );
};

export default EditableSurface;
