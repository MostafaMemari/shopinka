import CheckoutProgress from '@/features/checkout/components/CheckoutProgress';
import CheckoutPageView from '@/features/checkout/components/CheckoutPageView';

export default function Page() {
  return (
    <>
      <CheckoutProgress currentStep="checkout" />
      <CheckoutPageView />
    </>
  );
}
