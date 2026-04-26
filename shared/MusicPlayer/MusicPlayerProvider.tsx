"use client"

import { PlayerUIProvider } from "./context/playerUIContext"
import MusicPlayer from "./MusicPlayer"

export default function MusicPlayerProvider() {
  return (
    <PlayerUIProvider>
      <MusicPlayer />
    </PlayerUIProvider>
  )
}
