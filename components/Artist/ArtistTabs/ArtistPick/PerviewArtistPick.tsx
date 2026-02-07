import Image from "next/image"
import images from "@/public/images"
const PerviewArtistPick = () => {

  return (
    <div className="absolute rounded-[20px] left-3.5 top-5
      flex items-center pl-1.5 w-21.5 h-8 border border-[rgba(255,255,255,0.25)] bg-[rgba(0,0,0,0.2)] backdrop-blur-[1px]">
        <div className="w-14 h-6.25  flex gap-1">
        <Image src={images.vini2} width={25} height={25} alt="bestmusic" unoptimized className="rounded-full "/>
       <div className="w-7.25 h-3.75 grid  justify-start">
           <p className="text-[10px] text-[rgba(255,255,255,0.85)]">Belad</p>
           <p className="text-[5px] text-[rgba(255,255,255,0.62)]">Vinak</p>
        </div>
       </div>
    </div>
  )
}

export default PerviewArtistPick