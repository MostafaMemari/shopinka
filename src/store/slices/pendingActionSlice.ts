import { CartData } from '@/features/cart/cartType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PendingActionState {
  addToCartItem: CartData | null;
}

const initialState: PendingActionState = {
  addToCartItem: null,
};

const pendingActionSlice = createSlice({
  name: 'pendingAction',
  initialState,
  reducers: {
    setAddToCart: (state, action: PayloadAction<CartData>) => {
      state.addToCartItem = action.payload;
    },
    clearAddToCart: (state) => {
      state.addToCartItem = null;
    },
  },
});

export const { setAddToCart, clearAddToCart } = pendingActionSlice.actions;
export default pendingActionSlice.reducer;
