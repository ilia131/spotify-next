import {
  useEffect,
  RefObject,
} from "react";

import {
  setTimeData,
  playNext,
} from "@/redux/features/playerSlice";

import {
  useAppDispatch,
} from "@/redux/hook";

import {
  Song,
} from "@/redux/features/playerSlice";

 
export interface ListenTracker {
  trackProgress(
    delta: number
  ): void;

  check30s(): void;

  onSongEnd(): void;

  onSongChange(): void;

  reset(): void;
}
export function useAudioEvents(
  audioRef: RefObject<
    HTMLAudioElement | null
  >,
  song: Song | undefined,
  listenTracker: ListenTracker,
  onSongEnded: () => void | Promise<void>
) {
  const dispatch =
    useAppDispatch();

  useEffect(() => {
    const audio =
      audioRef.current;

    if (!audio) {
      return;
    }

    const update = () => {
      const current =
        audio.currentTime;

      const duration =
        audio.duration || 0;

      let buffered = 0;

      if (
        audio.buffered.length > 0 &&
        duration
      ) {
        const end =
          audio.buffered.end(
            audio.buffered.length - 1
          );

        buffered =
          end / duration;
      }

      dispatch(
        setTimeData({
          currentTime: current,
          duration,
          buffered,
        })
      );

      /*
       * Listen Tracking
       */
      listenTracker.trackProgress(
        current
      );

      /*
       * Heartbeat
       *
       * همچنان همان منطق
       * قبلی است.
       */
      listenTracker.check30s();
    };

    const ended = () => {
      const adShown =
        onSongEnded();

      if (!adShown) {
        dispatch(playNext());
      }
    };

    audio.addEventListener(
      "timeupdate",
      update
    );

    audio.addEventListener(
      "ended",
      ended
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        update
      );

      audio.removeEventListener(
        "ended",
        ended
      );
    };
  }, [
    audioRef,
    song,
    listenTracker,
    onSongEnded,
    dispatch,
  ]);
}