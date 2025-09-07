import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OtpState {
  mobile: string | null;
  otp: string | null;
  otpSentAt: number | null;
}

const initialState: OtpState = {
  mobile: null,
  otp: null,
  otpSentAt: null,
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setMobile(state, action: PayloadAction<string>) {
      state.mobile = action.payload;
    },
    setOtp(state, action: PayloadAction<string>) {
      state.otp = action.payload;
    },
    setOtpSentAt(state, action: PayloadAction<number>) {
      state.otpSentAt = action.payload;
    },
    clearOtp(state) {
      state.otp = null;
      state.otpSentAt = null;
      state.mobile = null;
    },
  },
});

export const { setMobile, setOtp, setOtpSentAt, clearOtp } = otpSlice.actions;
export default otpSlice.reducer;
