"use client"

import PopularAlbumHero from "@/entities/albums/ui/popular-album-hero"
import PopularAlbumsRows from "@/entities/albums/ui/popular-albums-rows"
import { useGetPopularAlbumDetailQuery } from "@/redux/services/artistApislice"
import { useParams } from "next/navigation"

const PopularAlbums = () => {
  const params = useParams()
  const artist = params.artist as string
  const albums = params.albums as string
  const { data: detailPA, isLoading } = useGetPopularAlbumDetailQuery({ 
    artist, 
    albums 
  }, {
    skip: !artist || !albums
  });
  const coverimage = detailPA?.[0]?.cover

  return (
    <div className="grid pb-50 overflow-hidden"
    
    >
     <PopularAlbumHero 
       image={coverimage ?? 'p.svg'}
     />

     <PopularAlbumsRows 
       songs={detailPA?.[0].tracks ?? []}
     />

    </div>
  )
}

export default PopularAlbums