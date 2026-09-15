import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useListenSongMutation,
} from "@/redux/services/artistApislice";

import {
  Song,
} from "@/redux/features/playerSlice";

import {
  ListenTrackingService,
} from "./tracking/ListenTrackingService";

export function useListenTracker(
  song: Song | undefined
) {
  const [listenSong] =
    useListenSongMutation();

  const [
    service,
  ] = useState(
    () =>
      new ListenTrackingService({
        sendListen: ({
          id,
          seconds,
          session_id,
        }) => {
          listenSong({
            id,
            seconds,
            session_id,
          });
        },
      })
  );

  /*
   * --------------------------------------------------
   * Track progress
   * --------------------------------------------------
   */

  const trackProgress = useCallback(
    (currentTime: number) => {
      service.trackProgress(
        currentTime
      );
    },
    [service]
  );

  /*
   * --------------------------------------------------
   * Heartbeat
   * --------------------------------------------------
   */

  const check30s = useCallback(() => {
    service.check30s(
      song?.unique_id
    );
  }, [
    service,
    song?.unique_id,
  ]);

  /*
   * --------------------------------------------------
   * Song end
   * --------------------------------------------------
   */

  const onSongEnd = useCallback(() => {
    service.onSongEnd(
      song?.unique_id
    );
  }, [
    service,
    song?.unique_id,
  ]);

  /*
   * --------------------------------------------------
   * Song change
   * --------------------------------------------------
   */

  const onSongChange = useCallback(() => {
    service.onSongChange(song);
  }, [
    service,
    song,
  ]);

  /*
   * --------------------------------------------------
   * Reset
   * --------------------------------------------------
   */

  const reset = useCallback(() => {
    service.reset();
  }, [service]);

  /*
   * --------------------------------------------------
   * Page exit
   * --------------------------------------------------
   */

  const sendListenOnExit =
    useCallback(() => {
      service.sendOnExit(
        song?.unique_id
      );
    }, [
      service,
      song?.unique_id,
    ]);

  /*
   * --------------------------------------------------
   * Visibility / unload
   * --------------------------------------------------
   */

  useEffect(() => {
    const handleVisibilityChange =
      () => {
        if (
          document.visibilityState ===
          "hidden"
        ) {
          sendListenOnExit();
        }
      };

    const handlePageHide = () => {
      sendListenOnExit();
    };

    const handleBeforeUnload =
      () => {
        sendListenOnExit();
      };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    window.addEventListener(
      "pagehide",
      handlePageHide
    );

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener(
        "pagehide",
        handlePageHide
      );

      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };
  }, [
    sendListenOnExit,
  ]);

  return {
    trackProgress,
    check30s,
    onSongEnd,
    onSongChange,
    reset,
  };
}