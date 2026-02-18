import Image from "next/image"
import images from "@/public/images"
import BottomBigArtist from "@/components/FilterSlider/BigCardArtist/BottomBigArtist"
import TopCardAlbum from "@/components/Album/TopCardAlbum"
import BottomCardAlbum from "@/components/Album/BottomCardAlbum"

const CardAlbum = () => {
  return (

    <div className="h-112.25 max-lg:w-89.75 max-md:w-full rounded-2xl py-3.75
    px-3 bg-[rgba(8,60,38,1)] flex flex-col items-center gap-4
    ">
      <TopCardAlbum />
      <Image
              src={images.HipHopLogist} 
              width={167} height={168} 
              className="w-41.75 h-42 object-cover rounded-[13px]" 
              alt="coveralbum" 
              priority
            />
        <BottomCardAlbum />
        <div className="w-full px-1">
            <BottomBigArtist  />
        </div>
    </div>
  
  )
}

export default CardAlbum