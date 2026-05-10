"use client"

import AlbumHero from "@/entities/albums/ui/album-hero"
import AlbumsRows from "@/entities/albums/ui/album-rows"

import {  useGetAlbumDetailQuery } from "@/redux/services/artistApislice"
import { useParams } from "next/navigation"

const  Albums = () => {
  const params = useParams()
  const artist = params.artistname as string
  const albums = params.album_name as string
  const { data: detailPA, isLoading } = useGetAlbumDetailQuery({ 
    artist, 
    albums 
  }, {
    skip: !artist || !albums
  });

  const coverimage = detailPA?.cover

  return (
    <div className="grid pb-50 overflow-hidden"
    >
     <AlbumHero 
       image={coverimage ?? 'p.svg'}
     />
     <AlbumsRows
       songs={detailPA?.tracks ?? []}
     />
    </div>
  )
}

export default  Albums