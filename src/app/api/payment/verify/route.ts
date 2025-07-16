import { verifyPayment } from '@/service/paymentService';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  console.log('searchParams', searchParams);

  const authority = searchParams.get('Authority');
  const status = searchParams.get('Status');

  if (!authority || !status) {
    return NextResponse.redirect(`/payment/fail?error=${encodeURIComponent('پارامترهای پرداخت ناقص است')}`);
  }

  try {
    const result = await verifyPayment({ authority, status } as { authority: string; status: 'OK' | 'NOK' });

    return NextResponse.redirect(result.redirectUrl);
  } catch (error: any) {
    console.error('خطا در بررسی پرداخت:', error);
    return NextResponse.redirect(`/payment/fail?error=${encodeURIComponent(error.message || 'خطای نامشخص در پرداخت')}`);
  }
}
