'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FontGrid from './FontGrid';
import BottomNav from './BottomNav';

function StickerMakerView() {
  const [showFontGrid, setShowFontGrid] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-red-700">
      <div className="w-full max-w-[500px] text-white p-4">
        <h1 className="text-2xl font-bold">استیکر ساز</h1>
        <p>اینجا محتوای اصلی شماست...</p>
      </div>

      <AnimatePresence>
        {showFontGrid && (
          <motion.div
            key="fontgrid"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed left-0 right-0 bottom-0 z-40"
          >
            <FontGrid />
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav showFontGrid={showFontGrid} toggleFontGrid={() => setShowFontGrid((prev) => !prev)} />
    </div>
  );
}

export default StickerMakerView;
