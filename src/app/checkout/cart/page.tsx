import React from 'react';

import CheckoutProgress from '@/features/checkout/components/CheckoutProgress';
import CartPageView from '@/features/cart/components/views/CartPageView';

async function Page() {
  return (
    <>
      <CheckoutProgress currentStep="cart" />
      <CartPageView />
    </>
  );
}

export default Page;
