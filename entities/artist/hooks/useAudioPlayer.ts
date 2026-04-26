import { useRef, useEffect } from "react";
import { useAppSelector } from "@/redux/hook";
import { useListenTracker } from "./useListenTracker";
import { useAudioEvents } from "./useAudioEvents";
import { useAudioCore } from "./useAudioCore";

export const useAudioPlayer = () => {

  const { queue, currentIndex, isPlaying, volume } = useAppSelector(
    (state) => state.player
  );

  const song = queue[currentIndex];
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "auto";
      audioRef.current = audio;
    }
    return () => audioRef.current?.pause();
  }, []);

  const listenTracker = useListenTracker(song);

  // When song changes → flush old listeners + reset tracker
  useEffect(() => {
    listenTracker.onSongChange();
  }, [song?.unique_id]);

  useAudioEvents(audioRef, song, listenTracker);

  const { seek, seekFromEvent } = useAudioCore(
    audioRef,
    song,
    isPlaying,
    volume
  );

  const formatTime = (t: number) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return {
    audioRef,
    song,
    seek,
    seekFromEvent,
    formatTime,
  };
};
