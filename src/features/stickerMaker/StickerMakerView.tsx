'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FontGrid from './font/FontGrid';
import ColorGrid from './color/ColorGrid';
import BottomNav from './BottomNav';
import SettingsDrawer from './setting/SettingsDrawer';
import EditableTextArea from './EditableTextArea';

type OpenPanel = 'font' | 'color' | 'settings' | null;

export interface ColorItem {
  name: string;
  value: string;
  finishes?: string[];
}

function StickerMakerView() {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [text, setText] = useState('');
  const [selectedFont, setSelectedFont] = useState('x_uf_1037');
  const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null);

  const toggleFontGrid = () => setOpenPanel((prev) => (prev === 'font' ? null : 'font'));
  const toggleColorGrid = () => setOpenPanel((prev) => (prev === 'color' ? null : 'color'));
  const toggleSettingsPanel = () => setOpenPanel((prev) => (prev === 'settings' ? null : 'settings'));

  return (
    <div className="relative w-full p-0 overflow-hidden rounded-none touch-none m-auto h-screen">
      <EditableTextArea text={text} setText={setText} selectedFont={selectedFont} selectedColor={selectedColor} />

      <div className="fixed bottom-1 left-0 right-0 z-20 max-w-[500px] m-auto">
        <div className="flex w-[calc(100%-1rem)] mx-2 mb-2 rounded-2xl justify-between py-0 [&_button]:flex-1 bg-white">
          {/* Settings Drawer */}
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
                <FontGrid selectedFont={selectedFont} onFontSelect={(font) => setSelectedFont(font)} onClose={() => setOpenPanel(null)} />
              )}
              {openPanel === 'color' && (
                <ColorGrid
                  selectedColor={selectedColor}
                  onColorSelect={(color) => setSelectedColor(color)}
                  onClose={() => setOpenPanel(null)}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <BottomNav
            showFontGrid={openPanel === 'font'}
            toggleFontGrid={toggleFontGrid}
            showColorGrid={openPanel === 'color'}
            toggleColorGrid={toggleColorGrid}
            showSettingsPanel={openPanel === 'settings'}
            toggleSettingsPanel={toggleSettingsPanel}
          />
        </div>
      </div>
    </div>
  );
}

export default StickerMakerView;
