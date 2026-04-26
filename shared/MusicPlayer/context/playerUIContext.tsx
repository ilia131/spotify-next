"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface PlayerUIContextType {
  isCoverOpen: boolean
  isLyricsOpen: boolean
  openCover: () => void
  closeCover: () => void
  openLyrics: () => void
  closeLyrics: () => void
  toggleLyrics: () => void
}

const PlayerUIContext = createContext<PlayerUIContextType | null>(null)

export const PlayerUIProvider = ({ children }: { children: ReactNode }) => {
  const [isCoverOpen, setIsCoverOpen] = useState(false)
  const [isLyricsOpen, setIsLyricsOpen] = useState(false)

  const openCover = () => setIsCoverOpen(true)
  const closeCover = () => setIsCoverOpen(false)

  const openLyrics = () => setIsLyricsOpen(true)
  const closeLyrics = () => setIsLyricsOpen(false)
  const toggleLyrics = () => setIsLyricsOpen(prev => !prev)

  return (
    <PlayerUIContext.Provider
      value={{
        isCoverOpen,
        isLyricsOpen,
        openCover,
        closeCover,
        openLyrics,
        closeLyrics,
        toggleLyrics
      }}
    >
      {children}
    </PlayerUIContext.Provider>
  )
}

export const usePlayerUI = () => {
  const context = useContext(PlayerUIContext)
  if (!context) {
    throw new Error("usePlayerUI must be used inside PlayerUIProvider")
  }
  return context
}
