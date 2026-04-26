import { useRef, useState } from "react";

export const useVideoPreview = (
  videoRefs: React.MutableRefObject<Record<string, HTMLVideoElement | null>>
) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const stopAllVideos = () => {
    Object.values(videoRefs.current).forEach((video) => {
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    });
  };

  const playVideo = (uuid: string) => {
    stopAllVideos();
    setHovered(uuid);

    const video = videoRefs.current[uuid];
    if (!video) return;
    
    video.play().catch(() => {});
  };

  const stopVideo = (uuid: string) => {
    setHovered(null);

    const video = videoRefs.current[uuid];
    if (!video) return;

    video.pause();
  };

  const handleTouchStartPreview = (uuid: string) => {
    longPressTimer.current = setTimeout(() => {
      playVideo(uuid);
    }, 200);
  };

  const handleTouchEndPreview = (uuid: string) => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    stopVideo(uuid);
  };

  return {
    hovered,
    playVideo,
    stopVideo,
    handleTouchStartPreview,
    handleTouchEndPreview,
  };
};
