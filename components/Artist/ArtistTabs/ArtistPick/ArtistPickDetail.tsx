import Image from "next/image"
import images from "@/public/images"
import PerviewArtistPick from "./PerviewArtistPick"
import BigArtistPreview from "./BigArtistPreview"
import FleshSvg from "./FleshSvg"

const ArtistPickDetail = () => {
  return (
    <div className="pt-1.5 w-full h-65.25 relative">
           <Image src={images.Cp}  width={359} height={261}
           className=" object-cover w-full h-65.25 rounded-[9px]" alt="artistpick" unoptimized
           />
           <PerviewArtistPick />
           <BigArtistPreview />
           <div className="absolute top-55 right-4">
            <FleshSvg />
          </div>
        </div>
  )
}

export default ArtistPickDetail