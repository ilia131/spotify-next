"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Song } from "@/redux/features/playerSlice"
import { useGetRecentlyPlayedQuery } from "@/redux/services/songApiSlice"
import { useGetLikedSongsQuery } from "@/redux/services/likedSongs"
import { useGetSuggestSongQuery } from "@/redux/services/suggestApiSlice"

import MusicRowCard from "@/components/Artist/ArtistTabs/MusicRowCard"
import { SearchInput } from "@/components/TrackPacks/SearchInput"

const AddPlayList = () => {
  const router = useRouter()

  const [activePage, setActivePage] = useState<0 | 1>(0)
  const [search, setSearch] = useState("")

  // =========================
  // API
  // =========================

  const { data: songs = [] } = useGetLikedSongsQuery()

  const likedSongs = (
    songs?.map((item) => item.song) || []
  ) as Song[]

  const unique_id = likedSongs[0]?.unique_id

  const { data: suggestdata = [] } =
    useGetSuggestSongQuery(unique_id)

  const { data: recentlyData = [] } =
    useGetRecentlyPlayedQuery(0)

  // =========================
  // Recently Played
  // =========================

  const recentlySongs: Song[] =
    recentlyData?.map(
      (item: { song: Song }) => item.song
    ) || []

  // =========================
  // Search
  // =========================

  const searchTerm = search
    .toLowerCase()
    .trim()

  const filterSongs = (songList: Song[]) => {
    if (!searchTerm) return songList

    return songList.filter((song) => {
      const title =
        song.title?.toLowerCase() || ""

      const artist =
        song.artistname?.toLowerCase() || ""

      return (
        title.includes(searchTerm) ||
        artist.includes(searchTerm)
      )
    })
  }

  const visibleRecently =
    filterSongs(recentlySongs)

  const visibleSuggestions =
    filterSongs(suggestdata as Song[])

  // =========================
  // Current Page
  // =========================

  const currentSongs =
    activePage === 0
      ? visibleRecently
      : visibleSuggestions

  const currentTitle =
    activePage === 0
      ? "Recently played"
      : "Made for you"

  // =========================
  // Render
  // =========================

  return (
    <main className="min-h-screen w-full bg-[#121212] text-white">

      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="px-4 pt-5">

          <div className="flex items-center">

            {/* Back Button */}

            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#282828]
                transition-all
                duration-150
                active:scale-90
                active:bg-[#3a3a3a]
              "
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

            {/* Title */}

            <h1 className="ml-3 text-[20px] font-bold tracking-[-0.3px]">
              Add to playlist
            </h1>

          </div>

        </header>

        {/* =========================================
            SEARCH
        ========================================= */}

        <div className="px-4 pt-5">

          <SearchInput
            value={search}
            onChange={setSearch}
          />

        </div>

        {/* =========================================
            FILTER TABS
        ========================================= */}

        <div className="mt-5 flex gap-2 overflow-x-auto px-4 hide-scrollbar">

          {/* Recently */}

          <button
            type="button"
            onClick={() => setActivePage(0)}
            className={`
              shrink-0
              rounded-full
              px-4
              py-2
              text-[13px]
              font-semibold
              transition-all
              duration-200

              ${
                activePage === 0
                  ? "bg-white text-black"
                  : "bg-[#292929] text-white"
              }
            `}
          >
            Recently played
          </button>

          {/* Suggestions */}

          <button
            type="button"
            onClick={() => setActivePage(1)}
            className={`
              shrink-0
              rounded-full
              px-4
              py-2
              text-[13px]
              font-semibold
              transition-all
              duration-200

              ${
                activePage === 1
                  ? "bg-white text-black"
                  : "bg-[#292929] text-white"
              }
            `}
          >
            Made for you
          </button>

        </div>

        {/* =========================================
            SECTION TITLE
        ========================================= */}

        <div className="flex items-center justify-between px-4 pb-2 pt-7">

          <h2 className="text-[21px] font-bold tracking-[-0.4px]">
            {currentTitle}
          </h2>

          <span className="text-[12px] font-medium text-white/40">
            {currentSongs.length}
          </span>

        </div>

        {/* =========================================
            SONG LIST
        ========================================= */}

        <section className="px-2 pb-32">

          {currentSongs.length > 0 ? (

            <div className="flex flex-col gap-4">

              {currentSongs.map(
                (song: Song, index: number) => (

                  <div
                    key={song.id ?? index}
                    className="
                      rounded-lg
                      px-2
                      transition-colors
                      duration-150
                      active:bg-white/10
                    "
                  >

                    <MusicRowCard
                      item={song}
                      index={index}
                      songs={currentSongs}
                    />

                  </div>

                )
              )}

            </div>

          ) : (

            /* =====================================
               EMPTY STATE
            ===================================== */

            <div
              className="
                flex
                min-h-[220px]
                flex-col
                items-center
                justify-center
                px-6
                text-center
              "
            >

              <div
                className="
                  mb-4
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
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
                    stroke="white"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle
                    cx="6"
                    cy="18"
                    r="3"
                    stroke="white"
                    strokeWidth="1.6"
                  />

                  <circle
                    cx="18"
                    cy="16"
                    r="3"
                    stroke="white"
                    strokeWidth="1.6"
                  />
                </svg>

              </div>

              <p className="text-[15px] font-semibold text-white/80">
                No songs found
              </p>

              <p className="mt-1 text-[13px] text-white/40">
                {searchTerm
                  ? "Try another search"
                  : "Your songs will appear here"}
              </p>

            </div>

          )}

        </section>

        {/* =========================================
            PAGE INDICATOR
        ========================================= */}

        <div className="flex items-center justify-center gap-2 pb-8">

          {/* Recently */}

          <button
            type="button"
            title="Recently played"
            onClick={() => setActivePage(0)}
            className={`
              h-1.5
              rounded-full
              transition-all
              duration-300

              ${
                activePage === 0
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/30"
              }
            `}
          />

          {/* Suggestions */}

          <button
            type="button"
            title="Made for you"
            onClick={() => setActivePage(1)}
            className={`
              h-1.5
              rounded-full
              transition-all
              duration-300

              ${
                activePage === 1
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/30"
              }
            `}
          />

        </div>

      </div>

    </main>
  )
}

export default AddPlayList
