'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.toString();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}
