import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorItem } from '@/features/stickerMaker/StickerMakerView';

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
  color: ColorItem | null;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right';
  effect: EffectOption | null;
  bodyBackground: string;
}

interface StickerState {
  text: string;
  downloading: boolean;
  loading: boolean;
  options: StickerOptions;
}

// 🔸 توابع کمکی برای ذخیره و لود از localStorage
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
  fontFamily: 'x_uf_1037',
  fontSize: 52,
  lineHeight: 1.2,
  letterSpacing: 3,
  textAlign: 'right',
  effect: null,
  bodyBackground: '#ffffff',
};

// 🔸 بارگذاری اولیه از localStorage (در صورت وجود)
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

    // رنگ
    setColorStart(state) {
      state.loading = true;
    },
    setColorSuccess(state, action: PayloadAction<ColorItem | null>) {
      state.options.color = action.payload;
      state.loading = false;
      saveStateToLocalStorage(state);
    },

    // فونت
    setFontStart(state) {
      state.loading = true;
    },
    setFontSuccess(state, action: PayloadAction<string>) {
      state.options.fontFamily = action.payload;
      state.loading = false;
      saveStateToLocalStorage(state);
    },

    // اندازه و فاصله
    setFontSize(state, action: PayloadAction<number>) {
      state.options.fontSize = action.payload;
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

    // چینش
    setTextAlign(state, action: PayloadAction<'left' | 'center' | 'right'>) {
      state.options.textAlign = action.payload;
      saveStateToLocalStorage(state);
    },

    // پس‌زمینه
    setBodyBackground(state, action: PayloadAction<string>) {
      state.options.bodyBackground = action.payload;
      saveStateToLocalStorage(state);
    },

    // افکت
    setEffect(state, action: PayloadAction<EffectOption | null>) {
      state.options.effect = action.payload;
      saveStateToLocalStorage(state);
    },

    // حذف همه داده‌ها
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
  setFontSize,
  setLetterSpacing,
  setLineHeight,
  setTextAlign,
  setBodyBackground,
  setEffect,
  resetStickerState,
} = stickerSlice.actions;

export default stickerSlice.reducer;
