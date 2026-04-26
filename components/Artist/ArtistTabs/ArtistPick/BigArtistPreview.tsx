import Image from "next/image"
import { ArtistPickProps2 } from "@/redux/services/artistApislice";



const BigArtistPreview = ({artistpick}:{artistpick?:ArtistPickProps2}) => {
  return (
    <div className="absolute  left-3 top-50 flex items-center pl-1.5 w-54.25 h-13 ">
     <div className="w-54.25 h-13  flex gap-2.75">
      {artistpick?.image && (
          <Image src={artistpick?.image} width={50} height={52} alt="bestmusic" unoptimized 
          className="rounded-[5px] "
          />
      )}
     <div className=" grid  justify-start">
        <p className="text-[19px] text-[rgba(255,255,255,0.86)]">{artistpick?.title}</p>
        <p className="text-[13px] text-[rgba(255,255,255,0.70)]">{artistpick?.title}</p>
     </div>
    </div>
 </div>
  )
}

export default BigArtistPreview