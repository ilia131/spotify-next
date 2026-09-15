"use client"

import PlayShuffle from "@/components/Artist/ArtistButtons/PlayShuffle"
import MusicRowCard from "@/components/Artist/ArtistTabs/MusicRowCard"
import { useRouter, useParams } from "next/navigation"
import { SongItem, useGetPlaylistByIdQuery } from "@/redux/services/playlistApiSlice"
import {
  Song,
  setQueue,
  togglePlay,
} from "@/redux/features/playerSlice"
import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hook"

const Page = () => {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const playlistId = params?.unique_id as string

  const {
    data: songPlayList,
    isLoading,
  } = useGetPlaylistByIdQuery(playlistId)

  const filteredSongs: Song[] =
    songPlayList?.tracks?.map((item: SongItem) => item.song) || []

  const { queue, isPlaying } = useAppSelector(
    (state) => state.player
  )

  /*
   * Check if current player queue belongs
   * to this playlist.
   */
  const isSameQueue =
    queue.length === filteredSongs.length &&
    filteredSongs.length > 0 &&
    filteredSongs.every((song) =>
      queue.some((q) => q.id === song.id)
    )

  const handlePlay = () => {
    if (!filteredSongs.length) return

    if (isSameQueue) {
      dispatch(togglePlay())
      return
    }

    dispatch(
      setQueue({
        songs: filteredSongs,
        startIndex: 0,
      })
    )
  }

  const handleShuffle = () => {
    if (!filteredSongs.length) return

    const shuffled = [...filteredSongs].sort(
      () => Math.random() - 0.5
    )

    dispatch(
      setQueue({
        songs: shuffled,
        startIndex: 0,
      })
    )
  }

  /*
   * Use first song's cover as playlist cover.
   */
  const playlistCover =
    filteredSongs[0]?.image_url ||
    null

  return (
    <main className="min-h-screen w-full bg-[#121212] text-white">
      <div className="mx-auto w-full max-w-[440px] min-h-screen bg-[#121212]">

        {/* ================= HEADER ================= */}
        <section className="relative overflow-hidden">

          {/* Background blur */}
          <div
            className="absolute inset-0 h-[390px] opacity-40 blur-3xl scale-110"
            style={{
              backgroundImage: playlistCover
                ? `url(${playlistCover})`
                : "linear-gradient(135deg, #5b0768, #121212)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-[#121212]/40 to-[#121212]" />

          <div className="relative px-4 pt-5">

            {/* Back */}
            <button
              type="button"
              onClick={() => router.back()}
              className="mb-7 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-md active:scale-95"
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="15"
                viewBox="0 0 10 16"
                fill="none"
              >
                <path
                  d="M10 0H6.1756L0 7.62349L6.1756 15.247H10L3.82415 7.62349L10 0Z"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </button>

            {/* ================= COVER ================= */}
            <div className="flex justify-center">
              <div
                className="
                  relative
                  aspect-square
                  w-[220px]
                  overflow-hidden
                  rounded-[6px]
                  bg-[#282828]
                  shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                "
              >
                {playlistCover ? (
                  <img
                    src={playlistCover}
                    alt={songPlayList?.name || "Playlist"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#5c0569] to-[#191919]">
                    <svg
                      width="70"
                      height="70"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 18V5L21 3V16"
                        stroke="white"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="6"
                        cy="18"
                        r="3"
                        stroke="white"
                        strokeWidth="1.7"
                      />
                      <circle
                        cx="18"
                        cy="16"
                        r="3"
                        stroke="white"
                        strokeWidth="1.7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* ================= INFO ================= */}
            <div className="mt-7">

              <h1 className="line-clamp-2 text-[24px] font-bold leading-[1.15] tracking-[-0.4px]">
                {songPlayList?.name || "Playlist"}
              </h1>

              <p className="mt-2 text-[13px] font-medium text-white/55">
                Playlist
              </p>

              <p className="mt-1 text-[13px] text-white/45">
                {filteredSongs.length}{" "}
                {filteredSongs.length === 1 ? "song" : "songs"}
              </p>
            </div>

            {/* ================= CONTROLS ================= */}
            <div className="mt-6 flex items-center justify-end pb-5">

              <PlayShuffle
                onPlay={handlePlay}
                onShuffle={handleShuffle}
                isPlaying={isSameQueue && isPlaying}
              />

            </div>
          </div>
        </section>

        {/* ================= SONG LIST ================= */}
        <section className="px-4 pb-32">

          {isLoading && (
            <div className="flex flex-col gap-4 py-5">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex animate-pulse items-center gap-3"
                >
                  <div className="h-12 w-12 rounded bg-[#282828]" />

                  <div className="flex-1">
                    <div className="h-3 w-2/3 rounded bg-[#282828]" />
                    <div className="mt-2 h-3 w-1/3 rounded bg-[#282828]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && filteredSongs.length === 0 && (
            <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
              <div className="mb-3 text-4xl opacity-50">
                ♪
              </div>

              <p className="text-[15px] font-semibold text-white/80">
                This playlist is empty
              </p>

              <p className="mt-1 text-[13px] text-white/40">
                Add some songs to get started
              </p>
            </div>
          )}

          {!isLoading && filteredSongs.length > 0 && (
            <div className="flex flex-col gap-1">
              {filteredSongs.map(
                (item: Song, index: number) => (
                  <MusicRowCard
                    key={item.id ?? index}
                    songs={filteredSongs}
                    item={item}
                    isPlaylistView
                    playlistId={playlistId}
                    index={index}
                  />
                )
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Page
