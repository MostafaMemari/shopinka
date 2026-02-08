import TopNav from '@/features/stickerMaker/TopNav';
import React from 'react';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative w-full p-0 overflow-hidden rounded-none touch-none m-auto h-screen">
      <div className="fixed top-1 left-2 right-2 z-20 max-w-[500px] m-auto">
        <TopNav />
      </div>
      {children}
    </div>
  );
}
