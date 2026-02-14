import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Song = {
  id: number;
  title: string;
  artist: number;
  audioUrl: string ;
  track: string;
  image: string;
  unique_id: string
  play_count:string;
  artist_name:string
  description:string
};

type PlayerState = {
  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
};

const initialState: PlayerState = {
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  volume: 0.8,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setQueue: (state, action: PayloadAction<{ songs: Song[]; startIndex?: number }>) => {
      state.queue = action.payload.songs;
      state.currentIndex = action.payload.startIndex ?? 0;
      state.isPlaying = true;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    playNext: (state) => {
      if (!state.queue.length) return;
      state.currentIndex = (state.currentIndex + 1) % state.queue.length;
      state.isPlaying = true;
    },
    playPrev: (state) => {
      if (!state.queue.length) return;
      state.currentIndex = state.currentIndex === 0 ? state.queue.length - 1 : state.currentIndex - 1;
      state.isPlaying = true;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const { setQueue, togglePlay, playNext, playPrev, setVolume } = playerSlice.actions;
export default playerSlice.reducer;
