"use client"

import { useState } from "react"
import SearchIconCs from '@/public/Icons/SearchIconCs'
import { useGetSearchQuery } from "@/redux/services/searchFilterApislice"
import Image from "next/image"
import { Artist } from "@/redux/services/artistApislice"
import { Song } from "@/redux/features/playerSlice"
import { useDebounce } from "use-debounce"


interface Props {
  scrolled:boolean
}

const SearchInputSection = ({scrolled}:Props) => {

  const [query,setQuery] = useState("")
  const [debouncedQuery] = useDebounce(query, 400)

  const { data, isLoading } = useGetSearchQuery(debouncedQuery,{
    skip: debouncedQuery.length < 1
  })

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
        <div className="absolute top-15 left-0 w-full bg-[#1E1E1E]
        rounded-2xl p-3 shadow-2xl z-50 h-60 overflow-y-scroll">

      {isLoading && (
        <div className="flex flex-col gap-3 animate-pulse">

          {[...Array(3)].map((_,i)=>(
            <div
              key={i}
              className="flex items-center gap-3 p-2"
            >

              <div className="w-12 h-12 bg-[#2A2A2A] rounded-md"></div>

              <div className="flex flex-col gap-2">
                <div className="w-32 h-3 bg-[#2A2A2A] rounded"></div>
                <div className="w-20 h-3 bg-[#2A2A2A] rounded"></div>
              </div>

            </div>
          ))}

        </div>
      )}

          {/* TOP RESULT */}
          {data?.top_result && (
            <div className="mb-4">
              {/* <p className="text-gray-400 text-sm mb-2">
                Top Result
              </p> */}

              <div className="bg-[#2A2A2A] p-3 rounded-xl">
                <p className="text-white font-bold">
                  {data.top_result.title ||
                   data.top_result.artistname}
                </p>

                <p className="text-gray-400 text-sm">
                  {data.top_result.type}
                </p>
              </div>
            </div>
          )}

          <div className="mb-4">

          

            <div className="flex flex-col gap-2">

              {data?.songs?.results?.slice(0,5).map((song:Song)=>(
                <div
                  key={song.id}
                  className="flex items-center gap-3
                  hover:bg-[#2A2A2A]
                  p-2 rounded-lg cursor-pointer"
                >

                  <Image
                    width={48}
                    height={48}
                    alt=""
                    src={song.image_url}
                    className="w-12 h-12 rounded-md"
                  />

                  <div>
                    <p className="text-white">
                      {song.title}
                    </p>

                    {/* <p className="text-gray-400 text-sm">
                      {song.artist?.artistname}
                    </p> */}
                  </div>

                </div>
              ))}

            </div>

          </div>

          <div>


            <div className="flex flex-col gap-2">

              {data?.artists?.results?.slice(0,5).map((artist:Artist)=>(
                <div
                  key={artist.id}
                  className="flex items-center gap-3
                  hover:bg-[#2A2A2A]
                  p-2 rounded-lg cursor-pointer"
                >

                  <Image
                    alt=""
                    width={48}
                    height={48}
                    src={artist.profile_pic}
                    className="w-12 h-12 rounded-full"
                  />

                  <div>
                    <p className="text-white">
                      {artist.artistname}
                    </p>

                    <p className="text-gray-400 text-sm">
                      Artist
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>
      )}

    </div>
  )
}

export default SearchInputSection
