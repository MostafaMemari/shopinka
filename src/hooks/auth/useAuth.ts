import { useAppDispatch } from '@/store/hooks';
import { QueryKeys } from '@/types/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginFailure, loginSuccess, logout } from '@/store/slices/authSlice';
import { signout, sendOtp, verifyOtp } from '@/service/authService';
import { toast } from 'sonner';

export const useAuthMutations = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

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
