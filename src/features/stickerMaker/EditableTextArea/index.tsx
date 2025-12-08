'use client';

import React from 'react';
import EditableText from './EditableText';
import EditableSurface from './EditableSurface';

interface EditableTextAreaProps {
  onStartEditing: () => void;
}

const EditableTextArea: React.FC<EditableTextAreaProps> = ({ onStartEditing }) => {
  return (
    <div className="relative w-full h-svh overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <EditableSurface />

      <EditableText onStartEditing={onStartEditing} />
    </div>
  );
};

export default EditableTextArea;
