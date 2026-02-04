import Image, { StaticImageData } from "next/image"
import PlusIcons from "./PlusIcons"

interface CardHeaderProps {
    coverSrc: StaticImageData;
    title:string;
    subtitle:string
}


const CardHeader = ({ coverSrc, title, subtitle }:CardHeaderProps) => {
  return (
    <div className="absolute z-10 flex gap-3.5 pl-4 pt-4.25">
      <Image
        src={coverSrc}
        alt="Music cover"
        width={72}
        height={67}
        className="w-18 h-16.75 rounded-[3px]"
        unoptimized
      />

      <div className="flex flex-col">
        <div className="flex items-center gap-1.75">
          <h1 className="text-[22px] font-semibold text-white/90">
            {title}
          </h1>
           <PlusIcons />
        </div>

        <p className="text-[13px] text-white/60">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

export default CardHeader