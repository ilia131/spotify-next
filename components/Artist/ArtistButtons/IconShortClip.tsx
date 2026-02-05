import Image from "next/image"
import images from "@/public/images"

const IconShortClip = () => {
  return (
    <Image src={images.vini} width={32} height={40} alt="shortartist" unoptimized className="w-8 h-10 rounded-md  border-[rgba(255,255,255,0.8)] border-solid border-[1.5px]"/>
  )
}

export default IconShortClip