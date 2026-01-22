'use client';

import '@fancyapps/ui/dist/fancybox/fancybox.css';

import { useState, useEffect } from 'react';

import { type FancyboxOptions, Fancybox } from '@fancyapps/ui/dist/fancybox/';

export default function useFancybox(options: Partial<FancyboxOptions> = {}) {
  const [root, setRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (root) {
      Fancybox.bind(root, '[data-fancybox]', options);
      return () => Fancybox.unbind(root);
    }
  }, [root, options]);

  return [setRoot];
}
