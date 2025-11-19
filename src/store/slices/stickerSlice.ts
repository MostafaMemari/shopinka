import { ColorItemType } from '@/features/stickerMaker/color/ColorGrid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EffectValue {
  stroke?: { color: string; width: number };
  shadow?: {
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
    affectStroke: boolean;
    nonScaling: boolean;
  };
}

interface EffectOption {
  id: string;
  title: string;
  value: EffectValue;
}

interface StickerOptions {
  color: ColorItemType | null;
  fontFamily: string;
  lineHeight: number;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right';
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  effect: EffectOption | null;
  bodyBackground: string;
}

interface StickerState {
  text: string;
  downloading: boolean;
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
  color: null,
  fontFamily: 'IRANYekan',
  lineHeight: 1.2,
  letterSpacing: 3,
  textAlign: 'center',
  fontWeight: 'normal',
  fontStyle: 'normal',
  effect: null,
  bodyBackground: '#ffffff',
};

const persistedState = loadStateFromLocalStorage();

const initialState: StickerState = persistedState || {
  text: '',
  downloading: false,
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
    setDownloading(state, action: PayloadAction<boolean>) {
      state.downloading = action.payload;
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
    setLineHeight(state, action: PayloadAction<number>) {
      state.options.lineHeight = action.payload;
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

    setEffect(state, action: PayloadAction<EffectOption | null>) {
      state.options.effect = action.payload;
      saveStateToLocalStorage(state);
    },

    resetStickerState() {
      if (typeof window !== 'undefined') localStorage.removeItem(STORAGE_KEY);
      return {
        text: '',
        downloading: false,
        loading: false,
        options: defaultOptions,
      };
    },
  },
});

export const {
  setText,
  setDownloading,
  setColorStart,
  setColorSuccess,
  setFontStart,
  setFontSuccess,
  setLetterSpacing,
  setLineHeight,
  setTextAlign,
  toggleFontWeight,
  toggleFontStyle,
  setBodyBackground,
  setEffect,
  resetStickerState,
} = stickerSlice.actions;

export default stickerSlice.reducer;
