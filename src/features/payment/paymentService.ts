import { ApiResponse, shopApiFetch } from '@/service/api';
import { PaymentFormType, PaymentResponse, VerifyPaymentFormType, VerifyPaymentResponse } from '@/features/payment/PaymentType';

export const paymentCart = async (data: PaymentFormType): Promise<ApiResponse<PaymentResponse>> => {
  return await shopApiFetch('/payment', { method: 'POST', body: { ...data } });
};

export const paymentRetry = async (data: { orderId: number }): Promise<ApiResponse<PaymentResponse>> => {
  return await shopApiFetch('/payment/retry', { method: 'POST', body: { ...data } });
};

export const verifyPayment = async ({ authority, status }: VerifyPaymentFormType): Promise<ApiResponse<VerifyPaymentResponse>> => {
  return await shopApiFetch(`/payment/verify?Authority=${authority}&Status=${status}`, { method: 'GET' });
};
