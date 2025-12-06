'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FontGrid from './font/FontGrid';
import BottomNav from './BottomNav';
import SettingsDrawer from './setting/SettingsDrawer';
import EditableTextArea from './EditableTextArea';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ColorGrid } from './color/ColorGrid';
import ResetButton from './reset/ResetButton';
import { useMaterialSticker } from '../material-sticker/hooks/useMaterialSticker';
import { useFont } from '../font/hooks/useFont';
import { setInitialOptions } from '@/store/slices/stickerSlice';

type OpenPanel = 'font' | 'color' | 'settings' | null;

function StickerMakerView() {
  const dispatch = useDispatch();
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  const { loading, options } = useSelector((state: RootState) => state.sticker);

  const { data: materialData, isLoading: materialLoading } = useMaterialSticker({});
  const { data: fontData, isLoading: fontLoading } = useFont({
    params: { includeThumbnail: true, includeFile: true },
  });

  const togglePanel = useCallback((panel: 'font' | 'color' | 'settings') => {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  }, []);

  const handleStartEditing = () => {
    setOpenPanel(null);
  };

  useEffect(() => {
    if (!fontLoading && !materialLoading && fontData && materialData && (!options?.font || !options.color)) {
      const defaultFont = fontData.items.find((f) => f.isDefault);
      const defaultMaterial = materialData.items.find((m) => m.isDefault);

      dispatch(
        setInitialOptions({
          color: {
            id: defaultMaterial?.id ?? 0,
            backgroundMode: {
              from: defaultMaterial?.backgroundFrom || '#000',
              to: defaultMaterial?.backgroundTo || '#000',
            },
            value: defaultMaterial?.colorCode || '#000',
            name: defaultMaterial?.name || 'Default',
          },

          font: {
            id: defaultFont?.id ?? 0,
            family: defaultFont?.name || 'DefaultFont',
            size: defaultFont?.size || 24,
            lineHeight: defaultFont?.lineHeight || 1.4,
            style: 'normal',
            weight: 'normal',
          },

          letterSpacing: 3,
          textAlign: 'center',
        }),
      );
    }
  }, [fontLoading, materialLoading, fontData, materialData, dispatch]);

  return (
    <div className="relative w-full p-0 overflow-hidden rounded-none touch-none m-auto h-screen">
      <EditableTextArea onStartEditing={handleStartEditing} />

      {loading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

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

              {openPanel === 'color' && <ColorGrid data={materialData} isLoading={materialLoading} />}
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
    </div>
  );
}

export default StickerMakerView;
