import { ColorItem } from '@/features/stickerMaker/StickerMakerView';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StickerState {
  selectedFont: string;
  selectedColor: ColorItem | null;
  loading: boolean;
}

const initialState: StickerState = {
  selectedFont: typeof window !== 'undefined' ? localStorage.getItem('selectedFont') || 'x_uf_1037' : 'x_uf_1037',
  selectedColor: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('selectedColor') || 'null') : null,
  loading: false,
};

const stickerSlice = createSlice({
  name: 'sticker',
  initialState,
  reducers: {
    setFontStart(state) {
      state.loading = true;
    },
    setFontSuccess(state, action: PayloadAction<string>) {
      state.selectedFont = action.payload;
      state.loading = false;
      localStorage.setItem('selectedFont', action.payload);
    },
    setColorStart(state) {
      state.loading = true;
    },
    setColorSuccess(state, action: PayloadAction<ColorItem | null>) {
      state.selectedColor = action.payload;
      state.loading = false;
      localStorage.setItem('selectedColor', JSON.stringify(action.payload));
    },
  },
});

export const { setFontStart, setFontSuccess, setColorStart, setColorSuccess } = stickerSlice.actions;
export default stickerSlice.reducer;
