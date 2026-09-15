"use client";

import ShortVideo from "@/components/Artist/ArtistButtons/ShortVideo";
import SearchFilterTitle from "../SearchFilterTitle";
import { Shorts } from "@/redux/services/artistApislice";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import ReelsViewer from "@/features/explore/ui/reels-viewer";
import { setVideoPlaying } from "@/redux/features/playerSlice";

interface Props {
  shortvideo: Shorts[];
  title: string;
  loading?: boolean;
}

const SearchShortVideo = ({
  shortvideo,
  title,
  loading = false,
}: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const displayVideos = shortvideo ?? [];

  return (
    <div className="w-full mt-8.5 flex flex-col gap-4.5 pl-4.25 pr-3.5">
      <SearchFilterTitle title={title} />

      {loading ? (
        <div className="flex h-45.75 w-full items-center justify-center">
          <div
            className="
              h-8
              w-8
              animate-spin
              rounded-full
              border-2
              border-white/20
              border-t-[#1ed760]
            "
          />
        </div>
      ) : displayVideos.length > 0 ? (
        <div className="flex justify-between gap-2 overflow-hidden">
          {displayVideos.map((item, i) => (
            <ShortVideo
              item={item}
              key={item.id || i}
              i={i}
              videos={displayVideos}
              onOpen={(index) => {
                dispatch(setVideoPlaying());
                setActiveIndex(index);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-45.75 items-center justify-center">
          <p className="text-sm text-white/40">
            No clips found
          </p>
        </div>
      )}

      {activeIndex !== null && (
        <ReelsViewer
          videos={displayVideos}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </div>
  );
};

export default SearchShortVideo;