'use client';

import { Button } from '@/components/ui';
import { ChevronUp } from 'lucide-react';
import { FC, useEffect } from 'react';

const ScrollTopButton: FC = () => {
  useEffect(() => {
    const scrollTopButton = document.getElementById('scroll-top-button-footer');
    if (scrollTopButton) {
      scrollTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
    return () => {
      if (scrollTopButton) {
        scrollTopButton.removeEventListener('click', () => {});
      }
    };
  }, []);

  return (
    <Button variant="outline" id="scroll-top-button-footer" className="cursor-pointer" type="button">
      <span>برگشت به بالا</span>
      <ChevronUp className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />
    </Button>
  );
};

export default ScrollTopButton;
