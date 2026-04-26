"use client";

import { useDominantColorFromImage } from "@/shared/hooks/useDominantColorFromImage"
import ButtonsImageMusicPlayer from "./ButtonsImageMusicPlayer";
import MusicBarMp from "./MusicBarMp";
import { cn } from "@/utils/cn";
import { Song } from "@/redux/features/playerSlice";
import { useAppSelector } from "@/redux/hook";
interface MiniPlayerProps {
  currentSong: Song
  progress: number;
  onOpenCover: () => void;
}

const MiniPlayer = ({
  currentSong,
  progress,
  onOpenCover,
}: MiniPlayerProps) => {

  useDominantColorFromImage(currentSong?.image_url)
  const { color } = useAppSelector(state => state.player)

  return (
    <aside
      className={cn(
        "fixed left-[50.5%] -translate-x-1/2",
        "w-[min(408px,96vw)]",
        "bottom-22 h-14.25 z-4 rounded-[11px]",
        "flex pl-2 items-center justify-between pr-4.75 shrink-0"
      )}
      style={{
        background: `
          linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)),
          ${color}
        `,
        transition: "background 600ms ease"
      }}
      onClick={onOpenCover}
    >
      <ButtonsImageMusicPlayer currentSong={currentSong} />
      <MusicBarMp progress={progress} />
    </aside>
  );
};

export default MiniPlayer;
