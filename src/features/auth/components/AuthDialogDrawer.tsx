'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import PhoneInputForm from '@/features/auth/components/PhoneInputForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { closeAuthDialog } from '@/store/slices/authDialogSlice';
import { OTP_EXPIRE_SECONDS } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import InputOTPForm from './OtpForm';
import AppDialog from '@/components/wrappers/AppDialog';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import AppDrawer from '@/components/wrappers/AppDrawer';
import { clearAddToCart } from '@/store/slices/pendingActionSlice';

export function AuthDialogDrawer() {
  const dispatch = useDispatch();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { isLogin } = useAppSelector((state) => state.auth);
  const open = useSelector((state: RootState) => state.authDialog.open);
  const { mobile, otpSentAt } = useSelector((state: RootState) => state.otp);

  const { sendOtp, sendOtpStatus, verifyOtp, verifyOtpStatus } = useAuth();

  const otpStep = Boolean(mobile && otpSentAt && Date.now() - otpSentAt < OTP_EXPIRE_SECONDS * 1000);

  const title = otpStep ? 'تایید شماره موبایل' : 'ورود / ثبت‌نام';
  const description = otpStep ? `کد اعتبارسنجی با موفقیت به شماره ${mobile} ارسال شد` : 'لطفا شماره تلفن همراه خود را وارد کنید';

  const handleClose = (val: boolean) => {
    if (!val) {
      dispatch(clearAddToCart());
      dispatch(closeAuthDialog());
    }
  };

  const phoneInputFormRef = useRef<HTMLFormElement>(null);
  const otpFormRef = useRef<HTMLFormElement>(null);

  const handleSubmitPhone = () => {
    phoneInputFormRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };
  const handleSubmitOtp = () => {
    otpFormRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const handleSubmit = otpStep ? handleSubmitOtp : handleSubmitPhone;
  const isLoadingSubmit = otpStep ? verifyOtpStatus === 'pending' : sendOtpStatus === 'pending';

  if (isLogin) return null;

  return isDesktop ? (
    <AppDialog
      open={open}
      onOpenChange={handleClose}
      title={title}
      description={description}
      size="md"
      actions={
        <PrimaryButton onClick={handleSubmit} disabled={isLoadingSubmit} isLoading={isLoadingSubmit} className="flex-1">
          {!otpStep ? 'ارسال کد' : 'ورود و ادامه'}
        </PrimaryButton>
      }
    >
      {!otpStep ? <PhoneInputForm ref={phoneInputFormRef} sendOtp={sendOtp} /> : <InputOTPForm verifyOtp={verifyOtp} ref={otpFormRef} />}
    </AppDialog>
  ) : (
    <AppDrawer
      open={open}
      onOpenChange={handleClose}
      showClose={false}
      title={title}
      description={description}
      actions={
        <PrimaryButton onClick={handleSubmit} disabled={isLoadingSubmit} isLoading={isLoadingSubmit} className="flex-1">
          {!otpStep ? 'ارسال کد' : 'ورود و ادامه'}
        </PrimaryButton>
      }
    >
      {!otpStep ? <PhoneInputForm ref={phoneInputFormRef} sendOtp={sendOtp} /> : <InputOTPForm verifyOtp={verifyOtp} ref={otpFormRef} />}
    </AppDrawer>
  );
}
