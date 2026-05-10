import { Song } from "@/redux/features/playerSlice";
import Image from "next/image";



interface PlaylistCoverGridProps {
  tracks: {song :Song}[];
}

export const PlaylistCoverGrid = ({ tracks }: PlaylistCoverGridProps) => {
  const covers: string[] = tracks.slice(0, 4).map((t) => t.song.image_url);

  const grid: Record<number, string> = {
    1: "grid-cols-1 grid-rows-1",
    2: "grid-cols-2 grid-rows-1",
    3: "grid-cols-2 grid-rows-2",
    4: "grid-cols-2 grid-rows-2",
  };

  const layout = grid[covers.length] ?? grid[4];

  return (
    <div
      className={`w-17.5 h-17.5 rounded-xl bg-[#2a2a2a] grid ${layout} overflow-hidden`}
    >
      {covers.map((src: string, i: number) => (
        <Image
          key={i}
          src={src}
          width={70}
          height={70}
          alt="cover"
          className="w-full h-full object-cover"
        />
      ))}

      {covers.length === 3 && <div className="bg-[#333]" />}
    </div>
  );
};
