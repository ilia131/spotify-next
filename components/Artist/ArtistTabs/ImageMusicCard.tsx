import Image from "next/image"

import images from '@/public/images'
import { Song } from "@/redux/features/playerSlice";

interface ItemProps {
    item:Song
    index:number
}
 
 


const ImageMusicCard = ({item , index}:ItemProps) => {
  return (
    <div className="flex gap-4.25 items-center ">
    <p className="text-[rgba(255,255,255,1)] text-[13px] font-normal">{index + 1}</p>
        <Image alt="covermusic" width={51} height={51} src={item.image ||images.Kagan} unoptimized
        className="w-12.75 h-12.75 overflow-hidden"
        />
   </div>
  )
}

export default ImageMusicCard