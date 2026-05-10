'use client'

import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { setQueue, Song } from "@/redux/features/playerSlice"

interface CardProps {
  item: Song
  title: string
  songs?: Song[]
  index?: number
  isArtist?:boolean
}

const FreshTrackCard = ({ item, title, songs , index , isArtist }: CardProps) => {

  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch()

  const handlePlay = () => {
    dispatch(
      setQueue({
        songs: songs?.length ? songs : [item],
        startIndex: index
      })
    )
  }
  
  return (
    <div className="grid h-50.75 w-39.5 gap-3 snap-start shrink-0">

      {title === "Made For You" || isArtist ? (

        <div
          onClick={handlePlay}
          className="w-39.5 h-37.75 overflow-hidden rounded-lg cursor-pointer"
        >
          {!loaded && (
            <div className="w-39.5 h-37.75 animate-pulse bg-zinc-800 rounded-lg" />
          )}

          <Image
            src={item.image_url}
            width={158}
            height={151}
            alt="Cover"
            unoptimized
            onLoadingComplete={() => setLoaded(true)}
          />
        </div>

      ) : (

        <Link
          href={title === "Trending Hits" ? "/trending" : "/freshtrack"}
          className="w-39.5 h-37.75 overflow-hidden rounded-lg"
        >
          {!loaded && (
            <div className="w-39.5 h-37.75 animate-pulse bg-zinc-800 rounded-lg" />
          )}

          <Image
            src={item.image_url}
            width={158}
            height={151}
            alt="Cover"
            unoptimized
            onLoadingComplete={() => setLoaded(true)}
          />
        </Link>

      )}
      <div className="flex flex-col"> 
      <p className="text-[rgba(255_255_255/0.55)] text-[15px] line-clamp-2 pl-0">
        {item.artists?.join(", ")}
</p>

      <p className="text-[rgba(255_255_255/0.55)] text-[13px] line-clamp-2 pl-0">
        {item.title} 
      </p>
      </div>
    </div>
  )
}

export default FreshTrackCard
