"use client";

import { useParams } from "next/navigation";
import { useGetSongbyGenreQuery } from "@/redux/services/genreApiSlice";
import { useEffect, useRef, useState } from "react";
import { Song, setQueue, togglePlay } from "@/redux/features/playerSlice";
import MusicRowCard from "@/components/Artist/ArtistTabs/MusicRowCard";
import { useAppDispatch } from "@/redux/hook";
import {
  ArrowLeft,
  ListMusic,
  Play,
  Shuffle,
  Music2,
} from "lucide-react";

const Page = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const genre = decodeURIComponent(params.genrename as string);

  // برای نگه‌داشتن آدرس صفحه بعدی
  const [nextUrl, setNextUrl] = useState<string | null | undefined>(undefined);

  const {
    data,
    isLoading,
    isFetching,
  } = useGetSongbyGenreQuery({ genre, nextUrl });

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const songs: Song[] = data?.songs?.results ?? [];
  const hasMore = Boolean(data?.songs?.next);

  /*
   * Infinite loading
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetching &&
          hasMore &&
          data?.songs?.next
        ) {
          // آدرس صفحه بعدی رو ست می‌کنیم تا درخواست جدید بره
          setNextUrl(data.songs.next);
        }
      },
      {
        threshold: 0.2,
      }
    );

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [isFetching, hasMore, data?.songs?.next]);

  const handlePlay = () => {
    if (!songs.length) return;

    dispatch(
      setQueue({
        songs,
        startIndex: 0,
      })
    );

    dispatch(togglePlay());
  };

  const handleShuffle = () => {
    if (!songs.length) return;

    const shuffledSongs = [...songs].sort(() => Math.random() - 0.5);

    dispatch(
      setQueue({
        songs: shuffledSongs,
        startIndex: 0,
      })
    );

    dispatch(togglePlay());
  };

  /*
   * =========================
   * Loading (فقط بار اول)
   * =========================
   */
  if (isLoading && !data) {
    return (
      <main className="min-h-screen bg-[#121212] text-white">
        <div className="mx-auto min-h-screen w-full max-w-[440px]">
          {/* Hero skeleton */}
          <div className="relative h-[330px] overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-[#3b2b50] via-[#241d2c] to-[#121212]" />

            <div className="absolute left-4 top-5 h-10 w-10 rounded-full bg-white/10" />

            <div className="absolute bottom-8 left-5 right-5">
              <div className="mb-3 h-4 w-20 animate-pulse rounded bg-white/10" />
              <div className="h-12 w-64 animate-pulse rounded bg-white/10" />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-5 py-5">
            <div className="h-10 w-10 animate-pulse rounded-full bg-white/10" />

            <div className="h-14 w-14 animate-pulse rounded-full bg-white/10" />
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-2 px-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex h-12.75 items-center gap-3.5"
              >
                <div className="h-12.75 w-12.75 shrink-0 animate-pulse rounded-md bg-white/10" />

                <div className="flex flex-1 flex-col gap-2">
                  <div className="h-3.5 w-40 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-24 animate-pulse rounded bg-white/5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#121212] text-white">
      <div className="mx-auto min-h-screen w-full max-w-[440px] overflow-hidden">
        {/* =========================
            HERO
        ========================= */}
        <section className="relative h-[330px] overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-linear-to-b from-[#49305f] via-[#292033] to-[#121212]" />

          {/* Glow */}
          <div className="absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />

          {/* Back */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="absolute left-4 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition active:scale-95"
          >
            <ArrowLeft size={21} />
          </button>

          {/* Genre visual */}
          <div className="absolute left-1/2 top-[72px] flex h-[150px] w-[150px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-[#6d3c8d] via-[#4b2865] to-[#21152d] shadow-2xl shadow-black/50">
            <div className="absolute inset-0 bg-white/5" />

            <Music2
              size={72}
              strokeWidth={1.4}
              className="relative text-white/90"
            />

            <div className="absolute -bottom-10 -right-10 h-28 w-28 rounded-full bg-fuchsia-400/20 blur-2xl" />
          </div>

          {/* Title */}
          <div className="absolute bottom-7 left-5 right-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              Genre
            </p>

            <h1 className="truncate text-[34px] font-black leading-none tracking-tight">
              {genre}
            </h1>

            <p className="mt-2 text-sm text-white/60">
              {songs.length} songs
            </p>
          </div>
        </section>

        {/* =========================
            CONTROLS
        ========================= */}
        <section className="flex items-center justify-between px-5 py-5">
          <button
            type="button"
            onClick={handleShuffle}
            disabled={!songs.length}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition hover:text-white active:scale-95 disabled:opacity-30"
          >
            <Shuffle size={23} strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={handlePlay}
            disabled={!songs.length}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1ed760] text-black shadow-lg shadow-[#1ed760]/20 transition hover:scale-105 hover:bg-[#1fdf64] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Play
              size={25}
              fill="currentColor"
              className="ml-0.5"
            />
          </button>
        </section>

        {/* =========================
            SONG LIST
        ========================= */}
        <section className="px-4 pb-[150px]">
          {songs.length === 0 && !isFetching ? (
            <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                <ListMusic
                  size={28}
                  className="text-white/40"
                />
              </div>

              <h2 className="text-base font-semibold">
                No songs yet
              </h2>

              <p className="mt-2 max-w-[280px] text-sm leading-5 text-white/40">
                There are no songs available in this genre yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {songs.map((song: Song, index: number) => (
                <MusicRowCard
                  key={song.unique_id ?? song.id ?? index}
                  item={song}
                  index={index}
                  songs={songs}
                />
              ))}
            </div>
          )}

          {/* =========================
              FETCH MORE
          ========================= */}
          <div
            ref={loaderRef}
            className="flex h-20 items-center justify-center"
          >
            {isFetching && (
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-[#1ed760]" />
            )}

            {!hasMore && songs.length > 0 && !isFetching && (
              <p className="text-sm text-white/30"></p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;