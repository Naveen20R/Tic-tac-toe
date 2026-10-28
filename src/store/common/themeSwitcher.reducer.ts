import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PaletteMode } from "@mui/material";
import { handleError } from "../../utils/helpers";

export const THEME_STORAGE_KEY = "ttt-theme-mode";

const getInitialMode = (): PaletteMode => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch (error) {
    handleError(error, "Reading saved theme");
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

interface ThemeState {
  mode: PaletteMode;
}

const initialState: ThemeState = {
  mode: getInitialMode(),
};

const { actions, reducer } = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTheme: (state, action: PayloadAction<PaletteMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = actions;
export default reducer;
