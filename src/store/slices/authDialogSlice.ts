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
    openAuthDialog(state) {
      state.open = true;
    },
    closeAuthDialog(state) {
      state.open = false;
    },
  },
});

export const { setOpen, openAuthDialog, closeAuthDialog } = authDialogSlice.actions;
export default authDialogSlice.reducer;
