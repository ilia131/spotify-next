"use client";

import { useAppSelector } from "@/redux/hook";

import CoverMusicPlayer from "./CoverMusicPlayer/CoverMusicPlayer";
import MiniPlayer from "./MiniPlayer";

import {
  usePlayerUI,
} from "./context/playerUIContext";

import { useAudioPlayer } from "@/entities/artist/hooks/useAudioPlayer";

import AudioAd from "@/components/player/AudioAd";

const MusicPlayer = () => {
  const {
    isCoverOpen,
    openCover,
    closeCover,
  } = usePlayerUI();

  const {
    seekFromEvent,
    formatTime,

    handleNext,
    handlePrevious,

    showAd,
    currentAd,
    handleAdFinished,
  } = useAudioPlayer();

  const {
    progress,
    currentTime,
    duration,
    buffered,
    queue,
    currentIndex,
  } = useAppSelector(
    (state) => state.player
  );

  const currentSong =
    queue[currentIndex];

  return (
    <>
      <MiniPlayer
        currentSong={currentSong}
        progress={progress}
        onOpenCover={openCover}
        // onNext={skipNext}
      />

      {isCoverOpen && (
        <div className="h-screen">
          <CoverMusicPlayer
            buffered={buffered}
            onClose={closeCover}
            currentSong={currentSong}
            progress={progress}
            lowerTime={formatTime(currentTime)}
            higherTime={formatTime(duration)}
            handleSeek={seekFromEvent}
            onNext={
              handleNext
            }

            /*
             * Previous
             *
             * همان شمارنده Skip را استفاده می‌کند.
             */

            onPrevious={
              handlePrevious
            }
          />
        </div>
      )}

      {showAd && currentAd && (
        <AudioAd
          ad={currentAd}
          onFinished={handleAdFinished}
        />
      )}
    </>
  );
};

export default MusicPlayer;