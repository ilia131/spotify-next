import images from "@/public/images"
import LikedSongCard from "./LikedSongCard"

import { Playlist, useGetUserPlaylistsQuery } from "@/redux/services/playlistApiSlice"
import { useGetRecentlyPlayedQuery } from "@/redux/services/songApiSlice"
import { Song } from "@/redux/features/playerSlice"
const recentartist = [
  {name:'Liked Songs' , pic:images.vini3 , desc:'Playlist . spo.' , rounded:'0' , type: "liked"  },
  {name:'hiphopologist' , pic:images.hip3 , desc:'EX' , rounded:'full' ,  type: "artist"},
  {name:'Daily Mix', pic:images.dorcci2 , desc:'Playlist . spo.' , rounded:'0' , type: "playlist"},
  {name:'Daily Mix1', pic:images.Kagan , desc:'Playlist . spo.' , rounded:'0' ,  type: "playlist"},
  {name:'Daily Mix2', pic:images.dorcci , desc:'Playlist . spo.' , rounded:'0' ,  type: "playlist"}


]


const RecentMusics = () => {
  const { data: playlists } = useGetUserPlaylistsQuery(0)
  const { data: recents } = useGetRecentlyPlayedQuery(0)

  if (!playlists || !recents) return null

  const combined = [
    ...recents.slice(0,3).map((item: { song: Song } , i : number) => ({
      name: item.song.title,
      desc: item.song.artistname,
      pic: item.song.image_url,
      type: "song",
      song: item.song
    })),
  
    ...playlists.map((pl: Playlist) => ({
      name: pl.name,
      desc: `Playlist · ${pl.tracks_count} songs`,
      pic: pl.tracks?.[0]?.song?.image_url || images.vini3,
      type: "playlist",
      unique_id: pl.unique_id
    }))
  ]

  return (
    <section className="pt-2.5 hide-scrollbar">
      <div className="h-8.75 flex justify-between pr-4 items-center">
        <h1 className="font-semibold text-[23px] text-[rgba(255_255_255/0.96)]">
          Recents
        </h1>
        <p className="text-[13px] text-[rgba(255_255_255/0.66)]">
          Show all
        </p>
      </div>

      <div className="pt-2.5 flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory hide-scrollbar">
        {combined.slice(0,5).map((item, i) => (
          <LikedSongCard item={item} key={i}  recents={recents} i={i} />
        ))}
      </div>
    </section>
  )
}


export default RecentMusics