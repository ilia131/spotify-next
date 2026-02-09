import Image from "next/image"
import images from "@/public/images"

const RightButtonMPlayer = () => {
  return (
    <div className="w-35  h-10.25 flex items-center gap-2">
             <Image width={41} height={41} alt='musicplayerartist' className="w-10.25 h-10.25 " src={images.vini} unoptimized />
             <div className="grid  h-10.25 items-center py-1 ">
              <p className="text-[13px] text-[rgba(255,255,255,0.7)]">Vinak</p>
              <p className="text-[12px] text-[rgba(255,255,255,0.48)]">Ta Farda</p>
             </div>
           </div>  
  )
}

export default RightButtonMPlayer