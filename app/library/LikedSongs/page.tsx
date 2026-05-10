"use client"

import PlayShuffle from "@/components/Artist/ArtistButtons/PlayShuffle"
import MusicRowCard from "@/components/Artist/ArtistTabs/MusicRowCard"
import PlusIconCs from "@/public/Icons/PlusIconCs"
import { useGetLikedSongsQuery } from "@/redux/services/likedSongs"
import { useRouter  } from "next/navigation"
const Page = () => {
  const router = useRouter()
   
  const { data: songs = [] , isLoading } = useGetLikedSongsQuery()
  const filteredSongs = songs?.map(item => item.song)
  return (
    <div className="w-107.5 max-[430px]:w-full flex flex-col justify-center">
      
      <div className="w-full flex flex-col">
        <div className="bg-linear-to-t from-[#121212] to-[#5c0569] w-full h-55 px-6 py-5 flex flex-col gap-6">

          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M10 0H6.1756L0 7.62349L6.1756 15.247H10L3.82415 7.62349L10 0Z" fill="white" fillOpacity="0.7"/>
          </svg>

          <div className="grid">
            <h1 className="text-[20px] text-[#ffffffdf] font-bold">Liked Songs</h1>
            <p className="text-[#ffffff88] mt-3">{songs.length} songs</p>
          </div>

          <div className="flex w-full justify-end">
            <PlayShuffle />
          </div>

        </div>
      </div>


      <div className="flex px-6 py-5" onClick={() => router.push('LikedSongs/AddLikeSongs')}>
        <div className="flex items-center gap-3">
          <div className="w-13 h-13 bg-[#2a2a2a] flex items-center justify-center">
            <PlusIconCs />
          </div>
          <p className="text-[#ffffff]">Add To This Playlist</p>
        </div>
      </div>


      <div className="px-6 flex flex-col gap-4">

        {isLoading && (
          <p className="text-zinc-400">Loading...</p>
        )}
    
        {filteredSongs?.map((item , i) => (
          <MusicRowCard songs={filteredSongs} item={item} index={i} key={i}  />
        ))}

      </div>

    </div>
  )
}

export default Page
