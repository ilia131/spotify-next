"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { closeBottomSheet } from "@/redux/features/bottomSheet"

import {
  useToggleLikeSongMutation,
  useGetLikedStatusQuery,
} from "@/redux/services/likedSongs"

import Image from "next/image"
import Link from "next/link"
import { openPlaylistModal } from "@/redux/features/playlistModalSlice"

export default function MusicOptionsSheet() {

  const dispatch = useAppDispatch()
  const { isOpen, song } = useAppSelector((state) => state.bottomSheet)
  const songId = song?.unique_id

  const [toggleLike, { isLoading }] = useToggleLikeSongMutation()

  const { data: likedStatus } = useGetLikedStatusQuery(
    songId ? [songId] : [],
    { skip: !songId }
  )
 
  const liked = songId ? likedStatus?.[songId] ?? false : false

  const handleLike = () => {
    if (!songId) return
    toggleLike(songId)
  }

  if (!isOpen || !song) return null

  return (
    <div className="fixed inset-0 z-50">

      <div
        onClick={() => dispatch(closeBottomSheet())}
        className="absolute inset-0 bg-black/40"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="
        absolute
        bottom-0
        left-1/2
        -translate-x-1/2
        w-full
        max-w-107.5
        bg-zinc-900
        rounded-t-3xl
        p-6
        animate-slideUp
        "
      >

        <div className="flex items-center gap-3 mb-6">
          <Image
            alt={song.title}
            src={song.image_url}
            width={56}
            height={56}
            className="w-14 h-14 rounded-md"
          />

          <div>
            <p className="text-white font-semibold">{song.title}</p>
            <p className="text-zinc-400 text-sm">{song.artistname}</p>
          </div>
        </div>

        <div className="grid gap-5 text-white text-center">

          <button onClick={() => dispatch(openPlaylistModal())}>Add to playlist</button>

          <Link
            href={`/artist/${song.artistname}`}
            onClick={() => dispatch(closeBottomSheet())}
          >
            Go to artist
          </Link>

          <button onClick={handleLike} disabled={isLoading}>
            {liked ? "Unlike this Song" : "Like this Song"}
          </button>

          <Link
            href={`/album/${song.artistname}/${song.album_name}`}
            onClick={() => dispatch(closeBottomSheet())}
          >
            View album
          </Link>

        </div>

      </div>

    </div>
  )
}
