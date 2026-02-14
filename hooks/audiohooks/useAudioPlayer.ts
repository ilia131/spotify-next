import { useState, useRef, useEffect } from "react";

export const useAudioPlayer = (currentSong: { track: string } | undefined, isPlaying: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, currentSong]);

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;

    setProgress((current / total) * 100 || 0);
    setCurrentTime(current);
    setDuration(total || 0);
  };

  const formatTime = (time: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const percent = clickX / width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  return {
    audioRef,
    progress,
    currentTime,
    duration,
    handleTimeUpdate,
    handleSeek,
    formatTime,
  };
};
