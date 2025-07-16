import { shopApiFetch } from '@/service/api';
import { PaymentFormType, PaymentResponse, VerifyPaymentFormType, VerifyPaymentResponse } from '@/types/paymentType';

export const paymentCart = async (data: PaymentFormType): Promise<PaymentResponse> => {
  const res = await shopApiFetch('/payment', { method: 'POST', body: { ...data } });

  if (res.status >= 400 || !res.data) {
    throw new Error(res.data?.message || 'خطا در ثبت سفارش');
  }

  return res.data;
};

export const paymentRetry = async (data: { orderId: number }): Promise<PaymentResponse> => {
  const res = await shopApiFetch('/payment/retry', { method: 'POST', body: { ...data } });

  if (res.status >= 400 || !res.data) {
    throw new Error(res.data?.message || 'خطا در ثبت سفارش');
  }

  return res.data;
};

export const verifyPayment = async ({ authority, status }: VerifyPaymentFormType): Promise<VerifyPaymentResponse> => {
  const res = await shopApiFetch(`/payment/verify?Authority=${authority}&Status=${status}`, { method: 'GET' });

  return res.data;
};
