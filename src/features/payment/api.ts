import { shopApiFetch } from '@/service/api';
import { PaymentFormType, PaymentResponse, VerifyPaymentFormType, VerifyPaymentResponse } from '@/features/payment/types';

export const paymentCart = async (data: PaymentFormType): Promise<PaymentResponse> => {
  return await shopApiFetch('/payment', { method: 'POST', body: { ...data } });
};

export const paymentRetry = async (data: { orderId: number }): Promise<PaymentResponse> => {
  return await shopApiFetch('/payment/retry', { method: 'POST', body: { ...data } });
};

export const verifyPayment = async ({ authority, status }: VerifyPaymentFormType): Promise<VerifyPaymentResponse> => {
  return await shopApiFetch(`/payment/verify?Authority=${authority}&Status=${status}`, { method: 'GET' });
};
