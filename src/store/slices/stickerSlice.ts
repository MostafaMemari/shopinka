import { ColorOptions } from '@/types/color/colorType';
import { FontOptions } from '@/types/font/fontType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StickerOptions {
  color: ColorOptions & { id?: number };
  font: FontOptions & { id?: number };
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right';
}

interface StickerState {
  text: string;
  loading: boolean;
  options: StickerOptions | null;
}

const STORAGE_KEY = 'stickerState';

// ---------------- LOCAL STORAGE --------------------

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

// ---------------- INITIAL STATE --------------------

const persistedState = loadStateFromLocalStorage();

const initialState: StickerState = persistedState || {
  text: '',
  loading: false,
  options: null,
};

// ---------------- SLICE ----------------------------

const stickerSlice = createSlice({
  name: 'sticker',
  initialState,
  reducers: {
    setInitialOptions(state, action: PayloadAction<StickerOptions>) {
      state.options = action.payload;
      saveStateToLocalStorage(state);
    },

    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
      saveStateToLocalStorage(state);
    },

    setColorStart(state) {
      state.loading = true;
    },
    setColorSuccess(state, action: PayloadAction<ColorOptions & { id: number }>) {
      if (state.options) {
        state.options.color = action.payload;
      }
      state.loading = false;
      saveStateToLocalStorage(state);
    },

    setFontStart(state) {
      state.loading = true;
    },
    setFontSuccess(state, action: PayloadAction<FontOptions & { id: number }>) {
      if (state.options) {
        state.options.font = action.payload;
      }
      state.loading = false;
      saveStateToLocalStorage(state);
    },

    setLetterSpacing(state, action: PayloadAction<number>) {
      if (state.options) {
        state.options.letterSpacing = action.payload;
      }
      saveStateToLocalStorage(state);
    },

    setTextAlign(state, action: PayloadAction<'left' | 'center' | 'right'>) {
      if (state.options) {
        state.options.textAlign = action.payload;
      }
      saveStateToLocalStorage(state);
    },

    toggleFontWeight(state) {
      if (state.options) {
        state.options.font.weight = state.options.font.weight === 'bold' ? 'normal' : 'bold';
      }
      saveStateToLocalStorage(state);
    },

    toggleFontStyle(state) {
      if (state.options) {
        state.options.font.style = state.options.font.style === 'italic' ? 'normal' : 'italic';
      }
      saveStateToLocalStorage(state);
    },

    resetStickerState() {
      if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
      return {
        text: '',
        loading: false,
        options: null,
      };
    },
  },
});

export const {
  setInitialOptions,
  setText,
  setColorStart,
  setColorSuccess,
  setFontStart,
  setFontSuccess,
  setLetterSpacing,
  setTextAlign,
  toggleFontWeight,
  toggleFontStyle,
  resetStickerState,
} = stickerSlice.actions;

export default stickerSlice.reducer;
