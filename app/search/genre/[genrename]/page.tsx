"use client"

import { useParams } from "next/navigation"
import { useGetSongbyGenreQuery } from "@/redux/services/genreApiSlice"
import { useRef, useEffect } from "react"
import { Song } from "@/redux/features/playerSlice"
import MusicRowCard from "@/components/Artist/ArtistTabs/MusicRowCard"

const Page = () => {
  const params = useParams()
  const genre = params.genrename as string

  const { data, isLoading, isFetching, refetch } =
    useGetSongbyGenreQuery(genre)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          refetch()
        }
      },
      { threshold: 1 }
    )

    if (loaderRef.current) observer.observe(loaderRef.current)

    return () => observer.disconnect()
  }, [isFetching, refetch])

  if (isLoading) return <div className="p-10 text-white">Loading...</div>

  const songs = data?.songs?.results ?? []

  return (
    <div className="text-white">

      <div className="h-75 bg-linear-to-b from-purple-600 to-neutral-900 p-10 flex items-end">
        <div>
          <p className="text-sm uppercase mb-2">Genre</p>
          <h1 className="text-6xl font-bold capitalize">{genre}</h1>
        </div>
      </div>

     
      <div className="px-10 pt-10 pb-20">

        {songs.map((song : Song , i:number) => (
          <MusicRowCard item={song} key={i} index={i} songs={songs}/>
        ))}

      </div>

      <div ref={loaderRef} className="h-10" />

    </div>
  )
}

export default Page
