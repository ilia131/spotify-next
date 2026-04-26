import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isMenuOpen: boolean;
}

const initialState: UIState = {
  isMenuOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openMenu: (state) => {
      state.isMenuOpen = true;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export const { openMenu, closeMenu, toggleMenu } = uiSlice.actions;
export default uiSlice.reducer;