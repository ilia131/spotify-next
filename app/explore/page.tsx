"use client";

import { useState } from "react";
import ExploreGrid from "@/features/explore/ui/explore-grid";
import ReelsViewer from "@/features/explore/ui/reels-viewer";
import { useAppDispatch } from "@/redux/hook";
import { setVideoPlaying} from "@/redux/features/playerSlice";
import { Shorts } from "@/redux/services/artistApislice";



export default function ExplorePage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [videos, setVideos] = useState<Shorts[]>([]);
  
  const dispatch = useAppDispatch()
  return (
    <main>
      <ExploreGrid
        onOpen={(index, allVideos) => {
          setVideos(allVideos);
          dispatch(setVideoPlaying());
          setActiveIndex(index);
        }}
      />

      {activeIndex !== null && (
        <ReelsViewer
          videos={videos}
          startIndex={activeIndex}
          onClose={() => {
            setActiveIndex(null);
          }}
        />
      )}
    </main>
  );
}
