// store/slices/musicOptionsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Song {
  uuid: string
  title: string
  artist: string
}

interface MusicOptionsState {
  isOpen: boolean
  song: Song | null
}

const initialState: MusicOptionsState = {
  isOpen: false,
  song: null
}

const musicOptionsSlice = createSlice({
  name: "musicOptions",
  initialState,
  reducers: {
    openMusicOptions: (state, action: PayloadAction<Song>) => {
      state.song = action.payload
      state.isOpen = true
    },
    closeMusicOptions: (state) => {
      state.isOpen = false
      state.song = null
    }
  }
})

export const { openMusicOptions, closeMusicOptions } = musicOptionsSlice.actions
export default musicOptionsSlice.reducer
