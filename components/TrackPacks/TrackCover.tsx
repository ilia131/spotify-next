import Image, { StaticImageData } from "next/image"
import images from "@/public/images"
interface Props {
     cover:StaticImageData
}

const TrackCover = ({cover}:Props) => {
  return (
    <div className="w-[136px] h-[78px]  flex gap-0 ">
    <Image 
        src={cover || images.hip2 }  
        width={136} 
        height={78} 
        alt="coverartist"
        className="w-[136px] h-[78px] rounded-[5px] object-cover overflow-hidden"
        priority
   />
  </div> 
   )
}

export default TrackCover