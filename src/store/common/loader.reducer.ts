import { createSlice } from "@reduxjs/toolkit";

interface LoaderState {
  loadingCount: number; // number of requests in flight
  isVisible: boolean;
}

const initialState: LoaderState = {
  loadingCount: 0,
  isVisible: false,
};

const { actions, reducer } = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loadingCount += 1;
      state.isVisible = true;
    },
    hideLoader: (state) => {
      state.loadingCount = Math.max(0, state.loadingCount - 1);
      state.isVisible = state.loadingCount > 0;
    },
    resetLoader: (state) => {
      state.loadingCount = 0;
      state.isVisible = false;
    },
  },
});

export const { showLoader, hideLoader, resetLoader } = actions;
export default reducer;
