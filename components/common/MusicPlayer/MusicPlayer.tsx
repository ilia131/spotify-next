"use client";

import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { playNext } from "@/redux/features/playerSlice";
import ButtonsMusicPlayer from "./ButtonsMusicPlayer";

const MusicPlayer = () => {
  const dispatch = useAppDispatch();
  const { queue, currentIndex, isPlaying } = useAppSelector((s) => s.player);
  const currentSong = queue[currentIndex];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0); 

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const percent =
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(percent || 0);
  };

  return (
    <section className="fixed  w-[96.5%] left-2.25 right-2.5  bg-linear-to-t from-[rgba(92,88,76,1)]  to-[rgba(92,88,76,1)]  
       bottom-22 h-14.25  z-4 rounded-[11px] flex pl-2 items-center justify-between pr-4.75 shrink-0">

      <ButtonsMusicPlayer />
      <audio
        ref={audioRef}
        src={currentSong?.track}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => dispatch(playNext())}
      />
       <div className="w-full pr-4 pl-3.25 bg-[rgba(255,255,255,0.5)] h-0.5 mt-13.5 rounded-[1px] shrink-0 relative">
        <div
          className="w-full  bg-[rgba(255,255,255,0.5)] h-0.5 absolute left-0    transition-all duration-300 rounded-[1px]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
};

export default MusicPlayer;
