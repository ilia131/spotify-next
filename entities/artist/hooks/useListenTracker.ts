import { useRef, useEffect } from "react";
import { useListenSongMutation } from "@/redux/services/artistApislice";
import { Song } from "@/redux/features/playerSlice";

export function useListenTracker(song:Song) {

  const listenSentRef = useRef(false);
  const listenedRef = useRef(0);
  const totalListenedRef = useRef(0);
  const lastTimeRef = useRef(0);
  const exitSentRef = useRef(false);
  const prevSongIdRef = useRef<string | null>(null);

  const [listenSong] = useListenSongMutation();

  const reset = () => {
    listenSentRef.current = false;
    listenedRef.current = 0;
    totalListenedRef.current = 0;
    lastTimeRef.current = 0;
    exitSentRef.current = false;
  };

  const trackProgress = (delta: number) => {
    if (delta > 0 && delta < 2) {
      listenedRef.current += delta;
      totalListenedRef.current += delta;
    }
  };

  const check30s = () => {
    if (
      listenedRef.current >= 30 &&
      !listenSentRef.current &&
      song?.unique_id
    ) {
      listenSentRef.current = true;

      listenSong({
        id: song.unique_id,
        seconds: 30,
      });
    }
  };

  const onSongEnd = () => {
    if (song?.unique_id && totalListenedRef.current > 0) {
      listenSong({
        id: song.unique_id,
        seconds: Math.floor(totalListenedRef.current),
      });
    }
  };

  const onSongChange = () => {
    if (
      prevSongIdRef.current &&
      prevSongIdRef.current !== song?.unique_id &&
      totalListenedRef.current > 0
    ) {
      listenSong({
        id: prevSongIdRef.current,
        seconds: Math.floor(totalListenedRef.current),
      });
    }

    prevSongIdRef.current = song?.unique_id || null;
    reset();
  };

  const sendListenOnExit = () => {
    if (exitSentRef.current) return;
    if (!song?.unique_id || totalListenedRef.current <= 0) return;

    exitSentRef.current = true;

    const payload = JSON.stringify({
      seconds: Math.floor(totalListenedRef.current),
    });

    const url = `${window.location.origin}/player/${song.unique_id}/listen/`;

    navigator.sendBeacon(
      url,
      new Blob([payload], { type: "application/json" })
    );
  };

  // Tab close / background
  useEffect(() => {
    const hide = () => sendListenOnExit();
    const unload = () => sendListenOnExit();

    document.addEventListener("visibilitychange", hide);
    window.addEventListener("pagehide", unload);
    window.addEventListener("beforeunload", unload);

    return () => {
      document.removeEventListener("visibilitychange", hide);
      window.removeEventListener("pagehide", unload);
      window.removeEventListener("beforeunload", unload);
    };
  }, [song]);

  return {
    trackProgress,
    check30s,
    onSongEnd,
    onSongChange,
    lastTimeRef,
    totalListenedRef,
    reset
  };
}
