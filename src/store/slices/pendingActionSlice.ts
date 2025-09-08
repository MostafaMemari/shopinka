import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemState } from '@/types/cartType';

interface PendingActionState {
  addToCartItem: CartItemState | null;
}

const initialState: PendingActionState = {
  addToCartItem: null,
};

const pendingActionSlice = createSlice({
  name: 'pendingAction',
  initialState,
  reducers: {
    setAddToCart: (state, action: PayloadAction<CartItemState>) => {
      state.addToCartItem = action.payload;
    },
    clearAddToCart: (state) => {
      state.addToCartItem = null;
    },
  },
});

export const { setAddToCart, clearAddToCart } = pendingActionSlice.actions;
export default pendingActionSlice.reducer;
