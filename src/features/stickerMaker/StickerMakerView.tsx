'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FontGrid from './font/FontGrid';
import BottomNav from './BottomNav';
import ColorGrid from './ColorGrid';
import FontDrawer from './font/FontDrawer';

type OpenPanel = 'font' | 'color' | null;

function StickerMakerView() {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  const toggleFontGrid = () => setOpenPanel((prev) => (prev === 'font' ? null : 'font'));
  const toggleColorGrid = () => setOpenPanel((prev) => (prev === 'color' ? null : 'color'));

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-red-700">
      <div className="w-full max-w-[500px] text-white p-4">
        <h1 className="text-2xl font-bold">استیکر ساز</h1>
        <p>اینجا محتوای اصلی شماست...</p>
      </div>

      <div className="fixed right-3 left-3 bottom-3 z-50 h-14 flex justify-center max-w-[500px] m-auto" role="region">
        {openPanel === 'font' && <FontDrawer open={openPanel === 'font'} onClose={() => setOpenPanel(null)} />}

        <AnimatePresence>
          {openPanel && (
            <motion.div
              key={openPanel}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed left-0 right-0 bottom-0 z-40"
            >
              {openPanel === 'color' && <ColorGrid />}
            </motion.div>
          )}
        </AnimatePresence>

        <BottomNav
          showFontGrid={openPanel === 'font'}
          toggleFontGrid={toggleFontGrid}
          showColorGrid={openPanel === 'color'}
          toggleColorGrid={toggleColorGrid}
        />
      </div>
    </div>
  );
}

export default StickerMakerView;
