import { useAppDispatch } from '@/store/hooks';
import { QueryKeys } from '@/types/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginFailure, loginSuccess, logout } from '@/store/slices/authSlice';
import { signout, sendOtp, verifyOtp } from '@/features/auth/api';
import { toast } from 'sonner';
import { clearOtp } from '@/store/slices/otpSlice';
import { closeDialog } from '@/store/slices/authDialogSlice';
import { usePathname, useRouter } from 'next/navigation';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      toast.success('کد تایید به شماره موبایل شما ارسال شد');

      queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
    },
    onError: (error) => {
      const message = error.message;

      loginFailure(message);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
      toast.success('کد اعتبار سنجی مجددا ارسال شد');

      queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
    },
    onError: (error) => {
      const message = error.message;

      loginFailure(message);
      queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (response) => {
      dispatch(loginSuccess({ full_name: response.user.fullName ?? '', mobile: response.user.mobile, role: response.user.role }));
      dispatch(clearOtp());
      dispatch(closeDialog());
      toast.success('ورود شما با موفقیت انجام شد');

      queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
    },
    onError: (error) => {
      const message = error.message;

      toast.error(message);
      dispatch(loginFailure(message));
      queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
    },
  });

  const logOutMutation = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      dispatch(logout());
      toast.success('خروج با موفقیت انجام شد');
      queryClient.clear();

      console.log(pathname.startsWith('/profile'));

      if (pathname.startsWith('/profile') || pathname.startsWith('/checkout')) {
        router.push('/');
      }
    },
    onError: () => {
      dispatch(logout());
      toast.error('خروج با خطا مواجه شد');
      queryClient.clear();
    },
  });

  return {
    sendOtp: sendOtpMutation.mutate,
    verifyOtp: verifyOtpMutation.mutate,
    logOut: logOutMutation.mutate,
    resendOtp: resendOtpMutation.mutate,

    sendOtpStatus: sendOtpMutation.status,
    verifyOtpStatus: verifyOtpMutation.status,
    logOutStatus: logOutMutation.status,
    resendOtpStatus: resendOtpMutation.status,
  };
};
