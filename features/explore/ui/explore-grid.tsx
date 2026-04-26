"use client";

import { useEffect, useRef, useState } from "react";
import { useShortVideos } from "../hooks/useShortVideo";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useVideoVisibility } from "../hooks/useVideoVisibility";
import { useVideoPreview } from "../hooks/useVideoPreview";
import { usePullToRefresh } from "../hooks/usePullToRefresh";
import { ExploreGridItem } from "./explore-grid-item";
import ExploreSkeleton from "./explore-skeleton";
import { Shorts } from "@/redux/services/artistApislice";

interface ShortVideo {
  uuid: string;
  video: string;
}

interface Props {
  onOpen: (index: number, videos: Shorts[]) => void;
}

const ExploreGrid = ({ onOpen }: Props) => {
  const { videos, thumbnails, loadVideos, loadMore, loading } = useShortVideos();

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const visibleRange = 20;
  const [renderCount, setRenderCount] = useState(visibleRange);

  const visibleVideos = useVideoVisibility(
    itemRefs,
    videos.slice(0, renderCount)
  );

  const loadMoreRef = useInfiniteScroll(
    loadMore,
    () => setRenderCount((prev) => prev + visibleRange)
  );

  const preview = useVideoPreview(videoRefs);
  const refresh = usePullToRefresh(loadVideos);

  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  return (
    <div
      onTouchStart={refresh.handleTouchStart}
      onTouchMove={refresh.handleTouchMove}
      onTouchEnd={refresh.handleTouchEnd}
    >
      {loading  && (
        <div className="grid items-center py-3 relative">
          <div className="h-6">
            <div className="h-5 w-5 absolute right-1/2 top-2 border-2 border-gray-500 border-t-[#121212] rounded-full animate-spin" />
          </div>
          <ExploreSkeleton />
        </div>
      )}

      {videos.length === 0 && <ExploreSkeleton />}

      <div className="grid grid-cols-3 auto-rows-[140px] gap-0.5">
        {videos.slice(0, renderCount).map((video, index) => {
          const { uuid } = video;
          const thumb = thumbnails[uuid];
          const visible = visibleVideos.has(uuid);

          const patternIndex = index % 10;
          const span = patternIndex === 0 ? "col-span-2 row-span-2" : "";

          return (
            <ExploreGridItem
              key={uuid}
              video={video}
              thumb={thumb}
              visible={visible}
              hovered={preview.hovered}
              span={span}
              onHover={() => preview.playVideo(uuid)}
              onLeave={() => preview.stopVideo(uuid)}
              onTouchStart={() => preview.handleTouchStartPreview(uuid)}
              onTouchEnd={() => preview.handleTouchEndPreview(uuid)}
              onClick={() => onOpen(index, videos)}
              videoRef={(el) => (videoRefs.current[uuid] = el)}
              itemRef={(el) => (itemRefs.current[uuid] = el)}
            />
          );
        })}
      </div>
      <div ref={loadMoreRef} className="h-px w-full" />
    </div>
  );
};

export default ExploreGrid;
