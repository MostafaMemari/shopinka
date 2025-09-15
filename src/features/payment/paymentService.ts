import { shopApiFetch } from '@/service/api';
import { PaymentFormType, PaymentResponse, VerifyPaymentFormType, VerifyPaymentResponse } from '@/features/payment/PaymentType';
import { unwrap } from '@/utils/api-helpers';

export const paymentCart = async (data: PaymentFormType): Promise<PaymentResponse> => {
  const res = await shopApiFetch('/payment', { method: 'POST', body: { ...data } });

  return unwrap(res);
};

export const paymentRetry = async (data: { orderId: number }): Promise<PaymentResponse> => {
  const res = await shopApiFetch('/payment/retry', { method: 'POST', body: { ...data } });

  return unwrap(res);
};

export const verifyPayment = async ({ authority, status }: VerifyPaymentFormType): Promise<VerifyPaymentResponse> => {
  const res = await shopApiFetch(`/payment/verify?Authority=${authority}&Status=${status}`, { method: 'GET' });

  return unwrap(res);
};
