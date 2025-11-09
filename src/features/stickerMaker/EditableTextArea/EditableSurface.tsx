'use client';

import React from 'react';

const EditableSurface = () => {
  return (
    <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-100 shadow-2xl border border-zinc-300 overflow-hidden">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-grid-pattern"></div>
      </div>
    </div>
  );
};

export default EditableSurface;
