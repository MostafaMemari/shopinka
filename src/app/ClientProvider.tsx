'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { DirectionProvider } from '@radix-ui/react-direction';
import { useFixedAppHeight } from '@/hooks/useFixedAppHeight';
import AuthInitializer from '@/features/auth/components/AuthInitializer';
import { AuthDialogDrawer } from '@/components/layout/header/ProfileDropdown/AuthDialogDrawer';

interface Props {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  useFixedAppHeight();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer />
        <AuthDialogDrawer />
        <DirectionProvider dir="rtl">{children}</DirectionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
