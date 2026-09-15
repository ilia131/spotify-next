"use client";

import { useEffect, useRef, useState } from "react";

import {
  ExternalLink,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import {
  Advertisement,
  useRegisterAdClickMutation,
  useRegisterAdImpressionMutation,
} from "@/redux/services/adsApiSlice";

interface AudioAdProps {
  ad: Advertisement;
  onFinished: () => void;
}

export default function AudioAd({
  ad,
  onFinished,
}: AudioAdProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const sessionIdRef = useRef(crypto.randomUUID());
  const impressionStartedRef = useRef(false);
  const finishedRef = useRef(false);

  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(
    ad.duration || 0
  );
  const [muted, setMuted] = useState(true);

  const [registerImpression] =
    useRegisterAdImpressionMutation();

  const [registerClick] =
    useRegisterAdClickMutation();

  const canSkip = elapsed >= 5;

  /* --------------------------------
     Impression
  -------------------------------- */

  useEffect(() => {
    if (impressionStartedRef.current) return;

    impressionStartedRef.current = true;

    registerImpression({
      ad_id: ad.id,
      session_id: sessionIdRef.current,
      watched_seconds: 0,
      watched_percentage: 0,
      completed: false,
    });
  }, [ad.id, registerImpression]);

  /* --------------------------------
     Finish
  -------------------------------- */

  const finishAd = async (
    completed: boolean
  ) => {
    if (finishedRef.current) return;

    finishedRef.current = true;

    const currentDuration =
      videoRef.current?.duration ||
      duration ||
      ad.duration ||
      0;

    const percentage =
      currentDuration > 0
        ? Math.min(
            100,
            Math.floor(
              (elapsed / currentDuration) * 100
            )
          )
        : 0;

    try {
      await registerImpression({
        ad_id: ad.id,
        session_id: sessionIdRef.current,
        watched_seconds: Math.floor(elapsed),
        watched_percentage: percentage,
        completed,
      }).unwrap();
    } catch {
      // تبلیغ نباید باعث توقف موزیک شود
    }

    onFinished();
  };

  /* --------------------------------
     Video metadata
  -------------------------------- */

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) return;

    setDuration(video.duration || ad.duration || 0);

    video.play().catch((error) => {
      console.error("Video autoplay failed:", error);
    });
  };

  /* --------------------------------
     Video progress
  -------------------------------- */

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) return;

    setElapsed(video.currentTime);
  };

  /* --------------------------------
     Video ended
  -------------------------------- */

  const handleEnded = () => {
    finishAd(true);
  };

  /* --------------------------------
     Skip
  -------------------------------- */

  const handleSkip = () => {
    if (!canSkip) return;

    finishAd(false);
  };

  /* --------------------------------
     Click
  -------------------------------- */
 
  const handleClick = async () => {
    try {
      const result = await registerClick({
        ad_id: ad.id,
        session_id: sessionIdRef.current,
      }).unwrap();

      if (result.target_url) {
        window.open(
          result.target_url,
          "_blank",
          "noopener,noreferrer"
        );

        return;
      }

      if (ad.target_url) {
        window.open(
          ad.target_url,
          "_blank",
          "noopener,noreferrer"
        );
      }
    } catch {
      if (ad.target_url) {
        window.open(
          ad.target_url,
          "_blank",
          "noopener,noreferrer"
        );
      }
    }
  };

  const progress =
    duration > 0
      ? Math.min(
          100,
          (elapsed / duration) * 100
        )
      : 0;

  return (
    <div className="fixed inset-0 z-[99999] bg-black">

      {/* --------------------------------
          REELS CONTAINER
      -------------------------------- */}

      <div className="relative mx-auto h-[100dvh] w-full max-w-[440px] overflow-hidden bg-black">

        {/* --------------------------------
            VIDEO
        -------------------------------- */}

        {ad.ad_type === "VIDEO" && ad.video && (
          <video
            ref={videoRef}
            src={ad.video}
            autoPlay
            muted={muted}
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          />
        )}

        {/* --------------------------------
            IMAGE
        -------------------------------- */}

        {ad.ad_type === "IMAGE" && ad.image && (
          <button
            type="button"
            onClick={handleClick}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={ad.image}
              alt={ad.title}
              className="
                h-full
                w-full
                object-cover
              "
            />
          </button>
        )}

        {/* --------------------------------
            DARK GRADIENT
        -------------------------------- */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            h-1/2
            bg-gradient-to-t
            from-black/90
            via-black/30
            to-transparent
          "
        />

        {/* --------------------------------
            TOP
        -------------------------------- */}

        <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between">

          <div className="rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            Sponsored
          </div>

          <button
            type="button"
            onClick={handleSkip}
            disabled={!canSkip}
            className="
              rounded-full
              bg-black/60
              px-3
              py-2
              text-xs
              text-white
              backdrop-blur-md
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {canSkip ? (
              <span className="flex items-center gap-1.5">
                <X size={14} />
                Skip
              </span>
            ) : (
              `Skip in ${Math.max(
                0,
                5 - Math.floor(elapsed)
              )}`
            )}
          </button>

        </div>

        {/* --------------------------------
            CENTER PLAY INDICATOR
        -------------------------------- */}

        {ad.ad_type === "VIDEO" && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">

            <div className="rounded-full bg-black/20 px-4 py-2 text-xs text-white opacity-0 backdrop-blur-sm">
              Playing
            </div>

          </div>
        )}

        {/* --------------------------------
            BOTTOM CONTENT
        -------------------------------- */}

        <div className="absolute bottom-0 left-0 right-0 z-20 p-5 pb-8 text-white">

          {/* Progress */}

          {ad.ad_type === "VIDEO" && (
            <div className="mb-4 h-1 w-full overflow-hidden rounded-full bg-white/30">

              <div
                className="h-full bg-white transition-all duration-150"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>
          )}

          {/* Title */}

          <div className="mb-4 max-w-[85%]">

            <p className="mb-1 text-xs font-medium text-white/60">
              Sponsored
            </p>

            <h3 className="text-xl font-bold leading-tight">
              {ad.title}
            </h3>

            {ad.description && (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">
                {ad.description}
              </p>
            )}

          </div>

          {/* Visit */}

          <button
            type="button"
            onClick={handleClick}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-white
              py-3.5
              text-sm
              font-bold
              text-black
              transition
              active:scale-[0.98]
            "
          >
            Visit
            <ExternalLink size={16} />
          </button>

        </div>

        {/* --------------------------------
            MUTE BUTTON
        -------------------------------- */}

        {ad.ad_type === "VIDEO" && (
          <button
            type="button"
            onClick={() =>
              setMuted((prev) => !prev)
            }
            className="
              absolute
              bottom-[145px]
              right-4
              z-30
              rounded-full
              bg-black/60
              p-3
              text-white
              backdrop-blur-md
            "
          >
            {muted ? (
              <VolumeX size={19} />
            ) : (
              <Volume2 size={19} />
            )}
          </button>
        )}

      </div>
    </div>
  );
}