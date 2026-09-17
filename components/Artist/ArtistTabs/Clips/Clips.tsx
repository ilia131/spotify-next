"use client";

import { useEffect, useState } from "react";

import { Shorts } from "@/redux/services/artistApislice";
import { useAppDispatch } from "@/redux/hook";
import { setVideoPlaying } from "@/redux/features/playerSlice";

import ReelsViewer from "@/features/explore/ui/reels-viewer";
import { useLanguage } from "@/i18n/LanguageProvider";

import TitleMusic from "../TitleMusic";
import ShortVideo from "../../ArtistButtons/ShortVideo";

interface ShortVideosProps {
  shortvideo?: Shorts[];
  artistname: string;
}

const Clip = ({
  shortvideo,
  artistname,
}: ShortVideosProps) => {
  const { t } = useLanguage();

  const dispatch = useAppDispatch();

  const [activeIndex, setActiveIndex] =
    useState<number | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [renderCount, setRenderCount] = useState(4);

  const videos = shortvideo ?? [];

  // =========================================================
  // Loading simulation / data readiness
  // =========================================================

  useEffect(() => {
    if (shortvideo !== undefined) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 250);

      return () => clearTimeout(timer);
    }

    setIsLoading(true);
  }, [shortvideo]);

  // =========================================================
  // Progressive rendering
  // =========================================================

  useEffect(() => {
    if (!videos.length) return;

    setRenderCount(Math.min(4, videos.length));

    if (videos.length <= 4) return;

    const timer = setTimeout(() => {
      setRenderCount(videos.length);
    }, 150);

    return () => clearTimeout(timer);
  }, [videos.length]);

  // =========================================================
  // No videos
  // =========================================================

  if (!isLoading && !videos.length) {
    return null;
  }

  // =========================================================
  // Skeleton
  // =========================================================

  if (isLoading) {
    return (
      <section
        className="
          grid
          pl-4.5
          pt-5.25
          pr-4
          gap-2.25
          mb-50
        "
      >
        <div className="flex items-center justify-between">
          <div
            className="
              h-5
              w-24
              rounded-md
              bg-white/10
              animate-pulse
            "
          />

          <div
            className="
              h-4
              w-14
              rounded-md
              bg-white/5
              animate-pulse
            "
          />
        </div>

        <div
          className="
            flex
            h-45.75
            gap-4.5
            overflow-hidden
          "
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="
                h-45.75
                w-30
                shrink-0
                rounded-xl
                bg-white/[0.06]
                animate-pulse
              "
            >
              <div className="h-full w-full rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.01]" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // =========================================================
  // Render
  // =========================================================

  return (
    <>
      <section
        className="
          grid
          pl-4.5
          pt-5.25
          pr-4
          gap-2.25
          mb-50
        "
      >
        {/* <TitleMusic title={t("artist.clips")} /> */}

        <div
          className="
            flex
            h-45.75
            gap-4.5
            overflow-x-auto
            hide-scrollbar
            scroll-smooth
            snap-x
            snap-mandatory
          "
        >
          {videos
            .slice(0, renderCount)
            .map((item, index) => (
              <div
                key={item.uuid}
                className="
                  shrink-0
                  snap-start
                  animate-[fadeIn_.3s_ease]
                "
              >
                <ShortVideo
                  item={item}
                  i={index}
                  videos={videos}
                  onOpen={(index) => {
                    dispatch(setVideoPlaying());
                    setActiveIndex(index);
                  }}
                />
              </div>
            ))}

          {/* Loading more */}
          {renderCount < videos.length && (
            <>
              {Array.from({
                length: Math.min(
                  2,
                  videos.length - renderCount
                ),
              }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="
                    h-45.75
                    w-30
                    shrink-0
                    rounded-xl
                    bg-white/[0.06]
                    animate-pulse
                  "
                />
              ))}
            </>
          )}
        </div>
      </section>

      {/* =====================================================
          Reels Viewer
      ===================================================== */}

      {activeIndex !== null && (
        <ReelsViewer
          videos={videos}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
};

export default Clip;