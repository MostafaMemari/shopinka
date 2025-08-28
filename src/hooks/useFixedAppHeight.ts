// hooks/useFixedAppHeight.ts
import { useEffect } from 'react';

export function useFixedAppHeight() {
  useEffect(() => {
    const setAppHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    setAppHeight();

    // ❌ مهم: به visualViewport گوش نده چون باعث پرش میشه
    window.addEventListener('resize', setAppHeight);
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);
}
