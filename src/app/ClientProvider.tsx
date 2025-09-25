'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { DirectionProvider } from '@radix-ui/react-direction';
import AuthInitializer from '@/features/auth/components/AuthInitializer';
import { AuthDialogDrawer } from '@/features/auth/components/AuthDialogDrawer';
import { AddedToCardDialogDrawer } from '@/features/cart/components/AddedToCardDialogDrawer';

interface Props {
  children: React.ReactNode;
}

export default function ClientProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer />
        <AuthDialogDrawer />
        <AddedToCardDialogDrawer />
        <DirectionProvider dir="rtl">{children}</DirectionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}
