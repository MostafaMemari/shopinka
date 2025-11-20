'use client';

import React from 'react';
import EditableText from './EditableText';
import EditableSurface from './EditableSurface';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fontsList } from '@/data/font/fontsList';
import { ColorOptions } from '@/types/color/colorType';

interface EditableTextAreaProps {
  onStartEditing: () => void;
}

const EditableTextArea: React.FC<EditableTextAreaProps> = ({ onStartEditing }) => {
  const { options } = useSelector((state: RootState) => state.sticker);

  const font = fontsList.find((f) => f.name === options.font.family);

  const selectedFont = font || null;
  const selectedColor: ColorOptions | null = options.color || null;

  return (
    <div className="relative w-full h-svh overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <EditableSurface />

      <EditableText selectedFont={selectedFont} selectedColor={selectedColor} onStartEditing={onStartEditing} />
    </div>
  );
};

export default EditableTextArea;
