"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import images from "@/public/images";
import {
  useArtistDetailQuery,
  Shorts,
} from "@/redux/services/artistApislice";
import ReelsViewer from "@/features/explore/ui/reels-viewer";


const IconShortClip = () => {
  const params = useParams<{ artistname: string }>();

  const artistname = params.artistname
    ? decodeURIComponent(params.artistname)
    : "";

  const { data } = useArtistDetailQuery(artistname, {
    skip: !artistname,
  });

  const shorts = data?.shorts ?? [];

  // آخرین Short
  const latestShort = shorts[shorts.length - 1];

  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [isReelsOpen, setIsReelsOpen] = useState(false);

  // =========================================================
  // Generate thumbnail from video
  // =========================================================

  useEffect(() => {
    if (!latestShort?.video_url) {
      setThumbnail(null);
      return;
    }

    const video = document.createElement("video");

    video.src = latestShort.video_url;
    video.crossOrigin = "anonymous";
    video.preload = "metadata";
    video.muted = true;

    const handleLoadedMetadata = () => {
      video.currentTime = 0.1;
    };

    const handleSeeked = () => {
      const canvas = document.createElement("canvas");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");

      if (!context) return;

      context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
      );

      setThumbnail(
        canvas.toDataURL("image/jpeg", 0.85)
      );
    };

    video.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    video.addEventListener(
      "seeked",
      handleSeeked
    );

    return () => {
      video.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      video.removeEventListener(
        "seeked",
        handleSeeked
      );

      video.src = "";
    };
  }, [latestShort?.video_url]);

  // =========================================================
  // No Short
  // =========================================================

  if (!latestShort) {
    return (
      <Image
        src={images.vini}
        width={32}
        height={40}
        alt="shortartist"
        unoptimized
        className="
          h-10
          w-8
          rounded-md
          border-[1.5px]
          border-solid
          border-[rgba(255,255,255,0.8)]
          object-cover
        "
      />
    );
  }

  // =========================================================
  // Convert API Short -> ReelsViewer Short
  // =========================================================

  const reelVideo: Shorts = {
    ...latestShort,
    video: latestShort.video_url,
  };

  // =========================================================
  // Render
  // =========================================================

  return (
    <>
      <button
        type="button"
        onClick={() => setIsReelsOpen(true)}
        className="
          relative
          h-10
          w-8
          shrink-0
          overflow-hidden
          rounded-md
          transition-transform
          active:scale-95
        "
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={`${data?.artistname ?? "artist"} short`}
            className="
              h-10
              w-8
              rounded-md
              border-[1.5px]
              border-solid
              border-[rgba(255,255,255,0.8)]
              object-cover
            "
          />
        ) : (
          <Image
            src={images.vini}
            width={32}
            height={40}
            alt="shortartist"
            unoptimized
            className="
              h-10
              w-8
              rounded-md
              border-[1.5px]
              border-solid
              border-[rgba(255,255,255,0.8)]
              object-cover
            "
          />
        )}
      </button>

      {/* =====================================================
          Reels Viewer
      ===================================================== */}

      {isReelsOpen && (
        <ReelsViewer
          videos={[reelVideo]}
          startIndex={0}
          onClose={() => setIsReelsOpen(false)}
        />
      )}
    </>
  );
};

export default IconShortClip;