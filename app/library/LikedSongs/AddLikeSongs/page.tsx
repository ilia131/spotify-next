'use client'

import { useState, useRef } from "react"
import { Song } from "@/redux/features/playerSlice";
import { useGetRecentlyPlayedQuery } from "@/redux/services/songApiSlice";
import MusicRowCard from "@/components/Artist/ArtistTabs/MusicRowCard";
import { SearchInput } from "@/components/TrackPacks/SearchInput";
import { useGetLikedSongsQuery } from "@/redux/services/likedSongs";
import { useGetSuggestSongQuery } from "@/redux/services/suggestApiSlice";

const AddPlayList = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePage, setActivePage] = useState(0)

  const { data: songs = [] } = useGetLikedSongsQuery()
  const filteredSongs2 = (songs?.map(item => item.song) || []) as Song[]
  const unique_id = filteredSongs2?.[0]?.unique_id
  
  const { data: suggestdata } = useGetSuggestSongQuery(unique_id)
  const { data: recentlyData } = useGetRecentlyPlayedQuery(0)
  const [search, setSearch] = useState("")

  const filteredSongs: Song[] = recentlyData?.map((item: { song: Song }) => item.song) || []
  const searchTerm = search.toLowerCase().trim()

  const visibleSongs = filteredSongs.filter(song => {
    if (!searchTerm) return true
    return (
      song.title?.toLowerCase().includes(searchTerm) ||
      song.artistname?.toLowerCase().includes(searchTerm)
    )
  })

  const visibleSuggestSongs = (suggestdata || []).filter((song: Song) => {
    if (!searchTerm) return true
    return (
      song.title?.toLowerCase().includes(searchTerm) ||
      song.artistname?.toLowerCase().includes(searchTerm)
    )
  })

  // هندل کردن تغییر نقطه ها موقع اسکرول
  const handleScroll = () => {
    if (!containerRef.current) return
    const { scrollLeft, clientWidth } = containerRef.current
    // محاسبه صفحه فعلی بر اساس میزان اسکرول
    const index = Math.round(scrollLeft / clientWidth)
    setActivePage(index)
  }

  // کلیک روی نقطه ها
  const scrollToPage = (index: number) => {
    if (!containerRef.current) return
    const width = containerRef.current.clientWidth
    containerRef.current.scrollTo({
      left: width * index,
      behavior: "smooth"
    })
  }

  return (
    <div className="w-107.5 max-[430px]:w-full flex justify-center px-10 py-10 flex-col gap-6">
      
      <SearchInput value={search} onChange={setSearch} />

      {/* Container اصلی اسلایدر */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-10" 
        /* gap-10 همان فاصله بین دو صفحه است */
      >
        
        {/* صفحه اول: Recently Played */}
        <div className="w-full shrink-0 snap-center">
          <div className="w-full flex flex-col gap-4 bg-[#292929] rounded-md pl-6 py-4 h-120 overflow-y-scroll hide-scrollbar">
            <p className="text-[20px] font-bold text-white">Recently Played</p>
            {visibleSongs.map((song, index) => (
              <MusicRowCard
                key={index}
                item={song}
                index={index}
                songs={visibleSongs}
              />
            ))}
          </div>
        </div>

        {/* صفحه دوم: Suggest */}
        <div className="w-full shrink-0 snap-center">
          <div className="w-full flex flex-col gap-4 bg-[#292929] rounded-md pl-6 py-4 h-120 overflow-y-scroll hide-scrollbar">
            <p className="text-[20px] font-bold text-white">Suggest</p>
            {visibleSuggestSongs?.map((song: Song, index: number) => (
              <MusicRowCard
                key={index}
                item={song}
                index={index}
                songs={suggestdata}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-2">
        {[0, 1].map((idx) => (
          <button
            title='button'
            key={idx}
            onClick={() => scrollToPage(idx)}
            className={`transition-all duration-300 rounded-full ${
              activePage === idx 
              ? "w-3 h-3 bg-white" 
              : "w-2.5 h-2.5 bg-[#5a5a5a]"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default AddPlayList
