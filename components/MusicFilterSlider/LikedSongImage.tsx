import ShadowCard from "./ShadowCard"
import LikeIcon from "./LikeIcon"
import Image, { StaticImageData } from "next/image"
import ShadowCardlevel2 from "./ShadowCardlevel2"

interface ImageArtistProps {
  image:StaticImageData
}


const LikedSongImage = ({image}:ImageArtistProps) => {
  return (
    <div className="w-22 h-18 flex justify-center border snap-start shrink-0">
        <div className="relative w-17.75 h-18.25">
            <ShadowCard />
            <ShadowCardlevel2/>
            <Image
            src={image}
            width={71}
            height={73}
            className="relative z-2 w-17.75 h-18.25 rounded-[5px]"
            alt="liked songs"
            unoptimized
            />
            <LikeIcon/>
       </div> 
  </div>
  )
}

export default LikedSongImage