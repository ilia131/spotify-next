import {
  RefObject,
  useEffect,
} from "react";

import {
  Song,
} from "@/redux/features/playerSlice";

import {
  useGetSongSubscriptionAccessQuery,
} from "@/redux/services/artistApislice";

export function useAudioCore(
  audioRef: RefObject<HTMLAudioElement | null>,
  song: Song | undefined,
  isPlaying: boolean,
  volume: number
) {
  /*
   * --------------------------------------------------
   * Subscription Access
   * --------------------------------------------------
   */

  const {
    data: access,
    isLoading: accessLoading,
    isFetching: accessFetching,
  } = useGetSongSubscriptionAccessQuery(
    song?.unique_id ?? "",
    {
      skip:
        !song?.unique_id ||
        !song.is_subscription_only,
    }
  );

  /*
   * --------------------------------------------------
   * Can Play
   * --------------------------------------------------
   */

  const canPlay =
    !song?.is_subscription_only ||
    access?.can_play === true;

  /*
   * --------------------------------------------------
   * Load / Change Song
   * --------------------------------------------------
   */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !song) {
      return;
    }

    /*
     * Subscription song:
     * هنوز access مشخص نشده
     */

    if (
      song.is_subscription_only &&
      (accessLoading || accessFetching)
    ) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();

      return;
    }

    /*
     * Subscription song:
     * کاربر دسترسی ندارد
     */

    if (!canPlay) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();

      return;
    }

    /*
     * ------------------------------------------------
     * Load New Song
     * ------------------------------------------------
     */

    const currentSrc = audio.src;
    const nextSrc = song.track_url;

    /*
     * اگر آهنگ واقعاً عوض شده
     */

    if (currentSrc !== nextSrc) {
      audio.pause();

      audio.src = nextSrc;

      audio.load();
    }

    /*
     * ------------------------------------------------
     * Auto Play
     * ------------------------------------------------
     *
     * اگر Player قبل از تغییر آهنگ در حالت Play بوده،
     * آهنگ جدید هم باید بلافاصله Play شود.
     */

    if (isPlaying) {
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error(
            "Auto play failed:",
            error
          );
        });
      }
    }
  }, [
    audioRef,
    song?.unique_id,
    song?.track_url,
    song?.is_subscription_only,
    isPlaying,
    canPlay,
    accessLoading,
    accessFetching,
  ]);

  /*
   * --------------------------------------------------
   * Play / Pause
   * --------------------------------------------------
   */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    /*
     * آهنگ subscription-only بدون دسترسی
     */

    if (!canPlay) {
      audio.pause();
      return;
    }

    /*
     * Play
     */

    if (isPlaying) {
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error(
            "Play failed:",
            error
          );
        });
      }

      return;
    }

    /*
     * Pause
     */

    audio.pause();
  }, [
    audioRef,
    isPlaying,
    canPlay,
  ]);

  /*
   * --------------------------------------------------
   * Volume
   * --------------------------------------------------
   */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = Math.min(
      1,
      Math.max(0, volume)
    );
  }, [
    audioRef,
    volume,
  ]);

  /*
   * --------------------------------------------------
   * Seek
   * --------------------------------------------------
   */

  const seek = (percent: number) => {
    const audio = audioRef.current;

    if (!audio || !canPlay) {
      return;
    }

    const duration = audio.duration;

    if (
      !duration ||
      Number.isNaN(duration)
    ) {
      return;
    }

    const safePercent = Math.min(
      1,
      Math.max(0, percent)
    );

    audio.currentTime =
      safePercent * duration;
  };

  /*
   * --------------------------------------------------
   * Seek From Event
   * --------------------------------------------------
   */

  const seekFromEvent = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!canPlay) {
      return;
    }

    const rect =
      e.currentTarget.getBoundingClientRect();

    if (!rect.width) {
      return;
    }

    const percent =
      (e.clientX - rect.left) /
      rect.width;

    seek(percent);
  };

  return {
    seek,
    seekFromEvent,
    canPlay,
    accessLoading,
    accessFetching,
  };
}