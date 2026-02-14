"use client";

import { useState , useCallback  } from "react";
import { useAudioPlayer } from "@/hooks/audiohooks/useAudioPlayer";
import { useAppSelector } from "@/redux/hook";
import CoverMusicPlayer from "./CoverMusicPlayer/CoverMusicPlayer";
import MiniPlayer from "./MiniPlayer";
const MusicPlayer = () => {
  const [open, setOpen] = useState(false);

  const { queue, currentIndex, isPlaying } = useAppSelector((s) => s.player);
  const currentSong = queue[currentIndex];

  const {
    audioRef,
    progress,
    currentTime,
    duration,
    handleTimeUpdate,
    handleSeek,
    formatTime,
  } = useAudioPlayer(currentSong, isPlaying);
  
  const handleOpenCover = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseCover = useCallback(() => {
    setOpen(false);
  }, []);

  return (
   <>
    <MiniPlayer
        currentSong={currentSong}
        audioRef={audioRef}
        progress={progress}
        handleTimeUpdate={handleTimeUpdate}
        onOpenCover={handleOpenCover}
      />
    
         {open && (
          <div className="h-screen ">
                <CoverMusicPlayer 
                    
                    onClose={handleCloseCover}
                    currentSong={currentSong}
                    progress={progress}
                    lowerTime={formatTime(currentTime)}
                    higherTime={formatTime(duration)}
                    handleSeek={handleSeek}
                />
           </div>
         )}
    
  </>
  );
};

export default MusicPlayer;
