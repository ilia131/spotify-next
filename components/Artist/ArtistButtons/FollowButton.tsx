"use client"

import { useState } from "react"
import {
  useFollowArtistMutation,
  useIsFollowingQuery,
} from "@/redux/services/followApiSlice"

interface FollowButtonProps {
  artistUuid: string
}

const FollowButton = ({ artistUuid }: FollowButtonProps) => {
  const { data, refetch } = useIsFollowingQuery(artistUuid)
  const [followArtist, { isLoading }] = useFollowArtistMutation()
  const [pending, setPending] = useState(false)

  const handleFollowClick = async () => {
    if (pending || isLoading) return
    setPending(true)
    try {
      await followArtist(artistUuid).unwrap()
      await refetch()
    } finally {
      setPending(false)
    }
  }

  const isFollowing = data?.is_following

  return (
    <button
      onClick={handleFollowClick}
      disabled={pending}
      className={`w-20.5 h-9 border border-solid rounded-[17px]
        border-[rgba(255,255,255,0.42)] text-[rgba(255,255,255,0.79)] hover:border-white hover:text-white
        text-[12.8px] font-bold flex justify-center items-center transition-all duration-200
         `}
    >
   {pending ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : isFollowing ? (
        "Following"
      ) : (
        "Follow"
      )}    
      </button>
  )
}

export default FollowButton
