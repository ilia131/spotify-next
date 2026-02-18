"use client"


import images from "@/public/images"

import TrackCard from "@/components/TrackPacks/TrackCard"

const tracks = [
  {
    artist: "Sajad Shahi",
    album: "Western Sweden",
    title: "New Documentary in the Swedish Radio App",
    progress: 33,
    duration: "3:33",
    cover: images.hip2,
    bg:'bg-linear-to-l from-[rgba(182,66,66,1)] to-[rgba(80,29,29,1)]'

  },
  {
    artist: "Sajad Shahi",
    album: "Western Sweden",
    title: "New Documentary in the Swedish Radio App",
    progress: 33,
    duration: "3:33",
    cover: images.hip2,
    bg:'bg-linear-to-l from-[rgba(125,131,45,1)] to-[rgba(28,29,10,1)]'

  },
  {
    artist: "Sajad Shahi",
    album: "Western Sweden",
    title: "New Documentary in the Swedish Radio App",
    progress: 33,
    duration: "3:33",
    cover: images.hip3,
    bg:'bg-linear-to-l from-[rgba(51,43,154,1)] to-[rgba(17,15,52,1)]'
  },
  {
    artist: "Sajad Shahi",
    album: "Western Sweden",
    title: "New Documentary in the Swedish Radio App",
    progress: 33,
    duration: "3:33",
    cover: images.HipHopLogist,
    bg:'bg-linear-to-l from-[rgba(28,25,25,1)] to-[rgba(130,117,117,1)]'
  },
]


const Trackpacks = () => {
  return (
    <div className="w-full items-center px-4 pt-22 flex flex-col gap-5 pb-40 justify-center">
       {tracks.map((track, index) => (
        <TrackCard key={index} {...track} />
      ))}    
    </div>
  )
}

export default Trackpacks
