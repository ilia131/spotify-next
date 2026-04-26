import Image from "next/image"
import PerviewArtistPick from "./PerviewArtistPick"
import BigArtistPreview from "./BigArtistPreview"
import FleshSvg from "./FleshSvg"
import { ArtistPickProps2 } from "@/redux/services/artistApislice"

const ArtistPickDetail = ({artistpick} :{artistpick?:ArtistPickProps2}) => {
  return (
    <div className="pt-1.5 w-full h-65.25 relative">
               {artistpick?.image && ( 
        <Image
          src={artistpick.image}
          width={359}
          height={261}
          className="object-cover w-full h-65.25 rounded-[9px]"
          alt="artistpick"
          unoptimized 
        />
      )}
           <PerviewArtistPick />
           <BigArtistPreview artistpick={artistpick} />
           <div className="absolute top-55 right-4">
            <FleshSvg />
          </div>
        </div>
  )
}

export default ArtistPickDetail