import Image, { StaticImageData } from "next/image"
import images from "@/public/images"
interface Props {
     cover:StaticImageData
}

const TrackCover = ({cover}:Props) => {
  return (
    <div className="w-27 h-19.75  flex items-center">
    <Image 
        src={cover || images.hip2 }  
        width={79} 
        height={79} 
        alt="coverartist"
        className="w-19.75 h-19.75 rounded-[5px] object-cover "
        priority
   />
   <Image 
        src={images.disc}  
        width={29} 
        height={61} 
        alt="coverartist"
        className="w-7.25 h-15.25 max-[375px]:hidden"
   />
  </div> 
   )
}

export default TrackCover