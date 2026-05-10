import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Song } from "@/redux/features/playerSlice"

interface BottomSheetState {
  isOpen: boolean
  song: Song | null
}

const initialState: BottomSheetState = {
  isOpen: false,
  song: null
}

const bottomSheetSlice = createSlice({
  name: "bottomSheet",
  initialState,
  reducers: {

    openBottomSheet: (state, action: PayloadAction<Song>) => {
      state.isOpen = true
      state.song = action.payload
    },

    closeBottomSheet: (state) => {
      state.isOpen = false
      state.song = null
    }

  }
})

export const { openBottomSheet, closeBottomSheet } = bottomSheetSlice.actions
export default bottomSheetSlice.reducer
