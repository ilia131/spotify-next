"use client"
import CardAlbum from "@/components/Album/CardAlbum"

const Albums = () => {
  return (
    <div className="w-full px-3.75 pt-22 flex flex-col gap-5 pb-40 justify-center">
       <CardAlbum /> 
       <CardAlbum />
       <CardAlbum />

    </div>
  )
}

export default Albums
