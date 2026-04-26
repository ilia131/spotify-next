import { useEffect , RefObject } from "react";
import { setTimeData, playNext } from "@/redux/features/playerSlice";
import { useAppDispatch } from "@/redux/hook";
import { Song } from "@/redux/features/playerSlice";
import { ListenTracker } from "../types";
export function useAudioEvents(
    audioRef: RefObject<HTMLAudioElement | null>,
    song: Song | undefined,
    listenTracker: ListenTracker
) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      const current = audio.currentTime;
      const duration = audio.duration || 0;

      let buffered = 0;

      if (audio.buffered.length > 0 && duration) {
        const end = audio.buffered.end(audio.buffered.length - 1);
        buffered = end / duration;
      }

      dispatch(
        setTimeData({
          currentTime: current,
          duration,
          buffered,
        })
      );

      // track listening
      const delta = current - listenTracker.lastTimeRef.current;
      listenTracker.trackProgress(delta);
      listenTracker.lastTimeRef.current = current;

      listenTracker.check30s();
    };

    const ended = () => {
      listenTracker.onSongEnd();
      dispatch(playNext());
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("ended", ended);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("ended", ended);
    };
  }, [audioRef, song]);
}
