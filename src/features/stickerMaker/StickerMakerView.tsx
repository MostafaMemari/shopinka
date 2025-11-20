'use client';

import React, { useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FontGrid from './font/FontGrid';
import BottomNav from './BottomNav';
import SettingsDrawer from './setting/SettingsDrawer';
import EditableTextArea from './EditableTextArea';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ColorGrid } from './color/ColorGrid';
import { RotateCcw, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

type OpenPanel = 'font' | 'color' | 'settings' | null;

function StickerMakerView() {
  const [openPanel, setOpenPanel] = React.useState<OpenPanel>(null);

  const { loading } = useSelector((state: RootState) => state.sticker);

  const togglePanel = useCallback((panel: 'font' | 'color' | 'settings') => {
    setOpenPanel((prev) => (prev === panel ? null : panel));
  }, []);

  const handleStartEditing = () => {
    setOpenPanel(null);
  };

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
              {openPanel === null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="flex justify-center py-4 m-auto w-1/4"
                >
                  <Button variant="secondary" className="">
                    <RotateCcw className="w-4 h-4" />
                    بازنشانی همه تنظیمات
                  </Button>
                </motion.div>
              )}

              {openPanel === 'font' && <FontGrid />}
              {openPanel === 'color' && <ColorGrid />}
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
