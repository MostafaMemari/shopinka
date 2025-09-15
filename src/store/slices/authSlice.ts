import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type { UserState } from '@/types/userType';
import { getMe } from '@/service/userService';
import { AuthState } from '@/features/auth/AuthType';

export const checkAuth = createAsyncThunk<UserState, void, { rejectValue: string }>('auth/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const res = await getMe();

    if (!res.success) return rejectWithValue('کاربر وارد نشده است');

    const user: UserState = {
      full_name: res.data.fullName || '',
      mobile: res.data.mobile,
      role: res.data.role,
    };
    return user;
  } catch (err: any) {
    return rejectWithValue(err.message || 'خطا در دریافت اطلاعات کاربر');
  }
});

const initialState: AuthState = {
  isLogin: false,
  user: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<UserState>) {
      state.isLogin = true;
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLogin = false;
      state.user = null;
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<UserState>) => {
        state.isLogin = true;
        state.user = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.isLogin = false;
        state.user = null;
        state.isLoading = false;
        state.error = action.payload || 'خطای ناشناخته';
      });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
