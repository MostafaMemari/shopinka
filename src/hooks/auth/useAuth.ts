import { useAppDispatch } from '@/store/hooks';
import { QueryKeys } from '@/types/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginFailure, loginSuccess } from '@/store/slices/authSlice';
import { logout, sendOtp, verifyOtp } from '@/service/authService';

export const useAuthMutations = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const sendOtpMutation = useMutation({
    mutationFn: sendOtp,
    onSuccess: () => {
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
      dispatch(loginSuccess({ full_name: response.data.fullName ?? '', mobile: response.data.mobile, role: response.data.role }));

      queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
    },
    onError: (error) => {
      const message = error.message;

      dispatch(loginFailure(message));
      queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
    },
  });

  const logOutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logout();
      queryClient.clear();
    },
    onError: () => {
      logout();
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
