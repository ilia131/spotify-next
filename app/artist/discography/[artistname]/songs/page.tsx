"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetArtistSongsQuery } from "@/redux/services/artistContentApiSlice";
import { useParams, useRouter } from "next/navigation";
import MusicRowCard from "@/components/Artist/ArtistTabs/MusicRowCard";
import { Song, setQueue, togglePlay } from "@/redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useInView } from "react-intersection-observer";

export default function ArtistSongsPage() {
  const params = useParams<{ artistname: string }>();
  const router = useRouter();

  const artistname = decodeURIComponent(params.artistname);

  const dispatch = useAppDispatch();

  const [cursor, setCursor] = useState<string | null>(null);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data,
    isLoading,
    isFetching,
  } = useGetArtistSongsQuery({
    artistname,
    cursor,
  });

  const songs: Song[] = useMemo(
    () => data?.results ?? [],
    [data?.results]
  );

  const firstSong = songs[0];

  const { queue, isPlaying } = useAppSelector(
    (state) => state.player
  );

  /*
   * Load next page
   */
  useEffect(() => {
    if (!inView || !data?.next || isFetching) return;

    const nextCursor = new URL(data.next).searchParams.get("cursor");

    if (nextCursor && nextCursor !== cursor) {
      setCursor(nextCursor);
    }
  }, [
    inView,
    data?.next,
    isFetching,
    cursor,
  ]);

  /*
   * Check if current queue belongs to this page
   */
  const isSameQueue =
    queue.length === songs.length &&
    songs.length > 0 &&
    songs.every((song) =>
      queue.some((q) => q.id === song.id)
    );

  /*
   * Play all
   */
  const handlePlay = () => {
    if (!songs.length) return;

    if (isSameQueue) {
      dispatch(togglePlay());
      return;
    }

    dispatch(
      setQueue({
        songs,
        startIndex: 0,
      })
    );
  };

  /*
   * Shuffle
   */
  const handleShuffle = () => {
    if (!songs.length) return;

    const shuffled = [...songs].sort(
      () => Math.random() - 0.5
    );

    dispatch(
      setQueue({
        songs: shuffled,
        startIndex: 0,
      })
    );
  };

  /*
   * First song cover
   */
  const cover =
    firstSong?.image_url ||
    "";

  return (
    <main className="min-h-screen w-full bg-[#121212] text-white">
      <div className="mx-auto min-h-screen w-full max-w-[440px] overflow-hidden">

        {/* ================= HERO ================= */}

        <section className="relative overflow-hidden">

          {/* Background cover */}
          {cover && (
            <div
              className="absolute inset-0 -top-20 scale-125 bg-cover bg-center opacity-35 blur-3xl"
              style={{
                backgroundImage: `url(${cover})`,
              }}
            />
          )}

          {/* Dark gradient */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-b
              from-black/20
              via-[#121212]/75
              to-[#121212]
            "
          />

          <div className="relative px-5 pb-6 pt-5">

            {/* Back */}
            <div className="mb-7 flex items-center justify-between">

              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back"
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-black/40
                  backdrop-blur-md
                  transition
                  hover:bg-black/60
                  active:scale-90
                "
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-black/40
                  backdrop-blur-md
                  text-white/80
                "
              >
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="5"
                    cy="12"
                    r="1.5"
                    fill="currentColor"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="1.5"
                    fill="currentColor"
                  />
                  <circle
                    cx="19"
                    cy="12"
                    r="1.5"
                    fill="currentColor"
                  />
                </svg>
              </button>

            </div>

            {/* Cover */}
            <div className="flex justify-center">

              <div
                className="
                  relative
                  aspect-square
                  w-[220px]
                  overflow-hidden
                  rounded-[4px]
                  bg-[#282828]
                  shadow-[0_20px_60px_rgba(0,0,0,0.65)]
                "
              >
                {cover ? (
                  <img
                    src={cover}
                    alt={`${artistname} songs`}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      flex h-full w-full
                      items-center justify-center
                      bg-[#282828]
                      text-white/20
                    "
                  >
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z" />
                    </svg>
                  </div>
                )}
              </div>

            </div>

            {/* Title */}
            <div className="mt-7">

              <p className="mb-2 text-[12px] font-semibold uppercase tracking-[2px] text-[#1ed760]">
                Discography
              </p>

              <h1
                className="
                  text-[34px]
                  font-black
                  leading-[1.05]
                  tracking-[-1.5px]
                "
              >
                Songs
              </h1>

              <p className="mt-2 text-[14px] text-[#b3b3b3]">
                {artistname}
                {songs.length > 0 && (
                  <>
                    {" "}
                    • {songs.length} songs
                  </>
                )}
              </p>

            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between">

              {/* Shuffle */}
              <button
                type="button"
                onClick={handleShuffle}
                disabled={!songs.length}
                aria-label="Shuffle"
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-full
                  text-white/80
                  transition
                  hover:text-white
                  active:scale-90
                  disabled:opacity-30
                "
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16 3H21V8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M4 20L21 3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M21 16V21H16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M4 4L9 9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M15 15L21 21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              {/* Play */}
              <button
                type="button"
                onClick={handlePlay}
                disabled={!songs.length}
                aria-label="Play"
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-full
                  bg-[#1ed760]
                  text-black
                  shadow-[0_8px_30px_rgba(30,215,96,0.2)]
                  transition-all
                  hover:scale-105
                  hover:bg-[#1fdf64]
                  active:scale-95
                  disabled:opacity-30
                "
              >
                {isSameQueue && isPlaying ? (
                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect
                      x="6"
                      y="5"
                      width="4"
                      height="14"
                      rx="1"
                    />
                    <rect
                      x="14"
                      y="5"
                      width="4"
                      height="14"
                      rx="1"
                    />
                  </svg>
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5V19L19 12L8 5Z" />
                  </svg>
                )}
              </button>

            </div>

          </div>
        </section>

        {/* ================= SONGS ================= */}

        <section className="px-3 pb-32">

          <div className="mb-2 px-2">
            <h2 className="text-[20px] font-bold">
              All songs
            </h2>
          </div>

          {isLoading ? (
            <div className="flex flex-col gap-2">

              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="
                    flex items-center gap-3
                    rounded-lg
                    px-2 py-2
                  "
                >
                  <div
                    className="
                      h-12 w-12 shrink-0
                      animate-pulse
                      rounded-md
                      bg-[#282828]
                    "
                  />

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div
                      className="
                        h-3.5 w-[65%]
                        animate-pulse
                        rounded
                        bg-[#282828]
                      "
                    />

                    <div
                      className="
                        h-3 w-[40%]
                        animate-pulse
                        rounded
                        bg-[#222222]
                      "
                    />
                  </div>
                </div>
              ))}

            </div>
          ) : songs.length > 0 ? (
            <div className="flex flex-col gap-4">

              {songs.map((song, i) => (
                <div
                  key={song.id ?? i}
                  className="
                    rounded-lg
                    transition
                    active:bg-white/10
                  "
                >
                  <MusicRowCard
                    songs={songs}
                    index={i}
                    item={song}
                  />
                </div>
              ))}

            </div>
          ) : (
            <div
              className="
                flex min-h-[220px]
                flex-col
                items-center
                justify-center
                rounded-xl
                bg-[#181818]
                text-center
              "
            >
              <div
                className="
                  mb-4 flex h-14 w-14
                  items-center justify-center
                  rounded-full
                  bg-[#282828]
                "
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 18V5L21 3V16"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="6"
                    cy="18"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <circle
                    cx="18"
                    cy="16"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
              </div>

              <p className="text-[15px] font-semibold">
                No songs yet
              </p>

              <p className="mt-1 text-[13px] text-[#777]">
                This artist   hasnt released any songs.
              </p>
            </div>
          )}

          {/* Loading next page */}
          {isFetching && !isLoading && (
            <div className="flex justify-center py-7">
              <div
                className="
                  h-7 w-7
                  animate-spin
                  rounded-full
                  border-2
                  border-white/20
                  border-t-[#1ed760]
                "
              />
            </div>
          )}

          {/* Infinite scroll */}
          <div
            ref={ref}
            className="h-10"
          />

        </section>
      </div>
    </main>
  );
}