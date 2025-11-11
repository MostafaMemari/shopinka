'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FontGrid from './font/FontGrid';
import ColorGrid from './color/ColorGrid';
import BottomNav from './BottomNav';
import SettingsDrawer from './setting/SettingsDrawer';
import EditableTextArea from './EditableTextArea';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setFontStart, setFontSuccess, setColorStart, setColorSuccess } from '@/store/slices/stickerSlice';

type OpenPanel = 'font' | 'color' | 'settings' | null;

export interface ColorItem {
  name: string;
  value: string;
  finishes?: string[];
}

function StickerMakerView() {
  const [openPanel, setOpenPanel] = React.useState<OpenPanel>(null);
  const [text, setText] = React.useState('');

  const dispatch = useDispatch();
  const { selectedFont, selectedColor, loading } = useSelector((state: RootState) => state.sticker);

  const handleFontChange = (font: string) => {
    dispatch(setFontStart());
    setTimeout(() => dispatch(setFontSuccess(font)), 400);
  };

  const handleColorChange = (color: any) => {
    dispatch(setColorStart());
    setTimeout(() => dispatch(setColorSuccess(color)), 400);
  };

  return (
    <div className="relative w-full p-0 overflow-hidden rounded-none touch-none m-auto h-screen">
      <EditableTextArea text={text} setText={setText} selectedFont={selectedFont} selectedColor={selectedColor} />

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
              {openPanel === 'font' && (
                <FontGrid selectedFont={selectedFont} onFontSelect={handleFontChange} onClose={() => setOpenPanel(null)} />
              )}
              {openPanel === 'color' && (
                <ColorGrid selectedColor={selectedColor} onColorSelect={handleColorChange} onClose={() => setOpenPanel(null)} />
              )}
            </motion.div>
          </AnimatePresence>

          <BottomNav
            showFontGrid={openPanel === 'font'}
            toggleFontGrid={() => setOpenPanel(openPanel === 'font' ? null : 'font')}
            showColorGrid={openPanel === 'color'}
            toggleColorGrid={() => setOpenPanel(openPanel === 'color' ? null : 'color')}
            showSettingsPanel={openPanel === 'settings'}
            toggleSettingsPanel={() => setOpenPanel(openPanel === 'settings' ? null : 'settings')}
          />
        </div>
      </div>
    </div>
  );
}

export default StickerMakerView;
