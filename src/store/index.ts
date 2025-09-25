import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import authDialogReducer from './slices/authDialogSlice';
import authReducer from './slices/authSlice';
import addedItemCartSlice from './slices/addedItemCartSlice';
import otpReducer from './slices/otpSlice';
import pendingActionReducer from './slices/pendingActionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    addedItemCart: addedItemCartSlice,
    otp: otpReducer,
    product: productReducer,
    authDialog: authDialogReducer,
    pendingAction: pendingActionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
