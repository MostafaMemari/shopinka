import { User, UserState } from '@/types/userType';

export interface AuthState {
  isLogin: boolean;
  user: UserState | null;
  isLoading: boolean;
  error?: string | null;
}

export type VerifyOtpResponse = {
  accessToken: string;
  refreshToken: string;
  message: string;
  user: User;
};
