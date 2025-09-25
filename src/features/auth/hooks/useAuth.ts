import { useAppDispatch } from '@/store/hooks';
import { QueryKeys } from '@/types/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginFailure, loginSuccess, logout } from '@/store/slices/authSlice';
import { signout, sendOtp, verifyOtp } from '@/features/auth/authService';
import { toast } from 'sonner';
import { clearOtp, setOtpSentAt } from '@/store/slices/otpSlice';
import { closeAuthDialog } from '@/store/slices/authDialogSlice';
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

  const verifyOtpMutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (response) => {
      if (response.success) {
        dispatch(
          loginSuccess({ full_name: response.data.user.fullName ?? '', mobile: response.data.user.mobile, role: response.data.user.role }),
        );
        dispatch(setOtpSentAt(Date.now()));
        dispatch(clearOtp());
        dispatch(closeAuthDialog());

        queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
      } else {
        const message = response.message;

        dispatch(loginFailure(message));
        queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
      }
    },
    onError: (error) => {},
  });

  const logOutMutation = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      dispatch(logout());
      toast.success('خروج با موفقیت انجام شد');
      queryClient.clear();

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

    sendOtpStatus: sendOtpMutation.status,
    verifyOtpStatus: verifyOtpMutation.status,
    logOutStatus: logOutMutation.status,
  };
};
