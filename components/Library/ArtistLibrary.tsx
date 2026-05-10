"use client"

import { useState } from "react"
import AddArtist from "./AddArtist"
import AddArtistModal from "./AddArtistModal"
import LibraryMusicCard from "./LibraryMusicCard"
import { StaticImageData } from "next/image"
import { Song } from "@/redux/features/playerSlice"
import Link from "next/link"
import { PlaylistCoverGrid } from "@/components/Library/PlaylistCoverGrid"
import { useRouter } from "next/navigation"
import { Artist } from "@/redux/services/artistApislice"
import { Playlist } from "@/redux/services/playlistApiSlice"

interface Props {
  artist: Artist[]
  playlist:Playlist[]
}

const ArtistLibrary = ({   artist , playlist }: Props) => {
  const [showAddArtistModal, setShowAddArtistModal] = useState(false)
  const router = useRouter()

  return (
    <div className="w-full relative top-42 pb-40 grid gap-3 px-4">
      {/* liked songs shortcut */}
      <Link href="/library/LikedSongs" className="flex gap-3 ">
        {/* Liked Songs SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 34 33"
          fill="none"
        >
          <path
            d="M0 5C0 2.23858 2.23858 0 5 0H29C31.7614 0 34 2.23858 34 5V28C34 30.7614 31.7614 33 29 33H5C2.23858 33 0 30.7614 0 28V5Z"
            fill="url(#paint0_linear_164_131)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.9355 13.818C17.7829 12.9347 18.3764 12.1708 19.6819 12.0217C22.1332 11.7402 24.3876 14.2497 23.1498 16.7199C22.7975 17.4235 22.0803 18.2603 21.2868 19.0812C20.4161 19.9826 19.4524 20.866 18.7774 21.5357L16.9366 23.3616L15.4153 21.8975C13.5851 20.1349 10.6006 17.9165 10.5022 15.168C10.4335 13.2425 11.9527 12.009 13.7004 12.0312C15.2619 12.0523 15.9189 12.8289 16.9355 13.818Z"
            fill="white"
            fillOpacity="0.91"
          />
          <defs>
            <linearGradient
              id="paint0_linear_164_131"
              x1="17"
              y1="0"
              x2="30.5"
              y2="29"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6050EE" />
              <stop offset="1" stopColor="#E4E2F8" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex flex-col justify-center ">
          <p className="font-bold text-white">Liked Songs</p>
          <p className="text-semibold text-[#ffffff5f] text-[12px]">Playlist</p>
        </div>
      </Link>

      {/* playlists */}
      {playlist.length > 0 && (
           <div className="py-4 flex flex-col gap-5">
      
           {playlist?.map((pl) => (
             <div
               key={pl.id}
               onClick={() => router.push(`/library/playlist/${pl.unique_id}`)}
               className="flex items-center gap-4 cursor-pointer"
             >
               <PlaylistCoverGrid tracks={pl.tracks || []} />
               <div className="flex flex-col">
                 <p className="text-white font-medium">{pl.name}</p>
                 <p className="text-zinc-400 text-[12px]">{pl.tracks?.length} songs</p>
               </div>
             </div>
           ))}
         </div>
      )}
    

      {/* favorite artists */}
      {artist?.map((item, i) => (
        <LibraryMusicCard item={item} key={i} />
      ))}

      {/* add artist button */}
      <AddArtist onClick={() => setShowAddArtistModal(true)} />

      {showAddArtistModal && (
        <AddArtistModal onClose={() => setShowAddArtistModal(false)} />
      )}
    </div>
  )
}

export default ArtistLibrary
