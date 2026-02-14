"use client";

import { useAppDispatch } from "@/redux/hook";
import { playNext } from "@/redux/features/playerSlice";
import ButtonsImageMusicPlayer from "./ButtonsImageMusicPlayer";
import MusicBarMp from "./MusicBarMp";
import { cn } from "@/utils/cn";
import { Song } from "@/redux/features/playerSlice";

interface MiniPlayerProps {
  currentSong: Song
  audioRef: React.RefObject<HTMLAudioElement | null>;
  progress: number;
  handleTimeUpdate: () => void;
  onOpenCover: () => void;
}

const MiniPlayer = ({
  currentSong,
  audioRef,
  progress,
  handleTimeUpdate,
  onOpenCover,
}: MiniPlayerProps) => {
  const dispatch = useAppDispatch();

  return (
    <aside
      className={cn(
        "fixed w-[96.5%] left-2.25 right-2.5",
        "bg-linear-to-t from-[rgba(92,88,76,1)] to-[rgba(92,88,76,1)]",
        "bottom-22 h-14.25 z-4 rounded-[11px]",
        "flex pl-2 items-center justify-between pr-4.75 shrink-0"
      )}
    >
      <ButtonsImageMusicPlayer onClick={onOpenCover} currentSong={currentSong} />

      <audio
        ref={audioRef}
        src={currentSong?.track}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => dispatch(playNext())}
      />

      <MusicBarMp progress={progress}  />
    </aside>
  );
};

export default MiniPlayer;
