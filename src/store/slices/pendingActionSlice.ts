import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCartType } from '@/features/cart/cartType';

interface PendingActionState {
  addToCartItem: AddCartType | null;
}

const initialState: PendingActionState = {
  addToCartItem: null,
};

const pendingActionSlice = createSlice({
  name: 'pendingAction',
  initialState,
  reducers: {
    setAddToCart: (state, action: PayloadAction<AddCartType>) => {
      state.addToCartItem = action.payload;
    },
    clearAddToCart: (state) => {
      state.addToCartItem = null;
    },
  },
});

export const { setAddToCart, clearAddToCart } = pendingActionSlice.actions;
export default pendingActionSlice.reducer;
