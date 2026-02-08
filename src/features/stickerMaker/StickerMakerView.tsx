'use client';

import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FontGrid from './font/FontGrid';
import BottomNav from './BottomNav';
import SettingsDrawer from './setting/SettingsDrawer';
import EditableTextArea from './EditableTextArea';
import { MaterialGrid } from './material/MaterialGrid';
import ResetButton from './reset/ResetButton';
import { useInitializeStickerOptions } from '@/hooks/useInitializeStickerOptions';
import { StickerDataProvider } from './StickerDataContext';
import { MaterialStickerResponse } from '@/types/materialStickerType';
import { FontResponse } from '@/types/fontType';

type OpenPanel = 'font' | 'color' | 'settings' | null;

interface Props {
  fontData: FontResponse;
  materialData: MaterialStickerResponse;
}

function StickerMakerView({ fontData, materialData }: Props) {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  const togglePanel = useCallback((panel: 'font' | 'color' | 'settings') => {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  }, []);

  const handleStartEditing = () => {
    setOpenPanel(null);
  };

  useInitializeStickerOptions({
    fontData: fontData?.items,
    materialData: materialData?.items,
  });

  return (
    <StickerDataProvider materialData={materialData?.items} fontData={fontData?.items}>
      <EditableTextArea onStartEditing={handleStartEditing} />

      <div className="fixed bottom-1 left-0 right-0 z-20 max-w-[500px] m-auto">
        <div className="flex w-[calc(100%-1rem)] mx-2 mb-2 rounded-2xl justify-between py-0 [&_button]:flex-1 bg-white">
          <SettingsDrawer open={openPanel === 'settings'} onClose={() => setOpenPanel(null)} />

          <AnimatePresence>
            <motion.div
              key={openPanel}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 right-0 bottom-16 z-40"
            >
              {openPanel === null && <ResetButton />}

              {openPanel === 'font' && <FontGrid data={fontData} />}

              {openPanel === 'color' && <MaterialGrid data={materialData} />}
            </motion.div>
          </AnimatePresence>

          <BottomNav
            showFontGrid={openPanel === 'font'}
            toggleFontGrid={() => togglePanel('font')}
            showColorGrid={openPanel === 'color'}
            toggleColorGrid={() => togglePanel('color')}
            showSettingsPanel={openPanel === 'settings'}
            toggleSettingsPanel={() => togglePanel('settings')}
          />
        </div>
      </div>
    </StickerDataProvider>
  );
}

export default StickerMakerView;
