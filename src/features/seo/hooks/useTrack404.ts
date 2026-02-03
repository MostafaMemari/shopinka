'use client';

import { useEffect } from 'react';
import { trackSeo404 } from '../services/track404Service';

export function useTrack404() {
  useEffect(() => {
    const path = window.location.pathname + window.location.search;
    const key = `404:${path}`;

    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');

    trackSeo404({
      path,
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent || undefined,
    }).catch(() => {});
  }, []);
}
