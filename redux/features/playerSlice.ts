import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Shorts } from "../services/artistApislice";

export type Song = {
  album_name: string;
  song: never;
  id: number;
  title: string;
  artist: number;
  audioUrl: string;
  track_url: string;
  image_url: string;
  unique_id: string;
  play_count: string;
  
  artistname?: string;
  shorts:Shorts[]
  lyrics?: {time:number , line:string}[]
  artists:string[]
  description: string;
  type?:string
};

type PlayerState = {
  queue: Song[];
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  mediaType: "music" | "video" | null;
  
  progress: number;
  currentTime: number;
  duration: number;
  buffered: number;
  currentSong: Song | null
  color: string
  darkColor: string
};

const initialState: PlayerState = {
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  volume: 0.8,
  currentSong: null,
  color: "rgb(60,60,60)",
  darkColor: "rgb(30,30,30)",
  mediaType: null,

  progress: 0,
  currentTime: 0,
  duration: 0,
  buffered: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,

  reducers: {
    setQueue: (
      state,
      action: PayloadAction<{ songs: Song[]; startIndex?: number }>
    ) => {
      const { songs, startIndex = 0 } = action.payload;
    
      state.queue = songs;
      state.currentIndex = startIndex;
      state.isPlaying = true;
      state.mediaType = "music";
    },
    setVideoPlaying: (state) => {
      state.mediaType = "video";
      state.isPlaying = false;
    },

    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setPlayerColor: (state, action) => {
      state.color = action.payload.color
      state.darkColor = action.payload.darkColor
    },
    playNext: (state) => {
      if (!state.queue.length) return;

      state.currentIndex = (state.currentIndex + 1) % state.queue.length;
      state.isPlaying = true;
    },

    playPrev: (state) => {
      if (!state.queue.length) return;

      state.currentIndex =
        state.currentIndex === 0
          ? state.queue.length - 1
          : state.currentIndex - 1;

      state.isPlaying = true;
    },

    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },

    setTimeData: (
      state,
      action: PayloadAction<{
        currentTime: number;
        duration: number;
        buffered: number;
      }>
    ) => {
      const { currentTime, duration, buffered } = action.payload;

      state.currentTime = currentTime;
      state.duration = duration;
      state.buffered = buffered * 100;
      state.progress = duration ? (currentTime / duration) * 100 : 0;
    },
  },
});

export const {
  setQueue,
  togglePlay,
  playNext,
  playPrev,
  setVolume,
  setTimeData,
  setPlayerColor,
  setVideoPlaying

} = playerSlice.actions;

export default playerSlice.reducer;
