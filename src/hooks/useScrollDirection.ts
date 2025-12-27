'use client';

import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY) {
        setScrollDir('down');
      } else {
        setScrollDir('up');
      }
      setLastY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  return scrollDir;
}
