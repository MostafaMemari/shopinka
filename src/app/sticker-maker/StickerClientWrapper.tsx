'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const StickerMakerView = dynamic(() => import('@/features/stickerMaker/StickerMakerView'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-full py-10 text-gray-500">
      <div className="w-8 h-8 border-4 border-t-transparent border-gray-400 rounded-full animate-spin mb-3" />
      <span>در حال بارگذاری...</span>
    </div>
  ),
});

export default function StickerClientWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-full py-10 text-gray-500">
          <div className="w-8 h-8 border-4 border-t-transparent border-gray-400 rounded-full animate-spin mb-3" />
          <span>در حال بارگذاری...</span>
        </div>
      }
    >
      <StickerMakerView />
    </Suspense>
  );
}
