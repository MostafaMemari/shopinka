'use client';

import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FontGrid from './font/FontGrid';
import BottomNav from './BottomNav';
import SettingsDrawer from './setting/SettingsDrawer';
import EditableTextArea from './EditableTextArea';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { MaterialGrid } from './material/MaterialGrid';
import ResetButton from './reset/ResetButton';
import { useMaterialSticker } from '../material-sticker/hooks/useMaterialSticker';
import { useFont } from '../font/hooks/useFont';
import { useInitializeStickerOptions } from '@/hooks/useInitializeStickerOptions';
import { StickerDataProvider } from './StickerDataContext';

type OpenPanel = 'font' | 'color' | 'settings' | null;

function StickerMakerView() {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  const { loading } = useSelector((state: RootState) => state.sticker);

  const { data: materialData, isLoading: materialLoading } = useMaterialSticker({
    params: { sortBy: 'displayOrder', sortDirection: 'asc' },
  });
  const { data: fontData, isLoading: fontLoading } = useFont({
    params: { includeThumbnail: true, includeFile: true, sortBy: 'displayOrder', sortDirection: 'asc' },
  });

  const togglePanel = useCallback((panel: 'font' | 'color' | 'settings') => {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  }, []);

  const handleStartEditing = () => {
    setOpenPanel(null);
  };

  useInitializeStickerOptions({ fontData: fontData?.items, materialData: materialData?.items, fontLoading, materialLoading });

  if (loading && materialLoading && fontLoading) {
    return (
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full p-0 overflow-hidden rounded-none touch-none m-auto h-screen">
      <StickerDataProvider
        materialData={materialData?.items}
        fontData={fontData?.items}
        materialLoading={materialLoading}
        fontLoading={fontLoading}
      >
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

                {openPanel === 'font' && <FontGrid data={fontData} isLoading={fontLoading} />}

                {openPanel === 'color' && <MaterialGrid data={materialData} isLoading={materialLoading} />}
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
    </div>
  );
}

export default StickerMakerView;
