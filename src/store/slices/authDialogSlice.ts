// store/slices/authDialogSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthDialogState {
  open: boolean;
}

const initialState: AuthDialogState = {
  open: false,
};

const authDialogSlice = createSlice({
  name: 'authDialog',
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    openDialog(state) {
      state.open = true;
    },
    closeDialog(state) {
      state.open = false;
    },
  },
});

export const { setOpen, openDialog, closeDialog } = authDialogSlice.actions;
export default authDialogSlice.reducer;
