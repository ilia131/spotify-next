"use client";

import PlayShuffle from "@/components/Artist/ArtistButtons/PlayShuffle";
import MusicRowCard from "@/components/Artist/ArtistTabs/MusicRowCard";
import PlusIconCs from "@/public/Icons/PlusIconCs";
import { useGetLikedSongsQuery } from "@/redux/services/likedSongs";
import { useRouter } from "next/navigation";
import { ChevronLeft, MoreHorizontal, Search } from "lucide-react";

const Page = () => {
  const router = useRouter();

  const {
    data: songs = [],
    isLoading,
    isError,
  } = useGetLikedSongsQuery();

  const filteredSongs = songs.map((item) => item.song);

  return (
    <main className="min-h-screen w-full bg-[#121212] text-white">
      <div className="mx-auto w-full max-w-[430px] overflow-hidden bg-[#121212]">

        {/* Header */}
        <section className="relative overflow-hidden">
          
          {/* Spotify-like gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#633b9f] via-[#38245f] to-[#121212]" />

          {/* Glow */}
          <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-500/25 blur-[100px]" />

          <div className="relative px-5 pt-4 pb-5">

            {/* Top bar */}
            <div className="flex items-center justify-between">

              <button
                type="button"
                onClick={() => router.back()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 transition active:scale-95"
                aria-label="Go back"
              >
                <ChevronLeft
                  size={25}
                  strokeWidth={2.3}
                  className="text-white"
                />
              </button>

              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20"
                aria-label="More options"
              >
                <MoreHorizontal
                  size={24}
                  className="text-white"
                />
              </button>

            </div>

            {/* Playlist information */}
            <div className="mt-7 flex flex-col items-center text-center">

              {/* Playlist cover */}
              <div className="flex h-44 w-44 items-center justify-center bg-gradient-to-br from-[#4500ff] via-[#a100ff] to-[#ff4dff] shadow-2xl shadow-purple-950/50">

                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 90 90"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 17C22 14.2386 24.2386 12 27 12H63C65.7614 12 68 14.2386 68 17V73C68 75.7614 65.7614 78 63 78H27C24.2386 78 22 75.7614 22 73V17Z"
                    fill="white"
                    fillOpacity="0.96"
                  />

                  <circle
                    cx="45"
                    cy="50"
                    r="13"
                    fill="#6418A8"
                  />

                  <circle
                    cx="45"
                    cy="50"
                    r="5"
                    fill="white"
                  />

                  <path
                    d="M55 25C55 22.2386 57.2386 20 60 20V48C60 50.7614 57.7614 53 55 53C52.2386 53 50 50.7614 50 48C50 45.2386 52.2386 43 55 43V25Z"
                    fill="#6418A8"
                  />
                </svg>

              </div>

              <h1 className="mt-5 text-[26px] font-bold tracking-tight">
                Liked Songs
              </h1>

              <p className="mt-2 text-sm text-white/65">
                {songs.length} songs
              </p>

            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div
                  onClick={() => router.push("LikedSongs/AddLikeSongs")}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 transition active:scale-95"
                  aria-label="Add songs"
                >
                  <PlusIconCs />
                </div>

                <button
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-black/20 transition active:scale-95"
                  aria-label="Search"
                >
                  <Search size={22} />
                </button>

              </div>

              <PlayShuffle />

            </div>

          </div>
        </section>

        {/* Add to playlist */}
        {/* <button
          type="button"
          onClick={() => router.push("/LikedSongs/AddLikeSongs")}
          className="flex w-full items-center gap-4 px-5 py-5 text-left transition active:bg-white/[0.04]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#282828]">
            <PlusIconCs />
          </div>

          <div>
            <p className="text-[15px] font-medium text-white">
              Add to this playlist
            </p>

            <p className="mt-1 text-xs text-white/45">
              Add songs to your Liked Songs
            </p>
          </div>
        </button> */}

        {/* Songs */}
        <section className="px-5 pb-28">

          {isLoading && (
            <div className="flex flex-col gap-4 pt-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 animate-pulse"
                >
                  <div className="h-12 w-12 rounded bg-white/10" />

                  <div className="flex-1">
                    <div className="h-3 w-2/3 rounded bg-white/10" />
                    <div className="mt-2 h-2.5 w-1/3 rounded bg-white/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && !isLoading && (
            <div className="py-10 text-center">
              <p className="text-sm text-red-400">
                Failed to load liked songs.
              </p>
            </div>
          )}

          {!isLoading && !isError && filteredSongs.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-base font-medium text-white/80">
                No liked songs yet
              </p>

              <p className="mt-2 text-sm text-white/40">
                Songs you like will appear here.
              </p>
            </div>
          )}

          {!isLoading && filteredSongs.length > 0 && (
            <div className="flex flex-col gap-2">
              {filteredSongs.map((item, index) => (
                <MusicRowCard
                  key={index}
                  songs={filteredSongs}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          )}

        </section>

      </div>
    </main>
  );
};

export default Page;
