"use client"

import { useState } from "react"
import SearchIconCs from '@/public/Icons/SearchIconCs'
import { useGetSearchQuery } from "@/redux/services/searchFilterApislice"
import Image from "next/image"
import { Artist } from "@/redux/services/artistApislice"
import { useDebounce } from "use-debounce"
import { useRouter } from "next/navigation"
import { Song, setQueue, } from "@/redux/features/playerSlice"
import { useAppDispatch } from "@/redux/hook"

interface Props {
  scrolled:boolean
}

const SearchInputSection = ({scrolled}:Props) => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const [query,setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 10)

  const { data, isLoading } = useGetSearchQuery(debouncedQuery,{
    skip: debouncedQuery.length < 1
  })
  const handlePlaySong = (selectedSong: Song) => {
    const allSongs = data?.songs?.results || [];
    const index = allSongs.findIndex((s : Song) => s.id === selectedSong.id);
    
    dispatch(setQueue({
      songs: allSongs,
      startIndex: index >= 0 ? index : 0
    }));
  };
  return (
    <div className="relative w-full">

      {/* INPUT */}
      <section
        className={`h-12.5 w-full rounded-[26px] bg-[#FFFFFF]
        flex items-center pl-2.5 pr-10.5 gap-3.5
        ${scrolled ? 'scale-[0.98] shadow-lg' : 'scale-100'}`}
      >

        <div className="flex items-center pl-2 ">
          <SearchIconCs
            className="w-5.5 h-5.25 "
            fill='#000000'
            fillOpacity='0.35'
          />
        </div>

        <input
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          className="w-full focus:outline-none
          placeholder:text-[16px]
          placeholder:text-[rgba(0,0,0,0.75)]"
          placeholder="What do you want to listen to?"
        />

      </section>

      {query.length >= 1 && (
  <div
    className="
      fixed
      inset-0
      z-[999]
      bg-black/40
      backdrop-blur-2xl
      animate-fadeIn
      hide-scrollbar
    "
  >
    {/* Ambient Lights */}

    <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-green-500/10 blur-3xl" />
    <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />

    {/* Results Panel */}

    <div
  className="
    fixed
    inset-0

    bg-black/20
    backdrop-blur-[40px]
    hide-scrollbar
    overflow-y-auto

    animate-fadeIn
  "
>
      {/* Glass Reflection */}

      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-white/10
          via-transparent
          to-transparent
          pointer-events-none
        "
      />

      {/* Header */}

      <div
        className="
          sticky
          top-0
          z-20

          bg-black/20
          backdrop-blur-xl

          border-b border-white/10

          px-6
          py-5

          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2 className="text-white text-xl font-bold">
            Search Results
          </h2>

          <p className="text-white/50 text-sm">
            {query}
          </p>
        </div>

        <button
          onClick={() => setQuery("")}
          className="
            w-10
            h-10

            rounded-full

            bg-white/10

            hover:bg-white/20

            text-white

            transition
          "
        >
          ✕
        </button>
      </div>

      {/* Content */}

      <div className="h-full overflow-y-auto p-5 pb-24">
        {isLoading && (
          <div className="flex flex-col gap-4 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="
                  h-16
                  rounded-2xl
                  bg-white/5
                "
              />
            ))}
          </div>
        )}

        {/* TOP RESULT */}

        {data?.top_result && (
          <div className="mb-8">
            <h3 className="text-white/60 text-sm mb-3">
              Top Result
            </h3>

            <div
              onClick={() =>
                router.push(
                  `/artist/${data.top_result.artistname}`
                )
              }
              className="
                p-5

                rounded-3xl

                bg-white/5

                border border-white/10

                hover:bg-white/10

                transition

                cursor-pointer
              "
            >
              <p className="text-white text-lg font-bold">
                {data.top_result.title ||
                  data.top_result.artistname}
              </p>

              <p className="text-white/50 text-sm mt-1">
                {data.top_result.type}
              </p>
            </div>
          </div>
        )}

        {/* SONGS */}

        {data?.songs?.results?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-white/60 text-sm mb-3">
              Songs
            </h3>

            <div className="space-y-2">
              {data.songs.results
                .slice(0, 10)
                .map((song: Song) => (
                  <div
                    key={song.id}
                    onClick={() => {
                      handlePlaySong(song);
                      setQuery("");
                    }}
                    className="
                      flex
                      items-center
                      gap-4

                      p-3

                      rounded-2xl

                      hover:bg-white/10

                      transition

                      cursor-pointer
                    "
                  >
                    <Image
                      src={song.image_url}
                      alt=""
                      width={56}
                      height={56}
                      className="
                        w-14
                        h-14

                        rounded-xl

                        object-cover
                      "
                    />

                    <div>
                      <p className="text-white">
                        {song.title}
                      </p>

                      <p className="text-white/40 text-sm">
                        Song
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ARTISTS */}

        {data?.artists?.results?.length > 0 && (
          <div>
            <h3 className="text-white/60 text-sm mb-3">
              Artists
            </h3>

            <div className="space-y-2">
              {data.artists.results
                .slice(0, 10)
                .map((artist: Artist) => (
                  <div
                    key={artist.id}
                    onClick={() => {
                      router.push(
                        `/artist/${artist.artistname}`
                      );
                      setQuery("");
                    }}
                    className="
                      flex
                      items-center
                      gap-4

                      p-3

                      rounded-2xl

                      hover:bg-white/10

                      transition

                      cursor-pointer
                    "
                  >
                    <Image
                      src={artist.profile_pic}
                      alt=""
                      width={56}
                      height={56}
                      className="
                        w-14
                        h-14

                        rounded-full

                        object-cover
                      "
                    />

                    <div>
                      <p className="text-white">
                        {artist.artistname}
                      </p>

                      <p className="text-white/40 text-sm">
                        Artist
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default SearchInputSection
