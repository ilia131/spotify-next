"use client";
import { useAppSelector } from "@/redux/hook";
import CoverMusicPlayer from "./CoverMusicPlayer/CoverMusicPlayer";
import MiniPlayer from "./MiniPlayer";
import { useAudioPlayer } from "@/entities/artist/hooks/useAudioPlayer";
import {   usePlayerUI } from "./context/playerUIContext";
const MusicPlayer = () => {

  const { isCoverOpen  , openCover , closeCover} = usePlayerUI()
  const { seekFromEvent, formatTime } = useAudioPlayer();
  const { progress, currentTime, duration, buffered  , queue , currentIndex} = useAppSelector(
    (state) => state.player
  );

  const currentSong = queue[currentIndex];

  
  return (
   <>
    <MiniPlayer
        currentSong={currentSong}
        progress={progress}
        onOpenCover={openCover}
      />
    
         {isCoverOpen && (
          <div className="h-screen ">
                <CoverMusicPlayer 
                    buffered={buffered}
                    onClose={closeCover}
                    currentSong={currentSong}
                    progress={progress}
                    lowerTime={formatTime(currentTime)}
                    higherTime={formatTime(duration)}
                    handleSeek={seekFromEvent}
                />
           </div>
         )}
    
  </>
  );
};

export default MusicPlayer;
