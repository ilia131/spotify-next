import { Song } from "@/redux/features/playerSlice";
import { RefObject, useEffect } from "react";

export function useAudioCore(audioRef: RefObject<HTMLAudioElement | null >
    , song: Song, isPlaying: boolean, volume: number) {

  // Load song when it changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song) return;

    audio.src = song.track_url;
    audio.load();

    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }, [song?.unique_id]);

  // Play / Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    isPlaying ? audio.play().catch(() => {}) : audio.pause();
  }, [isPlaying]);

  // Volume
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  const seek = (percent: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const duration = audio.duration;
    if (!duration || isNaN(duration)) return;

    audio.currentTime = percent * duration;
  };

  const seekFromEvent = (e : React.MouseEvent<HTMLDivElement>) => {
    
    const rect = e.currentTarget.getBoundingClientRect();
    const p = (e.clientX - rect.left) / rect.width;
    seek(Math.min(1, Math.max(0, p)));
  };

  return { seek, seekFromEvent };
}
