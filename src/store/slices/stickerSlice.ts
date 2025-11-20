import { ColorItemType } from '@/types/color/colorType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// -----------------------------
// Interfaces
// -----------------------------

interface FontOptions {
  family: string;
  weight: 'normal' | 'bold';
  style: 'normal' | 'italic';
  lineHeight: number;
}

interface StickerOptions {
  color: ColorItemType | null;
  font: FontOptions;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right';
}

interface StickerState {
  text: string;
  loading: boolean;
  options: StickerOptions;
}

// -----------------------------
// LocalStorage
// -----------------------------

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

// -----------------------------
// Default Options
// -----------------------------

const defaultOptions: StickerOptions = {
  color: { name: 'سفید', value: 'white', backgroundMode: { from: 'rgba(0,0,0,0.25)', to: 'rgba(0,0,0,0.1)' } },

  font: {
    family: 'IRANYekan',
    weight: 'normal',
    style: 'normal',
    lineHeight: 1.5,
  },

  letterSpacing: 3,
  textAlign: 'center',
};

const persistedState = loadStateFromLocalStorage();

const initialState: StickerState = persistedState || {
  text: '',
  loading: false,
  options: defaultOptions,
};

// -----------------------------
// Slice
// -----------------------------

const stickerSlice = createSlice({
  name: 'sticker',
  initialState,
  reducers: {
    // Text
    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
      saveStateToLocalStorage(state);
    },

    // Color
    setColorStart(state) {
      state.loading = true;
    },
    setColorSuccess(state, action: PayloadAction<ColorItemType | null>) {
      state.options.color = action.payload;
      state.loading = false;
      saveStateToLocalStorage(state);
    },

    // Font Family
    setFontStart(state) {
      state.loading = true;
    },
    setFontSuccess(state, action: PayloadAction<string>) {
      state.options.font.family = action.payload;
      state.loading = false;
      saveStateToLocalStorage(state);
    },

    // Font Weight
    toggleFontWeight(state) {
      state.options.font.weight = state.options.font.weight === 'bold' ? 'normal' : 'bold';
      saveStateToLocalStorage(state);
    },

    // Font Style
    toggleFontStyle(state) {
      state.options.font.style = state.options.font.style === 'italic' ? 'normal' : 'italic';
      saveStateToLocalStorage(state);
    },

    // Line height
    setFontLineHeight(state, action: PayloadAction<number>) {
      state.options.font.lineHeight = action.payload;
      saveStateToLocalStorage(state);
    },

    // Letter spacing
    setLetterSpacing(state, action: PayloadAction<number>) {
      state.options.letterSpacing = action.payload;
      saveStateToLocalStorage(state);
    },

    // Text align
    setTextAlign(state, action: PayloadAction<'left' | 'center' | 'right'>) {
      state.options.textAlign = action.payload;
      saveStateToLocalStorage(state);
    },

    // Reset
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

// -----------------------------
// Exports
// -----------------------------

export const {
  setText,
  setColorStart,
  setColorSuccess,
  setFontStart,
  setFontSuccess,
  toggleFontWeight,
  toggleFontStyle,
  setFontLineHeight,
  setLetterSpacing,
  setTextAlign,
  resetStickerState,
} = stickerSlice.actions;

export default stickerSlice.reducer;
