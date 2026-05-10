"use client"

import PlayShuffle from "@/components/Artist/ArtistButtons/PlayShuffle"
import MusicRowCard from "@/components/Artist/ArtistTabs/MusicRowCard"
import {    useRouter ,useParams } from "next/navigation"
import {  useGetPlaylistByIdQuery } from "@/redux/services/playlistApiSlice"
import { Song, setQueue, togglePlay } from "@/redux/features/playerSlice"
import { useAppDispatch , useAppSelector } from "@/redux/hook"
const Page = () => {
  const params = useParams()
  const router = useRouter()

  const dispatch = useAppDispatch()
  const playlistId = params?.unique_id as string
  
 

  const { data: songPlayList, isLoading } =
    useGetPlaylistByIdQuery(playlistId)

    const filteredSongs: Song[] =
    songPlayList?.tracks?.map((item: Song) => item.song) || [];
   
  
    const { queue, isPlaying } = useAppSelector((state) => state.player)

    const isSameQueue =
        queue.length === filteredSongs.length &&
        filteredSongs.every((song) =>
          queue.some((q) => q.id === song.id)
        )

      const handlePlay = () => {
        if (!filteredSongs.length) return
    
        if (isSameQueue) {
          dispatch(togglePlay())
        } else {
          dispatch(
            setQueue({
              songs: filteredSongs,
              startIndex: 0,
            })
          )
        }
      }
    
      const handleShuffle = () => {
        if (!filteredSongs.length) return
    
        const shuffled = [...filteredSongs].sort(() => Math.random() - 0.5)
    
        dispatch(
          setQueue({
            songs: shuffled,
            startIndex: 0,
          })
        )
      } 
  return (
    <div className="w-107.5 max-[430px]:w-full flex flex-col justify-center">

      {/* Header */}
      <div className="w-full flex flex-col">
        <div className="bg-linear-to-t from-[#121212] to-[#5c0569] w-full h-55 px-6 py-5 flex flex-col gap-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" fill="none"
          onClick={() => router.back()}
          >
            <path d="M10 0H6.1756L0 7.62349L6.1756 15.247H10L3.82415 7.62349L10 0Z" fill="white" fillOpacity="0.7"/>
          </svg>

          <div className="grid">
            <h1 className="text-[20px] text-[#ffffffdf] font-bold">
              {songPlayList?.name}
            </h1>
            <p className="text-[#ffffff88] mt-3">{filteredSongs.length} songs</p>
          </div>

          <div className="flex w-full justify-end">
            <PlayShuffle 
              onPlay={handlePlay}
              onShuffle={handleShuffle}
              isPlaying={isSameQueue && isPlaying}

            
            />
          </div>
        </div>
      </div>
      {/* Add to playlist */}
      {/* Songs */}
      <div className="px-6 flex flex-col gap-4">
        {isLoading && <p className="text-zinc-400">Loading...</p>}
        {filteredSongs.map((item: Song, i: number) => (
          <MusicRowCard
            key={i}
            songs={filteredSongs}
            item={item}
            isPlaylistView
            playlistId={playlistId}

            index={i}
          />
        ))}
      </div>

    </div>
  )
}

export default Page
