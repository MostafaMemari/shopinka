'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';

import PhoneInputForm from '@/components/features/auth/PhoneInputForm';
import { useState, useEffect } from 'react';
import InputOTPForm from './OtpForm2';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { closeDialog } from '@/store/slices/authDialogSlice';
import { OTP_EXPIRE_SECONDS } from '@/constants';

export function AuthDialogDrawer() {
  const [otpStep, setOtpStep] = useState(false);

  const dispatch = useDispatch();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const open = useSelector((state: RootState) => state.authDialog.open);
  const { mobile, otpSentAt } = useSelector((state: RootState) => state.otp);

  useEffect(() => {
    const stillValid = Boolean(mobile && otpSentAt && Date.now() - otpSentAt < OTP_EXPIRE_SECONDS * 1000);
    setOtpStep(stillValid);
  }, [mobile, otpSentAt]);

  const handleSuccess = () => {
    setOtpStep(false);
    dispatch(closeDialog());
  };

  const title = otpStep ? 'تایید شماره موبایل' : 'ورود / ثبت‌نام';
  const description = otpStep ? `کد اعتبارسنجی با موفقیت به شماره ${mobile} ارسال شد` : 'لطفا شماره تلفن همراه خود را وارد کنید';

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={(val) => {
          if (!val) dispatch(closeDialog());
        }}
      >
        <DialogContent className="sm:max-w-[425px]" onEscapeKeyDown={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          {!otpStep ? <PhoneInputForm isDialog /> : <InputOTPForm isDialog onSuccess={handleSuccess} />}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      modal
      onOpenChange={(val) => {
        if (!val) dispatch(closeDialog());
      }}
    >
      <DrawerContent className="fixed inset-x-0 bottom-0 !mt-0 !mb-0 !h-auto" onEscapeKeyDown={(e) => e.preventDefault()}>
        <DrawerHeader className="text-left pb-3">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>

        {!otpStep ? <PhoneInputForm key="mobile" className="px-4 pb-1" /> : <InputOTPForm key="otp" onSuccess={handleSuccess} />}
      </DrawerContent>
    </Drawer>
  );
}
