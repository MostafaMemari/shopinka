import { ColorItemType } from '@/features/stickerMaker/color/ColorGrid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StickerOptions {
  color: ColorItemType | null;
  fontFamily: string;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right';
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  bodyBackground: string;
}

interface StickerState {
  text: string;
  loading: boolean;
  options: StickerOptions;
}

const STORAGE_KEY = 'stickerState';

const loadStateFromLocalStorage = (): StickerState | null => {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveStateToLocalStorage = (state: StickerState) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Error saving sticker state:', e);
  }
};

const defaultOptions: StickerOptions = {
  color: { name: 'سفید', value: 'white' },
  fontFamily: 'IRANYekan',
  letterSpacing: 3,
  textAlign: 'center',
  fontWeight: 'normal',
  fontStyle: 'normal',
  bodyBackground: 'white lightgray',
};

const persistedState = loadStateFromLocalStorage();

const initialState: StickerState = persistedState || {
  text: '',
  loading: false,
  options: defaultOptions,
};

const stickerSlice = createSlice({
  name: 'sticker',
  initialState,
  reducers: {
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
      saveStateToLocalStorage(state);
    },

    setColorStart(state) {
      state.loading = true;
    },
    setColorSuccess(state, action: PayloadAction<ColorItemType | null>) {
      state.options.color = action.payload;
      state.loading = false;
      saveStateToLocalStorage(state);
    },

    setFontStart(state) {
      state.loading = true;
    },
    setFontSuccess(state, action: PayloadAction<string>) {
      state.options.fontFamily = action.payload;
      state.loading = false;
      saveStateToLocalStorage(state);
    },

    setLetterSpacing(state, action: PayloadAction<number>) {
      state.options.letterSpacing = action.payload;
      saveStateToLocalStorage(state);
    },

    setTextAlign(state, action: PayloadAction<'left' | 'center' | 'right'>) {
      state.options.textAlign = action.payload;
      saveStateToLocalStorage(state);
    },

    toggleFontWeight(state) {
      state.options.fontWeight = state.options.fontWeight === 'bold' ? 'normal' : 'bold';
      saveStateToLocalStorage(state);
    },

    toggleFontStyle(state) {
      state.options.fontStyle = state.options.fontStyle === 'italic' ? 'normal' : 'italic';
      saveStateToLocalStorage(state);
    },

    setBodyBackground(state, action: PayloadAction<string>) {
      state.options.bodyBackground = action.payload;
      saveStateToLocalStorage(state);
    },

    resetStickerState() {
      if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
      return {
        text: '',
        loading: false,
        options: defaultOptions,
      };
    },
  },
});

export const {
  setText,
  setColorStart,
  setColorSuccess,
  setFontStart,
  setFontSuccess,
  setLetterSpacing,
  setTextAlign,
  toggleFontWeight,
  toggleFontStyle,
  setBodyBackground,
  resetStickerState,
} = stickerSlice.actions;

export default stickerSlice.reducer;
