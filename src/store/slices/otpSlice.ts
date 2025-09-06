import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OtpState {
  phone: string | null;
  otp: string | null;
  otpSentAt: number | null;
}

const initialState: OtpState = {
  phone: null,
  otp: null,
  otpSentAt: null,
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
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
      state.phone = null;
    },
  },
});

export const { setPhone, setOtp, setOtpSentAt, clearOtp } = otpSlice.actions;
export default otpSlice.reducer;
