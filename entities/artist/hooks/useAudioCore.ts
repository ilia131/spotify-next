// import {
//   RefObject,
//   useEffect,
// } from "react";

// import {
//   Song,
// } from "@/redux/features/playerSlice";

// import {
//   useGetSongSubscriptionAccessQuery,
// } from "@/redux/services/artistApislice";

// export function useAudioCore(
//   audioRef: RefObject<HTMLAudioElement | null>,
//   song: Song | undefined,
//   isPlaying: boolean,
//   volume: number
// ) {
//   /*
//    * --------------------------------------------------
//    * Subscription Access
//    * --------------------------------------------------
//    */

//   const {
//     data: access,
//     isLoading: accessLoading,
//     isFetching: accessFetching,
//   } = useGetSongSubscriptionAccessQuery(
//     song?.unique_id ?? "",
//     {
//       skip:
//         !song?.unique_id ||
//         !song.is_subscription_only,
//     }
//   );

//   /*
//    * --------------------------------------------------
//    * Can Play
//    * --------------------------------------------------
//    */

//   const canPlay =
//     !song?.is_subscription_only ||
//     access?.can_play === true;

//   /*
//    * --------------------------------------------------
//    * Load song
//    * --------------------------------------------------
//    */

//   useEffect(() => {
//     const audio =
//       audioRef.current;

//     if (!audio || !song) {
//       return;
//     }

//     /*
//      * اگر آهنگ قفل است ولی هنوز
//      * Access مشخص نشده، Audio را پاک نگه دار.
//      */

//     if (
//       song.is_subscription_only &&
//       (accessLoading || accessFetching)
//     ) {
//       audio.pause();
//       audio.removeAttribute("src");
//       audio.load();

//       return;
//     }

//     /*
//      * اگر کاربر دسترسی ندارد،
//      * اصلاً URL آهنگ را داخل Audio قرار نده.
//      */

//     if (!canPlay) {
//       audio.pause();
//       audio.removeAttribute("src");
//       audio.load();

//       return;
//     }

//     /*
//      * آهنگ قابل پخش است.
//      */

//     audio.src = song.track_url;

//     audio.load();

//     if (isPlaying) {
//       audio.play().catch(() => {});
//     }
//   }, [
//     audioRef,
//     song?.unique_id,
//     song?.track_url,
//     song?.is_subscription_only,
//     isPlaying,
//     canPlay,
//     accessLoading,
//     accessFetching,
//   ]);

//   /*
//    * --------------------------------------------------
//    * Play / Pause
//    * --------------------------------------------------
//    */

//   useEffect(() => {
//     const audio =
//       audioRef.current;

//     if (!audio) {
//       return;
//     }

//     /*
//      * آهنگ subscription-only بدون دسترسی
//      * نباید play شود.
//      */

//     if (!canPlay) {
//       audio.pause();

//       return;
//     }

//     if (isPlaying) {
//       audio.play().catch(() => {});
//     } else {
//       audio.pause();
//     }
//   }, [
//     audioRef,
//     isPlaying,
//     canPlay,
//   ]);

//   /*
//    * --------------------------------------------------
//    * Volume
//    * --------------------------------------------------
//    */

//   useEffect(() => {
//     const audio =
//       audioRef.current;

//     if (!audio) {
//       return;
//     }

//     audio.volume = Math.min(
//       1,
//       Math.max(0, volume)
//     );
//   }, [
//     audioRef,
//     volume,
//   ]);

//   /*
//    * --------------------------------------------------
//    * Seek
//    * --------------------------------------------------
//    */

//   const seek = (
//     percent: number
//   ) => {
//     const audio =
//       audioRef.current;

//     if (!audio || !canPlay) {
//       return;
//     }

//     const duration =
//       audio.duration;

//     if (
//       !duration ||
//       Number.isNaN(duration)
//     ) {
//       return;
//     }

//     const safePercent =
//       Math.min(
//         1,
//         Math.max(0, percent)
//       );

//     audio.currentTime =
//       safePercent * duration;
//   };

//   /*
//    * --------------------------------------------------
//    * Seek From Event
//    * --------------------------------------------------
//    */

//   const seekFromEvent = (
//     e: React.MouseEvent<HTMLDivElement>
//   ) => {
//     if (!canPlay) {
//       return;
//     }

//     const rect =
//       e.currentTarget.getBoundingClientRect();

//     if (!rect.width) {
//       return;
//     }

//     const percent =
//       (e.clientX - rect.left) /
//       rect.width;

//     seek(percent);
//   };

//   return {
//     seek,
//     seekFromEvent,
//     canPlay,
//     accessLoading,
//     accessFetching,
//   };
// }


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
   * Load song  (فقط وقتی آهنگ عوض شد)
   * --------------------------------------------------
   */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !song) {
      return;
    }

    /*
     * اگر آهنگ قفل است ولی هنوز
     * Access مشخص نشده، Audio را پاک نگه دار.
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
     * اگر کاربر دسترسی ندارد،
     * اصلاً URL آهنگ را داخل Audio قرار نده.
     */
    if (!canPlay) {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      return;
    }

    /*
     * آهنگ قابل پخش است.
     * فقط وقتی آهنگ عوض شده این کار را انجام بده.
     */
    if (audio.src !== song.track_url) {
      audio.src = song.track_url;
      audio.load();
    }

    // دیگر اینجا play نکن — این کار را افکت پایین انجام می‌دهد
  }, [
    audioRef,
    song?.unique_id,
    song?.track_url,
    song?.is_subscription_only,
    canPlay,
    accessLoading,
    accessFetching,
    // isPlaying  ← حذف شد
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
     * نباید play شود.
     */
    if (!canPlay) {
      audio.pause();
      return;
    }

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
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

    if (!duration || Number.isNaN(duration)) {
      return;
    }

    const safePercent = Math.min(1, Math.max(0, percent));

    audio.currentTime = safePercent * duration;
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

    const rect = e.currentTarget.getBoundingClientRect();

    if (!rect.width) {
      return;
    }

    const percent =
      (e.clientX - rect.left) / rect.width;

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