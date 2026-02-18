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



// import { useState, useRef, useEffect, useCallback } from "react";

// export const useAudioPlayer = (
//   currentSong: { track: string } | undefined,
//   isPlaying: boolean
// ) => {
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   const [progress, setProgress] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);

//   /* -------------------- Time Update -------------------- */
//   const handleTimeUpdate = useCallback(() => {
//     const audio = audioRef.current;
//     if (!audio || !audio.duration) return;

//     const current = audio.currentTime;
//     const total = audio.duration;

//     setCurrentTime(current);
//     setProgress((current / total) * 100);
//   }, []);

//   /* -------------------- Metadata Loaded -------------------- */
//   const handleLoadedMetadata = useCallback(() => {
//     const audio = audioRef.current;
//     if (!audio || isNaN(audio.duration)) return;

//     // اینجا ریست انجام میشه (نه داخل effect)
//     setCurrentTime(0);
//     setProgress(0);
//     setDuration(audio.duration);
//   }, []);

//   /* -------------------- Attach Events -------------------- */
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     audio.addEventListener("loadedmetadata", handleLoadedMetadata);
//     audio.addEventListener("timeupdate", handleTimeUpdate);

//     return () => {
//       audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
//       audio.removeEventListener("timeupdate", handleTimeUpdate);
//     };
//   }, [handleLoadedMetadata, handleTimeUpdate]);

//   /* -------------------- Load New Song (NO setState here) -------------------- */
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio || !currentSong?.track) return;

//     audio.src = currentSong.track;
//     audio.load();
//   }, [currentSong]);

//   /* -------------------- Play / Pause -------------------- */
//   useEffect(() => {
//     const audio = audioRef.current;
//     if (!audio) return;

//     if (isPlaying) {
//       audio.play().catch(() => {});
//     } else {
//       audio.pause();
//     }
//   }, [isPlaying]);

//   /* -------------------- Seek -------------------- */
//   const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
//     const audio = audioRef.current;
//     if (!audio || !audio.duration) return;

//     const rect = e.currentTarget.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const width = rect.width;

//     const percent = clickX / width;
//     audio.currentTime = percent * audio.duration;
//   };

//   /* -------------------- Format Time -------------------- */
//   const formatTime = (time: number) => {
//     if (!time || isNaN(time)) return "0:00";

//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);

//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

//   return {
//     audioRef,
//     progress,
//     currentTime,
//     duration,
//     handleSeek,
//     handleTimeUpdate,
//     formatTime,
//   };
// };
