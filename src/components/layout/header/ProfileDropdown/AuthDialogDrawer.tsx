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

export function AuthDialogDrawer() {
  const [mobile, setMobile] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const open = useSelector((state: RootState) => state.authDialog.open);
  const { phone, otpSentAt } = useSelector((state: RootState) => state.otp);

  const dispatch = useDispatch();

  const title = showOtp ? 'تایید شماره موبایل' : 'ورود / ثبت‌نام';
  const description = showOtp ? `کداعتبار سنجی با موفقیت به شماره ${mobile} ارسال شد` : 'لطفا شماره تلفن همراه خود را وارد کنید';

  const handleSuccess = () => {
    dispatch(closeDialog());
  };

  useEffect(() => {
    if (phone && otpSentAt) {
      const diff = Date.now() - otpSentAt;
      if (diff < 2 * 60 * 1000) {
        setMobile(phone);
        setShowOtp(true);
      } else {
        setMobile('');
        setShowOtp(false);
      }
    } else {
      setMobile('');
      setShowOtp(false);
    }
  }, [phone, otpSentAt, open]);

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

          {showOtp ? (
            <InputOTPForm mobile={mobile} isDialog onSuccess={handleSuccess} />
          ) : (
            <PhoneInputForm mobile={mobile} isDialog setMobile={setMobile} />
          )}
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

        {showOtp ? (
          <InputOTPForm key="otp" mobile={mobile} onSuccess={handleSuccess} />
        ) : (
          <PhoneInputForm key="phone" mobile={mobile} setMobile={setMobile} className="px-4 pb-1" />
        )}
      </DrawerContent>
    </Drawer>
  );
}
