import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StickerOptions {
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right';
  weight: 'normal' | 'bold';
  style: 'normal' | 'italic';
}

interface StickerState {
  text: string;
  loading: boolean;
  materialId: number | null;
  fontId: number | null;
  options: StickerOptions;
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
  materialId: null,
  fontId: null,
  options: {
    letterSpacing: 0,
    textAlign: 'left',
    weight: 'normal',
    style: 'normal',
  },
};

// ---------------- SLICE ----------------------------

const stickerSlice = createSlice({
  name: 'sticker',
  initialState,
  reducers: {
    setInitialOptions(state, action: PayloadAction<StickerOptions>) {
      state.options = { ...action.payload };
      saveStateToLocalStorage(state);
    },

    setText(state, action: PayloadAction<string>) {
      state.text = action.payload;
      saveStateToLocalStorage(state);
    },

    setColorStart(state) {
      state.loading = true;
    },
    setColorSuccess(state, action: PayloadAction<number>) {
      state.materialId = action.payload;
      state.loading = false;
      saveStateToLocalStorage(state);
    },

    setFontStart(state) {
      state.loading = true;
    },
    setFontSuccess(state, action: PayloadAction<number>) {
      state.fontId = action.payload;
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
      state.options.weight = state.options.weight === 'bold' ? 'normal' : 'bold';
      saveStateToLocalStorage(state);
    },

    toggleFontStyle(state) {
      state.options.style = state.options.style === 'italic' ? 'normal' : 'italic';
      saveStateToLocalStorage(state);
    },

    resetStickerState(state, action: PayloadAction<{ materialId?: number; fontId?: number } | undefined>) {
      if (state.loading) return state;

      const newState: StickerState = {
        text: '',
        loading: false,
        materialId: action?.payload?.materialId ?? 0,
        fontId: action?.payload?.fontId ?? 0,
        options: {
          letterSpacing: 0,
          textAlign: 'left',
          weight: 'normal',
          style: 'normal',
        },
      };

      saveStateToLocalStorage(newState);
      return newState;
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
