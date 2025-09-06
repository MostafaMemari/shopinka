import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import authDialogReducer from './slices/authDialogSlice';
import authReducer from './slices/authSlice';
import otpReducer from './slices/otpSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    otp: otpReducer,
    product: productReducer,
    authDialog: authDialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
