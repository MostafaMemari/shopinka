'use client';

import React, { useEffect, useState } from 'react';
import EditableText from './EditableText';
import EditableSurface from './EditableSurface';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface EditableTextAreaProps {
  onStartEditing?: () => void;
}

const EditableTextArea: React.FC<EditableTextAreaProps> = ({ onStartEditing }) => {
  const { options } = useSelector((state: RootState) => state.sticker);

  return (
    <div className="relative w-full h-svh overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <EditableSurface />
      <EditableText selectedFont={options.fontFamily} selectedColor={options.color} />
    </div>
  );
};

export default EditableTextArea;
