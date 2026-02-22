"use client"


import TrackCard from "@/components/TrackPacks/TrackCard"
import { Dropdown } from "@/components/TrackPacks/DropDown"
import { tracks } from "@/data/trackPacks"


const Trackpacks = () => {
  return (
    <main className="flex flex-col">
     <Dropdown />
     <section className="w-full items-center px-4  flex flex-col gap-5 pb-40 justify-center">
       {tracks.map((track) => (
        <TrackCard key={track.id} {...track} />
      ))}    
    </section>
    </main>
  )
}

export default Trackpacks
