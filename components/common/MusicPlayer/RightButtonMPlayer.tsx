import Image from "next/image"
import images from "@/public/images"
import { useAppSelector } from "@/redux/hook";

const RightButtonMPlayer = () => {
  const { queue, currentIndex } = useAppSelector((s) => s.player);
  const currentSong = queue[currentIndex];
  console.log(currentSong)
  return (
    <div className="w-45  h-10.25 flex items-center gap-2">
             <Image width={41} height={41} alt={currentSong.title} className="w-10.25 h-10.25 " 
             src={currentSong.image || images.vini}  
             unoptimized />
             <div className="grid  h-10.25 items-center py-1 ">
              <p className="text-[13px] text-[rgba(255,255,255,0.7)]">{currentSong.title}</p>
              <p className="text-[12px] text-[rgba(255,255,255,0.48)] truncate">{currentSong.description}</p>
             </div>
           </div>  
  )
}

export default RightButtonMPlayer