"use client";

import { useState } from "react";
import { useGetArtistSongsQuery } from "@/redux/services/artistContentApiSlice";
import { useParams } from "next/navigation";
import MusicRowCard from "@/components/Artist/ArtistTabs/MusicRowCard";
import { Song } from "@/redux/features/playerSlice";
import { useInView } from "react-intersection-observer";

export default function ArtistSongsPage() {
  const params = useParams<{ artistname: string }>();
  const artistname = decodeURIComponent(params.artistname);

  const [cursor, setCursor] = useState<string | null>(null);

  const { ref, inView } = useInView({ threshold: 0 });

  const { data, isLoading, isFetching } = useGetArtistSongsQuery({
    artistname,
    cursor,
  });

  // load next page
  if (inView && data?.next && !isFetching) {
    const nextCursor = new URL(data.next).searchParams.get("cursor");
    if (nextCursor && nextCursor !== cursor) {
      setCursor(nextCursor);
    }
  }

  const songs: Song[] = data?.results ?? [];

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Songs</h1>

      <div className="flex flex-col gap-4">
        {songs.map((song, i) => (
          <MusicRowCard
            songs={songs}
            index={i}
            item={song}
            key={song.id}
          />
        ))}
      </div>

      {(isLoading || isFetching) && (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      <div ref={ref} className="h-10" />
    </div>
  );
}
