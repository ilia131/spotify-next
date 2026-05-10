"use client"


import TrackCard from "@/components/TrackPacks/TrackCard"
import { tracks } from "@/data/trackPacks"


const Trackpacks = () => {
  return (
    <main className="flex flex-col pt-22  ">
     <section className="w-full items-center px-6 flex flex-col gap-2.75 pb-40 justify-center">
       {tracks.map((track) => (
        <TrackCard key={track.id} {...track} />
      ))}    
    </section>
    </main>
  )
}

export default Trackpacks
