'use client';

import { useMediaQuery } from '@/hooks/use-media-query';

import PhoneInputForm from '@/features/auth/components/PhoneInputForm';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { closeDialog } from '@/store/slices/authDialogSlice';
import { OTP_EXPIRE_SECONDS } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import InputOTPForm from './OtpForm';
import Dialog from '@/components/common/Dialog';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import MobileDrawer from '@/components/common/MobileDrawer';

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
    if (!val) dispatch(closeDialog());
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
    <Dialog
      open={open}
      onOpenChange={handleClose}
      title={title}
      description={description}
      actions={
        <PrimaryButton onClick={handleSubmit} disabled={isLoadingSubmit} isLoading={isLoadingSubmit} className="flex-1">
          {!otpStep ? 'ارسال کد' : 'ورود و ادامه'}
        </PrimaryButton>
      }
    >
      {!otpStep ? <PhoneInputForm ref={phoneInputFormRef} sendOtp={sendOtp} /> : <InputOTPForm verifyOtp={verifyOtp} ref={otpFormRef} />}
    </Dialog>
  ) : (
    <MobileDrawer
      open={open}
      onOpenChange={handleClose}
      title={title}
      description={description}
      actions={
        <PrimaryButton onClick={handleSubmit} disabled={isLoadingSubmit} isLoading={isLoadingSubmit} className="flex-1">
          {!otpStep ? 'ارسال کد' : 'ورود و ادامه'}
        </PrimaryButton>
      }
    >
      {!otpStep ? <PhoneInputForm ref={phoneInputFormRef} sendOtp={sendOtp} /> : <InputOTPForm verifyOtp={verifyOtp} ref={otpFormRef} />}
    </MobileDrawer>
  );
}

// <Drawer open={open} modal={false} onOpenChange={handleClose}>
//   <DrawerContent className="fixed inset-x-0 bottom-0 !mt-0 !mb-0 !h-auto" onEscapeKeyDown={(e) => e.preventDefault()}>
//     <DrawerHeader className="text-left pb-3">
//       <DrawerTitle>{title}</DrawerTitle>
//       <DrawerDescription>{description}</DrawerDescription>
//     </DrawerHeader>
//     {!otpStep ? <PhoneInputForm key="mobile" className="px-4 pb-1" /> : <InputOTPForm key="otp" />}
//   </DrawerContent>
// </Drawer>
