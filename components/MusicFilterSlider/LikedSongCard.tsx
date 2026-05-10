'use client'

import Image from "next/image"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { setQueue, Song } from "@/redux/features/playerSlice"

type RecentSongItem = {
  type: "song"
  name: string
  desc: string
  pic: string
  song: Song
}

type RecentPlaylistItem = {
  type: "playlist"
  name: string
  desc: string
  pic: string
  unique_id: string
}

type RecentItem = RecentSongItem | RecentPlaylistItem

interface LikeSongsCardProps {
  item: RecentItem
  i: number
  recents: { song: Song }[]
}

const LikedSongCard = ({ item, i, recents }: LikeSongsCardProps) => {

  const dispatch = useDispatch()

  const handlePlay = () => {
    if (item.type === "song") {
      dispatch(
        setQueue({
          songs: recents.map(r => r.song),
          startIndex: i
        })
      )
    }
  }

  const CardContent = (
    <div className="w-22 h-36.25 flex flex-col justify-between shrink-0 cursor-pointer">
      <Image
        src={item.pic}
        width={91}
        height={91}
        alt={item.name}
        unoptimized
        className="w-22.75 h-22.75 rounded-md"
      />

      <div className="w-22 h-10 flex flex-col gap-1">
        <p className="text-white/90 text-[12px] truncate">
          {item.name}
        </p>
        <p className="text-white/45 text-[11px] truncate">
          {item.desc}
        </p>
      </div>
    </div>
  )

  if (item.type === "playlist") {
    return (
      <Link href={`/library/playlist/${item.unique_id}`}>
        {CardContent}
      </Link>
    )
  }

  return <div onClick={handlePlay}>{CardContent}</div>
}

export default LikedSongCard
