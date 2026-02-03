'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackSeo404 } from '../services/track404Service';

export default function NotFoundTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackSeo404({
      path: pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    });
  }, [pathname]);

  return null;
}
