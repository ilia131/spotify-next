import { createSlice } from "@reduxjs/toolkit";

interface PlaylistModalState {
  isOpen: boolean;
};

const initialState: PlaylistModalState = {
  isOpen: false,
};

const playlistModalSlice = createSlice({
  name: "playlistModal",
  initialState,
  reducers: {
    openPlaylistModal: (state) => {
      state.isOpen = true;
    },
    closePlaylistModal: (state) => {
      state.isOpen = false;
    },
    togglePlaylistModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  openPlaylistModal,
  closePlaylistModal,
  togglePlaylistModal
} = playlistModalSlice.actions;

export default playlistModalSlice.reducer;
