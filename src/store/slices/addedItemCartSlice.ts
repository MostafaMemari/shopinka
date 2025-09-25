import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddedItemState {
  open: boolean;
  item: {
    id: number;
    title: string;
    image?: string;
    variant?: string;
    price: number;
    quantity: number;
  } | null;
}

const initialState: AddedItemState = {
  open: false,
  item: null,
};

const addedItemCartSlice = createSlice({
  name: 'addedItem',
  initialState,
  reducers: {
    showAddedItem(state, action: PayloadAction<AddedItemState['item']>) {
      state.item = action.payload;
      state.open = true;
    },
    closeAddedItem(state) {
      state.open = false;
      state.item = null;
    },
  },
});

export const { showAddedItem, closeAddedItem } = addedItemCartSlice.actions;
export default addedItemCartSlice.reducer;
