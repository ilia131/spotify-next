import { Song } from "@/redux/features/playerSlice";
import Image from "next/image";

interface PlaylistCoverGridProps {
  tracks: {
    song: Song;
  }[];
}

export const PlaylistCoverGrid = ({
  tracks,
}: PlaylistCoverGridProps) => {
  const covers = tracks
    .slice(0, 4)
    .map((track) => {
      return (
        track.song.image_url ||
        track.song.image_url ||
        // track.song.album_name?.cover ||
        ""
      );
    })
    .filter(Boolean);

  const grid: Record<number, string> = {
    1: "grid-cols-1 grid-rows-1",
    2: "grid-cols-2 grid-rows-1",
    3: "grid-cols-2 grid-rows-2",
    4: "grid-cols-2 grid-rows-2",
  };

  const layout =
    grid[covers.length] ?? grid[4];

  return (
    <div
      className={`
        relative
        grid
        ${layout}
        w-[70px]
        h-[70px]
        overflow-hidden
        rounded-xl
        bg-[#2a2a2a]
      `}
    >
      {covers.length === 0 && (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#5c0569] to-[#191919]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 18V5L21 3V16"
              stroke="white"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <circle
              cx="6"
              cy="18"
              r="3"
              stroke="white"
              strokeWidth="1.7"
            />

            <circle
              cx="18"
              cy="16"
              r="3"
              stroke="white"
              strokeWidth="1.7"
            />
          </svg>
        </div>
      )}

      {covers.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className="relative min-h-0 min-w-0 overflow-hidden"
        >
          <Image
            src={src}
            alt="Playlist cover"
            fill
            sizes="70px"
            className="object-cover"
          />
        </div>
      ))}

      {covers.length === 3 && (
        <div className="bg-[#333]" />
      )}
    </div>
  );
};